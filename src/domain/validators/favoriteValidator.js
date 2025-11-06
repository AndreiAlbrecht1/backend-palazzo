import { z } from 'zod';

export const addFavoriteSchema = z.object({
  listingId: z.number().positive(),
});

export const removeFavoriteSchema = z.object({
  listingId: z.number().positive(),
});
