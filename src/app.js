import express from 'express';
import { listingsRoutes } from './http/routes/listingsRoutes.js';
import { usersRoutes } from './http/routes/usersRoutes.js';
import { authRoutes } from './http/routes/authRoutes.js';
import { handlerError } from './http/middlewares/errorHandler.js';
import authMiddleware from './http/middlewares/authMiddleware.js';

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).json({ ok: true });
});

app.use('/', authRoutes);

app.use(authMiddleware);

app.use('/listings', listingsRoutes);
app.use('/users', usersRoutes);
app.use(handlerError);

export default app;
