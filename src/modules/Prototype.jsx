// Prototype — the screen-router half of the old App.jsx, plus a slim Hub
// that replaces the marketing-heavy S0.
//
// Runs in two modes:
//   mode='app'   — segments[0] of the hash selects the screen (#/app/3 etc.)
//   mode='tour'  — screen is derived from DEMO_SCREEN_MAP[demoStep]; the
//                  guided-demo overlay is pinned to the bottom of the viewport

import React, { useCallback, useMemo, useState } from 'react';
import { C } from '../components.jsx';
import { DEMO_SCREEN_MAP } from '../data.js';
import { GuidedDemo, IntakeModal, S15 } from '../modals.jsx';
import { S1, S2, S3, S4, S5, S6, S7, S9, S8, S10 } from '../screens1.jsx';
import { S11, S12, S13, S14, S17, S18, S19, S20 } from '../screens2.jsx';
import AppShell from '../shared/AppShell.jsx';
import { navigate } from '../shared/routing.js';

const HOME_SCREEN = 0;

function Hub({ go, m, onExitToLanding, showExit = true }) {
  const roles = [
    { s: 1,  i: '📋', t: 'LTC Nurse',      d: 'Initiate a transfer', c: C.accent },
    { s: 7,  i: '🚑', t: 'EMS Crew',        d: 'Scan on transport',   c: C.amber  },
    { s: 9,  i: '🏥', t: 'ED Staff',        d: 'Receive a patient',   c: C.green  },
    { s: 13, i: '🏠', t: 'Facility Return', d: 'Patient is back',     c: C.purple },
  ];
  const tools = [
    { s: 15, i: '🔐', t: 'Login',        c: '#546E7A' },
    { s: 17, i: '📊', t: 'Dashboard',    c: '#0097A7' },
    { s: 19, i: '📋', t: 'SBAR',         c: '#7B1FA2' },
    { s: 20, i: '🔌', t: 'Integrations', c: '#2A9D8F' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(160deg,${C.navy},#1A2B45 45%,#22395E)`, padding: m ? '20px 16px 32px' : '28px 32px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px,rgba(255,255,255,.025) 1px,transparent 0)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 540, marginBottom: m ? 20 : 28, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {showExit
          ? <button onClick={onExitToLanding} style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', color: 'rgba(255,255,255,.7)', padding: '6px 12px', borderRadius: 18, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>← Landing</button>
          : <span />}
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2.4, color: 'rgba(255,255,255,.35)', textTransform: 'uppercase' }}>{showExit ? 'Prototype Sandbox' : 'Guided Tour'}</div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: m ? 22 : 30, position: 'relative' }}>
        <div style={{ fontFamily: "'Manrope','Inter',sans-serif", fontSize: m ? 26 : 34, fontWeight: 900, color: '#fff', letterSpacing: -.8, lineHeight: 1 }}>
          Pick a role or tool
        </div>
        <div style={{ fontSize: m ? 12 : 13, color: 'rgba(255,255,255,.45)', marginTop: 8 }}>
          Jump into any seat in the transfer chain
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: m ? 10 : 14, maxWidth: 540, width: '100%', position: 'relative' }}>
        {roles.map(r => (
          <div key={r.s} onClick={() => go(r.s)} className="hover-scale" role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(r.s); } }} style={{ background: 'rgba(255,255,255,.07)', backdropFilter: 'blur(16px)', border: `1px solid ${r.c}28`, borderRadius: m ? 18 : 20, padding: m ? '20px 14px 18px' : '26px 20px 22px', cursor: 'pointer', textAlign: 'center', transition: 'all .25s', position: 'relative', overflow: 'hidden', boxShadow: `0 4px 24px ${r.c}0d` }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,transparent,${r.c},transparent)` }} />
            <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 0%,${r.c}14,transparent 65%)`, pointerEvents: 'none' }} />
            <div style={{ width: m ? 46 : 52, height: m ? 46 : 52, borderRadius: '50%', background: `${r.c}1e`, border: `1.5px solid ${r.c}38`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', marginBottom: m ? 10 : 13 }}>
              <span style={{ fontSize: m ? 22 : 24 }}>{r.i}</span>
            </div>
            <div style={{ fontSize: m ? 13 : 15, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{r.t}</div>
            <div style={{ fontSize: m ? 10 : 11, color: 'rgba(255,255,255,.42)', fontWeight: 500 }}>{r.d}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: m ? 7 : 10, maxWidth: 540, width: '100%', marginTop: m ? 10 : 14, position: 'relative' }}>
        {tools.map(n => (
          <div key={n.s} onClick={() => go(n.s)} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(n.s); } }} style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)', borderBottom: `2px solid ${n.c}55`, borderRadius: 12, padding: m ? '11px 6px' : '12px 10px', cursor: 'pointer', textAlign: 'center', transition: 'all .2s' }}>
            <div style={{ fontSize: m ? 15 : 17, marginBottom: 3 }}>{n.i}</div>
            <div style={{ fontSize: m ? 9 : 10, fontWeight: 700, color: 'rgba(255,255,255,.65)', letterSpacing: .3 }}>{n.t}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: m ? 24 : 32, textAlign: 'center', position: 'relative', maxWidth: 460 }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.28)', lineHeight: 1.7 }}>
          No real patient data · prototype only<br />
          Prefer a narrated walkthrough? <span onClick={() => navigate('tour', [])} style={{ color: C.accent, cursor: 'pointer', fontWeight: 600 }}>Start the 3-minute tour →</span>
        </div>
      </div>
    </div>
  );
}

