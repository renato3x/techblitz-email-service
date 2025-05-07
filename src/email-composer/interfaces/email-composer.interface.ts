import { SendUserRegistrationEmailDto } from '@/users/dto/send-user-registration-email.dto';
import { SendUserAccountRecoveryEmailDto } from '@/users/dto/send-user-account-recovery-email.dto';

export interface EmailComposer {
  greetings(sendUserRegistrationEmailDto: SendUserRegistrationEmailDto): Promise<string> | string;
  accountRecovery(sendUserAccountRecoveryEmailDto: SendUserAccountRecoveryEmailDto): Promise<string> | string;
}
