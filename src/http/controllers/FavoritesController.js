import FavoritesService from '../../application/services/FavoritesService.js';
import { AddFavoriteDTO } from '../dtos/AddFavoriteDTO.js';
import { RemoveFavoriteDTO } from '../dtos/RemoveFavoriteDTO.js';

export default class FavoritesController {
  static async add(req, res) {
    const userId = req.user.id;
    const addFavoriteDTO = new AddFavoriteDTO(req.body);

    await FavoritesService.add(userId, addFavoriteDTO);

    return res.status(201).send();
  }

  static async remove(req, res) {
    const userId = req.user.id;
    const removeFavoriteDTO = new RemoveFavoriteDTO(req.body);

    await FavoritesService.remove(userId, removeFavoriteDTO);

    return res.status(204).send();
  }

  static async get(req, res) {
    const userId = req.user.id;

    const favorites = await FavoritesService.get(userId);

    return res.status(200).json(favorites);
  }
}
