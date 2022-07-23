import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from '../../../../domain/dto/user';
import { IUser } from '../../../../domain/interfaces/user';
import { UserDocument, UserEntity } from '../models/user.entity';

@Injectable()
export class UsersRepository {
  private readonly logger = new Logger(UsersRepository.name);
  constructor(
    @InjectModel(UserEntity.name)
    private UserModel: Model<UserDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async create(data: CreateUserDto): Promise<any> {
    return new this.UserModel(data).save();
  }

  async find(id: string): Promise<any> {
    return this.UserModel.findOne({ _id: id });
  }

  async findByEmail(email: string): Promise<any> {
    return this.UserModel.findOne({ email });
  }

  async update(id: string, payload: Partial<IUser>) {
    return this.UserModel.updateOne({ _id: id }, payload);
  }
}
