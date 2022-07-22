import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../domain/dtos';
import { IUser } from '../domain/interfaces/user.interface';
import { IUsersService } from '../domain/interfaces/users.service.interface';
import { Bcrypt } from '../domain/utils/bcrypt.utils';
import { IUsersRepository } from './users-repository.interface';

@Injectable()
export class UsersService implements IUsersService {
  protected readonly logger = new Logger(UsersService.name);

  constructor(
    @Inject('IUsersRepository')
    protected readonly repository: IUsersRepository,
  ) {}

  async create(data: CreateUserDto) {
    try {
      const hashPassword = await Bcrypt.hashPassword(data.password);
      return this.repository.create({
        ...data,
        password: hashPassword,
      });
    } catch (e) {
      this.logger.error(e);
    }
  }

  async find(id: string) {
    return this.repository.find(id);
  }

  async findByEmail(email: string) {
    return this.repository.findByEmail(email);
  }

  async update(id: string, payload: Partial<IUser>) {
    return this.repository.update(id, payload);
  }
}
