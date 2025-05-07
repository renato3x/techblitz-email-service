import { EmailComposer } from '@/email-composer/interfaces/email-composer.interface';
import { SendUserRegistrationEmailDto } from '@/users/dto/send-user-registration-email.dto';
import { Injectable } from '@nestjs/common';
import ejs from 'ejs';
import juice from 'juice';
import path from 'path';

@Injectable()
export class EjsEmailComposerService implements EmailComposer {
  async greetings(sendUserRegistrationEmailDto: SendUserRegistrationEmailDto) {
    const filepath = path.resolve(__dirname, 'templates', 'greetings.ejs');

    const html = await ejs.renderFile(filepath, {
      USERNAME: sendUserRegistrationEmailDto.username,
      CLIENT_URL: process.env.CLIENT_URL,
      REGISTRATION_DATE: sendUserRegistrationEmailDto.created_at.toDateString(),
    });

    return juice(html);
  }
}
