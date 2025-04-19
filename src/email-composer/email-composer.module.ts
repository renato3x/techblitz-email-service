import { DynamicModule, Global, Module } from '@nestjs/common';
import { EMAIL_COMPOSER_SERVICE } from './email-composer.constants';
import { emailComposerProviders } from './email-composer.providers';

@Global()
@Module({})
export class EmailComposerModule {
  static forRoot(options: { provider: EmailComposer.EmailComposerProviderOptions }): DynamicModule {
    const emailComposerService = emailComposerProviders[options.provider];

    if (!emailComposerProviders) {
      throw new Error('Email composer provider not supported');
    }

    return {
      module: EmailComposerModule,
      providers: [
        {
          provide: EMAIL_COMPOSER_SERVICE,
          useClass: emailComposerService,
        },
      ],
      exports: [EMAIL_COMPOSER_SERVICE],
    };
  }
}
