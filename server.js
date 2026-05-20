import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import checkoutHandler from './api/create-checkout.js';
import webhookHandler from './api/stripe-webhook.js';
import generateHandler from './api/generate-report.js';
import { generatePdf } from './api/pdf.js';
import { sendReportEmail } from './api/email.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));

// Stripe webhook needs raw body for signature verification — must come BEFORE express.json()
app.post('/api/stripe-webhook', express.raw({ type: 'application/json' }), webhookHandler);

app.use(express.json());

app.post('/api/create-checkout', checkoutHandler);
app.post('/api/generate-report', generateHandler);

// TEMPORARY TEST ENDPOINT — remove after end-to-end test
app.post('/api/test-pipeline', async (req, res) => {
  const { domain, email } = req.body ?? {};
  if (!domain || !email) return res.status(400).json({ error: 'domain and email required' });
  try {
    const md = `# GEO Report: ${domain}\n\n## Score: 42/100\n\nTest paragraph.\n\n- Item 1\n- Item 2\n\n| Col A | Col B |\n|---|---|\n| Foo | Bar |\n`;
    const pdfBuffer = await generatePdf(md, domain);
    await sendReportEmail(email, domain, pdfBuffer);
    res.json({ ok: true, pdfKB: Math.round(pdfBuffer.length / 1024) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use(express.static(path.join(__dirname, 'docs')));

app.use((_req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on :${port}`));
