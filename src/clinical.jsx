import React, { useState, useEffect } from 'react';
import { C, Chk, DnA, WarnIco, QR, Bg, Av, Cd, Bt, SL, TB, Bk, FR, Chips } from './components.jsx';

// ===== ALLERGY BANNER =====
export const AllergyB = ({ p, m }) =>
  p.allergy && p.allergy.length > 0 ? (
    <div style={{ background: `linear-gradient(90deg,${C.lR},#FFF5F3)`, border: `1px solid ${C.red}`, borderLeft: `4px solid ${C.red}`, borderRadius: 10, padding: m ? '8px 12px' : '10px 16px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: m ? 10 : 14 }}>
      <WarnIco /><span style={{ fontSize: m ? 12 : 13, fontWeight: 700, color: C.red }}>ALLERGIES: {p.allergy.join(', ')}</span>
    </div>
  ) : (
    <div style={{ background: `linear-gradient(90deg,${C.lG},#F0FFF4)`, border: `1px solid ${C.green}`, borderLeft: `4px solid ${C.green}`, borderRadius: 10, padding: m ? '8px 12px' : '10px 16px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: m ? 10 : 14 }}>
      <span style={{ fontSize: 14 }}>✅</span><span style={{ fontSize: m ? 12 : 13, fontWeight: 700, color: C.green }}>No Known Allergies (NKA)</span>
    </div>
  );

// ===== CODE BANNER =====
export const CodeBanner = ({ p, lg, m }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: m ? 6 : 10, flexWrap: 'wrap', ...(lg ? { padding: m ? '10px 14px' : '14px 20px', background: `linear-gradient(90deg,${C.lR},#FFF5F3)`, borderRadius: 12, marginBottom: m ? 10 : 14, border: `1.5px solid ${C.red}`, borderLeft: `4px solid ${C.red}` } : {}) }}>
    <Bg ch={p.code} bg={p.codeType === 'dnr' ? C.red : C.green} pulse={lg} />
    {p.polst && <Bg ch="✓ POLST" bg={C.green} />}
    <Bg ch={p.flag + ' ' + p.lang} bg={C.accent} />
  </div>
);

// ===== PATIENT HEADER =====
export const PtHd = ({ p, onQR, m }) => (
  <Cd m={m} style={{ borderLeft: `4px solid ${C.accent}` }} ch={
    <div style={{ display: 'flex', gap: m ? 10 : 14, alignItems: 'flex-start' }}>
      <Av sz={m ? 42 : 48} init={p.init} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: m ? 17 : 20, fontWeight: 800, color: C.navy, marginBottom: 2 }}>{p.name}</div>
        <div style={{ fontSize: 13, color: C.txS, marginBottom: 10 }}>DOB: {p.dob} · Age {p.age} · Room {p.room}</div>
        <CodeBanner p={p} m={m} />
      </div>
      {onQR && <div onClick={onQR} style={{ cursor: 'pointer', textAlign: 'center', flexShrink: 0 }}><QR sz={m ? 48 : 56} /><div style={{ fontSize: 10, color: C.accent, fontWeight: 600, marginTop: 2 }}>QR</div></div>}
    </div>
  } />
);

// ===== TRANSFER STEPS =====
export const Steps = ({ cur, m }) => {
  const st = ['Review', 'Transfer', 'Confirm', 'QR Code'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: m ? '12px 10px' : '14px 20px', background: C.card, borderBottom: `1px solid ${C.bdr}`, gap: m ? 4 : 8 }}>
      {st.map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: m ? 4 : 8 }}>
          <div style={{ width: m ? 24 : 28, height: m ? 24 : 28, borderRadius: 14, background: i <= cur ? C.accent : C.bdr, color: i <= cur ? '#fff' : C.txS, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: m ? 11 : 12, fontWeight: 700, boxShadow: i === cur ? `0 0 0 3px ${C.accentG}` : 'none' }}>
            {i < cur ? <Chk s={14} /> : i + 1}
          </div>
          {!m && <span style={{ fontSize: 11, fontWeight: i === cur ? 700 : 500, color: i <= cur ? C.accent : C.txS, whiteSpace: 'nowrap' }}>{s}</span>}
          {i < st.length - 1 && <div style={{ width: m ? 16 : 32, height: 2, background: i < cur ? C.accent : C.bdr, borderRadius: 1 }} />}
        </div>
      ))}
    </div>
  );
};

