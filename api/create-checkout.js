import Stripe from 'stripe';

const PRICE_MONTHLY  = 'price_1TV7KxIoWOs00xaiUFJP4frU'; // $150 / month (recurring)
const PRICE_SETUP    = 'price_1TV7IfIoWOs00xaiT2apNQv3'; // $100 one-time setup fee

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-12-18.acacia' });
  const { email, domain } = req.body ?? {};

  if (!email) return res.status(400).json({ error: 'email required' });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: email,
      line_items: [{ price: PRICE_MONTHLY, quantity: 1 }],
      subscription_data: {
        trial_period_days: 30,           // first $150 charge after 30 days
        add_invoice_items: [{ price: PRICE_SETUP }], // $100 charged today
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
