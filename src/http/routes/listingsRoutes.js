import { Router } from 'express';
import ListingsController from '../controllers/ListingsController.js';

const router = new Router();
router.get('/', ListingsController.getAll);
router.get('/:id', ListingsController.getById);
router.post('/', ListingsController.create);
router.patch('/:id', ListingsController.update);
router.delete('/:id', ListingsController.delete);

export { router as listingsRoutes };
