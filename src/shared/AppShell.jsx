// Persistent chrome shared by Prototype and Tour:
//   — Global CSS (kept identical to the pre-refactor App.jsx)
//   — Toast container
//   — Notification center drawer
//   — Floating bell + home button
//
// Accepts a `homeLabel` / `onHome` so the Tour can label it "Exit Tour" while
// Prototype says "Home". The chrome is only rendered when `showChrome` is true
// (scanner / full-bleed screens suppress it, matching current behavior).

import React, { useState } from 'react';
import { C, BellIco } from '../components.jsx';
import { ToastContainer, NotificationCenter } from '../modals.jsx';

const globalStyles = `
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
`;

export function BellButton({ onClick, count }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed', top: 10, right: 12, zIndex: 50,
        background: 'none', border: 'none', cursor: 'pointer', padding: 4,
        minWidth: 44, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <BellIco n={count} />
    </button>
  );
}

export function HomeButton({ onClick, label = 'Home', icon = '🏠', ariaLabel = 'Go to Home' }) {
  return (
    <button
      className="home-btn"
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        position: 'fixed', top: 58, right: 12, zIndex: 49,
        display: 'flex', alignItems: 'center', gap: 5,
        padding: '6px 12px', borderRadius: 20,
        background: `linear-gradient(135deg,${C.navy},${C.navyL})`,
        border: `1.5px solid rgba(27,154,170,0.4)`,
        color: 'rgba(255,255,255,0.85)', fontSize: 12, fontWeight: 700,
        cursor: 'pointer', boxShadow: '0 2px 10px rgba(15,29,47,.3)',
        transition: 'transform .18s ease, box-shadow .18s ease',
        letterSpacing: .2, fontFamily: 'inherit',
      }}
    >
      <span style={{ fontSize: 13 }}>{icon}</span>
      {label}
    </button>
  );
}

export default function AppShell({
  children,
  toasts, setToasts,
  notifs, markNotifRead, markAllNotifsRead, onNotifSelect,
  m,
  showBell = true, showHome = true,
  onHome, homeLabel = 'Home', homeIcon = '🏠', homeAriaLabel = 'Go to Home',
}) {
  const [showNotif, setShowNotif] = useState(false);
  const unreadCount = notifs.filter(n => n.unread).length;

  const handleNotifSelect = (n) => {
    markNotifRead(n.id);
    if (onNotifSelect) onNotifSelect(n);
    setShowNotif(false);
  };

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', minHeight: '100vh', position: 'relative', fontFamily: "'Inter',system-ui,sans-serif", color: C.tx }}>
      <style>{globalStyles}</style>
      <ToastContainer toasts={toasts} setToasts={setToasts} />
      {showNotif && (
        <NotificationCenter
          notifications={notifs}
          onClose={() => setShowNotif(false)}
          onSelect={handleNotifSelect}
          m={m}
        />
      )}
      {children}
      {showBell && (
        <BellButton
          count={unreadCount}
          onClick={() => { setShowNotif(true); markAllNotifsRead(); }}
        />
      )}
      {showHome && onHome && (
        <HomeButton onClick={onHome} label={homeLabel} icon={homeIcon} ariaLabel={homeAriaLabel} />
      )}
    </div>
  );
}
