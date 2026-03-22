# Design System Strategy: Clinical Precision & Human Connection

## 1. Overview & Creative North Star
In the high-stakes environment of Long-Term Care (LTC) to Emergency Department (ED) transfers, seconds and clarity save lives. This design system moves away from the "clunky medical software" trope toward a **Creative North Star: The Clinical Concierge.**

The aesthetic balances the authoritative weight of a premium medical journal with the fluid, responsive nature of modern SaaS. We achieve this through **Intentional Asymmetry**—using generous white space to pull the eye toward critical patient data—and **Tonal Depth**, where information is layered by importance rather than boxed in by grids. This is a "living document" interface that feels as urgent as a heartbeat but as stable as a bedrock.

---

## 2. Colors: Tonal Authority
We reject the "flat" look. This system uses color not just for decoration, but as a functional map of clinical priority.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section off content. 
Boundaries must be defined solely through background shifts. For example, a `surface-container-low` (#f2f4f7) patient record card should sit on a `surface` (#f7f9fc) background. The contrast is felt, not seen as a "line."

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of medical charts. 
*   **Base Layer:** `background` (#f7f9fc) for the overall application canvas.
*   **Secondary Layer:** `surface-container` (#eceef1) for sidebars or secondary navigation.
*   **Information Layer:** `surface-container-lowest` (#ffffff) for the primary patient cards and data entry fields.

### The "Glass & Gradient" Rule
To elevate the "clinical" feel to "premium," use **Glassmorphism** for floating action menus or entry role cards. Apply `surface` colors at 70% opacity with a `20px` backdrop blur. 
*   **Signature Texture:** Primary CTAs should utilize a subtle linear gradient from `primary` (#005c9b) to `primary-container` (#2e75b6) at a 135-degree angle. This provides a "tactile" depth that flat buttons lack.

---

## 3. Typography: Editorial Clarity
We use a high-contrast scale to ensure that a nurse sprinting down a hallway can read a patient's name at a glance.

*   **Display & Headlines (Manrope):** Our "Authoritative" voice. Used for high-level stats and patient names. 
    *   *Headline-LG (2rem):* Reserved for critical identifiers.
*   **Body & Titles (Inter/DM Sans):** Our "Functional" voice. 
    *   *Title-MD (1.125rem):* Use for section headers in **ALL CAPS** with a `0.05em` letter spacing to mimic professional medical labeling.
*   **Hierarchy Note:** Always pair a `Headline-MD` patient name with a `Label-MD` secondary identifier (e.g., DOB or Room #) in `on-surface-variant` (#414750) to create immediate visual separation.

---

## 4. Elevation & Depth: The Layering Principle
Shadows are a last resort, not a default. We convey hierarchy through **Tonal Layering.**

*   **Ambient Shadows:** When a card must float (e.g., a critical alert or a modal), use a "Whisper Shadow": `0px 8px 24px rgba(25, 28, 30, 0.06)`. The shadow color is a tinted version of `on-surface` to ensure it feels like natural light, not a digital drop-shadow.
*   **The "Ghost Border" Fallback:** If accessibility requirements demand a border (e.g., in high-glare environments), use the `outline-variant` token at **15% opacity**. Never use 100% opaque borders.
*   **Interactive Depth:** On tap/press, a card should transition from `surface-container-lowest` to `surface-dim` (#d8dadd), creating a "pressed-in" physical sensation.

---

## 5. Components: Precision Built

### Buttons (The Pulse of the App)
*   **Primary:** Gradient-filled (Primary to Primary-Container), `xl` (1.5rem) rounded corners. Min-height: 56px for high-stress accuracy.
*   **Secondary:** `surface-container-highest` (#e0e3e6) background with `on-primary-fixed-variant` (#00497c) text. No border.

### Pulse Status Badges
Status indicators (Active Transfer, Incoming, Completed) must use the **Pulsing Badge** component:
*   **Active (Orange #F57C00):** A solid core circle with a 10% opacity outer ring that expands and fades every 2 seconds. This signifies "Life" and "Movement."

### Clinical Cards & Lists
*   **Rule:** Forbid divider lines.
*   **Implementation:** Separate patient vitals using `spacing-6` (1.5rem) of vertical white space. If data is dense, use alternating backgrounds of `surface-container-lowest` and `surface-container-low`.

### Glassmorphic Role Cards
For the entry screen (LTC Staff vs. ED Staff), use cards with:
*   Background: `surface-container-lowest` at 60% opacity.
*   Backdrop Blur: `16px`.
*   Border: `Ghost Border` (Outline-variant at 20%).

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use `spacing-10` (2.5rem) for page margins to give clinical data room to breathe.
*   **Do** use `tertiary` (#7f4e00) tones for "Pending" or "In-Progress" states to differentiate from "Urgent" Red.
*   **Do** prioritize "Large Tap Targets" (min 48x48pt) for all interactive clinical data points.

### Don't:
*   **Don't** use pure black (#000000) for text. Use `on-surface` (#191c1e) for better readability on medical-grade screens.
*   **Don't** use standard "Material Design" shadows. They are too heavy for a clinical environment. Stick to Tonal Layering.
*   **Don't** use sharp 90-degree corners. Everything must use the `lg` (1rem) or `xl` (1.5rem) scale to feel approachable and "person-centered."