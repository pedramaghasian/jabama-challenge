import { createParamDecorator } from '@nestjs/common';
import { IUser } from '../../domain/interfaces/user';

export const GetUser = createParamDecorator((req): IUser => req.user);
