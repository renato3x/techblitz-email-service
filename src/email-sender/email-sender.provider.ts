import { Type } from '@nestjs/common';
import { EmailSender } from './interfaces/email-sender.interface';
import { NodemailerEmailSenderService } from './services/nodemailer-email-sender.service';

export const emailSenderProviders: Record<EmailSender.EmailSenderProviderOptions, Type<EmailSender>> = {
  nodemailer: NodemailerEmailSenderService,
};
