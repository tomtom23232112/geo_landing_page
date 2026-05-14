import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import SiteFooter from './components/Footer';
import Hero, { TWEAK_DEFAULTS } from './components/Hero';
import Survey from './components/Survey';
import Scanning from './components/Scanning';
import ReportPreview from './components/ReportPreview';
import Activation from './components/Activation';
import Confirmation from './components/Confirmation';
import {
  ProblemSection, WhatsCheckedSection, SolutionSection,
  AfterActivationSection, BenefitsSection, TrustSection,
  FAQSection, FinalCTA,
} from './components/Sections';
import {
  TweaksPanel, TweakSection, TweakColor, TweakRadio, TweakToggle, TweakButton, useTweaks,
} from './components/TweaksPanel';

function FunnelStage({ children }) {
  return (
    <section style={{ minHeight: 'calc(100vh - 64px - 130px)', padding: '64px 0 96px' }}>
      <div className="shell" style={{ maxWidth: 920 }}>
        <div className="card-elev" style={{ background: 'var(--card)', padding: '56px 56px 56px', border: '1px solid var(--rule)' }}>
          {children}
        </div>
      </div>
      <style>{`@media (max-width: 700px){ section .card-elev{padding: 28px !important;} }`}</style>
    </section>
  );
}

export default function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = useState('landing');
  const [data, setData] = useState({ domain: '', email: '' });
  const [curtain, setCurtain] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setCurtain(false), 1300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', tweaks.accent);
  }, [tweaks.accent]);

  const startSurvey = (d) => { setData(d); setScreen('survey'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const completeSurvey = (full) => { setData(full); setScreen('scanning'); };
  const onScanDone = () => setScreen('report');
  const activate = () => { setScreen('activation'); window.scrollTo({ top: 0 }); };
  const paid = () => { setScreen('done'); window.scrollTo({ top: 0 }); };
  const restart = () => { setScreen('landing'); setData({ domain: '', email: '' }); };
  const ctaToTop = () => {
    if (screen !== 'landing') setScreen('landing');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
  };

  return (
    <>
      {curtain && <div className="page-curtain"/>}
      <div>
        <Nav onCtaClick={ctaToTop}/>

        {screen === 'landing' && (
          <>
            <Hero tweaks={tweaks} onStart={startSurvey}/>
            <ProblemSection/>
            <WhatsCheckedSection onCta={ctaToTop}/>
            <SolutionSection onCta={ctaToTop}/>
            <AfterActivationSection/>
            <BenefitsSection/>
            <TrustSection/>
            <FAQSection/>
            <FinalCTA onCta={ctaToTop}/>
          </>
        )}

        {['survey', 'scanning', 'report', 'activation', 'done'].includes(screen) && (
          <FunnelStage>
            {screen === 'survey' && (
              <Survey initialDomain={data.domain} initialEmail={data.email} onComplete={completeSurvey} onClose={restart}/>
            )}
            {screen === 'scanning' && <Scanning domain={data.domain} onDone={onScanDone}/>}
            {screen === 'report'   && <ReportPreview data={data} onActivate={activate}/>}
            {screen === 'activation' && <Activation data={data} onPaid={paid} onBack={() => setScreen('report')}/>}
            {screen === 'done'     && <Confirmation data={data} onRestart={restart}/>}
          </FunnelStage>
        )}

        <SiteFooter/>

        <TweaksPanel title="Tweaks">
          <TweakSection title="Brand">
            <TweakColor label="Accent color" value={tweaks.accent} onChange={v => setTweak('accent', v)}/>
          </TweakSection>
          <TweakSection title="Hero">
            <TweakRadio
              label="Headline variant"
              value={tweaks.headlineVariant}
              onChange={v => setTweak('headlineVariant', v)}
              options={[
                { value: 'primary',  label: 'Free Report' },
                { value: 'question', label: 'Can AI?' },
                { value: 'outcome',  label: 'Loses sight' },
              ]}
            />
            <TweakRadio
              label="Density"
              value={tweaks.density}
              onChange={v => setTweak('density', v)}
              options={[{ value: 'airy', label: 'Airy' }, { value: 'compact', label: 'Compact' }]}
            />
            <TweakToggle label="Show live scanner panel" value={tweaks.showScanner} onChange={v => setTweak('showScanner', v)}/>
            <TweakToggle label="Show pricing hint in hero" value={tweaks.showPricingHint} onChange={v => setTweak('showPricingHint', v)}/>
          </TweakSection>
          <TweakSection title="Funnel">
            <TweakButton onClick={() => setScreen('survey')}>Jump to survey</TweakButton>
            <TweakButton onClick={() => {
              setData({ domain: 'northwindrobotics.com', email: 'sam@northwindrobotics.com', company: 'Northwind Robotics', service: 'Warehouse automation', market: 'Mid-market 3PLs', goal: 'Show up better in AI search' });
              setScreen('report');
            }}>Jump to report</TweakButton>
            <TweakButton onClick={() => { setData({ domain: 'northwindrobotics.com', email: 'sam@northwindrobotics.com' }); setScreen('activation'); }}>Jump to activation</TweakButton>
            <TweakButton onClick={() => { setData({ domain: 'northwindrobotics.com', email: 'sam@northwindrobotics.com' }); setScreen('done'); }}>Jump to confirmation</TweakButton>
            <TweakButton onClick={restart}>Reset to landing</TweakButton>
          </TweakSection>
        </TweaksPanel>
      </div>
    </>
  );
}
