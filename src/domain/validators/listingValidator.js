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
  squareMeters: z.number().positive(),
  images: z.array(z.string()).nonempty(),
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
  squareMeters: z.number().positive().optional(),
  newImages: z.array(z.string()).optional(),
});
