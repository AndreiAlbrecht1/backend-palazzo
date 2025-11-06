import { z } from 'zod';

export const createListingSchema = z.object({
  title: z.string(),
  price: z.number().positive(),
  description: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  region: z.string(),
  country: z.string(),
  bedrooms: z.number().int().nonnegative(),
  bathrooms: z.number().int().nonnegative(),
  squareMeters: z.number().positive(),
  images: z.array(z.string()).nonempty(),
  contactPhone: z.string(),
  contactEmail: z.email(),
});

export const updateListingSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  price: z.number().positive().optional(),
  description: z.string().optional(),
  city: z.string().optional(),
  neighborhood: z.string().optional(),
  region: z.string().optional(),
  country: z.string().optional(),
  bedrooms: z.number().int().nonnegative().optional(),
  bathrooms: z.number().int().nonnegative().optional(),
  squareMeters: z.number().positive().optional(),
  newImages: z.array(z.string()).optional(),
  imagesToDelete: z.array(z.string()).optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.email().optional(),
});
