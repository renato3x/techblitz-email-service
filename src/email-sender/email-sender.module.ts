import { DynamicModule, Global, Module } from '@nestjs/common';
import { NodemailerEmailSenderService } from './services/nodemailer-email-sender.service';

@Global()
@Module({})
export class EmailSenderModule {
  static forRoot(options: { provider: EmailSender.EmailSenderProviderOptions }): DynamicModule {
    let useClass;

    switch (options.provider) {
      case 'nodemailer':
        useClass = NodemailerEmailSenderService;
        break;
      default:
        throw new Error('Email sender provider not supported');
    }

    return {
      module: EmailSenderModule,
      providers: [
        {
          provide: 'EMAIL_SENDER_SERVICE',
          useClass,
        },
      ],
      exports: ['EMAIL_SENDER_SERVICE'],
    };
  }
}
