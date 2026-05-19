/**
 * POST /api/stripe-webhook
 *
 * Receives Stripe events. On checkout.session.completed:
 * → generates GEO report → creates PDF → sends email
 *
 * Required env vars:
 *   STRIPE_SECRET_KEY
 *   STRIPE_WEBHOOK_SECRET   (from Stripe Dashboard → Webhooks → signing secret)
 *   ANTHROPIC_API_KEY
 *   RESEND_API_KEY
 */

import Stripe from 'stripe';
import { generateReport } from './generate-report.js';
import { generatePdf } from './pdf.js';
import { sendReportEmail } from './email.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2026-04-22.dahlia' });
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('[webhook] signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type !== 'checkout.session.completed') {
    return res.status(200).json({ received: true, ignored: event.type });
  }

  const session = event.data.object;
  const email = session.customer_email;
  const domain = session.metadata?.domain;

  if (!email || !domain) {
    console.error('[webhook] missing email or domain in session', session.id);
    return res.status(200).json({ received: true, error: 'missing email or domain' });
  }

  // Acknowledge Stripe immediately — processing happens async
  res.status(200).json({ received: true });

  // Run the pipeline in the background
  processReport(domain, email, session.id).catch(err => {
    console.error('[webhook] report pipeline failed:', err.message);
  });
}

async function processReport(domain, email, sessionId) {
  console.log(`[report] starting for ${domain} (session ${sessionId})`);

  const markdown = await generateReport(domain, email);
  console.log(`[report] Claude generated ${markdown.length} chars`);

  const pdfBuffer = await generatePdf(markdown, domain);
  console.log(`[report] PDF generated (${Math.round(pdfBuffer.length / 1024)} KB)`);

  await sendReportEmail(email, domain, pdfBuffer);
  console.log(`[report] email sent to ${email}`);
}
