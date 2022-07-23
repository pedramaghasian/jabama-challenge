import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { v4 as uuid4 } from 'uuid';
export type TokenDocument = TokenEntity & Document;

@Schema({ collection: 'tokens', timestamps: true })
export class TokenEntity {
  @Prop({ default: uuid4 })
  _id: string;

  @Prop({ type: String, required: true })
  token: string;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  uId: Types.ObjectId;

  @Prop({ type: Date, required: true })
  expireAt: Date;
}

const TokenSchema = SchemaFactory.createForClass(TokenEntity);

TokenSchema.index({ token: 1, uId: 1 }, { unique: true });

export { TokenSchema };
