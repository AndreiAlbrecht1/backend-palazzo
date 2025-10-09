import express from 'express';
import { listingsRoutes } from './http/routes/listingsRoutes.js';
import { usersRoutes } from './http/routes/usersRoutes.js';
import { authRoutes } from './http/routes/authRoutes.js';
import { handlerError } from './http/middlewares/errorHandler.js';
import authMiddleware from './http/middlewares/authMiddleware.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors({
  origin: '*',
}))

app.get('/', async (req, res) => {
  res.status(200).json({ ok: true });
});

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', authRoutes);

app.use('/listings', listingsRoutes);
app.use('/users', authMiddleware, usersRoutes);
app.use(handlerError);

export default app;
