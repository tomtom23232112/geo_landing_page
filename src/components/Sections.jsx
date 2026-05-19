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
              AI is recommending businesses right now. <em>Probably not yours.</em>
            </h2>
            <p className="lede dropcap" style={{ fontSize: 20, maxWidth: '58ch' }}>
              25% of all Google searches now show an AI answer before any website link. ChatGPT, Claude, and Perplexity pick specific businesses to mention — the decision is based on signals your website either has or doesn't.
            </p>
            <p className="body" style={{ fontSize: 17, marginTop: 18, maxWidth: '58ch' }}>
              A Princeton study (ACM KDD 2024) found that one content change — adding cited sources — increased AI visibility by 115%. The $20 report shows you exactly which signals you're missing and what to fix first.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function WhatsCheckedSection({ onCta }) {
  const items = [
    { n: '01', t: 'What AI looks for in your niche',       d: 'The exact signals ChatGPT and Claude use to decide which businesses to recommend when someone asks for your service.' },
    { n: '02', t: 'Why your competitors get mentioned',    d: 'A direct comparison: what the businesses AI recommends in your category are doing that you currently aren\'t.' },
    { n: '03', t: 'What your website needs to say',        d: 'The specific content structure, page types, and language patterns that make AI systems understand and cite your business.' },
    { n: '04', t: 'Structured data that gets you cited',   d: 'Exact schema markup recommendations — the technical signals that tell AI tools who you are and what you offer.' },
    { n: '05', t: 'Your readiness score vs. the category', d: 'A clear benchmark: how prepared your website is compared to businesses AI currently recommends in your space.' },
    { n: '06', t: 'Your 30-day action plan',               d: 'A prioritized list of what to change first — so you can start working toward AI recommendations immediately.' },
  ];
  return (
    <section className="section" id="what" style={{ background: '#f3f1eb' }}>
      <div className="shell">
        <div className="row row-2" style={{ gridTemplateColumns: '1fr 1.5fr', gap: 80, alignItems: 'start', marginBottom: 48 }}>
          <Eyebrow>Your $20 report</Eyebrow>
          <div>
            <h2 className="display" style={{ fontSize: 56, margin: '0 0 18px' }}>
              What the report <em>teaches you</em>
            </h2>
            <p className="lede" style={{ fontSize: 19, maxWidth: '58ch' }}>
              Six things you'll know after reading it — that you can act on immediately to start appearing in AI answers for your category.
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
          <button className="btn accent" onClick={onCta}>Show Me How to Get Mentioned <Arrow/></button>
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
              Learn what it takes. <em>Then let us do it.</em>
            </h2>
            <p className="lede" style={{ fontSize: 19, maxWidth: '58ch', marginBottom: 14 }}>
              The $20 report gives you the full playbook for getting recommended by ChatGPT and Claude. You can act on it yourself — or let Everadam implement it for you.
            </p>
            <p className="body" style={{ fontSize: 16.5, maxWidth: '58ch', marginBottom: 32 }}>
              After the report, Everadam can set up your AI-appearance foundation and run automated monthly optimization — no meetings, no agency onboarding, no long-term contracts.
            </p>
            <button className="btn" onClick={onCta}>Show Me How to Get Mentioned <Arrow/></button>
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
          { icon: '↗', t: '25% of Google searches now show an AI answer', d: 'Conductor tracked 21.9 million queries and found 1 in 4 now triggers an AI Overview — a number that doubled since March 2025. Brands cited in those answers receive 35% higher organic CTR and 91% higher paid CTR. (Seer Interactive, Nov 2025)' },
          { icon: '⊘', t: '79% of websites accidentally block AI crawlers', d: 'BuzzStream found that most sites use a catch-all robots.txt rule that blocks every AI bot — including ChatGPT Search and PerplexityBot. If your site is one of them, AI cannot index it, regardless of how good your content is.' },
          { icon: '◎', t: '+115% visibility from one content change', d: 'A Princeton/Georgia Tech study (ACM KDD 2024) tested 9 optimization strategies across 10,000 queries. Adding cited sources increased AI visibility by 115% for lower-ranked pages. Keyword stuffing performed 10% worse than doing nothing.' },
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
          "We built Everadam because most GEO advice is either too vague to act on, or costs $2,000/month before you've seen a single result. A $20 report that shows exactly where you're invisible — and what to fix — felt like the honest starting point."
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
    { t: 'Actionable $20 report',  d: 'A full AI-search audit with a prioritized fix list — not a generic checklist.' },
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
            Learn how to get mentioned. <em>Then let us handle it.</em>
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
    { q: 'What exactly is in the report?',              a: 'A personalized AI-readiness audit for your specific website and niche. It covers: which AI crawlers are blocked on your site (79% of websites have this problem without knowing), what schema markup is missing, how your content is structured compared to what AI systems actually cite, which external platforms you should be listed on, and a prioritized 30-day action plan. Delivered as a PDF within 48 hours.' },
    { q: 'Why $20 and not free?',                      a: 'Free checklists are generic. This report is built specifically for your domain — it scans your actual website, benchmarks you against what businesses AI currently recommends in your category, and tells you exactly what to fix first. The $20 covers the analysis. If the first action item gets you one new client, the report paid for itself 50 times over.' },
    { q: 'How long until I see results?',               a: 'It depends on the platform. Perplexity indexes new content within 24–72 hours — fixes there can show results within a week. ChatGPT Search and Google AI Overviews respond within 2–4 weeks. The underlying training data of models like GPT and Claude updates every 6–18 months. The report tells you which quick wins to prioritize first.' },
    { q: 'Do I need to book a meeting?',               a: 'No. Enter your website and email, pay $20, receive the report. No call, no intake form, no agency onboarding. If you want Everadam to implement the fixes for you after reading the report, that option exists — but it\'s never required.' },
    { q: 'What does the paid GEO setup include?',      a: 'Automated GEO setup based on your report findings: robots.txt corrections, schema markup implementation, content restructuring for AI extraction, external citation setup (LinkedIn, Wikidata, Google Business Profile, relevant directories), and monthly visibility updates.' },
    { q: 'How much does the report cost?',              a: '$20 — one-time, no subscription. You receive the full PDF report within 48 hours. If you want Everadam to implement the recommendations for you, pricing for that is discussed after the report.' },
    { q: 'Can you guarantee AI mentions or rankings?', a: 'No — and any provider who does is lying. AI citation patterns shift 40–60% month to month (Semrush, 13-week study). What we can do is give you the structural foundation that makes AI more likely to find and cite your business. The Princeton/Georgia Tech research shows specific content changes increase AI visibility by 41–115%. That\'s what the report is built on.' },
    { q: 'Is this suitable for non-US companies?',     a: 'Yes. The GEO signals that matter — robots.txt, schema markup, content structure, external citations — are platform-wide and apply globally. Everadam has worked with businesses across Europe and the US.' },
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
        <div className="eyebrow" style={{ color: '#8a857a' }}><span className="dot"/>$20 Report · Delivered Within 48h</div>
        <h2 className="display" style={{ fontSize: 88, margin: '18px auto 24px', maxWidth: '18ch', color: '#fafaf7' }}>
          Start appearing when clients <em style={{ color: '#c84e22' }}>ask AI for you</em>.
        </h2>
        <p className="lede" style={{ fontSize: 20, color: '#bdb9ad', maxWidth: '60ch', margin: '0 auto 36px' }}>
          Submit your website and see where your company may need stronger signals for AI-driven search. After your report, you can let Everadam set up and optimize GEO automatically.
        </p>
        <button className="btn accent" style={{ height: 60, padding: '0 32px', fontSize: 16 }} onClick={onCta}>
          Show Me How to Get Mentioned <Arrow/>
        </button>
        <div className="mono" style={{ marginTop: 18, fontSize: 11, letterSpacing: '0.16em', color: '#8a857a', textTransform: 'uppercase' }}>
          No meeting required · $20 one-time · Delivered within 48h
        </div>
      </Reveal>
    </section>
  );
}