// ===== COLLAPSIBLE CARD =====
export const Coll = ({ title, ic, ch, open: d = true, m }) => {
  const [o, setO] = useState(d);
  return (
    <Cd m={m} ch={<>
      <div onClick={() => setO(!o)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', minHeight: 28 }}>
        <SL ch={title} ic={ic} />
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.txS} strokeWidth="2" style={{ transition: 'transform .2s', transform: o ? 'rotate(180deg)' : 'rotate(0)', flexShrink: 0 }}><path d="M6 9l6 6 6-6" /></svg>
      </div>
      <div style={{ maxHeight: o ? 2000 : 0, overflow: 'hidden', transition: 'max-height .3s ease', marginTop: o ? 8 : 0 }}>{ch}</div>
    </>} />
  );
};

// ===== MENTATION SCALES =====
export const MScale = ({ lvl, m }) => {
  const ls = ['A&Ox4\nAlert', 'Disoriented\nFollows Instr.', 'Disoriented\nNo Follow', 'Non-Verbal'];
  return <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>{ls.map((l, i) => <div key={i} style={{ flex: 1, padding: m ? '6px 3px' : '8px 6px', borderRadius: 8, textAlign: 'center', fontSize: m ? 8 : 10, fontWeight: i === lvl - 1 ? 700 : 500, lineHeight: 1.3, background: i === lvl - 1 ? C.accent : '#F0F2F5', color: i === lvl - 1 ? '#fff' : C.txT, border: i === lvl - 1 ? `2px solid ${C.accentD}` : '1px solid transparent' }}>{l.split('\n').map((x, j) => <div key={j}>{x}</div>)}</div>)}</div>;
};
export const FScale = ({ lvl, m }) => {
  const ls = ['Independent', 'With Assistance', 'Non-Ambulatory'];
  return <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>{ls.map((l, i) => <div key={i} style={{ flex: 1, padding: m ? '8px 4px' : '10px 8px', borderRadius: 8, textAlign: 'center', fontSize: m ? 10 : 11, fontWeight: i === lvl - 1 ? 700 : 500, background: i === lvl - 1 ? C.amber : '#F0F2F5', color: i === lvl - 1 ? '#fff' : C.txT, border: i === lvl - 1 ? `2px solid ${C.amberD}` : '1px solid transparent' }}>{l}</div>)}</div>;
};
export const MScaleSelect = ({ lvl, setLvl, m }) => {
  const ls = ['A&Ox4\nAlert', 'Disoriented\nFollows Instr.', 'Disoriented\nNo Follow', 'Non-Verbal'];
  return <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>{ls.map((l, i) => <div key={i} onClick={() => setLvl(i + 1)} style={{ flex: 1, padding: m ? '6px 3px' : '8px 6px', borderRadius: 8, textAlign: 'center', fontSize: m ? 8 : 10, fontWeight: i === lvl - 1 ? 700 : 500, lineHeight: 1.3, background: i === lvl - 1 ? C.accent : '#F0F2F5', color: i === lvl - 1 ? '#fff' : C.txT, border: i === lvl - 1 ? `2px solid ${C.accentD}` : '1px solid transparent', cursor: 'pointer' }}>{l.split('\n').map((x, j) => <div key={j}>{x}</div>)}</div>)}</div>;
};
export const FScaleSelect = ({ lvl, setLvl, m }) => {
  const ls = ['Independent', 'With Assistance', 'Non-Ambulatory'];
  return <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>{ls.map((l, i) => <div key={i} onClick={() => setLvl(i + 1)} style={{ flex: 1, padding: m ? '8px 4px' : '10px 8px', borderRadius: 8, textAlign: 'center', fontSize: m ? 10 : 11, fontWeight: i === lvl - 1 ? 700 : 500, background: i === lvl - 1 ? C.amber : '#F0F2F5', color: i === lvl - 1 ? '#fff' : C.txT, border: i === lvl - 1 ? `2px solid ${C.amberD}` : '1px solid transparent', cursor: 'pointer' }}>{l}</div>)}</div>;
};

