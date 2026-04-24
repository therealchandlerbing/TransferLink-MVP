import React, { useState } from 'react';
import { C, Chk, DnA, QR, Bg, Av, Cd, Bt, SL, TB, Bk, FR, TxIn, BellIco, MedSourceBadge, ProgressMeter, SecH } from './components.jsx';
import { AllergyB, CodeBanner, PtHd, Steps, TransferTracker, PtSwitcher, POLST, Scanner, Sections, ComfortSection, MedImportModal } from './clinical.jsx';

// ===== S0 — HOME =====
export const S0 = ({ go, m, onStartDemo }) => {
  const rs = [
    { s: 1,  i: '📋', t: 'LTC Nurse',       d: 'Initiate a transfer',   c: C.accent },
    { s: 7,  i: '🚑', t: 'EMS Crew',         d: 'Scan on transport',     c: C.amber  },
    { s: 9,  i: '🏥', t: 'ED Staff',          d: 'Receive a patient',     c: C.green  },
    { s: 13, i: '🏠', t: 'Facility Return',   d: 'Patient is back',       c: C.purple },
  ];
  const nav2 = [
    { s: 15, i: '🔐', t: 'Login',       c: '#546E7A' },
    { s: 17, i: '📊', t: 'Dashboard',   c: '#0097A7' },
    { s: 19, i: '📋', t: 'SBAR',        c: '#7B1FA2' },
    { s: 20, i: '🔌', t: 'Integrations', c: '#2A9D8F' },
  ];

  const stats = [
    { n: '88%',  label: 'Want 3–5 minute completion', sub: 'Time was the top barrier' },
    { n: '9–50+', label: 'Active meds per resident', sub: 'Why transcription fails' },
    { n: '100%', label: 'Return loops tracked',       sub: 'Submitted → Ack → Closed' },
  ];

  const stories = [
    {
      tag: 'Committee Priority · Medication Accuracy',
      color: C.accent,
      body: 'Brenda on the workgroup flagged medication transcription as the largest error source — facilities may have 9 to 50+ active meds per resident. This build imports the medication list from PDF, photo, or PointClickCare. Every record shows a verified source and timestamp.',
      resolution: 'No retyping under pressure. Source travels with the patient.',
    },
    {
      tag: 'Committee Priority · Closed-Loop Return',
      color: C.green,
      body: 'Donald pushed back on the return being a "nice-to-have screen." The ED return now moves through four tracked states — submitted, notified, acknowledged, closed — with an acknowledgement action at the facility and a push-notification banner until the nurse taps ack.',
      resolution: 'Return documentation is automatic, not passive.',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(160deg,${C.navy},#1A2B45 45%,#22395E)`, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: m ? '28px 16px 36px' : '40px 32px 48px', position: 'relative' }}>
      {/* Subtle dot grid */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px,rgba(255,255,255,.025) 1px,transparent 0)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

      {/* ── HEADER ── */}
      <div style={{ textAlign: 'center', marginBottom: m ? 20 : 28, position: 'relative', maxWidth: 540, width: '100%' }}>
        <div style={{ fontSize: m ? 10 : 11, fontWeight: 700, letterSpacing: 3.5, color: C.accent, textTransform: 'uppercase', marginBottom: 14 }}>
          DNP Research · WA State · 2026
        </div>
        <div style={{ fontFamily: "'Manrope','Inter',sans-serif", fontSize: m ? 34 : 48, fontWeight: 900, color: '#fff', letterSpacing: -1.5, lineHeight: 1 }}>
          Transfer<span style={{ color: C.accent }}>Link</span>
        </div>
        <div style={{ fontSize: m ? 13 : 15, color: 'rgba(255,255,255,.5)', marginTop: 12, letterSpacing: .1 }}>
          One patient. One record. Every handoff.
        </div>
      </div>

      {/* ── STATS ROW ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: m ? 8 : 12, maxWidth: 540, width: '100%', marginBottom: m ? 16 : 20, position: 'relative' }}>
        {stats.map((st, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,.06)', borderRadius: m ? 12 : 14, padding: m ? '12px 8px' : '16px 12px', textAlign: 'center', border: '1px solid rgba(255,255,255,.07)' }}>
            <div style={{ fontFamily: "'Manrope','Inter',sans-serif", fontSize: m ? 20 : 26, fontWeight: 900, color: C.accent, lineHeight: 1 }}>{st.n}</div>
            <div style={{ fontSize: m ? 9 : 10, fontWeight: 700, color: 'rgba(255,255,255,.7)', marginTop: 5, lineHeight: 1.35 }}>{st.label}</div>
            <div style={{ fontSize: m ? 8 : 9, color: 'rgba(255,255,255,.3)', marginTop: 3 }}>{st.sub}</div>
          </div>
        ))}
      </div>

      {/* ── CLINICAL STORIES ── */}
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? 8 : 12, maxWidth: 540, width: '100%', marginBottom: m ? 16 : 22, position: 'relative' }}>
        {stories.map((st, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,.05)', borderRadius: m ? 12 : 14, padding: m ? '14px 13px' : '18px 16px', borderLeft: `3px solid ${st.color}55` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: st.color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8 }}>{st.tag}</div>
            <div style={{ fontSize: m ? 11 : 12, color: 'rgba(255,255,255,.62)', lineHeight: 1.65, marginBottom: 10 }}>{st.body}</div>
            <div style={{ fontSize: m ? 10 : 11, color: 'rgba(255,255,255,.88)', fontWeight: 600, lineHeight: 1.45 }}>→ {st.resolution}</div>
          </div>
        ))}
        <div style={{ gridColumn: '1 / -1', fontSize: m ? 9 : 10, color: 'rgba(255,255,255,.25)', textAlign: 'center', marginTop: 4, lineHeight: 1.5 }}>
          Composite accounts based on clinician survey responses. No individual patient is identified.
        </div>
      </div>

      {/* ── ROLE CARDS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: m ? 10 : 14, maxWidth: 540, width: '100%', position: 'relative' }}>
        {rs.map(r => (
          <div key={r.s} onClick={() => go(r.s)} className="hover-scale" style={{ background: 'rgba(255,255,255,.07)', backdropFilter: 'blur(16px)', border: `1px solid ${r.c}28`, borderRadius: m ? 18 : 20, padding: m ? '20px 14px 18px' : '26px 20px 22px', cursor: 'pointer', textAlign: 'center', transition: 'all .25s', position: 'relative', overflow: 'hidden', boxShadow: `0 4px 24px ${r.c}0d` }}>
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

      {/* ── SECONDARY NAV ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: m ? 7 : 10, maxWidth: 540, width: '100%', marginTop: m ? 10 : 13, position: 'relative' }}>
        {nav2.map(n => (
          <div key={n.s} onClick={() => go(n.s)} style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)', borderBottom: `2px solid ${n.c}55`, borderRadius: 12, padding: m ? '11px 6px' : '12px 10px', cursor: 'pointer', textAlign: 'center', transition: 'all .2s' }}>
            <div style={{ fontSize: m ? 15 : 17, marginBottom: 3 }}>{n.i}</div>
            <div style={{ fontSize: m ? 9 : 10, fontWeight: 700, color: 'rgba(255,255,255,.65)', letterSpacing: .3 }}>{n.t}</div>
          </div>
        ))}
      </div>

      {/* ── DEMO CTA ── */}
      <div style={{ marginTop: m ? 18 : 26, position: 'relative' }}>
        <button onClick={onStartDemo} style={{ padding: m ? '13px 28px' : '14px 36px', borderRadius: 14, background: `linear-gradient(135deg,${C.accent},${C.accentD})`, color: '#fff', border: 'none', fontSize: m ? 14 : 15, fontWeight: 700, cursor: 'pointer', boxShadow: `0 4px 20px rgba(27,154,170,.35)`, fontFamily: 'inherit', letterSpacing: .2 }}>
          ▶ Start Guided Tour — Follow a Transfer
        </button>
      </div>

      {/* ── FOOTER ATTRIBUTION ── */}
      <div style={{ marginTop: m ? 20 : 28, textAlign: 'center', position: 'relative', maxWidth: 480 }}>
        <div style={{ fontSize: m ? 10 : 11, color: 'rgba(255,255,255,.28)', lineHeight: 1.9 }}>
          Research: Lily Schroeder, DNP Candidate · ER Nurse, 12+ years<br />
          WA State LTC Transformation Workgroup · 360 Social Impact Studios
        </div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,.15)', marginTop: 6 }}>
          Prototype demonstration · No real patient data
        </div>
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
export const S2 = ({ go, m, p, patients, ptId, setPt, visited, importMedSource }) => {
  const [medOpen, setMedOpen] = useState(false);
  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <TB m={m} left={<Bk go={go} to={1} label="Patients" />} ctr="Patient Record" right={<PtSwitcher patients={patients} ptId={ptId} setPt={setPt} m={m} />} />
      <Steps cur={0} m={m} />
      <MedImportModal open={medOpen} onClose={() => setMedOpen(false)} onImport={(src) => importMedSource && importMedSource(src)} currentSource={p.medSource} m={m} />
      <div style={{ padding: m ? 14 : 20, maxWidth: 700, margin: '0 auto' }}>
        <TransferTracker visited={visited} m={m} />
        <PtHd p={p} onQR={() => go(5)} m={m} />
        <AllergyB p={p} m={m} />
        <Sections p={p} m={m} onImportMeds={() => setMedOpen(true)} />
        <div style={{ marginTop: 8 }}>
          <Bt full ch="Initiate Transfer to ED" onClick={() => go(3)} m={m} />
        </div>
      </div>
    </div>
  );
};

