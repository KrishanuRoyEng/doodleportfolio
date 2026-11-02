import React, { useState } from 'react';
import { 
  ArrowRight01Icon, 
  CheckmarkCircle01Icon, 
  Copy01Icon, 
  Tick01Icon 
} from 'hugeicons-react';
import type { 
  CommissionConfig, 
  PriceBreakdown, 
  RequestSubmissionData 
} from '../types';
import { formatInr } from '../utils/pricing';

interface RequestFormProps {
  config: CommissionConfig;
  priceBreakdown: PriceBreakdown;
  onNavigateToConfig: () => void;
  onShowNotice: (msg: string) => void;
}

export const RequestForm: React.FC<RequestFormProps> = ({
  config,
  priceBreakdown,
  onNavigateToConfig,
  onShowNotice
}) => {
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneWhatsapp, setPhoneWhatsapp] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [referenceUrl, setReferenceUrl] = useState('');
  const [projectNotes, setProjectNotes] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedData, setSubmittedData] = useState<RequestSubmissionData | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!clientName.trim()) {
      errs.clientName = 'Enter your name.';
    }
    if (!email.trim() || !email.includes('@')) {
      errs.email = 'Enter a valid email address.';
    }
    if (!phoneWhatsapp.trim() || phoneWhatsapp.length < 8) {
      errs.phoneWhatsapp = 'Enter a valid WhatsApp phone number for courier updates.';
    }
    if (!shippingCity.trim()) {
      errs.shippingCity = 'Enter your shipping city and state.';
    }
    if (!referenceUrl.trim() || !referenceUrl.startsWith('http')) {
      errs.referenceUrl = 'Enter a valid photo reference URL starting with http:// or https://.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `#AD-${randomSuffix}`;
    const newSubmission: RequestSubmissionData = {
      clientName: clientName.trim(),
      email: email.trim(),
      phoneWhatsapp: phoneWhatsapp.trim(),
      shippingCity: shippingCity.trim(),
      referenceUrl: referenceUrl.trim(),
      projectNotes: projectNotes.trim(),
      deadlineDate: deadlineDate || undefined,
      config: { ...config },
      priceBreakdown: { ...priceBreakdown },
      referenceId,
      submittedAt: new Date().toISOString()
    };

    setSubmittedData(newSubmission);
    onShowNotice(`Physical art request submitted. Assigned ${referenceId}.`);
  };

  const handleCopySummary = async () => {
    if (!submittedData) return;
    const summaryText = `Akansha and Doodles — Physical Art Commission Request
Reference ID: ${submittedData.referenceId}
Client: ${submittedData.clientName}
Email: ${submittedData.email}
WhatsApp: ${submittedData.phoneWhatsapp}
Shipping Destination: ${submittedData.shippingCity}
Format: ${submittedData.config.format}
Subjects: ${submittedData.config.subjectCount}
Background: ${submittedData.config.backgroundType}
Framing: ${submittedData.config.teakWoodFrame ? 'Teak Wood Glass Frame' : 'Unframed Mount'}
Packaging: ${submittedData.config.giftWrappingNote ? 'Wax-Sealed Calligraphy Gift Wrapping' : 'Standard Rigid Board'}
Courier: ${submittedData.config.expressTrackedCourier ? 'Express Air' : 'Standard Insured'}
Total Quote: ${formatInr(submittedData.priceBreakdown.totalCostInr)} INR
Dispatch Target: ${submittedData.priceBreakdown.estimatedTurnaroundDays} business days
Reference URL: ${submittedData.referenceUrl}
Notes: ${submittedData.projectNotes || 'None'}`;

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopiedSummary(true);
      onShowNotice('Copied request summary to clipboard.');
      setTimeout(() => setCopiedSummary(false), 2400);
    } catch {
      onShowNotice('Failed to copy to clipboard.');
    }
  };

  const handleResetForm = () => {
    setClientName('');
    setEmail('');
    setPhoneWhatsapp('');
    setShippingCity('');
    setReferenceUrl('');
    setProjectNotes('');
    setDeadlineDate('');
    setErrors({});
    setSubmittedData(null);
  };

  return (
    <section id="request" className="request-section">
      <div className="container">
        <div className="section-head">
          <span className="section-label">Order Intake</span>
          <h2 className="section-title">Submit Commission Request</h2>
          <p className="section-desc">
            Provide client details, shipping destination, and photo references. Akansha reviews all incoming physical commission orders within 24 hours.
          </p>
        </div>

        {submittedData ? (
          /* Post-Submission State */
          <div className="confirmation-card">
            <div className="confirmation-header">
              <div className="confirmation-badge font-mono">
                <CheckmarkCircle01Icon size={18} />
                <span>Reference ID {submittedData.referenceId}</span>
              </div>
              <h3 className="confirmation-title">Commission request submitted.</h3>
              <p className="confirmation-lead">
                Your physical original artwork configuration has been logged in Akansha's studio ledger.
              </p>
            </div>

            <div className="action-guidance-box">
              <div className="guidance-step">
                <div className="guidance-step-num font-mono">1</div>
                <div>
                  <div className="guidance-step-title">What happened:</div>
                  <div className="guidance-step-desc">
                    Your request was assigned Reference ID {submittedData.referenceId} with a fixed physical quote of {formatInr(submittedData.priceBreakdown.totalCostInr)} INR.
                  </div>
                </div>
              </div>

              <div className="guidance-step">
                <div className="guidance-step-num font-mono">2</div>
                <div>
                  <div className="guidance-step-title">What you should do next:</div>
                  <div className="guidance-step-desc">
                    Check your email at <strong>{submittedData.email}</strong> and WhatsApp at <strong>{submittedData.phoneWhatsapp}</strong>. Akansha will verify your reference photos and dispatch invoice {submittedData.referenceId} with UPI / Net Banking details within 24 hours.
                  </div>
                </div>
              </div>

              <div className="guidance-step">
                <div className="guidance-step-num font-mono">3</div>
                <div>
                  <div className="guidance-step-title">Hand-drawing &amp; Courier dispatch:</div>
                  <div className="guidance-step-desc">
                    Pencil sketches will be shared on WhatsApp for approval. Once confirmed, ink and gouache are applied, packed in rigid protective backing, and dispatched to {submittedData.shippingCity}.
                  </div>
                </div>
              </div>
            </div>

            <div className="submitted-summary-table">
              <div className="summary-table-head font-mono">Logged Physical Commission Details</div>
              
              <div className="table-row">
                <span className="row-k">Client Name</span>
                <span className="row-v">{submittedData.clientName}</span>
              </div>
              <div className="table-row">
                <span className="row-k">Notification Email</span>
                <span className="row-v font-mono">{submittedData.email}</span>
              </div>
              <div className="table-row">
                <span className="row-k">WhatsApp Contact</span>
                <span className="row-v font-mono">{submittedData.phoneWhatsapp}</span>
              </div>
              <div className="table-row">
                <span className="row-k">Delivery Destination</span>
                <span className="row-v">{submittedData.shippingCity}</span>
              </div>
              <div className="table-row">
                <span className="row-k">Physical Sheet Size</span>
                <span className="row-v">{submittedData.config.format}</span>
              </div>
              <div className="table-row">
                <span className="row-k">Subject Count</span>
                <span className="row-v">{submittedData.config.subjectCount}</span>
              </div>
              <div className="table-row">
                <span className="row-k">Background Medium</span>
                <span className="row-v">{submittedData.config.backgroundType}</span>
              </div>
              <div className="table-row">
                <span className="row-k">Teak Wood Frame</span>
                <span className="row-v">{submittedData.config.teakWoodFrame ? 'Yes (Glass Mounted)' : 'No (Archival Board)'}</span>
              </div>
              <div className="table-row">
                <span className="row-k">Photo Reference Link</span>
                <span className="row-v font-mono reference-url-truncate">
                  <a href={submittedData.referenceUrl} target="_blank" rel="noopener noreferrer">
                    {submittedData.referenceUrl}
                  </a>
                </span>
              </div>
              {submittedData.projectNotes && (
                <div className="table-row">
                  <span className="row-k">Studio Notes</span>
                  <span className="row-v">{submittedData.projectNotes}</span>
                </div>
              )}
              <div className="table-row table-row-total">
                <span className="row-k">Total Physical Commission Quote</span>
                <span className="row-v font-mono total-cost-val">
                  {formatInr(submittedData.priceBreakdown.totalCostInr)} INR ({submittedData.priceBreakdown.estimatedTurnaroundDays} business days to dispatch)
                </span>
              </div>
            </div>

            <div className="confirmation-actions">
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={handleCopySummary}
              >
                {copiedSummary ? <Tick01Icon size={16} /> : <Copy01Icon size={16} />}
                <span>{copiedSummary ? 'Summary copied' : 'Copy request summary'}</span>
              </button>

              <button 
                type="button" 
                className="btn btn-white"
                onClick={handleResetForm}
              >
                <span>Submit another request</span>
              </button>
            </div>
          </div>
        ) : (
          /* Active Intake Form */
          <div className="request-form-container">
            {/* Active Configuration Banner */}
            <div className="active-config-banner">
              <div className="banner-left">
                <span className="banner-badge font-mono">Active Configuration</span>
                <div className="banner-specs">
                  <strong>{config.format}</strong> · {config.subjectCount} {config.subjectCount === 1 ? 'subject' : 'subjects'} · {config.backgroundType} · {config.teakWoodFrame ? 'Framed' : 'Unframed'}
                </div>
              </div>

              <div className="banner-right">
                <div className="banner-price font-mono">{formatInr(priceBreakdown.totalCostInr)} INR</div>
                <button 
                  type="button" 
                  className="btn btn-white btn-sm"
                  onClick={onNavigateToConfig}
                >
                  <span>Edit configuration</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="form-card" noValidate>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="client-name" className="form-label">
                    <span>Client Name</span>
                    <span className="form-label-hint">Required</span>
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    className="form-input"
                    placeholder="Enter your full name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                  {errors.clientName && (
                    <span className="form-error font-mono">{errors.clientName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="client-email" className="form-label">
                    <span>Email Address</span>
                    <span className="form-label-hint">Required for invoice dispatch</span>
                  </label>
                  <input
                    id="client-email"
                    type="email"
                    className="form-input"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <span className="form-error font-mono">{errors.email}</span>
                  )}
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="phone-whatsapp" className="form-label">
                    <span>WhatsApp / Phone Number</span>
                    <span className="form-label-hint">Required for pencil draft previews</span>
                  </label>
                  <input
                    id="phone-whatsapp"
                    type="tel"
                    className="form-input"
                    placeholder="+91 98765 43210"
                    value={phoneWhatsapp}
                    onChange={(e) => setPhoneWhatsapp(e.target.value)}
                  />
                  {errors.phoneWhatsapp && (
                    <span className="form-error font-mono">{errors.phoneWhatsapp}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="shipping-city" className="form-label">
                    <span>Delivery City &amp; State</span>
                    <span className="form-label-hint">Required for courier transit</span>
                  </label>
                  <input
                    id="shipping-city"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Indiranagar, Bengaluru, KA"
                    value={shippingCity}
                    onChange={(e) => setShippingCity(e.target.value)}
                  />
                  {errors.shippingCity && (
                    <span className="form-error font-mono">{errors.shippingCity}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reference-url" className="form-label">
                  <span>Photo Reference URL</span>
                  <span className="form-label-hint">Required (Google Drive, Pinterest, Dropbox, or Instagram link)</span>
                </label>
                <input
                  id="reference-url"
                  type="url"
                  className="form-input"
                  placeholder="https://drive.google.com/..."
                  value={referenceUrl}
                  onChange={(e) => setReferenceUrl(e.target.value)}
                />
                {errors.referenceUrl && (
                  <span className="form-error font-mono">{errors.referenceUrl}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="project-notes" className="form-label">
                  <span>Project &amp; Color Details</span>
                  <span className="form-label-hint">Preferred clothing colors, eye color, hairstyle, or custom text</span>
                </label>
                <textarea
                  id="project-notes"
                  className="form-textarea"
                  placeholder="Specify person/pet details, preferred gouache tint colors, or any calligraphy text to write on the artwork."
                  value={projectNotes}
                  onChange={(e) => setProjectNotes(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="deadline-date" className="form-label">
                  <span>Target Delivery Date</span>
                  <span className="form-label-hint">Optional (Birthday, anniversary, or event gift date)</span>
                </label>
                <input
                  id="deadline-date"
                  type="date"
                  className="form-input"
                  value={deadlineDate}
                  onChange={(e) => setDeadlineDate(e.target.value)}
                />
              </div>

              <div className="form-submit-row">
                <div className="submit-disclaimer">
                  No immediate payment taken. An official invoice with UPI / Net Banking deposit details will be sent to your email and WhatsApp after Akansha reviews your photos.
                </div>
                <button type="submit" className="btn btn-primary btn-lg">
                  <span>Submit commission request</span>
                  <ArrowRight01Icon size={16} />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <style>{`
        .request-section {
          padding: 56px 0 72px;
          background-color: var(--color-canvas);
        }
        .section-head {
          margin-bottom: 28px;
        }
        .active-config-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          background-color: var(--color-secondary-container);
          border: 1px solid var(--color-neutral-border);
          border-radius: var(--radius-md);
          margin-bottom: 20px;
          gap: 16px;
        }
        .banner-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .banner-badge {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--color-primary-accent);
          background-color: var(--color-surface);
          border: 1px solid var(--color-neutral-border);
          padding: 3px 8px;
          border-radius: var(--radius-sm);
        }
        .banner-specs {
          font-size: 13px;
          color: var(--color-primary-ink);
        }
        .banner-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .banner-price {
          font-size: 18px;
          font-weight: 700;
          color: var(--color-primary-ink);
        }
        .form-card {
          background-color: var(--color-surface);
          border: 1px solid var(--color-neutral-border);
          border-radius: var(--radius-lg);
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .form-error {
          font-size: 11px;
          color: #B91C1C;
          margin-top: 2px;
        }
        .form-submit-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding-top: 16px;
          border-top: 1px solid var(--color-neutral-border);
        }
        .submit-disclaimer {
          font-size: 12px;
          color: var(--color-muted-ink);
          max-width: 480px;
          line-height: 1.45;
        }
        .confirmation-card {
          background-color: var(--color-surface);
          border: 1px solid var(--color-neutral-border);
          border-radius: var(--radius-lg);
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .confirmation-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
          color: var(--color-status-open-ink);
          background-color: var(--color-status-open-bg);
          border: 1px solid var(--color-neutral-border);
          padding: 4px 10px;
          border-radius: var(--radius-full);
          margin-bottom: 12px;
        }
        .confirmation-title {
          font-size: 24px;
          font-weight: 700;
          color: var(--color-primary-ink);
          line-height: 1.2;
        }
        .confirmation-lead {
          font-size: 14px;
          color: var(--color-muted-ink);
          margin-top: 4px;
        }
        .action-guidance-box {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          padding: 20px;
          background-color: var(--color-secondary-container);
          border: 1px solid var(--color-neutral-border);
          border-radius: var(--radius-md);
        }
        .guidance-step {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }
        .guidance-step-num {
          width: 24px;
          height: 24px;
          border-radius: var(--radius-full);
          background-color: var(--color-surface);
          border: 1px solid var(--color-neutral-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          color: var(--color-primary-accent);
          flex-shrink: 0;
        }
        .guidance-step-title {
          font-size: 12px;
          font-weight: 700;
          color: var(--color-primary-ink);
        }
        .guidance-step-desc {
          font-size: 12px;
          color: var(--color-muted-ink);
          margin-top: 2px;
          line-height: 1.4;
        }
        .submitted-summary-table {
          border: 1px solid var(--color-neutral-border);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .summary-table-head {
          padding: 10px 16px;
          background-color: var(--color-secondary-container);
          border-bottom: 1px solid var(--color-neutral-border);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--color-primary-ink);
        }
        .table-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 16px;
          font-size: 13px;
          border-bottom: 1px solid var(--color-neutral-border);
          background-color: var(--color-surface);
          gap: 16px;
        }
        .table-row:last-child {
          border-bottom: none;
        }
        .table-row-total {
          background-color: var(--color-secondary-container);
          font-weight: 700;
        }
        .row-k {
          color: var(--color-muted-ink);
        }
        .row-v {
          color: var(--color-primary-ink);
          text-align: right;
        }
        .total-cost-val {
          color: var(--color-primary-accent);
        }
        .reference-url-truncate {
          max-width: 380px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .reference-url-truncate a {
          color: var(--color-primary-accent);
          text-decoration: underline;
        }
        .confirmation-actions {
          display: flex;
          gap: 12px;
        }
        @media (max-width: 800px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          .action-guidance-box {
            grid-template-columns: 1fr;
          }
          .form-submit-row {
            flex-direction: column;
            align-items: stretch;
          }
          .active-config-banner {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
};
