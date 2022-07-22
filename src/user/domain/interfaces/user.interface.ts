import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly email: string;
  readonly lastName: string;
  readonly firstName: string;
  readonly gender: string;
  readonly password: string;
  status: string;
}
