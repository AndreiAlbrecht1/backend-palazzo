import { Router } from 'express';
import ListingsController from '../controllers/listingsController.js';

const router = new Router();
router.get('/', ListingsController.getAll);

export { router as listingsRoutes };