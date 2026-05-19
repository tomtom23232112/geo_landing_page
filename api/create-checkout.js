import Stripe from 'stripe';

const PRICE_REPORT = 'price_1TYi4kIoWOs00xai3751jLuZ'; // $20 one-time report

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2026-04-22.dahlia' });
  const { email, domain } = req.body ?? {};

  if (!email) return res.status(400).json({ error: 'email required' });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      line_items: [{ price: PRICE_REPORT, quantity: 1 }],
      metadata: { domain: domain ?? '' },
      payment_intent_data: {
        metadata: { domain: domain ?? '' },
      },
      allow_promotion_codes: false,
      billing_address_collection: 'auto',
      success_url: `${process.env.SITE_URL}/?activated=1`,
      cancel_url:  `${process.env.SITE_URL}/`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('[stripe]', err.message);
    res.status(500).json({ error: err.message });
  }
}
