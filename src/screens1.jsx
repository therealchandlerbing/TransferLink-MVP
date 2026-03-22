import React, { useState } from 'react';
import { C, Chk, DnA, QR, Bg, Av, Cd, Bt, SL, TB, Bk, FR, TxIn, BellIco } from './components.jsx';
import { AllergyB, CodeBanner, PtHd, Steps, TransferTracker, PtSwitcher, POLST, Scanner, Sections, ComfortSection } from './clinical.jsx';

// ===== S0 — HOME =====
export const S0 = ({ go, m, onStartDemo }) => {
  const rs = [
    { s: 1, i: '📋', t: 'LTC Nurse', d: 'Start a transfer', c: C.accent },
    { s: 7, i: '🚑', t: 'EMS Crew', d: 'Scan on transport', c: C.amber },
    { s: 9, i: '🏥', t: 'ED Staff', d: 'Receive a patient', c: C.green },
    { s: 13, i: '🏠', t: 'Facility Return', d: 'Patient is back', c: C.purple },
  ];
  const nav2 = [
    { s: 15, i: '🔐', t: 'Login', c: '#546E7A' },
    { s: 17, i: '📊', t: 'Dashboard', c: '#0097A7' },
    { s: 18, i: '📁', t: 'History', c: '#5C6BC0' },
    { s: 19, i: '📋', t: 'SBAR', c: '#7B1FA2' },
  ];
  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(160deg,${C.navy},#1E2F4D 40%,#2A3F6A)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: m ? 16 : 32, position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px,rgba(255,255,255,.03) 1px,transparent 0)', backgroundSize: '32px 32px' }} />
      <div style={{ textAlign: 'center', marginBottom: m ? 24 : 36, position: 'relative' }}>
        <div style={{ fontSize: m ? 10 : 12, fontWeight: 700, letterSpacing: 4, color: C.accent, textTransform: 'uppercase', marginBottom: 12 }}>Prototype Preview</div>
        <div style={{ fontSize: m ? 32 : 42, fontWeight: 900, color: '#fff', letterSpacing: -1 }}>Transfer<span style={{ color: C.accent }}>Link</span></div>
        <div style={{ fontSize: m ? 13 : 16, color: 'rgba(255,255,255,.55)', marginTop: 10 }}>One patient. One record. Every handoff.</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: m ? 10 : 14, maxWidth: 540, width: '100%', position: 'relative' }}>
        {rs.map(r => (
          <div key={r.s} onClick={() => go(r.s)} className="hover-scale" style={{ background: 'rgba(255,255,255,.07)', backdropFilter: 'blur(16px)', border: `1px solid ${r.c}30`, borderRadius: m ? 18 : 22, padding: m ? '20px 14px 18px' : '28px 22px 24px', cursor: 'pointer', textAlign: 'center', transition: 'all .25s', position: 'relative', overflow: 'hidden', boxShadow: `0 4px 24px ${r.c}10` }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,transparent,${r.c},transparent)` }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: 0, background: `radial-gradient(ellipse at 50% 0%,${r.c}18,transparent 70%)`, pointerEvents: 'none' }} />
            <div style={{ width: m ? 48 : 56, height: m ? 48 : 56, borderRadius: m ? 24 : 28, background: `${r.c}22`, border: `1.5px solid ${r.c}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', marginBottom: m ? 10 : 14 }}>
              <span style={{ fontSize: m ? 22 : 26 }}>{r.i}</span>
            </div>
            <div style={{ fontSize: m ? 13 : 16, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{r.t}</div>
            <div style={{ fontSize: m ? 10 : 12, color: 'rgba(255,255,255,.45)', fontWeight: 500 }}>{r.d}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: m ? 7 : 10, maxWidth: 540, width: '100%', marginTop: m ? 10 : 14, position: 'relative' }}>
        {nav2.map(n => (
          <div key={n.s} onClick={() => go(n.s)} style={{ background: 'rgba(255,255,255,.05)', border: `1px solid rgba(255,255,255,.1)`, borderBottom: `2px solid ${n.c}60`, borderRadius: 12, padding: m ? '11px 6px' : '13px 10px', cursor: 'pointer', textAlign: 'center', transition: 'all .2s' }}>
            <div style={{ fontSize: m ? 15 : 18, marginBottom: 3 }}>{n.i}</div>
            <div style={{ fontSize: m ? 9 : 10, fontWeight: 700, color: 'rgba(255,255,255,.7)', letterSpacing: .3 }}>{n.t}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: m ? 16 : 24, position: 'relative' }}>
        <button onClick={onStartDemo} style={{ padding: '12px 32px', borderRadius: 12, background: `linear-gradient(135deg,${C.accent},${C.accentD})`, color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: `0 4px 16px ${C.accentG}`, fontFamily: 'inherit' }}>▶ Start Guided Demo</button>
      </div>
      <div style={{ marginTop: m ? 16 : 24, textAlign: 'center', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: m ? 16 : 32, marginBottom: 16 }}>
          {[['4', 'Patient Records'], ['81%', 'Prefer Electronic'], ['< 5 min', 'Target Completion']].map(([n, l], i) => (
            <div key={i}><div style={{ fontSize: m ? 18 : 22, fontWeight: 800, color: C.accent }}>{n}</div><div style={{ fontSize: m ? 9 : 11, color: 'rgba(255,255,255,.35)', marginTop: 2 }}>{l}</div></div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.25)' }}>Prototype demonstration. No real patient data.</div>
      </div>
    </div>
  );
};

// ===== S1 — PATIENT ROSTER =====
export const S1 = ({ go, m, setPt, patients, onAddPt }) => {
  const [q, setQ] = useState('');
  const filtered = patients.filter(p => !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.room.toString().includes(q) || (p.hx && p.hx.some(h => h.toLowerCase().includes(q.toLowerCase()))));
  const codeColor = (pt) => pt.codeType === 'dnr' ? C.red : C.green;
  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <TB left={<Bk go={go} to={0} label="Home" />} ctr={m ? 'Cascade View' : 'Cascade View Assisted Living'} m={m} />
      <div style={{ padding: m ? 12 : 18, maxWidth: 700, margin: '0 auto' }}>
        {/* Search + Add */}
        <div style={{ display: 'flex', gap: 10, marginBottom: m ? 12 : 16 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search patients..." style={{ width: '100%', padding: '11px 16px 11px 40px', borderRadius: 12, border: `1.5px solid ${C.bdr}`, fontSize: 14, background: '#fff', boxSizing: 'border-box', fontFamily: 'inherit', outline: 'none' }} />
            <svg style={{ position: 'absolute', left: 13, top: 12 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.dis} strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
          </div>
          <button onClick={onAddPt} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', borderRadius: 12, background: `linear-gradient(135deg,${C.accent},${C.accentD})`, color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap', fontFamily: 'inherit', boxShadow: `0 3px 12px ${C.accentG}` }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
            {m ? 'Add' : 'Add Patient'}
          </button>
        </div>
        {/* Patient count */}
        <div style={{ fontSize: 11, fontWeight: 600, color: C.txT, textTransform: 'uppercase', letterSpacing: .8, marginBottom: 10 }}>{filtered.length} Resident{filtered.length !== 1 ? 's' : ''}</div>
        {/* Patient cards */}
        {filtered.map((p, i) => {
          const cc = codeColor(p);
          const hasTransfer = !!(p.tx && p.tx.reason);
          const returned = !!(p.er && p.er.dx);
          return (
            <div key={i} onClick={() => { setPt(p.id); go(2); }} className="card-hover" style={{ background: '#fff', borderRadius: 14, marginBottom: m ? 9 : 11, display: 'flex', alignItems: 'stretch', border: `1px solid ${C.bdr}30`, cursor: 'pointer', boxShadow: '0 1px 6px rgba(0,0,0,.05)', transition: 'all .2s', overflow: 'hidden' }}>
              {/* Color bar */}
              <div style={{ width: 5, background: cc, flexShrink: 0 }} />
              {/* Content */}
              <div style={{ flex: 1, padding: m ? '13px 12px' : '15px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <Av sz={m ? 38 : 42} init={p.init} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: m ? 14 : 15, fontWeight: 700, color: C.navy }}>{p.name}</span>
                    <span style={{ fontSize: 14 }}>{p.flag}</span>
                    {hasTransfer && !returned && <span style={{ fontSize: 10, fontWeight: 700, background: C.amber, color: '#fff', padding: '2px 7px', borderRadius: 10, letterSpacing: .4 }}>TRANSFER</span>}
                    {returned && <span style={{ fontSize: 10, fontWeight: 700, background: C.green, color: '#fff', padding: '2px 7px', borderRadius: 10, letterSpacing: .4 }}>✓ RETURNED</span>}
                  </div>
                  <div style={{ fontSize: m ? 11 : 12, color: C.txS, marginTop: 3 }}>Room {p.room} · Age {p.age} · {p.hx.slice(0, 3).join(', ')}</div>
                </div>
                <div style={{ flexShrink: 0, textAlign: 'right' }}>
                  <span style={{ display: 'inline-block', padding: '5px 11px', borderRadius: 20, fontSize: m ? 11 : 12, fontWeight: 700, background: cc, color: '#fff', letterSpacing: .2, whiteSpace: 'nowrap' }}>{p.code}</span>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 20px', color: C.dis }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>No patients found</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>Try a different name or room number</div>
          </div>
        )}
      </div>
    </div>
  );
};

// ===== S2 — PATIENT RECORD =====
export const S2 = ({ go, m, p, patients, ptId, setPt, visited }) => (
  <div style={{ minHeight: '100vh', background: C.bg }}>
    <TB m={m} left={<Bk go={go} to={1} label="Patients" />} ctr="Patient Record" right={<PtSwitcher patients={patients} ptId={ptId} setPt={setPt} m={m} />} />
    <Steps cur={0} m={m} />
    <div style={{ padding: m ? 14 : 20, maxWidth: 700, margin: '0 auto' }}>
      <TransferTracker visited={visited} m={m} />
      <PtHd p={p} onQR={() => go(5)} m={m} />
      <AllergyB p={p} m={m} />
      <Sections p={p} m={m} />
      <div style={{ marginTop: 8 }}>
        <Bt full ch="Initiate Transfer to ED" onClick={() => go(3)} m={m} />
      </div>
    </div>
  </div>
);

// ===== S3 — INITIATE TRANSFER =====
export const S3 = ({ go, m, p, update }) => {
  const allSymp = ['Shortness of Breath', 'Chest Pain', 'Altered Mental Status', 'Fall/Injury', 'GI Distress', 'Fever', 'Pain', 'Other'];
  const [reason, setReason] = useState(p.tx.reason);
  const [symp, setSymp] = useState([...p.tx.symp]);
  const [intv, setIntv] = useState(p.tx.intv);
  const [chg, setChg] = useState(p.tx.chg);
  const [dest, setDest] = useState(p.tx.dest || 'Providence Regional Medical Center, Everett');
  const [showDest, setShowDest] = useState(false);
  const dests = ['Providence Regional Medical Center, Everett', 'Swedish Edmonds', 'EvergreenHealth Monroe', 'Harborview Medical Center, Seattle'];
  const toggleSymp = s => setSymp(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const isValid = reason.trim() && symp.length > 0;
  const handleContinue = () => { if (isValid) { update({ reason, symp, intv, chg, dest }); go(4); } };
  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <TB m={m} left={<Bk go={go} to={2} label="Cancel" />} ctr="Initiate Transfer" />
      <Steps cur={1} m={m} />
      <div style={{ padding: m ? 14 : 20, maxWidth: 600, margin: '0 auto' }}>
        <Cd m={m} style={{ borderLeft: `4px solid ${C.amber}` }} ch={<>
          <div style={{ fontSize: 12, color: C.txS, marginBottom: 16 }}>Transfer: {p.tx.time || 'March 20, 2026'} · {p.tx.nurse || 'RN Sarah Mitchell'}</div>
          <SL ch="Reason for Transfer" ic="📝" />
          <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3} style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: `1px solid ${C.bdr}`, fontSize: 14, color: C.tx, background: '#F8F9FB', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box', marginBottom: 16 }} />
          <SL ch="Current Symptoms" ic="🩺" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {allSymp.map((s, i) => {
              const sel = symp.includes(s);
              return <span key={i} onClick={() => toggleSymp(s)} style={{ padding: m ? '10px 14px' : '8px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, background: sel ? C.amber : '#F0F0F0', color: sel ? '#fff' : C.txS, border: sel ? `2px solid ${C.amberD}` : `1px solid ${C.bdr}`, cursor: 'pointer', transition: 'all .15s' }}>{sel ? '✓ ' : ''}{s}</span>;
            })}
          </div>
          <SL ch="Interventions Already Taken" ic="💉" />
          <textarea value={intv} onChange={e => setIntv(e.target.value)} rows={3} style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: `1px solid ${C.bdr}`, fontSize: 14, color: C.tx, background: '#F8F9FB', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box', marginBottom: 16 }} />
          <SL ch="Recent Changes (72h)" ic="📊" />
          <textarea value={chg} onChange={e => setChg(e.target.value)} rows={3} style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: `1px solid ${C.bdr}`, fontSize: 14, color: C.tx, background: '#F8F9FB', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box', marginBottom: 16 }} />
          <SL ch="Destination" ic="🏥" />
          <div style={{ position: 'relative' }}>
            <div onClick={() => setShowDest(!showDest)} style={{ background: '#F8F9FB', borderRadius: 10, padding: '12px 16px', fontSize: 14, border: `1px solid ${showDest ? C.accent : C.bdr}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              <span style={{ fontWeight: 600 }}>{dest}</span><DnA />
            </div>
            {showDest && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, background: '#fff', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,.15)', border: `1px solid ${C.bdr}`, zIndex: 20, overflow: 'hidden' }}>
                {dests.map((d, i) => <div key={i} onClick={() => { setDest(d); setShowDest(false); }} style={{ padding: '12px 16px', fontSize: 13, cursor: 'pointer', background: d === dest ? C.lA : 'transparent', borderBottom: `1px solid ${C.bdr}15`, fontWeight: d === dest ? 600 : 400 }}>{d === dest && '✓ '}{d}</div>)}
              </div>
            )}
          </div>
        </>} />
        <Bt full ch="Generate QR Code and Continue" onClick={handleContinue} m={m} disabled={!isValid} />
        {!isValid && <div style={{ textAlign: 'center', fontSize: 12, color: C.amber, marginTop: 8 }}>Please complete reason and select at least one symptom</div>}
      </div>
    </div>
  );
};

// ===== S4 — CONFIRM TRANSFER =====
export const S4 = ({ go, m, p, patients, ptId, setPt }) => (
  <div style={{ minHeight: '100vh', background: C.bg }}>
    <TB m={m} left={<Bk go={go} to={3} label="Edit" />} ctr="Confirm Transfer" right={<PtSwitcher patients={patients} ptId={ptId} setPt={setPt} m={m} />} />
    <Steps cur={2} m={m} />
    <div style={{ padding: m ? 14 : 20, maxWidth: 700, margin: '0 auto' }}>
      <PtHd p={p} m={m} />
      <AllergyB p={p} m={m} />
      <Sections p={p} tx m={m} />
      <div style={{ display: 'flex', flexDirection: m ? 'column' : 'row', gap: m ? 8 : 12, marginTop: 8 }}>
        <Bt full outline bg={C.txS} ch="Edit Details" onClick={() => go(3)} m={m} />
        <Bt full ch="Confirm and Generate QR" onClick={() => go(5)} m={m} />
      </div>
    </div>
  </div>
);

// ===== S5 — QR READY =====
export const S5 = ({ go, m, p }) => (
  <div style={{ minHeight: '100vh', background: C.bg }}>
    <TB m={m} left={<Bk go={go} to={2} label="Record" />} ctr="QR Code Ready" />
    <Steps cur={3} m={m} />
    <div style={{ padding: m ? 14 : 20, maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
      <Cd m={m} style={{ padding: m ? '24px 16px' : '36px 28px' }} ch={<>
        <Bg ch="⚡ Active Transfer" bg={C.amber} pulse style={{ fontSize: 13, padding: '6px 18px', marginBottom: 24 }} />
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24, position: 'relative' }}>
          <div style={{ position: 'absolute', inset: -20, borderRadius: 999, background: `radial-gradient(circle,${C.accentG},transparent 70%)`, animation: 'qp 2s ease infinite' }} />
          <div style={{ background: '#fff', padding: m ? 14 : 18, borderRadius: 20, border: `2px solid ${C.bdr}`, boxShadow: '0 8px 32px rgba(15,29,47,.1)', position: 'relative' }}>
            <QR sz={m ? 180 : 220} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 6 }}>
          <Av sz={32} init={p.init} /><span style={{ fontSize: m ? 16 : 18, fontWeight: 800, color: C.navy }}>{p.short}</span>
        </div>
        <div style={{ fontSize: 14, color: C.txS, marginBottom: 16 }}>DOB: {p.dob} · Age {p.age}</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          <Bg ch={p.code} bg={p.codeType === 'dnr' ? C.red : C.green} pulse style={{ fontSize: m ? 13 : 14, padding: '6px 14px' }} />
          {p.polst && <Bg ch="✓ POLST" bg={C.green} />}
          <Bg ch={p.flag + ' ' + p.lang} bg={C.accent} />
        </div>
        <div style={{ background: C.lA, borderRadius: 10, padding: 12, fontSize: 13, color: C.txS, lineHeight: 1.7, textAlign: 'left' }}>
          <strong>Transfer to:</strong> {p.tx.dest}<br />
          <strong>Initiated:</strong> {p.tx.time}<br />
          <strong>By:</strong> {p.tx.nurse}
        </div>
      </>} />
      <div style={{ display: 'flex', flexDirection: m ? 'column' : 'row', gap: m ? 8 : 12, marginTop: 4 }}>
        <Bt full outline ch="Print Summary" onClick={() => go(6)} m={m} />
        <Bt full ch="Share Link" onClick={() => alert('Share link copied!')} m={m} />
      </div>
    </div>
  </div>
);

// ===== S6 — PRINT PREVIEW =====
export const S6 = ({ go, m, p }) => {
  const [pr, setPr] = useState(false);
  return (
    <div style={{ minHeight: '100vh', background: '#E0E0E0' }}>
      <TB m={m} left={<Bk go={go} to={5} label="Back" />} ctr="Print Preview" />
      <div style={{ padding: m ? 10 : 20, maxWidth: 680, margin: '0 auto' }}>
        <div style={{ background: '#fff', borderRadius: 4, padding: m ? '16px 12px' : '28px 24px', boxShadow: '0 4px 24px rgba(0,0,0,.12)', fontFamily: "'Courier New',monospace", fontSize: m ? 11 : 12, lineHeight: 1.7, position: 'relative' }}>
          <div style={{ position: 'absolute', top: m ? 10 : 20, right: m ? 10 : 20 }}><QR sz={m ? 48 : 64} /></div>
          <div style={{ fontWeight: 900, fontSize: m ? 11 : 15, textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: 8, marginBottom: 12, paddingRight: m ? 56 : 72 }}>LTC TO ED TRANSFER FORM</div>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? 3 : 6, marginBottom: 10 }}>
            <div><b>Resident:</b> {p.name}</div><div><b>DOB:</b> {p.dob}</div>
            <div><b>Language:</b> {p.lang}</div><div><b>Contact:</b> {p.contact} {p.contactPh}</div>
          </div>
          <div style={{ borderTop: '1px solid #666', paddingTop: 6, marginBottom: 6 }}><b>Code Status:</b> ☑ {p.code} {p.polst && <span><b>POLST:</b> ☑ On File</span>}</div>
          <div><b>Allergies:</b> <span style={{ color: 'red' }}>{p.allergy.join(', ')}</span></div>
          <div style={{ wordBreak: 'break-word' }}><b>Meds:</b> {p.meds.map(x => x.n + ' ' + x.f).join('; ')}</div>
          <div><b>Hx:</b> {p.hx.join(', ')}</div>
          <div style={{ borderTop: '1px solid #666', paddingTop: 6, marginTop: 6 }}><b>Reason:</b> {p.tx.reason}<br /><b>Dest:</b> {p.tx.dest}</div>
          <div style={{ marginTop: 8, padding: 8, background: '#FFF8E1', borderRadius: 4, border: '1px solid #FFF59D', fontSize: 11 }}><b>Person-Centered Care Notes:</b> {p.comfort.comm} {p.comfort.dist}</div>
          <div style={{ borderTop: '2px solid #000', paddingTop: 6, marginTop: 10 }}>
            <div style={{ fontWeight: 900 }}>ED RETURN (To be completed by ED)</div>
            <div style={{ color: '#999' }}>Diagnosis: ___ BP: ___ P: ___ RR: ___ SPO2: ___</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          {pr ? <div style={{ color: C.green, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><Chk s={20} c={C.green} /> Sent to printer</div>
            : <>
              <Bt ch="🖨 Print" onClick={() => { setPr(true); setTimeout(() => setPr(false), 2000); }} m={m} />
              <Bt ch="📄 Download PDF" outline onClick={() => alert('PDF downloaded (simulated)')} m={m} />
              <Bt ch="📠 Send via Fax" outline bg={C.txS} onClick={() => alert('Sent to (425) 555-0312 (simulated)')} m={m} />
            </>}
        </div>
      </div>
    </div>
  );
};

// ===== S7 / S9 — SCANNERS =====
export const S7 = ({ go, m }) => <Scanner label="TransferLink | EMS Scan" onDone={() => go(8)} m={m} />;
export const S9 = ({ go, m }) => <Scanner label="TransferLink | ED Scan" onDone={() => go(10)} m={m} />;

// ===== S8 — EMS VIEW =====
export const S8 = ({ go, m, p, patients, ptId, setPt }) => {
  const [pol, setPol] = useState(false);
  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      {pol && p.polst && <POLST p={p} onClose={() => setPol(false)} m={m} />}
      <TB m={m} left={<Bk go={go} to={0} label="Home" />} ctr={m ? 'EMS View' : 'TransferLink | EMS'} accent={C.amber} right={<PtSwitcher patients={patients} ptId={ptId} setPt={setPt} m={m} />} />
      <div style={{ padding: m ? 14 : 20, maxWidth: 700, margin: '0 auto' }}>
        <CodeBanner p={p} lg m={m} />
        <AllergyB p={p} m={m} />
        <PtHd p={p} m={m} />
        <Sections p={p} tx m={m} comfortOpen={true} />
        {p.polst && <Bt full bg={C.red} ch="View POLST" onClick={() => setPol(true)} m={m} />}
        <div style={{ textAlign: 'center', fontSize: 12, color: C.dis, marginTop: 16 }}>📡 QR scan access · Read-only</div>
      </div>
    </div>
  );
};

// ===== S10 — ED VIEW =====
export const S10 = ({ go, m, p, patients, ptId, setPt }) => {
  const [pol, setPol] = useState(false);
  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      {pol && p.polst && <POLST p={p} onClose={() => setPol(false)} m={m} />}
      <TB m={m} left={<Bk go={go} to={0} label="Home" />} ctr={m ? 'ED View' : 'TransferLink | ED'} accent={C.green} right={<PtSwitcher patients={patients} ptId={ptId} setPt={setPt} m={m} />} />
      <div style={{ padding: m ? 14 : 20, maxWidth: 700, margin: '0 auto' }}>
        <CodeBanner p={p} lg m={m} />
        <AllergyB p={p} m={m} />
        <PtHd p={p} m={m} />
        <Sections p={p} tx m={m} comfortOpen={true} />
        <div style={{ display: 'flex', flexDirection: m ? 'column' : 'row', gap: m ? 8 : 12, marginTop: 8 }}>
          {p.polst && <Bt full outline bg={C.red} ch="View POLST" onClick={() => setPol(true)} m={m} />}
          <Bt full ch="Complete ED Return Info" onClick={() => go(11)} m={m} />
        </div>
      </div>
    </div>
  );
};
