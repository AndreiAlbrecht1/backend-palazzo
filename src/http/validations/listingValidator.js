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
