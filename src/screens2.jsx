import React, { useState } from 'react';
import { C, Chk, Bg, Av, Cd, Bt, SL, TB, Bk, FR, TxIn, MedSourceBadge, ReturnStates } from './components.jsx';
import { PtSwitcher, TransferTracker } from './clinical.jsx';
import { INTEGRATIONS, FACILITY_MODES, FACILITY_INFO } from './data.js';

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
      <div style={{ padding: m ? 14 : 20, maxWidth: 620, margin: '0 auto' }}>
        <div style={{ background: `linear-gradient(90deg,${C.lG},#F0FFF4)`, borderRadius: 12, padding: '12px 16px', marginBottom: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ width: 32, height: 32, borderRadius: 16, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Chk s={16} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: C.greenD }}>Closing the loop for {p.short}</div>
            <div style={{ fontSize: 12, color: C.txS }}>Submit pushes an instant notification to {p.fac.split(' ')[0]} · acknowledgement is tracked</div>
          </div>
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

// ===== S12 — RECORD UPDATED / LOOP CLOSING =====
export const S12 = ({ go, m, p }) => (
  <div style={{ minHeight: '100vh', background: C.bg }}>
    <div style={{ background: `linear-gradient(160deg,${C.greenD} 0%,#1B6B3A 60%,#145C31 100%)`, padding: m ? '36px 20px 30px' : '48px 40px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 280, height: 280, borderRadius: 140, background: 'rgba(255,255,255,.04)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 180, height: 180, borderRadius: 90, background: 'rgba(255,255,255,.05)', pointerEvents: 'none' }} />
      <div style={{ width: m ? 64 : 80, height: m ? 64 : 80, borderRadius: m ? 32 : 40, background: 'rgba(255,255,255,.15)', border: '2.5px solid rgba(255,255,255,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', animation: 'confirmBounce .6s cubic-bezier(.22,1,.36,1)', backdropFilter: 'blur(8px)' }}>
        <Chk s={m ? 30 : 38} />
      </div>
      <div style={{ fontSize: m ? 22 : 28, fontWeight: 900, color: '#fff', marginBottom: 6, letterSpacing: -.3 }}>Return packet submitted</div>
      <div style={{ fontSize: m ? 13 : 14, color: 'rgba(255,255,255,.78)', lineHeight: 1.55, maxWidth: 380, margin: '0 auto' }}>
        {p.fac} has been pushed a notification. Awaiting nurse acknowledgement.
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>
        <span style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>✓ Submitted</span>
        <span style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>✓ Push notification sent</span>
        <span style={{ background: 'rgba(255,255,255,.08)', border: '1px dashed rgba(255,255,255,.3)', color: 'rgba(255,255,255,.75)', padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>⏳ Ack pending</span>
      </div>
    </div>

    <div style={{ padding: m ? '16px 14px' : '24px 28px', maxWidth: 560, margin: '0 auto' }}>
      <ReturnStates er={p.er} m={m} />
      <Cd m={m} style={{ borderLeft: `4px solid ${C.green}`, marginTop: 14, marginBottom: 14 }} ch={<>
        <SL ch="ED Summary" ic="✅" />
        <FR l="Diagnosis" v={<strong>{p.er.dx || '—'}</strong>} hl />
        {p.er.dr && <FR l="Provider" v={p.er.dr} />}
        {p.er.rx && <FR l="Medication changes" v={p.er.rx} />}
        {p.er.ins && <FR l="Instructions" v={p.er.ins} />}
      </>} />
      <div style={{ display: 'flex', gap: m ? 8 : 10, flexDirection: m ? 'column' : 'row' }}>
        <Bt full outline ch="View facility side" onClick={() => go(13)} m={m} />
        <Bt full ch="Return Home" onClick={() => go(0)} m={m} bg={C.green} />
      </div>
      <div style={{ textAlign: 'center', marginTop: 12 }}>
        <span onClick={() => go(14)} style={{ fontSize: 13, color: C.accent, fontWeight: 600, cursor: 'pointer' }}>View full transfer timeline →</span>
      </div>
    </div>
  </div>
);


// ===== S13 — FACILITY RETURN / ACKNOWLEDGE =====
export const S13 = ({ go, m, p, patients, ptId, setPt, ackReturn }) => {
  const [copied, setCopied] = useState(false);
  const [dl, setDl] = useState(false);
  const acked = !!p.er?.ackedAt;
  const ackLabel = acked ? `✓ Acknowledged by ${p.er.ackedBy} at ${p.er.ackedAt}` : 'Acknowledge return — closes the loop';
  const summary = `${p.short} · ${p.fac}\nDx: ${p.er.dx || '—'}\nProvider: ${p.er.dr || '—'}\nVitals: BP ${p.er.bp}, HR ${p.er.hr}, RR ${p.er.rr}, SpO2 ${p.er.sp}\nMed changes: ${p.er.rx || 'None'}\nInstructions: ${p.er.ins || '—'}`;
  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <TB m={m} left={<Bk go={go} to={0} label="Home" />} ctr="Patient Returned" accent={C.green} right={<PtSwitcher patients={patients} ptId={ptId} setPt={setPt} m={m} />} />
      <div style={{ padding: m ? 14 : 20, maxWidth: 720, margin: '0 auto' }}>
        {/* Push-notification banner that persists until acked */}
        <div style={{ background: acked ? `linear-gradient(90deg,${C.lG},#F0FFF4)` : `linear-gradient(90deg,#FFF5E1,#FFE8C4)`, border: `1.5px solid ${acked ? C.green : C.amber}`, borderLeft: `4px solid ${acked ? C.green : C.amberD}`, borderRadius: 12, padding: m ? '12px 14px' : '14px 20px', marginBottom: m ? 10 : 14, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 22 }}>{acked ? '✅' : '🔔'}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: acked ? C.greenD : C.amberD }}>
              {acked ? `Return loop closed for ${p.short}` : `Push notification — ${p.short} has returned from the ED`}
            </div>
            <div style={{ fontSize: 12, color: C.txS }}>
              {p.er.time || 'Today'} · via {p.tx?.dest?.split(',')[0] || 'ED'}
              {!acked && ' · awaiting nurse acknowledgement'}
            </div>
          </div>
        </div>

        {/* Delivery state tracker */}
        <div style={{ marginBottom: 14 }}>
          <ReturnStates er={p.er} m={m} />
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
          {p.er.rx && <FR l="Medication changes" v={<span>{p.er.rx} <MedSourceBadge src={{ method: 'manual', label: 'From ED return', count: (p.er.rx.match(/\d+mg/g) || ['mg']).length, verified: true }} compact /></span>} />}
        </>} />

        <div style={{ display: 'flex', gap: m ? 8 : 10, marginTop: 10, flexWrap: 'wrap' }}>
          <Bt ch={copied ? '✓ Instructions copied' : '📋 Copy instructions'} outline bg={copied ? C.green : C.accent} onClick={() => { try { navigator.clipboard && navigator.clipboard.writeText(summary); } catch { /* clipboard not available */ } setCopied(true); setTimeout(() => setCopied(false), 1800); }} m={m} style={{ flex: 1, minWidth: 180 }} />
          <Bt ch={dl ? '✓ Summary downloaded' : '⬇ Download return summary'} outline bg={dl ? C.green : C.accent} onClick={() => { setDl(true); setTimeout(() => setDl(false), 1800); }} m={m} style={{ flex: 1, minWidth: 180 }} />
        </div>

        <div style={{ display: 'flex', gap: m ? 8 : 12, marginTop: 10, flexDirection: m ? 'column' : 'row' }}>
          <Bt full outline ch="View Full Timeline" onClick={() => go(14)} m={m} />
          <Bt full ch={ackLabel} disabled={acked} onClick={() => { if (!acked && ackReturn) ackReturn(); go(0); }} m={m} bg={C.green} />
        </div>
      </div>
    </div>
  );
};

