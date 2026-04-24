// Landing — polished marketing-grade page served at #/. Three CTAs sit above
// the fold; committee stories, problem stats, and the transfer loop diagram
// live below.

import React from 'react';
import { C } from '../components.jsx';
import { useWindowWidth } from '../shared/hooks.js';
import { navigate } from '../shared/routing.js';

const globalStyles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0c1424; -webkit-text-size-adjust: 100%; }
  button, [role="button"], a { touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
  input,textarea,button { font-family: inherit; }
  @keyframes bp { 0%,100%{opacity:.9}50%{opacity:.5} }
  @keyframes flowPulse { 0%{opacity:.15} 50%{opacity:.55} 100%{opacity:.15} }
  @keyframes cardLift { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  .tl-card-lift { animation: cardLift .5s ease both; }
  .tl-cta-card:hover { transform: translateY(-3px); border-color: rgba(27,154,170,.55) !important; box-shadow: 0 14px 40px rgba(15,29,47,.45) !important; }
  .tl-cta-card { transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease; }
  .tl-primary-cta:hover { box-shadow: 0 10px 32px rgba(27,154,170,.5) !important; transform: translateY(-1px); }
  .tl-link:hover { color: #fff !important; }
  ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,.1); border-radius: 2px; }
`;

function Hero({ m, xs }) {
  const headlineSize = xs ? 34 : (m ? 42 : 68);
  return (
    <div style={{ textAlign: 'center', padding: m ? '60px 16px 28px' : '88px 32px 44px', position: 'relative' }}>
      <div style={{ fontSize: m ? 10 : 11, fontWeight: 700, letterSpacing: xs ? 2.4 : 3.5, color: C.accent, textTransform: 'uppercase', marginBottom: 18 }}>
        DNP Research · WA State · 2026
      </div>
      <div style={{ fontFamily: "'Manrope','Inter',sans-serif", fontSize: headlineSize, fontWeight: 900, color: '#fff', letterSpacing: xs ? -1.2 : -2, lineHeight: .98 }}>
        One QR code.<br />
        <span style={{ color: C.accent }}>Every handoff.</span>
      </div>
      <div style={{ fontSize: m ? 14 : 17, color: 'rgba(255,255,255,.58)', marginTop: m ? 18 : 24, maxWidth: 580, margin: `${m ? 18 : 24}px auto 0`, lineHeight: 1.55 }}>
        TransferLink carries one verified record from the long-term care facility to EMS to the emergency department — and closes the loop when the patient comes home.
      </div>
    </div>
  );
}

function PrimaryCTAs({ m }) {
  const ctas = [
    {
      kicker: 'Explore',
      title: 'The Prototype',
      desc: 'Open the full interactive build. Four roles, twenty screens, no login. Sandbox mode — your changes stay local.',
      action: () => navigate('app', []),
      cta: 'Open prototype →',
      primary: true,
    },
    {
      kicker: 'Watch',
      title: 'The 3-minute Tour',
      desc: 'Guided walkthrough of one patient across LTC, EMS, ED, and return. Narrated in plain English, step by step.',
      action: () => navigate('tour', []),
      cta: 'Start tour →',
    },
    {
      kicker: 'Read',
      title: 'The Research',
      desc: 'Survey findings, committee priorities, and design rationale. Jump to the committee-priority section below.',
      action: () => document.getElementById('tl-research')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      cta: 'Read below ↓',
    },
  ];
  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: m ? '0 14px 40px' : '0 32px 64px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr 1fr', gap: m ? 12 : 18 }}>
        {ctas.map((c, i) => (
          <div
            key={i}
            onClick={c.action}
            className="tl-cta-card tl-card-lift"
            role="button"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); c.action(); } }}
            style={{
              background: c.primary
                ? `linear-gradient(160deg,rgba(27,154,170,.18),rgba(27,154,170,.04))`
                : 'rgba(255,255,255,.04)',
              border: `1.5px solid ${c.primary ? 'rgba(27,154,170,.4)' : 'rgba(255,255,255,.1)'}`,
              borderRadius: 18,
              padding: m ? '22px 20px 22px' : '28px 26px 26px',
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              minHeight: m ? 180 : 240,
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.4, color: c.primary ? C.accent : 'rgba(255,255,255,.45)', textTransform: 'uppercase', marginBottom: 10 }}>
              {c.kicker}
            </div>
            <div style={{ fontFamily: "'Manrope','Inter',sans-serif", fontSize: m ? 22 : 26, fontWeight: 800, color: '#fff', letterSpacing: -.4, lineHeight: 1.15, marginBottom: 10 }}>
              {c.title}
            </div>
            <div style={{ fontSize: m ? 13 : 14, color: 'rgba(255,255,255,.62)', lineHeight: 1.55, flex: 1 }}>
              {c.desc}
            </div>
            <div className={c.primary ? 'tl-primary-cta' : ''} style={{
              marginTop: 22,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: m ? '11px 16px' : '12px 20px',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 700,
              color: c.primary ? '#fff' : 'rgba(255,255,255,.88)',
              background: c.primary ? `linear-gradient(135deg,${C.accent},${C.accentD})` : 'rgba(255,255,255,.06)',
              border: c.primary ? 'none' : '1px solid rgba(255,255,255,.1)',
              transition: 'all .2s',
              alignSelf: 'stretch',
              textAlign: 'center',
            }}>
              {c.cta}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProblemSection({ m }) {
  const stats = [
    { n: '88%', label: 'Want completion in 3–5 minutes',   sub: 'Time was the top barrier — 38% of survey respondents' },
    { n: '9–50+', label: 'Active medications per resident', sub: 'Transcription under pressure is the largest error source' },
    { n: '0%',  label: 'Return loops tracked today',        sub: 'The patient often arrives before the paperwork does' },
  ];
  return (
    <div style={{ background: 'rgba(255,255,255,.02)', borderTop: '1px solid rgba(255,255,255,.06)', borderBottom: '1px solid rgba(255,255,255,.06)', padding: m ? '40px 18px' : '72px 32px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: m ? 28 : 44 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.4, color: C.amber, textTransform: 'uppercase', marginBottom: 10 }}>The gap today</div>
          <div style={{ fontFamily: "'Manrope','Inter',sans-serif", fontSize: m ? 28 : 38, fontWeight: 800, color: '#fff', letterSpacing: -1, lineHeight: 1.1, maxWidth: 720, margin: '0 auto' }}>
            Paper, phone tag, and a medication list that gets retyped at 2 AM.
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr 1fr', gap: m ? 12 : 18 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 16, padding: m ? '22px 20px' : '28px 24px' }}>
              <div style={{ fontFamily: "'Manrope','Inter',sans-serif", fontSize: m ? 42 : 54, fontWeight: 900, color: C.accent, lineHeight: 1, letterSpacing: -2 }}>{s.n}</div>
              <div style={{ fontSize: m ? 13 : 14, fontWeight: 700, color: 'rgba(255,255,255,.85)', marginTop: 14, lineHeight: 1.4 }}>{s.label}</div>
              <div style={{ fontSize: m ? 12 : 13, color: 'rgba(255,255,255,.45)', marginTop: 8, lineHeight: 1.55 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FlowStep({ ic, t, d, tag, c, isLast, m }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, position: 'relative' }}>
      <div style={{ width: m ? 56 : 68, height: m ? 56 : 68, borderRadius: '50%', background: `${c}1a`, border: `2px solid ${c}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, position: 'relative', zIndex: 1 }}>
        <span style={{ fontSize: m ? 26 : 30 }}>{ic}</span>
      </div>
      <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 1.8, color: c, textTransform: 'uppercase', marginBottom: 6 }}>{tag}</div>
      <div style={{ fontSize: m ? 14 : 15, fontWeight: 800, color: '#fff', textAlign: 'center', marginBottom: 4 }}>{t}</div>
      <div style={{ fontSize: m ? 11 : 12, color: 'rgba(255,255,255,.5)', textAlign: 'center', lineHeight: 1.5, maxWidth: 180 }}>{d}</div>
      {!isLast && !m && (
        <div style={{ position: 'absolute', top: 34, left: 'calc(50% + 40px)', right: 'calc(-50% + 40px)', height: 2, background: `linear-gradient(90deg,${c}60,rgba(255,255,255,.1))`, zIndex: 0 }} />
      )}
    </div>
  );
}