// ===== S3 — INITIATE TRANSFER (5-minute mode) =====
export const S3 = ({ go, m, p, update, importMedSource }) => {
  const allSymp = ['Shortness of Breath', 'Chest Pain', 'Altered Mental Status', 'Fall/Injury', 'GI Distress', 'Fever', 'Pain', 'Other'];
  const [reason, setReason] = useState(p.tx.reason);
  const [symp, setSymp] = useState([...p.tx.symp]);
  const [intv, setIntv] = useState(p.tx.intv);
  const [chg, setChg] = useState(p.tx.chg);
  const [dest, setDest] = useState(p.tx.dest || 'Providence Regional Medical Center, Everett');
  const [showDest, setShowDest] = useState(false);
  const [safetyOk, setSafetyOk] = useState(false);
  const [showSecondary, setShowSecondary] = useState(false);
  const [medOpen, setMedOpen] = useState(false);
  const dests = ['Providence Regional Medical Center, Everett', 'Swedish Edmonds', 'EvergreenHealth Monroe', 'Harborview Medical Center, Seattle'];
  const toggleSymp = s => setSymp(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const isValid = reason.trim() && symp.length > 0 && chg.trim() && safetyOk;
  // progress meter: five essential fields
  const filled = [reason.trim(), symp.length > 0, chg.trim(), dest.trim(), safetyOk].filter(Boolean).length;
  const pct = (filled / 5) * 100;
  const est = filled === 5 ? 'Ready in under 5 min' : filled >= 3 ? '< 2 min remaining' : filled >= 1 ? '< 4 min remaining' : 'Starts now';
  const handleContinue = () => { if (isValid) { update({ reason, symp, intv, chg, dest }); go(4); } };
  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <TB m={m} left={<Bk go={go} to={2} label="Cancel" />} ctr="Initiate Transfer" />
      <Steps cur={1} m={m} />
      <MedImportModal open={medOpen} onClose={() => setMedOpen(false)} onImport={(src) => importMedSource && importMedSource(src)} currentSource={p.medSource} m={m} />
      <div style={{ padding: m ? 14 : 20, maxWidth: 620, margin: '0 auto' }}>
        <ProgressMeter pct={pct} est={est} label="Transfer in under 5 minutes" />
        <div style={{ background: C.lA, border: `1px solid ${C.accent}30`, borderRadius: 10, padding: '8px 12px', marginBottom: 12, fontSize: 11, color: C.accentD, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>ℹ️</span><span>Baseline already in record: <strong>{p.meds.length} meds</strong> · {p.hx.slice(0, 3).join(' · ')} · {p.code}</span>
        </div>
        <Cd m={m} style={{ borderLeft: `4px solid ${C.amber}` }} ch={<>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: C.amberD, textTransform: 'uppercase', marginBottom: 4 }}>Essential · add only what changed</div>
          <div style={{ fontSize: 12, color: C.txS, marginBottom: 16 }}>Transfer: {p.tx.time || 'now'} · {p.tx.nurse || 'RN Sarah Mitchell'}</div>
          <SL ch="Reason for Transfer" ic="📝" />
          <textarea value={reason} onChange={e => setReason(e.target.value)} rows={2} placeholder="One sentence — what's happening right now" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: `1px solid ${C.bdr}`, fontSize: 14, color: C.tx, background: '#F8F9FB', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box', marginBottom: 16 }} />
          <SL ch="Current Symptoms" ic="🩺" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {allSymp.map((s, i) => {
              const sel = symp.includes(s);
              return <span key={i} onClick={() => toggleSymp(s)} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSymp(s); } }} style={{ padding: m ? '10px 14px' : '8px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, background: sel ? C.amber : '#F0F0F0', color: sel ? '#fff' : C.txS, border: sel ? `2px solid ${C.amberD}` : `1px solid ${C.bdr}`, cursor: 'pointer', transition: 'all .15s' }}>{sel ? '✓ ' : ''}{s}</span>;
            })}
          </div>
          <SL ch="Recent Change (72h)" ic="📊" />
          <textarea value={chg} onChange={e => setChg(e.target.value)} rows={2} placeholder="What's different in the last 72 hours" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: `1px solid ${C.bdr}`, fontSize: 14, color: C.tx, background: '#F8F9FB', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box', marginBottom: 16 }} />
          <SL ch="Destination" ic="🏥" />
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <div onClick={() => setShowDest(!showDest)} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setShowDest(!showDest); } }} style={{ background: '#F8F9FB', borderRadius: 10, padding: '12px 16px', fontSize: 14, border: `1px solid ${showDest ? C.accent : C.bdr}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              <span style={{ fontWeight: 600 }}>{dest}</span><DnA />
            </div>
            {showDest && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, background: '#fff', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,.15)', border: `1px solid ${C.bdr}`, zIndex: 20, overflow: 'hidden' }}>
                {dests.map((d, i) => <div key={i} onClick={() => { setDest(d); setShowDest(false); }} style={{ padding: '12px 16px', fontSize: 13, cursor: 'pointer', background: d === dest ? C.lA : 'transparent', borderBottom: `1px solid ${C.bdr}15`, fontWeight: d === dest ? 600 : 400 }}>{d === dest && '✓ '}{d}</div>)}
              </div>
            )}
          </div>

          {/* Medication source verification */}
          <SL ch="Medications — source" ic="💊" />
          <div style={{ background: p.medSource ? C.lG : C.lW, border: `1px solid ${p.medSource ? C.green + '40' : C.amber + '60'}`, borderRadius: 10, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 18 }}>{p.medSource ? '✅' : '⚠️'}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              {p.medSource
                ? <><div style={{ fontSize: 12, fontWeight: 700, color: C.greenD }}>{p.medSource.label} · {p.medSource.count} meds</div><div style={{ fontSize: 11, color: C.txS }}>{p.medSource.file ? p.medSource.file + ' · ' : ''}Imported {p.medSource.importedAt}</div></>
                : <><div style={{ fontSize: 12, fontWeight: 700, color: C.amberD }}>No medication source attached</div><div style={{ fontSize: 11, color: C.txS }}>Committee priority: do not retype under pressure</div></>}
            </div>
            <button onClick={() => setMedOpen(true)} style={{ fontSize: 12, fontWeight: 700, padding: '6px 10px', background: p.medSource ? '#fff' : C.amber, color: p.medSource ? C.accentD : '#fff', border: `1px solid ${p.medSource ? C.accent : C.amberD}`, borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit' }}>{p.medSource ? 'Update' : 'Attach'}</button>
          </div>

          {/* Safety confirmation */}
          <SL ch="Confirm critical safety data" ic="🛡️" />
          <div onClick={() => setSafetyOk(!safetyOk)} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSafetyOk(!safetyOk); } }} style={{ cursor: 'pointer', border: `1.5px solid ${safetyOk ? C.green : C.bdr}`, background: safetyOk ? C.lG : '#F8F9FB', borderRadius: 10, padding: '10px 12px', display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${safetyOk ? C.green : C.bdr}`, background: safetyOk ? C.green : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{safetyOk && <Chk s={14} />}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.navy }}>I confirm {p.code} · {p.polst ? 'POLST on file · ' : ''}{p.lang}{p.interpreter ? ' (interpreter needed) · ' : ' · '}{p.allergy.length ? p.allergy.join(', ') : 'NKA'}</div>
              <div style={{ fontSize: 11, color: C.txS, marginTop: 2 }}>Tap to confirm these travel with the patient. Edit in the record if wrong.</div>
            </div>
          </div>
        </>} />

        <Cd m={m} ch={<>
          <div onClick={() => setShowSecondary(!showSecondary)} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setShowSecondary(!showSecondary); } }} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>Optional · interventions and details</div>
              <div style={{ fontSize: 11, color: C.txS, marginTop: 2 }}>Not required for transfer. Add if helpful for EMS / ED.</div>
            </div>
            <span style={{ color: C.txS, fontWeight: 700, fontSize: 13 }}>{showSecondary ? '− Hide' : '+ Expand'}</span>
          </div>
          {showSecondary && (
            <div style={{ marginTop: 12 }}>
              <SL ch="Interventions Already Taken" ic="💉" />
              <textarea value={intv} onChange={e => setIntv(e.target.value)} rows={3} style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: `1px solid ${C.bdr}`, fontSize: 14, color: C.tx, background: '#F8F9FB', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box', marginBottom: 4 }} />
              <div style={{ fontSize: 11, color: C.txT, marginTop: 6 }}>Baseline mentation, functional status, devices, risks, and person-centered preferences all travel automatically from the record.</div>
            </div>
          )}
        </>} />

        <Bt full ch={isValid ? 'Generate QR and Continue' : `Complete ${5 - filled} more field${5 - filled === 1 ? '' : 's'}`} onClick={handleContinue} m={m} disabled={!isValid} />
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

