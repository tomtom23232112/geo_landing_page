import { Eyebrow } from './ui';
import { cleanDomain } from '../utils';

export default function Confirmation({ data, onRestart }) {
  return (
    <div className="fade-up" style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{
        margin: '0 auto 28px', width: 64, height: 64, border: '1px solid var(--ink)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(45deg)',
      }}>
        <span style={{ transform: 'rotate(-45deg)', fontFamily: 'var(--serif)', fontSize: 30, color: 'var(--accent)' }}>✓</span>
      </div>
      <Eyebrow dot={false}>Activation complete</Eyebrow>
      <h3 className="display" style={{ fontSize: 48, marginTop: 14, marginBottom: 14 }}>
        GEO setup is <em>underway</em>.
      </h3>
      <div className="lede" style={{ fontSize: 18, maxWidth: '58ch', margin: '0 auto 28px' }}>
        Everadam is preparing the first optimization cycle for {cleanDomain(data.domain)}. Your full report and a confirmation receipt are on their way to {data.email || 'your inbox'}.
      </div>
      <div className="row row-3" style={{ maxWidth: 760, margin: '40px auto 0', textAlign: 'left' }}>
        {[
          { n: '01', t: 'Today', d: 'You receive your full GEO Visibility Report and an activation receipt.' },
          { n: '02', t: 'This week', d: 'First optimization actions are prepared and applied to the prioritized issues.' },
          { n: '03', t: '~30 days', d: 'Your first monthly visibility update arrives with progress and next steps.' },
        ].map(s => (
          <div key={s.n} style={{ padding: '20px 0', borderTop: '1px solid var(--rule)' }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 10 }}>{s.n} · {s.t}</div>
            <div className="body" style={{ fontSize: 14, color: 'var(--ink-2)' }}>{s.d}</div>
          </div>
        ))}
      </div>
      <button className="btn ghost" onClick={onRestart} style={{ marginTop: 36 }}>
        Back to home
      </button>
    </div>
  );
}
