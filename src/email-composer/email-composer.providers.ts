import { Type } from '@nestjs/common';
import { EmailComposer } from './interfaces/email-composer.interface';
import { EjsEmailComposerService } from './services/ejs-email-composer/ejs-email-composer.service';

export const emailComposerProviders: Record<EmailComposer.EmailComposerProviderOptions, Type<EmailComposer>> = {
  ejs: EjsEmailComposerService,
};
