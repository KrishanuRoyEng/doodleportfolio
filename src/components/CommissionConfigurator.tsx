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
  SUBJECT_UNIT_PRICE_INR, 
  BACKGROUND_PRICES_INR, 
  COMMERCIAL_FEE_INR, 
  TEAK_FRAME_FEE_INR, 
  GIFT_NOTE_FEE_INR, 
  EXPRESS_COURIER_FEE_INR,
  formatInr 
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

  const handleToggleAddon = (field: 'teakWoodFrame' | 'giftWrappingNote' | 'expressTrackedCourier') => {
    onChangeConfig((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleReset = () => {
    onChangeConfig(() => ({
      format: 'Original Artwork (A5)',
      subjectCount: 1,
      backgroundType: 'Clean Paper Wash',
      usageRights: 'Personal Keepsake',
      teakWoodFrame: false,
      giftWrappingNote: false,
      expressTrackedCourier: false
    }));
  };

  return (
    <section id="commission" className="configurator-section">
      <div className="container">
        <div className="section-head">
          <span className="section-label">Real-Time Commission Calculator</span>
          <h2 className="section-title">Configure Commission</h2>
          <p className="section-desc">
            Select physical paper size, subject count, background detail, and framing options to calculate an immediate itemized cost in INR.
          </p>
        </div>

        <div className="configurator-grid">
          {/* Controls Column */}
          <div className="configurator-controls">
            {/* Step 1: Format / Paper Size */}
            <div className="config-block">
              <div className="config-block-header">
                <span className="block-step font-mono">01</span>
                <div>
                  <h3 className="block-title">Format &amp; Paper Dimension</h3>
                  <div className="block-subtitle">Choose physical original artwork size on 300 GSM cotton paper.</div>
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
                        <span className="format-price font-mono">{formatInr(details.basePriceInr)}</span>
                      </div>
                      <div className="format-spec font-mono">{details.size} · {details.paper}</div>
                      <p className="format-desc">{details.description}</p>
                      <div className="format-footer">
                        <span className="format-days font-mono">
                          <Clock01Icon size={12} />
                          {details.baseDays} days dispatch
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
                  <div className="block-subtitle">1 subject included in base tier. Each additional character or pet is +{formatInr(SUBJECT_UNIT_PRICE_INR)}.</div>
                </div>
              </div>

              <div className="subject-stepper-row">
                {[1, 2, 3, 4].map((count) => {
                  const isSelected = config.subjectCount === count;
                  const addCost = (count - 1) * SUBJECT_UNIT_PRICE_INR;
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
                        {addCost === 0 ? 'Included' : `+${formatInr(addCost)}`}
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
                  <h3 className="block-title">Background Medium</h3>
                  <div className="block-subtitle">Traditional watercolor or gouache background depth.</div>
                </div>
              </div>

              <div className="segment-grid">
                {(['Clean Paper Wash', 'Floral & Hand Botanicals', 'Detailed Gouache Room'] as BackgroundType[]).map((bg) => {
                  const isSelected = config.backgroundType === bg;
                  const cost = BACKGROUND_PRICES_INR[bg];
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
                          {cost === 0 ? '+₹0' : `+${formatInr(cost)}`}
                        </span>
                      </div>
                      <div className="segment-detail">
                        {bg === 'Clean Paper Wash' && 'Soft watercolor wash tinting the heavy archival cotton paper.'}
                        {bg === 'Floral & Hand Botanicals' && 'Hand-drawn leafy vines, blossoms, stars, and ink accents.'}
                        {bg === 'Detailed Gouache Room' && 'Opaque gouache indoor room, bookshelves, furniture, and window scene.'}
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
                  <h3 className="block-title">Usage &amp; Display License</h3>
                  <div className="block-subtitle">Personal heirloom display or commercial reproduction rights.</div>
                </div>
              </div>

              <div className="usage-row">
                {(['Personal Keepsake', 'Commercial & Publishing'] as UsageType[]).map((usage) => {
                  const isSelected = config.usageRights === usage;
                  return (
                    <button
                      key={usage}
                      type="button"
                      className={`usage-card ${isSelected ? 'usage-card-selected' : ''}`}
                      onClick={() => handleUsageChange(usage)}
                    >
                      <div className="usage-card-top">
                        <span className="usage-title">{usage}</span>
                        <span className="usage-fee font-mono">
                          {usage === 'Personal Keepsake' ? 'Standard (₹0)' : `+${formatInr(COMMERCIAL_FEE_INR)}`}
                        </span>
                      </div>
                      <p className="usage-desc">
                        {usage === 'Personal Keepsake' 
                          ? 'Physical home display, personal wall framing, private gift, or social profile photograph.' 
                          : 'Full reproduction rights: book illustrations, product packaging, cafe branding, or merchandise distribution.'}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Physical Deliverable Add-ons */}
            <div className="config-block">
              <div className="config-block-header">
                <span className="block-step font-mono">05</span>
                <div>
                  <h3 className="block-title">Physical Framing &amp; Delivery Add-ons</h3>
                  <div className="block-subtitle">Handcrafted timber framing, wax seal gifting, and insured courier.</div>
                </div>
              </div>

              <div className="addons-list">
                <label className="form-checkbox-row">
                  <input
                    type="checkbox"
                    checked={config.teakWoodFrame}
                    onChange={() => handleToggleAddon('teakWoodFrame')}
                  />
                  <div className="checkbox-info">
                    <div className="checkbox-title-row">
                      <span className="addon-name">Solid Teak Wood Frame &amp; Glass Mounting</span>
                      <span className="addon-fee font-mono">+{formatInr(TEAK_FRAME_FEE_INR)}</span>
                    </div>
                    <div className="checkbox-desc">
                      Custom handmade natural teak frame with acid-free mount board and protective glass, ready to hang.
                    </div>
                  </div>
                </label>

                <label className="form-checkbox-row">
                  <input
                    type="checkbox"
                    checked={config.giftWrappingNote}
                    onChange={() => handleToggleAddon('giftWrappingNote')}
                  />
                  <div className="checkbox-info">
                    <div className="checkbox-title-row">
                      <span className="addon-name">Handwritten Calligraphy Note &amp; Wax-Sealed Wrapping</span>
                      <span className="addon-fee font-mono">+{formatInr(GIFT_NOTE_FEE_INR)}</span>
                    </div>
                    <div className="checkbox-desc">
                      Packaged in kraft paper tied with jute twine, dried botanical flora, and an authentic wax seal stamp.
                    </div>
                  </div>
                </label>

                <label className="form-checkbox-row">
                  <input
                    type="checkbox"
                    checked={config.expressTrackedCourier}
                    onChange={() => handleToggleAddon('expressTrackedCourier')}
                  />
                  <div className="checkbox-info">
                    <div className="checkbox-title-row">
                      <span className="addon-name">Express Tracked Courier (BlueDart / DTDC Air)</span>
                      <span className="addon-fee font-mono">+{formatInr(EXPRESS_COURIER_FEE_INR)}</span>
                    </div>
                    <div className="checkbox-desc">
                      Priority dispatch with rigid corner-board protection, heavy bubble wrap, and insured tracking.
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
                    {config.format}
                  </span>
                  <span className="breakdown-val font-mono">{formatInr(priceBreakdown.basePriceInr)}</span>
                </div>

                <div className="breakdown-row">
                  <span className="breakdown-name">
                    Subjects ({config.subjectCount} {config.subjectCount === 1 ? 'subject' : 'subjects'})
                  </span>
                  <span className="breakdown-val font-mono">
                    {priceBreakdown.extraSubjectsPriceInr === 0 
                      ? 'Included' 
                      : `+${formatInr(priceBreakdown.extraSubjectsPriceInr)}`}
                  </span>
                </div>

                <div className="breakdown-row">
                  <span className="breakdown-name">
                    Background ({config.backgroundType})
                  </span>
                  <span className="breakdown-val font-mono">
                    {priceBreakdown.backgroundPriceInr === 0 
                      ? '+₹0' 
                      : `+${formatInr(priceBreakdown.backgroundPriceInr)}`}
                  </span>
                </div>

                <div className="breakdown-row">
                  <span className="breakdown-name">
                    Usage License
                  </span>
                  <span className="breakdown-val font-mono">
                    {priceBreakdown.commercialFeeInr === 0 
                      ? '+₹0' 
                      : `+${formatInr(priceBreakdown.commercialFeeInr)}`}
                  </span>
                </div>

                {config.teakWoodFrame && (
                  <div className="breakdown-row breakdown-addon">
                    <span className="breakdown-name">Teak Wood Glass Frame</span>
                    <span className="breakdown-val font-mono">+{formatInr(priceBreakdown.teakWoodFrameFeeInr)}</span>
                  </div>
                )}

                {config.giftWrappingNote && (
                  <div className="breakdown-row breakdown-addon">
                    <span className="breakdown-name">Calligraphy &amp; Wax Seal</span>
                    <span className="breakdown-val font-mono">+{formatInr(priceBreakdown.giftWrappingFeeInr)}</span>
                  </div>
                )}

                {config.expressTrackedCourier && (
                  <div className="breakdown-row breakdown-addon">
                    <span className="breakdown-name">Express Air Courier</span>
                    <span className="breakdown-val font-mono">+{formatInr(priceBreakdown.expressCourierFeeInr)}</span>
                  </div>
                )}
              </div>

              <div className="turnaround-estimate-box">
                <div className="turnaround-icon-cell">
                  <Clock01Icon size={16} />
                </div>
                <div>
                  <div className="turnaround-label">Estimated Dispatch Schedule</div>
                  <div className="turnaround-value font-mono">
                    {priceBreakdown.estimatedTurnaroundDays} business days to courier dispatch
                  </div>
                </div>
              </div>

              <div className="total-calculation-box">
                <div className="total-meta">
                  <span className="total-label">Total Commission Cost</span>
                  <span className="total-tax-note">Fixed price in INR (₹)</span>
                </div>
                <div className="total-number font-mono">
                  {formatInr(priceBreakdown.totalCostInr)}
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
                  Includes 2 pencil sketch review rounds prior to inking. 50% deposit required upon sketch approval. Shipped with protective wooden backing across India.
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
          gap: 6px;
          transition: background-color 0.12s ease, border-color 0.12s ease;
        }
        .format-card-btn:hover {
          background-color: var(--color-secondary-container-hover);
        }
        .format-card-selected {
          background-color: var(--color-surface);
          border-color: var(--color-neutral-border-strong);
        }
        .format-card-top {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .format-name {
          font-size: 13px;
          font-weight: 700;
          color: var(--color-primary-ink);
        }
        .format-price {
          font-size: 15px;
          font-weight: 700;
          color: var(--color-primary-accent);
        }
        .format-spec {
          font-size: 10px;
          color: var(--color-primary-accent);
          font-weight: 600;
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
          background-color: var(--color-surface);
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
          background-color: var(--color-surface);
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
          background-color: var(--color-surface);
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
