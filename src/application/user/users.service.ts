import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../../domain/dto/user';
import { IUser } from '../../domain/interfaces/user/user.interface';
import { Bcrypt } from '../../shared/utils/bcrypt.utils';
import { UsersRepository } from '../../infrastructure/database/mongodb/repositories/user.repository';

@Injectable()
export class UserService {
  protected readonly logger = new Logger(UserService.name);

  constructor(protected readonly repository: UsersRepository) {}

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
