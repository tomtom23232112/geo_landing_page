import { useState, useEffect } from 'react';
import { Eyebrow } from './ui';
import { cleanDomain } from '../utils';

const SCAN_LINES = [
  { d: 700,  t: (dom) => `> connect ${dom} ............................. ok` },
  { d: 900,  t: ()    => `> resolving llm-search endpoints (gpt, claude, perplexity, gemini) ... ok` },
  { d: 1100, t: ()    => `> fetching homepage + 14 key routes .......... 14/14` },
  { d: 800,  t: ()    => `> parsing dom + content blocks ............... ok` },
  { d: 1100, t: ()    => `> scanning entity clusters ................... 3 conflicts` },
  { d: 1000, t: ()    => `> evaluating q&a surface coverage ............ 17%` },
  { d: 900,  t: ()    => `> auditing schema (org / service / faq) ...... missing` },
  { d: 1000, t: ()    => `> measuring brand consistency across pages ... drift detected` },
  { d: 900,  t: ()    => `> checking crawler hints + sitemap priority .. partial` },
  { d: 950,  t: ()    => `> simulating ai answers for buyer intents .... 6/8 weak` },
  { d: 900,  t: ()    => `> benchmarking vs. industry leaders .......... -42 pts` },
  { d: 900,  t: ()    => `> compiling vulnerability report ............. 7 findings` },
  { d: 800,  t: ()    => `> finalizing entity graph cache .............. ok` },
];

export default function Scanning({ domain, onDone }) {
  const dom = cleanDomain(domain) || 'your-site.com';
  const [shown, setShown] = useState([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let i = 0;
    const queue = () => {
      if (cancelled || i >= SCAN_LINES.length) {
        if (!cancelled) setTimeout(onDone, 700);
        return;
      }
      const line = SCAN_LINES[i];
      setShown(prev => [...prev, line.t(dom)]);
      i++;
      setTimeout(queue, line.d);
    };
    const t = setTimeout(queue, 250);
    return () => { cancelled = true; clearTimeout(t); };
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 90);
    return () => clearInterval(t);
  }, []);

  const cursor = tick % 2 === 0 ? '▋' : ' ';
  const totalSecs = Math.round(SCAN_LINES.reduce((s, l) => s + l.d, 0) / 1000);
  const elapsedSecs = Math.min(totalSecs, Math.round(shown.length / SCAN_LINES.length * totalSecs));
  const pct = Math.min(100, Math.round((shown.length / SCAN_LINES.length) * 100));

  return (
    <div className="fade-up" style={{ padding: '12px 0' }}>
      <Eyebrow>Live analysis in progress</Eyebrow>
      <h3 className="display" style={{ fontSize: 34, marginTop: 8, marginBottom: 8 }}>
        Scanning <em>{dom}</em>
      </h3>
      <div className="body" style={{ fontSize: 14, color: 'var(--ink-3)', marginBottom: 24, maxWidth: '58ch' }}>
        Everadam is querying live AI search endpoints and evaluating how they currently see your business. Please don't close this window — your custom entity graph is being generated.
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
        <div style={{ flex: 1, height: 2, background: 'var(--rule)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${pct}%`, background: 'var(--accent)', transition: 'width 360ms ease' }}/>
        </div>
        <span className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--ink-3)' }}>
          {String(elapsedSecs).padStart(2, '0')}s · {pct}%
        </span>
      </div>

      <div style={{
        background: '#0e0d0c', color: '#e8e3d6', fontFamily: 'var(--mono)', fontSize: 12.5,
        lineHeight: 1.7, padding: '18px 22px', borderRadius: 0,
        border: '1px solid #1d1b18', minHeight: 340, maxHeight: 380, overflow: 'hidden',
        boxShadow: 'inset 0 0 60px rgba(0,0,0,0.6)',
      }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 14, opacity: 0.55 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#c84e22' }}/>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#a39369' }}/>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#6b8e6e' }}/>
          <span style={{ marginLeft: 14, fontSize: 11, letterSpacing: '0.14em', color: '#8a857a', textTransform: 'uppercase' }}>
            everadam · geo-scanner v2.4 · {dom}
          </span>
        </div>
        {shown.map((line, i) => {
          const isLast = i === shown.length - 1;
          const isWarn = /missing|conflicts|weak|drift|partial|-/.test(line) && !line.endsWith('ok');
          return (
            <div key={i} style={{
              color: isLast ? '#fff' : isWarn ? '#e8a44a' : '#b9b1a0',
              animation: 'fadeUp 280ms ease both',
            }}>
              {line}
            </div>
          );
        })}
        <div style={{ color: '#fff', marginTop: 2 }}>
          <span style={{ color: '#c84e22' }}>$</span>{' '}
          {shown.length < SCAN_LINES.length
            ? <span style={{ color: '#8a857a' }}>{cursor}</span>
            : <span style={{ color: '#6b8e6e' }}>scan complete · preparing report{cursor}</span>
          }
        </div>
      </div>

      <div className="mono" style={{ marginTop: 14, fontSize: 10.5, letterSpacing: '0.18em', color: 'var(--ink-3)', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
        <span>Live data · do not close window</span>
        <span>Approx {totalSecs}s total</span>
      </div>
    </div>
  );
}
