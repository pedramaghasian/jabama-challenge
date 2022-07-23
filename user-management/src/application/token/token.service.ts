import { Injectable } from '@nestjs/common';
import { TokenRepository } from '../../infrastructure/database/mongodb/repositories/token.repository';
import { CreateUserTokenDto } from '../../domain/dto/token';

@Injectable()
export class TokenService {
  constructor(protected readonly repository: TokenRepository) {}

  async create(createUserTokenDto: CreateUserTokenDto): Promise<any> {
    return await this.repository.create(createUserTokenDto);
  }

  async delete(uId: string, token: string): Promise<any> {
    return await this.repository.delete(uId, token);
  }

  async deleteAll(uId: string): Promise<any> {
    return await this.repository.deleteAll(uId);
  }

  async exists(uId: string, token: string): Promise<any> {
    return await this.repository.exists(uId, token);
  }
}
