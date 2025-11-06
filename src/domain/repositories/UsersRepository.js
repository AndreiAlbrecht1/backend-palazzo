import User from '../models/User.js';

export default class UsersRepository {
  static async getAll() {
    const allUsers = await User.findAll();
    return allUsers;
  }

  static async getById(id) {
    const user = await User.findByPk(id);
    return user;
  }

  static async findByEmail(email) {
    const user = await User.findOne({
      where: { email: email },
    });

    return user;
  }

  static async create(userData) {
    const user = await User.create(userData);
    return user;
  }

  static async update(user) {
    const fieldsToUpdate = {};
    for (const [key, value] of Object.entries(user)) {
      if (value !== undefined) {
        fieldsToUpdate[key] = value;
      }
    }
    const [updatedRowsCount] = await User.update(fieldsToUpdate, {
      where: { id: user.id },
    });

    return updatedRowsCount > 0;
  }

  static async delete(id) {
    const success = await User.destroy({ where: { id } });
    return success;
  }
}
