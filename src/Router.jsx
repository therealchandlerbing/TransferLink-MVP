// Router — hash-based dispatcher. Holds shared state (patients, notifs,
// persona, toasts) so Prototype and Tour both read/write the same roster.

import React, { useCallback } from 'react';
import Landing from './modules/Landing.jsx';
import Prototype from './modules/Prototype.jsx';
import Tour from './modules/Tour.jsx';
import { useHashRoute, navigate } from './shared/routing.js';
import { useTransferLinkState } from './shared/state.js';

export default function Router() {
  const route = useHashRoute();
  const state = useTransferLinkState();
  const exitToLanding = useCallback(() => navigate('landing', []), []);

  if (route.module === 'app')  return <Prototype route={route} exitToLanding={exitToLanding} {...state} />;
  if (route.module === 'tour') return <Tour       route={route} exitToLanding={exitToLanding} {...state} />;
  return <Landing />;
}
