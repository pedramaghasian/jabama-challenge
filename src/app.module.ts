import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
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

    MongooseModule.forRoot(process.env.MONGODB_WRITE_CONNECTION_STRING, {
      userNewUrlParser: true,
      userUnifiedTopology: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
