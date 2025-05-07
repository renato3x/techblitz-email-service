import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const SendUserRegistrationEmailSchema = z.object({
  name: z
    .string({ message: 'Name is required' })
    .trim()
    .nonempty('Name cannot be empty')
    .max(50, 'Name is too long')
    .regex(/^[^0-9]*$/, { message: 'Name cannot contain numbers' }),
  username: z
    .string({ message: 'Username is required' })
    .trim()
    .nonempty('Username cannot be empty')
    .refine((val) => !/^\d+$/.test(val), {
      message: 'Username cannot consist of only numbers',
    })
    .refine((val) => /^[a-zA-Z0-9._]+$/.test(val), {
      message: 'Username can only contain letters, numbers, dots, and underscores',
    })
    .refine((val) => !/\.\./.test(val), {
      message: 'Username cannot contain consecutive dots',
    })
    .refine((val) => !/^[.]+$/.test(val), {
      message: 'Username cannot consist of only dots',
    })
    .refine((val) => !/^_+$/.test(val), {
      message: 'Username cannot consist of only underscores',
    }),
  created_at: z
    .string({ message: 'CreatedAt is required' })
    .datetime('Created at must be a date')
    .transform((date) => new Date(date)),
  email: z.string({ message: 'Email is required' }).email({ message: 'Email is invalid' }),
  id: z.string({ message: 'Id is required' }).uuid('Id must be an uuid'),
});

export class SendUserRegistrationEmailDto extends createZodDto(SendUserRegistrationEmailSchema) {}
