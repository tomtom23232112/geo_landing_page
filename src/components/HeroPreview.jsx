import { useState, useEffect, useRef } from 'react';
import { cleanDomain } from '../utils';

export default function HeroPreview({ domain, accent = '#c84e22' }) {
  const target = domain && domain.length > 1 ? cleanDomain(domain) : 'yourcompany.com';
  const targetScore = 42;
  const [score, setScore] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const dur = 1500;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setScore(Math.round(targetScore * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!startedRef.current) { startedRef.current = true; return; }
    let raf;
    const from = score;
    const start = performance.now();
    const dur = 700;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setScore(Math.round(from + (targetScore - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  const ringR = 58;
  const ringC = 2 * Math.PI * ringR;
  const ringOffset = ringC * (1 - score / 100);

  const findings = [
    { sev: 'High',   label: 'Entity clarity',  note: 'Company, offer, and location signals unclear' },
    { sev: 'High',   label: 'Q&A coverage',    note: 'Buyer questions answered on few key pages' },
    { sev: 'Medium', label: 'Structured data', note: 'Organization & FAQ schema not present' },
  ];

  return (
    <div className="hero-preview" style={{
      background: 'var(--card)', border: '1px solid var(--rule)',
      boxShadow: '0 12px 40px rgba(26,26,26,0.06), 0 1px 0 rgba(26,26,26,0.04)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 22px', borderBottom: '1px solid var(--rule)', background: 'var(--bg)',
      }}>
        <div className="mono" style={{ fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
          GEO Visibility Report · Preview
        </div>
        <div className="mono" style={{ fontSize: 10.5, letterSpacing: '0.14em', color: 'var(--ink-3)' }}>
          {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      <div style={{ padding: '28px 28px 24px' }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 8 }}>
          Prepared for
        </div>
        <div style={{
          fontFamily: 'var(--serif)', fontVariationSettings: '"opsz" 32',
          fontSize: 26, fontWeight: 380, letterSpacing: '-0.01em',
          marginBottom: 24, color: 'var(--ink)', minHeight: 34, transition: 'color 200ms ease',
        }}>
          {target}
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '140px 1fr', gap: 24,
          alignItems: 'center', paddingBottom: 22, borderBottom: '1px solid var(--rule)',
        }}>
          <div style={{ position: 'relative', width: 140, height: 140 }}>
            <svg width={140} height={140} style={{ transform: 'rotate(-90deg)' }}>
              <circle cx={70} cy={70} r={ringR} fill="none" strokeWidth={2} stroke="rgba(26,26,26,0.12)"/>
              <circle cx={70} cy={70} r={ringR} fill="none" strokeWidth={2}
                stroke={accent} strokeDasharray={ringC} strokeDashoffset={ringOffset}
                strokeLinecap="square" style={{ transition: 'stroke-dashoffset 200ms linear' }}/>
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontFamily: 'var(--serif)', fontVariationSettings: '"opsz" 144, "SOFT" 30', fontWeight: 340, fontSize: 44, lineHeight: 1, letterSpacing: '-0.02em', fontFeatureSettings: '"lnum"' }}>
                {score}
              </div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-3)', marginTop: 4 }}>
                / 100
              </div>
            </div>
          </div>
          <div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: accent, marginBottom: 8 }}>
              GEO readiness · needs work
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontVariationSettings: '"opsz" 32', fontSize: 19, fontWeight: 360, letterSpacing: '-0.005em', lineHeight: 1.3, color: 'var(--ink)', maxWidth: '24ch', marginBottom: 6 }}>
              7 visibility gaps detected.
            </div>
            <div style={{ fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>
              4 high-priority. Fixed in setup.
            </div>
          </div>
        </div>

        <div style={{ paddingTop: 18 }}>
          <div className="mono" style={{ fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 14 }}>
            Top findings
          </div>
          <div style={{ display: 'grid', gap: 0 }}>
            {findings.map((f, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '74px 1fr auto', gap: 14,
                alignItems: 'baseline', padding: '12px 0',
                borderTop: i === 0 ? '0' : '1px solid var(--rule)',
                animation: `fadeUp 600ms ${600 + i * 120}ms cubic-bezier(0.2, 0.8, 0.2, 1) both`,
              }}>
                <span className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: f.sev === 'High' ? accent : '#b08900' }}>
                  ● {f.sev}
                </span>
                <div>
                  <div style={{ fontFamily: 'var(--serif)', fontVariationSettings: '"opsz" 24', fontSize: 15.5, fontWeight: 380, color: 'var(--ink)', marginBottom: 2 }}>
                    {f.label}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.45 }}>{f.note}</div>
                </div>
                <span className="mono" style={{ fontSize: 10.5, letterSpacing: '0.1em', color: 'var(--ink-3)' }}>
                  Fix available
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 22px', borderTop: '1px solid var(--rule)', background: 'var(--bg)',
      }}>
        <div className="mono" style={{ fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
          $50 · Delivered within 48h
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5, color: 'var(--ink-2)' }}>
          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#3d6b4a', animation: 'pulse 1.6s ease-in-out infinite' }}/>
          <span className="mono" style={{ letterSpacing: '0.1em' }}>Updated monthly</span>
        </div>
      </div>
    </div>
  );
}
