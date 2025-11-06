import FavoritesRepository from '../../domain/repositories/FavoritesRepository.js';
import ListingsRepository from '../../domain/repositories/ListingsRepository.js';
import { AppError } from '../../shared/errors/AppError.js';
import {
  addFavoriteSchema,
  removeFavoriteSchema,
} from '../../domain/validators/favoriteValidator.js';

export default class FavoritesService {
  static async add(userId, favoriteData) {
    const validatedData = addFavoriteSchema.parse(favoriteData);

    const listing = await ListingsRepository.getById(validatedData.listingId);

    if (!listing) {
      throw new AppError('Listing not found.', 404);
    }

    const existingFavorite = await FavoritesRepository.findByUserAndListing(
      userId,
      validatedData.listingId,
    );

    if (existingFavorite) {
      throw new AppError('Listing already favorited.', 400);
    }

    const favorite = await FavoritesRepository.create(
      userId,
      validatedData.listingId,
    );

    return favorite;
  }

  static async remove(userId, favoriteData) {
    const validatedData = removeFavoriteSchema.parse(favoriteData);

    const existingFavorite = await FavoritesRepository.findByUserAndListing(
      userId,
      validatedData.listingId,
    );

    if (!existingFavorite) {
      throw new AppError('Favorite not found.', 404);
    }

    const success = await FavoritesRepository.delete(
      userId,
      validatedData.listingId,
    );

    if (!success) {
      throw new AppError('Failed to remove favorite.', 400);
    }

    return;
  }

  static async get(userId) {
    const favorites = await FavoritesRepository.findByUserId(userId);

    return favorites;
  }
}
