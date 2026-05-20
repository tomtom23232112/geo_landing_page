import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import checkoutHandler from './api/create-checkout.js';
import webhookHandler from './api/stripe-webhook.js';
import generateHandler from './api/generate-report.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));

// Stripe webhook needs raw body for signature verification — must come BEFORE express.json()
app.post('/api/stripe-webhook', express.raw({ type: 'application/json' }), webhookHandler);

app.use(express.json());

app.post('/api/create-checkout', checkoutHandler);
app.post('/api/generate-report', generateHandler);

app.use(express.static(path.join(__dirname, 'docs')));

app.use((_req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on :${port}`));
