import { Injectable } from '@nestjs/common';
import { UserRegisteredDto } from './dto/user-registered.dto';

@Injectable()
export class UsersService {
  async sendUserRegistrationEmail(userRegisteredDto: UserRegisteredDto) {
    console.log('Sending user registration email for', userRegisteredDto);
  }
}
