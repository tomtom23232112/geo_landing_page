// Reusable atoms for the Everadam GEO landing
const { useState, useEffect, useRef, useMemo, useLayoutEffect } = React;

const Arrow = ({ size = 14 }) => (
  <svg className="arrow" width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
  </svg>
);

const Diamond = ({ size = 10, fill = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" style={{display:'inline-block'}}>
    <path d="M5 0 L10 5 L5 10 L0 5 Z" fill={fill}/>
  </svg>
);

const Eyebrow = ({ children, dot = true }) => (
  <div className="eyebrow">{dot && <span className="dot"/>}{children}</div>
);

const Hairline = ({ style }) => <div className="hairline" style={style}/>;

// Scroll-reveal wrapper using IntersectionObserver
function Reveal({ as: Tag = 'div', stagger = false, className = '', children, style, ...rest }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setSeen(true); return; }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { setSeen(true); io.disconnect(); }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const cls = [
    stagger ? 'reveal-stagger' : 'reveal',
    seen ? 'in' : '',
    className,
  ].filter(Boolean).join(' ');
  return <Tag ref={ref} className={cls} style={style} {...rest}>{children}</Tag>;
}

// Animated headline — splits text into word containers that rise into view
function AnimatedHeadline({ pre, em, post, accent, className = 'display', style }) {
  const splitToWords = (text) => {
    if (!text) return [];
    return String(text).split(/(\s+)/).map((tok, i) =>
      /^\s+$/.test(tok)
        ? <span key={`s${i}`}>{tok}</span>
        : <span key={`w${i}`} className="headline-word"><span>{tok}</span></span>
    );
  };
  return (
    <h1 className={className} style={style}>
      {splitToWords(pre)}
      {pre && <span> </span>}
      <em style={{color: accent}}>
        {splitToWords(em)}
      </em>
      {splitToWords(post)}
    </h1>
  );
}

// Logo strip removed per request — placeholder kept as no-op to preserve exports
const LogoStrip = () => null;

// Site nav
const Nav = ({ onCtaClick }) => (
  <header className="nav">
    <div className="shell nav-inner">
      <div className="logo">
        <img src="assets/logo.png" alt="Everadam" style={{width:28, height:28, objectFit:'contain', display:'block'}}/>
        <span>Everadam</span>
      </div>
      <nav className="nav-links">
        <a href="#what">What's checked</a>
        <a href="#how">How it works</a>
        <a href="#faq">FAQ</a>
        <button className="btn ghost" style={{height:38, padding:'0 16px', fontSize:13}} onClick={onCtaClick}>
          Free GEO Report <Arrow size={12}/>
        </button>
      </nav>
    </div>
  </header>
);

// Footer
const SiteFooter = () => (
  <footer className="footer">
    <div className="shell" style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:24}}>
      <div style={{display:'flex', gap:12, alignItems:'center'}}>
        <img src="assets/logo.png" alt="Everadam" style={{width:18, height:18, objectFit:'contain'}}/>
        <span style={{fontFamily:'var(--serif)', fontSize:15, color:'var(--ink)'}}>Everadam LLC</span>
        <span style={{color:'var(--ink-3)'}}>·</span>
        <span>Wyoming, USA</span>
      </div>
      <div style={{display:'flex', gap:24}}>
        <a href="privacy.html" style={{color:'var(--ink-3)', textDecoration:'none'}}>Privacy</a>
        <a href="terms.html" style={{color:'var(--ink-3)', textDecoration:'none'}}>Terms</a>
        <a href="contact.html" style={{color:'var(--ink-3)', textDecoration:'none'}}>Contact</a>
      </div>
      <div className="mono" style={{fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--ink-3)'}}>
        © 2026 Everadam LLC.
      </div>
    </div>
  </footer>
);

// URL validator + email
const isValidUrl = (s) => /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[^\s]*)?$/i.test((s||'').trim());
const isValidEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((s||'').trim());
const cleanDomain = (s) => {
  if (!s) return '';
  let v = s.trim().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '');
  return v.toLowerCase();
};

Object.assign(window, { Arrow, Diamond, Eyebrow, Hairline, LogoStrip, Nav, SiteFooter, isValidUrl, isValidEmail, cleanDomain, Reveal, AnimatedHeadline });
