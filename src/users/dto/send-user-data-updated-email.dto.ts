import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const SendUserDataUpdatedEmailSchema = z.object({
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
  updated_at: z
    .string({ message: '"updated_at" is required' })
    .datetime('"updated_at" must be a datetime')
    .transform((date) => new Date(date)),
  email: z.string({ message: '"email" is required' }).email({ message: '"email" is required' }),
});

export class SendUserDataUpdatedEmailDto extends createZodDto(SendUserDataUpdatedEmailSchema) {}
