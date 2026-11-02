import React, { useState } from 'react';
import { 
  Copy01Icon, 
  Tick01Icon,
  InstagramIcon,
  ArrowRight01Icon,
  Sun01Icon,
  Moon02Icon
} from 'hugeicons-react';

interface TopBarProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onNavigateTo: (sectionId: string) => void;
  onShowNotice: (msg: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ 
  darkMode,
  onToggleTheme,
  onNavigateTo, 
  onShowNotice 
}) => {
  const [copied, setCopied] = useState(false);
  const artistEmail = 'akansha.doodles@gmail.com';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(artistEmail);
      setCopied(true);
      onShowNotice('Copied akansha.doodles@gmail.com to clipboard');
      setTimeout(() => setCopied(false), 2400);
    } catch {
      onShowNotice('Email: akansha.doodles@gmail.com');
    }
  };

  return (
    <header className="topbar">
      <div className="container topbar-content">
        <div className="brand-group">
          <div className="brand-avatar-box">
            <img 
              src="/artworks/akansha_avatar.jpg" 
              alt="Akansha and Doodles — Physical Artist" 
              className="brand-avatar-img"
            />
          </div>
          <div>
            <div className="brand-title">Akansha and Doodles</div>
            <a 
              href="https://www.instagram.com/akansha.and.doodles" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="brand-handle"
              title="Open Instagram Profile"
            >
              <InstagramIcon size={13} />
              <span>@akansha.and.doodles</span>
            </a>
          </div>
        </div>

        <div className="topbar-center">
          <div className="badge badge-status" title="Current slot capacity">
            <span className="status-dot"></span>
            <span>Commission status: Open — 3 slots remaining</span>
          </div>
        </div>

        <nav className="topbar-nav">
          <button 
            type="button" 
            className="nav-link"
            onClick={() => onNavigateTo('works')}
          >
            Works
          </button>
          <button 
            type="button" 
            className="nav-link"
            onClick={() => onNavigateTo('commission')}
          >
            Commission
          </button>
          <button 
            type="button" 
            className="nav-link"
            onClick={() => onNavigateTo('reviews')}
          >
            Reviews
          </button>
          <button 
            type="button" 
            className="nav-link"
            onClick={() => onNavigateTo('request')}
          >
            Request
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            type="button"
            className="btn-icon"
            onClick={onToggleTheme}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun01Icon size={16} /> : <Moon02Icon size={16} />}
          </button>

          <button 
            type="button" 
            className="btn btn-secondary btn-sm"
            onClick={handleCopyEmail}
            title="Copy contact email"
          >
            {copied ? <Tick01Icon size={14} /> : <Copy01Icon size={14} />}
            <span>{copied ? 'Copied' : 'Copy email'}</span>
          </button>

          <button 
            type="button" 
            className="btn btn-primary btn-sm"
            onClick={() => onNavigateTo('commission')}
          >
            <span>Configure commission</span>
            <ArrowRight01Icon size={14} />
          </button>
        </nav>
      </div>

      <style>{`
        .topbar {
          position: sticky;
          top: 0;
          z-index: 200;
          background-color: var(--color-surface);
          border-bottom: 1px solid var(--color-neutral-border);
        }
        .topbar-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          gap: 16px;
        }
        .brand-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .brand-avatar-box {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-full);
          overflow: hidden;
          background-color: var(--color-secondary-container);
          border: 1px solid var(--color-neutral-border);
          flex-shrink: 0;
        }
        .brand-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .brand-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--color-primary-ink);
          line-height: 1.2;
        }
        .brand-handle {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: var(--color-muted-ink);
          transition: color 0.12s ease;
        }
        .brand-handle:hover {
          color: var(--color-primary-accent);
        }
        .topbar-center {
          display: flex;
          align-items: center;
        }
        .topbar-nav {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nav-link {
          font-size: 13px;
          font-weight: 600;
          color: var(--color-muted-ink);
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          transition: color 0.12s ease, background-color 0.12s ease;
        }
        .nav-link:hover {
          color: var(--color-primary-ink);
          background-color: var(--color-secondary-container);
        }
        @media (max-width: 900px) {
          .topbar-center {
            display: none;
          }
        }
        @media (max-width: 720px) {
          .topbar-nav .nav-link {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};
