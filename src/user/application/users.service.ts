import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../domain/dtos';
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
      await this.repository.create({
        ...data,
        password: hashPassword,
      });
    } catch (e) {
      this.logger.error(e);
    }
  }
}
