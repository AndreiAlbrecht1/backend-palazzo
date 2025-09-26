
export default class ListingsService {

    static async getAll() {
        // const listings = await ListingsRepository.findAll();

        const listings = 0

        if (!listings) {
            throw new Error('Listings not found.', 400);
        }


        return listings;
  }
}