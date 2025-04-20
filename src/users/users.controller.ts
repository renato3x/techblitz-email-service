import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UserRegisteredDto } from './dto/user-registered.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern('user.registered')
  async handleUserRegistered(@Payload() payload: UserRegisteredDto) {
    await this.usersService.sendUserRegistrationEmail(payload);
  }
}
