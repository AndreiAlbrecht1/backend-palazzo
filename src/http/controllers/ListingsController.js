import ListingsService from '../../application/services/ListingsService.js';
import { CreateListingDTO } from '../dtos/CreateListingDTO.js';
import { UpdateListingDTO } from '../dtos/UpdateListingDTO.js';

export default class ListingsController {
  static async getAll(req, res) {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 6;

    const filters = {
      type: req.query.type,
      search: req.query.search,
      country: req.query.country,
      city: req.query.city,
      minBedrooms: req.query.minBedrooms
        ? Number(req.query.minBedrooms)
        : undefined,
      minBathrooms: req.query.minBathrooms
        ? Number(req.query.minBathrooms)
        : undefined,
      minSquareMeters: req.query.minSquareMeters
        ? Number(req.query.minSquareMeters)
        : undefined,
      minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
    };

    const data = await ListingsService.getAll(filters, page, limit);
    return res.status(200).json(data);
  }

  static async getById(req, res) {
    const id = req.params.id;
    const data = await ListingsService.getById(id);
    return res.status(200).json(data);
  }

  static async create(req, res) {
    const imagesKeys = req.files?.map((f) => f.key) || [];

    const createListingData = {
      ...req.body,
      price: Number(req.body.price),
      bedrooms: Number(req.body.bedrooms),
      bathrooms: Number(req.body.bathrooms),
      squareMeters: Number(req.body.squareMeters),
      images: imagesKeys,
    };
    const createListingDTO = new CreateListingDTO(createListingData);
    const data = await ListingsService.create(createListingDTO);

    return res.status(201).json(data);
  }

  static async update(req, res) {
    const imagesKeys = req.files?.map((f) => f.key) || [];
    const updateListingData = {
      id: Number(req.params.id),
      price: req.body.price ? Number(req.body.price) : undefined,
      bedrooms: req.body.bedrooms ? Number(req.body.bedrooms) : undefined,
      bathrooms: req.body.bathrooms ? Number(req.body.bathrooms) : undefined,
      squareMeters: req.body.squareMeters
        ? Number(req.body.squareMeters)
        : undefined,
      newImages: imagesKeys,
      imagesToDelete: req.body.imagesToDelete ?? undefined,
    };

    const updateListingDTO = new UpdateListingDTO(updateListingData);

    await ListingsService.update(updateListingDTO);

    return res.status(204).json();
  }

  static async delete(req, res) {
    const id = req.params.id;
    await ListingsService.delete(id);
    return res.status(204).send();
  }
}
