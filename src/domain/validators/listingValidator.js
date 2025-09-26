import { z } from 'zod';

export const createListingSchema = z.object({
  title: z.string(),
  price: z.number().positive(),
  description: z.string(),
  location: z.object({
    city: z.string(),
    neighborhood: z.string(),
    region: z.string(),
    country: z.string(),
  }),
  bedrooms: z.number().int().nonnegative(),
  bathrooms: z.number().int().nonnegative(),
  square_meters: z.number().positive(),
  owner_contact: z.object({
    name: z.string(),
    phone: z.string(),
    email: z.email(),
  }),
  url: z.string().optional(),
});

export const updateListingSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  price: z.number().positive().optional(),
  description: z.string().optional(),
  location: z
    .object({
      city: z.string().optional(),
      neighborhood: z.string().optional(),
      region: z.string().optional(),
      country: z.string().optional(),
    })
    .optional(),
  bedrooms: z.number().int().nonnegative().optional(),
  bathrooms: z.number().int().nonnegative().optional(),
  square_meters: z.number().positive().optional(),
  owner_contact: z
    .object({
      name: z.string().optional(),
      phone: z.string().optional(),
      email: z.email().optional(),
    })
    .optional(),
  url: z.string().optional(),
});
