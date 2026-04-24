import React, { useState } from 'react';
import { C, Chk, Bg, Av, Cd, Bt, SL, TB, Bk, FR, TxIn } from './components.jsx';
import { PtSwitcher, TransferTracker } from './clinical.jsx';

const Toggle = ({ val, onChange, m }) => (
  <div onClick={() => onChange(!val)} style={{ width: 48, height: 26, borderRadius: 13, background: val ? C.green : '#CCC', cursor: 'pointer', position: 'relative', transition: 'background .2s', flexShrink: 0 }}>
    <div style={{ position: 'absolute', top: 3, left: val ? 25 : 3, width: 20, height: 20, borderRadius: 10, background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,.2)', transition: 'left .2s' }} />
  </div>
);

// ===== S11 — ED RETURN DOCUMENTATION =====
export const S11 = ({ go, m, p, updateER }) => {
  const drs = ['Dr. James Park, MD', 'Dr. Anika Patel, MD', 'Dr. Maria Santos, MD', 'Dr. Angela Kim, MD'];
  const [dr, setDr] = useState(p.er.dr || drs[0]);
  const [showDr, setShowDr] = useState(false);
  const [dx, setDx] = useState(p.er.dx);
  const [bp, setBp] = useState(p.er.bp);
  const [hr, setHr] = useState(p.er.hr);
  const [rr, setRr] = useState(p.er.rr);
  const [sp, setSp] = useState(p.er.sp);
  const [rx, setRx] = useState(p.er.rx);
  const [ins, setIns] = useState(p.er.ins);
  const [rptCalled, setRptCalled] = useState(!!p.er.rpt);
  const [hasRx, setHasRx] = useState(!!p.er.rx);
  const vitals = [[bp, setBp, 'BP', C.accent], [hr, setHr, 'Pulse', C.amber], [rr, setRr, 'RR', C.purple], [sp, setSp, 'SPO2', C.green]];
  const isValid = dx.trim() && bp.trim() && hr.trim();
  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <TB m={m} left={<Bk go={go} to={10} label="Record" />} ctr="ED Return Info" accent={C.green} />
      <div style={{ padding: m ? 14 : 20, maxWidth: 600, margin: '0 auto' }}>
        <div style={{ background: `linear-gradient(90deg,${C.lG},#F0FFF4)`, borderRadius: 12, padding: '12px 16px', marginBottom: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ width: 32, height: 32, borderRadius: 16, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Chk s={16} /></div>
          <div><div style={{ fontWeight: 700, fontSize: 14, color: C.greenD }}>Patient seen at ED</div><div style={{ fontSize: 12, color: C.txS }}>Complete this form before discharge to facility</div></div>
        </div>
        <Cd m={m} ch={<>
          <SL ch="Provider" ic="👨‍⚕️" />
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <div onClick={() => setShowDr(!showDr)} style={{ background: '#F8F9FB', borderRadius: 10, padding: '12px 16px', border: `1px solid ${showDr ? C.accent : C.bdr}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
              <span style={{ fontWeight: 600 }}>{dr}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.txS} strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
            </div>
            {showDr && <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, background: '#fff', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,.15)', zIndex: 20, overflow: 'hidden' }}>
              {drs.map((d, i) => <div key={i} onClick={() => { setDr(d); setShowDr(false); }} style={{ padding: '12px 16px', fontSize: 13, cursor: 'pointer', background: d === dr ? C.lG : 'transparent', fontWeight: d === dr ? 600 : 400, borderBottom: `1px solid ${C.bdr}15` }}>{d === dr && '✓ '}{d}</div>)}
            </div>}
          </div>
          <SL ch="Diagnosis" ic="🩺" />
          <TxIn value={dx} onChange={setDx} placeholder="Primary diagnosis..." />
          <div style={{ marginTop: 16 }}><SL ch="Discharge Vitals" ic="💓" /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            {vitals.map(([val, set, label, color], i) => (
              <div key={i} style={{ borderRadius: 10, border: `1.5px solid ${color}30`, overflow: 'hidden' }}>
                <div style={{ background: color, padding: '4px 10px', fontSize: 10, fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>{label}</div>
                <input value={val} onChange={e => set(e.target.value)} placeholder={label + '...'} style={{ width: '100%', padding: '10px 12px', fontSize: 15, fontWeight: 600, border: 'none', background: color + '08', color: C.navy, fontFamily: 'inherit', boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, padding: '12px 14px', background: '#F8F9FB', borderRadius: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.tx }}>Prescriptions / Med changes?</span>
            <Toggle val={hasRx} onChange={setHasRx} m={m} />
          </div>
          {hasRx && <div style={{ marginBottom: 16 }}><TxIn value={rx} onChange={setRx} placeholder="List medication changes, new prescriptions..." rows={3} /></div>}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, padding: '12px 14px', background: '#F8F9FB', borderRadius: 10 }}>
            <div><span style={{ fontSize: 14, fontWeight: 600, color: C.tx }}>report called to facility?</span>{rptCalled && <span style={{ fontSize: 12, color: C.txS, display: 'block' }}>Called {p.er.rpt || 'Cascade View'}</span>}</div>
            <Toggle val={rptCalled} onChange={setRptCalled} m={m} />
          </div>
          <SL ch="Discharge Instructions" ic="📋" />
          <textarea value={ins} onChange={e => setIns(e.target.value)} rows={4} placeholder="Follow-up instructions for facility staff and family..." style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: `1px solid ${C.bdr}`, fontSize: 14, fontFamily: 'inherit', background: C.lG, color: C.tx, resize: 'vertical', boxSizing: 'border-box' }} />
        </>} />
        <Bt full ch={isValid ? 'Complete and Notify Facility' : 'Complete required fields'} disabled={!isValid} onClick={() => { updateER({ dx, bp, hr, rr, sp, rx: hasRx ? rx : '', rpt: rptCalled ? p.er.rpt || 'Called facility' : '', ins, dr }); go(12); }} m={m} />
      </div>
    </div>
  );
};

// ===== S12 — RECORD UPDATED =====
export const S12 = ({ go, m, p, returnStatus }) => (
  <div style={{ minHeight: '100vh', background: C.bg }}>
    {/* Hero banner — full-width dark success header */}
    <div style={{ background: `linear-gradient(160deg,${C.greenD} 0%,#1B6B3A 60%,#145C31 100%)`, padding: m ? '40px 20px 36px' : '56px 40px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow rings */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 280, height: 280, borderRadius: 140, background: 'rgba(255,255,255,.04)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 180, height: 180, borderRadius: 90, background: 'rgba(255,255,255,.05)', pointerEvents: 'none' }} />
      {/* Checkmark circle */}
      <div style={{ width: m ? 72 : 88, height: m ? 72 : 88, borderRadius: m ? 36 : 44, background: 'rgba(255,255,255,.15)', border: '2.5px solid rgba(255,255,255,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', animation: 'confirmBounce .6s cubic-bezier(.22,1,.36,1)', backdropFilter: 'blur(8px)' }}>
        <Chk s={m ? 34 : 42} />
      </div>
      <div style={{ fontSize: m ? 24 : 30, fontWeight: 900, color: '#fff', marginBottom: 8, letterSpacing: -.3 }}>Record Updated!</div>
      <div style={{ fontSize: m ? 13 : 14, color: 'rgba(255,255,255,.75)', lineHeight: 1.6, maxWidth: 360, margin: '0 auto' }}>
        <strong style={{ color: '#fff' }}>{p.short}'s</strong> record has been updated and{' '}
        <strong style={{ color: '#fff' }}>Cascade View Assisted Living</strong> has been notified.
      </div>
      {/* Status badges */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16 }}>
        <span style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>✓ ED submitted</span>
        <span style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{returnStatus?.facilityNotified ? '✓ Facility notified' : 'Pending notify'}</span>
      </div>
    </div>

    {/* Content section */}
    <div style={{ padding: m ? '16px 14px' : '24px 28px', maxWidth: 520, margin: '0 auto' }}>
      <Cd m={m} style={{ borderLeft: `4px solid ${C.green}`, marginBottom: 14 }} ch={<>
        <SL ch="ED Summary" ic="✅" />
        <FR l="Diagnosis" v={<strong>{p.er.dx || '—'}</strong>} hl />
        {p.er.dr && <FR l="Provider" v={p.er.dr} />}
        {p.er.rx && <FR l="Medications" v={p.er.rx} />}
        {p.er.ins && <FR l="Instructions" v={p.er.ins} />}
        {returnStatus?.facilityNotified && <FR l="Facility Notification" v={returnStatus.facilityNotified} />}
      </>} />
      <Bt full ch="Return Home" onClick={() => go(0)} m={m} bg={C.green} />
      <div style={{ textAlign: 'center', marginTop: 12 }}>
        <span onClick={() => go(14)} style={{ fontSize: 13, color: C.accent, fontWeight: 600, cursor: 'pointer' }}>View full transfer timeline →</span>
      </div>
    </div>
  </div>
);


// ===== S13 — FACILITY RETURN =====
export const S13 = ({ go, m, p, patients, ptId, setPt, returnStatus, onAcknowledge }) => (
  <div style={{ minHeight: '100vh', background: C.bg }}>
    <TB m={m} left={<Bk go={go} to={0} label="Home" />} ctr="Patient Returned" accent={C.green} right={<PtSwitcher patients={patients} ptId={ptId} setPt={setPt} m={m} />} />
    <div style={{ padding: m ? 14 : 20, maxWidth: 700, margin: '0 auto' }}>
      <div style={{ background: `linear-gradient(90deg,${C.lG},#F0FFF4)`, border: `1.5px solid ${C.green}`, borderLeft: `4px solid ${C.green}`, borderRadius: 12, padding: m ? '12px 14px' : '14px 20px', marginBottom: m ? 10 : 14, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 20 }}>✅</span>
        <div><div style={{ fontWeight: 700, fontSize: 14, color: C.greenD }}>{p.short} has returned from the ED</div><div style={{ fontSize: 12, color: C.txS }}>{p.er.time || 'Today'} · via {p.tx.dest?.split(',')[0]}</div></div>
      </div>
      <Cd m={m} style={{ border: `2px solid ${C.green}25`, borderLeft: `4px solid ${C.green}` }} ch={<>
        <SL ch="ED Return Information" ic="🏥" />
        <FR l="Diagnosis" v={<strong>{p.er.dx}</strong>} hl />
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr 1fr' : '1fr 1fr 1fr 1fr', gap: 8, margin: '8px 0 12px' }}>
          {[['BP', p.er.bp], ['Pulse', p.er.hr], ['RR', p.er.rr], ['SPO2', p.er.sp]].map(([l, v], i) => (
            <div key={i} style={{ background: C.lG, borderRadius: 10, padding: '10px 8px', textAlign: 'center', border: `1px solid ${C.green}20` }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.green, textTransform: 'uppercase' }}>{l}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.navy }}>{v}</div>
            </div>
          ))}
        </div>
        <FR l="Instructions" v={p.er.ins} />
        <FR l="Provider" v={p.er.dr} />
        {p.er.rx && <FR l="Medications" v={p.er.rx} />}
        <div style={{ marginTop: 10, borderTop: `1px solid ${C.bdr}`, paddingTop: 8, fontSize: 12, color: C.txS }}>
          <div>ED submitted: {returnStatus?.edSubmitted || 'Pending'}</div>
          <div>Facility notified: {returnStatus?.facilityNotified || 'Pending'}</div>
          <div>Nurse acknowledged: {returnStatus?.nurseAcknowledged || 'Awaiting acknowledgment'}</div>
          <div>Record closed: {returnStatus?.recordClosed || 'Open'}</div>
        </div>
      </>} />
      <div style={{ display: 'flex', gap: m ? 8 : 12, marginTop: 8, flexDirection: m ? 'column' : 'row' }}>
        <Bt full outline ch="View Full Timeline" onClick={() => go(14)} m={m} />
        <Bt full outline ch="Download Return Summary" onClick={() => {}} m={m} />
        <Bt full outline ch="Copy Instructions" onClick={() => {}} m={m} />
        <Bt full ch="✓ Acknowledge" onClick={() => { onAcknowledge(); go(0); }} m={m} bg={C.green} />
      </div>
    </div>
  </div>
);

// ===== S14 — TIMELINE =====
export const S14 = ({ go, m, p, returnStatus }) => {
  const events = [
    { ic: '🏠', col: C.accent, time: 'Pre-Transfer', label: 'Baseline Record on File', sub: 'Code: ' + p.code + ' · ' + p.allergy.length + ' allergy(ies) documented' },
    { ic: '📝', col: C.navy, time: p.tx.time || '—', label: 'Transfer Initiated', sub: p.tx.reason?.slice(0, 80) + '…' || '' },
    { ic: '📱', col: C.accent, time: p.tx.time || '—', label: 'QR Code Generated', sub: 'Sent to: ' + (p.tx.dest || '—') },
    { ic: '🚑', col: C.amber, time: 'En Route', label: 'EMS Scanned QR', sub: 'Full record accessed on transport' },
    { ic: '🏥', col: C.green, time: p.er.time?.replace(' at ', ', ') || '—', label: 'ED Received Patient', sub: p.er.dr || '—' },
    { ic: '✅', col: C.green, time: returnStatus?.edSubmitted || p.er.time || '—', label: 'ED Documentation Complete', sub: p.er.dx || '—' },
    { ic: '🔔', col: C.accent, time: returnStatus?.facilityNotified || p.er.rpt || '—', label: 'Facility Notified', sub: 'Push notification delivered' },
    { ic: '✍️', col: C.purple, time: returnStatus?.nurseAcknowledged || 'Pending', label: 'Nurse Acknowledged', sub: returnStatus?.nurseAcknowledged ? 'Instructions acknowledged by facility nurse' : 'Awaiting facility acknowledgment' },
    { ic: '🏠', col: C.green, time: returnStatus?.recordClosed || 'Current', label: 'Return Record Closed', sub: returnStatus?.recordClosed ? 'Closed-loop complete' : 'Open until acknowledged' },
  ];
  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <TB m={m} left={<Bk go={go} to={13} label="Back" />} ctr="Transfer Timeline" />
      <div style={{ padding: m ? 14 : 20, maxWidth: 600, margin: '0 auto' }}>
        <Cd m={m} style={{ marginBottom: 16 }} ch={<>
          <div style={{ fontSize: 15, fontWeight: 800, color: C.navy, marginBottom: 4 }}>{p.short} — Complete Timeline</div>
          <div style={{ fontSize: 12, color: C.txS }}>From pre-transfer to return · {p.tx.time?.split(' at ')[0] || 'Today'}</div>
        </>} />
        <div style={{ paddingLeft: m ? 10 : 16, position: 'relative' }}>
          <div style={{ position: 'absolute', left: m ? 22 : 28, top: 0, bottom: 0, width: 2, background: `linear-gradient(180deg,${C.accent},${C.green})`, borderRadius: 1 }} />
          {events.map((ev, i) => (
            <div key={i} style={{ display: 'flex', gap: m ? 10 : 16, marginBottom: m ? 16 : 20, position: 'relative', alignItems: 'flex-start' }}>
              <div style={{ width: m ? 28 : 36, height: m ? 28 : 36, borderRadius: m ? 14 : 18, background: ev.col, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: m ? 12 : 16, flexShrink: 0, boxShadow: `0 2px 8px ${ev.col}40`, position: 'relative', zIndex: 1 }}>{ev.ic}</div>
              <div style={{ paddingTop: m ? 4 : 6 }}>
                <div style={{ fontSize: m ? 10 : 11, color: C.txT, fontWeight: 600 }}>{ev.time}</div>
                <div style={{ fontSize: m ? 13 : 14, fontWeight: 700, color: C.navy, lineHeight: 1.2 }}>{ev.label}</div>
                <div style={{ fontSize: m ? 11 : 12, color: C.txS, marginTop: 2 }}>{ev.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <Bt full ch="Return Home" onClick={() => go(0)} m={m} />
      </div>
    </div>
  );
};

// ===== S17 — FACILITY DASHBOARD =====
export const S17 = ({ go, m, p, patients, persona, alerts, dismissAlert, returnTracking }) => {
  const stats = [
    { n: patients.length, l: 'Residents', ic: '👥', c: C.accent },
    { n: patients.filter(x => x.tx && x.tx.reason).length, l: 'Transfers Today', ic: '🚑', c: C.amber },
    { n: patients.filter(x => x.er && x.er.dx).length, l: 'ED Returns', ic: '✅', c: C.green },
    { n: patients.filter(x => x.polst).length, l: 'POLST on File', ic: '📋', c: C.purple },
  ];
  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <TB m={m} left={<Bk go={go} to={15} label="Back" />} ctr="Facility Dashboard" />
      <div style={{ padding: m ? 14 : 20, maxWidth: 700, margin: '0 auto' }}>
        <div style={{ background: `linear-gradient(135deg,${C.navy},${C.navyL})`, borderRadius: 16, padding: m ? '16px 14px' : '20px 24px', marginBottom: m ? 14 : 20, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: m ? 16 : 20, fontWeight: 800 }}>Welcome back, {persona ? persona.name.split(' ')[0] : 'Nurse'} 👋</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,.55)', marginTop: 2 }}>Cascade View · {persona ? persona.shift : 'Day Shift'}</div>
          </div>
          <div style={{ fontSize: 32 }}>🏥</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: m ? 8 : 12, marginBottom: m ? 14 : 20 }}>
          {stats.map((s, i) => (
            <Cd key={i} m={m} style={{ textAlign: 'center', borderTop: `3px solid ${s.c}` }} ch={<>
              <div style={{ fontSize: 24 }}>{s.ic}</div>
              <div style={{ fontSize: m ? 28 : 36, fontWeight: 900, color: s.c }}>{s.n}</div>
              <div style={{ fontSize: 12, color: C.txS }}>{s.l}</div>
            </>} />
          ))}
        </div>
        {alerts.length > 0 && <>
          <SL ch="Active Alerts" ic="🔔" />
          {alerts.map((al, i) => (
            <Cd key={i} m={m} style={{ borderLeft: `4px solid ${al.type === 'warning' ? C.red : C.amber}`, background: al.type === 'warning' ? C.lR : C.lW }} ch={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>{al.text}</div>
                  <div style={{ fontSize: 12, color: C.txS, marginTop: 2 }}>{al.sub}</div>
                </div>
                <button onClick={() => dismissAlert(i)} style={{ marginLeft: 12, fontSize: 16, color: C.txT, background: 'none', border: 'none', cursor: 'pointer', minWidth: 32, minHeight: 32, flexShrink: 0 }}>✕</button>
              </div>
            } />
          ))}
        </>}
        {patients.filter(pt => pt.er?.dx && !returnTracking?.[pt.id]?.nurseAcknowledged).length > 0 && (
          <Cd m={m} style={{ borderLeft: `4px solid ${C.amber}`, background: C.lW }} ch={<>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>Returned patients need acknowledgement</div>
            <div style={{ fontSize: 12, color: C.txS, marginTop: 2 }}>
              {patients.filter(pt => pt.er?.dx && !returnTracking?.[pt.id]?.nurseAcknowledged).map(pt => pt.short).join(', ')}
            </div>
          </>} />
        )}
        <SL ch="Quick Actions" ic="⚡" />
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? 8 : 12, marginBottom: 14 }}>
          {[['Patient Roster', '📋', 1], ['Transfer History', '📁', 18], ['SBAR Report', '📊', 19], ['New Patient', '➕', 'add']].map(([l, ic, s], i) => (
            <Cd key={i} m={m} onClick={() => go(s)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }} ch={<>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: C.lA, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{ic}</div>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.navy }}>{l}</span>
            </>} />
          ))}
        </div>
        <SL ch="Recent Activity" ic="📊" />
        {patients.filter(x => x.tx && x.tx.reason).map((pt, i) => (
          <Cd key={i} m={m} onClick={() => { go(2); }} style={{ cursor: 'pointer' }} ch={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Av sz={32} init={pt.init} />
                <div><div style={{ fontSize: 14, fontWeight: 600, color: C.navy }}>{pt.short}</div><div style={{ fontSize: 12, color: C.txS }}>{pt.tx.time}</div></div>
              </div>
              <Bg ch={pt.er && pt.er.dx ? '✓ Returned' : 'In Transfer'} bg={pt.er && pt.er.dx ? C.green : C.amber} style={{ fontSize: 11 }} />
            </div>
          } />
        ))}
      </div>
    </div>
  );
};

