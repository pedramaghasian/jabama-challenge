import { Controller, Inject, Logger } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IUsersService } from '../domain/interfaces/users.service.interface';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('/api/v1/users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(
    @Inject('IUsersService')
    private readonly svc: IUsersService,
  ) {}
}