function HowItWorks({ m }) {
  const steps = [
    { ic: '📋', t: 'LTC initiates', d: 'Five essential fields. Imported meds. Under five minutes.', tag: 'Step 1', c: C.accent },
    { ic: '🚑', t: 'EMS scans', d: 'Read-only record on any device. No login, no app install.', tag: 'Step 2', c: C.amber },
    { ic: '🏥', t: 'ED receives', d: 'Code, POLST, allergies, language — above the fold.', tag: 'Step 3', c: C.green },
    { ic: '↩️', t: 'Loop closes', d: 'Return submitted → notified → acknowledged → closed.', tag: 'Step 4', c: C.purple },
  ];
  return (
    <div style={{ padding: m ? '44px 18px' : '80px 32px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: m ? 32 : 56 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.4, color: C.accent, textTransform: 'uppercase', marginBottom: 10 }}>How it works</div>
          <div style={{ fontFamily: "'Manrope','Inter',sans-serif", fontSize: m ? 28 : 38, fontWeight: 800, color: '#fff', letterSpacing: -1, lineHeight: 1.1 }}>
            One record. Four handoffs. Every state tracked.
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: m ? 'column' : 'row', gap: m ? 22 : 0, alignItems: m ? 'center' : 'flex-start' }}>
          {steps.map((s, i) => (
            <FlowStep key={i} {...s} isLast={i === steps.length - 1} m={m} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CommitteeStories({ m }) {
  const stories = [
    {
      tag: 'Committee Priority · Medication Accuracy',
      color: C.accent,
      lead: 'Brenda flagged medication transcription as the largest error source.',
      body: 'Facilities have 9 to 50+ active medications per resident. Under pressure at 2 AM, lists get retyped. Dosages get dropped. In this build, the medication list imports from PDF, photo, or PointClickCare. Every record shows a verified source and timestamp.',
      resolution: 'No retyping under pressure. Source travels with the patient.',
    },
    {
      tag: 'Committee Priority · Closed-Loop Return',
      color: C.green,
      lead: 'Donald pushed back on the return being a "nice-to-have screen."',
      body: 'The ED return now moves through four tracked states — submitted, notified, acknowledged, closed — with an acknowledgement action at the facility and a push-notification banner until the nurse taps ack. No phone tag. No orphaned discharge paperwork.',
      resolution: 'Return documentation is automatic, not passive.',
    },
  ];
  return (
    <div id="tl-research" style={{ background: 'rgba(255,255,255,.02)', borderTop: '1px solid rgba(255,255,255,.06)', padding: m ? '44px 18px' : '80px 32px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: m ? 28 : 48 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2.4, color: C.purple, textTransform: 'uppercase', marginBottom: 10 }}>Why we built it this way</div>
          <div style={{ fontFamily: "'Manrope','Inter',sans-serif", fontSize: m ? 28 : 38, fontWeight: 800, color: '#fff', letterSpacing: -1, lineHeight: 1.1, maxWidth: 720, margin: '0 auto' }}>
            Two stories from the WA State LTC Transformation Workgroup.
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? 14 : 20 }}>
          {stories.map((s, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,.05)', border: `1px solid ${s.color}30`, borderLeft: `4px solid ${s.color}`, borderRadius: 14, padding: m ? '20px 18px' : '28px 26px' }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: s.color, textTransform: 'uppercase', letterSpacing: 1.4, marginBottom: 12 }}>{s.tag}</div>
              <div style={{ fontSize: m ? 16 : 18, fontWeight: 700, color: '#fff', lineHeight: 1.35, marginBottom: 14, letterSpacing: -.2 }}>{s.lead}</div>
              <div style={{ fontSize: m ? 13 : 14, color: 'rgba(255,255,255,.6)', lineHeight: 1.65, marginBottom: 16 }}>{s.body}</div>
              <div style={{ fontSize: m ? 13 : 14, color: 'rgba(255,255,255,.92)', fontWeight: 700, lineHeight: 1.45, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,.08)' }}>→ {s.resolution}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,.3)', textAlign: 'center', marginTop: 24, lineHeight: 1.6 }}>
          Composite accounts based on clinician survey responses. No individual patient is identified.
        </div>
      </div>
    </div>
  );
}

function ClosingCTA({ m }) {
  return (
    <div style={{ padding: m ? '48px 18px' : '80px 32px', textAlign: 'center' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ fontFamily: "'Manrope','Inter',sans-serif", fontSize: m ? 26 : 34, fontWeight: 800, color: '#fff', letterSpacing: -.8, lineHeight: 1.15, marginBottom: 18 }}>
          Ready to try it?
        </div>
        <div style={{ fontSize: m ? 14 : 16, color: 'rgba(255,255,255,.58)', marginBottom: 28, lineHeight: 1.6 }}>
          The prototype takes about three minutes to tour end-to-end. No login, no data collection, nothing installed.
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('tour', [])}
            className="tl-primary-cta"
            style={{ padding: m ? '13px 22px' : '14px 30px', borderRadius: 12, background: `linear-gradient(135deg,${C.accent},${C.accentD})`, color: '#fff', border: 'none', fontSize: m ? 14 : 15, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 20px rgba(27,154,170,.35)', fontFamily: 'inherit', letterSpacing: .2 }}
          >
            ▶ Start the 3-minute tour
          </button>
          <button
            onClick={() => navigate('app', [])}
            style={{ padding: m ? '13px 22px' : '14px 30px', borderRadius: 12, background: 'transparent', color: 'rgba(255,255,255,.88)', border: '1.5px solid rgba(255,255,255,.2)', fontSize: m ? 14 : 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: .2 }}
          >
            Open prototype
          </button>
        </div>
      </div>
    </div>
  );
}

function Footer({ m }) {
  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', padding: m ? '28px 18px 40px' : '36px 32px 56px', textAlign: 'center' }}>
      <div style={{ fontSize: m ? 11 : 12, color: 'rgba(255,255,255,.35)', lineHeight: 1.9 }}>
        Research: Lily Schroeder, DNP Candidate · ER Nurse, 12+ years<br />
        WA State LTC Transformation Workgroup · 360 Social Impact Studios
      </div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,.2)', marginTop: 10 }}>
        Prototype demonstration · No real patient data · 2026
      </div>
    </div>
  );
}

const scrollToResearch = () => {
  document.getElementById('tl-research')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function Landing() {
  const w = useWindowWidth();
  const m  = w < 760;  // stack multi-column layouts
  const xs = w < 420;  // tiny phones — shrink chrome further
  const navLinkStyle = {
    color: 'rgba(255,255,255,.55)', textDecoration: 'none', transition: 'color .2s',
    background: 'none', border: 'none', cursor: 'pointer',
    fontFamily: 'inherit', fontSize: xs ? 11 : (m ? 12 : 13), fontWeight: 600,
    padding: '8px 2px',  // wider tap target without visible change
    whiteSpace: 'nowrap',
  };

  return (
    <div style={{ minHeight: '100vh', background: `radial-gradient(ellipse at top,${C.navy}, #0c1424 70%)`, color: '#fff', fontFamily: "'Inter',system-ui,sans-serif", position: 'relative', overflow: 'hidden' }}>
      <style>{globalStyles}</style>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px,rgba(255,255,255,.025) 1px,transparent 0)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: m ? 10 : 24, left: m ? 14 : 32, right: m ? 14 : 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, zIndex: 2 }}>
          <div style={{ fontFamily: "'Manrope','Inter',sans-serif", fontSize: xs ? 16 : (m ? 18 : 20), fontWeight: 900, color: '#fff', letterSpacing: -.4, flexShrink: 0, whiteSpace: 'nowrap' }}>
            Transfer<span style={{ color: C.accent }}>Link</span>
          </div>
          <nav aria-label="Primary" style={{ display: 'flex', gap: xs ? 10 : (m ? 14 : 18), alignItems: 'center' }}>
            {!xs && <button type="button" onClick={scrollToResearch} className="tl-link" style={navLinkStyle}>Research</button>}
            <a href="#/app"  className="tl-link" style={navLinkStyle}>Prototype</a>
            <a href="#/tour" className="tl-link" style={navLinkStyle}>Tour</a>
          </nav>
        </div>
        <Hero m={m} xs={xs} />
        <PrimaryCTAs m={m} />
        <ProblemSection m={m} />
        <HowItWorks m={m} />
        <CommitteeStories m={m} />
        <ClosingCTA m={m} />
        <Footer m={m} />
      </div>
    </div>
  );
}
