import { CreateUserDto } from '../domain/dtos';
import { IUser } from '../domain/interfaces/user.interface';

export interface IUsersRepository {
  create(data: CreateUserDto): any;
  find(id: string): any;
  findByEmail(email: string): any;
  update(id: string, payload: Partial<IUser>);
}
