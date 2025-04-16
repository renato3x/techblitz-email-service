import { UserRegisteredDto } from '@/users/dto/user-registered.dto';

export interface EmailTemplates {
  getUserRegisteredEmailTemplate(userRegisteredDto: UserRegisteredDto): string | Promise<string>;
}
