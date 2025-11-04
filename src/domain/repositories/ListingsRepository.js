import Listing from '../models/Listing.js';

export default class ListingsRepository {
  static async getAll() {
    const listings = await Listing.findAll();
    return listings;
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
    const sucess = await Listing.destroy({ where: { id } });
    return sucess;
  }
}
