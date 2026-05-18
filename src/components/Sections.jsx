import { useState } from 'react';
import { Eyebrow, Diamond, Reveal, Arrow } from './ui';

export function ProblemSection() {
  return (
    <section className="section" id="problem">
      <div className="shell">
        <Reveal as="div" className="row row-2" style={{ gridTemplateColumns: '1fr 1.5fr', gap: 80, alignItems: 'start' }}>
          <div>
            <Eyebrow>The visibility shift</Eyebrow>
          </div>
          <div>
            <h2 className="display" style={{ fontSize: 56, margin: '0 0 32px' }}>
              Buyers are asking AI. <em>But can AI understand your company?</em>
            </h2>
            <p className="lede dropcap" style={{ fontSize: 20, maxWidth: '58ch' }}>
              Your potential customers no longer rely on traditional search results alone. They ask AI assistants, compare vendors through generated summaries, and use answer engines to make faster decisions.
            </p>
            <p className="body" style={{ fontSize: 17, marginTop: 18, maxWidth: '58ch' }}>
              If your website, content, and brand signals are unclear, AI systems may struggle to understand what your company does, who you serve, and when you are relevant. The $50 GEO report shows exactly where your website needs stronger signals — and what to fix first.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function WhatsCheckedSection({ onCta }) {
  const items = [
    { n: '01', t: 'GEO Readiness Snapshot',        d: 'A quick overview of how prepared your website appears for AI-driven discovery.' },
    { n: '02', t: 'Entity Clarity Review',          d: 'Checks whether your company, offer, audience, location, and category are easy to understand.' },
    { n: '03', t: 'Content Gap Indicators',         d: 'Identifies missing or unclear content that may limit how AI systems understand your expertise.' },
    { n: '04', t: 'Structured Signal Opportunities',d: 'Highlights schema, metadata, and structured data opportunities.' },
    { n: '05', t: 'AI-Search Visibility Issues',    d: 'Surfaces areas where your website may be weak, unclear, or under-optimized for generative discovery.' },
    { n: '06', t: 'Priority Next Steps',            d: 'Shows what should be improved first if you want stronger GEO foundations.' },
  ];
  return (
    <section className="section" id="what" style={{ background: '#f3f1eb' }}>
      <div className="shell">
        <div className="row row-2" style={{ gridTemplateColumns: '1fr 1.5fr', gap: 80, alignItems: 'start', marginBottom: 48 }}>
          <Eyebrow>Your $50 report</Eyebrow>
          <div>
            <h2 className="display" style={{ fontSize: 56, margin: '0 0 18px' }}>
              What your GEO Visibility Report <em>checks</em>
            </h2>
            <p className="lede" style={{ fontSize: 19, maxWidth: '58ch' }}>
              Everadam reviews your website from an AI-search visibility perspective and identifies the most important areas that may affect how clearly your company is understood by AI-driven systems.
            </p>
          </div>
        </div>

        <Reveal stagger as="div" className="row row-3" style={{ gap: 0, borderTop: '1px solid var(--rule-strong)' }}>
          {items.map((it, i) => (
            <div key={it.n} style={{
              padding: '32px 28px 36px',
              borderRight: (i + 1) % 3 === 0 ? '0' : '1px solid var(--rule)',
              borderBottom: i < 3 ? '1px solid var(--rule)' : '0',
              background: 'transparent',
            }}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.18em', marginBottom: 18 }}>{it.n} ── CHECK</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 360, margin: '0 0 10px', fontVariationSettings: '"opsz" 32' }}>{it.t}</h3>
              <p className="body" style={{ fontSize: 14.5, margin: 0, color: 'var(--ink-2)' }}>{it.d}</p>
            </div>
          ))}
        </Reveal>

        <div style={{ marginTop: 48, display: 'flex', justifyContent: 'flex-start' }}>
          <button className="btn accent" onClick={onCta}>Reveal My AI Blind Spots <Arrow/></button>
        </div>
      </div>
    </section>
  );
}

export function SolutionSection({ onCta }) {
  return (
    <section className="section" id="how">
      <div className="shell">
        <Reveal as="div" className="row row-2" style={{ gridTemplateColumns: '1fr 1.5fr', gap: 80, alignItems: 'start' }}>
          <Eyebrow>The Everadam system</Eyebrow>
          <div>
            <h2 className="display" style={{ fontSize: 56, margin: '0 0 24px' }}>
              From $50 GEO report to <em>automated setup</em>.
            </h2>
            <p className="lede" style={{ fontSize: 19, maxWidth: '58ch', marginBottom: 14 }}>
              The report shows exactly where your website is weak for AI-driven discovery — then Everadam can fix it.
            </p>
            <p className="body" style={{ fontSize: 16.5, maxWidth: '58ch', marginBottom: 32 }}>
              After the report, Everadam can set up your GEO foundation and run automated monthly optimization — without customer meetings, sales calls, or manual agency onboarding.
            </p>
            <button className="btn" onClick={onCta}>Reveal My AI Blind Spots <Arrow/></button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AfterActivationSection() {
  const steps = [
    { n: '01', t: 'GEO setup begins',                    d: 'Everadam starts your automated GEO workflow based on your website, report, and survey context.' },
    { n: '02', t: 'Visibility issues are prioritized',   d: 'The workflow identifies unclear positioning, weak entity signals, content gaps, and structured data opportunities.' },
    { n: '03', t: 'First optimization actions are prepared', d: 'You receive practical GEO actions designed to improve how your company is understood by AI-driven systems.' },
    { n: '04', t: 'Monthly update is delivered',         d: 'Each month, Everadam sends an update with optimization progress, recommendations, and next steps.' },
  ];
  return (
    <section className="section" style={{ background: '#0e0d0b', color: '#e8e5dc' }}>
      <div className="shell">
        <div className="row row-2" style={{ gridTemplateColumns: '1fr 1.5fr', gap: 80, alignItems: 'start', marginBottom: 48 }}>
          <div className="eyebrow" style={{ color: '#8a857a' }}><span className="dot"/>After activation</div>
          <div>
            <h2 className="display" style={{ fontSize: 56, margin: '0 0 18px', color: '#fafaf7' }}>
              Everadam starts your <em style={{ color: '#c84e22' }}>automated GEO workflow</em>.
            </h2>
            <p className="lede" style={{ fontSize: 19, maxWidth: '58ch', color: '#bdb9ad' }}>
              No meetings. No long onboarding. The system begins the moment you activate.
            </p>
          </div>
        </div>

        <Reveal stagger as="div" className="row row-4" style={{ gap: 0 }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{
              padding: '28px 24px 36px',
              borderTop: '1px solid #2a2724',
              borderRight: i < 3 ? '1px solid #2a2724' : '0',
            }}>
              <div className="mono" style={{ fontSize: 11, color: '#c84e22', letterSpacing: '0.18em', marginBottom: 24 }}>{s.n}</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 360, margin: '0 0 10px', color: '#fafaf7', fontVariationSettings: '"opsz" 32' }}>{s.t}</h3>
              <p style={{ fontSize: 14, margin: 0, color: '#a39e91', lineHeight: 1.6 }}>{s.d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function BenefitsSection() {
  const benefits = [
    { t: 'Improve AI-search readiness',     d: 'Make your company easier for AI-driven systems to understand, categorize, and reference in relevant discovery moments.' },
    { t: 'Clarify your entity signals',     d: 'Strengthen how your brand, services, audience, locations, and expertise are represented across your digital presence.' },
    { t: 'Align content with buyer questions', d: 'Improve pages, FAQs, and service content around how real buyers ask questions in AI-assisted search journeys.' },
    { t: 'Improve structured data guidance', d: 'Receive recommendations for schema, metadata, and machine-readable improvements.' },
    { t: 'Find visibility gaps',            d: 'Identify missing content, unclear positioning, weak signals, and opportunities to improve interpretation.' },
    { t: 'Get monthly progress',            d: 'Receive monthly GEO updates so the service feels active, ongoing, and valuable without needing meetings.' },
  ];
  return (
    <section className="section">
      <div className="shell">
        <div className="row row-2" style={{ gridTemplateColumns: '1fr 1.5fr', gap: 80, marginBottom: 48 }}>
          <Eyebrow>What improves</Eyebrow>
          <h2 className="display" style={{ fontSize: 56, margin: 0 }}>
            Build stronger AI-search visibility signals <em>every month</em>.
          </h2>
        </div>

        <Reveal stagger as="div" className="row row-3" style={{ gap: 0, borderTop: '1px solid var(--rule-strong)' }}>
          {benefits.map((b, i) => (
            <div key={b.t} style={{
              padding: '32px 28px 36px',
              borderRight: (i + 1) % 3 === 0 ? '0' : '1px solid var(--rule)',
              borderBottom: i < 3 ? '1px solid var(--rule)' : '0',
            }}>
              <Diamond size={8} fill="#c84e22"/>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 23, fontWeight: 360, margin: '18px 0 10px', fontVariationSettings: '"opsz" 32' }}>{b.t}</h3>
              <p className="body" style={{ fontSize: 14.5, margin: 0 }}>{b.d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <div style={{ margin: '8px 0 56px' }}>
      <div style={{
        padding: '36px 40px', border: '1px solid var(--rule)', background: 'var(--card)',
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0,
      }}>
        {[
          { icon: '↗', t: 'AI search is growing fast', d: '40% of US adults already use AI assistants for product and service research. That number is doubling year over year.' },
          { icon: '⊘', t: 'Most websites are invisible to AI', d: 'The majority of business websites lack the structured signals AI systems need to understand, categorize, and recommend them.' },
          { icon: '◎', t: 'Early movers win the category', d: 'Companies that establish AI-search visibility now will be the default recommendation as AI-assisted search becomes the norm.' },
        ].map((c, i) => (
          <div key={c.t} style={{ padding: '28px 28px 32px', borderRight: i < 2 ? '1px solid var(--rule)' : '0' }}>
            <div className="mono" style={{ fontSize: 20, color: 'var(--accent)', marginBottom: 14 }}>{c.icon}</div>
            <h4 style={{ fontFamily: 'var(--serif)', fontSize: 19, fontWeight: 380, margin: '0 0 10px', fontVariationSettings: '"opsz" 24' }}>{c.t}</h4>
            <p className="body" style={{ fontSize: 13.5, margin: 0, color: 'var(--ink-2)', lineHeight: 1.6 }}>{c.d}</p>
          </div>
        ))}
      </div>
      <style>{`@media (max-width: 900px){ .sp-context > div { grid-template-columns: 1fr !important; } }`}</style>

      <div style={{ marginTop: 48, padding: '32px 40px', background: '#0e0d0b', borderLeft: '3px solid var(--accent)' }}>
        <div className="mono" style={{ fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6a6560', marginBottom: 16 }}>
          ● Why Everadam exists
        </div>
        <div style={{ fontFamily: 'var(--serif)', fontVariationSettings: '"opsz" 96', fontSize: 26, fontWeight: 320, lineHeight: 1.4, letterSpacing: '-0.01em', color: '#e8e3d6', maxWidth: '72ch' }}>
          "We built Everadam because most GEO advice is either too vague to act on, or costs $2,000/month before you've seen a single result. A $50 report that shows exactly where you're invisible — and what to fix — felt like the honest starting point."
        </div>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6a6560', marginTop: 18 }}>
          — Everadam · Currently accepting first clients
        </div>
      </div>
    </div>
  );
}

export function TrustSection() {
  const cards = [
    { t: 'Actionable $50 report',  d: 'A full AI-search audit with a prioritized fix list — not a generic checklist.' },
    { t: 'Automated workflow',     d: 'A structured workflow handles the GEO process — no meeting required.' },
    { t: 'Monthly updates',        d: 'Ongoing updates instead of one-time static reports.' },
    { t: 'US-based operation',     d: 'Serving US and international companies with a clear, performance-oriented approach.' },
    { t: 'No unrealistic promises', d: 'No guaranteed rankings. No guaranteed AI mentions. Just structured, consistent optimization.' },
  ];
  return (
    <section className="section-tight" style={{ background: '#f3f1eb' }}>
      <div className="shell">
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 48px' }}>
          <Eyebrow>Built for low-friction execution</Eyebrow>
          <h2 className="display" style={{ fontSize: 48, margin: '14px 0 0' }}>
            $50 report first. <em>Automated setup after.</em>
          </h2>
        </div>

        <SocialProof/>

        <div className="row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: 0, borderBottom: '1px solid var(--rule)' }}>
          {cards.map((c, i) => (
            <div key={c.t} style={{ padding: '28px 22px 32px', borderRight: i < 4 ? '1px solid var(--rule)' : '0' }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 380, margin: '0 0 10px', fontVariationSettings: '"opsz" 24' }}>{c.t}</h3>
              <p className="body" style={{ fontSize: 13.5, margin: 0, color: 'var(--ink-2)' }}>{c.d}</p>
            </div>
          ))}
        </div>
        <style>{`@media (max-width: 900px){ .trust-cards{grid-template-columns: repeat(2, 1fr) !important;} }`}</style>
      </div>
    </section>
  );
}

export function FAQSection() {
  const faqs = [
    { q: 'What is the GEO Visibility Report?',         a: 'A full AI-search audit of your website. It shows exactly where ChatGPT, Claude, and other AI tools fail to understand or recommend your business — and gives you a prioritized fix list.' },
    { q: 'Why $50 and not free?',                      a: 'A real report takes real work. At $50 you get a thorough, actionable analysis — not a generic checklist. It covers your specific gaps, your competitors, and what to fix first.' },
    { q: 'What happens after I receive the report?',   a: 'You get a plain-English document with your findings and a fix list. No upsell call, no pressure. If you want Everadam to implement the fixes, that option exists — but you can also act on the report yourself.' },
    { q: 'Do I need to book a meeting?',               a: 'No. The funnel is designed to work without a customer meeting. You submit your website, receive the report, and can activate setup online.' },
    { q: 'What does the paid GEO setup include?',      a: 'Automated GEO setup, AI-search readiness review, first optimization actions, structured data recommendations, content improvement actions, and monthly visibility updates.' },
    { q: 'How much does the report cost?',              a: 'The GEO Visibility Report is $50 — one-time, no subscription. You receive the full report within 48 hours after payment.' },
    { q: 'Can you guarantee AI mentions or rankings?', a: 'No. No provider can honestly guarantee AI mentions, rankings, or revenue outcomes. Everadam focuses on structured, consistent optimization designed to improve your AI-search visibility foundation.' },
    { q: 'Is this suitable for US companies?',         a: 'Yes. Everadam is a US-based operation and the service is designed for US and international B2B companies.' },
  ];
  const [open, setOpen] = useState(0);

  return (
    <section className="section" id="faq">
      <div className="shell" style={{ maxWidth: 920 }}>
        <div style={{ textAlign: 'left', marginBottom: 36 }}>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="display" style={{ fontSize: 52, margin: '14px 0 0' }}>
            Questions before you request your <em>report</em>.
          </h2>
        </div>
        <div>
          {faqs.map((f, i) => (
            <div key={i} className="faq-item" onClick={() => setOpen(open === i ? -1 : i)}>
              <div className="faq-q">
                <span>{f.q}</span>
                <span className="faq-toggle">{open === i ? '−' : '+'}</span>
              </div>
              {open === i && <div className="faq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA({ onCta }) {
  return (
    <section className="section" style={{ background: 'var(--ink)', color: 'var(--bg)', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 'auto 0 0 0', height: 1, background: 'linear-gradient(90deg, transparent, rgba(200,78,34,0.6), transparent)', animation: 'accentSweep 4s ease-in-out infinite' }}/>
      <Reveal as="div" className="shell" style={{ textAlign: 'center' }}>
        <div className="eyebrow" style={{ color: '#8a857a' }}><span className="dot"/>Free GEO Visibility Report</div>
        <h2 className="display" style={{ fontSize: 88, margin: '18px auto 24px', maxWidth: '18ch', color: '#fafaf7' }}>
          Stop being invisible to <em style={{ color: '#c84e22' }}>AI search</em>.
        </h2>
        <p className="lede" style={{ fontSize: 20, color: '#bdb9ad', maxWidth: '60ch', margin: '0 auto 36px' }}>
          Submit your website and see where your company may need stronger signals for AI-driven search. After your report, you can let Everadam set up and optimize GEO automatically.
        </p>
        <button className="btn accent" style={{ height: 60, padding: '0 32px', fontSize: 16 }} onClick={onCta}>
          Reveal My AI Blind Spots <Arrow/>
        </button>
        <div className="mono" style={{ marginTop: 18, fontSize: 11, letterSpacing: '0.16em', color: '#8a857a', textTransform: 'uppercase' }}>
          No meeting required · Free report first · Paid setup available after
        </div>
      </Reveal>
    </section>
  );
}
