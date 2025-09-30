import { Router } from 'express';
import UsersController from '../controllers/UsersController.js';

const router = new Router();
router.get('/', UsersController.getAll);
router.get('/:id', UsersController.getById);
router.patch('/:id', UsersController.update);
router.delete('/:id', UsersController.delete);

export { router as usersRoutes };
