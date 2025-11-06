import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(64, 'Password must be at most 64 characters')
  .refine((val) => /[A-Z]/.test(val), {
    message: 'Password must contain at least one uppercase letter',
  })
  .refine((val) => /[0-9]/.test(val), {
    message: 'Password must contain at least one number',
  })
  .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
    message: 'Password must contain at least one special character',
  });

export const createUserSchema = z.object({
  name: z.string(),
  phone: z.string().regex(/^\d{11,}$/, 'Phone must contain at least 11 digits'),
  email: z.email('Invalid email format'),
  password: passwordSchema,
  role: z.string(),
});

export const updateUserSchema = z
  .object({
    id: z.number(),
    name: z.string().optional(),
    phone: z
      .string()
      .regex(/^\d{11,}$/, 'Phone must contain at least 11 digits')
      .optional(),
    email: z.email('Invalid email format').optional(),
    password: passwordSchema.optional(),
    newPassword: passwordSchema.optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword && !data.password) return false;
      return true;
    },
    {
      message: 'Current password is required when setting a new password.',
      path: ['password'],
    },
  );

export const loginSchema = z.object({
  email: z.email('Invalid email format'),
  password: passwordSchema,
});