// ===== S5 — QR HANDOFF TOOLKIT =====
export const S5 = ({ go, m, p }) => {
  const [fmt, setFmt] = useState('mobile');
  const [shared, setShared] = useState(false);
  const eventId = p.tx.eventId || 'TXF-2026-0320-' + (p.init || 'XX');
  const shortLink = 'tl.link/' + (p.init || 'xx') + eventId.slice(-4);
  const formats = [
    { id: 'mobile', label: 'Mobile / Tablet', ic: '📱', sub: 'Display on nurse or medic device' },
    { id: 'print', label: 'Printed Sheet', ic: '🖨️', sub: 'Paper hand-off with QR in corner' },
    { id: 'wristband', label: 'Wristband Label', ic: '⌚', sub: 'Travels on the patient' },
  ];
  return (
  <div style={{ minHeight: '100vh', background: C.bg }}>
    <TB m={m} left={<Bk go={go} to={2} label="Record" />} ctr="QR Handoff Toolkit" />
    <Steps cur={3} m={m} />
    <div style={{ padding: m ? 14 : 20, maxWidth: 620, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: m ? 6 : 10, marginBottom: m ? 12 : 16 }}>
        {formats.map(f => (
          <div key={f.id} onClick={() => setFmt(f.id)} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFmt(f.id); } }} style={{ background: fmt === f.id ? C.navy : '#fff', color: fmt === f.id ? '#fff' : C.tx, border: `1.5px solid ${fmt === f.id ? C.navy : C.bdr}`, borderRadius: 12, padding: m ? '10px 8px' : '14px 10px', textAlign: 'center', cursor: 'pointer', transition: 'all .2s' }}>
            <div style={{ fontSize: m ? 18 : 22 }}>{f.ic}</div>
            <div style={{ fontSize: m ? 11 : 12, fontWeight: 700, marginTop: 4 }}>{f.label}</div>
            {!m && <div style={{ fontSize: 10, color: fmt === f.id ? 'rgba(255,255,255,.65)' : C.txT, marginTop: 2 }}>{f.sub}</div>}
          </div>
        ))}
      </div>

      {fmt === 'mobile' && (
        <Cd m={m} style={{ padding: m ? '20px 14px' : '32px 24px', textAlign: 'center' }} ch={<>
          <Bg ch="⚡ Active Transfer" bg={C.amber} pulse style={{ fontSize: 13, padding: '6px 18px', marginBottom: 18 }} />
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: -20, borderRadius: 999, background: `radial-gradient(circle,${C.accentG},transparent 70%)`, animation: 'qp 2s ease infinite' }} />
            <div style={{ background: '#fff', padding: m ? 14 : 18, borderRadius: 20, border: `2px solid ${C.bdr}`, boxShadow: '0 8px 32px rgba(15,29,47,.1)', position: 'relative' }}>
              <QR sz={m ? 180 : 220} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 6 }}>
            <Av sz={32} init={p.init} /><span style={{ fontSize: m ? 16 : 18, fontWeight: 800, color: C.navy }}>{p.short}</span>
          </div>
          <div style={{ fontSize: 13, color: C.txS, marginBottom: 12 }}>DOB: {p.dob} · Age {p.age}</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
            <Bg ch={p.code} bg={p.codeType === 'dnr' ? C.red : C.green} pulse style={{ fontSize: m ? 13 : 14, padding: '6px 14px' }} />
            {p.polst && <Bg ch="✓ POLST" bg={C.green} />}
            <Bg ch={p.flag + ' ' + p.lang + (p.interpreter ? ' · interpreter' : '')} bg={C.accent} />
          </div>
        </>} />
      )}

      {fmt === 'print' && (
        <Cd m={m} style={{ padding: m ? '14px 10px' : '18px 16px', background: '#FAFAF8' }} ch={<>
          <div style={{ background: '#fff', padding: m ? 14 : 18, borderRadius: 6, border: `1px solid ${C.bdr}`, fontFamily: "'Courier New',monospace", fontSize: m ? 11 : 12, position: 'relative' }}>
            <div style={{ position: 'absolute', top: m ? 10 : 14, right: m ? 10 : 14 }}><QR sz={m ? 60 : 80} /></div>
            <div style={{ fontWeight: 900, fontSize: m ? 12 : 14, textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: 6, marginBottom: 10, paddingRight: m ? 66 : 92 }}>LTC → ED TRANSFER SHEET</div>
            <div><b>Resident:</b> {p.name}</div>
            <div><b>DOB:</b> {p.dob} · <b>Age:</b> {p.age} · <b>Room:</b> {p.room}</div>
            <div><b>Language:</b> {p.lang}{p.interpreter ? ' · Interpreter needed' : ''}</div>
            <div><b>Code:</b> {p.code}{p.polst ? ' · POLST on file' : ''}</div>
            <div><b>Allergies:</b> <span style={{ color: 'red' }}>{p.allergy.join(', ') || 'NKA'}</span></div>
            <div><b>Reason:</b> {p.tx.reason}</div>
            <div><b>Destination:</b> {p.tx.dest}</div>
            <div style={{ marginTop: 6, paddingTop: 6, borderTop: '1px dashed #999', fontSize: m ? 9 : 10 }}>Event {eventId} · fallback: {shortLink}</div>
          </div>
          <Bt full ch="Full print preview" onClick={() => go(6)} m={m} style={{ marginTop: 10 }} outline />
        </>} />
      )}

      {fmt === 'wristband' && (
        <Cd m={m} style={{ padding: m ? '14px 10px' : '18px 14px' }} ch={<>
          <div style={{ background: `linear-gradient(180deg,#fff,#FAFAF8)`, border: `1.5px solid ${C.bdr}`, borderRadius: 12, padding: m ? 12 : 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flexShrink: 0 }}><QR sz={m ? 64 : 84} /></div>
            <div style={{ flex: 1, minWidth: 0, borderLeft: `2px solid ${C.bdr}`, paddingLeft: 12 }}>
              <div style={{ fontSize: m ? 13 : 15, fontWeight: 800, color: C.navy, lineHeight: 1.15 }}>{p.name}</div>
              <div style={{ fontSize: m ? 11 : 12, color: C.txS, marginTop: 2 }}>DOB {p.dob}</div>
              <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 4, background: p.codeType === 'dnr' ? C.red : C.green, color: '#fff' }}>{p.code}</span>
                {p.allergy.length > 0 && <span style={{ fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 4, background: C.red, color: '#fff' }}>ALLERGY</span>}
                <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: '#333', color: '#fff' }}>{p.lang.slice(0, 3).toUpperCase()}</span>
              </div>
              <div style={{ fontSize: 8, color: C.txT, marginTop: 6, fontFamily: 'monospace' }}>{eventId}</div>
            </div>
          </div>
          <div style={{ fontSize: 11, color: C.txS, textAlign: 'center', marginTop: 10 }}>Wristband prints to Zebra ZD410 or similar. QR stays with the patient through EMS and ED.</div>
        </>} />
      )}

      {/* Backup + access story */}
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: 10, marginTop: 12 }}>
        <Cd m={m} ch={<>
          <SL ch="Scanning fallback" ic="🔗" />
          <div style={{ fontSize: 12, color: C.txS, marginBottom: 6 }}>If the camera cannot read the QR on the first try:</div>
          <div style={{ background: C.lA, borderRadius: 10, padding: '8px 10px', fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color: C.accentD, textAlign: 'center' }}>{shortLink}</div>
          <div style={{ fontSize: 11, color: C.txT, marginTop: 6 }}>Event ID <code style={{ fontSize: 11 }}>{eventId}</code> can also be typed on any TransferLink sign-in.</div>
        </>} />
        <Cd m={m} ch={<>
          <SL ch="Access scope" ic="🔐" />
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 10, background: C.lA, color: C.accentD }}>🚑 EMS</span>
            <span style={{ fontSize: 12, color: C.txS }}>read-only</span>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 10, background: C.lA, color: C.accentD }}>🏥 ED triage</span>
            <span style={{ fontSize: 12, color: C.txS }}>read-only</span>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 10, background: C.lG, color: C.greenD }}>🏥 ED return</span>
            <span style={{ fontSize: 12, color: C.txS }}>write — closes the loop</span>
          </div>
        </>} />
      </div>

      <div style={{ display: 'flex', flexDirection: m ? 'column' : 'row', gap: m ? 8 : 12, marginTop: 12 }}>
        <Bt full outline ch="QR scan test" onClick={() => go(7)} m={m} />
        <Bt full ch={shared ? '✓ Link copied' : 'Copy fallback link'} bg={shared ? C.green : C.accent} onClick={() => { try { navigator.clipboard && navigator.clipboard.writeText(shortLink); } catch { /* clipboard not available */ } setShared(true); setTimeout(() => setShared(false), 1800); }} m={m} />
      </div>
    </div>
  </div>
  );
};

