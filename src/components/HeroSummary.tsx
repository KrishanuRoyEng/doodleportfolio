import React from 'react';
import { 
  ArrowRight01Icon, 
  GridTableIcon, 
  CheckmarkBadge01Icon,
  Clock01Icon,
  InstagramIcon
} from 'hugeicons-react';

interface HeroSummaryProps {
  onNavigateTo: (sectionId: string) => void;
}

export const HeroSummary: React.FC<HeroSummaryProps> = ({ onNavigateTo }) => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="badge-row">
              <span className="badge">
                <CheckmarkBadge01Icon size={14} />
                <span>Traditional &amp; Physical Doodle Artist</span>
              </span>
              <span className="badge">
                <Clock01Icon size={14} />
                <span>Hand-inked &amp; dispatched in 3–5 business days</span>
              </span>
            </div>

            <h1 className="hero-heading">
              Akansha and Doodles
            </h1>

            <p className="hero-summary-text">
              Handmade physical doodle art, character portraits, couple keepsakes, pet memories, and illustrated sticker sheets. Drawn with pigment fine-liners, artist gouache, and 300 GSM archival cotton paper.
            </p>

            <div className="hero-actions">
              <button 
                type="button" 
                className="btn btn-primary btn-lg"
                onClick={() => onNavigateTo('commission')}
              >
                <span>Configure commission</span>
                <ArrowRight01Icon size={16} />
              </button>

              <button 
                type="button" 
                className="btn btn-secondary btn-lg"
                onClick={() => onNavigateTo('works')}
              >
                <GridTableIcon size={16} />
                <span>Filter works</span>
              </button>

              <a 
                href="https://www.instagram.com/akansha.and.doodles"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-white btn-lg"
              >
                <InstagramIcon size={16} />
                <span>Instagram studio</span>
              </a>
            </div>

            <div className="hero-metrics-strip">
              <div className="metric-cell">
                <div className="metric-val font-mono">140+</div>
                <div className="metric-label">Delivered physical originals</div>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-cell">
                <div className="metric-val font-mono">300 GSM</div>
                <div className="metric-label">100% cotton cold-pressed paper</div>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-cell">
                <div className="metric-val font-mono">3 Slots</div>
                <div className="metric-label">Active queue remaining</div>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-cell">
                <div className="metric-val font-mono">₹999</div>
                <div className="metric-label">Starting postcard tier in INR</div>
              </div>
            </div>
          </div>

          <div className="hero-card-preview">
            <div className="artist-profile-card">
              <div className="profile-card-header">
                <div className="profile-image-frame">
                  <img 
                    src="/artworks/akansha_avatar.jpg" 
                    alt="Akansha Traditional Illustrator" 
                    className="profile-image"
                  />
                </div>
                <div className="profile-info">
                  <div className="profile-name">Akansha</div>
                  <div className="profile-role">Physical Doodle Artist &amp; Painter</div>
                  <div className="profile-status-pill">
                    <span className="status-dot"></span>
                    <span>Accepting physical commissions</span>
                  </div>
                </div>
              </div>

              <div className="palette-strip">
                <div className="palette-label">Curated Pigment Tokens</div>
                <div className="palette-boxes">
                  <div className="palette-box" style={{ backgroundColor: '#FAF8FF' }} title="Soft purple canvas: #FAF8FF">
                    <span>#FAF8FF</span>
                  </div>
                  <div className="palette-box" style={{ backgroundColor: '#F2EEFC' }} title="Secondary container fill: #F2EEFC">
                    <span>#F2EEFC</span>
                  </div>
                  <div className="palette-box" style={{ backgroundColor: '#6E44FF', color: '#FFFFFF' }} title="Primary accent: #6E44FF">
                    <span>#6E44FF</span>
                  </div>
                  <div className="palette-box" style={{ backgroundColor: '#181523', color: '#FFFFFF' }} title="Primary ink: #181523">
                    <span>#181523</span>
                  </div>
                  <div className="palette-box" style={{ backgroundColor: '#E4E2EB' }} title="Neutral hairlines: #E4E2EB">
                    <span>#E4E2EB</span>
                  </div>
                </div>
              </div>

              <div className="featured-spec-box">
                <div className="spec-title font-mono">Physical Medium Guarantee</div>
                <div className="spec-text">
                  Zero digital printing. 100% hand-painted physical originals using waterproof pigment fine-liners and artist gouache on archival cotton paper. Securely packed and shipped across India.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding: 48px 0 40px;
          background-color: var(--color-canvas);
          border-bottom: 1px solid var(--color-neutral-border);
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 40px;
          align-items: start;
        }
        .hero-content {
          display: flex;
          flex-direction: column;
        }
        .badge-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }
        .hero-heading {
          font-size: 38px;
          font-weight: 700;
          color: var(--color-primary-ink);
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin-bottom: 14px;
        }
        .hero-summary-text {
          font-size: 16px;
          line-height: 1.6;
          color: var(--color-muted-ink);
          max-width: 620px;
          margin-bottom: 24px;
        }
        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 32px;
        }
        .hero-metrics-strip {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 16px 20px;
          border-radius: var(--radius-lg);
          background-color: var(--color-secondary-container);
          border: 1px solid var(--color-neutral-border);
        }
        .metric-cell {
          flex: 1;
        }
        .metric-val {
          font-size: 18px;
          font-weight: 700;
          color: var(--color-primary-ink);
          line-height: 1.2;
        }
        .metric-label {
          font-size: 11px;
          color: var(--color-muted-ink);
          margin-top: 2px;
          line-height: 1.2;
        }
        .metric-divider {
          width: 1px;
          height: 32px;
          background-color: var(--color-neutral-border);
        }
        .hero-card-preview {
          position: sticky;
          top: 84px;
        }
        .artist-profile-card {
          background-color: var(--color-surface);
          border: 1px solid var(--color-neutral-border);
          border-radius: var(--radius-lg);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .profile-card-header {
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .profile-image-frame {
          width: 64px;
          height: 64px;
          border-radius: var(--radius-md);
          overflow: hidden;
          background-color: var(--color-secondary-container);
          border: 1px solid var(--color-neutral-border);
          flex-shrink: 0;
        }
        .profile-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .profile-name {
          font-size: 16px;
          font-weight: 700;
          color: var(--color-primary-ink);
          line-height: 1.2;
        }
        .profile-role {
          font-size: 12px;
          color: var(--color-muted-ink);
          margin-top: 2px;
        }
        .profile-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          color: var(--color-status-open-ink);
          background-color: var(--color-status-open-bg);
          padding: 2px 8px;
          border-radius: var(--radius-full);
          margin-top: 6px;
          border: 1px solid var(--color-neutral-border);
        }
        .palette-strip {
          border-top: 1px solid var(--color-neutral-border);
          padding-top: 16px;
        }
        .palette-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-muted-ink);
          margin-bottom: 8px;
        }
        .palette-boxes {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 6px;
        }
        .palette-box {
          height: 38px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-neutral-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 600;
          color: #181523;
        }
        .featured-spec-box {
          padding: 12px 14px;
          background-color: var(--color-secondary-container);
          border: 1px solid var(--color-neutral-border);
          border-radius: var(--radius-md);
        }
        .spec-title {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--color-primary-ink);
          margin-bottom: 4px;
        }
        .spec-text {
          font-size: 12px;
          color: var(--color-muted-ink);
          line-height: 1.45;
        }
        @media (max-width: 980px) {
          .hero-grid {
            grid-template-columns: 1fr;
          }
          .hero-card-preview {
            position: static;
          }
        }
        @media (max-width: 600px) {
          .hero-heading {
            font-size: 28px;
          }
          .hero-metrics-strip {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .metric-divider {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};
