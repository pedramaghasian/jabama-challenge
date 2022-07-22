import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid4 } from 'uuid';
import { genderEnum } from './enum/gender.enum';

export type UserDocument = UserEntity & Document;

@Schema({ collection: 'users', timestamps: true })
export class UserEntity {
  @Prop({ default: uuid4 })
  _id: string;

  @Prop({ type: String, trim: true, required: true, unique: true })
  email: string;

  @Prop({ type: String, trim: true, required: true })
  password: string;

  @Prop({ type: String, trim: true, required: true })
  firstName: string;

  @Prop({ type: String, trim: true, required: true })
  lastName: string;

  @Prop({
    type: String,
    trim: true,
    required: false,
    enum: Object.values(genderEnum),
  })
  gender?: string;
}

const UserSchema = SchemaFactory.createForClass(UserEntity);

UserSchema.index({ email: 1 }, { unique: true });

export { UserSchema };