// ===== S6 — PRINT PREVIEW =====
export const S6 = ({ go, m, p }) => {
  const [pr, setPr] = useState(false);
  const [pdf, setPdf] = useState(false);
  const [fax, setFax] = useState(false);
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
              <Bt ch={pdf ? '✓ Downloaded' : '📄 Download PDF'} outline bg={pdf ? C.green : undefined} onClick={() => { setPdf(true); setTimeout(() => setPdf(false), 2000); }} m={m} />
              <Bt ch={fax ? '✓ Fax Sent' : '📠 Send via Fax'} outline bg={fax ? C.green : C.txS} onClick={() => { setFax(true); setTimeout(() => setFax(false), 2000); }} m={m} />
            </>}
        </div>
      </div>
    </div>
  );
};

// ===== S7 / S9 — SCANNERS =====
export const S7 = ({ go, m }) => <Scanner label="TransferLink | EMS Scan" onDone={() => go(8)} m={m} />;
export const S9 = ({ go, m }) => <Scanner label="TransferLink | ED Scan" onDone={() => go(10)} m={m} />;

// ===== EMS / ED "first 30 seconds" triage panel =====
const TriagePanel = ({ p, m, tone = 'amber' }) => {
  const c = tone === 'green' ? C.green : C.amber;
  const cD = tone === 'green' ? C.greenD : C.amberD;
  return (
    <div style={{ background: '#fff', border: `2px solid ${c}`, borderRadius: 14, padding: m ? 12 : 16, marginBottom: m ? 10 : 14, boxShadow: `0 4px 16px ${c}22` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: cD, letterSpacing: 1.4, textTransform: 'uppercase' }}>First 30 Seconds</div>
        <span style={{ fontSize: 10, color: C.txT, fontFamily: 'monospace' }}>{p.tx?.eventId || ''}</span>
      </div>
      <div style={{ display: 'flex', gap: m ? 10 : 14, alignItems: 'center', marginBottom: 10 }}>
        <Av sz={m ? 44 : 52} init={p.init} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: m ? 16 : 19, fontWeight: 900, color: C.navy, letterSpacing: -.3 }}>{p.name}</div>
          <div style={{ fontSize: 12, color: C.txS }}>DOB {p.dob} · Age {p.age} · Room {p.room}</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
        <Bg ch={p.code} bg={p.codeType === 'dnr' ? C.red : C.green} pulse style={{ fontSize: 12, padding: '5px 12px' }} />
        {p.polst && <Bg ch="✓ POLST" bg={C.green} />}
        <Bg ch={p.flag + ' ' + p.lang + (p.interpreter ? ' · interpreter' : '')} bg={C.accent} />
        {p.allergy.length > 0 ? <Bg ch={'⚠ ' + p.allergy.join(', ')} bg={C.red} /> : <Bg ch="NKA" bg={C.green} />}
      </div>
      <div style={{ background: C.lW, borderRadius: 10, padding: '8px 12px', marginBottom: 8 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.amberD, textTransform: 'uppercase', letterSpacing: .8, marginBottom: 2 }}>Reason for transfer</div>
        <div style={{ fontSize: 13, color: C.tx, lineHeight: 1.5 }}>{p.tx?.reason || '—'}</div>
      </div>
      {p.tx?.lastVitals && (
        <div style={{ background: C.lA, borderRadius: 10, padding: '8px 12px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.accentD, textTransform: 'uppercase', letterSpacing: .8, marginBottom: 2 }}>Last known vitals / status</div>
          <div style={{ fontSize: 13, color: C.tx, fontWeight: 600 }}>{p.tx.lastVitals}</div>
        </div>
      )}
    </div>
  );
};

