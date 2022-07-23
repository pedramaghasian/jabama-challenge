import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  MethodNotAllowedException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';
import * as moment from 'moment';
import { TokenService } from '../token/token.service';
import { CreateUserDto } from '../../domain/dto/user';
import { SignOptions } from 'jsonwebtoken';
import { CreateUserTokenDto } from '../../domain/dto/token';
import { IUser, IReadableUser } from '../../domain/interfaces/user';
import { MailService } from '../../infrastructure/mail/mail.service';
import { statusEnum, userSensitiveFieldsEnum } from '../../domain/enum';
import { ITokenPayload } from '../../domain/interfaces/auth';
import { Bcrypt } from '../../shared/utils/bcrypt.utils';
import { UserService } from '../user/users.service';
import {
  SignInDto,
  ChangePasswordDto,
  ForgotPasswordDto,
} from '../../domain/dto/auth';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  private readonly clientAppUrl: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {
    this.clientAppUrl = this.configService.get<string>('FE_APP_URL');
  }

  async signUp(createUserDto: CreateUserDto): Promise<boolean> {
    const user = await this.userService.create(createUserDto);
    await this.sendConfirmation(user);
    return true;
  }

  async signIn({ email, password }: SignInDto): Promise<IReadableUser> {
    const user = await this.userService.findByEmail(email);

    if (user && (await Bcrypt.comparePassword(password, user.password))) {
      const token = await this.signUser(user);
      const readableUser = user.toObject() as IReadableUser;
      readableUser.accessToken = token;

      return _.omit<any>(
        readableUser,
        Object.values(userSensitiveFieldsEnum),
      ) as IReadableUser;
    }
    throw new BadRequestException('Invalid credentials');
  }

  async signUser(user: IUser, withStatusCheck = true): Promise<string> {
    if (withStatusCheck && user.status !== statusEnum.active) {
      throw new MethodNotAllowedException();
    }
    const tokenPayload: ITokenPayload = {
      _id: user._id,
      status: user.status,
    };
    const token = await this.generateToken(tokenPayload);
    const expireAt = moment().add(1, 'day').toISOString();

    await this.saveToken({
      token,
      expireAt,
      uId: user._id,
    });

    return token;
  }

  async changePassword(
    userId: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<boolean> {
    const password = await Bcrypt.hashPassword(changePasswordDto.password);

    await this.userService.update(userId, { password });
    await this.tokenService.deleteAll(userId);
    return true;
  }

  async confirm(token: string): Promise<IUser> {
    const data = await this.verifyToken(token);
    const user = await this.userService.find(data._id);
    await this.tokenService.delete(data._id, token);
    if (user && user.status === statusEnum.pending) {
      user.status = statusEnum.active;
      return user.save();
    }
    throw new BadRequestException('Confirmation error');
  }

  async sendConfirmation(user: IUser) {
    const token = await this.signUser(user, false);
    const confirmLink = `${this.clientAppUrl}/auth/confirm?token=${token}`;

    await this.mailService.send({
      from: this.configService.get<string>('PROGRAM_MAIL'),
      to: user.email,
      subject: 'Verify User',
      html: `
                <h2>Hello ${user.firstName}!</h2>
                <b>Please use this <a href="${confirmLink}">link</a> to confirm your account.</b>
            `,
    });
  }

  private async generateToken(
    data: ITokenPayload,
    options?: SignOptions,
  ): Promise<string> {
    return this.jwtService.sign(data, options);
  }

  private async verifyToken(token): Promise<any> {
    try {
      const data = this.jwtService.verify(token) as ITokenPayload;
      const tokenExists = await this.tokenService.exists(data._id, token);
      if (tokenExists) {
        return data;
      }
      throw new UnauthorizedException();
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private async saveToken(createUserTokenDto: CreateUserTokenDto) {
    const userToken = await this.tokenService.create(createUserTokenDto);

    return userToken;
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const user = await this.userService.findByEmail(forgotPasswordDto.email);
    if (!user) {
      throw new BadRequestException('Invalid email');
    }
    const token = await this.signUser(user);
    const forgotLink = `${this.clientAppUrl}/auth/forgotPassword?token=${token}`;
    await this.mailService.send({
      from: this.configService.get<string>('PROGRAM_MAIL'),
      to: user.email,
      subject: 'Forgot Password',
      html: `
                <h2>Hello ${user.firstName}!</h2>
                <b>Please use this <a href="${forgotLink}">link</a> to reset your password.</b>
            `,
    });
  }
}
