// Single source of truth for patient roster, notifications, persona, toasts,
// and dashboard alerts. Hoisted to the Router so Prototype and Tour share the
// same state — a patient edited in the tour stays edited when the user exits
// into the free-form prototype.

import { useCallback, useEffect, useState } from 'react';
import { INIT_PATIENTS, NEW_PT_TEMPLATE } from '../data.js';

const INITIAL_DASH_ALERTS = [
  { text: 'Maggie Tanaka — Transfer in Progress', sub: 'Awaiting ED return documentation', type: 'warning' },
  { text: 'Robert Chen — INR follow-up due today', sub: 'Scheduled for 3:00 PM', type: 'info' },
];

export function useTransferLinkState() {
  const [patients, setPatients] = useState(INIT_PATIENTS);
  const [ptId, setPtId] = useState(0);
  const [toasts, setToasts] = useState([]);
  const [notifs, setNotifs] = useState([]);
  const [persona, setPersona] = useState(null);
  const [role, setRole] = useState(null);
  const [dashAlerts, setDashAlerts] = useState(INITIAL_DASH_ALERTS);

  const [winW, setWinW] = useState(window.innerWidth);
  useEffect(() => {
    const handler = () => setWinW(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  const m = winW < 520;

  const p = patients.find(x => x.id === ptId) || patients[0];

  const addToast = useCallback((msg, type = 'ok') => {
    setToasts(ts => [...ts, { id: Date.now(), msg, type }]);
  }, []);

  const addNotification = useCallback((text, notifPtId) => {
    setNotifs(ns => [{ id: Date.now(), text, time: 'Just now', unread: true, ptId: notifPtId }, ...ns]);
  }, []);

  const update = useCallback((txData) => {
    setPatients(ps => ps.map(x => x.id === ptId
      ? { ...x, tx: { ...x.tx, ...txData, time: x.tx.time || 'March 20, 2026 at 2:47 AM', nurse: x.tx.nurse || (persona ? persona.name : 'RN Sarah Mitchell') } }
      : x));
  }, [ptId, persona]);

  const updateER = useCallback((erData) => {
    const now = new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
    setPatients(ps => ps.map(x => x.id === ptId ? {
      ...x,
      er: { ...x.er, ...erData, time: x.er.time || now, submittedAt: now, notifiedAt: now },
    } : x));
    const pt = patients.find(x => x.id === ptId);
    if (pt) addNotification(`${pt.short} has returned from ${pt.tx.dest?.split(',')[0] || 'the ED'} · ack required`, ptId);
    addToast('ED return submitted. Facility push notification sent.', 'ok');
  }, [ptId, patients, addNotification, addToast]);

  const ackReturn = useCallback(() => {
    const now = new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
    setPatients(ps => ps.map(x => x.id === ptId
      ? { ...x, er: { ...x.er, ackedAt: now, ackedBy: persona ? persona.name : 'RN Sarah Mitchell', closedAt: now } }
      : x));
    addToast('Return loop closed. Acknowledgement recorded.', 'ok');
  }, [ptId, persona, addToast]);

  const importMedSource = useCallback((src) => {
    setPatients(ps => ps.map(x => x.id === ptId ? { ...x, medSource: src } : x));
    addToast(`Medication source attached · ${src.count} meds verified at transfer`, 'ok');
  }, [ptId, addToast]);

  const addPatient = useCallback((data) => {
    const newId = Date.now();
    const newPt = { ...NEW_PT_TEMPLATE, ...data, id: newId };
    setPatients(ps => [...ps, newPt]);
    setPtId(newId);
    addToast(`${data.short || data.name} added to roster!`);
    addNotification(`New patient added: ${data.short || data.name}`, newId);
    return newId;
  }, [addToast, addNotification]);

  const dismissAlert = useCallback((i) => {
    setDashAlerts(as => as.filter((_, idx) => idx !== i));
  }, []);

  const markNotifRead = useCallback((id) => {
    setNotifs(ns => ns.map(x => x.id === id ? { ...x, unread: false } : x));
  }, []);

  const markAllNotifsRead = useCallback(() => {
    setNotifs(ns => ns.map(n => ({ ...n, unread: false })));
  }, []);

  return {
    // data
    patients, ptId, p, toasts, notifs, persona, role, dashAlerts, m,
    // setters (kept for legacy compatibility where components call them directly)
    setPatients, setPtId, setToasts, setNotifs, setPersona, setRole,
    // actions
    addToast, addNotification, update, updateER, ackReturn, importMedSource,
    addPatient, dismissAlert, markNotifRead, markAllNotifsRead,
  };
}
