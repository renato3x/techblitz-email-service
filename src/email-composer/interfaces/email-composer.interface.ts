import { UserRegisteredDto } from '@/users/dto/user-registered.dto';

export interface EmailComposer {
  greetings(userRegisteredDto: UserRegisteredDto): Promise<string> | string;
}
