import { Router } from 'express';
import FavoritesController from '../controllers/FavoritesController.js';

const router = new Router();

router.post('/', FavoritesController.add);
router.delete('/', FavoritesController.remove);
router.get('/', FavoritesController.get);

export { router as favoritesRoutes };
