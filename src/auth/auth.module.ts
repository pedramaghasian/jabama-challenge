import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { configModule } from '../configure.root';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { TokenModule } from 'src/token/token.module';
import { UsersService } from 'src/user/application/users.service';

@Module({
  imports: [
    UserModule,
    TokenModule,
    configModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
