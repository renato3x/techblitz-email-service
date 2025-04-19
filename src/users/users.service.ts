import { Inject, Injectable } from '@nestjs/common';
import { UserRegisteredDto } from './dto/user-registered.dto';
import { EmailSender } from '@/email-sender/interfaces/email-sender.interface';
import { EmailComposer } from '@/email-composer/interfaces/email-composer.interface';
import { EMAIL_SENDER_SERVICE } from '@/email-sender/email-sender.constants';
import { EMAIL_COMPOSER_SERVICE } from '@/email-composer/email-composer.constants';
import { APP_LOGGER_SERVICE } from '@/app-logger/app-logger.constants';
import { AppLogger } from '@/app-logger/interfaces/app-logger.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject(EMAIL_SENDER_SERVICE)
    private readonly emailSender: EmailSender,
    @Inject(EMAIL_COMPOSER_SERVICE)
    private readonly emailComposer: EmailComposer,
    @Inject(APP_LOGGER_SERVICE)
    private readonly logger: AppLogger,
  ) {}

  async sendUserRegistrationEmail(userRegisteredDto: UserRegisteredDto) {
    const { username, id: userId } = userRegisteredDto;

    this.logger.info(`Generating final greetings email template for user ${username}`, {
      context: UsersService.name,
      meta: { userId },
    });

    const html = await this.emailComposer.greetings(userRegisteredDto);

    this.logger.info(`Sending greetings email for user ${username}`, {
      context: UsersService.name,
      meta: { userId },
    });

    await this.emailSender.send({
      from: process.env.FROM_EMAIL_ADDRESS,
      to: userRegisteredDto.email,
      subject: `Welcome to Techblitz, ${username}!`,
      content: html,
    });

    this.logger.info(`Greetings email for user ${username} was sent successfully`, {
      context: UsersService.name,
      meta: { userId },
    });
  }
}
