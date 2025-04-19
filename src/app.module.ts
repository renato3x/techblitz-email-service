import { Module } from '@nestjs/common';
import { UsersModule } from '@/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { EmailSenderModule } from '@/email-sender/email-sender.module';
import { EmailComposerModule } from './email-composer/email-composer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EmailSenderModule.forRoot({ provider: process.env.EMAIL_SENDER_PROVIDER }),
    EmailComposerModule.forRoot({ provider: process.env.EMAIL_COMPOSER_PROVIDER }),
    UsersModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
