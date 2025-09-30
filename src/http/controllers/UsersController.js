import UsersService from '../../application/services/UsersService.js';
import { UpdateUserDTO } from '../dtos/UpdateUserDTO.js';

export default class UsersController {
  static async getAll(req, res) {
    const data = await UsersService.getAll();

    return res.status(200).json(data);
  }

  static async getById(req, res) {
    const id = req.params.id;
    const data = await UsersService.getById(id);

    return res.status(200).json(data);
  }

  static async update(req, res) {
    const updateUserData = {
      id: Number(req.params.id),
      ...req.body,
    };
    const updateUserDTO = new UpdateUserDTO(updateUserData);
    const data = await UsersService.update(updateUserDTO);

    return res.status(200).json(data);
  }

  static async delete(req, res) {
    const id = req.params.id;
    await UsersService.delete(id);

    return res.status(204).send();
  }
}
