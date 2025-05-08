import { EmailComposer } from '@/email-composer/interfaces/email-composer.interface';
import { SendUserAccountRecoveryEmailDto } from '@/users/dto/send-user-account-recovery-email.dto';
import { SendUserRegistrationEmailDto } from '@/users/dto/send-user-registration-email.dto';
import { SendUserDataUpdatedEmailDto } from '@/users/dto/send-user-data-updated-email.dto';
import { SendUserPasswordResetEmailDto } from '@/users/dto/send-user-password-reset-email.dto';
import { SendUserPasswordUpdatedEmailDto } from '@/users/dto/send-user-password-updated-email.dto';
import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import ejs from 'ejs';
import juice from 'juice';
import path from 'path';

@Injectable()
export class EjsEmailComposerService implements EmailComposer {
  async greetings(sendUserRegistrationEmailDto: SendUserRegistrationEmailDto) {
    const filepath = path.resolve(__dirname, 'templates', 'greetings.ejs');
    const { created_at } = sendUserRegistrationEmailDto;
    const createdAt = DateTime.fromJSDate(created_at);

    const html = await ejs.renderFile(filepath, {
      USERNAME: sendUserRegistrationEmailDto.username,
      CLIENT_URL: process.env.CLIENT_URL,
      REGISTRATION_DATE: createdAt.toFormat("MMMM d, yyyy 'at' h:mm a"),
    });

    return juice(html);
  }

  async accountRecovery(sendUserAccountRecoveryEmailDto: SendUserAccountRecoveryEmailDto) {
    const { user, token, created_at, expires_at } = sendUserAccountRecoveryEmailDto;
    const filepath = path.resolve(__dirname, 'templates', 'account-recovery.ejs');
    const createdAt = DateTime.fromJSDate(created_at);
    const expiresAt = DateTime.fromJSDate(expires_at);

    const expirationTimeInMinutes = expiresAt.diff(createdAt, 'minutes').minutes;

    const html = await ejs.renderFile(filepath, {
      USERNAME: user.username,
      EMAIL: user.email,
      EXPIRATION_TIME_IN_MINUTES: Math.round(expirationTimeInMinutes),
      ACCOUNT_RECOVERY_URL: `${process.env.CLIENT_URL}/reset-password?token=${token}`,
      ACCOUNT_RECOVERY_SOLICITATION_DATE: createdAt.toFormat("MMMM d, yyyy 'at' h:mm a"),
    });

    return juice(html);
  }

  async userDataUpdated({ username, email, updated_at }: SendUserDataUpdatedEmailDto) {
    const filepath = path.resolve(__dirname, 'templates', 'user-data-updated.ejs');
    const html = await ejs.renderFile(filepath, {
      USERNAME: username,
      EMAIL: email,
      UPDATED_AT: DateTime.fromJSDate(updated_at).toFormat("MMMM d, yyyy 'at' h:mm a"),
    });

    return juice(html);
  }

  async userPasswordUpdated({ username, email, updated_at }: SendUserPasswordUpdatedEmailDto) {
    const filepath = path.resolve(__dirname, 'templates', 'user-password-updated.ejs');
    const html = await ejs.renderFile(filepath, {
      USERNAME: username,
      EMAIL: email,
      UPDATED_AT: DateTime.fromJSDate(updated_at).toFormat("MMMM d, yyyy 'at' h:mm a"),
    });

    return juice(html);
  }

  async userPasswordReset({ username, email, updated_at }: SendUserPasswordResetEmailDto) {
    const filepath = path.resolve(__dirname, 'templates', 'user-password-reset.ejs');
    const html = await ejs.renderFile(filepath, {
      USERNAME: username,
      EMAIL: email,
      UPDATED_AT: DateTime.fromJSDate(updated_at).toFormat("MMMM d, yyyy 'at' h:mm a"),
    });

    return juice(html);
  }
}
