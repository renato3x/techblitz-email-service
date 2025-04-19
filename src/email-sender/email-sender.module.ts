import { DynamicModule, Global, Module } from '@nestjs/common';
import { emailSenderProviders } from './email-sender.provider';
import { EMAIL_SENDER_SERVICE } from './email-sender.constants';

@Global()
@Module({})
export class EmailSenderModule {
  static forRoot(options: { provider: EmailSender.EmailSenderProviderOptions }): DynamicModule {
    const emailSenderService = emailSenderProviders[options.provider];

    if (!emailSenderProviders) {
      throw new Error('Email sender provider not supported');
    }

    return {
      module: EmailSenderModule,
      providers: [
        {
          provide: EMAIL_SENDER_SERVICE,
          useClass: emailSenderService,
        },
      ],
      exports: [EMAIL_SENDER_SERVICE],
    };
  }
}
