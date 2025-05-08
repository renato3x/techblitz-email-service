import { SendUserRegistrationEmailDto } from '@/users/dto/send-user-registration-email.dto';
import { SendUserAccountRecoveryEmailDto } from '@/users/dto/send-user-account-recovery-email.dto';
import { SendUserDataUpdatedEmailDto } from '@/users/dto/send-user-data-updated-email.dto';
import { SendUserPasswordUpdatedEmailDto } from '@/users/dto/send-user-password-updated-email.dto';
import { SendUserPasswordResetEmailDto } from '@/users/dto/send-user-password-reset-email.dto';

export interface EmailComposer {
  greetings(sendUserRegistrationEmailDto: SendUserRegistrationEmailDto): Promise<string> | string;
  accountRecovery(sendUserAccountRecoveryEmailDto: SendUserAccountRecoveryEmailDto): Promise<string> | string;
  userDataUpdated(sendUserDataUpdatedEmailDto: SendUserDataUpdatedEmailDto): Promise<string> | string;
  userPasswordUpdated(sendUserPasswordUpdatedEmailDto: SendUserPasswordUpdatedEmailDto): Promise<string> | string;
  userPasswordReset(sendUserPasswordResetEmailDto: SendUserPasswordResetEmailDto): Promise<string> | string;
}
