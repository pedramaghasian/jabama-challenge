import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

const environment = process.env.NODE_ENV || 'development';
@Module({
  imports: [
    UserModule,
    AuthModule,

    ConfigModule.forRoot({
      envFilePath: `.env.${environment}`,
      isGlobal: true,
    }),

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
