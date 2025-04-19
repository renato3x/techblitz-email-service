import { Controller, Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UserRegisteredDto } from './dto/user-registered.dto';
import { APP_LOGGER_SERVICE } from '@/app-logger/app-logger.constants';
import { AppLogger } from '@/app-logger/interfaces/app-logger.interface';

@Controller()
export class UsersController {
  constructor(
    @Inject(APP_LOGGER_SERVICE)
    private readonly logger: AppLogger,
    private readonly usersService: UsersService,
  ) {}

  @EventPattern('user.registered')
  async handleUserRegistered(@Payload() payload: UserRegisteredDto) {
    this.logger.info(`Triggered greetings email for user '${payload.username}`, {
      context: UsersController.name,
      meta: {
        userId: payload.id,
      },
    });

    await this.usersService.sendUserRegistrationEmail(payload);
  }
}
