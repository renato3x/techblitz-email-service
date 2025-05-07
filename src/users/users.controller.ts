import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SendUserRegistrationEmailDto } from './dto/send-user-registration-email.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern('user.registered')
  async handleUserRegistered(@Payload() payload: SendUserRegistrationEmailDto) {
    await this.usersService.sendUserRegistrationEmail(payload);
  }
}
