// Shared hooks reused by the Landing page and the in-app state module.

import { useEffect, useState } from 'react';

export function useWindowWidth() {
  const [winW, setWinW] = useState(window.innerWidth);
  useEffect(() => {
    const handler = () => setWinW(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return winW;
}
