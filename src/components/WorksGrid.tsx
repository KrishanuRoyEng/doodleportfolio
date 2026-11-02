import React, { useState, useMemo } from 'react';
import { 
  FilterIcon, 
  ViewIcon, 
  Calendar01Icon, 
  Layers01Icon 
} from 'hugeicons-react';
import type { WorkCategory, WorkItem } from '../types';
import { formatInr } from '../utils/pricing';

interface WorksGridProps {
  works: WorkItem[];
  onSelectWork: (work: WorkItem) => void;
}

const CATEGORIES: WorkCategory[] = [
  'All works',
  'Character',
  'Couple',
  'Pet',
  'Sticker sheet'
];

export const WorksGrid: React.FC<WorksGridProps> = ({ works, onSelectWork }) => {
  const [activeCategory, setActiveCategory] = useState<WorkCategory>('All works');

  const filteredWorks = useMemo(() => {
    if (activeCategory === 'All works') return works;
    return works.filter((w) => w.category === activeCategory);
  }, [works, activeCategory]);

  return (
    <section id="works" className="works-section">
      <div className="container">
        <div className="section-header-row">
          <div>
            <span className="section-label">Selected Portfolio</span>
            <h2 className="section-title">Works</h2>
            <p className="section-desc">
              Browse commissioned character doodles, couple keepsakes, pet studies, and illustrated sticker sheets on archival paper.
            </p>
          </div>

          <div className="works-count-badge font-mono">
            {filteredWorks.length} of {works.length} works visible
          </div>
        </div>

        {/* Filter controls */}
        <div className="filter-bar">
          <div className="filter-bar-label">
            <FilterIcon size={14} />
            <span>Filter works:</span>
          </div>

          <div className="filter-buttons-list">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  className={`filter-btn ${isActive ? 'filter-btn-active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={isActive}
                >
                  <span>{cat}</span>
                  {isActive && <span className="active-dot" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Works Gallery Grid */}
        <div className="works-cards-grid">
          {filteredWorks.map((work) => (
            <article 
              key={work.id} 
              className="work-card"
              onClick={() => onSelectWork(work)}
            >
              <div className="work-card-media">
                <img 
                  src={work.imageUrl} 
                  alt={work.title} 
                  className="work-card-img"
                  loading="lazy" 
                />
                <div className="card-badge-overlay">
                  <span className="card-category-pill">{work.category}</span>
                </div>
              </div>

              <div className="work-card-body">
                <div className="work-card-meta-line">
                  <span className="format-tag font-mono">{work.format}</span>
                  <span className="year-tag font-mono">
                    <Calendar01Icon size={12} />
                    {work.completionYear}
                  </span>
                </div>

                <h3 className="work-card-title">{work.title}</h3>
                <p className="work-card-summary">{work.description}</p>

                <div className="work-card-spec-line">
                  <span className="spec-item font-mono">
                    <Layers01Icon size={12} />
                    {work.dimensions}
                  </span>
                  <span className="spec-rate font-mono">From {formatInr(work.baseRateInr)}</span>
                </div>

                <div className="work-card-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary btn-sm btn-full view-action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectWork(work);
                    }}
                  >
                    <ViewIcon size={14} />
                    <span>View specifications</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .works-section {
          padding: 56px 0;
          background-color: var(--color-canvas);
          border-bottom: 1px solid var(--color-neutral-border);
        }
        .section-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
          margin-bottom: 24px;
        }
        .works-count-badge {
          font-size: 12px;
          padding: 6px 12px;
          background-color: var(--color-secondary-container);
          border: 1px solid var(--color-neutral-border);
          border-radius: var(--radius-full);
          color: var(--color-muted-ink);
          white-space: nowrap;
        }
        .filter-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background-color: var(--color-surface);
          border: 1px solid var(--color-neutral-border);
          border-radius: var(--radius-md);
          margin-bottom: 32px;
          flex-wrap: wrap;
        }
        .filter-bar-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
          color: var(--color-muted-ink);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .filter-buttons-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .filter-btn {
          height: 32px;
          padding: 0 14px;
          border-radius: var(--radius-full);
          font-size: 12px;
          font-weight: 600;
          background-color: var(--color-secondary-container);
          color: var(--color-primary-ink);
          border: 1px solid var(--color-neutral-border);
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: background-color 0.12s ease, color 0.12s ease;
        }
        .filter-btn:hover {
          background-color: var(--color-secondary-container-hover);
        }
        .filter-btn-active {
          background-color: var(--color-primary-accent);
          color: #FFFFFF;
          border-color: var(--color-primary-accent);
        }
        .filter-btn-active:hover {
          background-color: var(--color-primary-accent-hover);
        }
        .active-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #FFFFFF;
        }
        .works-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .work-card {
          background-color: var(--color-surface);
          border: 1px solid var(--color-neutral-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: border-color 0.12s ease, background-color 0.12s ease;
        }
        .work-card:hover {
          border-color: var(--color-neutral-border-strong);
        }
        .work-card-media {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          background-color: var(--color-secondary-container);
          border-bottom: 1px solid var(--color-neutral-border);
          overflow: hidden;
        }
        .work-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .card-badge-overlay {
          position: absolute;
          top: 12px;
          left: 12px;
        }
        .card-category-pill {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          color: var(--color-primary-ink);
          background-color: var(--color-surface);
          padding: 4px 8px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-neutral-border);
          line-height: 1;
        }
        .work-card-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 8px;
        }
        .work-card-meta-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          color: var(--color-muted-ink);
        }
        .format-tag {
          font-weight: 600;
          color: var(--color-primary-accent);
        }
        .year-tag {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .work-card-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--color-primary-ink);
          line-height: 1.25;
        }
        .work-card-summary {
          font-size: 13px;
          color: var(--color-muted-ink);
          line-height: 1.45;
          margin-bottom: 4px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .work-card-spec-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 10px;
          background-color: var(--color-secondary-container);
          border: 1px solid var(--color-neutral-border);
          border-radius: var(--radius-sm);
          font-size: 11px;
        }
        .spec-item {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--color-muted-ink);
        }
        .spec-rate {
          font-weight: 700;
          color: var(--color-primary-ink);
        }
        .work-card-footer {
          margin-top: auto;
          padding-top: 8px;
        }
        .view-action-btn {
          gap: 6px;
        }
        @media (max-width: 960px) {
          .works-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .works-cards-grid {
            grid-template-columns: 1fr;
          }
          .section-header-row {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
};
