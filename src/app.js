import express from 'express';
import { listingsRoutes } from './http/routes/listingsRoutes.js';

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).json({ ok: true });
});

app.use('/listings', listingsRoutes);

export default app;
