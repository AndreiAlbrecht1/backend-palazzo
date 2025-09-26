import ListingsRepository from '../../domain/repositories/ListingsRepository.js';
import { AppError } from '../../shared/errors/AppError.js';
import {
  createListingSchema,
  updateListingSchema,
} from '../../domain/validators/listingValidator.js';

export default class ListingsService {
  static async getAll() {
    const listings = await ListingsRepository.getAll();

    if (listings.length === 0) {
      throw new AppError('Listings not found.', 404);
    }

    return listings;
  }

  static async getById(id) {
    const listing = await ListingsRepository.getById(id);

    if (!listing) {
      throw new AppError('Listing not found.', 404);
    }

    return listing;
  }

  static async create(listingDTO) {
    const validatedListing = createListingSchema.parse(listingDTO);
    const listing = await ListingsRepository.create(validatedListing);

    return listing;
  }

  static async update(listingDTO) {
    const fieldsToUpdate = Object.fromEntries(
      Object.entries(listingDTO).filter(([_, value]) => value !== undefined),
    );
    const validatedListing = updateListingSchema.parse(fieldsToUpdate);

    const listing = await ListingsRepository.update(validatedListing);

    if (!listing) {
      throw new AppError('Listing not found.', 404);
    }

    return listing;
  }

  static async delete(id) {
    const success = await ListingsRepository.delete(id);

    if (!success) {
      throw new AppError('Listing not found.', 404);
    }

    return;
  }
}
