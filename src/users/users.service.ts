import { Inject, Injectable } from '@nestjs/common';
import { UserRegisteredDto } from './dto/user-registered.dto';
import { EmailSender } from '@/email-sender/interfaces/email-sender.interface';
import { EmailTemplates } from '@/email-templates/interfaces/email-templates.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('EMAIL_SENDER_SERVICE')
    private readonly emailSender: EmailSender,
    @Inject('EMAIL_TEMPLATES_SERVICE')
    private readonly emailTemplates: EmailTemplates,
  ) {}

  async sendUserRegistrationEmail(userRegisteredDto: UserRegisteredDto) {
    const template = await this.emailTemplates.getUserRegisteredEmailTemplate(userRegisteredDto);

    await this.emailSender.send({
      from: process.env.EMAIL_SENDER_SENDER_EMAIL,
      to: userRegisteredDto.email,
      subject: `Welcome to Techblitz, ${userRegisteredDto.username}!`,
      content: template,
    });
  }
}
