// Tour — a thin wrapper that mounts Prototype in guided-demo mode. It owns
// demoStep and syncs it to #/tour/<step> so a specific step is shareable.

import React, { useMemo } from 'react';
import { DEMO_SCREEN_MAP } from '../data.js';
import Prototype from './Prototype.jsx';
import { navigate } from '../shared/routing.js';

const clampStep = (idx) => Math.max(0, Math.min(idx, DEMO_SCREEN_MAP.length - 1));

export default function Tour({ route, exitToLanding, ...state }) {
  const step = useMemo(() => {
    const raw = route?.segments?.[0];
    if (!raw) return 0;
    const n = parseInt(raw, 10);
    if (Number.isNaN(n)) return 0;
    return clampStep(n);
  }, [route]);

  const setDemoStep = (idx) => {
    const clamped = clampStep(idx);
    navigate('tour', clamped === 0 ? [] : [String(clamped)]);
  };

  return (
    <Prototype
      route={route}
      mode="tour"
      demoStep={step}
      setDemoStep={setDemoStep}
      exitToLanding={exitToLanding}
      {...state}
    />
  );
}
