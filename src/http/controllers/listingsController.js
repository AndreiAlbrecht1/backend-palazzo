import ListingsService from '../../application/services/listingsService.js';
import { createListingSchema } from '../validations/listingValidator.js';
import { CreateListingDTO } from '../../application/dtos/CreateListingDTO.js';

export default class ListingsController {
  static async getAll(req, res) {
    try {
      const data = await ListingsService.getAll();

      return res.status(200).json(data);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    const id = req.params.id;

    try {
      const data = await ListingsService.getById(id);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    const createListingData = req.body;

    try {
      const validatedData = createListingSchema.parse(createListingData);
      const createListingDTO = new CreateListingDTO(validatedData);
      const data = await ListingsService.create(createListingDTO);

      return res.status(201).json(data);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}
