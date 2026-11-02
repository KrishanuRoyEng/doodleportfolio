import React, { useEffect } from 'react';
import { 
  Cancel01Icon, 
  ArrowRight01Icon, 
  Clock01Icon, 
  Calendar01Icon, 
  Layers01Icon, 
  Tag01Icon 
} from 'hugeicons-react';
import type { WorkItem, CommissionFormat } from '../types';
import { formatInr } from '../utils/pricing';

interface WorkDetailModalProps {
  work: WorkItem | null;
  onClose: () => void;
  onSelectFormat: (format: CommissionFormat) => void;
}

export const WorkDetailModal: React.FC<WorkDetailModalProps> = ({ 
  work, 
  onClose, 
  onSelectFormat 
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (work) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [work, onClose]);

  if (!work) return null;

  const handleCommissionClick = () => {
    const formatToSelect: CommissionFormat = 
      work.format === 'Handmade Sticker Sheet' 
        ? 'Original Artwork (A5)' 
        : work.format;
    onSelectFormat(formatToSelect);
    onClose();
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-work-title"
    >
      <div 
        className="modal-dialog work-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-header-meta">
            <span className="badge">{work.category}</span>
            <span className="badge">{work.format}</span>
          </div>
          <button 
            type="button" 
            className="btn btn-secondary btn-sm close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <Cancel01Icon size={16} />
            <span>Close</span>
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-image-col">
            <div className="modal-image-frame">
              <img 
                src={work.imageUrl} 
                alt={work.title} 
                className="modal-artwork-image" 
              />
            </div>
          </div>

          <div className="modal-info-col">
            <h2 id="modal-work-title" className="modal-work-title">{work.title}</h2>
            <p className="modal-work-desc">{work.description}</p>

            <div className="specs-card">
              <div className="specs-card-title font-mono">Original Work Specifications</div>
              
              <div className="spec-row">
                <div className="spec-name">
                  <Layers01Icon size={14} />
                  <span>Physical Sheet Size</span>
                </div>
                <div className="spec-value font-mono">{work.dimensions}</div>
              </div>

              <div className="spec-row">
                <div className="spec-name">
                  <Tag01Icon size={14} />
                  <span>Medium</span>
                </div>
                <div className="spec-value">{work.medium}</div>
              </div>

              <div className="spec-row">
                <div className="spec-name">
                  <Tag01Icon size={14} />
                  <span>Archival Paper</span>
                </div>
                <div className="spec-value">{work.paperType}</div>
              </div>

              <div className="spec-row">
                <div className="spec-name">
                  <Calendar01Icon size={14} />
                  <span>Year Completed</span>
                </div>
                <div className="spec-value font-mono">{work.completionYear}</div>
              </div>

              <div className="spec-row">
                <div className="spec-name">
                  <Clock01Icon size={14} />
                  <span>Dispatch Schedule</span>
                </div>
                <div className="spec-value font-mono">{work.turnaroundDays} business days</div>
              </div>
            </div>

            <div className="swatch-section">
              <div className="swatch-section-title font-mono">Pigment Swatches Used</div>
              <div className="swatch-row">
                {work.colorTokens.map((hex, idx) => (
                  <div key={idx} className="swatch-pill">
                    <span 
                      className="swatch-dot" 
                      style={{ backgroundColor: hex }}
                    />
                    <span className="swatch-hex font-mono">{hex}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-cta-box">
              <div className="cta-price-group">
                <div className="cta-label">Original physical artwork rate</div>
                <div className="cta-price font-mono">{formatInr(work.baseRateInr)} INR</div>
              </div>
              <button 
                type="button" 
                className="btn btn-primary btn-full"
                onClick={handleCommissionClick}
              >
                <span>Configure commission with this format</span>
                <ArrowRight01Icon size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .work-modal-content {
          padding: 24px;
          gap: 20px;
        }
        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--color-neutral-border);
          padding-bottom: 16px;
        }
        .modal-header-meta {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .close-btn {
          gap: 6px;
        }
        .modal-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .modal-image-frame {
          border-radius: var(--radius-md);
          overflow: hidden;
          background-color: var(--color-secondary-container);
          border: 1px solid var(--color-neutral-border);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-artwork-image {
          width: 100%;
          height: auto;
          display: block;
        }
        .modal-info-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .modal-work-title {
          font-size: 22px;
          font-weight: 700;
          color: var(--color-primary-ink);
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
        .modal-work-desc {
          font-size: 14px;
          color: var(--color-muted-ink);
          line-height: 1.5;
        }
        .specs-card {
          background-color: var(--color-secondary-container);
          border: 1px solid var(--color-neutral-border);
          border-radius: var(--radius-md);
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .specs-card-title {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--color-primary-ink);
          letter-spacing: 0.05em;
          border-bottom: 1px solid var(--color-neutral-border);
          padding-bottom: 6px;
        }
        .spec-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
          gap: 12px;
        }
        .spec-name {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--color-muted-ink);
        }
        .spec-value {
          font-weight: 600;
          color: var(--color-primary-ink);
          text-align: right;
        }
        .swatch-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .swatch-section-title {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--color-muted-ink);
        }
        .swatch-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .swatch-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          background-color: var(--color-surface);
          border: 1px solid var(--color-neutral-border);
          border-radius: var(--radius-sm);
        }
        .swatch-dot {
          width: 12px;
          height: 12px;
          border-radius: 2px;
          border: 1px solid var(--color-neutral-border);
        }
        .swatch-hex {
          font-size: 11px;
          color: var(--color-primary-ink);
        }
        .modal-cta-box {
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid var(--color-neutral-border);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .cta-price-group {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .cta-label {
          font-size: 12px;
          color: var(--color-muted-ink);
        }
        .cta-price {
          font-size: 18px;
          font-weight: 700;
          color: var(--color-primary-accent);
        }
        @media (max-width: 720px) {
          .modal-body {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
