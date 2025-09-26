import ListingsService from '../../application/services/ListingsService.js';
import { CreateListingDTO } from '../dtos/CreateListingDTO.js';
import { UpdateListingDTO } from '../dtos/UpdateListingDTO.js';

export default class ListingsController {
  static async getAll(req, res) {
    const data = await ListingsService.getAll();

    return res.status(200).json(data);
  }

  static async getById(req, res) {
    const id = req.params.id;
    const data = await ListingsService.getById(id);

    return res.status(200).json(data);
  }

  static async create(req, res) {
    const createListingData = req.body;
    const createListingDTO = new CreateListingDTO(createListingData);
    const data = await ListingsService.create(createListingDTO);

    return res.status(201).json(data);
  }

  static async update(req, res) {
    const updateListingData = {
      id: Number(req.params.id),
      ...req.body,
    };
    const updateListingDTO = new UpdateListingDTO(updateListingData);
    const data = await ListingsService.update(updateListingDTO);

    return res.status(200).json(data);
  }

  static async delete(req, res) {
    const id = req.params.id;
    await ListingsService.delete(id);

    return res.status(204).send();
  }
}