export default function Prototype({
  route,
  mode = 'app',
  demoStep = 0,
  setDemoStep,
  exitToLanding,
  // shared state
  patients, ptId, p, setPtId,
  toasts, setToasts,
  notifs, markNotifRead, markAllNotifsRead,
  persona, setPersona, role, setRole,
  dashAlerts, dismissAlert,
  m,
  update, updateER, ackReturn, importMedSource, addPatient,
}) {
  const screen = useMemo(() => {
    if (mode === 'tour') {
      return DEMO_SCREEN_MAP[demoStep]?.screen ?? HOME_SCREEN;
    }
    const raw = route?.segments?.[0];
    if (!raw) return HOME_SCREEN;
    const n = parseInt(raw, 10);
    return Number.isNaN(n) ? HOME_SCREEN : n;
  }, [mode, demoStep, route]);

  // Visited set accumulates every screen the user passes through. Only
  // mutated inside go(), which covers both user clicks and GuidedDemo's
  // step-advance (which calls go() internally).
  const [visited, setVisited] = useState(() => new Set([screen]));
  const [showIntake, setShowIntake] = useState(false);

  const go = useCallback((s) => {
    if (s === 'add') { setShowIntake(true); return; }
    const n = Number(s);
    setVisited(v => v.has(n) ? v : new Set([...v, n]));
    if (mode === 'app') {
      navigate('app', n === HOME_SCREEN ? [] : [String(n)]);
    }
    // Tour mode: setDemoStep (called by GuidedDemo right before go()) drives
    // the URL change; screen is derived from that via useMemo above.
  }, [mode]);

  const handleNewPatient = useCallback((data) => {
    addPatient(data);
    setShowIntake(false);
    go(2);
  }, [addPatient, go]);

  const onNotifSelect = useCallback((n) => {
    if (n.ptId != null) {
      setPtId(n.ptId);
      go(2);
    }
  }, [setPtId, go]);

  const hideChromeScreens = new Set([HOME_SCREEN, 7, 9, 12]);
  const bellHiddenOn = new Set([HOME_SCREEN, 5, 6, 7, 9, 12, 15]);
  const showBell = !bellHiddenOn.has(screen);
  const showHome = !hideChromeScreens.has(screen) || mode === 'tour';

  const onHomeClick = () => {
    if (mode === 'tour') { exitToLanding && exitToLanding(); return; }
    if (screen === HOME_SCREEN) { exitToLanding && exitToLanding(); return; }
    go(HOME_SCREEN);
  };

  const homeLabel = mode === 'tour' ? 'Exit Tour' : 'Home';
  const homeIcon  = mode === 'tour' ? '✕' : '🏠';

  const sharedProps = { go, m, p, patients, ptId, setPt: setPtId, visited, persona, role, importMedSource };

  return (
    <AppShell
      toasts={toasts} setToasts={setToasts}
      notifs={notifs} markNotifRead={markNotifRead} markAllNotifsRead={markAllNotifsRead}
      onNotifSelect={onNotifSelect}
      m={m}
      showBell={showBell}
      showHome={showHome}
      onHome={onHomeClick}
      homeLabel={homeLabel}
      homeIcon={homeIcon}
      homeAriaLabel={mode === 'tour' ? 'Exit tour to landing' : 'Go to prototype home'}
    >
      {showIntake && <IntakeModal onClose={() => setShowIntake(false)} onDone={handleNewPatient} m={m} />}
      {mode === 'tour' && (
        <GuidedDemo
          onExit={() => exitToLanding && exitToLanding()}
          demoStep={demoStep}
          setDemoStep={setDemoStep}
          navigate={go}
          selectPatient={setPtId}
          m={m}
        />
      )}

      {screen === HOME_SCREEN && (
        <Hub go={go} m={m} onExitToLanding={exitToLanding} showExit={mode !== 'tour'} />
      )}

      <div style={{ paddingBottom: mode === 'tour' ? (m ? 180 : 110) : 0 }}>
        {screen === 15 && <S15 go={go} m={m} setPersona={setPersona} setRole={setRole} />}
        {screen === 17 && <S17 go={go} m={m} patients={patients} persona={persona} setPt={setPtId} alerts={dashAlerts} dismissAlert={dismissAlert} ackReturn={ackReturn} />}
        {screen === 18 && <S18 go={go} m={m} patients={patients} setPt={setPtId} />}
        {screen === 19 && <S19 go={go} m={m} patients={patients} persona={persona} />}
        {screen === 20 && <S20 go={go} m={m} />}
        {screen === 1 && <S1 go={go} m={m} setPt={setPtId} patients={patients} onAddPt={() => setShowIntake(true)} />}
        {screen === 2 && <S2 {...sharedProps} />}
        {screen === 3 && <S3 go={go} m={m} p={p} update={update} importMedSource={importMedSource} />}
        {screen === 4 && <S4 {...sharedProps} />}
        {screen === 5 && <S5 go={go} m={m} p={p} />}
        {screen === 6 && <S6 go={go} m={m} p={p} />}
        {screen === 7 && <S7 go={go} m={m} />}
        {screen === 8 && <S8 {...sharedProps} />}
        {screen === 9 && <S9 go={go} m={m} />}
        {screen === 10 && <S10 {...sharedProps} />}
        {screen === 11 && <S11 go={go} m={m} p={p} updateER={updateER} />}
        {screen === 12 && <S12 go={go} m={m} p={p} />}
        {screen === 13 && <S13 {...sharedProps} ackReturn={ackReturn} />}
        {screen === 14 && <S14 go={go} m={m} p={p} />}
      </div>
    </AppShell>
  );
}
