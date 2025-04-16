import { Module } from '@nestjs/common';
import { UsersModule } from '@/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { EmailSenderModule } from '@/email-sender/email-sender.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EmailSenderModule.forRoot({ provider: process.env.EMAIL_SENDER_PROVIDER }),
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
