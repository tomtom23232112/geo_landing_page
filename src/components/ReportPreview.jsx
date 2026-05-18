import { useState, useEffect, useMemo } from 'react';
import { Eyebrow, Arrow } from './ui';
import { cleanDomain, buildReport } from '../utils';

function useCountdown(seconds) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    const t = setInterval(() => setLeft(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(t);
  }, []);
  const m = Math.floor(left / 60).toString().padStart(2, '0');
  const s = (left % 60).toString().padStart(2, '0');
  return { left, label: `${m}:${s}` };
}

export default function ReportPreview({ data, onActivate }) {
  const report = useMemo(() => buildReport(data.domain), [data.domain]);
  const { issues, score, highCount, totalCount } = report;
  const [animScore, setAnimScore] = useState(0);
  const countdown = useCountdown(15 * 60);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / 1100);
      const eased = 1 - Math.pow(1 - p, 3);
      setAnimScore(Math.round(score * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  const ringR = 64;
  const ringC = 2 * Math.PI * ringR;
  const ringOffset = ringC * (1 - animScore / 100);
  const benchmark = 84;
  const gap = benchmark - score;
  const dom = cleanDomain(data.domain) || 'your site';

  return (
    <div className="fade-up">
      {/* Urgency banner */}
      <div style={{
        marginBottom: 28, padding: '14px 18px',
        background: '#1a1a1a', color: '#fafaf7',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        borderLeft: '3px solid var(--accent)', flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
          <span className="mono" style={{ fontSize: 10.5, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase' }}>● Session reserved</span>
          <span style={{ fontSize: 13.5, color: '#e8e3d6' }}>
            Your scan data is cached. Get the full report within the window for <strong style={{ color: '#fff' }}>$50</strong> — includes your complete fix list and AI-search gap analysis.
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="mono" style={{ fontSize: 10.5, letterSpacing: '0.18em', color: '#8a857a', textTransform: 'uppercase' }}>Valid for this session</span>
        </div>
      </div>

      <Eyebrow>Your snapshot · Preview</Eyebrow>
      <h3 className="display" style={{ fontSize: 38, marginTop: 8, marginBottom: 8 }}>
        Here's what AI sees on <em>{dom}</em>
      </h3>
      <div className="body" style={{ fontSize: 14, color: 'var(--ink-3)', maxWidth: '58ch', marginBottom: 28 }}>
        This is a preview. The full $50 report — with plain-English explanations, your complete fix list, and what to do first — will be delivered to <span style={{ color: 'var(--ink)' }}>{data.email || 'you'}</span> within 48 hours.
      </div>

      {/* Score + benchmark */}
      <div className="row row-2" style={{ gridTemplateColumns: '200px 1fr', gap: 32, alignItems: 'center', padding: '24px 0', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
        <div style={{ position: 'relative', width: 160, height: 160 }}>
          <svg width={160} height={160} className="score-ring">
            <circle cx={80} cy={80} r={ringR} fill="none" strokeWidth={2} className="score-ring-bg"/>
            <circle cx={80} cy={80} r={ringR} fill="none" strokeWidth={2}
              strokeDasharray={ringC} strokeDashoffset={ringOffset}
              className="score-ring-fg" strokeLinecap="square"/>
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="price-display" style={{ fontSize: 48 }}>{animScore}</div>
            <div className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--ink-3)', textTransform: 'uppercase', marginTop: 2 }}>/ 100</div>
          </div>
        </div>
        <div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)' }}>AI readiness — falling behind</div>
          <h4 className="display" style={{ fontSize: 24, marginTop: 8, marginBottom: 14 }}>
            You're <em>{gap} points</em> behind the leaders in your space.
          </h4>
          <div style={{ display: 'grid', gap: 8, maxWidth: 460, marginBottom: 12 }}>
            {[
              { label: 'Your score', value: score, color: 'var(--accent)' },
              { label: 'Industry leader avg.', value: benchmark, color: 'var(--ink)' },
            ].map(bar => (
              <div key={bar.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span className="mono" style={{ letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>{bar.label}</span>
                  <span className="mono" style={{ color: bar.color, fontVariantNumeric: 'tabular-nums' }}>{bar.value}</span>
                </div>
                <div style={{ height: 4, background: 'var(--rule)' }}>
                  <div style={{ width: `${bar.value}%`, height: '100%', background: bar.color }}/>
                </div>
              </div>
            ))}
          </div>
          <div className="body" style={{ fontSize: 13.5, color: 'var(--ink-2)', maxWidth: '56ch' }}>
            Competitors who appear in AI answers for your category score around <strong>{benchmark}/100</strong>. Every day you stay at {score}, they win the recommendations meant for you.
          </div>
        </div>
      </div>

      {/* AI quote */}
      <div style={{ marginTop: 32, padding: '24px 28px', background: 'var(--card)', border: '1px solid var(--rule)', position: 'relative' }}>
        <div className="mono" style={{ fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 10 }}>
          ● We asked an AI assistant about {dom}
        </div>
        <blockquote style={{
          margin: 0, fontFamily: 'var(--serif)', fontVariationSettings: '"opsz" 32',
          fontSize: 22, fontWeight: 360, lineHeight: 1.45, letterSpacing: '-0.005em',
          color: 'var(--ink)', borderLeft: '2px solid var(--accent)', paddingLeft: 18,
        }}>
          "I couldn't verify {dom}'s exact offerings or who they specifically serve. You may want to check their website directly."
        </blockquote>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--ink-3)', marginTop: 12 }}>
          — Live response · GPT-4 · {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
      </div>

      {/* Issues */}
      <div style={{ marginTop: 36 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <Eyebrow>Top findings</Eyebrow>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--ink-3)', textTransform: 'uppercase' }}>
            {issues.length} items · sorted by severity
          </div>
        </div>
        <div>
          {issues.map((it, i) => (
            <div className="issue-row" key={i} style={{ animation: `fadeUp 360ms ${i * 60}ms ease both` }}>
              <span className={`issue-sev sev-${it.sev}`}>● {it.sev === 'high' ? 'High' : it.sev === 'med' ? 'Medium' : 'Low'}</span>
              <div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontVariationSettings: '"opsz" 24', marginBottom: 4 }}>{it.area}</div>
                <div className="body" style={{ fontSize: 14, color: 'var(--ink-2)', maxWidth: '68ch' }}>{it.text}</div>
              </div>
              <div className="issue-status">{it.fix === 'Setup' ? 'Fixed in setup' : 'Optional'}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 1-click checkout */}
      <div style={{ marginTop: 48, padding: '36px 32px', background: 'var(--card)', border: '1px solid var(--rule)' }}>
        <div style={{ textAlign: 'center', maxWidth: 540, margin: '0 auto' }}>
          <Eyebrow>Get the full report</Eyebrow>
          <h4 className="display" style={{ fontSize: 30, marginTop: 10, marginBottom: 10 }}>Your complete GEO fix list — $50.</h4>
          <div className="body" style={{ fontSize: 14.5, color: 'var(--ink-2)', marginBottom: 20 }}>
            Every gap, every missed signal, exactly what to fix and in what order. Delivered within 48 hours — no meeting, no fluff.
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 10, marginBottom: 4 }}>
            <span className="price-display" style={{ fontSize: 56 }}>$50</span>
            <span className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--ink-3)', textTransform: 'uppercase' }}>one-time</span>
          </div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: 24 }}>
            No subscription · no meeting · delivered within 48 hours
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
            <button onClick={onActivate} style={{
              height: 52, background: '#000', color: '#fff', border: '1px solid #000',
              fontFamily: '-apple-system, system-ui, sans-serif', fontSize: 16, fontWeight: 500,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'opacity 200ms ease',
            }} onMouseEnter={e => e.currentTarget.style.opacity = '0.85'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              <span style={{ fontSize: 18 }}></span> Pay
            </button>
            <button onClick={onActivate} style={{
              height: 52, background: '#fff', color: '#3c4043', border: '1px solid #dadce0',
              fontFamily: '"Google Sans", system-ui, sans-serif', fontSize: 15, fontWeight: 500,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'background 200ms ease',
            }} onMouseEnter={e => e.currentTarget.style.background = '#f8f9fa'} onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
              <span style={{ fontWeight: 700 }}>
                <span style={{ color: '#4285F4' }}>G</span>
                <span style={{ color: '#EA4335' }}>o</span>
                <span style={{ color: '#FBBC04' }}>o</span>
                <span style={{ color: '#4285F4' }}>g</span>
                <span style={{ color: '#34A853' }}>l</span>
                <span style={{ color: '#EA4335' }}>e</span>
              </span>{' '}Pay
            </button>
          </div>

          <button className="btn accent" style={{ width: '100%', height: 54 }} onClick={onActivate}>
            Get My Full Report <Arrow/>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 18, color: 'var(--ink-3)', fontSize: 13, lineHeight: 1.5, maxWidth: '46ch', marginLeft: 'auto', marginRight: 'auto' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true">
              <rect x="4" y="11" width="16" height="10" rx="1"/>
              <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
            </svg>
            <span>Secure one-time payment via Stripe. No subscription, no hidden fees.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
