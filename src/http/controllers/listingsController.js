import ListingsService from "../../application/services/listingsService.js";

export default class ListingsController {
  static async getAll(req, res) {

    try {
      const data = await ListingsService.getAll();

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}