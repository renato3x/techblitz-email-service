import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SendUserRegistrationEmailDto } from './dto/send-user-registration-email.dto';
import { SendUserAccountRecoveryEmailDto } from './dto/send-user-account-recovery-email.dto';
import { SendUserDataUpdatedEmailDto } from './dto/send-user-data-updated-email.dto';
import { SendUserPasswordUpdatedEmailDto } from './dto/send-user-password-updated-email.dto';
import { SendUserPasswordResetEmailDto } from './dto/send-user-password-reset-email.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern('user.registered')
  async handleUserRegistered(@Payload() payload: SendUserRegistrationEmailDto) {
    await this.usersService.sendUserRegistrationEmail(payload);
  }

  @EventPattern('user.updated')
  async handleUserUpdated(@Payload() payload: SendUserDataUpdatedEmailDto) {
    await this.usersService.sendUserDataUpdatedEmail(payload);
  }

  @EventPattern('user.password-updated')
  async handleUserPasswordUpdated(@Payload() payload: SendUserPasswordUpdatedEmailDto) {
    await this.usersService.sendUserPasswordUpdatedEmail(payload);
  }

  @EventPattern('user.account-recovery')
  async handleUserAccountRecovery(@Payload() payload: SendUserAccountRecoveryEmailDto) {
    await this.usersService.sendUserAccountRecoveryEmail(payload);
  }

  @EventPattern('user.password-reset')
  async handleUserPasswordReset(@Payload() payload: SendUserPasswordResetEmailDto) {
    await this.usersService.sendUserPasswordResetEmail(payload);
  }
}
