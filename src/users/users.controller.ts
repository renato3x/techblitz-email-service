import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern('user.registered')
  async handleUserRegistered(@Payload() payload: unknown) {
    await this.usersService.sendUserRegistrationEmail(payload);
  }
}
