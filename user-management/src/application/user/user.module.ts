import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersRepository } from '../../infrastructure/database/mongodb/repositories/user.repository';
import {
  UserEntity,
  UserSchema,
} from '../../infrastructure/database/mongodb/models/user.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserEntity.name, schema: UserSchema },
      // { name: TokenEntity.name, schema: TokenSchema },
    ]),
  ],
  providers: [UserService, UsersRepository],
  exports: [UserService],
})
export class UserModule {}
