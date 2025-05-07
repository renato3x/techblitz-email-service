import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const SendUserAccountRecoveryEmailSchema = z.object({
  id: z.number({ message: '"id" is required' }),
  token: z.string({ message: '"token" is required' }).uuid({ message: '"token" must be an uuid' }),
  user_id: z.string({ message: '"user_id" is required' }).uuid({ message: '"user_id" must be an uuid' }),
  expires_at: z
    .string({ message: '"expires_at" is required' })
    .datetime('"expires_at" must be a datetime')
    .transform((val) => new Date(val)),
  created_at: z
    .string({ message: '"created_at" is required' })
    .datetime('"created_at" must be a datetime')
    .transform((val) => new Date(val)),
  user: z.object({
    id: z.string({ message: '"user.id" is required' }).uuid({ message: '"user.id" must be an uuid' }),
    username: z.string({ message: '"user.username" is required' }).trim().nonempty('"user.username" is required'),
    email: z.string({ message: '"user.email" is required' }).email({ message: '"user.email" is required' }),
  }),
});

export class SendUserAccountRecoveryEmailDto extends createZodDto(SendUserAccountRecoveryEmailSchema) {}
