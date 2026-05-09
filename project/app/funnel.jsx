// Multi-step survey, scan animation, report preview, activation
const { useState: useStateF, useEffect: useEffectF, useRef: useRefF, useMemo: useMemoF } = React;

const GOAL_OPTIONS = [
  "Show up better in AI search",
  "Make our website clearer",
  "Improve structured data signals",
  "Find content gaps",
  "Strengthen brand / entity signals",
  "Understand what AI may see about us",
  "Not sure yet",
];

// ----- Survey -----
function Survey({ initialDomain, initialEmail, onComplete, onClose }) {
  const [step, setStep] = useStateF(1);
  const [data, setData] = useStateF({
    domain: initialDomain || "",
    email: initialEmail || "",
    company: "",
    service: "",
    market: "",
    goal: "",
  });
  const [errors, setErrors] = useStateF({});

  const set = (k, v) => setData(d => ({...d, [k]: v}));

  const validateStep = () => {
    const e = {};
    if (step === 1) {
      if (!isValidUrl(data.domain)) e.domain = "Enter a valid website URL";
      if (!isValidEmail(data.email)) e.email = "Enter a valid work email";
    } else if (step === 2) {
      if (!data.company.trim()) e.company = "Required";
      if (!data.service.trim()) e.service = "Required";
      if (!data.market.trim()) e.market = "Required";
    } else if (step === 3) {
      if (!data.goal) e.goal = "Pick one";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    if (step < 3) setStep(step + 1);
    else onComplete(data);
  };
  const back = () => {
    if (step > 1) setStep(step - 1);
    else onClose && onClose();
  };

  return (
    <div className="fade-up" key={step}>
      {/* Progress + step pill */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
        <div className="step-pill">Step {step} of 3 · {['Website','Company context','Visibility goal'][step-1]}</div>
        <div className="step-pill" style={{color:'var(--ink-2)'}}>{Math.round(step/3*100)}%</div>
      </div>
      <div className="progress-bar" style={{marginBottom: 36}}>
        <div className="progress-fill" style={{width: `${step/3*100}%`}}/>
      </div>

      {step === 1 && (
        <Step
          eyebrow="01 — Website"
          question="What website should Everadam review?"
          microcopy="Your report is prepared from your website and company context."
        >
          <div className="row row-2" style={{gap:28}}>
            <FieldInput
              label="Company website"
              value={data.domain}
              placeholder="yourcompany.com"
              error={errors.domain}
              onChange={v => set('domain', v)}
            />
            <FieldInput
              label="Work email"
              value={data.email}
              placeholder="you@yourcompany.com"
              error={errors.email}
              onChange={v => set('email', v)}
            />
          </div>
        </Step>
      )}

      {step === 2 && (
        <Step
          eyebrow="02 — Company context"
          question="What should AI systems understand about your company?"
          microcopy="Used to interpret your site against your real positioning."
        >
          <FieldInput
            label="Company name"
            value={data.company}
            error={errors.company}
            placeholder="e.g., Northwind Robotics"
            onChange={v => set('company', v)}
          />
          <div style={{height:24}}/>
          <FieldInput
            label="Main service or product"
            value={data.service}
            error={errors.service}
            placeholder="e.g., Warehouse automation for mid-market 3PLs"
            onChange={v => set('service', v)}
          />
          <div style={{height:24}}/>
          <FieldInput
            label="Target market"
            value={data.market}
            error={errors.market}
            placeholder="e.g., US logistics ops leaders, $50M–$500M revenue"
            onChange={v => set('market', v)}
          />
        </Step>
      )}

      {step === 3 && (
        <Step
          eyebrow="03 — Visibility goal"
          question="What do you want to improve first?"
          microcopy="One answer is enough — you can change this later."
        >
          <div style={{display:'grid', gap:10}}>
            {GOAL_OPTIONS.map(opt => (
              <div
                key={opt}
                className={`radio-card ${data.goal === opt ? 'selected' : ''}`}
                onClick={() => set('goal', opt)}
              >
                <span className="radio-dot"/>
                <span style={{fontSize:15}}>{opt}</span>
              </div>
            ))}
          </div>
          {errors.goal && <div className="error-text" style={{marginTop:10}}>{errors.goal}</div>}
        </Step>
      )}

      {/* Actions */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:36}}>
        <button className="btn ghost" onClick={back} style={{height:46}}>
          {step === 1 ? "Cancel" : "← Back"}
        </button>
        <button className="btn accent" onClick={next} style={{height:54, padding:'0 28px'}}>
          {step < 3 ? "Continue" : "Prepare My GEO Report"} <Arrow/>
        </button>
      </div>
    </div>
  );
}

function Step({ eyebrow, question, microcopy, children }) {
  return (
    <div>
      <Eyebrow dot={false}>{eyebrow}</Eyebrow>
      <h3 className="display" style={{fontSize:34, marginTop:10, marginBottom:8, fontWeight:360}}>{question}</h3>
      {microcopy && <div className="body" style={{fontSize:14, color:'var(--ink-3)', marginBottom:32, maxWidth:'52ch'}}>{microcopy}</div>}
      {children}
    </div>
  );
}

function FieldInput({ label, value, onChange, placeholder, error }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input
        className={`input ${error ? 'error' : ''}`}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
}

// ----- Scan animation (post-survey) — terminal-style, ~13s -----
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

function Scanning({ domain, onDone }) {
  const dom = cleanDomain(domain) || "your-site.com";
  const [shown, setShown] = useStateF([]);
  const [tick, setTick] = useStateF(0);

  useEffectF(() => {
    let cancelled = false;
    let i = 0;
    const queue = () => {
      if (cancelled || i >= SCAN_LINES.length) {
        if (!cancelled) setTimeout(onDone, 700);
        return;
      }
      const line = SCAN_LINES[i];
      const text = line.t(dom);
      setShown(prev => [...prev, text]);
      i++;
      setTimeout(queue, line.d);
    };
    const t = setTimeout(queue, 250);
    return () => { cancelled = true; clearTimeout(t); };
  }, []);

  useEffectF(() => {
    const t = setInterval(() => setTick(x => x + 1), 90);
    return () => clearInterval(t);
  }, []);

  const cursor = tick % 2 === 0 ? '▋' : ' ';
  const totalSecs = Math.round(SCAN_LINES.reduce((s, l) => s + l.d, 0) / 1000);
  const elapsedSecs = Math.min(totalSecs, Math.round(shown.length / SCAN_LINES.length * totalSecs));
  const pct = Math.min(100, Math.round((shown.length / SCAN_LINES.length) * 100));

  return (
    <div className="fade-up" style={{padding:'12px 0'}}>
      <Eyebrow>Live analysis in progress</Eyebrow>
      <h3 className="display" style={{fontSize:34, marginTop:8, marginBottom:8}}>
        Scanning <em>{dom}</em>
      </h3>
      <div className="body" style={{fontSize:14, color:'var(--ink-3)', marginBottom:24, maxWidth:'58ch'}}>
        Everadam is querying live AI search endpoints and evaluating how they currently see your business. Please don't close this window — your custom entity graph is being generated.
      </div>

      {/* Progress bar */}
      <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:14}}>
        <div style={{flex:1, height:2, background:'var(--rule)', position:'relative', overflow:'hidden'}}>
          <div style={{position:'absolute', left:0, top:0, bottom:0, width:`${pct}%`, background:'var(--accent)', transition:'width 360ms ease'}}/>
        </div>
        <span className="mono" style={{fontSize:11, letterSpacing:'0.14em', color:'var(--ink-3)'}}>
          {String(elapsedSecs).padStart(2,'0')}s · {pct}%
        </span>
      </div>

      {/* Terminal */}
      <div style={{
        background:'#0e0d0c', color:'#e8e3d6', fontFamily:'var(--mono)', fontSize:12.5,
        lineHeight:1.7, padding:'18px 22px', borderRadius:0,
        border:'1px solid #1d1b18', minHeight:340, maxHeight:380, overflow:'hidden',
        boxShadow:'inset 0 0 60px rgba(0,0,0,0.6)',
      }}>
        <div style={{display:'flex', gap:6, marginBottom:14, opacity:0.55}}>
          <span style={{width:8, height:8, borderRadius:'50%', background:'#c84e22'}}/>
          <span style={{width:8, height:8, borderRadius:'50%', background:'#a39369'}}/>
          <span style={{width:8, height:8, borderRadius:'50%', background:'#6b8e6e'}}/>
          <span style={{marginLeft:14, fontSize:11, letterSpacing:'0.14em', color:'#8a857a', textTransform:'uppercase'}}>
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
        <div style={{color:'#fff', marginTop:2}}>
          <span style={{color:'#c84e22'}}>$</span> {shown.length < SCAN_LINES.length ? <span style={{color:'#8a857a'}}>{cursor}</span> : <span style={{color:'#6b8e6e'}}>scan complete · preparing report{cursor}</span>}
        </div>
      </div>

      <div className="mono" style={{marginTop:14, fontSize:10.5, letterSpacing:'0.18em', color:'var(--ink-3)', textTransform:'uppercase', display:'flex', justifyContent:'space-between'}}>
        <span>Live data · do not close window</span>
        <span>Approx {totalSecs}s total</span>
      </div>
    </div>
  );
}