// ===== S14 — TIMELINE =====
export const S14 = ({ go, m, p }) => {
  const events = [
    { ic: '🏠', col: C.accent, time: 'Pre-Transfer', label: 'Baseline Record on File', sub: 'Code: ' + p.code + ' · ' + p.allergy.length + ' allergy(ies) documented' },
    { ic: '📝', col: C.navy, time: p.tx.time || '—', label: 'Transfer Initiated', sub: p.tx.reason?.slice(0, 80) + '…' || '' },
    { ic: '📱', col: C.accent, time: p.tx.time || '—', label: 'QR Code Generated', sub: 'Sent to: ' + (p.tx.dest || '—') },
    { ic: '🚑', col: C.amber, time: 'En Route', label: 'EMS Scanned QR', sub: 'Full record accessed on transport' },
    { ic: '🏥', col: C.green, time: p.er.time?.replace(' at ', ', ') || '—', label: 'ED Received Patient', sub: p.er.dr || '—' },
    { ic: '✅', col: C.green, time: p.er.time || '—', label: 'ED Documentation Complete', sub: p.er.dx || '—' },
    { ic: '🔔', col: C.accent, time: p.er.rpt || '—', label: 'Facility Notified', sub: 'Report called to Cascade View' },
    { ic: '🏠', col: C.green, time: 'Current', label: 'Patient Returned to Facility', sub: 'Record complete and closed' },
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

// ===== S17 — FACILITY OPERATIONS DASHBOARD =====
export const S17 = ({ go, m, patients, persona, alerts, dismissAlert, setPt }) => {
  const [filter, setFilter] = useState('all');
  const inTransfer = patients.filter(x => x.tx?.reason && !(x.er?.submittedAt));
  const pendingReturn = patients.filter(x => x.tx?.reason && x.er?.dx && !x.er?.ackedAt);
  const acked = patients.filter(x => x.er?.ackedAt);
  const followUp = patients.filter(x => x.er?.ins && /follow up|follow-up|pulmonology|cardiology|endocrinology/i.test(x.er.ins));
  const completionRate = patients.length ? Math.round((acked.length / Math.max(1, patients.filter(x => x.tx?.reason).length)) * 100) : 0;

  const stats = [
    { n: inTransfer.length, l: 'Active transfers', ic: '🚑', c: C.amber, filter: 'active' },
    { n: pendingReturn.length, l: 'Needs acknowledgement', ic: '🔔', c: C.red, filter: 'needsAck' },
    { n: followUp.length, l: 'Follow-up due', ic: '📅', c: C.purple, filter: 'followup' },
    { n: `${completionRate}%`, l: 'Return loops closed', ic: '✅', c: C.green, filter: 'acked' },
  ];

  const filters = [
    { id: 'all', label: 'All residents', count: patients.length },
    { id: 'active', label: 'Active transfers', count: inTransfer.length },
    { id: 'needsAck', label: 'Needs ack', count: pendingReturn.length },
    { id: 'acked', label: 'Closed today', count: acked.length },
    { id: 'followup', label: 'Follow-up', count: followUp.length },
  ];
  const filtered = filter === 'active' ? inTransfer
    : filter === 'needsAck' ? pendingReturn
    : filter === 'acked' ? acked
    : filter === 'followup' ? followUp
    : patients;

  const firstPending = pendingReturn[0];

  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <TB m={m} left={<Bk go={go} to={15} label="Back" />} ctr="Facility Dashboard" />
      <div style={{ padding: m ? 14 : 20, maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: `linear-gradient(135deg,${C.navy},${C.navyL})`, borderRadius: 16, padding: m ? '14px 14px' : '18px 22px', marginBottom: m ? 12 : 16, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: m ? 15 : 18, fontWeight: 800 }}>Welcome back, {persona ? persona.name.split(' ')[0] : 'Nurse'}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,.55)', marginTop: 2 }}>{FACILITY_INFO.shortName} · {persona ? persona.shift : 'Day shift'} · {FACILITY_INFO.modeLabel}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.55)', textTransform: 'uppercase', letterSpacing: 1 }}>Beds · Type</div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{FACILITY_INFO.bedCount} · {FACILITY_INFO.type.split(' + ')[0]}</div>
          </div>
        </div>

        {/* Pending acknowledgement banner */}
        {firstPending && (
          <div style={{ background: `linear-gradient(90deg,#FFF5E1,#FFE8C4)`, border: `1.5px solid ${C.amber}`, borderLeft: `4px solid ${C.amberD}`, borderRadius: 12, padding: m ? '12px 14px' : '14px 18px', marginBottom: 12, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 22 }}>🔔</span>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontWeight: 800, color: C.amberD, fontSize: 14 }}>{pendingReturn.length} return{pendingReturn.length === 1 ? '' : 's'} awaiting acknowledgement</div>
              <div style={{ fontSize: 12, color: C.txS }}>{firstPending.short}: {firstPending.er?.dx?.slice(0, 70)}…</div>
            </div>
            <Bt ch="Review + Ack" onClick={() => { setPt && setPt(firstPending.id); go(13); }} m={m} />
          </div>
        )}

        {/* Operational stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: m ? 6 : 10, marginBottom: m ? 12 : 16 }}>
          {stats.map((s, i) => (
            <div key={i} onClick={() => setFilter(s.filter)} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFilter(s.filter); } }} className="card-hover" style={{ background: '#fff', borderRadius: 12, padding: m ? '10px 6px' : '14px 10px', textAlign: 'center', border: `1px solid ${filter === s.filter ? s.c : C.bdr}`, borderTop: `3px solid ${s.c}`, cursor: 'pointer', transition: 'all .15s' }}>
              <div style={{ fontSize: m ? 16 : 18 }}>{s.ic}</div>
              <div style={{ fontSize: m ? 18 : 24, fontWeight: 900, color: s.c, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: m ? 9 : 10, color: C.txS, marginTop: 4, lineHeight: 1.2 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 12, overflowX: 'auto', paddingBottom: 2 }}>
          {filters.map(f => (
            <span key={f.id} onClick={() => setFilter(f.id)} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFilter(f.id); } }} style={{ padding: '7px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700, background: filter === f.id ? C.navy : '#fff', color: filter === f.id ? '#fff' : C.txS, border: `1px solid ${filter === f.id ? C.navy : C.bdr}`, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {f.label} <span style={{ opacity: .65 }}>· {f.count}</span>
            </span>
          ))}
        </div>

        {/* Quick actions */}
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr 1fr' : '1fr 1fr 1fr 1fr', gap: m ? 6 : 10, marginBottom: m ? 12 : 16 }}>
          {[['Start transfer', '🚑', 1, C.amber], ['SBAR report', '📊', 19, C.purple], ['History', '📁', 18, C.accent], ['Integrations', '🔌', 20, C.green]].map(([l, ic, s, c], i) => (
            <div key={i} onClick={() => go(s)} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(s); } }} className="card-hover" style={{ cursor: 'pointer', background: '#fff', border: `1px solid ${C.bdr}`, borderLeft: `3px solid ${c}`, borderRadius: 12, padding: m ? '10px 10px' : '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ fontSize: m ? 18 : 22 }}>{ic}</div>
              <span style={{ fontSize: m ? 12 : 13, fontWeight: 700, color: C.navy }}>{l}</span>
            </div>
          ))}
        </div>

        {alerts.length > 0 && <>
          <SL ch="Active alerts" ic="🔔" />
          {alerts.map((al, i) => (
            <Cd key={i} m={m} style={{ borderLeft: `4px solid ${al.type === 'warning' ? C.red : C.amber}`, background: al.type === 'warning' ? C.lR : C.lW }} ch={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>{al.text}</div>
                  <div style={{ fontSize: 12, color: C.txS, marginTop: 2 }}>{al.sub}</div>
                </div>
                <button onClick={() => dismissAlert(i)} aria-label="Dismiss alert" style={{ marginLeft: 12, fontSize: 16, color: C.txT, background: 'none', border: 'none', cursor: 'pointer', minWidth: 32, minHeight: 32, flexShrink: 0 }}>✕</button>
              </div>
            } />
          ))}
        </>}

        {/* Resident list */}
        <SL ch={filters.find(f => f.id === filter)?.label || 'Residents'} ic="📋" />
        {filtered.length === 0 && (
          <Cd m={m} ch={<div style={{ textAlign: 'center', padding: 20, fontSize: 13, color: C.txT }}>Nothing in this bucket right now.</div>} />
        )}
        {filtered.map((pt, i) => {
          const isActive = pt.tx?.reason && !(pt.er?.submittedAt);
          const needsAck = pt.tx?.reason && pt.er?.dx && !pt.er?.ackedAt;
          const isAcked = !!pt.er?.ackedAt;
          const badge = needsAck ? { c: C.red, label: '🔔 Needs ack' } : isActive ? { c: C.amber, label: '⚡ In transfer' } : isAcked ? { c: C.green, label: '✓ Loop closed' } : { c: C.accent, label: '— At facility' };
          return (
            <Cd key={i} m={m} onClick={() => { setPt && setPt(pt.id); go(needsAck ? 13 : 2); }} style={{ cursor: 'pointer', borderLeft: `3px solid ${badge.c}` }} ch={
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Av sz={36} init={pt.init} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>{pt.short}</span>
                    <span style={{ fontSize: 11, color: C.txS }}>· Rm {pt.room}</span>
                    <Bg ch={pt.code} bg={pt.codeType === 'dnr' ? C.red : C.green} style={{ fontSize: 10, padding: '2px 7px' }} />
                  </div>
                  <div style={{ fontSize: 11, color: C.txS, marginTop: 2 }}>
                    {pt.tx?.reason ? pt.tx.reason.slice(0, 70) + (pt.tx.reason.length > 70 ? '…' : '') : 'No active transfer'}
                  </div>
                </div>
                <Bg ch={badge.label} bg={badge.c} style={{ fontSize: 10, flexShrink: 0 }} />
              </div>
            } />
          );
        })}
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

