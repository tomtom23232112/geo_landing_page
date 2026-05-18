import { useState } from 'react';
import { Arrow } from './ui';
import { AnimatedHeadline, Eyebrow } from './ui';
import HeroPreview from './HeroPreview';
import { isValidUrl, isValidEmail } from '../utils';

const HEADLINES = {
  primary: { pre: 'Stop losing clients to', em: 'AI search', post: ' invisibility.' },
  question: { pre: 'Can AI', em: 'understand', post: ' your company?' },
  outcome: { pre: 'Your competitors show up in AI.', em: 'You don\'t.', post: '' },
};

export default function Hero({ tweaks, onStart }) {
  const [emailValue, setEmailValue] = useState('');
  const [domainValue, setDomainValue] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    if (!isValidUrl(domainValue)) { setError('Enter a valid website URL'); return; }
    if (!isValidEmail(emailValue)) { setError('Enter a valid work email'); return; }
    onStart({ domain: domainValue, email: emailValue });
  };

  const headline = HEADLINES[tweaks.headlineVariant] || HEADLINES.primary;
  const accent = tweaks.accent || '#c84e22';

  return (
    <section style={{
      borderBottom: '1px solid var(--rule)',
      paddingTop: tweaks.density === 'compact' ? 56 : 88,
      paddingBottom: tweaks.density === 'compact' ? 56 : 96,
      position: 'relative', overflow: 'hidden',
    }}>
      <div className="shell">
        <Eyebrow>GEO Visibility Report · $50 · Wyoming, USA</Eyebrow>

        <div className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: tweaks.showScanner ? '1.15fr 1fr' : '1fr',
          gap: tweaks.showScanner ? 72 : 0,
          alignItems: 'start',
          marginTop: 28,
        }}>
          <div className="enter">
            <AnimatedHeadline
              pre={headline.pre}
              em={headline.em}
              post={headline.post}
              accent={accent}
              style={{ fontSize: tweaks.density === 'compact' ? 76 : 92, margin: '0 0 24px', maxWidth: '14ch' }}
            />
            <p className="lede" style={{ fontSize: tweaks.density === 'compact' ? 19 : 22, maxWidth: '56ch', marginBottom: 36 }}>
              Every week without AI visibility costs you clients your competitors are winning. For $50, Everadam delivers a full GEO report — exactly where you're invisible to ChatGPT and Claude, and what to fix first.
            </p>

            <div className="card" style={{ padding: 24, background: 'var(--card)' }}>
              <div className="mono" style={{ fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                <span>
                  <span className="dot" style={{ display: 'inline-block', width: 6, height: 6, background: accent, borderRadius: '50%', verticalAlign: 1, marginRight: 8 }}/>
                  Step 1 of 3 · Website
                </span>
                <span>~ 2 min</span>
              </div>
              <div className="row row-2" style={{ gap: 24 }}>
                <div className="field">
                  <label>Company website</label>
                  <input
                    className={`input ${error && !isValidUrl(domainValue) ? 'error' : ''}`}
                    placeholder="yourcompany.com"
                    value={domainValue}
                    onChange={e => { setDomainValue(e.target.value); setError(''); }}
                    onKeyDown={e => e.key === 'Enter' && submit()}
                  />
                </div>
                <div className="field">
                  <label>Work email</label>
                  <input
                    className={`input ${error && !isValidEmail(emailValue) ? 'error' : ''}`}
                    placeholder="you@yourcompany.com"
                    value={emailValue}
                    onChange={e => { setEmailValue(e.target.value); setError(''); }}
                    onKeyDown={e => e.key === 'Enter' && submit()}
                  />
                </div>
              </div>
              {error && <div className="error-text" style={{ marginTop: 14 }}>{error}</div>}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, gap: 16, flexWrap: 'wrap' }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.06em' }}>
                  No meeting required. Takes less than 2 minutes.
                </div>
                <button className="btn accent" onClick={submit} style={{ background: accent, borderColor: accent }}>
                  Show Me Where I'm Invisible <Arrow/>
                </button>
              </div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '32px 0 0', display: 'grid', gap: 10, fontSize: 14.5, color: 'var(--ink-2)' }}>
              {[
                'See exactly where ChatGPT & Claude ignore your business',
                'Know which competitors are winning AI mentions — and why',
                'Get a prioritized fix list, not a generic checklist',
                'Delivered within 48 hours — no meeting, no fluff',
              ].map(t => (
                <li key={t} style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                  <span className="mono" style={{ color: accent, fontSize: 11, letterSpacing: '0.1em' }}>──</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            {tweaks.showPricingHint && (
              <div className="mono" style={{ marginTop: 24, fontSize: 11.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
                One-time report · $50 · delivered within 48h · no subscription
              </div>
            )}
          </div>

          {tweaks.showScanner && (
            <div style={{ position: 'sticky', top: 84, opacity: 0, animation: 'riseIn 900ms cubic-bezier(0.2,0.8,0.2,1) 1300ms forwards' }}>
              <HeroPreview domain={domainValue} accent={accent}/>
              <div className="mono" style={{ marginTop: 14, fontSize: 10.5, letterSpacing: '0.18em', color: 'var(--ink-3)', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
                <span>Sample preview</span>
                <span>Your full report on submit</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export const TWEAK_DEFAULTS = {
  accent: '#c84e22',
  headlineVariant: 'primary',
  density: 'airy',
  showScanner: true,
  showPricingHint: false,
};