// ----- Report preview -----
// Light hash so each domain gets its own (but stable) score + count
function hashDomain(s) {
  let h = 0;
  const v = (s || '').toLowerCase();
  for (let i = 0; i < v.length; i++) h = ((h << 5) - h + v.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const ALL_ISSUES = [
  { sev: 'high', area: 'Clear company info',     text: (d) => `On ${d}, your location, category, and what you sell aren't easy for AI to pick up.`,                                              fix: 'Setup' },
  { sev: 'high', area: 'What you actually do',   text: ()  => `Your homepage talks about three different things at once. AI tools have a hard time deciding what your company is known for.`,    fix: 'Setup' },
  { sev: 'high', area: 'Buyer questions',        text: ()  => `Only about 1 in 6 of the questions buyers actually ask are answered clearly on your site.`,                                        fix: 'Setup' },
  { sev: 'high', area: 'AI-readable tags',       text: ()  => `Your site is missing the simple behind-the-scenes tags AI uses to understand companies, services, and FAQs.`,                      fix: 'Setup' },
  { sev: 'med',  area: 'AI crawler access',      text: ()  => `AI crawlers can reach your site, but they're missing hints about which pages matter most.`,                                         fix: 'Setup' },
  { sev: 'med',  area: 'Brand consistency',      text: ()  => `Your brand name and details show up a little differently across pages, footers, and metadata.`,                                    fix: 'Setup' },
  { sev: 'med',  area: 'Page connections',       text: ()  => `Your most important service pages are buried — they take more than 2 clicks to reach from your homepage.`,                         fix: 'Setup' },
  { sev: 'med',  area: 'About-page depth',       text: ()  => `Your About page is short on the kind of detail (team, story, expertise) AI uses to trust a company.`,                              fix: 'Setup' },
  { sev: 'low',  area: 'Page speed',             text: ()  => `Speed is generally fine — one page (pricing) could load a bit faster.`,                                                            fix: 'Optional' },
];

function buildReport(domain) {
  const d = cleanDomain(domain) || "yourcompany.com";
  const h = hashDomain(d);
  // Score varies 38–54 per domain (stable for that domain)
  const score = 38 + (h % 17);
  // 6–8 findings
  const count = 6 + (h % 3);
  // Always include all 4 high, then deterministic pick from the rest
  const high = ALL_ISSUES.filter(i => i.sev === 'high');
  const rest = ALL_ISSUES.filter(i => i.sev !== 'high');
  const startIdx = h % rest.length;
  const picked = [];
  for (let i = 0; i < count - high.length; i++) {
    picked.push(rest[(startIdx + i) % rest.length]);
  }
  const issues = [...high, ...picked]
    .sort((a, b) => ({high:0, med:1, low:2}[a.sev] - ({high:0, med:1, low:2}[b.sev])))
    .map(i => ({ ...i, text: i.text(d) }));
  return { score, issues, highCount: high.length, totalCount: issues.length };
}

// Countdown hook (15 min from first render)
function useCountdown(seconds) {
  const [left, setLeft] = useStateF(seconds);
  useEffectF(() => {
    const t = setInterval(() => setLeft(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(t);
  }, []);
  const m = Math.floor(left / 60).toString().padStart(2,'0');
  const s = (left % 60).toString().padStart(2,'0');
  return { left, label: `${m}:${s}` };
}

function ReportPreview({ data, onActivate }) {
  const report = useMemoF(() => buildReport(data.domain), [data.domain]);
  const { issues, score, highCount, totalCount } = report;
  const [animScore, setAnimScore] = useStateF(0);
  const [annual, setAnnual] = useStateF(true); // shadow upsell — pre-checked
  const countdown = useCountdown(15 * 60);
  useEffectF(() => {
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
  const ringOffset = ringC * (1 - animScore/100);

  // Benchmark
  const benchmark = 84;
  const gap = benchmark - score;
  const dom = cleanDomain(data.domain) || "your site";

  return (
    <div className="fade-up">
      {/* Urgency banner */}
      <div style={{
        marginBottom: 28, padding: '14px 18px',
        background: '#1a1a1a', color: '#fafaf7',
        display:'flex', alignItems:'center', justifyContent:'space-between', gap:16,
        borderLeft:'3px solid var(--accent)',
        flexWrap:'wrap',
      }}>
        <div style={{display:'flex', alignItems:'baseline', gap:12, flexWrap:'wrap'}}>
          <span className="mono" style={{fontSize:10.5, letterSpacing:'0.18em', color:'var(--accent)', textTransform:'uppercase'}}>● Session reserved</span>
          <span style={{fontSize:13.5, color:'#e8e3d6'}}>
            Your custom entity graph is cached. Activate within the window to lock in the <strong style={{color:'#fff'}}>$100 priority setup</strong> — after that, standard rates ($170/mo first month) apply.
          </span>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <span className="mono" style={{fontSize:10.5, letterSpacing:'0.18em', color:'#8a857a', textTransform:'uppercase'}}>Expires in</span>
          <span className="mono" style={{
            fontSize:18, letterSpacing:'0.06em', color: countdown.left < 180 ? 'var(--accent)' : '#fff',
            padding:'4px 10px', border:'1px solid rgba(255,255,255,0.18)',
            fontVariantNumeric:'tabular-nums',
          }}>{countdown.label}</span>
        </div>
      </div>

      <Eyebrow>Your snapshot · Preview</Eyebrow>
      <h3 className="display" style={{fontSize:38, marginTop:8, marginBottom:8}}>
        Here's what AI sees on <em>{dom}</em>
      </h3>
      <div className="body" style={{fontSize:14, color:'var(--ink-3)', maxWidth:'58ch', marginBottom: 28}}>
        A quick preview of your free report. The full version, with plain-English explanations and what to fix first, will be emailed to <span style={{color:'var(--ink)'}}>{data.email || 'you'}</span>.
      </div>

      {/* Score + benchmark */}
      <div className="row row-2" style={{gridTemplateColumns:'200px 1fr', gap:32, alignItems:'center', padding:'24px 0', borderTop:'1px solid var(--rule)', borderBottom:'1px solid var(--rule)'}}>
        <div style={{position:'relative', width:160, height:160}}>
          <svg width={160} height={160} className="score-ring">
            <circle cx={80} cy={80} r={ringR} fill="none" strokeWidth={2} className="score-ring-bg"/>
            <circle cx={80} cy={80} r={ringR} fill="none" strokeWidth={2}
                    strokeDasharray={ringC} strokeDashoffset={ringOffset}
                    className="score-ring-fg" strokeLinecap="square"/>
          </svg>
          <div style={{position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <div className="price-display" style={{fontSize:48}}>{animScore}</div>
            <div className="mono" style={{fontSize:10, letterSpacing:'0.2em', color:'var(--ink-3)', textTransform:'uppercase', marginTop:2}}>/ 100</div>
          </div>
        </div>
        <div>
          <div className="mono" style={{fontSize:11, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--accent)'}}>AI readiness — falling behind</div>
          <h4 className="display" style={{fontSize:24, marginTop:8, marginBottom:14}}>
            You're <em>{gap} points</em> behind the leaders in your space.
          </h4>
          {/* Benchmark comparison bar */}
          <div style={{display:'grid', gap:8, maxWidth: 460, marginBottom:12}}>
            <div>
              <div style={{display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:4}}>
                <span className="mono" style={{letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--ink-3)'}}>Your score</span>
                <span className="mono" style={{color:'var(--accent)', fontVariantNumeric:'tabular-nums'}}>{score}</span>
              </div>
              <div style={{height:4, background:'var(--rule)'}}>
                <div style={{width:`${score}%`, height:'100%', background:'var(--accent)'}}/>
              </div>
            </div>
            <div>
              <div style={{display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:4}}>
                <span className="mono" style={{letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--ink-3)'}}>Industry leader avg.</span>
                <span className="mono" style={{color:'var(--ink)', fontVariantNumeric:'tabular-nums'}}>{benchmark}</span>
              </div>
              <div style={{height:4, background:'var(--rule)'}}>
                <div style={{width:`${benchmark}%`, height:'100%', background:'var(--ink)'}}/>
              </div>
            </div>
          </div>
          <div className="body" style={{fontSize:13.5, color:'var(--ink-2)', maxWidth:'56ch'}}>
            Competitors who appear in AI answers for your category score around <strong>{benchmark}/100</strong>. Every day you stay at {score}, they win the recommendations meant for you.
          </div>
        </div>
      </div>

      {/* AI quote — confirmation bias */}
      <div style={{
        marginTop: 32, padding: '24px 28px',
        background: 'var(--card)', border: '1px solid var(--rule)',
        position:'relative',
      }}>
        <div className="mono" style={{fontSize:10.5, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--ink-3)', marginBottom:10}}>
          ● We asked an AI assistant about {dom}
        </div>
        <blockquote style={{
          margin:0, fontFamily:'var(--serif)', fontVariationSettings:'"opsz" 32',
          fontSize:22, fontWeight:360, lineHeight:1.45, letterSpacing:'-0.005em',
          color:'var(--ink)', borderLeft:'2px solid var(--accent)', paddingLeft:18,
        }}>
          "I couldn't verify {dom}'s exact offerings or who they specifically serve. You may want to check their website directly."
        </blockquote>
        <div className="mono" style={{fontSize:11, letterSpacing:'0.14em', color:'var(--ink-3)', marginTop:12}}>
          — Live response · GPT-4 · {new Date().toLocaleDateString('en-US', {month:'short', day:'numeric'})}
        </div>
      </div>

      {/* Issues */}
      <div style={{marginTop: 36}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:12}}>
          <Eyebrow>Top findings</Eyebrow>
          <div className="mono" style={{fontSize:11, letterSpacing:'0.12em', color:'var(--ink-3)', textTransform:'uppercase'}}>
            {issues.length} items · sorted by severity
          </div>
        </div>
        <div>
          {issues.map((it, i) => (
            <div className="issue-row" key={i} style={{animation:`fadeUp 360ms ${i*60}ms ease both`}}>
              <span className={`issue-sev sev-${it.sev}`}>● {it.sev === 'high' ? 'High' : it.sev === 'med' ? 'Medium' : 'Low'}</span>
              <div>
                <div style={{fontFamily:'var(--serif)', fontSize:18, fontVariationSettings:'"opsz" 24', marginBottom:4}}>{it.area}</div>
                <div className="body" style={{fontSize:14, color:'var(--ink-2)', maxWidth:'68ch'}}>{it.text}</div>
              </div>
              <div className="issue-status">{it.fix === 'Setup' ? 'Fixed in setup' : 'Optional'}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline 1-click checkout */}
      <div style={{marginTop:48, padding: '36px 32px', background: 'var(--card)', border: '1px solid var(--rule)'}}>
        <div style={{textAlign:'center', maxWidth: 540, margin:'0 auto'}}>
          <Eyebrow>Lock in priority setup</Eyebrow>
          <h4 className="display" style={{fontSize:30, marginTop:10, marginBottom:10}}>
            Activate in one tap.
          </h4>
          <div className="body" style={{fontSize:14.5, color:'var(--ink-2)', marginBottom:20}}>
            We fix everything above. No meeting, no extra forms — your details are already on file.
          </div>

          <div style={{display:'flex', alignItems:'baseline', justifyContent:'center', gap:10, marginBottom:4}}>
            <span className="price-display" style={{fontSize:56}}>$100</span>
            <span style={{fontSize:18, color:'var(--ink-3)', textDecoration:'line-through'}}>$170</span>
            <span className="mono" style={{fontSize:11, letterSpacing:'0.12em', color:'var(--ink-3)', textTransform:'uppercase'}}>first month</span>
          </div>
          <div className="mono" style={{fontSize:11, letterSpacing:'0.14em', color:'var(--ink-3)', textTransform:'uppercase', marginBottom:24}}>
            Then $170/mo · cancel anytime · session expires in {countdown.label}
          </div>

          {/* Apple Pay / Google Pay buttons */}
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12}}>
            <button onClick={onActivate} style={{
              height:52, background:'#000', color:'#fff', border:'1px solid #000',
              fontFamily:'-apple-system, system-ui, sans-serif', fontSize:16, fontWeight:500,
              cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8,
              transition:'opacity 200ms ease',
            }} onMouseEnter={e=>e.currentTarget.style.opacity='0.85'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
              <span style={{fontSize:18}}></span> Pay
            </button>
            <button onClick={onActivate} style={{
              height:52, background:'#fff', color:'#3c4043', border:'1px solid #dadce0',
              fontFamily:'"Google Sans", system-ui, sans-serif', fontSize:15, fontWeight:500,
              cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8,
              transition:'background 200ms ease',
            }} onMouseEnter={e=>e.currentTarget.style.background='#f8f9fa'} onMouseLeave={e=>e.currentTarget.style.background='#fff'}>
              <span style={{fontWeight:700}}><span style={{color:'#4285F4'}}>G</span><span style={{color:'#EA4335'}}>o</span><span style={{color:'#FBBC04'}}>o</span><span style={{color:'#4285F4'}}>g</span><span style={{color:'#34A853'}}>l</span><span style={{color:'#EA4335'}}>e</span></span> Pay
            </button>
          </div>

          {/* Card fallback */}
          <button className="btn accent" style={{width:'100%', height:54}} onClick={onActivate}>
            Pay with card — $100 <Arrow/>
          </button>

          {/* Shadow upsell — pre-checked */}
          <label style={{
            display:'flex', alignItems:'flex-start', gap:12, marginTop:18,
            padding:'14px 16px', border:'1px solid var(--rule)', background:'var(--bg)',
            cursor:'pointer', textAlign:'left',
          }}>
            <input
              type="checkbox"
              checked={annual}
              onChange={e => setAnnual(e.target.checked)}
              style={{marginTop:3, accentColor:'var(--accent)', width:16, height:16, flexShrink:0}}
            />
            <span style={{fontSize:13.5, color:'var(--ink-2)', lineHeight:1.5}}>
              <strong style={{color:'var(--ink)'}}>Lock in priority indexing.</strong> Upgrade to annual billing after month 1 to save 15% and maintain unbroken AI signal coverage. <span style={{color:'var(--ink-3)'}}>Cancel before month 2 if not satisfied.</span>
            </span>
          </label>

          <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginTop:18, color:'var(--ink-3)', fontSize:13, lineHeight:1.5, maxWidth:'46ch', marginLeft:'auto', marginRight:'auto'}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{flexShrink:0, marginTop:1}} aria-hidden="true">
              <rect x="4" y="11" width="16" height="10" rx="1"/>
              <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
            </svg>
            <span>Secure checkout via Stripe. Cancel your subscription anytime with one click — no email or call required.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----- Activation / checkout (Stripe handoff) -----
// Replace this with your live Stripe Payment Link / Checkout URL.
const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/test_REPLACE_WITH_YOUR_LINK";

function Activation({ data, onPaid, onBack }) {
  const [redirecting, setRedirecting] = useStateF(false);

  const goToStripe = () => {
    setRedirecting(true);
    // In production: window.location.href = STRIPE_CHECKOUT_URL;
    // For prototype: simulate redirect + return-success
    setTimeout(() => onPaid(), 900);
  };

  return (
    <div className="fade-up">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24}}>
        <Eyebrow>Activate setup</Eyebrow>
        <button className="btn ghost" onClick={onBack} style={{height:36, padding:'0 14px', fontSize:13}}>← Back to report</button>
      </div>

      <div style={{textAlign:'center', maxWidth: 720, margin:'0 auto'}}>
        <h3 className="display" style={{fontSize:42, marginBottom:10}}>
          Activate GEO setup for <em>{cleanDomain(data.domain)}</em>
        </h3>
        <div className="body" style={{fontSize:15, color:'var(--ink-2)', maxWidth:'56ch', margin:'0 auto 40px'}}>
          Review your order below. You'll complete payment securely on Stripe — it takes about 30 seconds.
        </div>
      </div>

      {/* Centered order summary */}
      <div className="card" style={{padding:'32px 36px', maxWidth: 560, margin:'0 auto'}}>
        <Eyebrow>Order summary</Eyebrow>
        <div style={{marginTop:18, display:'grid', gap:12}}>
          <SummaryRow label="GEO setup + first month" value="$100.00"/>
          <Hairline/>
          <SummaryRow label="Then $170 / month" value="Recurring" muted/>
          <SummaryRow label="Cancel anytime" value="No commitment" muted/>
        </div>
        <div className="dotted"/>
        <Eyebrow dot={false}>Includes</Eyebrow>
        <ul style={{listStyle:'none', padding:0, margin:'14px 0 0', display:'grid', gap:10, fontSize:14, color:'var(--ink-2)'}}>
          {[
            "Automated GEO setup",
            "AI-search readiness review",
            "First optimization cycle",
            "Entity & brand signal improvements",
            "Structured data recommendations",
            "Monthly visibility update",
            "No sales call or meeting",
          ].map(t => (
            <li key={t} style={{display:'flex', gap:10, alignItems:'baseline'}}>
              <span style={{color:'var(--accent)', fontFamily:'var(--mono)', fontSize:11, marginTop:2}}>✓</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <div style={{marginTop: 24, padding:'14px 16px', background:'var(--bg)', border:'1px solid var(--rule)', display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
          <span className="mono" style={{fontSize:11, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--ink-3)'}}>Due today</span>
          <span className="price-display" style={{fontSize:30}}>$100.00</span>
        </div>
      </div>

      {/* Stripe handoff button */}
      <div style={{maxWidth: 560, margin:'24px auto 0'}}>
        <button className="btn accent" style={{width:'100%', height:60, fontSize:16}} onClick={goToStripe} disabled={redirecting}>
          {redirecting ? 'Redirecting to Stripe…' : 'Continue to secure checkout'} {!redirecting && <Arrow/>}
        </button>
        <div className="mono" style={{fontSize:11, letterSpacing:'0.08em', color:'var(--ink-3)', textAlign:'center', marginTop:14}}>
          Payment securely processed by Stripe · Card · Apple Pay · Google Pay
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, muted }) {
  return (
    <div style={{display:'flex', justifyContent:'space-between', fontSize:14, color: muted ? 'var(--ink-3)' : 'var(--ink)'}}>
      <span>{label}</span>
      <span className="mono" style={{fontSize:13, letterSpacing:'0.04em'}}>{value}</span>
    </div>
  );
}

// ----- Confirmation -----
function Confirmation({ data, onRestart }) {
  return (
    <div className="fade-up" style={{textAlign:'center', padding:'40px 20px'}}>
      <div style={{margin:'0 auto 28px', width:64, height:64, border:'1px solid var(--ink)', display:'flex', alignItems:'center', justifyContent:'center', transform:'rotate(45deg)'}}>
        <span style={{transform:'rotate(-45deg)', fontFamily:'var(--serif)', fontSize:30, color:'var(--accent)'}}>✓</span>
      </div>
      <Eyebrow dot={false}>Activation complete</Eyebrow>
      <h3 className="display" style={{fontSize:48, marginTop:14, marginBottom:14}}>
        GEO setup is <em>underway</em>.
      </h3>
      <div className="lede" style={{fontSize:18, maxWidth:'58ch', margin:'0 auto 28px'}}>
        Everadam is preparing the first optimization cycle for {cleanDomain(data.domain)}. Your full report and a confirmation receipt are on their way to {data.email || 'your inbox'}.
      </div>
      <div className="row row-3" style={{maxWidth:760, margin:'40px auto 0', textAlign:'left'}}>
        {[
          {n:'01', t:'Today', d:'You receive your full GEO Visibility Report and an activation receipt.'},
          {n:'02', t:'This week', d:'First optimization actions are prepared and applied to the prioritized issues.'},
          {n:'03', t:'~30 days', d:'Your first monthly visibility update arrives with progress and next steps.'},
        ].map(s => (
          <div key={s.n} style={{padding:'20px 0', borderTop:'1px solid var(--rule)'}}>
            <div className="mono" style={{fontSize:11, letterSpacing:'0.16em', color:'var(--accent)', textTransform:'uppercase', marginBottom:10}}>{s.n} · {s.t}</div>
            <div className="body" style={{fontSize:14, color:'var(--ink-2)'}}>{s.d}</div>
          </div>
        ))}
      </div>
      <button className="btn ghost" onClick={onRestart} style={{marginTop:36}}>
        Back to home
      </button>
    </div>
  );
}

Object.assign(window, { Survey, Scanning, ReportPreview, Activation, Confirmation });
