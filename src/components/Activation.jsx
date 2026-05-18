import { useState } from 'react';
import { Eyebrow, Hairline, Arrow } from './ui';
import { cleanDomain } from '../utils';

function SummaryRow({ label, value, muted }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: muted ? 'var(--ink-3)' : 'var(--ink)' }}>
      <span>{label}</span>
      <span className="mono" style={{ fontSize: 13, letterSpacing: '0.04em' }}>{value}</span>
    </div>
  );
}

export default function Activation({ data, onPaid, onBack }) {
  const [redirecting, setRedirecting] = useState(false);

  const goToStripe = async () => {
    setRedirecting(true);
    try {
      const base = import.meta.env.VITE_API_URL ?? '';
      const res = await fetch(`${base}/api/create-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, domain: data.domain }),
      });
      const { url, error } = await res.json();
      if (url) {
        window.location.href = url;
      } else {
        console.error('[checkout]', error);
        setRedirecting(false);
      }
    } catch (err) {
      console.error('[checkout]', err);
      setRedirecting(false);
    }
  };

  return (
    <div className="fade-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Eyebrow>Activate setup</Eyebrow>
        <button className="btn ghost" onClick={onBack} style={{ height: 36, padding: '0 14px', fontSize: 13 }}>← Back to report</button>
      </div>

      <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
        <h3 className="display" style={{ fontSize: 42, marginBottom: 10 }}>
          Your GEO Report for <em>{cleanDomain(data.domain)}</em>
        </h3>
        <div className="body" style={{ fontSize: 15, color: 'var(--ink-2)', maxWidth: '56ch', margin: '0 auto 40px' }}>
          One-time payment of $50. Your full report is delivered within 48 hours — no meeting, no subscription.
        </div>
      </div>

      <div className="card" style={{ padding: '32px 36px', maxWidth: 560, margin: '0 auto' }}>
        <Eyebrow>Order summary</Eyebrow>
        <div style={{ marginTop: 18, display: 'grid', gap: 12 }}>
          <SummaryRow label="GEO Visibility Report" value="$50.00"/>
          <Hairline/>
          <SummaryRow label="Delivery" value="Within 48h" muted/>
          <SummaryRow label="Subscription" value="None" muted/>
        </div>
        <div className="dotted"/>
        <Eyebrow dot={false}>Includes</Eyebrow>
        <ul style={{ listStyle: 'none', padding: 0, margin: '14px 0 0', display: 'grid', gap: 10, fontSize: 14, color: 'var(--ink-2)' }}>
          {[
            'What ChatGPT & Claude look for in your category',
            'Why your competitors get recommended — and you don\'t',
            'Exact content structure AI needs to cite your business',
            'Schema markup recommendations',
            'Your readiness score vs. category benchmark',
            'Your 30-day action plan — plain English, no jargon',
            'No meeting, no upsell call',
          ].map(t => (
            <li key={t} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
              <span style={{ color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: 11, marginTop: 2 }}>✓</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 24, padding: '14px 16px', background: 'var(--bg)', border: '1px solid var(--rule)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>Due today</span>
          <span className="price-display" style={{ fontSize: 30 }}>$50.00</span>
        </div>
      </div>

      <div style={{ maxWidth: 560, margin: '24px auto 0' }}>
        <button className="btn accent" style={{ width: '100%', height: 60, fontSize: 16 }} onClick={goToStripe} disabled={redirecting}>
          {redirecting ? 'Redirecting to Stripe…' : 'Send Me My Report'} {!redirecting && <Arrow/>}
        </button>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.08em', color: 'var(--ink-3)', textAlign: 'center', marginTop: 14 }}>
          One-time payment · Stripe · Card · Apple Pay · Google Pay · No subscription
        </div>
      </div>
    </div>
  );
}
