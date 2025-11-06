import Favorite from '../models/Favorite.js';
import Listing from '../models/Listing.js';

export default class FavoritesRepository {
  static async create(userId, listingId) {
    const favorite = await Favorite.create({
      userId,
      listingId,
    });
    return favorite;
  }

  static async delete(userId, listingId) {
    const deletedCount = await Favorite.destroy({
      where: {
        userId,
        listingId,
      },
    });
    return deletedCount > 0;
  }

  static async findByUserAndListing(userId, listingId) {
    const favorite = await Favorite.findOne({
      where: {
        userId,
        listingId,
      },
    });
    return favorite;
  }

  static async findByUserId(userId) {
    const favorites = await Favorite.findAll({
      where: { userId },
      include: [
        {
          model: Listing,
          as: 'listing',
        },
      ],
    });
    return favorites;
  }
}
