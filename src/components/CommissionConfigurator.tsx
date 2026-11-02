import { 
  Invoice01Icon, 
  Clock01Icon, 
  CheckmarkCircle01Icon, 
  ArrowRight01Icon 
} from 'hugeicons-react';
import type { 
  CommissionConfig, 
  CommissionFormat, 
  BackgroundType, 
  UsageType, 
  PriceBreakdown 
} from '../types';
import { 
  FORMAT_DETAILS, 
  SUBJECT_UNIT_PRICE, 
  BACKGROUND_PRICES, 
  COMMERCIAL_FEE, 
  EXPRESS_FEE, 
  SOURCE_FILES_FEE, 
  PRINTABLE_SHEET_FEE 
} from '../utils/pricing';

interface CommissionConfiguratorProps {
  config: CommissionConfig;
  onChangeConfig: (updater: (prev: CommissionConfig) => CommissionConfig) => void;
  priceBreakdown: PriceBreakdown;
  onTransferToForm: () => void;
}

export const CommissionConfigurator: React.FC<CommissionConfiguratorProps> = ({
  config,
  onChangeConfig,
  priceBreakdown,
  onTransferToForm
}) => {
  const handleFormatChange = (format: CommissionFormat) => {
    onChangeConfig((prev) => ({ ...prev, format }));
  };

  const handleSubjectChange = (count: number) => {
    onChangeConfig((prev) => ({ ...prev, subjectCount: count }));
  };

  const handleBackgroundChange = (bg: BackgroundType) => {
    onChangeConfig((prev) => ({ ...prev, backgroundType: bg }));
  };

  const handleUsageChange = (usage: UsageType) => {
    onChangeConfig((prev) => ({ ...prev, usageRights: usage }));
  };

  const handleToggleAddon = (field: 'expressDelivery' | 'sourceFiles' | 'printableSheet') => {
    onChangeConfig((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleReset = () => {
    onChangeConfig(() => ({
      format: 'Full Doodle',
      subjectCount: 1,
      backgroundType: 'Flat Color',
      usageRights: 'Personal',
      expressDelivery: false,
      sourceFiles: false,
      printableSheet: false
    }));
  };

  return (
    <section id="commission" className="configurator-section">
      <div className="container">
        <div className="section-head">
          <span className="section-label">Real-Time Pricing Calculator</span>
          <h2 className="section-title">Configure Commission</h2>
          <p className="section-desc">
            Select format, subject count, background detail, and usage license to view an immediate itemized cost and delivery estimate.
          </p>
        </div>

        <div className="configurator-grid">
          {/* Controls Column */}
          <div className="configurator-controls">
            {/* Step 1: Format */}
            <div className="config-block">
              <div className="config-block-header">
                <span className="block-step font-mono">01</span>
                <div>
                  <h3 className="block-title">Format</h3>
                  <div className="block-subtitle">Choose illustration tier and canvas composition.</div>
                </div>
              </div>

              <div className="format-options-grid">
                {(Object.keys(FORMAT_DETAILS) as CommissionFormat[]).map((fmt) => {
                  const isSelected = config.format === fmt;
                  const details = FORMAT_DETAILS[fmt];
                  return (
                    <button
                      key={fmt}
                      type="button"
                      className={`format-card-btn ${isSelected ? 'format-card-selected' : ''}`}
                      onClick={() => handleFormatChange(fmt)}
                    >
                      <div className="format-card-top">
                        <span className="format-name">{fmt}</span>
                        <span className="format-price font-mono">${details.basePrice}</span>
                      </div>
                      <p className="format-desc">{details.description}</p>
                      <div className="format-footer">
                        <span className="format-days font-mono">
                          <Clock01Icon size={12} />
                          {details.baseDays} business days
                        </span>
                        {isSelected && (
                          <span className="selected-indicator">
                            <CheckmarkCircle01Icon size={14} />
                            Selected
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Subject Count */}
            <div className="config-block">
              <div className="config-block-header">
                <span className="block-step font-mono">02</span>
                <div>
                  <h3 className="block-title">Subject Count</h3>
                  <div className="block-subtitle">1 subject included in base tier. Each additional character or pet is +${SUBJECT_UNIT_PRICE}.</div>
                </div>
              </div>

              <div className="subject-stepper-row">
                {[1, 2, 3, 4].map((count) => {
                  const isSelected = config.subjectCount === count;
                  const addCost = (count - 1) * SUBJECT_UNIT_PRICE;
                  return (
                    <button
                      key={count}
                      type="button"
                      className={`stepper-btn ${isSelected ? 'stepper-btn-selected' : ''}`}
                      onClick={() => handleSubjectChange(count)}
                    >
                      <div className="stepper-count font-mono">{count}</div>
                      <div className="stepper-label">{count === 1 ? '1 Subject' : `${count} Subjects`}</div>
                      <div className="stepper-cost font-mono">
                        {addCost === 0 ? 'Included' : `+$${addCost}`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Background Type */}
            <div className="config-block">
              <div className="config-block-header">
                <span className="block-step font-mono">03</span>
                <div>
                  <h3 className="block-title">Background Type</h3>
                  <div className="block-subtitle">Select environment complexity.</div>
                </div>
              </div>

              <div className="segment-grid">
                {(['Flat Color', 'Simple Props', 'Detailed Room'] as BackgroundType[]).map((bg) => {
                  const isSelected = config.backgroundType === bg;
                  const cost = BACKGROUND_PRICES[bg];
                  return (
                    <button
                      key={bg}
                      type="button"
                      className={`segment-card ${isSelected ? 'segment-card-selected' : ''}`}
                      onClick={() => handleBackgroundChange(bg)}
                    >
                      <div className="segment-card-top">
                        <span className="segment-title">{bg}</span>
                        <span className="segment-cost font-mono">
                          {cost === 0 ? '+$0' : `+$${cost}`}
                        </span>
                      </div>
                      <div className="segment-detail">
                        {bg === 'Flat Color' && 'Solid pastel canvas fill matching our signature color palette.'}
                        {bg === 'Simple Props' && 'Floating items, coffee mugs, stars, plants, and minimal ground line.'}
                        {bg === 'Detailed Room' && 'Full indoor room, desk, windows, books, and styled furniture.'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Usage Rights */}
            <div className="config-block">
              <div className="config-block-header">
                <span className="block-step font-mono">04</span>
                <div>
                  <h3 className="block-title">Usage Rights</h3>
                  <div className="block-subtitle">Personal display or commercial monetization rights.</div>
                </div>
              </div>

              <div className="usage-row">
                {(['Personal', 'Commercial'] as UsageType[]).map((usage) => {
                  const isSelected = config.usageRights === usage;
                  return (
                    <button
                      key={usage}
                      type="button"
                      className={`usage-card ${isSelected ? 'usage-card-selected' : ''}`}
                      onClick={() => handleUsageChange(usage)}
                    >
                      <div className="usage-card-top">
                        <span className="usage-title">{usage} License</span>
                        <span className="usage-fee font-mono">
                          {usage === 'Personal' ? 'Standard ($0)' : `+$${COMMERCIAL_FEE}`}
                        </span>
                      </div>
                      <p className="usage-desc">
                        {usage === 'Personal' 
                          ? 'Personal social media avatars, private prints, gifts, and non-commercial personal portfolios.' 
                          : 'Full commercial release: merchandise sales, company logo, book covers, podcasts, or ads.'}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Optional Deliverable Add-ons */}
            <div className="config-block">
              <div className="config-block-header">
                <span className="block-step font-mono">05</span>
                <div>
                  <h3 className="block-title">Optional Add-ons</h3>
                  <div className="block-subtitle">Additional delivery formats and expedited scheduling.</div>
                </div>
              </div>

              <div className="addons-list">
                <label className="form-checkbox-row">
                  <input
                    type="checkbox"
                    checked={config.expressDelivery}
                    onChange={() => handleToggleAddon('expressDelivery')}
                  />
                  <div className="checkbox-info">
                    <div className="checkbox-title-row">
                      <span className="addon-name">Express Turnaround (3 Business Days)</span>
                      <span className="addon-fee font-mono">+${EXPRESS_FEE}</span>
                    </div>
                    <div className="checkbox-desc">
                      Priority queue allocation. Sketch delivered in 24 hours, final inks within 72 hours.
                    </div>
                  </div>
                </label>

                <label className="form-checkbox-row">
                  <input
                    type="checkbox"
                    checked={config.sourceFiles}
                    onChange={() => handleToggleAddon('sourceFiles')}
                  />
                  <div className="checkbox-info">
                    <div className="checkbox-title-row">
                      <span className="addon-name">Layered Source Package (.PSD &amp; Vector SVG)</span>
                      <span className="addon-fee font-mono">+${SOURCE_FILES_FEE}</span>
                    </div>
                    <div className="checkbox-desc">
                      Includes organized layers, vector cut paths, and high-resolution raw master files.
                    </div>
                  </div>
                </label>

                <label className="form-checkbox-row">
                  <input
                    type="checkbox"
                    checked={config.printableSheet}
                    onChange={() => handleToggleAddon('printableSheet')}
                  />
                  <div className="checkbox-info">
                    <div className="checkbox-title-row">
                      <span className="addon-name">Print-Ready 300 DPI CMYK PDF File</span>
                      <span className="addon-fee font-mono">+${PRINTABLE_SHEET_FEE}</span>
                    </div>
                    <div className="checkbox-desc">
                      Calibrated CMYK color space with 3mm bleed margins for professional print shops.
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Sticky Itemized Price Summary Card */}
          <div className="configurator-summary-col">
            <div className="price-summary-card">
              <div className="summary-header">
                <div className="summary-title-group">
                  <Invoice01Icon size={16} />
                  <span className="summary-title">Itemized Quote</span>
                </div>
                <button 
                  type="button" 
                  className="reset-btn font-mono"
                  onClick={handleReset}
                >
                  Reset defaults
                </button>
              </div>

              <div className="breakdown-items-list">
                <div className="breakdown-row">
                  <span className="breakdown-name">
                    {config.format} (Base Tier)
                  </span>
                  <span className="breakdown-val font-mono">${priceBreakdown.basePrice}</span>
                </div>

                <div className="breakdown-row">
                  <span className="breakdown-name">
                    Subjects ({config.subjectCount} {config.subjectCount === 1 ? 'subject' : 'subjects'})
                  </span>
                  <span className="breakdown-val font-mono">
                    {priceBreakdown.extraSubjectsPrice === 0 
                      ? 'Included' 
                      : `+$${priceBreakdown.extraSubjectsPrice}`}
                  </span>
                </div>

                <div className="breakdown-row">
                  <span className="breakdown-name">
                    Background ({config.backgroundType})
                  </span>
                  <span className="breakdown-val font-mono">
                    {priceBreakdown.backgroundPrice === 0 
                      ? '+$0' 
                      : `+$${priceBreakdown.backgroundPrice}`}
                  </span>
                </div>

                <div className="breakdown-row">
                  <span className="breakdown-name">
                    Rights ({config.usageRights})
                  </span>
                  <span className="breakdown-val font-mono">
                    {priceBreakdown.commercialFee === 0 
                      ? '+$0' 
                      : `+$${priceBreakdown.commercialFee}`}
                  </span>
                </div>

                {config.expressDelivery && (
                  <div className="breakdown-row breakdown-addon">
                    <span className="breakdown-name">Express 3-Day Queue</span>
                    <span className="breakdown-val font-mono">+${priceBreakdown.expressFee}</span>
                  </div>
                )}

                {config.sourceFiles && (
                  <div className="breakdown-row breakdown-addon">
                    <span className="breakdown-name">Layered Source Package</span>
                    <span className="breakdown-val font-mono">+${priceBreakdown.sourceFilesFee}</span>
                  </div>
                )}

                {config.printableSheet && (
                  <div className="breakdown-row breakdown-addon">
                    <span className="breakdown-name">300 DPI CMYK Print PDF</span>
                    <span className="breakdown-val font-mono">+${priceBreakdown.printableSheetFee}</span>
                  </div>
                )}
              </div>

              <div className="turnaround-estimate-box">
                <div className="turnaround-icon-cell">
                  <Clock01Icon size={16} />
                </div>
                <div>
                  <div className="turnaround-label">Estimated Delivery Turnaround</div>
                  <div className="turnaround-value font-mono">
                    {priceBreakdown.estimatedTurnaroundDays} business days from deposit
                  </div>
                </div>
              </div>

              <div className="total-calculation-box">
                <div className="total-meta">
                  <span className="total-label">Total Commission Cost</span>
                  <span className="total-tax-note">Fixed price in USD</span>
                </div>
                <div className="total-number font-mono">
                  ${priceBreakdown.totalCost}
                </div>
              </div>

              <div className="summary-actions">
                <button
                  type="button"
                  className="btn btn-primary btn-full btn-lg"
                  onClick={onTransferToForm}
                >
                  <span>Transfer to request form</span>
                  <ArrowRight01Icon size={16} />
                </button>
              </div>

              <div className="summary-guarantee-note">
                <p>
                  Includes 2 sketch revision rounds. 50% deposit required upon invoice approval before drawing commences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .configurator-section {
          padding: 56px 0;
          background-color: var(--color-canvas);
          border-bottom: 1px solid var(--color-neutral-border);
        }
        .section-head {
          margin-bottom: 32px;
        }
        .configurator-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 36px;
          align-items: start;
        }
        .configurator-controls {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .config-block {
          background-color: var(--color-surface);
          border: 1px solid var(--color-neutral-border);
          border-radius: var(--radius-lg);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .config-block-header {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .block-step {
          width: 28px;
          height: 28px;
          background-color: var(--color-secondary-container);
          border: 1px solid var(--color-neutral-border);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          color: var(--color-primary-accent);
          flex-shrink: 0;
        }
        .block-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--color-primary-ink);
          line-height: 1.2;
        }
        .block-subtitle {
          font-size: 12px;
          color: var(--color-muted-ink);
          margin-top: 2px;
        }
        .format-options-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .format-card-btn {
          text-align: left;
          background-color: var(--color-secondary-container);
          border: 1px solid var(--color-neutral-border);
          border-radius: var(--radius-md);
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: background-color 0.12s ease, border-color 0.12s ease;
        }
        .format-card-btn:hover {
          background-color: var(--color-secondary-container-hover);
        }
        .format-card-selected {
          background-color: #FFFFFF;
          border-color: var(--color-neutral-border-strong);
        }
        .format-card-top {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .format-name {
          font-size: 14px;
          font-weight: 700;
          color: var(--color-primary-ink);
        }
        .format-price {
          font-size: 15px;
          font-weight: 700;
          color: var(--color-primary-accent);
        }
        .format-desc {
          font-size: 11px;
          color: var(--color-muted-ink);
          line-height: 1.4;
          min-height: 44px;
        }
        .format-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          color: var(--color-muted-ink);
          margin-top: auto;
          padding-top: 6px;
          border-top: 1px solid var(--color-neutral-border);
        }
        .format-days {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .selected-indicator {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--color-primary-accent);
          font-weight: 600;
        }
        .subject-stepper-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        .stepper-btn {
          background-color: var(--color-secondary-container);
          border: 1px solid var(--color-neutral-border);
          border-radius: var(--radius-md);
          padding: 12px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          transition: background-color 0.12s ease;
        }
        .stepper-btn:hover {
          background-color: var(--color-secondary-container-hover);
        }
        .stepper-btn-selected {
          background-color: #FFFFFF;
          border-color: var(--color-neutral-border-strong);
        }
        .stepper-count {
          font-size: 20px;
          font-weight: 700;
          color: var(--color-primary-ink);
          line-height: 1;
        }
        .stepper-label {
          font-size: 11px;
          font-weight: 600;
          color: var(--color-primary-ink);
        }
        .stepper-cost {
          font-size: 11px;
          color: var(--color-primary-accent);
          font-weight: 600;
        }
        .segment-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .segment-card {
          text-align: left;
          background-color: var(--color-secondary-container);
          border: 1px solid var(--color-neutral-border);
          border-radius: var(--radius-md);
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: background-color 0.12s ease;
        }
        .segment-card:hover {
          background-color: var(--color-secondary-container-hover);
        }
        .segment-card-selected {
          background-color: #FFFFFF;
          border-color: var(--color-neutral-border-strong);
        }
        .segment-card-top {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .segment-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--color-primary-ink);
        }
        .segment-cost {
          font-size: 12px;
          font-weight: 700;
          color: var(--color-primary-accent);
        }
        .segment-detail {
          font-size: 11px;
          color: var(--color-muted-ink);
          line-height: 1.4;
        }
        .usage-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .usage-card {
          text-align: left;
          background-color: var(--color-secondary-container);
          border: 1px solid var(--color-neutral-border);
          border-radius: var(--radius-md);
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: background-color 0.12s ease;
        }
        .usage-card:hover {
          background-color: var(--color-secondary-container-hover);
        }
        .usage-card-selected {
          background-color: #FFFFFF;
          border-color: var(--color-neutral-border-strong);
        }
        .usage-card-top {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .usage-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--color-primary-ink);
        }
        .usage-fee {
          font-size: 12px;
          font-weight: 700;
          color: var(--color-primary-accent);
        }
        .usage-desc {
          font-size: 12px;
          color: var(--color-muted-ink);
          line-height: 1.45;
        }
        .addons-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .checkbox-info {
          flex: 1;
        }
        .checkbox-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .addon-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--color-primary-ink);
        }
        .addon-fee {
          font-size: 12px;
          font-weight: 700;
          color: var(--color-primary-accent);
        }
        .checkbox-desc {
          font-size: 11px;
          color: var(--color-muted-ink);
          margin-top: 2px;
          line-height: 1.35;
        }
        .configurator-summary-col {
          position: sticky;
          top: 84px;
        }
        .price-summary-card {
          background-color: var(--color-surface);
          border: 1px solid var(--color-neutral-border);
          border-radius: var(--radius-lg);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .summary-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--color-neutral-border);
          padding-bottom: 12px;
        }
        .summary-title-group {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 700;
          color: var(--color-primary-ink);
        }
        .reset-btn {
          font-size: 11px;
          color: var(--color-muted-ink);
          text-decoration: underline;
        }
        .reset-btn:hover {
          color: var(--color-primary-ink);
        }
        .breakdown-items-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-bottom: 1px solid var(--color-neutral-border);
          padding-bottom: 16px;
        }
        .breakdown-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }
        .breakdown-name {
          color: var(--color-muted-ink);
        }
        .breakdown-val {
          font-weight: 600;
          color: var(--color-primary-ink);
        }
        .breakdown-addon {
          color: var(--color-primary-accent);
        }
        .turnaround-estimate-box {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: var(--radius-md);
          background-color: var(--color-secondary-container);
          border: 1px solid var(--color-neutral-border);
        }
        .turnaround-icon-cell {
          color: var(--color-primary-accent);
        }
        .turnaround-label {
          font-size: 11px;
          color: var(--color-muted-ink);
        }
        .turnaround-value {
          font-size: 12px;
          font-weight: 700;
          color: var(--color-primary-ink);
          margin-top: 2px;
        }
        .total-calculation-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          background-color: var(--color-secondary-container);
          border: 1px solid var(--color-neutral-border);
          border-radius: var(--radius-md);
        }
        .total-meta {
          display: flex;
          flex-direction: column;
        }
        .total-label {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--color-primary-ink);
        }
        .total-tax-note {
          font-size: 11px;
          color: var(--color-muted-ink);
        }
        .total-number {
          font-size: 28px;
          font-weight: 700;
          color: var(--color-primary-accent);
        }
        .summary-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .summary-guarantee-note {
          font-size: 11px;
          color: var(--color-muted-ink);
          line-height: 1.45;
          text-align: center;
        }
        @media (max-width: 980px) {
          .configurator-grid {
            grid-template-columns: 1fr;
          }
          .configurator-summary-col {
            position: static;
          }
          .format-options-grid,
          .segment-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