// ===== S8 — EMS VIEW =====
export const S8 = ({ go, m, p, patients, ptId, setPt }) => {
  const [pol, setPol] = useState(false);
  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      {pol && p.polst && <POLST p={p} onClose={() => setPol(false)} m={m} />}
      <TB m={m} left={<Bk go={go} to={0} label="Home" />} ctr={m ? 'EMS View' : 'TransferLink | EMS'} accent={C.amber} right={<PtSwitcher patients={patients} ptId={ptId} setPt={setPt} m={m} />} />
      <div style={{ padding: m ? 14 : 20, maxWidth: 700, margin: '0 auto' }}>
        <TriagePanel p={p} m={m} tone="amber" />
        {/* Person-centered operational surface: triggers + calming */}
        {(p.comfort?.triggers || p.comfort?.calming) && (
          <Cd m={m} style={{ borderLeft: `4px solid ${C.purple}`, background: '#FCFAFF' }} ch={<>
            <SL ch="Behavior notes for transport" ic="💜" />
            {p.comfort?.triggers && <FR l="Triggers to avoid" v={p.comfort.triggers} />}
            {p.comfort?.calming && <FR l="Calming strategies" v={p.comfort.calming} />}
          </>} />
        )}
        {p.polst && <Bt full bg={C.red} ch="View POLST" onClick={() => setPol(true)} m={m} />}
        <Sections p={p} tx m={m} comfortOpen={false} />
        <div style={{ textAlign: 'center', fontSize: 12, color: C.dis, marginTop: 16 }}>📡 QR scan access · Read-only · Event {p.tx?.eventId}</div>
      </div>
    </div>
  );
};

