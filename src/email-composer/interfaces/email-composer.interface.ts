import { SendUserRegistrationEmailDto } from '@/users/dto/send-user-registration-email.dto';
import { SendUserAccountRecoveryEmailDto } from '@/users/dto/send-user-account-recovery-email.dto';
import { SendUserDataUpdatedEmailDto } from '@/users/dto/send-user-data-updated-email.dto';

export interface EmailComposer {
  greetings(sendUserRegistrationEmailDto: SendUserRegistrationEmailDto): Promise<string> | string;
  accountRecovery(sendUserAccountRecoveryEmailDto: SendUserAccountRecoveryEmailDto): Promise<string> | string;
  userDataUpdated(sendUserDataUpdatedEmailDto: SendUserDataUpdatedEmailDto): Promise<string> | string;
}
