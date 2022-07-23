import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  Query,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../../domain/dto/user';
import { ApiTags } from '@nestjs/swagger';
import { IReadableUser, IUser } from '../../domain/interfaces/user';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../shared/decorators/get-user.decorator';
import {
  ConfirmAccountDto,
  SignInDto,
  ForgotPasswordDto,
  ChangePasswordDto,
} from '../../domain/dto/auth';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  async signUp(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<boolean> {
    return this.authService.signUp(createUserDto);
  }

  @Get('/confirm')
  async confirm(
    @Query(new ValidationPipe()) query: ConfirmAccountDto,
  ): Promise<boolean> {
    await this.authService.confirm(query.token);
    return true;
  }

  @Post('/signIn')
  async signIn(
    @Body(new ValidationPipe()) signInDto: SignInDto,
  ): Promise<IReadableUser> {
    return await this.authService.signIn(signInDto);
  }

  @Post('/forgotPassword')
  async forgotPassword(
    @Body(new ValidationPipe()) forgotPasswordDto: ForgotPasswordDto,
  ): Promise<void> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Patch('/changePassword')
  @UseGuards(AuthGuard())
  async changePassword(
    @GetUser() user: IUser,
    @Body(new ValidationPipe()) changePasswordDto: ChangePasswordDto,
  ): Promise<boolean> {
    return this.authService.changePassword(user._id, changePasswordDto);
  }
}
