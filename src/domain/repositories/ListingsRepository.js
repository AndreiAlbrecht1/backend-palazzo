import Listing from '../models/Listing.js';
import { Op } from 'sequelize';

export default class ListingsRepository {
  static async getAll(filters = {}, page = 1, limit = 6) {
    const where = {};

    const exactFilters = {
      type: filters.type,
    };

    Object.entries(exactFilters).forEach(([key, value]) => {
      if (value) where[key] = value;
    });

    const textFilters = {
      country: filters.country,
      city: filters.city,
    };

    Object.entries(textFilters).forEach(([key, value]) => {
      if (value) where[key] = { [Op.iLike]: `%${value}%` };
    });

    if (filters.search) {
      const searchFields = [
        'title',
        'description',
        'city',
        'neighborhood',
        'region',
        'country',
      ];

      const fieldsToSearch = searchFields.filter((field) => {
        if (field === 'city' && filters.city) return false;
        if (field === 'country' && filters.country) return false;
        return true;
      });

      where[Op.or] = fieldsToSearch.map((field) => ({
        [field]: { [Op.iLike]: `%${filters.search}%` },
      }));
    }

    const minFilters = {
      bedrooms: filters.minBedrooms,
      bathrooms: filters.minBathrooms,
      squareMeters: filters.minSquareMeters,
    };

    Object.entries(minFilters).forEach(([key, value]) => {
      if (value !== undefined) where[key] = { [Op.gte]: value };
    });

    const priceRange = {};
    if (filters.minPrice !== undefined) priceRange[Op.gte] = filters.minPrice;
    if (filters.maxPrice !== undefined) priceRange[Op.lte] = filters.maxPrice;
    if (Object.getOwnPropertySymbols(priceRange).length > 0)
      where.price = priceRange;

    const offset = (page - 1) * limit;

    const { count, rows } = await Listing.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });

    return {
      listings: rows,
      total: count,
      totalPages: Math.ceil(count / limit),
    };
  }

  static async getById(id) {
    const listing = await Listing.findByPk(id);
    return listing;
  }

  static async create(listingData) {
    const listing = await Listing.create(listingData);
    return listing;
  }

  static async update(listing) {
    const fieldsToUpdate = {};
    for (const [key, value] of Object.entries(listing)) {
      if (value !== undefined) {
        fieldsToUpdate[key] = value;
      }
    }
    const [updatedRowsCount] = await Listing.update(fieldsToUpdate, {
      where: { id: listing.id },
    });

    return updatedRowsCount > 0;
  }

  static async delete(id) {
    const success = await Listing.destroy({ where: { id } });
    return success;
  }
}
