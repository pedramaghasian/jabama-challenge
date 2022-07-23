import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserTokenDto } from '../../../../domain/dto/token';
import { TokenEntity, TokenDocument } from '../models/token.entity';

@Injectable()
export class TokenRepository {
  private readonly logger = new Logger(TokenRepository.name);
  constructor(
    @InjectModel(TokenEntity.name)
    private TokenModel: Model<TokenDocument>,
  ) {}

  async create(createUserTokenDto: CreateUserTokenDto): Promise<any> {
    return new this.TokenModel(createUserTokenDto).save();
  }

  async delete(uId: string, token: string): Promise<any> {
    return await this.TokenModel.deleteOne({ uId, token });
  }

  async deleteAll(uId: string): Promise<any> {
    return await this.TokenModel.deleteMany({ uId });
  }

  async exists(uId: string, token: string): Promise<any> {
    return await this.TokenModel.findOne({ uId, token });
  }
}
