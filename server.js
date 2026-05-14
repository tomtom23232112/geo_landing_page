import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import handler from './api/create-checkout.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));
app.use(express.json());

app.post('/api/create-checkout', handler);

app.use(express.static(path.join(__dirname, 'docs')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on :${port}`));
