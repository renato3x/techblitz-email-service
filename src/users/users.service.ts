import { Inject, Injectable } from '@nestjs/common';
import { UserRegisteredDto } from './dto/user-registered.dto';
import { EmailSender } from '@/email-sender/interfaces/email-sender.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('EMAIL_SENDER_SERVICE')
    private readonly emailSender: EmailSender,
  ) {}

  async sendUserRegistrationEmail(userRegisteredDto: UserRegisteredDto) {
    await this.emailSender.send({
      from: process.env.EMAIL_SERVICE_FROM_ADDRESS,
      to: userRegisteredDto.email,
      subject: `Welcome to Techblitz, ${userRegisteredDto.username}!`,
      content: `<p style="font-family: "Arial", sans-serif;">Be our guest, <b>${userRegisteredDto.username}</b></p>`,
    });
  }
}