// ===== S18 — TRANSFER HISTORY =====
export const S18 = ({ go, m, patients, setPt }) => {
  const [tab, setTab] = useState(0);
  const tabs = ['All', 'Active', 'Completed', 'Last 30d'];
  const txPts = patients.filter(p => p.tx && p.tx.reason);
  const filtered = txPts.filter(p => {
    if (tab === 1) return !(p.er && p.er.dx);
    if (tab === 2) return p.er && p.er.dx;
    return true;
  });
  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <TB m={m} left={<Bk go={go} to={17} label="Dashboard" />} ctr="Transfer History" />
      <div style={{ padding: m ? 14 : 20, maxWidth: 700, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: m ? 14 : 20, overflowX: 'auto', paddingBottom: 4 }}>
          {tabs.map((t, i) => <span key={i} onClick={() => setTab(i)} style={{ padding: '8px 18px', borderRadius: 20, fontSize: 13, fontWeight: 600, background: tab === i ? C.accent : '#fff', color: tab === i ? '#fff' : C.txS, cursor: 'pointer', whiteSpace: 'nowrap', border: `1px solid ${tab === i ? C.accent : C.bdr}` }}>{t}</span>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr 1fr', gap: m ? 8 : 12, marginBottom: 16 }}>
          {[['Total Transfers', txPts.length, C.accent], ['Active', txPts.filter(p => !(p.er && p.er.dx)).length, C.amber], ['Completed', txPts.filter(p => p.er && p.er.dx).length, C.green]].map(([l, n, c], i) => (
            <Cd key={i} m={m} style={{ textAlign: 'center', borderTop: `3px solid ${c}` }} ch={<><div style={{ fontSize: m ? 24 : 28, fontWeight: 900, color: c }}>{n}</div><div style={{ fontSize: 12, color: C.txS }}>{l}</div></>} />
          ))}
        </div>
        {filtered.length === 0 ? <Cd m={m} ch={<div style={{ textAlign: 'center', padding: 32, color: C.dis }}>No transfers in this category.</div>} /> : filtered.map((pt, i) => (
          <Cd key={i} m={m} onClick={() => { setPt(pt.id); go(2); }} style={{ cursor: 'pointer', borderLeft: `4px solid ${pt.er && pt.er.dx ? C.green : C.amber}` }} ch={
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <Av sz={36} init={pt.init} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: C.navy }}>{pt.short}</span>
                  <Bg ch={pt.er && pt.er.dx ? '✓ Returned' : '⚡ Active'} bg={pt.er && pt.er.dx ? C.green : C.amber} style={{ fontSize: 11 }} />
                </div>
                <div style={{ fontSize: 12, color: C.txS, lineHeight: 1.5 }}>
                  <span>{pt.tx.time}</span> · <span>{pt.tx.dest?.split(',')[0]}</span>
                </div>
                <div style={{ fontSize: 12, color: C.txT, marginTop: 4 }}>{pt.tx.reason?.slice(0, 80)}…</div>
                {pt.er && pt.er.dx && <div style={{ fontSize: 12, fontWeight: 600, color: C.green, marginTop: 4 }}>Dx: {pt.er.dx}</div>}
              </div>
            </div>
          } />
        ))}
      </div>
    </div>
  );
};