// ===== COMFORT SECTION =====
export const ComfortSection = ({ p, m, defaultOpen = false }) => {
  const pc = p.personCentered || {};
  const items = [
    { ic: '💡', l: 'Lighting', v: p.comfort.light },
    { ic: '💬', l: 'Communication', v: p.comfort.comm },
    { ic: '🗣️', l: 'Language / Interpreter', v: `${pc.languageNeed || p.lang}${pc.interpreterNeeded ? ' · Interpreter requested' : ''}` },
    { ic: '👨‍👩‍👧', l: 'Family', v: pc.familyInvolvement || p.comfort.fam },
    { ic: '🙏', l: 'Cultural/Spiritual', v: pc.culturalPractices || p.comfort.cult },
    { ic: '⚠️', l: 'Behavioral Triggers', v: pc.behavioralTriggers || p.comfort.dist },
    { ic: '🧘', l: 'Calming Strategies', v: pc.calmingStrategies || p.comfort.dist },
    { ic: '🍽️', l: 'Dietary Preference', v: pc.dietaryPreference || 'No specific preference documented' }
  ];
  return (
    <Coll title="Person-Centered Care Preferences" ic="🕊️" open={defaultOpen} m={m} ch={<>
      <div style={{ background: 'linear-gradient(90deg,#F3E5F5,#FCE4EC)', borderRadius: 10, padding: '8px 12px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14 }}>💜</span><span style={{ fontSize: 11, fontWeight: 600, color: '#6A1B9A' }}>These preferences help ensure dignified, person-centered care during transitions</span>
      </div>
      {items.map((it, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 0', borderBottom: i < items.length - 1 ? `1px solid ${C.bdr}15` : 'none' }}>
          <span style={{ fontSize: 16, flexShrink: 0, marginTop: 2 }}>{it.ic}</span>
          <div><div style={{ fontSize: 11, fontWeight: 700, color: C.txS, textTransform: 'uppercase', letterSpacing: .6 }}>{it.l}</div><div style={{ fontSize: 13, color: C.tx, marginTop: 2, lineHeight: 1.5 }}>{it.v}</div></div>
        </div>
      ))}
    </>} />
  );
};

// ===== TRANSFER PROGRESS TRACKER =====
export const TransferTracker = ({ visited, m }) => {
  const stages = [{ label: 'Facility', scrs: [1, 2, 3], ic: '🏥', c: C.accent }, { label: 'EMS Scan', scrs: [7, 8], ic: '🚑', c: C.amber }, { label: 'ED Scan', scrs: [9, 10], ic: '🏥', c: C.green }, { label: 'ED Return', scrs: [11, 12], ic: '📋', c: C.green }, { label: 'Back Home', scrs: [13], ic: '🏠', c: C.purple }];
  const activeIdx = stages.reduce((max, s, i) => s.scrs.some(x => visited.has(x)) ? i : max, -1);
  return (
    <div style={{ background: C.card, borderRadius: 14, padding: m ? '12px 10px' : '14px 18px', marginBottom: m ? 10 : 14, border: `1px solid ${C.bdr}` }}>
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: C.txS, marginBottom: 10 }}>Transfer Progress</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: m ? 2 : 4 }}>
        {stages.map((s, i) => (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div style={{ width: m ? 28 : 32, height: m ? 28 : 32, borderRadius: 16, background: i <= activeIdx ? s.c : '#E8E8E8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: m ? 12 : 14, boxShadow: i === activeIdx ? `0 0 0 3px ${s.c}30` : 'none', transition: 'all .3s' }}>
                {i <= activeIdx ? <span>{s.ic}</span> : <span style={{ fontSize: 10, color: C.txT }}>{i + 1}</span>}
              </div>
              <div style={{ fontSize: m ? 8 : 9, fontWeight: 600, color: i <= activeIdx ? C.tx : C.txT, marginTop: 4, textAlign: 'center' }}>{s.label}</div>
            </div>
            {i < stages.length - 1 && <div style={{ height: 2, flex: .6, background: i < activeIdx ? stages[i + 1].c : C.bdr, borderRadius: 1, marginBottom: 16, transition: 'background .3s' }} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// ===== PATIENT SWITCHER =====
export const PtSwitcher = ({ patients, ptId, setPt, m }) => {
  const [open, setOpen] = useState(false);
  const p = patients.find(x => x.id === ptId) || patients[0];
  return (
    <div style={{ position: 'relative' }}>
      <div onClick={() => setOpen(!open)} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', padding: '4px 10px', borderRadius: 20, background: 'rgba(255,255,255,.12)', minHeight: 36 }}>
        <div style={{ width: 24, height: 24, borderRadius: 12, background: 'rgba(255,255,255,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff' }}>{p.init}</div>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>{p.short}</span>
        <DnA />
      </div>
      {open && (
        <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 6, background: '#fff', borderRadius: 14, boxShadow: '0 8px 32px rgba(0,0,0,.2)', border: `1px solid ${C.bdr}`, overflow: 'hidden', zIndex: 50, minWidth: 240 }}>
          <div style={{ padding: '10px 14px', borderBottom: `1px solid ${C.bdr}`, fontSize: 11, fontWeight: 700, color: C.txS, textTransform: 'uppercase' }}>Switch Patient</div>
          {patients.map((pt, i) => (
            <div key={i} onClick={() => { setPt(pt.id); setOpen(false); }} style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', background: pt.id === ptId ? C.lA : 'transparent', borderBottom: `1px solid ${C.bdr}15` }}>
              <Av sz={28} init={pt.init} />
              <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600, color: C.navy }}>{pt.short}</div><div style={{ fontSize: 11, color: C.txS }}>Room {pt.room} · {pt.code}</div></div>
              {pt.id === ptId && <Chk s={14} c={C.accent} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ===== POLST OVERLAY =====
export const POLST = ({ p, onClose, m }) => (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.65)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: m ? 12 : 0 }} onClick={onClose}>
    <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 20, padding: m ? 20 : 32, maxWidth: 520, width: '95%', maxHeight: '85vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,.3)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: m ? 16 : 18, fontWeight: 800, color: C.navy }}>POLST Document</div>
        <button onClick={onClose} style={{ fontSize: 22, color: C.txS, minHeight: 44, minWidth: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 22, background: '#F5F5F5', border: 'none', cursor: 'pointer' }}>✕</button>
      </div>
      <div style={{ border: `3px solid ${C.red}`, borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ background: C.red, padding: '10px 16px', textAlign: 'center' }}><div style={{ fontWeight: 800, fontSize: 13, color: '#fff' }}>PHYSICIAN ORDERS FOR LIFE-SUSTAINING TREATMENT</div></div>
        <div style={{ padding: 16 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}><Av sz={32} init={p.init} /><div><div style={{ fontSize: 14, fontWeight: 700 }}>{p.name}</div><div style={{ fontSize: 12, color: C.txS }}>DOB: {p.dob}</div></div></div>
          <div style={{ background: C.lR, borderRadius: 10, padding: 12, marginBottom: 8 }}><div style={{ fontWeight: 700, fontSize: 12, color: C.red, textTransform: 'uppercase', marginBottom: 4 }}>Section A: CPR</div><div style={{ fontSize: 14 }}>☑ Do Not Attempt Resuscitation (DNR)</div></div>
          <div style={{ background: '#F5F5F5', borderRadius: 10, padding: 12 }}><div style={{ fontWeight: 700, fontSize: 12, color: C.navy, textTransform: 'uppercase', marginBottom: 4 }}>Section B: Interventions</div><div style={{ fontSize: 14 }}>☑ Comfort-focused treatment only</div></div>
        </div>
      </div>
    </div>
  </div>
);

export const EDCriticalSummary = ({ p, m, onOpenPolst }) => (
  <Cd m={m} style={{ border: `2px solid ${C.red}55`, borderLeft: `4px solid ${C.red}` }} ch={<>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: C.red, letterSpacing: .7, textTransform: 'uppercase' }}>ED First 30 Seconds</div>
      {p.polst && <button onClick={onOpenPolst} style={{ border: 'none', background: C.red, color: '#fff', borderRadius: 16, padding: '6px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>View POLST</button>}
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: 8 }}>
      <div style={{ background: '#FAFAFA', borderRadius: 8, padding: '8px 10px' }}><strong>{p.name}</strong><div style={{ fontSize: 12, color: C.txS }}>DOB {p.dob} · Age {p.age}</div></div>
      <div style={{ background: '#FAFAFA', borderRadius: 8, padding: '8px 10px' }}><strong>Code:</strong> {p.code}<div style={{ fontSize: 12, color: C.txS }}>{p.polst ? 'POLST on file' : 'No POLST on file'}</div></div>
      <div style={{ background: '#FFF5F3', borderRadius: 8, padding: '8px 10px' }}><strong>Allergies:</strong> {p.allergy?.join(', ') || 'NKA'}</div>
      <div style={{ background: '#F0FAFB', borderRadius: 8, padding: '8px 10px' }}><strong>Language:</strong> {p.lang}{p.personCentered?.interpreterNeeded ? ' (Interpreter needed)' : ''}</div>
      <div style={{ background: '#FFF9E8', borderRadius: 8, padding: '8px 10px', gridColumn: '1 / -1' }}><strong>Reason:</strong> {p.tx.reason || 'Not documented'} </div>
      <div style={{ background: '#FAFAFA', borderRadius: 8, padding: '8px 10px', gridColumn: '1 / -1' }}><strong>Recent Vitals/Status:</strong> {(p.vitalsHistory || []).slice(-1).map(v => `${v.time} · BP ${v.bp}, HR ${v.hr}, SPO2 ${v.sp}%`).join('') || p.tx.chg || 'No recent vitals entered'}</div>
    </div>
  </>} />
);

// ===== SCANNER =====
export const Scanner = ({ label, onDone, m }) => {
  const [done, setDone] = useState(false);
  const [prog, setProg] = useState(0);
  useEffect(() => { const iv = setInterval(() => setProg(p => Math.min(p + 2, 100)), 36); const t = setTimeout(() => { setDone(true); clearInterval(iv); }, 1800); return () => { clearTimeout(t); clearInterval(iv); }; }, []);
  useEffect(() => { if (done) { const t = setTimeout(onDone, 700); return () => clearTimeout(t); } }, [done, onDone]);
  const sz = m ? 220 : 260;
  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(ellipse at center,#1a1a2e,#0a0a0f)', display: 'flex', flexDirection: 'column' }}>
      <TB ctr={label} m={m} />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: 20 }}>
        <div style={{ position: 'relative' }}>
          {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([x, y], i) => <div key={i} style={{ position: 'absolute', width: 28, height: 28, ...(y === 0 ? { top: -4 } : { bottom: -4 }), ...(x === 0 ? { left: -4 } : { right: -4 }), borderColor: done ? C.green : C.accent, borderStyle: 'solid', borderWidth: 0, ...(y === 0 ? { borderTopWidth: 3 } : { borderBottomWidth: 3 }), ...(x === 0 ? { borderLeftWidth: 3 } : { borderRightWidth: 3 }), borderRadius: 8 }} />)}
          <div style={{ width: sz, height: sz, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', borderRadius: 12 }}>
            {!done && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,transparent,${C.accent},transparent)`, animation: 'sc 1.5s ease-in-out infinite' }} />}
            <QR sz={m ? 160 : 180} />
            {done && <div style={{ position: 'absolute', inset: 0, background: 'rgba(42,157,143,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}><div style={{ width: 72, height: 72, borderRadius: 36, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 20px rgba(42,157,143,.4)`, animation: 'confirmBounce .5s cubic-bezier(.22,1,.36,1)' }}><Chk s={40} /></div></div>}
          </div>
        </div>
        <div style={{ width: sz, height: 3, background: '#333', borderRadius: 2, marginTop: 20, overflow: 'hidden' }}><div style={{ height: '100%', background: done ? C.green : C.accent, width: prog + '%', transition: 'width .1s linear,background .3s', borderRadius: 2 }} /></div>
        <div style={{ color: '#fff', marginTop: 16, fontSize: 16, fontWeight: 600 }}>{done ? '✓ Scan Successful' : 'Scanning QR Code...'}</div>
        <div style={{ color: 'rgba(255,255,255,.4)', marginTop: 6, fontSize: 13 }}>{done ? 'Loading patient record...' : 'Hold device over patient QR code'}</div>
      </div>
    </div>
  );
};

// ===== RECORD SECTIONS =====
export const Sections = ({ p, tx, er, m, comfortOpen }) => (
  <>
    {tx && <Cd m={m} hl={C.lW} style={{ border: `1.5px solid ${C.amber}`, borderLeft: `4px solid ${C.amber}` }} ch={<><SL ch="Active Transfer Details" ic="🚨" /><FR l="Reason for Transfer" v={p.tx.reason} hl /><FR l="Symptoms" v={<Chips items={p.tx.symp} bg={C.amber} color="#fff" />} /><FR l="Interventions" v={p.tx.intv} /><FR l="Recent Changes (72h)" v={p.tx.chg} /><FR l="Destination" v={p.tx.dest} /><div style={{ fontSize: 12, color: C.txS, marginTop: 6, paddingTop: 6, borderTop: `1px solid ${C.amber}30` }}>Initiated: {p.tx.time} by {p.tx.nurse}</div></>} />}
    <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? 10 : 14 }}>
      <Coll title="Contacts & Facility" ic="👥" m={m} ch={<><FR l="Contact" v={<span><strong>{p.contact}</strong> ({p.contactRel})</span>} /><FR l="Phone" v={<span style={{ color: C.accent, fontWeight: 600 }}>{p.contactPh}</span>} /><div style={{ height: 1, background: C.bdr, margin: '8px 0' }} /><FR l="Facility" v={<strong>{p.fac}</strong>} /><FR l="Address" v={p.facAddr} /><FR l="Phone" v={p.facPh} /></>} />
      <Coll title="Medications" ic="💊" m={m} ch={<>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 12, color: C.txS }}>{p.meds.length} active medications</div>
          {p.medAttachment?.verifiedAtTransfer && <Bg ch="✓ Verified at transfer" bg={C.green} style={{ fontSize: 10 }} />}
        </div>
        {p.medAttachment && <div style={{ background: '#F8F9FB', border: `1px solid ${C.bdr}`, borderRadius: 10, padding: '8px 10px', marginBottom: 10, fontSize: 11, color: C.txS, lineHeight: 1.5 }}>
          <div><strong>Source:</strong> {p.medAttachment.method} · {p.medAttachment.source}</div>
          <div><strong>Attachment:</strong> {p.medAttachment.fileName}</div>
          <div><strong>Imported:</strong> {p.medAttachment.importedAt}</div>
        </div>}
        {p.meds.length === 0 ? <div style={{ padding: '12px 0', color: C.txT, fontSize: 13, fontStyle: 'italic' }}>No active medications listed. Manual entry available for standalone facilities.</div> : p.meds.map((med, i) => <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${C.bdr}15` }}><span style={{ fontSize: 13 }}>{med.n}</span><div style={{ display: 'flex', gap: 4 }}><Bg ch={med.f} bg={C.lA} color={C.accent} style={{ fontSize: 10, padding: '2px 7px' }} /><Bg ch={med.t} bg="#F0F0F0" color={C.txS} style={{ fontSize: 10, padding: '2px 7px' }} /></div></div>)}
      </>} />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? 10 : 14 }}>
      <Coll title="History & Baselines" ic="📋" m={m} ch={<><FR l="Conditions" v={<Chips items={p.hx} />} /><div style={{ marginTop: 12 }}><span style={{ fontSize: 11, fontWeight: 700, color: C.txS, textTransform: 'uppercase' }}>Baseline Mentation</span><MScale lvl={p.mLvl} m={m} /></div><div style={{ marginTop: 12 }}><span style={{ fontSize: 11, fontWeight: 700, color: C.txS, textTransform: 'uppercase' }}>Functional Status</span><FScale lvl={p.fLvl} m={m} /></div></>} />
      <Coll title="Devices & Risks" ic="⚠️" m={m} ch={<><FR l="Devices" v={<Chips items={p.dev} />} /><FR l="Risk Alerts" v={<Chips items={p.risks} bg={C.lW} color="#7B3E00" />} /><FR l="Isolation" v={<Bg ch={'✓ ' + p.iso} bg="#F0F2F5" color={C.green} style={{ fontSize: 12 }} />} /></>} />
    </div>
    <ComfortSection p={p} m={m} defaultOpen={comfortOpen || false} />
    {er ? (
      <Cd m={m} style={{ border: `2px solid ${C.green}`, borderLeft: `4px solid ${C.green}`, position: 'relative' }} ch={<>
        <Bg ch="NEW" bg={C.green} style={{ position: 'absolute', top: -10, right: 16, fontSize: 11 }} />
        <SL ch="ED Return Information" ic="✅" />
        <FR l="Diagnosis" v={<strong>{p.er.dx}</strong>} hl />
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr 1fr' : '1fr 1fr 1fr 1fr', gap: 8, margin: '8px 0' }}>
          {[['BP', p.er.bp], ['Pulse', p.er.hr], ['RR', p.er.rr], ['SPO2', p.er.sp]].map(([l, v], i) => (
            <div key={i} style={{ background: C.lG, borderRadius: 10, padding: '10px 12px', border: `1px solid ${C.green}30`, textAlign: 'center' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.green, textTransform: 'uppercase' }}>{l}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.navy }}>{v}</div>
            </div>
          ))}
        </div>
        <FR l="Prescriptions" v={p.er.rx} />
        <FR l="Report Called" v={'Yes, ' + p.er.rpt} />
        <FR l="Instructions" v={p.er.ins} />
        <div style={{ fontSize: 12, color: C.txS, marginTop: 6, paddingTop: 6, borderTop: `1px solid ${C.green}30` }}>Completed by {p.er.dr}, {p.er.time}</div>
      </>} />
    ) : (
      <Cd m={m} style={{ border: '2px dashed #CCC', background: '#FAFAFA' }} ch={<><SL ch="ED Return Information" ic="🏥" /><div style={{ textAlign: 'center', padding: '24px 10px' }}><div style={{ fontSize: 32, opacity: .3 }}>🏥</div><div style={{ color: C.dis, fontSize: 14, marginTop: 6 }}>No ED visit data</div><div style={{ color: C.txT, fontSize: 12, marginTop: 4 }}>Completed by ED staff during a transfer</div></div></>} />
    )}
  </>
);
