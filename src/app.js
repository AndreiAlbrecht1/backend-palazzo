import express from 'express';
import { listingsRoutes } from './http/routes/listingsRoutes.js';
import { usersRoutes } from './http/routes/usersRoutes.js';
import { authRoutes } from './http/routes/authRoutes.js';
import { favoritesRoutes } from './http/routes/favoritesRoutes.js';
import { handlerError } from './http/middlewares/errorHandler.js';
import authMiddleware from './http/middlewares/authMiddleware.js';

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).json({ ok: true });
});

const apiRouter = express.Router();

apiRouter.use('/', authRoutes);
apiRouter.use('/listings', listingsRoutes);
apiRouter.use('/users', authMiddleware, usersRoutes);
apiRouter.use('/favorites', authMiddleware, favoritesRoutes);

app.use('/api', apiRouter);

app.use(handlerError);

export default app;
