import { Inject, Injectable } from '@nestjs/common';
import { SendUserRegistrationEmailDto } from './dto/send-user-registration-email.dto';
import { EmailSender } from '@/email-sender/interfaces/email-sender.interface';
import { EmailComposer } from '@/email-composer/interfaces/email-composer.interface';
import { EMAIL_SENDER_SERVICE } from '@/email-sender/email-sender.constants';
import { EMAIL_COMPOSER_SERVICE } from '@/email-composer/email-composer.constants';

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
}
