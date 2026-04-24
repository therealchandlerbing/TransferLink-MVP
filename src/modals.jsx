import React, { useState, useCallback, useEffect } from 'react';
import { C, Chk, WarnIco, Bg, Av, Cd, Bt, SL, TB, Bk, TxIn } from './components.jsx';
import { DEMO_SCREEN_MAP, NEW_PT_TEMPLATE, PERSONAS, FACILITY_MODES, FACILITY_INFO } from './data.js';
import { MScaleSelect, FScaleSelect, MedImportModal } from './clinical.jsx';

// ===== TOAST SYSTEM =====
const Toast = ({ t, remove }) => {
  useEffect(() => { const timer = setTimeout(() => remove(t.id), 3000); return () => clearTimeout(timer); }, [t.id, remove]);
  return (
    <div style={{ background: t.type === 'err' ? C.red : C.green, color: '#fff', padding: '12px 16px', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,.2)', display: 'flex', alignItems: 'center', gap: 10, animation: 'toastIn .4s cubic-bezier(.22,1,.36,1) forwards', pointerEvents: 'auto' }}>
      <div style={{ background: 'rgba(255,255,255,.2)', width: 24, height: 24, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {t.type === 'err' ? <WarnIco /> : <Chk s={14} />}
      </div>
      <div style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>{t.msg}</div>
      <button onClick={() => remove(t.id)} style={{ background: 'none', border: 'none', color: '#fff', opacity: .6, cursor: 'pointer', padding: 4 }}>✕</button>
    </div>
  );
};
export const ToastContainer = ({ toasts, setToasts }) => {
  const remove = useCallback((id) => setToasts(ts => ts.filter(x => x.id !== id)), [setToasts]);
  return (
    <div style={{ position: 'fixed', top: 64, left: 16, right: 16, zIndex: 1000, display: 'flex', flexDirection: 'column', gap: 10, pointerEvents: 'none' }}>
      {toasts.map(t => <Toast key={t.id} t={t} remove={remove} />)}
    </div>
  );
};

// ===== NOTIFICATION CENTER =====
export const NotificationCenter = ({ notifications, onClose, onSelect, m }) => (
  <div style={{ position: 'fixed', inset: 0, zIndex: 150, background: 'rgba(0,0,0,.5)' }} onClick={onClose}>
    <div onClick={e => e.stopPropagation()} style={{ position: 'absolute', top: 0, right: 0, width: m ? '100%' : 380, height: '100%', background: '#fff', boxShadow: '-8px 0 32px rgba(0,0,0,.15)', overflow: 'auto', animation: 'slideUp .2s ease' }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.bdr}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 16, fontWeight: 800, color: C.navy }}>Notifications</span>
        <button onClick={onClose} style={{ fontSize: 18, color: C.txS, background: '#F5F5F5', border: 'none', borderRadius: 16, width: 32, height: 32, cursor: 'pointer' }}>✕</button>
      </div>
      {notifications.length === 0
        ? <div style={{ padding: 40, textAlign: 'center', color: C.txT }}>No notifications yet</div>
        : notifications.map((n, i) => (
          <div key={n.id || i} onClick={() => onSelect(n)} style={{ padding: '12px 20px', borderBottom: `1px solid ${C.bdr}`, cursor: 'pointer', background: n.unread ? '#F0FAFB' : 'transparent' }}>
            <div style={{ fontSize: 13, color: C.tx, fontWeight: n.unread ? 600 : 400 }}>{n.text}</div>
            <div style={{ fontSize: 11, color: C.txT, marginTop: 2 }}>{n.time}</div>
          </div>
        ))}
    </div>
  </div>
);

// ===== GUIDED DEMO =====
export const GuidedDemo = ({ onExit, demoStep, setDemoStep, navigate, selectPatient, m }) => {
  const [collapsed, setCollapsed] = useState(false);
  const steps = DEMO_SCREEN_MAP;
  const s = steps[demoStep];
  if (!s) return null;
  const goToStep = (idx) => {
    const st = steps[idx];
    if (!st) return;
    setDemoStep(idx);
    if (st.screen >= 2) selectPatient(0);
    navigate(st.screen);
  };

  // ── Slim bar when collapsed ──────────────────────────────────────────
  if (collapsed) return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200, background: 'rgba(15,29,47,0.97)', backdropFilter: 'blur(12px)', borderTop: '2px solid rgba(27,154,170,0.4)', height: 44, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10 }}>
      <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
        {steps.map((_, i) => <div key={i} style={{ width: i === demoStep ? 12 : 5, height: 5, borderRadius: 3, background: i < demoStep ? C.green : i === demoStep ? C.accent : 'rgba(255,255,255,.2)', transition: 'all .3s' }} />)}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,.9)' }}>{s.title}</span>
        {s.desc && <span style={{ fontSize: 11, color: 'rgba(255,255,255,.4)', marginLeft: 6 }}>— {s.desc}</span>}
      </div>
      <span style={{ fontSize: 11, color: 'rgba(255,255,255,.4)', flexShrink: 0 }}>{demoStep + 1}/{steps.length}</span>
      <button onClick={() => setCollapsed(false)} style={{ background: 'rgba(255,255,255,.1)', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12, fontWeight: 600, padding: '5px 10px', cursor: 'pointer', flexShrink: 0, fontFamily: 'inherit' }}>▲ Expand</button>
      <button onClick={onExit} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,.4)', fontSize: 16, cursor: 'pointer', padding: '0 4px', lineHeight: 1 }}>✕</button>
    </div>
  );

  // ── Full tray ────────────────────────────────────────────────────────
  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200, background: 'linear-gradient(180deg,rgba(15,29,47,0.96),rgba(15,29,47,0.99))', backdropFilter: 'blur(12px)', borderTop: '2px solid rgba(27,154,170,0.4)', padding: m ? '10px 14px 12px' : '14px 24px 16px', animation: 'slideUp .3s ease', maxHeight: m ? '55vh' : '44vh', overflowY: 'auto' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        {/* Header row: dots + step counter + collapse */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div style={{ display: 'flex', gap: 3 }}>
            {steps.map((_, i) => <div key={i} style={{ width: i === demoStep ? 14 : 5, height: 5, borderRadius: 3, background: i < demoStep ? C.green : i === demoStep ? C.accent : 'rgba(255,255,255,.2)', transition: 'all .3s' }} />)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,.45)' }}>Step {demoStep + 1} of {steps.length}</span>
            <button onClick={() => setCollapsed(true)} title="Minimize" style={{ background: 'rgba(255,255,255,.08)', border: 'none', borderRadius: 6, color: 'rgba(255,255,255,.6)', fontSize: 11, fontWeight: 700, padding: '3px 8px', cursor: 'pointer', fontFamily: 'inherit' }}>▼ Hide</button>
          </div>
        </div>
        {/* Step info */}
        <div style={{ fontSize: m ? 12 : 13, fontWeight: 800, color: '#fff', marginBottom: 4, lineHeight: 1.3, letterSpacing: -.1 }}>{s.title}</div>
        {s.scene && <div style={{ fontSize: m ? 11 : 12, color: 'rgba(255,255,255,.82)', marginBottom: s.note ? 7 : 10, lineHeight: 1.6 }}>{s.scene}</div>}
        {s.note && <div style={{ fontSize: m ? 10 : 11, color: C.accent, marginBottom: 10, lineHeight: 1.5, borderLeft: `2px solid rgba(27,154,170,.4)`, paddingLeft: 8 }}>{s.note}</div>}
        {!s.scene && <div style={{ fontSize: m ? 11 : 12, color: 'rgba(255,255,255,.5)', marginBottom: 10, lineHeight: 1.4 }}>{s.desc}</div>}
        {/* Controls */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => goToStep(demoStep - 1)} disabled={demoStep === 0} style={{ padding: m ? '7px 12px' : '8px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,.2)', background: 'transparent', color: '#fff', fontSize: m ? 12 : 13, fontWeight: 600, cursor: demoStep === 0 ? 'not-allowed' : 'pointer', opacity: demoStep === 0 ? .3 : 1, fontFamily: 'inherit' }}>← Prev</button>
          {demoStep < steps.length - 1
            ? <button onClick={() => goToStep(demoStep + 1)} style={{ padding: m ? '7px 16px' : '8px 20px', borderRadius: 8, border: 'none', background: C.accent, color: '#fff', fontSize: m ? 12 : 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Next →</button>
            : <button onClick={onExit} style={{ padding: m ? '7px 16px' : '8px 20px', borderRadius: 8, border: 'none', background: C.green, color: '#fff', fontSize: m ? 12 : 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>✓ Finish</button>}
          <button onClick={onExit} style={{ marginLeft: 'auto', padding: m ? '7px 10px' : '8px 12px', borderRadius: 8, border: 'none', background: 'rgba(255,255,255,.07)', color: 'rgba(255,255,255,.5)', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit' }}>Exit</button>
        </div>
      </div>
    </div>
  );
};

// ===== 5-STEP INTAKE MODAL =====
export const IntakeModal = ({ onClose, onDone, m }) => {
  const [step, setStep] = useState(0);
  const [d, setD] = useState({ ...NEW_PT_TEMPLATE });
  const [medOpen, setMedOpen] = useState(false);
  const upd = (k, v) => setD(prev => ({ ...prev, [k]: v }));
  const updComfort = (k, v) => setD(prev => ({ ...prev, comfort: { ...prev.comfort, [k]: v } }));
  const allHx = ['A-FIB', 'CHF', 'COPD', 'DM (Type 2)', 'CKD', 'Hypertension', 'CVA/Stroke', 'Prior MI', 'Osteoarthritis', 'Osteoporosis', 'Depression', 'Anxiety', 'Dementia', 'Cancer'];
  const allRisks = ['Falls', 'Aspiration', 'Skin breakdown', 'Elopement', 'Harm to Self/Others', 'Needs Meds Crushed', 'Hypoglycemia', 'Fluid overload', 'Depression screening due'];
  const allDevs = ['O2', 'CPAP', 'Wheelchair', 'Rolling walker', 'Bed alarm', 'Foley catheter', 'Glucose monitor', 'Pacemaker', 'Daily weights', 'Telemetry-ready'];
  const toggleArr = (arr, item) => arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item];
  const stepTitles = ['Demographics', 'Clinical', 'Contacts', 'Care Prefs', 'Review'];

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: m ? 0 : 20, paddingTop: m ? 0 : 40, overflow: 'auto' }} onClick={onClose}>
      {medOpen && <MedImportModal onClose={() => setMedOpen(false)} onImport={src => upd('medSource', src)} currentSource={d.medSource} m={m} />}
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: m ? 0 : 20, width: m ? '100%' : '95%', maxWidth: 620, maxHeight: m ? '100vh' : '90vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,.25)' }}>
        <div style={{ position: 'sticky', top: 0, background: '#fff', zIndex: 5, borderBottom: `1px solid ${C.bdr}`, padding: '16px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.navy }}>New Patient Intake</div>
            <button onClick={onClose} style={{ fontSize: 20, color: C.txS, minHeight: 40, minWidth: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 20, background: '#F5F5F5', border: 'none', cursor: 'pointer' }}>✕</button>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {stepTitles.map((s, i) => (
              <div key={i} onClick={() => setStep(i)} style={{ flex: 1, padding: '6px 4px', borderRadius: 8, textAlign: 'center', fontSize: 10, fontWeight: i === step ? 700 : 500, background: i === step ? C.accent : i < step ? C.lA : '#F0F2F5', color: i === step ? '#fff' : i < step ? C.accent : C.txT, cursor: 'pointer', transition: 'all .2s' }}>
                {m ? i + 1 : s}
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: m ? '16px' : '24px' }}>
          {step === 0 && <>
            <SL ch="Patient Demographics" ic="👤" />
            <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: 12 }}>
              <div><label style={{ fontSize: 12, fontWeight: 600, color: C.txS }}>Full Name</label><TxIn value={d.name} onChange={v => upd('name', v)} /></div>
              <div><label style={{ fontSize: 12, fontWeight: 600, color: C.txS }}>Preferred Short Name</label><TxIn value={d.short} onChange={v => upd('short', v)} /></div>
              <div><label style={{ fontSize: 12, fontWeight: 600, color: C.txS }}>Date of Birth</label><TxIn value={d.dob} onChange={v => upd('dob', v)} placeholder="MM/DD/YYYY" /></div>
              <div><label style={{ fontSize: 12, fontWeight: 600, color: C.txS }}>Room</label><TxIn value={String(d.room)} onChange={v => upd('room', v)} placeholder="e.g. 204" /></div>
              <div><label style={{ fontSize: 12, fontWeight: 600, color: C.txS }}>Language</label><TxIn value={d.lang} onChange={v => upd('lang', v)} /></div>
              <div><label style={{ fontSize: 12, fontWeight: 600, color: C.txS }}>Age</label><TxIn value={String(d.age)} onChange={v => upd('age', v)} placeholder="e.g. 82" /></div>
            </div>
            <div style={{ marginTop: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.txS }}>Code Status</label>
              <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                {[['Full Code', 'full'], ['DNR', 'dnr'], ['DNR / DNI', 'dnr']].map(([label, type], i) => (
                  <span key={i} onClick={() => { upd('code', label); upd('codeType', type); }} style={{ padding: '8px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600, background: d.code === label ? (type === 'dnr' ? C.red : C.green) : '#F0F2F5', color: d.code === label ? '#fff' : C.txS, cursor: 'pointer', border: d.code === label ? 'none' : `1px solid ${C.bdr}` }}>{label}</span>
                ))}
              </div>
            </div>
          </>}

          {step === 1 && <>
            <SL ch="Medication source" ic="💊" />
            <div style={{ background: d.medSource ? C.lG : C.lW, border: `1px solid ${d.medSource ? C.green + '40' : C.amber + '60'}`, borderRadius: 10, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: 18 }}>{d.medSource ? '✅' : '📎'}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                {d.medSource
                  ? <><div style={{ fontSize: 12, fontWeight: 700, color: C.greenD }}>{d.medSource.label} · {d.medSource.count} meds</div><div style={{ fontSize: 11, color: C.txS }}>{d.medSource.file || 'Manual entry'}</div></>
                  : <><div style={{ fontSize: 12, fontWeight: 700, color: C.amberD }}>Import at admission — never retype under pressure</div><div style={{ fontSize: 11, color: C.txS }}>Supports PDF, photo, PointClickCare, and manual entry</div></>}
              </div>
              <button onClick={() => setMedOpen(true)} style={{ fontSize: 12, fontWeight: 700, padding: '6px 10px', background: d.medSource ? '#fff' : C.amber, color: d.medSource ? C.accentD : '#fff', border: `1px solid ${d.medSource ? C.accent : C.amberD}`, borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit' }}>{d.medSource ? 'Update' : 'Attach'}</button>
            </div>
            <SL ch="Allergies" ic="⚠️" />
            <TxIn value={d.allergy.join(', ')} onChange={v => upd('allergy', v.split(',').map(x => x.trim()).filter(Boolean))} placeholder="Comma-separated (e.g. Morphine, Latex)" />
            <div style={{ marginTop: 16 }}><SL ch="Medical History" ic="📋" /></div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {allHx.map((h, i) => { const sel = d.hx.includes(h); return <span key={i} onClick={() => upd('hx', toggleArr(d.hx, h))} style={{ padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: sel ? C.accent : '#F0F2F5', color: sel ? '#fff' : C.txS, cursor: 'pointer' }}>{sel ? '✓ ' : ''}{h}</span>; })}
            </div>
            <div style={{ marginTop: 16 }}><SL ch="Baseline Mentation" ic="🧠" /></div>
            <MScaleSelect lvl={d.mLvl} setLvl={v => upd('mLvl', v)} m={m} />
            <div style={{ marginTop: 16 }}><SL ch="Functional Status" ic="🚶" /></div>
            <FScaleSelect lvl={d.fLvl} setLvl={v => upd('fLvl', v)} m={m} />
            <div style={{ marginTop: 16 }}><SL ch="Devices" ic="🔧" /></div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {allDevs.map((dv, i) => { const sel = d.dev.includes(dv); return <span key={i} onClick={() => upd('dev', toggleArr(d.dev, dv))} style={{ padding: '6px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: sel ? C.lA : '#F0F2F5', color: sel ? C.accent : C.txS, cursor: 'pointer' }}>{sel ? '✓ ' : ''}{dv}</span>; })}
            </div>
            <div style={{ marginTop: 16 }}><SL ch="Risk Alerts" ic="🔔" /></div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {allRisks.map((r, i) => { const sel = d.risks.includes(r); return <span key={i} onClick={() => upd('risks', toggleArr(d.risks, r))} style={{ padding: '6px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: sel ? C.lW : '#F0F2F5', color: sel ? '#7B3E00' : C.txS, cursor: 'pointer' }}>{sel ? '✓ ' : ''}{r}</span>; })}
            </div>
          </>}

          {step === 2 && <>
            <SL ch="Emergency Contact" ic="👥" />
            <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: 12 }}>
              <div><label style={{ fontSize: 12, fontWeight: 600, color: C.txS }}>Contact Name</label><TxIn value={d.contact} onChange={v => upd('contact', v)} /></div>
              <div><label style={{ fontSize: 12, fontWeight: 600, color: C.txS }}>Relationship</label><TxIn value={d.contactRel} onChange={v => upd('contactRel', v)} /></div>
              <div><label style={{ fontSize: 12, fontWeight: 600, color: C.txS }}>Phone</label><TxIn value={d.contactPh} onChange={v => upd('contactPh', v)} /></div>
            </div>
            <div style={{ marginTop: 16 }}><SL ch="Facility" ic="🏥" /></div>
            <div style={{ background: '#F8F9FB', borderRadius: 10, padding: 12, border: `1px solid ${C.bdr}` }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.navy }}>Cascade View Assisted Living</div>
              <div style={{ fontSize: 12, color: C.txS }}>4200 Evergreen Way, Everett, WA 98201</div>
            </div>
            <div style={{ marginTop: 16 }}><label style={{ fontSize: 12, fontWeight: 600, color: C.txS }}>Isolation Precautions</label>
              <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                {['None', 'MRSA', 'VRE', 'C-Diff'].map((iso, i) => <span key={i} onClick={() => upd('iso', iso)} style={{ padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: d.iso === iso ? C.accent : '#F0F2F5', color: d.iso === iso ? '#fff' : C.txS, cursor: 'pointer' }}>{iso}</span>)}
              </div>
            </div>
          </>}

          {step === 3 && <>
            <div style={{ background: 'linear-gradient(90deg,#F3E5F5,#FCE4EC)', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>💜</span>
              <div><div style={{ fontSize: 13, fontWeight: 700, color: '#6A1B9A' }}>Person-Centered Care</div><div style={{ fontSize: 11, color: '#8E24AA' }}>Language, triggers, calming strategies, and diet surface at every handoff</div></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, padding: '8px 12px', background: '#F8F9FB', borderRadius: 10, border: `1px solid ${C.bdr}` }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.navy }}>Preferred language</div>
                <div style={{ fontSize: 11, color: C.txS }}>{d.lang}</div>
              </div>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.txS, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                <input type="checkbox" checked={!!d.interpreter} onChange={e => upd('interpreter', e.target.checked)} style={{ transform: 'scale(1.2)' }} />
                Interpreter needed
              </label>
            </div>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.purple, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Operational — surface to EMS / ED</div>
            {[['triggers', 'Behavioral Triggers', '⚠️', 'e.g. Loud voices, being rushed, bright lights'], ['calming', 'Calming Strategies', '🤲', 'e.g. Hold hand, speak slowly, play familiar music'], ['diet', 'Dietary Preference', '🍽️', 'e.g. Mechanical soft, thickened liquids, no dairy']].map(([k, label, ic, ph], i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}><span style={{ fontSize: 14 }}>{ic}</span><label style={{ fontSize: 12, fontWeight: 600, color: C.txS }}>{label}</label></div>
                <TxIn value={d.comfort[k]} onChange={v => updComfort(k, v)} placeholder={ph} rows={2} />
              </div>
            ))}
            <div style={{ fontSize: 10, fontWeight: 700, color: C.txS, textTransform: 'uppercase', letterSpacing: 1, margin: '14px 0 6px' }}>Dignity & context (optional)</div>
            {[['comm', 'Communication Needs', '💬', 'e.g. Responds to calm, slow speech'], ['fam', 'Family Involvement', '👨‍👩‍👧', 'e.g. Daughter visits daily, involved in decisions'], ['cult', 'Cultural/Spiritual', '🙏', 'e.g. Catholic faith, rosary at bedside'], ['light', 'Lighting Preferences', '💡', 'e.g. Prefers dim lighting at night'], ['dist', 'Distress Management', '🧘', 'e.g. Gentle conversation helps when in pain']].map(([k, label, ic, ph], i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}><span style={{ fontSize: 14 }}>{ic}</span><label style={{ fontSize: 12, fontWeight: 600, color: C.txS }}>{label}</label></div>
                <TxIn value={d.comfort[k]} onChange={v => updComfort(k, v)} placeholder={ph} rows={2} />
              </div>
            ))}
          </>}

          {step === 4 && <>
            <div style={{ background: C.lG, borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Chk s={20} c={C.green} /><span style={{ fontSize: 14, fontWeight: 600, color: C.greenD }}>Review and confirm patient record</span>
            </div>
            <Cd m={m} style={{ borderLeft: `4px solid ${C.accent}` }} ch={<>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
                <Av sz={36} init={d.name.split(' ').map(x => x[0]).join('').slice(0, 2).toUpperCase() || '??'} />
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: C.navy }}>{d.name || 'No name entered'}</div>
                  <div style={{ fontSize: 12, color: C.txS }}>Room {d.room} · DOB: {d.dob} · Age {d.age}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                <Bg ch={d.code} bg={d.codeType === 'dnr' ? C.red : C.green} />
                <Bg ch={d.flag + ' ' + d.lang} bg={C.accent} />
              </div>
              <div style={{ fontSize: 12, color: C.txS, marginBottom: 4 }}>Allergies: <span style={{ color: C.red, fontWeight: 600 }}>{d.allergy.join(', ') || 'NKA'}</span></div>
              <div style={{ fontSize: 12, color: C.txS, marginBottom: 4 }}>Conditions: {d.hx.join(', ') || 'None listed'}</div>
              <div style={{ fontSize: 12, color: C.txS, marginBottom: 4 }}>Devices: {d.dev.join(', ') || 'None'}</div>
              <div style={{ fontSize: 12, color: C.txS }}>Contact: {d.contact} ({d.contactRel}) {d.contactPh}</div>
            </>} />
          </>}
        </div>

        <div style={{ position: 'sticky', bottom: 0, background: '#fff', borderTop: `1px solid ${C.bdr}`, padding: '14px 20px', display: 'flex', gap: 10 }}>
          {step > 0 && <Bt ch="Back" outline onClick={() => setStep(step - 1)} m={m} style={{ flex: 1 }} />}
          {step < 4
            ? <Bt ch={step === 0 ? 'Next: Clinical ›' : 'Next ›'} onClick={() => setStep(step + 1)} m={m} style={{ flex: step > 0 ? 1 : undefined }} full={step === 0} />
            : <Bt ch="✓ Save and Generate QR" bg={C.green} onClick={() => { const init = d.name.split(' ').map(x => x[0]).join('').slice(0, 2).toUpperCase() || '??'; onDone({ ...d, init, id: -1 }); }} m={m} full />}
        </div>
      </div>
    </div>
  );
};

// ===== LOGIN SCREEN (S15) =====
export const S15 = ({ go, m, setPersona, setRole }) => {
  const [loginStep, setLoginStep] = useState(0);
  const [selPersona, setSelPersona] = useState(0);
  const [selRole, setSelRole] = useState(0);
  const [selShift, setSelShift] = useState(0);
  const roles = ['RN / LVN', 'Charge Nurse', 'Administrator', 'MD / NP'];
  const shifts = ['Day (7a-7p)', 'Night (7p-7a)', 'Swing'];

  if (loginStep === 0) return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(160deg,${C.navy},#2A3F6A)`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: m ? 16 : 32 }}>
      <div style={{ maxWidth: 420, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: m ? 28 : 36, fontWeight: 900, color: '#fff' }}>Transfer<span style={{ color: C.accent }}>Link</span></div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,.5)', marginTop: 8 }}>Secure facility access</div>
        </div>
        <Cd m={m} style={{ padding: m ? '24px 20px' : '32px 28px' }} ch={<>
          <SL ch="Facility Login" ic="🏥" />
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: C.txS }}>Facility ID</span>
            <div style={{ background: '#F8F9FB', borderRadius: 10, padding: '12px 14px', border: `1px solid ${C.bdr}`, marginTop: 4, fontSize: 14, color: C.tx }}>CVA-2026-0312</div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: C.txS }}>Your Name</span>
            <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
              {PERSONAS.map((p, i) => <span key={i} onClick={() => setSelPersona(i)} style={{ padding: '8px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: selPersona === i ? C.accent : '#F0F2F5', color: selPersona === i ? '#fff' : C.txS, cursor: 'pointer' }}>{p.name}</span>)}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: C.txS }}>Role</span>
            <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
              {roles.map((r, i) => <span key={i} onClick={() => setSelRole(i)} style={{ padding: '8px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: selRole === i ? C.accent : '#F0F2F5', color: selRole === i ? '#fff' : C.txS, cursor: 'pointer' }}>{r}</span>)}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: C.txS }}>Shift</span>
            <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
              {shifts.map((s, i) => <span key={i} onClick={() => setSelShift(i)} style={{ padding: '8px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: selShift === i ? C.accent : '#F0F2F5', color: selShift === i ? '#fff' : C.txS, cursor: 'pointer' }}>{s}</span>)}
            </div>
          </div>
          <Bt full ch="Sign In" onClick={() => { setPersona(PERSONAS[selPersona]); setRole(roles[selRole]); setLoginStep(1); }} m={m} />
          <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: C.txS }}>Secured with facility-level authentication.</div>
        </>} />
      </div>
    </div>
  );

  const persona = PERSONAS[selPersona];
  const obs = [
    { ic: '💊', t: 'Import — Don\'t Retype', d: 'Medication list comes in from PDF, photo, or PointClickCare. Source and timestamp travel with the record. "Verified at transfer" appears in every view.' },
    { ic: '⏱️', t: 'Under Five Minutes', d: 'Five essential fields up front. Secondary detail expandable. Baseline reused from admission. Progress meter shows the nurse where the time is going.' },
    { ic: '📱', t: 'QR in Three Formats', d: 'Print, wristband, mobile display. Short-link fallback for tough scans. EMS and ED get read-only access. ED return is the only write action.' },
    { ic: '🔄', t: 'Closed Loop, Tracked', d: 'ED submits → facility notified → nurse acknowledges → record closed. Four visible states. Banner persists until ack.' },
  ];
  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <TB ctr="Welcome to TransferLink" m={m} />
      <div style={{ padding: m ? 14 : 20, maxWidth: 620, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 18 }}>
          <div style={{ fontSize: m ? 20 : 24, fontWeight: 800, color: C.navy, marginBottom: 4 }}>Welcome, {persona.name.split(' ')[0]}</div>
          <div style={{ fontSize: 13, color: C.txS }}>{FACILITY_INFO.name} · {FACILITY_INFO.modeLabel}</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            <Bg ch={roles[selRole]} bg={C.accent} />
            <Bg ch={shifts[selShift]} bg={C.lA} color={C.accent} />
          </div>
        </div>

        {/* Facility mode picker */}
        <Cd m={m} style={{ marginBottom: 14 }} ch={<>
          <SL ch="This facility's mode" ic="🏥" />
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr 1fr', gap: 8 }}>
            {FACILITY_MODES.map(mm => {
              const isCurrent = mm.id === FACILITY_INFO.mode;
              return (
                <div key={mm.id} style={{ background: isCurrent ? C.lA : '#F8F9FB', border: `1.5px solid ${isCurrent ? mm.color : C.bdr}`, borderRadius: 10, padding: '10px 10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 18 }}>{mm.ic}</span>
                    {isCurrent && <Bg ch="Current" bg={mm.color} style={{ fontSize: 9, padding: '2px 6px' }} />}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: C.navy, marginTop: 6 }}>{mm.label}</div>
                  <div style={{ fontSize: 10, color: C.txS, marginTop: 2, lineHeight: 1.4 }}>{mm.sub}</div>
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: 11, color: C.txT, marginTop: 8, fontStyle: 'italic' }}>Same product works for adult family homes, mid-size AL, and EHR-connected SNFs.</div>
        </>} />

        {obs.map((o, i) => (
          <Cd key={i} m={m} style={{ borderLeft: `4px solid ${C.accent}` }} ch={
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: C.lA, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{o.ic}</div>
              <div><div style={{ fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 4 }}>{o.t}</div><div style={{ fontSize: 13, color: C.txS, lineHeight: 1.5 }}>{o.d}</div></div>
            </div>
          } />
        ))}
        <div style={{ display: 'flex', gap: m ? 8 : 10, marginTop: 8, flexDirection: m ? 'column' : 'row' }}>
          <Bt outline ch="View Integrations" onClick={() => go(20)} m={m} full />
          <Bt ch="Go to Dashboard →" onClick={() => go(17)} m={m} full />
        </div>
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <span onClick={() => go(0)} style={{ fontSize: 13, color: C.accent, cursor: 'pointer', fontWeight: 600 }}>Skip to Role Selector</span>
        </div>
      </div>
    </div>
  );
};
