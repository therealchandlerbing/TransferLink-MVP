// Hash-based routing — zero dependencies, GitHub Pages friendly.
//
// Shape:
//   #/                 → { module: 'landing', segments: [] }
//   #/app              → { module: 'app',     segments: [] }
//   #/app/3            → { module: 'app',     segments: ['3'] }
//   #/tour             → { module: 'tour',    segments: [] }
//   #/tour/4           → { module: 'tour',    segments: ['4'] }
//
// The Prototype maps segments[0] onto its internal screen index. The Tour maps
// segments[0] onto the guided-demo step index.

import { useEffect, useMemo, useState } from 'react';

const DEFAULT_ROUTE = { module: 'landing', segments: [] };

export function parseHash(raw) {
  const hash = (raw || '').replace(/^#/, '').replace(/^\/+/, '');
  if (!hash) return DEFAULT_ROUTE;
  const [path] = hash.split('?');
  const parts = path.split('/').filter(Boolean);
  if (parts.length === 0) return DEFAULT_ROUTE;
  const [head, ...segments] = parts;
  if (head === 'app' || head === 'tour') return { module: head, segments };
  // Anything else (including #/research, #/landing) falls through to landing.
  return { module: 'landing', segments: [head, ...segments] };
}

export function buildHash(module, segments = []) {
  if (module === 'landing' && segments.length === 0) return '#/';
  const tail = segments.length ? '/' + segments.join('/') : '';
  return `#/${module}${tail}`;
}

export function navigate(module, segments = []) {
  const next = buildHash(module, segments);
  if (window.location.hash !== next) {
    window.location.hash = next;
  }
}

export function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  // Memoize so consumers can use the route object as a useMemo / useEffect
  // dependency without triggering on every parent render.
  return useMemo(() => parseHash(hash), [hash]);
}
