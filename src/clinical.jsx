import React, { useState, useEffect } from 'react';
import { C, Chk, DnA, WarnIco, QR, Bg, Av, Cd, Bt, SL, TB, Bk, FR, Chips, MedSourceBadge, getA11yProps } from './components.jsx';

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

// ===== COMFORT / PERSON-CENTERED CARE SECTION (expanded per committee feedback) =====
export const ComfortSection = ({ p, m, defaultOpen = false }) => {
  const safety = [
    { ic: '🗣️', l: 'Language & Interpreter', v: (p.lang || 'English') + (p.interpreter ? ' · Interpreter needed' : ' · No interpreter needed') },
    { ic: '⚠️', l: 'Behavioral Triggers', v: p.comfort?.triggers },
    { ic: '🤲', l: 'Calming Strategies', v: p.comfort?.calming },
    { ic: '🍽️', l: 'Dietary Preference', v: p.comfort?.diet },
  ].filter(x => x.v);
  const soft = [
    { ic: '💬', l: 'Communication', v: p.comfort?.comm },
    { ic: '👨‍👩‍👧', l: 'Family Involvement', v: p.comfort?.fam },
    { ic: '🙏', l: 'Cultural / Spiritual', v: p.comfort?.cult },
    { ic: '💡', l: 'Lighting / Environment', v: p.comfort?.light },
    { ic: '🧘', l: 'Distress Management', v: p.comfort?.dist },
  ].filter(x => x.v);
  return (
    <Coll title="Person-Centered Care" ic="💜" open={defaultOpen} m={m} ch={<>
      <div style={{ background: 'linear-gradient(90deg,#F3E5F5,#FCE4EC)', borderRadius: 10, padding: '8px 12px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14 }}>💜</span><span style={{ fontSize: 11, fontWeight: 600, color: '#6A1B9A' }}>Travels with the patient through every handoff. Does not slow down the transfer.</span>
      </div>
      {safety.length > 0 && (
        <>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.purple, textTransform: 'uppercase', letterSpacing: 1, margin: '4px 0 6px' }}>Operational — surface to EMS / ED</div>
          {safety.map((it, i) => (
            <div key={'s' + i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 0', borderBottom: i < safety.length - 1 ? `1px solid ${C.bdr}30` : 'none' }}>
              <span style={{ fontSize: 16, flexShrink: 0, marginTop: 2 }}>{it.ic}</span>
              <div><div style={{ fontSize: 11, fontWeight: 700, color: C.purple, textTransform: 'uppercase', letterSpacing: .6 }}>{it.l}</div><div style={{ fontSize: 13, color: C.tx, marginTop: 2, lineHeight: 1.5 }}>{it.v}</div></div>
            </div>
          ))}
        </>
      )}
      {soft.length > 0 && (
        <>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.txS, textTransform: 'uppercase', letterSpacing: 1, margin: '14px 0 6px' }}>Dignity & Context</div>
          {soft.map((it, i) => (
            <div key={'c' + i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 0', borderBottom: i < soft.length - 1 ? `1px solid ${C.bdr}15` : 'none' }}>
              <span style={{ fontSize: 16, flexShrink: 0, marginTop: 2 }}>{it.ic}</span>
              <div><div style={{ fontSize: 11, fontWeight: 700, color: C.txS, textTransform: 'uppercase', letterSpacing: .6 }}>{it.l}</div><div style={{ fontSize: 13, color: C.tx, marginTop: 2, lineHeight: 1.5 }}>{it.v}</div></div>
            </div>
          ))}
        </>
      )}
      {safety.length === 0 && soft.length === 0 && (
        <div style={{ padding: '16px 4px', fontSize: 12, color: C.txT, fontStyle: 'italic' }}>No person-centered preferences documented yet. Add at admission for a richer handoff.</div>
      )}
    </>} />
  );
};

