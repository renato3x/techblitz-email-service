import { EmailComposer } from '@/email-composer/interfaces/email-composer.interface';
import { UserRegisteredDto } from '@/users/dto/user-registered.dto';
import { Injectable } from '@nestjs/common';
import ejs from 'ejs';
import juice from 'juice';
import path from 'path';

@Injectable()
export class EjsEmailComposerService implements EmailComposer {
  async greetings(userRegisteredDto: UserRegisteredDto) {
    const filepath = path.resolve(__dirname, 'templates', 'greetings', 'index.ejs');

    const html = await ejs.renderFile(filepath, {
      USERNAME: userRegisteredDto.username,
      CLIENT_URL: process.env.CLIENT_URL,
      REGISTRATION_DATE: userRegisteredDto.created_at.toDateString(),
    });

    return juice(html);
  }
}
