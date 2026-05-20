// Persistent chrome shared by Prototype and Tour:
//   — Global CSS
//   — Toast container
//   — Notification center drawer
//   — Notification bell + home button
//
// The bell + home are handed to the TB component through TopBarContext so they
// render inline in the top bar's right slot. They used to float over the page
// with position:fixed, which overlapped screen content on narrow viewports.
//
// Accepts a `homeLabel` / `onHome` so the Tour can label it "Exit Tour" while
// the Prototype says "Home".

import React, { useState } from 'react';
import { BellIco } from '../components.jsx';
import { C } from '../tokens.js';
import { TopBarContext } from '../topbar-context.js';
import { ToastContainer, NotificationCenter } from '../modals.jsx';

const globalStyles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #1a1a2e; -webkit-text-size-adjust: 100%; }
  button, [role="button"] { touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
  .card-hover:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(15,29,47,.12) !important; }
  .hover-scale:hover { transform: scale(1.03); }
  @keyframes bp { 0%,100%{opacity:.9}50%{opacity:.5} }
  @keyframes qp { 0%,100%{opacity:.3;transform:scale(1)}50%{opacity:.6;transform:scale(1.04)} }
  @keyframes toastIn { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes slideUp { from{transform:translateY(100%);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes confirmBounce { 0%{opacity:0;transform:scale(.4)}60%{transform:scale(1.12)}100%{opacity:1;transform:scale(1)} }
  @keyframes sc { 0%,100%{top:0}50%{top:calc(100% - 3px)} }
  .home-btn:hover { background: rgba(255,255,255,.22) !important; }
  .home-btn:active { transform: scale(0.96); }
  .bell-btn:hover { opacity: .8; }
  input,textarea,button { font-family: inherit; }
  ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(0,0,0,.15); border-radius: 2px; }
`;

// Bell + home, rendered inline inside the top bar's right slot via TopBarContext.
function TopBarChrome({ m, showBell, unreadCount, onBell, showHome, onHome, homeLabel, homeIcon, homeAriaLabel }) {
  if (!showBell && !showHome) return null;
  return (
    <>
      {showBell && (
        <button
          className="bell-btn"
          onClick={onBell}
          aria-label={unreadCount > 0 ? `Open notifications (${unreadCount} unread)` : 'Open notifications'}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, minWidth: 40, minHeight: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity .15s' }}
        >
          <BellIco n={unreadCount} />
        </button>
      )}
      {showHome && onHome && (
        <button
          className="home-btn"
          onClick={onHome}
          aria-label={homeAriaLabel}
          title={homeLabel}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: m ? '8px 10px' : '7px 13px', borderRadius: 18,
            background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer',
            minHeight: 40, letterSpacing: .2, whiteSpace: 'nowrap',
            transition: 'background .15s, transform .12s', fontFamily: 'inherit',
          }}
        >
          <span style={{ fontSize: 13 }}>{homeIcon}</span>
          {!m && homeLabel}
        </button>
      )}
    </>
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

  const chrome = (
    <TopBarChrome
      m={m}
      showBell={showBell}
      unreadCount={unreadCount}
      onBell={() => { setShowNotif(true); markAllNotifsRead(); }}
      showHome={showHome}
      onHome={onHome}
      homeLabel={homeLabel}
      homeIcon={homeIcon}
      homeAriaLabel={homeAriaLabel}
    />
  );

  return (
    <TopBarContext.Provider value={chrome}>
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
      </div>
    </TopBarContext.Provider>
  );
}
