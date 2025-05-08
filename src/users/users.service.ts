import { Inject, Injectable } from '@nestjs/common';
import { SendUserRegistrationEmailDto } from './dto/send-user-registration-email.dto';
import { EmailSender } from '@/email-sender/interfaces/email-sender.interface';
import { EmailComposer } from '@/email-composer/interfaces/email-composer.interface';
import { EMAIL_SENDER_SERVICE } from '@/email-sender/email-sender.constants';
import { EMAIL_COMPOSER_SERVICE } from '@/email-composer/email-composer.constants';
import { SendUserAccountRecoveryEmailDto } from './dto/send-user-account-recovery-email.dto';
import { SendUserDataUpdatedEmailDto } from './dto/send-user-data-updated-email.dto';
import { SendUserPasswordUpdatedEmailDto } from './dto/send-user-password-updated-email.dto';
import { SendUserPasswordResetEmailDto } from './dto/send-user-password-reset-email.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(EMAIL_SENDER_SERVICE)
    private readonly emailSender: EmailSender,
    @Inject(EMAIL_COMPOSER_SERVICE)
    private readonly emailComposer: EmailComposer,
  ) {}

  async sendUserRegistrationEmail(sendUserRegistrationEmailDto: SendUserRegistrationEmailDto) {
    const html = await this.emailComposer.greetings(sendUserRegistrationEmailDto);

    await this.emailSender.send({
      from: process.env.FROM_EMAIL_ADDRESS,
      to: sendUserRegistrationEmailDto.email,
      subject: `Welcome to Techblitz, ${sendUserRegistrationEmailDto.username}!`,
      content: html,
    });
  }

  async sendUserAccountRecoveryEmail(sendUserAccountRecoveryEmailDto: SendUserAccountRecoveryEmailDto) {
    const html = await this.emailComposer.accountRecovery(sendUserAccountRecoveryEmailDto);
    const { user } = sendUserAccountRecoveryEmailDto;

    await this.emailSender.send({
      from: process.env.FROM_EMAIL_ADDRESS,
      to: user.email,
      subject: `Recover access to your Techblitz account, ${user.username}`,
      content: html,
    });
  }

  async sendUserDataUpdatedEmail(sendUserDataUpdatedEmailDto: SendUserDataUpdatedEmailDto) {
    const html = await this.emailComposer.userDataUpdated(sendUserDataUpdatedEmailDto);
    const { email, username } = sendUserDataUpdatedEmailDto;

    await this.emailSender.send({
      from: process.env.FROM_EMAIL_ADDRESS,
      to: email,
      subject: `Your data was updated, ${username}`,
      content: html,
    });
  }

  async sendUserPasswordUpdatedEmail(sendUserPasswordUpdatedEmailDto: SendUserPasswordUpdatedEmailDto) {
    const html = await this.emailComposer.userPasswordUpdated(sendUserPasswordUpdatedEmailDto);
    const { email, username } = sendUserPasswordUpdatedEmailDto;

    await this.emailSender.send({
      from: process.env.FROM_EMAIL_ADDRESS,
      to: email,
      subject: `Your password was updated, ${username}`,
      content: html,
    });
  }

  async sendUserPasswordResetEmail(sendUserPasswordResetEmailDto: SendUserPasswordResetEmailDto) {
    const html = await this.emailComposer.userPasswordReset(sendUserPasswordResetEmailDto);
    const { email, username } = sendUserPasswordResetEmailDto;

    await this.emailSender.send({
      from: process.env.FROM_EMAIL_ADDRESS,
      to: email,
      subject: `Your password was reset, ${username}`,
      content: html,
    });
  }
}
