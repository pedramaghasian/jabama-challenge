import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenModule } from './token/token.module';
import { configModule } from './configure.root';
import { MailModule } from './mail/mail.module';
@Module({
  imports: [
    UserModule,
    AuthModule,
    configModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri:
          'mongodb://' +
          `${encodeURIComponent(
            configService.get<string>('MONGODB_USERNAME', 'admin'),
          )}:` +
          `${encodeURIComponent(
            configService.get<string>('MONGODB_PASSWORD', '1'),
          )}@` +
          `${configService.get<string>('MONGODB_HOSTNAME', 'localhost')}:` +
          `${configService.get<number>(
            'MONGODB_PORT',
            27017,
          )}/?directConnection=true`,
        dbName: configService.get<string>('MONGODB_DATABASE', 'db-users'),
      }),
      inject: [ConfigService],
    }),
    TokenModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
