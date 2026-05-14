export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="shell" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <img src="/assets/logo.png" alt="Everadam" style={{ width: 18, height: 18, objectFit: 'contain' }}/>
          <span style={{ fontFamily: 'var(--serif)', fontSize: 15, color: 'var(--ink)' }}>Everadam LLC</span>
          <span style={{ color: 'var(--ink-3)' }}>·</span>
          <span>Wyoming, USA</span>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          <a href="privacy.html" style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Privacy</a>
          <a href="terms.html" style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Terms</a>
          <a href="contact.html" style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Contact</a>
        </div>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
          © 2026 Everadam LLC.
        </div>
      </div>
    </footer>
  );
}
