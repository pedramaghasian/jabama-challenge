import { CreateUserDto } from '../dtos';
import { IUser } from './user.interface';

export interface IUsersService {
  create(data: CreateUserDto): any;
  find(id: string): any;
  findByEmail(email: string): any;
  update(id: string, payload: Partial<IUser>);
}