// ===== MEDICATION IMPORT MODAL =====
// Supports the three prototype paths the committee asked for: PDF upload, photograph, EHR/CSV import
// Always keeps manual entry available for low-resource facilities
// Callers conditionally render this component so it remounts per open — useState initializers
// reflect the current patient's source every time, with no sync effect required.
export const MedImportModal = ({ onClose, onImport, currentSource, m }) => {
  const [method, setMethod] = useState(currentSource?.method || 'pdf');
  const [step, setStep] = useState(0); // 0=choose, 1=uploading, 2=success
  const [file, setFile] = useState(currentSource?.file || '');
  const count = currentSource?.count || 5;
  // Simulated upload transition. Effect-owned timeout so close / unmount / pick-again all clean up automatically.
  useEffect(() => {
    if (step !== 1) return undefined;
    const fileMap = { pdf: 'CascadeView_MAR_20260320.pdf', photo: 'IMG_MAR_20260320.jpg', pcc_import: 'PCC_MedList_live.xml', manual: null };
    const t = setTimeout(() => {
      setFile(fileMap[method]);
      setStep(2);
    }, 900);
    return () => clearTimeout(t);
  }, [step, method]);
  const options = [
    { id: 'pdf', ic: '📄', label: 'Upload medication report PDF', sub: 'PointClickCare MAR, MatrixCare export, facility PDF' },
    { id: 'photo', ic: '📷', label: 'Photograph or scan paper list', sub: 'For facilities with no EHR access' },
    { id: 'pcc_import', ic: '🏥', label: 'Import from EHR (PointClickCare)', sub: 'Connected facility · pulls active meds' },
    { id: 'manual', ic: '✍️', label: 'Enter manually (no source)', sub: 'Falls back to free-text entry at admission' },
  ];
  const handlePick = (id) => {
    setMethod(id);
    setStep(1);
  };
  const confirm = () => {
    const labelMap = { pdf: 'Uploaded medication report', photo: 'Photo of paper MAR', pcc_import: 'PointClickCare MAR', manual: 'Manually entered' };
    onImport({
      method,
      label: labelMap[method],
      file,
      count,
      verified: true,
      importedAt: new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }),
      importedBy: 'RN Sarah Mitchell',
    });
    onClose();
  };
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.55)', zIndex: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: m ? 10 : 20 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: m ? 14 : 20, width: '100%', maxWidth: 520, maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,.3)' }}>
        <div style={{ padding: m ? '16px 16px 10px' : '22px 24px 14px', borderBottom: `1px solid ${C.bdr}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: m ? 15 : 17, fontWeight: 800, color: C.navy }}>Import Medication List</div>
            <div style={{ fontSize: 11, color: C.txS, marginTop: 2 }}>No retyping. Source recorded. Verified at transfer.</div>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ fontSize: 18, color: C.txS, minHeight: 36, minWidth: 36, borderRadius: 18, background: '#F5F5F5', border: 'none', cursor: 'pointer' }}>✕</button>
        </div>
        <div style={{ padding: m ? 16 : 24 }}>
          {step === 0 && options.map(o => (
            <div key={o.id} onClick={() => handlePick(o.id)} {...getA11yProps(() => handlePick(o.id))} className="card-hover" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', border: `1px solid ${method === o.id ? C.accent : C.bdr}`, borderRadius: 12, marginBottom: 8, cursor: 'pointer', background: method === o.id ? C.lA : '#fff', transition: 'all .15s' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#F0F2F5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{o.ic}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>{o.label}</div>
                <div style={{ fontSize: 11, color: C.txS, marginTop: 2 }}>{o.sub}</div>
              </div>
              <div style={{ color: C.txT }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></div>
            </div>
          ))}
          {step === 1 && (
            <div style={{ textAlign: 'center', padding: '28px 10px' }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>⏳</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>Processing {method === 'photo' ? 'scan' : method === 'pcc_import' ? 'EHR pull' : 'document'}…</div>
              <div style={{ fontSize: 12, color: C.txS, marginTop: 6 }}>Extracting active medications · verifying against record</div>
            </div>
          )}
          {step === 2 && (
            <div style={{ padding: '4px 2px' }}>
              <div style={{ background: C.lG, border: `1px solid ${C.green}40`, borderRadius: 12, padding: 14, marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 16, background: C.green, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Chk s={16} /></div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: C.greenD }}>Medication source attached</div>
                    <div style={{ fontSize: 11, color: C.txS }}>This record now shows "verified at transfer"</div>
                  </div>
                </div>
                {file && <div style={{ fontSize: 12, color: C.tx }}><strong>File:</strong> {file}</div>}
                <div style={{ fontSize: 12, color: C.tx, marginTop: 4 }}><strong>Active meds parsed:</strong> {count}</div>
                <div style={{ fontSize: 12, color: C.tx, marginTop: 4 }}><strong>Source:</strong> {method.replace('_', ' ')}</div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <Bt full outline ch="Preview document" onClick={() => alert('Document preview is simulated in this prototype.')} m={m} />
                <Bt full ch="Confirm & verify at transfer" onClick={confirm} bg={C.green} m={m} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
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
export const Sections = ({ p, tx, er, m, comfortOpen, onImportMeds }) => (
  <>
    {tx && <Cd m={m} hl={C.lW} style={{ border: `1.5px solid ${C.amber}`, borderLeft: `4px solid ${C.amber}` }} ch={<><SL ch="Active Transfer Details" ic="🚨" /><FR l="Reason for Transfer" v={p.tx.reason} hl /><FR l="Symptoms" v={<Chips items={p.tx.symp} bg={C.amber} color="#fff" />} /><FR l="Interventions" v={p.tx.intv} /><FR l="Recent Changes (72h)" v={p.tx.chg} /><FR l="Destination" v={p.tx.dest} /><div style={{ fontSize: 12, color: C.txS, marginTop: 6, paddingTop: 6, borderTop: `1px solid ${C.amber}30` }}>Initiated: {p.tx.time} by {p.tx.nurse}{p.tx.eventId ? ` · Event ${p.tx.eventId}` : ''}</div></>} />}
    <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? 10 : 14 }}>
      <Coll title="Contacts & Facility" ic="👥" m={m} ch={<><FR l="Contact" v={<span><strong>{p.contact}</strong> ({p.contactRel})</span>} /><FR l="Phone" v={<span style={{ color: C.accent, fontWeight: 600 }}>{p.contactPh}</span>} /><div style={{ height: 1, background: C.bdr, margin: '8px 0' }} /><FR l="Facility" v={<strong>{p.fac}</strong>} /><FR l="Address" v={p.facAddr} /><FR l="Phone" v={p.facPh} /></>} />
      <Coll title="Medications" ic="💊" m={m} ch={<>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 12, color: C.txS }}>{p.meds.length} active medications</div>
          <MedSourceBadge src={p.medSource} compact onClick={onImportMeds} />
        </div>
        {p.medSource && (
          <div style={{ background: '#F4FAFB', border: `1px solid ${C.accent}30`, borderRadius: 8, padding: '8px 10px', marginBottom: 8, fontSize: 11, color: C.txS }}>
            <strong style={{ color: C.accentD }}>Source:</strong> {p.medSource.label}{p.medSource.file ? ` · ${p.medSource.file}` : ''}<br />
            <strong style={{ color: C.accentD }}>Imported:</strong> {p.medSource.importedAt} by {p.medSource.importedBy}
          </div>
        )}
        {p.meds.length === 0 ? <div style={{ padding: '12px 0', color: C.txT, fontSize: 13, fontStyle: 'italic' }}>No active medications listed.</div> : p.meds.map((med, i) => <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${C.bdr}15` }}><span style={{ fontSize: 13 }}>{med.n}</span><div style={{ display: 'flex', gap: 4 }}><Bg ch={med.f} bg={C.lA} color={C.accent} style={{ fontSize: 10, padding: '2px 7px' }} /><Bg ch={med.t} bg="#F0F0F0" color={C.txS} style={{ fontSize: 10, padding: '2px 7px' }} /></div></div>)}
        {onImportMeds && (
          <div style={{ marginTop: 10 }}>
            <button onClick={onImportMeds} style={{ fontSize: 12, fontWeight: 700, color: C.accent, background: 'transparent', border: `1px dashed ${C.accent}`, borderRadius: 8, padding: '8px 12px', cursor: 'pointer', width: '100%', fontFamily: 'inherit' }}>
              📎 {p.medSource ? 'Re-import / update medication source' : 'Import or attach medication list'}
            </button>
          </div>
        )}
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