// ===== S10 — ED TRIAGE VIEW =====
export const S10 = ({ go, m, p, patients, ptId, setPt }) => {
  const [pol, setPol] = useState(false);
  const [deep, setDeep] = useState(false);
  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      {pol && p.polst && <POLST p={p} onClose={() => setPol(false)} m={m} />}
      <TB m={m} left={<Bk go={go} to={0} label="Home" />} ctr={m ? 'ED Triage' : 'TransferLink | ED Triage'} accent={C.green} right={<PtSwitcher patients={patients} ptId={ptId} setPt={setPt} m={m} />} />
      <div style={{ padding: m ? 14 : 20, maxWidth: 700, margin: '0 auto' }}>
        <TriagePanel p={p} m={m} tone="green" />

        <div style={{ display: 'flex', flexDirection: m ? 'column' : 'row', gap: m ? 8 : 10, marginBottom: 12 }}>
          {p.polst && <Bt full outline bg={C.red} ch="📄 View POLST" onClick={() => setPol(true)} m={m} />}
          <Bt full ch="Complete ED Return Info" onClick={() => go(11)} m={m} />
        </div>

        {/* Second layer toggle */}
        <div onClick={() => setDeep(!deep)} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setDeep(!deep); } }} style={{ cursor: 'pointer', background: '#fff', border: `1px solid ${C.bdr}`, borderRadius: 12, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>{deep ? 'Hide' : 'Show'} full record</div>
            <div style={{ fontSize: 11, color: C.txS, marginTop: 2 }}>Medications with source · history · devices · person-centered detail</div>
          </div>
          <span style={{ color: C.txS, fontSize: 14, fontWeight: 700 }}>{deep ? '−' : '+'}</span>
        </div>

        {deep && <Sections p={p} tx m={m} comfortOpen={false} />}

        <div style={{ textAlign: 'center', fontSize: 12, color: C.dis, marginTop: 12 }}>📡 QR scan access · Read-only until ED return is filed · Event {p.tx?.eventId}</div>
      </div>
    </div>
  );
};
