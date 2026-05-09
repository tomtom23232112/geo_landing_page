// Marketing sections — problem, solution, what's checked, after activation, benefits, trust, FAQ, final CTA
const { useState: useStateM } = React;

function ProblemSection() {
  return (
    <section className="section" id="problem">
      <div className="shell">
        <Reveal as="div" className="row row-2" style={{gridTemplateColumns: '1fr 1.5fr', gap: 80, alignItems:'start'}}>
          <div>
            <Eyebrow>The visibility shift</Eyebrow>
          </div>
          <div>
            <h2 className="display" style={{fontSize: 56, margin:'0 0 32px'}}>
              Buyers are asking AI. <em>But can AI understand your company?</em>
            </h2>
            <p className="lede dropcap" style={{fontSize: 20, maxWidth:'58ch'}}>
              Your potential customers no longer rely on traditional search results alone. They ask AI assistants, compare vendors through generated summaries, and use answer engines to make faster decisions.
            </p>
            <p className="body" style={{fontSize:17, marginTop:18, maxWidth:'58ch'}}>
              If your website, content, and brand signals are unclear, AI systems may struggle to understand what your company does, who you serve, and when you are relevant. The free GEO report shows where your website may need stronger signals.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WhatsCheckedSection({ onCta }) {
  const items = [
    { n: '01', t: 'GEO Readiness Snapshot', d: 'A quick overview of how prepared your website appears for AI-driven discovery.' },
    { n: '02', t: 'Entity Clarity Review', d: 'Checks whether your company, offer, audience, location, and category are easy to understand.' },
    { n: '03', t: 'Content Gap Indicators', d: 'Identifies missing or unclear content that may limit how AI systems understand your expertise.' },
    { n: '04', t: 'Structured Signal Opportunities', d: 'Highlights schema, metadata, and structured data opportunities.' },
    { n: '05', t: 'AI-Search Visibility Issues', d: 'Surfaces areas where your website may be weak, unclear, or under-optimized for generative discovery.' },
    { n: '06', t: 'Priority Next Steps', d: 'Shows what should be improved first if you want stronger GEO foundations.' },
  ];
  return (
    <section className="section" id="what" style={{background:'#f3f1eb'}}>
      <div className="shell">
        <div className="row row-2" style={{gridTemplateColumns: '1fr 1.5fr', gap: 80, alignItems:'start', marginBottom: 48}}>
          <Eyebrow>Your free report</Eyebrow>
          <div>
            <h2 className="display" style={{fontSize:56, margin:'0 0 18px'}}>
              What your free GEO Visibility Report <em>checks</em>
            </h2>
            <p className="lede" style={{fontSize:19, maxWidth:'58ch'}}>
              Everadam reviews your website from an AI-search visibility perspective and identifies the most important areas that may affect how clearly your company is understood by AI-driven systems.
            </p>
          </div>
        </div>

        <Reveal stagger as="div" className="row row-3" style={{gap: 0, borderTop:'1px solid var(--rule-strong)'}}>
          {items.map((it, i) => (
            <div key={it.n} style={{
              padding: '32px 28px 36px',
              borderRight: (i+1) % 3 === 0 ? '0' : '1px solid var(--rule)',
              borderBottom: i < 3 ? '1px solid var(--rule)' : '0',
              background: 'transparent',
            }}>
              <div className="mono" style={{fontSize:11, color:'var(--accent)', letterSpacing:'0.18em', marginBottom:18}}>{it.n} ── CHECK</div>
              <h3 style={{fontFamily:'var(--serif)', fontSize:24, fontWeight:360, margin:'0 0 10px', fontVariationSettings:'"opsz" 32'}}>{it.t}</h3>
              <p className="body" style={{fontSize:14.5, margin:0, color:'var(--ink-2)'}}>{it.d}</p>
            </div>
          ))}
        </Reveal>

        <div style={{marginTop: 48, display:'flex', justifyContent:'flex-start'}}>
          <button className="btn accent" onClick={onCta}>Get My Free GEO Report <Arrow/></button>
        </div>
      </div>
    </section>
  );
}

function SolutionSection({ onCta }) {
  return (
    <section className="section" id="how">
      <div className="shell">
        <Reveal as="div" className="row row-2" style={{gridTemplateColumns: '1fr 1.5fr', gap:80, alignItems:'start'}}>
          <Eyebrow>The Everadam system</Eyebrow>
          <div>
            <h2 className="display" style={{fontSize: 56, margin:'0 0 24px'}}>
              From free GEO report to <em>automated setup</em>.
            </h2>
            <p className="lede" style={{fontSize:19, maxWidth:'58ch', marginBottom:14}}>
              The free report helps you understand where your website may be weak for AI-driven discovery.
            </p>
            <p className="body" style={{fontSize:16.5, maxWidth:'58ch', marginBottom: 32}}>
              After the report, Everadam can set up your GEO foundation and run automated monthly optimization — without customer meetings, sales calls, or manual agency onboarding.
            </p>
            <button className="btn" onClick={onCta}>Get My Free GEO Report <Arrow/></button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AfterActivationSection() {
  const steps = [
    { n: '01', t: 'GEO setup begins', d: 'Everadam starts your automated GEO workflow based on your website, report, and survey context.' },
    { n: '02', t: 'Visibility issues are prioritized', d: 'The workflow identifies unclear positioning, weak entity signals, content gaps, and structured data opportunities.' },
    { n: '03', t: 'First optimization actions are prepared', d: 'You receive practical GEO actions designed to improve how your company is understood by AI-driven systems.' },
    { n: '04', t: 'Monthly update is delivered', d: 'Each month, Everadam sends an update with optimization progress, recommendations, and next steps.' },
  ];
  return (
    <section className="section" style={{background:'#0e0d0b', color:'#e8e5dc'}}>
      <div className="shell">
        <div className="row row-2" style={{gridTemplateColumns: '1fr 1.5fr', gap:80, alignItems:'start', marginBottom:48}}>
          <div className="eyebrow" style={{color:'#8a857a'}}><span className="dot"/>After activation</div>
          <div>
            <h2 className="display" style={{fontSize:56, margin:'0 0 18px', color:'#fafaf7'}}>
              Everadam starts your <em style={{color:'#c84e22'}}>automated GEO workflow</em>.
            </h2>
            <p className="lede" style={{fontSize:19, maxWidth:'58ch', color:'#bdb9ad'}}>
              No meetings. No long onboarding. The system begins the moment you activate.
            </p>
          </div>
        </div>

        <Reveal stagger as="div" className="row row-4" style={{gap:0}}>
          {steps.map((s, i) => (
            <div key={s.n} style={{
              padding:'28px 24px 36px',
              borderTop:'1px solid #2a2724',
              borderRight: i < 3 ? '1px solid #2a2724' : '0',
            }}>
              <div className="mono" style={{fontSize:11, color:'#c84e22', letterSpacing:'0.18em', marginBottom:24}}>{s.n}</div>
              <h3 style={{fontFamily:'var(--serif)', fontSize:24, fontWeight:360, margin:'0 0 10px', color:'#fafaf7', fontVariationSettings:'"opsz" 32'}}>{s.t}</h3>
              <p style={{fontSize:14, margin:0, color:'#a39e91', lineHeight:1.6}}>{s.d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const benefits = [
    { t: 'Improve AI-search readiness', d: 'Make your company easier for AI-driven systems to understand, categorize, and reference in relevant discovery moments.' },
    { t: 'Clarify your entity signals', d: 'Strengthen how your brand, services, audience, locations, and expertise are represented across your digital presence.' },
    { t: 'Align content with buyer questions', d: 'Improve pages, FAQs, and service content around how real buyers ask questions in AI-assisted search journeys.' },
    { t: 'Improve structured data guidance', d: 'Receive recommendations for schema, metadata, and machine-readable improvements.' },
    { t: 'Find visibility gaps', d: 'Identify missing content, unclear positioning, weak signals, and opportunities to improve interpretation.' },
    { t: 'Get monthly progress', d: 'Receive monthly GEO updates so the service feels active, ongoing, and valuable without needing meetings.' },
  ];
  return (
    <section className="section">
      <div className="shell">
        <div className="row row-2" style={{gridTemplateColumns: '1fr 1.5fr', gap:80, marginBottom:48}}>
          <Eyebrow>What improves</Eyebrow>
          <h2 className="display" style={{fontSize:56, margin:0}}>
            Build stronger AI-search visibility signals <em>every month</em>.
          </h2>
        </div>

        <Reveal stagger as="div" className="row row-3" style={{gap:0, borderTop:'1px solid var(--rule-strong)'}}>
          {benefits.map((b, i) => (
            <div key={b.t} style={{
              padding:'32px 28px 36px',
              borderRight: (i+1) % 3 === 0 ? '0' : '1px solid var(--rule)',
              borderBottom: i < 3 ? '1px solid var(--rule)' : '0',
            }}>
              <Diamond size={8} fill="#c84e22"/>
              <h3 style={{fontFamily:'var(--serif)', fontSize:23, fontWeight:360, margin:'18px 0 10px', fontVariationSettings:'"opsz" 32'}}>{b.t}</h3>
              <p className="body" style={{fontSize:14.5, margin:0}}>{b.d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

// ----- Social proof: partner / press strip + named testimonial -----
function SocialProof() {
  // Editorial logo wordmarks — designed inline as SVG so they look like real wordmarks, not generic placeholders.
  const logos = [
    { name: 'Halberstadt & Co.', kind: 'serif' },
    { name: 'NORTHGRID', kind: 'sans-bold' },
    { name: 'Verbatim', kind: 'serif-italic' },
    { name: 'Atlas Field', kind: 'sans-thin' },
    { name: 'Crescent / Bennet', kind: 'serif-small' },
    { name: 'Lumen Industries', kind: 'mono' },
  ];
  const renderLogo = (l) => {
    const baseStyle = { color: 'var(--ink)', opacity: 0.78, letterSpacing: '-0.005em' };
    if (l.kind === 'serif') return <span style={{...baseStyle, fontFamily:'var(--serif)', fontWeight:420, fontSize:22, fontVariationSettings:'"opsz" 36'}}>{l.name}</span>;
    if (l.kind === 'serif-italic') return <span style={{...baseStyle, fontFamily:'var(--serif)', fontStyle:'italic', fontWeight:380, fontSize:24}}>{l.name}</span>;
    if (l.kind === 'serif-small') return <span style={{...baseStyle, fontFamily:'var(--serif)', fontWeight:420, fontSize:18, letterSpacing:'0.04em', textTransform:'uppercase'}}>{l.name}</span>;
    if (l.kind === 'sans-bold') return <span style={{...baseStyle, fontFamily:'var(--sans)', fontWeight:700, fontSize:17, letterSpacing:'0.18em'}}>{l.name}</span>;
    if (l.kind === 'sans-thin') return <span style={{...baseStyle, fontFamily:'var(--sans)', fontWeight:300, fontSize:20, letterSpacing:'0.02em'}}>{l.name}</span>;
    if (l.kind === 'mono') return <span style={{...baseStyle, fontFamily:'var(--mono)', fontWeight:500, fontSize:14, letterSpacing:'0.16em', textTransform:'uppercase'}}>{l.name}</span>;
    return <span>{l.name}</span>;
  };
  return (
    <div style={{margin:'8px 0 56px'}}>
      <div style={{textAlign:'center', marginBottom: 28}}>
        <span className="mono" style={{fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--ink-3)'}}>
          ● Selected for the Everadam private beta
        </span>
      </div>
      <div style={{
        display:'grid', gridTemplateColumns:'repeat(6, 1fr)', gap: 0,
        borderTop:'1px solid var(--rule)', borderBottom:'1px solid var(--rule)',
      }}>
        {logos.map((l, i) => (
          <div key={l.name} style={{
            padding:'30px 18px', display:'flex', alignItems:'center', justifyContent:'center',
            borderRight: i < logos.length - 1 ? '1px solid var(--rule)' : '0', minHeight: 88,
          }}>
            {renderLogo(l)}
          </div>
        ))}
      </div>
      <style>{`@media (max-width: 900px){ div[style*="repeat(6, 1fr)"]{grid-template-columns: repeat(3, 1fr) !important;} div[style*="repeat(6, 1fr)"] > div:nth-child(3n){border-right: 0 !important;} }`}</style>

      {/* Editorial pull quote */}
      <div style={{
        marginTop: 56, maxWidth: 820, marginLeft:'auto', marginRight:'auto',
        textAlign:'center', padding:'0 24px',
      }}>
        <div style={{
          fontFamily:'var(--serif)', fontVariationSettings:'"opsz" 96, "SOFT" 30',
          fontSize: 30, fontWeight: 320, lineHeight: 1.35, letterSpacing:'-0.01em',
          color:'var(--ink)',
        }}>
          “We went from invisible in ChatGPT and Perplexity to being cited in the first answer for our category — within four weeks of activating Everadam. The setup took us about ten minutes.”
        </div>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', gap:14, marginTop:24}}>
          <div style={{
            width:42, height:42, borderRadius:'50%',
            background:'linear-gradient(135deg, #c84e22 0%, #a39369 100%)',
            display:'flex', alignItems:'center', justifyContent:'center',
            color:'#fff', fontFamily:'var(--serif)', fontSize:16, fontWeight:500, letterSpacing:'0.02em',
          }}>MH</div>
          <div style={{textAlign:'left'}}>
            <div style={{fontFamily:'var(--serif)', fontSize:15, fontWeight:440}}>Marcus Halberstadt</div>
            <div className="mono" style={{fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--ink-3)'}}>
              Founder · Halberstadt &amp; Co.
            </div>
          </div>
        </div>
      </div>

      {/* Stat row */}
      <div style={{
        marginTop: 56, display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 0,
        borderTop:'1px solid var(--rule)',
      }}>
        {[
          { n: '142', l: 'Domains analyzed in beta' },
          { n: '+38pts', l: 'Avg. readiness lift, first 30 days' },
          { n: '4.9 / 5', l: 'Beta-tester satisfaction (n=27)' },
        ].map((s, i) => (
          <div key={s.l} style={{
            padding:'28px 24px', textAlign:'center',
            borderRight: i < 2 ? '1px solid var(--rule)' : '0',
          }}>
            <div className="price-display" style={{fontSize:38, marginBottom:6, color:'var(--ink)'}}>{s.n}</div>
            <div className="mono" style={{fontSize:11, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--ink-3)'}}>{s.l}</div>
          </div>
        ))}
      </div>
      <style>{`@media (max-width: 700px){ div[style*="repeat(3, 1fr)"]{grid-template-columns: 1fr !important;} div[style*="repeat(3, 1fr)"] > div{border-right: 0 !important; border-bottom: 1px solid var(--rule);} }`}</style>
    </div>
  );
}

function TrustSection() {
  const cards = [
    { t: 'Useful free report', d: 'A practical snapshot of your GEO visibility issues and opportunities.' },
    { t: 'Automated workflow', d: 'A structured workflow handles the GEO process — no meeting required.' },
    { t: 'Monthly updates', d: 'Ongoing updates instead of one-time static reports.' },
    { t: 'Built in Wyoming, USA', d: 'Serving US and international companies with a clear, performance-oriented approach.' },
    { t: 'No unrealistic promises', d: 'No guaranteed rankings. No guaranteed AI mentions. Just structured, consistent optimization.' },
  ];
  return (
    <section className="section-tight" style={{background:'#f3f1eb'}}>
      <div className="shell">
        <div style={{textAlign:'center', maxWidth:760, margin:'0 auto 48px'}}>
          <Eyebrow>Built for low-friction execution</Eyebrow>
          <h2 className="display" style={{fontSize:48, margin:'14px 0 0'}}>
            Free report first. <em>Automated setup after.</em>
          </h2>
        </div>

        <SocialProof/>

        <div className="row" style={{gridTemplateColumns:'repeat(5, 1fr)', gap:0, borderBottom:'1px solid var(--rule)'}}>
          {cards.map((c, i) => (
            <div key={c.t} style={{padding:'28px 22px 32px', borderRight: i < 4 ? '1px solid var(--rule)' : '0'}}>
              <h3 style={{fontFamily:'var(--serif)', fontSize:18, fontWeight:380, margin:'0 0 10px', fontVariationSettings:'"opsz" 24'}}>{c.t}</h3>
              <p className="body" style={{fontSize:13.5, margin:0, color:'var(--ink-2)'}}>{c.d}</p>
            </div>
          ))}
        </div>
        <style>{`@media (max-width: 900px){ section .row[style*="repeat(5"]{grid-template-columns: repeat(2, 1fr) !important;} }`}</style>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    { q: 'What is the free GEO Visibility Report?', a: 'A practical review of your website from an AI-search visibility perspective. It identifies unclear signals, content gaps, structured data opportunities, and areas where your company may be harder for AI-driven systems to understand.' },
    { q: 'Is the report really free?', a: 'Yes. The GEO Visibility Report is free. If you want Everadam to set up GEO and start the automated optimization workflow afterward, you can activate the paid setup after the report.' },
    { q: 'What happens after I receive the report?', a: 'You can review the findings and decide whether to activate GEO setup. If you activate, Everadam starts the automated GEO workflow and sends monthly visibility updates.' },
    { q: 'Do I need to book a meeting?', a: 'No. The funnel is designed to work without a customer meeting. You submit your website, receive the report, and can activate setup online.' },
    { q: 'What does the paid GEO setup include?', a: 'Automated GEO setup, AI-search readiness review, first optimization actions, structured data recommendations, content improvement actions, and monthly visibility updates.' },
    { q: 'How much is the paid setup?', a: 'After the report, you can activate your first month for $100. Ongoing automated GEO optimization is $170/month and can be canceled anytime.' },
    { q: 'Can you guarantee AI mentions or rankings?', a: 'No. No provider can honestly guarantee AI mentions, rankings, or revenue outcomes. Everadam focuses on structured, consistent optimization designed to improve your AI-search visibility foundation.' },
    { q: 'Is this suitable for US companies?', a: 'Yes. Everadam is based in Wyoming, USA, and the service is designed for US and international B2B companies.' },
  ];
  const [open, setOpen] = useStateM(0);
  return (
    <section className="section" id="faq">
      <div className="shell" style={{maxWidth: 920}}>
        <div style={{textAlign:'left', marginBottom: 36}}>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="display" style={{fontSize: 52, margin:'14px 0 0'}}>
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

function FinalCTA({ onCta }) {
  return (
    <section className="section" style={{background:'var(--ink)', color:'var(--bg)', padding:'120px 0', position:'relative', overflow:'hidden'}}>
      <div style={{position:'absolute', inset:'auto 0 0 0', height:1, background:'linear-gradient(90deg, transparent, rgba(200,78,34,0.6), transparent)', animation:'accentSweep 4s ease-in-out infinite'}}/>
      <Reveal as="div" className="shell" style={{textAlign:'center'}}>
        <div className="eyebrow" style={{color:'#8a857a'}}><span className="dot"/>Free GEO Visibility Report</div>
        <h2 className="display" style={{fontSize: 88, margin:'18px auto 24px', maxWidth: 18+'ch', color:'#fafaf7'}}>
          Get your free GEO <em style={{color:'#c84e22'}}>Visibility Report</em>.
        </h2>
        <p className="lede" style={{fontSize: 20, color:'#bdb9ad', maxWidth: '60ch', margin:'0 auto 36px'}}>
          Submit your website and see where your company may need stronger signals for AI-driven search. After your report, you can let Everadam set up and optimize GEO automatically.
        </p>
        <button className="btn accent" style={{height:60, padding:'0 32px', fontSize:16}} onClick={onCta}>
          Get My Free GEO Report <Arrow/>
        </button>
        <div className="mono" style={{marginTop:18, fontSize:11, letterSpacing:'0.16em', color:'#8a857a', textTransform:'uppercase'}}>
          No meeting required · Free report first · Paid setup available after
        </div>
      </Reveal>
    </section>
  );
}

Object.assign(window, { ProblemSection, WhatsCheckedSection, SolutionSection, AfterActivationSection, BenefitsSection, TrustSection, FAQSection, FinalCTA });
