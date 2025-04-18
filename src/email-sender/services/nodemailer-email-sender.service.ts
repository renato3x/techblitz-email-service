import { Injectable } from '@nestjs/common';
import { EmailSender } from '../interfaces/email-sender.interface';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class NodemailerEmailSenderService implements EmailSender {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: process.env.EMAIL_SERVICE_NODEMAILER_HOST,
      port: +process.env.EMAIL_SERVICE_NODEMAILER_PORT,
      auth: {
        user: process.env.EMAIL_SERVICE_NODEMAILER_USER,
        pass: process.env.EMAIL_SERVICE_NODEMAILER_PASS,
      },
    });
  }

  async send(options: EmailSender.SendEmailOptions) {
    await this.transporter.sendMail({
      from: options.from,
      to: options.to,
      subject: options.subject,
      html: options.content,
    });
  }
}
