import { DynamicModule, Global, Module } from '@nestjs/common';
import { EjsEmailComposerService } from './services/ejs-email-composer/ejs-email-composer.service';

@Global()
@Module({})
export class EmailComposerModule {
  static forRoot(options: { provider: EmailComposer.EmailComposerProviderOptions }): DynamicModule {
    let useClass;

    switch (options.provider) {
      case 'ejs':
        useClass = EjsEmailComposerService;
        break;
      default:
        throw new Error('Email composer provider not supported');
    }

    return {
      module: EmailComposerModule,
      providers: [
        {
          provide: 'EMAIL_COMPOSER_SERVICE',
          useClass,
        },
      ],
      exports: ['EMAIL_COMPOSER_SERVICE'],
    };
  }
}
