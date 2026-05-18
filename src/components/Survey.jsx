import { useState } from 'react';
import { Eyebrow, Arrow } from './ui';
import { isValidUrl, isValidEmail } from '../utils';

const GOAL_OPTIONS = [
  'Show up better in AI search',
  'Make our website clearer',
  'Improve structured data signals',
  'Find content gaps',
  'Strengthen brand / entity signals',
  'Understand what AI may see about us',
  'Not sure yet',
];

export default function Survey({ initialDomain, initialEmail, onComplete, onClose }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    domain: initialDomain || '',
    email: initialEmail || '',
    company: '',
    service: '',
    market: '',
    goal: '',
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => setData(d => ({ ...d, [k]: v }));

  const validateStep = () => {
    const e = {};
    if (step === 1) {
      if (!isValidUrl(data.domain)) e.domain = 'Enter a valid website URL';
      if (!isValidEmail(data.email)) e.email = 'Enter a valid work email';
    } else if (step === 2) {
      if (!data.company.trim()) e.company = 'Required';
      if (!data.service.trim()) e.service = 'Required';
      if (!data.market.trim()) e.market = 'Required';
    } else if (step === 3) {
      if (!data.goal) e.goal = 'Pick one';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    if (step < 3) setStep(step + 1);
    else onComplete(data);
  };

  const back = () => {
    if (step > 1) setStep(step - 1);
    else onClose && onClose();
  };

  return (
    <div className="fade-up" key={step}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div className="step-pill">Step {step} of 3 · {['Website', 'Company context', 'Visibility goal'][step - 1]}</div>
        <div className="step-pill" style={{ color: 'var(--ink-2)' }}>{Math.round(step / 3 * 100)}%</div>
      </div>
      <div className="progress-bar" style={{ marginBottom: 36 }}>
        <div className="progress-fill" style={{ width: `${step / 3 * 100}%` }}/>
      </div>

      {step === 1 && (
        <SurveyStep eyebrow="01 — Website" question="What website should Everadam review?" microcopy="Your report is prepared from your website and company context.">
          <div className="row row-2" style={{ gap: 28 }}>
            <FieldInput label="Company website" value={data.domain} placeholder="yourcompany.com" error={errors.domain} onChange={v => set('domain', v)}/>
            <FieldInput label="Work email" value={data.email} placeholder="you@yourcompany.com" error={errors.email} onChange={v => set('email', v)}/>
          </div>
        </SurveyStep>
      )}

      {step === 2 && (
        <SurveyStep eyebrow="02 — Company context" question="What should AI systems understand about your company?" microcopy="Used to interpret your site against your real positioning.">
          <FieldInput label="Company name" value={data.company} error={errors.company} placeholder="e.g., Northwind Robotics" onChange={v => set('company', v)}/>
          <div style={{ height: 24 }}/>
          <FieldInput label="Main service or product" value={data.service} error={errors.service} placeholder="e.g., Warehouse automation for mid-market 3PLs" onChange={v => set('service', v)}/>
          <div style={{ height: 24 }}/>
          <FieldInput label="Target market" value={data.market} error={errors.market} placeholder="e.g., US logistics ops leaders, $20M–$200M revenue" onChange={v => set('market', v)}/>
        </SurveyStep>
      )}

      {step === 3 && (
        <SurveyStep eyebrow="03 — Visibility goal" question="What do you want to improve first?" microcopy="One answer is enough — you can change this later.">
          <div style={{ display: 'grid', gap: 10 }}>
            {GOAL_OPTIONS.map(opt => (
              <div key={opt} className={`radio-card ${data.goal === opt ? 'selected' : ''}`} onClick={() => set('goal', opt)}>
                <span className="radio-dot"/>
                <span style={{ fontSize: 15 }}>{opt}</span>
              </div>
            ))}
          </div>
          {errors.goal && <div className="error-text" style={{ marginTop: 10 }}>{errors.goal}</div>}
        </SurveyStep>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 36 }}>
        <button className="btn ghost" onClick={back} style={{ height: 46 }}>
          {step === 1 ? 'Cancel' : '← Back'}
        </button>
        <button className="btn accent" onClick={next} style={{ height: 54, padding: '0 28px' }}>
          {step < 3 ? 'Continue' : 'Prepare My GEO Report'} <Arrow/>
        </button>
      </div>
    </div>
  );
}

function SurveyStep({ eyebrow, question, microcopy, children }) {
  return (
    <div>
      <Eyebrow dot={false}>{eyebrow}</Eyebrow>
      <h3 className="display" style={{ fontSize: 34, marginTop: 10, marginBottom: 8, fontWeight: 360 }}>{question}</h3>
      {microcopy && <div className="body" style={{ fontSize: 14, color: 'var(--ink-3)', marginBottom: 32, maxWidth: '52ch' }}>{microcopy}</div>}
      {children}
    </div>
  );
}

function FieldInput({ label, value, onChange, placeholder, error }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input className={`input ${error ? 'error' : ''}`} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)}/>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
}
