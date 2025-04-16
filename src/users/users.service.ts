import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async sendUserRegistrationEmail(user: unknown) {
    console.log('Sending user registration email for', user);
  }
}
