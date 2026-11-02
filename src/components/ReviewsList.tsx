import React from 'react';
import { 
  CheckmarkBadge01Icon, 
  Calendar01Icon, 
  Clock01Icon,
  ArrowRight01Icon 
} from 'hugeicons-react';
import { clientReviews } from '../data/reviews';

interface ReviewsListProps {
  onNavigateToConfig: () => void;
}

export const ReviewsList: React.FC<ReviewsListProps> = ({ onNavigateToConfig }) => {
  return (
    <section id="reviews" className="reviews-section">
      <div className="container">
        <div className="section-head-row">
          <div>
            <span className="section-label">Client Feedback</span>
            <h2 className="section-title">Reviews</h2>
            <p className="section-desc">
              Direct statements from clients with verified delivered physical originals.
            </p>
          </div>

          <button 
            type="button" 
            className="btn btn-secondary btn-sm"
            onClick={onNavigateToConfig}
          >
            <span>Configure commission</span>
            <ArrowRight01Icon size={14} />
          </button>
        </div>

        <div className="reviews-grid">
          {clientReviews.map((rev) => (
            <div key={rev.id} className="review-card">
              <div className="review-card-header">
                <div className="client-id-group">
                  <div className="client-avatar-placeholder font-mono">
                    {rev.clientName.charAt(0)}
                  </div>
                  <div>
                    <div className="client-name-line">
                      <span className="client-name">{rev.clientName}</span>
                      {rev.verifiedOrder && (
                        <span className="verified-pill" title="Verified commissioned client order">
                          <CheckmarkBadge01Icon size={12} />
                          <span>Verified order</span>
                        </span>
                      )}
                    </div>
                    <div className="client-meta-line font-mono">
                      <span>{rev.clientHandle}</span>
                      <span>·</span>
                      <span>{rev.location}</span>
                    </div>
                  </div>
                </div>

                <div className="review-date-group">
                  <span className="review-date font-mono">
                    <Calendar01Icon size={12} />
                    {rev.date}
                  </span>
                </div>
              </div>

              <div className="review-meta-strip">
                <span className="format-badge">{rev.commissionedFormat}</span>
                <span className="turnaround-pill font-mono">
                  <Clock01Icon size={12} />
                  {rev.turnaroundTime}
                </span>
              </div>

              <blockquote className="review-quote">
                "{rev.quote}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .reviews-section {
          padding: 56px 0;
          background-color: var(--color-canvas);
          border-bottom: 1px solid var(--color-neutral-border);
        }
        .section-head-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
          margin-bottom: 32px;
        }
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .review-card {
          background-color: var(--color-surface);
          border: 1px solid var(--color-neutral-border);
          border-radius: var(--radius-lg);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .review-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }
        .client-id-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .client-avatar-placeholder {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-full);
          background-color: var(--color-secondary-container);
          border: 1px solid var(--color-neutral-border);
          color: var(--color-primary-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          flex-shrink: 0;
        }
        .client-name-line {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .client-name {
          font-size: 14px;
          font-weight: 700;
          color: var(--color-primary-ink);
        }
        .verified-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          font-weight: 600;
          background-color: var(--color-status-open-bg);
          color: var(--color-status-open-ink);
          border: 1px solid var(--color-neutral-border);
          border-radius: var(--radius-full);
          padding: 2px 6px;
        }
        .client-meta-line {
          font-size: 11px;
          color: var(--color-muted-ink);
          display: flex;
          gap: 6px;
          margin-top: 2px;
        }
        .review-date-group {
          text-align: right;
        }
        .review-date {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: var(--color-muted-ink);
        }
        .review-meta-strip {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .format-badge {
          font-size: 11px;
          font-weight: 600;
          color: var(--color-primary-accent);
          background-color: var(--color-secondary-container);
          border: 1px solid var(--color-neutral-border);
          border-radius: var(--radius-sm);
          padding: 3px 8px;
        }
        .turnaround-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: var(--color-muted-ink);
        }
        .review-quote {
          font-size: 13px;
          line-height: 1.55;
          color: var(--color-primary-ink);
          font-style: normal;
        }
        @media (max-width: 820px) {
          .reviews-grid {
            grid-template-columns: 1fr;
          }
          .section-head-row {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
};
