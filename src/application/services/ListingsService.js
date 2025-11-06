import ListingsRepository from '../../domain/repositories/ListingsRepository.js';
import { AppError } from '../../shared/errors/AppError.js';
import {
  createListingSchema,
  updateListingSchema,
} from '../../domain/validators/listingValidator.js';
import { S3Service } from './s3Service.js';
import GeocodingService from './GeocodingService.js';

export default class ListingsService {
  static async getAll(filters = {}, page = 1, limit = 6) {
    const { listings, total, totalPages } = await ListingsRepository.getAll(
      filters,
      page,
      limit,
    );

    if (listings.length === 0) {
      return {
        data: [],
        pagination: {
          currentPage: page,
          totalPages: 0,
          totalItems: 0,
          itemsPerPage: limit,
        },
      };
    }

    const dataWithUrls = await Promise.all(
      listings.map((listing) => S3Service.processListingImages(listing)),
    );

    return {
      data: dataWithUrls,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit,
      },
    };
  }

  static async getById(id) {
    const listing = await ListingsRepository.getById(id);

    if (!listing) {
      throw new AppError('Listing not found.', 404);
    }

    const dataWithUrls = await S3Service.processListingImages(listing);

    return dataWithUrls;
  }

  static async create(listingDTO) {
    const validatedListing = createListingSchema.parse(listingDTO);

    const { latitude, longitude } = await GeocodingService.getCoordinates(
      validatedListing.city,
      validatedListing.neighborhood,
      validatedListing.region,
      validatedListing.country,
    );

    validatedListing.latitude = latitude;
    validatedListing.longitude = longitude;

    const listing = await ListingsRepository.create(validatedListing);

    return listing;
  }

  static async update(listingDTO) {
    const fieldsToUpdate = Object.fromEntries(
      Object.entries(listingDTO).filter(([_, value]) => value !== undefined),
    );

    const validatedListing = updateListingSchema.parse(fieldsToUpdate);

    const existingListing = await ListingsRepository.getById(
      validatedListing.id,
    );
    if (!existingListing) {
      throw new AppError('Listing not found.', 404);
    }

    const addressChanged =
      validatedListing.city ||
      validatedListing.neighborhood ||
      validatedListing.region ||
      validatedListing.country;

    if (addressChanged) {
      const { latitude, longitude } = await GeocodingService.getCoordinates(
        validatedListing.city || existingListing.city,
        validatedListing.neighborhood || existingListing.neighborhood,
        validatedListing.region || existingListing.region,
        validatedListing.country || existingListing.country,
      );

      validatedListing.latitude = latitude;
      validatedListing.longitude = longitude;
    }

    let currentImages = existingListing.images || [];

    if (
      validatedListing.imagesToDelete &&
      validatedListing.imagesToDelete.length > 0
    ) {
      await Promise.all(
        validatedListing.imagesToDelete.map((key) => S3Service.deleteFile(key)),
      );
      const keysToDelete = new Set(validatedListing.imagesToDelete);
      currentImages = currentImages.filter((key) => !keysToDelete.has(key));
    }

    if (validatedListing.newImages && validatedListing.newImages.length > 0) {
      currentImages = [...currentImages, ...validatedListing.newImages];
    }

    validatedListing.images = currentImages;

    delete validatedListing.newImages;
    delete validatedListing.imagesToDelete;

    const success = await ListingsRepository.update(validatedListing);

    if (!success) {
      throw new AppError('No data was updated.', 404);
    }

    return;
  }

  static async delete(id) {
    const listing = await ListingsRepository.getById(id);

    if (!listing) {
      throw new AppError('Listing not found.', 404);
    }

    if (listing.images && listing.images.length > 0) {
      await Promise.all(listing.images.map((key) => S3Service.deleteFile(key)));
    }

    const success = await ListingsRepository.delete(id);

    if (!success) {
      throw new AppError('Failed to delete listing.', 500);
    }

    return;
  }
}
