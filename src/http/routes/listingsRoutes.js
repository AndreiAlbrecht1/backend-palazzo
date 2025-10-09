import { Router } from 'express';
import ListingsController from '../controllers/ListingsController.js';
import { upload } from '../middlewares/upload.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = new Router();
router.get('/', ListingsController.getAll);
router.get('/:id', ListingsController.getById);
router.post(
  '/',
  AuthMiddleware,
  upload.array('images', 10),
  ListingsController.create,
);
router.patch(
  '/:id',
  AuthMiddleware,
  upload.array('images', 10),
  ListingsController.update,
);
router.delete('/:id', AuthMiddleware, ListingsController.delete);

export { router as listingsRoutes };
