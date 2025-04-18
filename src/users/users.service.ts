import { Inject, Injectable } from '@nestjs/common';
import { UserRegisteredDto } from './dto/user-registered.dto';
import { EmailSender } from '@/email-sender/interfaces/email-sender.interface';
import { EmailComposer } from '@/email-composer/interfaces/email-composer.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('EMAIL_SENDER_SERVICE')
    private readonly emailSender: EmailSender,
    @Inject('EMAIL_COMPOSER_SERVICE')
    private readonly emailComposer: EmailComposer,
  ) {}

  async sendUserRegistrationEmail(userRegisteredDto: UserRegisteredDto) {
    const html = await this.emailComposer.greetings(userRegisteredDto);

    await this.emailSender.send({
      from: process.env.EMAIL_SERVICE_FROM_ADDRESS,
      to: userRegisteredDto.email,
      subject: `Welcome to Techblitz, ${userRegisteredDto.username}!`,
      content: html,
    });
  }
}