// ===== S19 — SBAR REPORT GENERATOR (variants) =====
export const S19 = ({ go, m, patients, persona }) => {
  const [ptIdx, setPtIdx] = useState(0);
  const [variant, setVariant] = useState('ems');
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const pt = patients[ptIdx];
  const author = persona?.name || 'RN Sarah Mitchell';
  const now = pt.tx?.time || 'March 20, 2026 at 2:47 AM';

  const medText = pt.meds.map(x => x.n + ' ' + x.f).join('; ') || 'None on file';
  const medSourceText = pt.medSource ? `Source: ${pt.medSource.label} (${pt.medSource.count} meds, imported ${pt.medSource.importedAt}, verified at transfer).` : 'Source: manual entry — unverified.';
  const pcFlags = [
    pt.interpreter && `${pt.lang} interpreter needed`,
    pt.comfort?.triggers && `Behavioral triggers: ${pt.comfort.triggers}`,
    pt.comfort?.calming && `Calming: ${pt.comfort.calming}`,
    pt.comfort?.diet && `Diet: ${pt.comfort.diet}`,
  ].filter(Boolean).join(' · ');

  const variants = {
    ems: {
      label: 'EMS handoff',
      ic: '🚑',
      color: C.amber,
      s: `EMS en route / on scene with ${pt.name}, age ${pt.age}, from ${pt.fac}. Reason: ${pt.tx?.reason || '—'}. Destination: ${pt.tx?.dest || '—'}.`,
      b: `Code: ${pt.code}. ${pt.polst ? 'POLST on file. ' : ''}Allergies: ${pt.allergy.join(', ') || 'NKA'}. Hx: ${pt.hx.join(', ')}. Meds: ${medText}. ${medSourceText}`,
      a: `Symptoms on exit: ${(pt.tx?.symp || []).join(', ') || '—'}. Last vitals: ${pt.tx?.lastVitals || '—'}. Interventions: ${pt.tx?.intv || '—'}. Recent 72h: ${pt.tx?.chg || '—'}.`,
      r: `Transport to ${pt.tx?.dest || 'receiving ED'}. Family contact: ${pt.contact} (${pt.contactRel}) ${pt.contactPh}. Safety: ${pcFlags || '—'}.`,
    },
    ed: {
      label: 'ED triage',
      ic: '🏥',
      color: C.green,
      s: `${pt.name}, age ${pt.age}, arriving via EMS from ${pt.fac}. Primary reason: ${pt.tx?.reason || '—'}.`,
      b: `Code: ${pt.code}. ${pt.polst ? 'POLST on file. ' : ''}Allergies: ${pt.allergy.join(', ') || 'NKA'}. Language: ${pt.lang}${pt.interpreter ? ' (interpreter needed)' : ''}. Baseline hx: ${pt.hx.join(', ')}.`,
      a: `Last known vitals: ${pt.tx?.lastVitals || '—'}. Meds (verified at transfer): ${medText}. ${medSourceText}`,
      r: `Triage recommendation: evaluate for ${(pt.tx?.symp || []).join(' / ') || '—'}. Person-centered flags: ${pcFlags || '—'}. Return packet will notify ${pt.fac} automatically.`,
    },
    ret: {
      label: 'Facility return',
      ic: '🏠',
      color: C.accent,
      s: `${pt.name} returned from ${pt.tx?.dest?.split(',')[0] || 'the ED'} at ${pt.er?.time || '—'}. Primary diagnosis: ${pt.er?.dx || '—'}.`,
      b: `Seen by ${pt.er?.dr || '—'}. Vitals at discharge: BP ${pt.er?.bp || '—'}, HR ${pt.er?.hr || '—'}, RR ${pt.er?.rr || '—'}, SpO2 ${pt.er?.sp || '—'}.`,
      a: `Medication changes: ${pt.er?.rx || 'None'}. Report called: ${pt.er?.rpt || 'See delivery states'}. Acknowledged: ${pt.er?.ackedAt ? pt.er.ackedAt + ' by ' + pt.er.ackedBy : 'Pending'}.`,
      r: `Discharge instructions: ${pt.er?.ins || '—'}. Update care plan, resume person-centered preferences: ${pcFlags || '—'}.`,
    },
  };
  const v = variants[variant];
  const sbar = [
    { label: 'S — Situation', color: C.red, ic: '🔴', content: v.s },
    { label: 'B — Background', color: C.amber, ic: '🟡', content: v.b },
    { label: 'A — Assessment', color: C.accent, ic: '🔵', content: v.a },
    { label: 'R — Recommendation', color: C.green, ic: '🟢', content: v.r },
  ];
  const header = `SBAR — ${v.label}\n${pt.name} · DOB ${pt.dob} · Room ${pt.room}\nAuthor: ${author}\nGenerated: ${now}\nSource-of-medications: ${pt.medSource ? pt.medSource.label : 'manual'}\n\n`;
  const fullText = header + sbar.map(s => `${s.label}\n${s.content}`).join('\n\n');

  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <TB m={m} left={<Bk go={go} to={17} label="Dashboard" />} ctr="SBAR Generator" />
      <div style={{ padding: m ? 14 : 20, maxWidth: 640, margin: '0 auto' }}>
        {/* Variant selector */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 12 }}>
          {Object.entries(variants).map(([k, vv]) => (
            <div key={k} onClick={() => setVariant(k)} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setVariant(k); } }} style={{ background: variant === k ? vv.color : '#fff', color: variant === k ? '#fff' : C.txS, border: `1.5px solid ${variant === k ? vv.color : C.bdr}`, borderRadius: 12, padding: m ? '8px 6px' : '10px 8px', textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: m ? 18 : 20 }}>{vv.ic}</div>
              <div style={{ fontSize: m ? 11 : 12, fontWeight: 800, marginTop: 2 }}>{vv.label}</div>
            </div>
          ))}
        </div>

        {/* Patient switcher */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
          {patients.map((p, i) => <span key={i} onClick={() => setPtIdx(i)} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPtIdx(i); } }} style={{ padding: '7px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: ptIdx === i ? C.accent : '#fff', color: ptIdx === i ? '#fff' : C.txS, cursor: 'pointer', border: `1px solid ${ptIdx === i ? C.accent : C.bdr}` }}>{p.init} — {p.short}</span>)}
        </div>

        {/* Report header card */}
        <Cd m={m} style={{ borderLeft: `4px solid ${v.color}`, marginBottom: m ? 8 : 12 }} ch={<>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 1.4, fontWeight: 800, color: v.color, textTransform: 'uppercase' }}>Generated from structured record</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.navy, marginTop: 2 }}>{pt.name} · SBAR · {v.label}</div>
              <div style={{ fontSize: 11, color: C.txS, marginTop: 2 }}>Author: {author} · Generated: {now}</div>
            </div>
            <MedSourceBadge src={pt.medSource} compact />
          </div>
        </>} />

        {sbar.map((s, i) => (
          <Cd key={i} m={m} style={{ borderLeft: `4px solid ${s.color}`, marginBottom: m ? 8 : 12 }} ch={<>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 16 }}>{s.ic}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: s.color, textTransform: 'uppercase', letterSpacing: .8 }}>{s.label}</span>
            </div>
            <div style={{ fontSize: 13, color: C.tx, lineHeight: 1.7 }}>{s.content}</div>
          </>} />
        ))}

        <div style={{ display: 'flex', gap: 10, marginTop: 8, flexWrap: 'wrap' }}>
          <Bt ch={copied ? '✓ Copied!' : '📋 Copy SBAR'} bg={copied ? C.green : C.accent} onClick={() => { try { navigator.clipboard && navigator.clipboard.writeText(fullText); } catch { /* clipboard not available */ } setCopied(true); setTimeout(() => setCopied(false), 1800); }} m={m} style={{ flex: 1, minWidth: 140 }} />
          <Bt outline ch={downloaded ? '✓ Downloaded' : '⬇ Download'} bg={downloaded ? C.green : C.accent} onClick={() => { setDownloaded(true); setTimeout(() => setDownloaded(false), 1800); }} m={m} style={{ flex: 1, minWidth: 120 }} />
          <Bt outline ch="🖨 Print" onClick={() => window.print()} m={m} style={{ flex: 1, minWidth: 120 }} />
        </div>
      </div>
    </div>
  );
};

