import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { IUsersRepository } from '../application/users-repository.interface';
import { UserDocument, UserEntity } from '../domain/user.entity';

@Injectable()
export class UsersRepository implements IUsersRepository {
  private readonly logger = new Logger(UsersRepository.name);
  constructor(
    @InjectModel(UserEntity.name)
    private UserModel: Model<UserDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}
}
