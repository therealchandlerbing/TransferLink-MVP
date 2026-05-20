// Design tokens + shared a11y helper.
//
// Kept in a non-component module (separate from components.jsx) so that
// component files export only components — this keeps Vite's fast-refresh
// working cleanly during development.

// ===== DESIGN TOKENS =====
export const C = {
  navy:"#0F1D2F", navyL:"#1a2d42", accent:"#1B9AAA", accentD:"#168a99",
  accentG:"rgba(27,154,170,0.20)", amber:"#F4A261", amberD:"#E08A3A",
  red:"#E63946", green:"#2A9D8F", greenD:"#228B7E", purple:"#7C4DFF",
  bg:"#F0F2F5", card:"#FFF", dis:"#9E9E9E",
  lA:"#E8F6F8", lR:"#FDEAEA", lW:"#FFF3E0", lG:"#E6F5F0", lP:"#EDE7F6",
  bdr:"#E0E4EA", tx:"#1a1a2e", txS:"#5A6678", txT:"#8E99A8",
};

// ===== HELPER TO ADD A11Y TO CLICKABLE DIVS =====
export const getA11yProps = (onClick) => onClick ? {
  role: "button",
  tabIndex: 0,
  onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e); } }
} : {};
