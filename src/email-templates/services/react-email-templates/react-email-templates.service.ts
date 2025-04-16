import { EmailTemplates } from '@/email-templates/interfaces/email-templates.interface';
import { UserRegisteredDto } from '@/users/dto/user-registered.dto';
import { Injectable } from '@nestjs/common';
import { renderToStaticMarkup } from 'react-dom/server';

// templates
import UserRegisteredTemplate from './templates/UserRegisteredTemplate';

@Injectable()
export class ReactEmailTemplatesService implements EmailTemplates {
  getUserRegisteredEmailTemplate(userRegisteredDto: UserRegisteredDto): string {
    return renderToStaticMarkup(UserRegisteredTemplate({ userRegisteredDto }));
  }
}
