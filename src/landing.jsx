import React, { useState } from 'react';
import { C, Cd, Bt, Bg } from './components.jsx';
import { PERSONAS, FACILITY_MODES } from './data.js';

export const LandingPage = ({ m, onStartOnboarding, onOpenPrototype, onOpenLegacy, hasResume }) => (
  <div style={{ minHeight: '100vh', background: `radial-gradient(circle at 12% 10%,rgba(27,154,170,.2),transparent 32%), radial-gradient(circle at 88% 18%,rgba(124,77,255,.18),transparent 28%), linear-gradient(164deg,${C.navy},#1A2E47 42%,#223C5D)`, color: '#fff', padding: m ? '24px 14px 34px' : '34px 26px 44px' }}>
    <div style={{ maxWidth: 1160, margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: m ? 18 : 26 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(27,154,170,.18)', border: '1px solid rgba(27,154,170,.45)', display: 'grid', placeItems: 'center', fontWeight: 900, color: C.accent }}>TL</div>
          <div style={{ fontSize: m ? 24 : 30, fontWeight: 900, letterSpacing: -.4 }}>Transfer<span style={{ color: C.accent }}>Link</span></div>
        </div>
        <Bg ch="Prototype Review Build · April 2026" bg="rgba(255,255,255,.1)" />
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1.2fr .8fr', gap: m ? 10 : 16 }}>
        <Cd m={m} style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', boxShadow: '0 20px 60px rgba(0,0,0,.22)' }} ch={<>
          <div style={{ fontSize: m ? 12 : 13, letterSpacing: 1.2, textTransform: 'uppercase', color: 'rgba(255,255,255,.64)', fontWeight: 700, marginBottom: 8 }}>LTC to ED transfer continuity platform</div>
          <div style={{ fontSize: m ? 30 : 46, fontWeight: 900, lineHeight: 1.02, letterSpacing: -.9, marginBottom: 12 }}>
            Beautifully simple.<br />Clinically serious.
          </div>
          <div style={{ fontSize: m ? 14 : 17, lineHeight: 1.75, color: 'rgba(255,255,255,.86)', maxWidth: 680, marginBottom: 16 }}>
            TransferLink gives long-term care teams one fast, reliable transfer workflow: medication-safe handoff, QR-enabled continuity, and automatic ED-return loop closure.
          </div>
          <div style={{ display: 'flex', gap: 10, flexDirection: m ? 'column' : 'row', marginBottom: 12 }}>
            <Bt ch="Launch Onboarding Module" onClick={onStartOnboarding} bg={C.accent} m={m} />
            <Bt ch={hasResume ? 'Resume Workspace' : 'Enter Prototype Workspace'} outline bg="#fff" onClick={onOpenPrototype} m={m} />
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.64)' }}>
            Designed for stakeholder review and pilot conversations (not production HIPAA infrastructure).
          </div>
        </>} />
        <Cd m={m} style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', boxShadow: '0 20px 60px rgba(0,0,0,.22)' }} ch={<>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'rgba(255,255,255,.78)', letterSpacing: 1.1, textTransform: 'uppercase', marginBottom: 8 }}>Why teams respond well</div>
          {[
            ['Under 5 minutes', 'Primary nurse workflow optimized for transfer urgency'],
            ['Medication provenance', 'Import/upload/attach without emergency retyping'],
            ['Closed-loop return', 'Facility sees ED outcomes and acknowledges'],
            ['Small + large facility fit', 'Standalone usage with optional integration layers'],
          ].map(([v, d], idx) => (
            <div key={v} style={{ padding: '10px 0', borderBottom: idx < 3 ? '1px solid rgba(255,255,255,.09)' : 'none' }}>
              <div style={{ fontSize: 16, fontWeight: 800 }}>{v}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.72)', lineHeight: 1.5 }}>{d}</div>
            </div>
          ))}
        </>} />
      </div>
      <footer style={{ marginTop: 14, textAlign: m ? 'left' : 'right', fontSize: 11, color: 'rgba(255,255,255,.45)' }}>
        TransferLink prototype · For review, demos, and usability sessions
        <button onClick={onOpenLegacy} style={{ marginLeft: 10, border: '1px solid rgba(255,255,255,.25)', background: 'transparent', color: 'rgba(255,255,255,.75)', borderRadius: 12, padding: '3px 8px', fontSize: 10, cursor: 'pointer' }}>
          Open legacy role selector
        </button>
      </footer>
    </div>
  </div>
);

export const OnboardingModule = ({ m, onBack, onComplete, setPersona, setRole }) => {
  const [selectedPersona, setSelectedPersona] = useState(0);
  const [selectedRole, setSelectedRole] = useState('RN / LVN');
  const [selectedMode, setSelectedMode] = useState(0);
  const roles = ['RN / LVN', 'Charge Nurse', 'Administrator', 'MD / NP'];
  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(180deg,#F7F9FC,#EEF2F7)`, padding: m ? '14px' : '26px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: m ? 20 : 28, fontWeight: 900, color: C.navy }}>Onboarding Module</div>
            <div style={{ fontSize: 12, color: C.txS, marginTop: 2 }}>Configure presentation context before entering the workspace.</div>
          </div>
          <button onClick={onBack} style={{ border: 'none', background: '#E8ECEF', borderRadius: 10, padding: '8px 12px', cursor: 'pointer', fontWeight: 700 }}>Back</button>
        </div>
        <Cd m={m} style={{ boxShadow: '0 14px 34px rgba(16,29,45,.07)' }} ch={<>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
            {['Select persona', 'Choose role', 'Set facility mode'].map((step, idx) => (
              <div key={step} style={{ background: '#F4F7FB', borderRadius: 8, padding: '8px 10px', fontSize: 11, fontWeight: 700, color: C.txS }}>
                {idx + 1}. {step}
              </div>
            ))}
          </div>
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
