import ListingsRepository from '../../domain/repositories/ListingsRepository.js';

export default class ListingsService {
  static async getAll() {
    const listings = await ListingsRepository.getAll();

    if (!listings) {
      throw new Error('Listings not found.', 400);
    }

    return listings;
  }

  static async getById(id) {
    const listing = await ListingsRepository.getById(id);

    if (!listing) {
      throw new Error('Listing not found.', 400);
    }

    return listing;
  }

  static async create(listingDTO) {
    const listing = await ListingsRepository.create(listingDTO);

    if (!listing) {
      throw new Error('Failed to create listing.', 500);
    }

    return listing;
  }
}
