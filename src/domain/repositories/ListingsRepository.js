import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class ListingsRepository {
  static filePath = path.join(__dirname, '../../data/dataListings.json');

  static async getAll() {
    const data = await readFile(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  static async getById(id) {
    const data = await this.getAll();
    return data.find((p) => p.id === Number(id));
  }

  static async create(listing) {
    const data = await this.getAll();
    const id = data.length ? data[data.length - 1].id + 1 : 1;
    const listingWithId = { id, ...listing };
    data.push(listingWithId);
    await writeFile(this.filePath, JSON.stringify(data, null, 2));
    return listingWithId;
  }

  static async update(listing) {
    const data = await this.getAll();

    const index = data.findIndex((p) => p.id === listing.id);

    if (index === -1) {
      return false;
    }

    const updatedListing = { ...data[index], ...listing };
    data[index] = updatedListing;

    await writeFile(this.filePath, JSON.stringify(data, null, 2));

    return updatedListing;
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
