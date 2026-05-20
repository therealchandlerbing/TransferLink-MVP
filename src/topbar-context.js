import { createContext } from 'react';

// Carries the top-bar chrome (notification bell + home button) from AppShell
// down to the TB component, so the chrome renders inline in the bar's right
// slot instead of floating over screen content. Kept in its own module so
// component files fast-refresh cleanly.
export const TopBarContext = createContext(null);
