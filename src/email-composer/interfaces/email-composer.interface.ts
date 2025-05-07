import { SendUserRegistrationEmailDto } from '@/users/dto/send-user-registration-email.dto';

export interface EmailComposer {
  greetings(sendUserRegistrationEmailDto: SendUserRegistrationEmailDto): Promise<string> | string;
}
