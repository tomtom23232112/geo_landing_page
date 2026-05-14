import { useState, useEffect, useRef } from 'react';

export const Arrow = ({ size = 14 }) => (
  <svg className="arrow" width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
  </svg>
);

export const Diamond = ({ size = 10, fill = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 10 10" style={{ display: 'inline-block' }}>
    <path d="M5 0 L10 5 L5 10 L0 5 Z" fill={fill}/>
  </svg>
);

export const Eyebrow = ({ children, dot = true }) => (
  <div className="eyebrow">{dot && <span className="dot"/>}{children}</div>
);

export const Hairline = ({ style }) => <div className="hairline" style={style}/>;

export function Reveal({ as: Tag = 'div', stagger = false, className = '', children, style, ...rest }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setSeen(true); return; }
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }),
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = [stagger ? 'reveal-stagger' : 'reveal', seen ? 'in' : '', className]
    .filter(Boolean).join(' ');

  return <Tag ref={ref} className={cls} style={style} {...rest}>{children}</Tag>;
}

export function AnimatedHeadline({ pre, em, post, accent, className = 'display', style }) {
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
      <em style={{ color: accent }}>{splitToWords(em)}</em>
      {splitToWords(post)}
    </h1>
  );
}
