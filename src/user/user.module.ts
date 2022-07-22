import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './application/users.service';
import { UserEntity, UserSchema } from './domain/user.entity';
import { UsersController } from './interface/users.controller';
import { UsersRepository } from './inftastructure/users.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    UsersController,
    { provide: 'IUsersService', useClass: UsersService },
    { provide: 'IUsersRepository', useClass: UsersRepository },
  ],
})
export class UserModule {}
