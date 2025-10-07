import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string(),
  phone: z.string().regex(/^\d{11,}$/),
  email: z.email(),
  password: z
    .string()
    .min(8)
    .max(64)
    .refine((val) => /[A-Z]/.test(val))
    .refine((val) => /[0-9]/.test(val))
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val)),
});

export const updateUserSchema = z
  .object({
    id: z.number(),
    name: z.string().optional(),
    phone: z
      .string()
      .regex(/^\d{11,}$/)
      .optional(),
    email: z.email().optional(),
    password: z
      .string()
      .min(8)
      .max(64)
      .refine((val) => /[A-Z]/.test(val))
      .refine((val) => /[0-9]/.test(val))
      .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val))
      .optional(),
    newPassword: z
      .string()
      .min(8)
      .max(64)
      .refine((val) => /[A-Z]/.test(val))
      .refine((val) => /[0-9]/.test(val))
      .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val))
      .optional(),
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
  email: z.email(),
  password: z
    .string()
    .min(8)
    .max(64)
    .refine((val) => /[A-Z]/.test(val))
    .refine((val) => /[0-9]/.test(val))
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val)),
});
