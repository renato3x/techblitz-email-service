import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const SendUserRegistrationEmailSchema = z.object({
  name: z
    .string({ message: '"name" is required' })
    .trim()
    .nonempty('"name" cannot be empty')
    .max(50, '"name" is too long')
    .regex(/^[^0-9]*$/, { message: '"name" cannot contain numbers' }),
  username: z
    .string({ message: '"username" is required' })
    .trim()
    .nonempty('"username" is required')
    .refine((val) => !/^\d+$/.test(val), {
      message: '"username" cannot consist of only numbers',
    })
    .refine((val) => /^[a-zA-Z0-9._]+$/.test(val), {
      message: '"username" can only contain letters, numbers, dots, and underscores',
    })
    .refine((val) => !/\.\./.test(val), {
      message: '"username" cannot contain consecutive dots',
    })
    .refine((val) => !/^[.]+$/.test(val), {
      message: '"username" cannot consist of only dots',
    })
    .refine((val) => !/^_+$/.test(val), {
      message: '"username" cannot consist of only underscores',
    }),
  created_at: z
    .string({ message: '"created_at" is required' })
    .datetime('"created_at" must be a datetime')
    .transform((date) => new Date(date)),
  email: z.string({ message: '"email" is required' }).email({ message: '"email" is required' }),
  id: z.string({ message: '"id" is required' }).uuid('"id" must be an uuid'),
});

export class SendUserRegistrationEmailDto extends createZodDto(SendUserRegistrationEmailSchema) {}
