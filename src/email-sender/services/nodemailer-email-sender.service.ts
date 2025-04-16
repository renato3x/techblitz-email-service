import { Injectable } from '@nestjs/common';
import { EmailSender } from '../interfaces/email-sender.interface';
import { createTransport, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class NodemailerEmailSenderService implements EmailSender {
  private readonly transporter: Transporter;

  constructor() {
    const smtpTransport: SMTPTransport.Options = JSON.parse(process.env.NODEMAILER_SMTP_TRANSPORT_OPTIONS);
    this.transporter = createTransport(smtpTransport);
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
