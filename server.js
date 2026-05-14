import express from 'express';
import cors from 'cors';
import handler from './api/create-checkout.js';

const app = express();

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*',
}));
app.use(express.json());

app.post('/api/create-checkout', handler);

app.get('/health', (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API listening on :${port}`));
