import React, { useState, useCallback } from 'react';
import { C, BellIco } from './components.jsx';
import { INIT_PATIENTS, NEW_PT_TEMPLATE, DEMO_SCREEN_MAP } from './data.js';
import { ToastContainer, NotificationCenter, GuidedDemo, IntakeModal, S15 } from './modals.jsx';
import { S0, S1, S2, S3, S4, S5, S6, S7, S9, S8, S10 } from './screens1.jsx';
import { S11, S12, S13, S14, S17, S18, S19 } from './screens2.jsx';

export default function App() {
  const [screen, setScreen] = useState(0);
  const [ptId, setPtId] = useState(0);
  const [patients, setPatients] = useState(INIT_PATIENTS);
  const [toasts, setToasts] = useState([]);
  const [notifs, setNotifs] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [showIntake, setShowIntake] = useState(false);
  const [demo, setDemo] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [visited, setVisited] = useState(new Set([0]));
  const [persona, setPersona] = useState(null);
  const [role, setRole] = useState(null);
  const [dashAlerts, setDashAlerts] = useState([
    { text: 'Maggie Tanaka — Transfer in Progress', sub: 'Awaiting ED return documentation', type: 'warning' },
    { text: 'Robert Chen — INR follow-up due today', sub: 'Scheduled for 3:00 PM', type: 'info' },
  ]);

  const m = window.innerWidth < 520;

  const go = useCallback((s) => {
    if (s === 'add') { setShowIntake(true); return; }
    setVisited(v => new Set([...v, s]));
    setScreen(Number(s));
  }, []);

  const addToast = useCallback((msg, type = 'ok') => {
    const id = Date.now();
    setToasts(ts => [...ts, { id, msg, type }]);
  }, []);

  const addNotification = useCallback((text, ptId) => {
    setNotifs(ns => [{ id: Date.now(), text, time: 'Just now', unread: true, ptId }, ...ns]);
  }, []);

  const p = patients.find(x => x.id === ptId) || patients[0];

  const update = useCallback((txData) => {
    setPatients(ps => ps.map(x => x.id === ptId ? { ...x, tx: { ...x.tx, ...txData, time: x.tx.time || 'March 20, 2026 at 2:47 PM', nurse: x.tx.nurse || (persona ? persona.name : 'RN Sarah Mitchell') } } : x));
  }, [ptId, persona]);

  const updateER = useCallback((erData) => {
    setPatients(ps => ps.map(x => x.id === ptId ? { ...x, er: { ...x.er, ...erData, time: x.er.time || 'March 20, 2026 at 6:15 PM' } } : x));
    const pt = patients.find(x => x.id === ptId);
    if (pt) addNotification(`${pt.short} has returned from ${pt.tx.dest?.split(',')[0] || 'the ED'}`, ptId);
    addToast('ED return documented. Facility notified!', 'ok');
  }, [ptId, patients, addNotification, addToast]);

  const handleNewPatient = useCallback((data) => {
    const newId = Date.now();
    const newPt = { ...NEW_PT_TEMPLATE, ...data, id: newId };
    setPatients(ps => [...ps, newPt]);
    setPtId(newId);
    setShowIntake(false);
    addToast(`${data.short || data.name} added to roster!`);
    addNotification(`New patient added: ${data.short || data.name}`, newId);
    go(2);
  }, [go, addToast, addNotification]);

  const dismissAlert = useCallback((i) => {
    setDashAlerts(as => as.filter((_, idx) => idx !== i));
  }, []);

  const unreadCount = notifs.filter(n => n.unread).length;
  const showHeader = screen !== 0 && screen !== 7 && screen !== 9 && !demo;
  const showAny = screen >= 1 && screen !== 5 && screen !== 6 && screen !== 7 && screen !== 9 && screen !== 12 && screen !== 15;
  const showHomeBtn = screen !== 0 && screen !== 7 && screen !== 9 && screen !== 12;

  const sharedProps = { go, m, p, patients, ptId, setPt: setPtId, visited, persona, role };

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', minHeight: '100vh', position: 'relative', fontFamily: "'Inter',system-ui,sans-serif", color: C.tx }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #1a1a2e; }
        .card-hover:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(15,29,47,.12) !important; }
        .hover-scale:hover { transform: scale(1.03); }
        @keyframes bp { 0%,100%{opacity:.9}50%{opacity:.5} }
        @keyframes qp { 0%,100%{opacity:.3;transform:scale(1)}50%{opacity:.6;transform:scale(1.04)} }
        @keyframes toastIn { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideUp { from{transform:translateY(100%);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes confirmBounce { 0%{opacity:0;transform:scale(.4)}60%{transform:scale(1.12)}100%{opacity:1;transform:scale(1)} }
        @keyframes sc { 0%,100%{top:0}50%{top:calc(100% - 3px)} }
        .home-btn:hover { transform: scale(1.08); box-shadow: 0 6px 20px rgba(27,154,170,.5) !important; }
        .home-btn:active { transform: scale(0.96); }
        input,textarea,button { font-family: inherit; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(0,0,0,.15); border-radius: 2px; }
      `}</style>

      <ToastContainer toasts={toasts} setToasts={setToasts} />
      {showNotif && <NotificationCenter notifications={notifs} onClose={() => setShowNotif(false)} onSelect={(n) => { setNotifs(ns => ns.map(x => x.id === n.id ? { ...x, unread: false } : x)); if (n.ptId != null) { setPtId(n.ptId); go(2); } setShowNotif(false); }} m={m} />}
      {showIntake && <IntakeModal onClose={() => setShowIntake(false)} onDone={handleNewPatient} m={m} />}
      {demo && <GuidedDemo onExit={() => setDemo(false)} demoStep={demoStep} setDemoStep={setDemoStep} navigate={go} selectPatient={setPtId} m={m} />}

      {screen === 0 && <S0 go={go} m={m} onStartDemo={() => { setDemo(true); setDemoStep(0); go(0); }} />}
      <div style={{ paddingBottom: demo ? (m ? 120 : 100) : 0 }}>
        {screen === 15 && <S15 go={go} m={m} setPersona={setPersona} setRole={setRole} />}
        {screen === 17 && <S17 {...sharedProps} alerts={dashAlerts} dismissAlert={dismissAlert} />}
        {screen === 18 && <S18 go={go} m={m} patients={patients} setPt={setPtId} />}
        {screen === 19 && <S19 go={go} m={m} patients={patients} />}
        {screen === 1 && <S1 go={go} m={m} setPt={setPtId} patients={patients} onAddPt={() => setShowIntake(true)} />}
        {screen === 2 && <S2 {...sharedProps} />}
        {screen === 3 && <S3 go={go} m={m} p={p} update={update} />}
        {screen === 4 && <S4 {...sharedProps} />}
        {screen === 5 && <S5 go={go} m={m} p={p} />}
        {screen === 6 && <S6 go={go} m={m} p={p} />}
        {screen === 7 && <S7 go={go} m={m} />}
        {screen === 8 && <S8 {...sharedProps} />}
        {screen === 9 && <S9 go={go} m={m} />}
        {screen === 10 && <S10 {...sharedProps} />}
        {screen === 11 && <S11 go={go} m={m} p={p} updateER={updateER} />}
        {screen === 12 && <S12 go={go} m={m} p={p} />}
        {screen === 13 && <S13 {...sharedProps} />}
        {screen === 14 && <S14 go={go} m={m} p={p} />}
      </div>

      {showAny && (
        <button onClick={() => { setShowNotif(true); setNotifs(ns => ns.map(n => ({ ...n, unread: false }))); }} style={{ position: 'fixed', top: 10, right: 12, zIndex: 50, background: 'none', border: 'none', cursor: 'pointer', padding: 4, minWidth: 44, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <BellIco n={unreadCount} />
        </button>
      )}

      {showHomeBtn && (
        <button
          className="home-btn"
          onClick={() => go(0)}
          aria-label="Go to Home"
          style={{
            position: 'fixed',
            top: 58,
            right: 12,
            zIndex: 49,
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: '6px 12px',
            borderRadius: 20,
            background: `linear-gradient(135deg,${C.navy},${C.navyL})`,
            border: `1.5px solid rgba(27,154,170,0.4)`,
            color: 'rgba(255,255,255,0.85)',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(15,29,47,.3)',
            transition: 'transform .18s ease, box-shadow .18s ease',
            letterSpacing: .2,
            fontFamily: 'inherit',
          }}
        >
          <span style={{ fontSize: 13 }}>🏠</span>
          Home
        </button>
      )}
    </div>

  );
}
