import { Injectable } from '@nestjs/common';
import { EmailSender } from '../interfaces/email-sender.interface';

@Injectable()
export class NodemailerEmailSenderService implements EmailSender {
  async send(options: EmailSender.SendEmailOptions) {
    console.log('Sending email with options', options);
  }
}
