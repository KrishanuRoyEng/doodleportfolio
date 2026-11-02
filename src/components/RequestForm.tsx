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
    if (!referenceUrl.trim() || !referenceUrl.startsWith('http')) {
      errs.referenceUrl = 'Enter a valid reference URL starting with http:// or https://.';
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
      referenceUrl: referenceUrl.trim(),
      projectNotes: projectNotes.trim(),
      deadlineDate: deadlineDate || undefined,
      config: { ...config },
      priceBreakdown: { ...priceBreakdown },
      referenceId,
      submittedAt: new Date().toISOString()
    };

    setSubmittedData(newSubmission);
    onShowNotice(`Request submitted. Assigned ${referenceId}.`);
  };

  const handleCopySummary = async () => {
    if (!submittedData) return;
    const summaryText = `Akansha and Doodles Commission Request
Reference ID: ${submittedData.referenceId}
Client: ${submittedData.clientName} (${submittedData.email})
Format: ${submittedData.config.format}
Subjects: ${submittedData.config.subjectCount}
Background: ${submittedData.config.backgroundType}
Usage: ${submittedData.config.usageRights}
Total Quote: $${submittedData.priceBreakdown.totalCost} USD
Turnaround: ${submittedData.priceBreakdown.estimatedTurnaroundDays} business days
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
          <h2 className="section-title">Submit Request</h2>
          <p className="section-desc">
            Provide client details and reference links. Akansha reviews all incoming requests within 24 hours.
          </p>
        </div>

        {submittedData ? (
          /* Post-Submission State: Zero Fluff, state what happened & what to do next */
          <div className="confirmation-card">
            <div className="confirmation-header">
              <div className="confirmation-badge font-mono">
                <CheckmarkCircle01Icon size={18} />
                <span>Reference ID {submittedData.referenceId}</span>
              </div>
              <h3 className="confirmation-title">Request submitted.</h3>
              <p className="confirmation-lead">
                Your commission configuration has been logged in Akansha's project queue.
              </p>
            </div>

            <div className="action-guidance-box">
              <div className="guidance-step">
                <div className="guidance-step-num font-mono">1</div>
                <div>
                  <div className="guidance-step-title">What happened:</div>
                  <div className="guidance-step-desc">
                    Your request was recorded with Reference ID {submittedData.referenceId} for ${submittedData.priceBreakdown.totalCost} USD.
                  </div>
                </div>
              </div>

              <div className="guidance-step">
                <div className="guidance-step-num font-mono">2</div>
                <div>
                  <div className="guidance-step-title">What you should do next:</div>
                  <div className="guidance-step-desc">
                    Check your inbox at <strong>{submittedData.email}</strong>. Akansha will inspect your reference links and send invoice {submittedData.referenceId} with a Stripe deposit link within 24 hours.
                  </div>
                </div>
              </div>

              <div className="guidance-step">
                <div className="guidance-step-num font-mono">3</div>
                <div>
                  <div className="guidance-step-title">Sketch proofing:</div>
                  <div className="guidance-step-desc">
                    Drawing begins upon receipt of the 50% deposit. You will receive initial line art drafts for approval before final flat color application.
                  </div>
                </div>
              </div>
            </div>

            <div className="submitted-summary-table">
              <div className="summary-table-head font-mono">Submitted Configuration Summary</div>
              
              <div className="table-row">
                <span className="row-k">Client Name</span>
                <span className="row-v">{submittedData.clientName}</span>
              </div>
              <div className="table-row">
                <span className="row-k">Notification Email</span>
                <span className="row-v font-mono">{submittedData.email}</span>
              </div>
              <div className="table-row">
                <span className="row-k">Format Tier</span>
                <span className="row-v">{submittedData.config.format}</span>
              </div>
              <div className="table-row">
                <span className="row-k">Subject Count</span>
                <span className="row-v">{submittedData.config.subjectCount}</span>
              </div>
              <div className="table-row">
                <span className="row-k">Background</span>
                <span className="row-v">{submittedData.config.backgroundType}</span>
              </div>
              <div className="table-row">
                <span className="row-k">Usage License</span>
                <span className="row-v">{submittedData.config.usageRights}</span>
              </div>
              <div className="table-row">
                <span className="row-k">Reference Link</span>
                <span className="row-v font-mono reference-url-truncate">
                  <a href={submittedData.referenceUrl} target="_blank" rel="noopener noreferrer">
                    {submittedData.referenceUrl}
                  </a>
                </span>
              </div>
              {submittedData.projectNotes && (
                <div className="table-row">
                  <span className="row-k">Project Notes</span>
                  <span className="row-v">{submittedData.projectNotes}</span>
                </div>
              )}
              <div className="table-row table-row-total">
                <span className="row-k">Total Fixed Quote</span>
                <span className="row-v font-mono total-cost-val">
                  ${submittedData.priceBreakdown.totalCost} USD ({submittedData.priceBreakdown.estimatedTurnaroundDays} business days)
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
                  <strong>{config.format}</strong> · {config.subjectCount} {config.subjectCount === 1 ? 'subject' : 'subjects'} · {config.backgroundType} · {config.usageRights}
                </div>
              </div>

              <div className="banner-right">
                <div className="banner-price font-mono">${priceBreakdown.totalCost} USD</div>
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

              <div className="form-group">
                <label htmlFor="reference-url" className="form-label">
                  <span>Reference Images URL</span>
                  <span className="form-label-hint">Required (Google Drive, Pinterest, Dropbox, or Imgur link)</span>
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
                  <span>Project Notes</span>
                  <span className="form-label-hint">Clothing colors, expressions, pet markings, or special requests</span>
                </label>
                <textarea
                  id="project-notes"
                  className="form-textarea"
                  placeholder="Specify character pose, favorite outfit colors, hairstyle details, or text inscriptions."
                  value={projectNotes}
                  onChange={(e) => setProjectNotes(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="deadline-date" className="form-label">
                  <span>Specific Target Date</span>
                  <span className="form-label-hint">Optional (Birthday, anniversary, or event deadline)</span>
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
                  No immediate payment taken. An official invoice with 50% deposit link will be dispatched to your email after Akansha verifies your references.
                </div>
                <button type="submit" className="btn btn-primary btn-lg">
                  <span>Submit request</span>
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
          background-color: #FAF8FF;
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
