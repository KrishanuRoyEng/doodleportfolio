import React from 'react';
import { 
  InstagramIcon, 
  Mail01Icon 
} from 'hugeicons-react';

interface FooterProps {
  onNavigateTo: (sectionId: string) => void;
  onShowNotice: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTo, onShowNotice }) => {
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('akansha.doodles@gmail.com');
      onShowNotice('Copied akansha.doodles@gmail.com to clipboard');
    } catch {
      onShowNotice('Email: akansha.doodles@gmail.com');
    }
  };

  return (
    <footer className="app-footer">
      <div className="container footer-content">
        <div className="footer-brand-col">
          <div className="footer-brand-header">
            <div className="footer-avatar-frame">
              <img 
                src="/artworks/akansha_avatar.jpg" 
                alt="Akansha and Doodles" 
                className="footer-avatar-img"
              />
            </div>
            <div>
              <div className="footer-title">Akansha and Doodles</div>
              <div className="footer-handle font-mono">@akansha.and.doodles</div>
            </div>
          </div>
          <p className="footer-bio">
            Independent traditional doodle artist and illustrator creating hand-painted originals on 300 GSM archival cotton rag paper.
          </p>
          <div className="footer-social-links">
            <a 
              href="https://www.instagram.com/akansha.and.doodles"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <InstagramIcon size={14} />
              <span>Instagram studio</span>
            </a>
            <button
              type="button"
              className="btn btn-white btn-sm"
              onClick={handleCopyEmail}
            >
              <Mail01Icon size={14} />
              <span>Copy email</span>
            </button>
          </div>
        </div>

        <div className="footer-nav-col">
          <div className="footer-nav-title font-mono">Navigation</div>
          <div className="footer-links">
            <button 
              type="button" 
              className="footer-link-btn"
              onClick={() => onNavigateTo('works')}
            >
              Works
            </button>
            <button 
              type="button" 
              className="footer-link-btn"
              onClick={() => onNavigateTo('commission')}
            >
              Commission
            </button>
            <button 
              type="button" 
              className="footer-link-btn"
              onClick={() => onNavigateTo('reviews')}
            >
              Reviews
            </button>
            <button 
              type="button" 
              className="footer-link-btn"
              onClick={() => onNavigateTo('request')}
            >
              Request
            </button>
          </div>
        </div>

        <div className="footer-specs-col">
          <div className="footer-nav-title font-mono">Studio Standards</div>
          <ul className="standards-list">
            <li>100% hand-painted physical originals. Zero digital print reproduction.</li>
            <li>Archival 300 GSM cotton rag paper with waterproof lightfast pigment inks.</li>
            <li>Two pencil draft revision rounds provided prior to inking.</li>
            <li>Insured protective packaging dispatched across India.</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="container footer-bottom-inner">
          <div className="footer-copy font-mono">
            (c) 2026 Akansha and Doodles. All artwork rights reserved.
          </div>
          <div className="footer-palette font-mono">
            Handcrafted with solid pigments · Traditional ink &amp; gouache
          </div>
        </div>
      </div>

      <style>{`
        .app-footer {
          background-color: var(--color-surface);
          border-top: 1px solid var(--color-neutral-border);
          padding-top: 48px;
        }
        .footer-content {
          display: grid;
          grid-template-columns: 2fr 1fr 1.5fr;
          gap: 40px;
          padding-bottom: 40px;
        }
        .footer-brand-col {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .footer-brand-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .footer-avatar-frame {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          overflow: hidden;
          background-color: var(--color-secondary-container);
          border: 1px solid var(--color-neutral-border);
        }
        .footer-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .footer-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--color-primary-ink);
        }
        .footer-handle {
          font-size: 11px;
          color: var(--color-muted-ink);
        }
        .footer-bio {
          font-size: 13px;
          color: var(--color-muted-ink);
          line-height: 1.5;
          max-width: 380px;
        }
        .footer-social-links {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .footer-nav-title {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--color-primary-ink);
          margin-bottom: 12px;
          letter-spacing: 0.05em;
        }
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .footer-link-btn {
          font-size: 13px;
          color: var(--color-muted-ink);
          text-align: left;
          transition: color 0.12s ease;
        }
        .footer-link-btn:hover {
          color: var(--color-primary-accent);
        }
        .standards-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .standards-list li {
          font-size: 12px;
          color: var(--color-muted-ink);
          line-height: 1.45;
          position: relative;
          padding-left: 14px;
        }
        .standards-list li::before {
          content: "—";
          position: absolute;
          left: 0;
          color: var(--color-primary-accent);
        }
        .footer-bottom-bar {
          border-top: 1px solid var(--color-neutral-border);
          padding: 16px 0;
          background-color: var(--color-canvas);
        }
        .footer-bottom-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          font-size: 11px;
          color: var(--color-muted-ink);
        }
        @media (max-width: 820px) {
          .footer-content {
            grid-template-columns: 1fr;
          }
          .footer-bottom-inner {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
};
