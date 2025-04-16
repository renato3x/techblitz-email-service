import { DynamicModule, Global, Module } from '@nestjs/common';
import { ReactEmailTemplatesService } from './services/react-email-templates/react-email-templates.service';

@Global()
@Module({})
export class EmailTemplatesModule {
  static forRoot(options: { provider: EmailTemplates.EmailTemplatesProviders }): DynamicModule {
    let useClass;

    switch (options.provider) {
      case 'react':
        useClass = ReactEmailTemplatesService;
        break;
      default:
        throw new Error('Email templates provider not supported');
    }

    return {
      module: EmailTemplatesModule,
      providers: [
        {
          provide: 'EMAIL_TEMPLATES_SERVICE',
          useClass,
        },
      ],
      exports: ['EMAIL_TEMPLATES_SERVICE'],
    };
  }
}
