import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenRepository } from '../../infrastructure/database/mongodb/repositories/token.repository';
import {
  TokenEntity,
  TokenSchema,
} from '../../infrastructure/database/mongodb/models/token.entity';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TokenEntity.name, schema: TokenSchema },
    ]),
  ],
  providers: [TokenService, TokenRepository],
  exports: [TokenService],
})
export class TokenModule {}
