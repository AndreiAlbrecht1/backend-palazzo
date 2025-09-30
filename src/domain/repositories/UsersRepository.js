import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class UsersRepository {
  static filePath = path.join(__dirname, '../../data/dataUsers.json');

  static async getAll() {
    const data = await readFile(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  static async getById(id) {
    const data = await this.getAll();
    return data.find((p) => p.id === Number(id));
  }

  static async create(user) {
    const data = await this.getAll();
    const id = data.length ? data[data.length - 1].id + 1 : 1;
    const userWithId = { id, ...user };
    data.push(userWithId);
    await writeFile(this.filePath, JSON.stringify(data, null, 2));
    return userWithId;
  }

  static async update(user) {
    const data = await this.getAll();

    const index = data.findIndex((p) => p.id === user.id);

    if (index === -1) {
      return false;
    }

    const updatedUser = { ...data[index], ...user };
    data[index] = updatedUser;

    await writeFile(this.filePath, JSON.stringify(data, null, 2));

    return updatedUser;
  }

  static async emailExists(email) {
    const data = await this.getAll();
    return data.some((p) => p.email === email);
  }

  static async delete(id) {
    const data = await this.getAll();
    const index = data.findIndex((p) => p.id === Number(id));

    if (index === -1) {
      return false;
    }

    data.splice(index, 1);

    await writeFile(this.filePath, JSON.stringify(data, null, 2));

    return true;
  }
}
