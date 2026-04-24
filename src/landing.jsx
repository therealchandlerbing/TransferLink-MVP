import React, { useState } from 'react';
import { C, Cd, Bt, Bg } from './components.jsx';
import { PERSONAS, FACILITY_MODES } from './data.js';

export const LandingPage = ({ m, onStartOnboarding, onOpenPrototype }) => (
  <div style={{ minHeight: '100vh', background: `linear-gradient(160deg,${C.navy},#1C2F4A 48%,#203A5A)`, color: '#fff', padding: m ? '28px 16px 40px' : '48px 28px 56px' }}>
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: m ? 24 : 34 }}>
        <div style={{ fontSize: m ? 26 : 34, fontWeight: 900 }}>Transfer<span style={{ color: C.accent }}>Link</span></div>
        <Bg ch="Prototype Preview · April 2026" bg="rgba(255,255,255,.12)" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1.25fr .75fr', gap: m ? 12 : 22 }}>
        <Cd m={m} style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)' }} ch={<>
          <div style={{ fontSize: m ? 30 : 44, fontWeight: 900, lineHeight: 1.05, letterSpacing: -.8, marginBottom: 12 }}>
            One patient.<br />One record.<br />Every handoff.
          </div>
          <div style={{ fontSize: m ? 14 : 16, lineHeight: 1.8, color: 'rgba(255,255,255,.84)', marginBottom: 16 }}>
            A polished LTC-to-ED transfer prototype designed for sub-5-minute nurse workflow, medication accuracy, and closed-loop ED return.
          </div>
          <div style={{ display: 'flex', gap: 10, flexDirection: m ? 'column' : 'row' }}>
            <Bt ch="Start Onboarding Module" onClick={onStartOnboarding} bg={C.accent} m={m} />
            <Bt ch="Open Full Prototype" outline bg="#fff" onClick={onOpenPrototype} m={m} />
          </div>
        </>} />
        <Cd m={m} style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)' }} ch={<>
          {[
            ['< 5 min', 'Target transfer completion time'],
            ['Medication-safe', 'Import/upload provenance at transfer'],
            ['Closed-loop', 'ED return notifications + acknowledgement'],
            ['Standalone + API', 'Supports no-EHR and integrated facilities'],
          ].map(([v, d]) => (
            <div key={v} style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
              <div style={{ fontSize: 18, fontWeight: 800 }}>{v}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.7)' }}>{d}</div>
            </div>
          ))}
        </>} />
      </div>
    </div>
  </div>
);

export const OnboardingModule = ({ m, onBack, onComplete, setPersona, setRole }) => {
  const [selectedPersona, setSelectedPersona] = useState(0);
  const [selectedRole, setSelectedRole] = useState('RN / LVN');
  const [selectedMode, setSelectedMode] = useState(0);
  const roles = ['RN / LVN', 'Charge Nurse', 'Administrator', 'MD / NP'];
  return (
    <div style={{ minHeight: '100vh', background: C.bg, padding: m ? '14px' : '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontSize: m ? 20 : 26, fontWeight: 900, color: C.navy }}>Onboarding Module</div>
          <button onClick={onBack} style={{ border: 'none', background: '#E8ECEF', borderRadius: 10, padding: '8px 12px', cursor: 'pointer', fontWeight: 700 }}>Back</button>
        </div>
        <Cd m={m} ch={<>
          <div style={{ fontSize: 13, color: C.txS, marginBottom: 14 }}>Configure a facility-ready session for live demo use.</div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.txS, textTransform: 'uppercase', marginBottom: 6 }}>Persona</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {PERSONAS.map((p, idx) => <span key={p.name} onClick={() => setSelectedPersona(idx)} style={{ padding: '7px 10px', borderRadius: 16, cursor: 'pointer', fontSize: 12, fontWeight: 700, background: selectedPersona === idx ? C.accent : '#F0F2F5', color: selectedPersona === idx ? '#fff' : C.txS }}>{p.name}</span>)}
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.txS, textTransform: 'uppercase', marginBottom: 6 }}>Role</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {roles.map((r) => <span key={r} onClick={() => setSelectedRole(r)} style={{ padding: '7px 10px', borderRadius: 16, cursor: 'pointer', fontSize: 12, fontWeight: 700, background: selectedRole === r ? C.navy : '#F0F2F5', color: selectedRole === r ? '#fff' : C.txS }}>{r}</span>)}
            </div>
          </div>
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.txS, textTransform: 'uppercase', marginBottom: 6 }}>Facility mode</div>
            <div style={{ display: 'grid', gap: 8 }}>
              {FACILITY_MODES.map((mode, idx) => (
                <div key={mode.key} onClick={() => setSelectedMode(idx)} style={{ border: `1px solid ${selectedMode === idx ? C.accent : C.bdr}`, borderRadius: 10, padding: '9px 10px', background: selectedMode === idx ? C.lA : '#fff', cursor: 'pointer' }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: C.navy }}>{mode.label}</div>
                  <div style={{ fontSize: 11, color: C.txS }}>{mode.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <Bt
            full
            ch="Continue to Dashboard"
            onClick={() => {
              setPersona(PERSONAS[selectedPersona]);
              setRole(selectedRole);
              onComplete();
            }}
            m={m}
          />
        </>} />
      </div>
    </div>
  );
};
