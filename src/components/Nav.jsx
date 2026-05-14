import { Arrow } from './ui';

export default function Nav({ onCtaClick }) {
  return (
    <header className="nav">
      <div className="shell nav-inner">
        <div className="logo">
          <img src="/assets/logo.png" alt="Everadam" style={{ width: 28, height: 28, objectFit: 'contain', display: 'block' }}/>
          <span>Everadam</span>
        </div>
        <nav className="nav-links">
          <a href="#what">What's checked</a>
          <a href="#how">How it works</a>
          <a href="#faq">FAQ</a>
          <button
            className="btn ghost"
            style={{ height: 38, padding: '0 16px', fontSize: 13 }}
            onClick={onCtaClick}
          >
            Free GEO Report <Arrow size={12}/>
          </button>
        </nav>
      </div>
    </header>
  );
}
