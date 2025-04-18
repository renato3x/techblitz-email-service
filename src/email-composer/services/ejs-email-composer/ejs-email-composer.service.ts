import { EmailComposer } from '@/email-composer/interfaces/email-composer.interface';
import { UserRegisteredDto } from '@/users/dto/user-registered.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EjsEmailComposerService implements EmailComposer {
  greetings(userRegisteredDto: UserRegisteredDto) {
    return `<p style="font-family: sans-serif;">Be our guest, <b>${userRegisteredDto.username}</b></p>`;
  }
}
