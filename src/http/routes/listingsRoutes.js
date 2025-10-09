import { Router } from 'express';
import ListingsController from '../controllers/ListingsController.js';
import { upload } from '../middlewares/upload.js';

const router = new Router();
router.get('/', ListingsController.getAll);
router.get('/:id', ListingsController.getById);
router.post('/', upload.array('images', 10), ListingsController.create);
router.patch('/:id', upload.array('images', 10), ListingsController.update);
router.delete('/:id', ListingsController.delete);

export { router as listingsRoutes };
