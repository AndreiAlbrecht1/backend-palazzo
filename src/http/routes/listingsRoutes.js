import { Router } from 'express';
import ListingsController from '../controllers/listingsController.js';

const router = new Router();
router.get('/', ListingsController.getAll);
router.get('/:id', ListingsController.getById);
router.post('/', ListingsController.create);

export { router as listingsRoutes };