// ===== S19 — SBAR REPORT =====
export const S19 = ({ go, m, patients }) => {
  const [ptIdx, setPtIdx] = useState(0);
  const pt = patients[ptIdx];
  const [copied, setCopied] = useState(false);
  const sbar = [
    { label: 'S — Situation', color: C.red, ic: '🔴', content: `I am calling about ${pt.name}, room ${pt.room}. The reason for this communication is: ${pt.tx.reason || '[Transfer reason]'}. Symptoms include: ${(pt.tx.symp || []).join(', ') || '[symptoms]'}.` },
    { label: 'B — Background', color: C.amber, ic: '🟡', content: `Code Status: ${pt.code}. ${pt.polst ? 'POLST on file.' : ''} Allergies: ${pt.allergy.length > 0 ? pt.allergy.join(', ') : 'NKA'}. Conditions: ${pt.hx.join(', ')}. Current medications: ${pt.meds.map(x => x.n + ' ' + x.f).join('; ')}.` },
    { label: 'A — Assessment', color: C.accent, ic: '🔵', content: `Recent changes: ${pt.tx.chg || '[Recent changes]'}. Interventions taken: ${pt.tx.intv || '[Interventions]'}.` },
    { label: 'R — Recommendation', color: C.green, ic: '🟢', content: `Patient is being transferred to ${pt.tx.dest || '[Destination]'}. Family contact: ${pt.contact} (${pt.contactRel}) ${pt.contactPh}. ${pt.comfort.comm}` },
  ];
  const fullText = sbar.map(s => `${s.label}:\n${s.content}`).join('\n\n');
  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <TB m={m} left={<Bk go={go} to={17} label="Dashboard" />} ctr="SBAR Report" />
      <div style={{ padding: m ? 14 : 20, maxWidth: 600, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {patients.map((p, i) => <span key={i} onClick={() => setPtIdx(i)} style={{ padding: '8px 16px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: ptIdx === i ? C.accent : '#fff', color: ptIdx === i ? '#fff' : C.txS, cursor: 'pointer', border: `1px solid ${ptIdx === i ? C.accent : C.bdr}` }}>{p.init} — {p.short}</span>)}
        </div>
        {sbar.map((s, i) => (
          <Cd key={i} m={m} style={{ borderLeft: `4px solid ${s.color}`, marginBottom: m ? 8 : 12 }} ch={<>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 16 }}>{s.ic}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: s.color, textTransform: 'uppercase', letterSpacing: .8 }}>{s.label}</span>
            </div>
            <div style={{ fontSize: 13, color: C.tx, lineHeight: 1.7 }}>{s.content}</div>
          </>} />
        ))}
        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <Bt full ch={copied ? '✓ Copied!' : '📋 Copy SBAR'} bg={copied ? C.green : C.accent} onClick={() => { navigator.clipboard.writeText(fullText).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); }} m={m} />
          <Bt full outline ch="🖨 Print" onClick={() => window.print()} m={m} />
        </div>
      </div>
    </div>
  );
};