// ===== S20 — INTEGRATIONS / DATA SOURCES =====
export const S20 = ({ go, m }) => {
  const [sel, setSel] = useState('pcc');
  const current = INTEGRATIONS.find(i => i.id === sel) || INTEGRATIONS[0];
  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <TB m={m} left={<Bk go={go} to={17} label="Dashboard" />} ctr="Integrations & Data Sources" />
      <div style={{ padding: m ? 14 : 20, maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: `linear-gradient(135deg,${C.navy},${C.navyL})`, color: '#fff', borderRadius: 14, padding: m ? '14px 14px' : '18px 22px', marginBottom: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.4, color: C.accent, textTransform: 'uppercase' }}>Prototype · architecture story</div>
          <div style={{ fontSize: m ? 15 : 18, fontWeight: 800, marginTop: 3 }}>Works with EHR, without EHR, and everything in between</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.7)', marginTop: 4, lineHeight: 1.55 }}>One product with three postures. Large health systems can push and pull via API. Mid-size facilities can upload PDFs and photos. Adult family homes can run standalone with no EHR access at all.</div>
        </div>

        {/* Facility mode cards */}
        <SL ch="Facility mode" ic="🏥" />
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr 1fr', gap: m ? 8 : 10, marginBottom: 18 }}>
          {FACILITY_MODES.map(mm => {
            const active = FACILITY_INFO.mode === mm.id;
            return (
              <div key={mm.id} style={{ background: '#fff', border: `1.5px solid ${active ? mm.color : C.bdr}`, borderTop: `3px solid ${mm.color}`, borderRadius: 12, padding: '12px 14px', position: 'relative' }}>
                {active && <span style={{ position: 'absolute', top: 8, right: 8, fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 10, background: mm.color, color: '#fff', letterSpacing: .4 }}>CURRENT</span>}
                <div style={{ fontSize: 22 }}>{mm.ic}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: C.navy, marginTop: 4 }}>{mm.label}</div>
                <div style={{ fontSize: 11, color: C.txS, marginTop: 3, lineHeight: 1.45 }}>{mm.sub}</div>
              </div>
            );
          })}
        </div>

        {/* Connector picker */}
        <SL ch="Connectors" ic="🔌" />
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? 8 : 10, marginBottom: 14 }}>
          {INTEGRATIONS.map(it => (
            <div key={it.id} onClick={() => setSel(it.id)} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(it.id); } }} className="card-hover" style={{ background: sel === it.id ? C.lA : '#fff', border: `1.5px solid ${sel === it.id ? C.accent : C.bdr}`, borderRadius: 12, padding: '12px 14px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <div style={{ fontSize: 22 }}>{it.logo}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: C.navy }}>{it.name}</div>
                  <div style={{ fontSize: 11, color: C.txS }}>{it.category}</div>
                </div>
                <Bg ch={it.status === 'connected' ? '● Connected' : 'Available'} bg={it.status === 'connected' ? C.green : '#F0F2F5'} color={it.status === 'connected' ? '#fff' : C.txS} style={{ fontSize: 10 }} />
              </div>
              <div style={{ fontSize: 11, color: C.txS, lineHeight: 1.5 }}>{it.desc}</div>
            </div>
          ))}
        </div>

        {/* Scope card for selected */}
        <Cd m={m} style={{ borderLeft: `4px solid ${C.accent}` }} ch={<>
          <SL ch={`${current.name} · read / write scope`} ic="🔐" />
          {current.scopes.map((sc, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < current.scopes.length - 1 ? `1px dashed ${C.bdr}` : 'none' }}>
              <div style={{ width: 22, height: 22, borderRadius: 11, background: sc.on ? C.green : '#F0F2F5', color: sc.on ? '#fff' : C.txT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>
                {sc.on ? <Chk s={12} /> : '—'}
              </div>
              <div style={{ fontSize: 13, color: sc.on ? C.tx : C.txT }}>{sc.v}</div>
            </div>
          ))}
          <div style={{ marginTop: 10, fontSize: 11, color: C.txT, fontStyle: 'italic' }}>
            Prototype view. Real API connection would be configured per facility during onboarding.
          </div>
        </>} />
      </div>
    </div>
  );
};
