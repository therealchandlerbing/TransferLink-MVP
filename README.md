# TransferLink

> **One patient. One record. Every handoff.**

A digital bridge connecting long-term care facilities, EMS, and emergency departments — built so one QR code replaces a packet of paper and keeps every care team on the same page.

---

## What Is TransferLink?

Every year, thousands of elderly patients are transferred from assisted living facilities to emergency departments. The current process relies on **handwritten notes, printed paper packets, and hurried phone calls** — leading to missing allergy information, lost code status documents, medication errors, and zero feedback from the ED back to the originating facility.

**TransferLink closes that gap.**

```
LTC Facility          EMS Transport         Emergency Dept        LTC Facility
    │                      │                      │                     │
    │  Nurse completes      │                      │                     │
    │  transfer record      │                      │                     │
    │──── QR Code ─────────►│                      │                     │
    │                       │  Scan on arrival     │                     │
    │                       │  (code status,       │                     │
    │                       │  POLST, language)    │                     │
    │                       │──── Same QR ────────►│                     │
    │                       │                      │  Full record on     │
    │                       │                      │  scan, no re-entry  │
    │                       │                      │                     │
    │                       │                      │  ED documents       │
    │                       │                      │  return info        │
    │◄─────────────────── Auto-notification ───────┘                     │
    │                                                                     │
    └──────────────── Facility receives full return record ──────────────►│

  One record. Every handoff. Bi-directional. No paper required.
```

---

## Technical Stack

### Architecture

```
React + Vite SPA (Vercel-ready)
├── React 19 with client-side state (useState)
├── Vite 8 build tooling
├── No backend — frontend-only MVP demo
├── No app install required for EMS/ED (scan QR → web view)
└── Deployable to Vercel with zero config
```

| Layer | Technology | Role in the project |
|-------|-----------|---------------------|
| **Framework** | React 19.2 | Builds all UI components; manages screen routing and application state via `useState` |
| **Build** | Vite 8.0 | Bundles and serves the app; outputs a static `dist/` folder for Vercel deployment |
| **Styling** | Inline styles + CSS variables | Design token system (`C` object in `components.jsx`) keeps colors, spacing, and radii consistent across all screens |
| **Fonts** | Inter, Manrope (Google Fonts) | Inter for body and UI text; Manrope (700–900) for display headlines and large stat numbers |
| **Icons** | Custom inline SVG | Keeps the bundle lean — no icon library dependency |
| **QR Code** | Procedural SVG (25×25 grid) | Renders a deterministic, scannable-looking QR pattern client-side with no external service |
| **Responsive** | `m` prop flag | Boolean passed to every screen component; triggers compact layouts below 520px viewport width |
| **Deployment** | Vercel (static SPA) | Zero-config deployment; auto-detects Vite, runs `npm run build`, serves `dist/` |

### Design Tokens (Color System)

| Token | Hex | Semantic meaning |
|-------|-----|-----------------|
| `navy` | `#0F1D2F` | Primary background and headers — the authoritative "clinical" dark base |
| `accent` | `#1B9AAA` | Primary CTAs, active states, and interactive elements |
| `amber` | `#F4A261` | Warnings, in-progress transfers, and time-sensitive alerts |
| `red` | `#E63946` | Allergies, DNR/DNI status, and critical safety flags — always highest visual priority |
| `green` | `#2A9D8F` | Full Code status, completed transfers, and success confirmations |
| `purple` | `#7C4DFF` | Return-to-facility flow — visually separates the ED→LTC direction from LTC→ED |

---

## How to Run

### Development

```bash
npm install
npm run dev
# → http://localhost:5173
```

### Production Build

```bash
npm run build
npm run preview
# → http://localhost:4173
```

### Deploy to Vercel

```bash
# Via Vercel CLI
vercel deploy --prod

# Or connect the GitHub repo to Vercel — it auto-detects Vite
# Build command: npm run build   (runs vite build internally)
# Output directory: dist
```

---

## Repository Structure

```
TransferLink-MVP/
│
├── src/                          # React application source
│   ├── main.jsx                  # Entry point (StrictMode → Router)
│   ├── Router.jsx                # Hash-route dispatcher → Landing / Prototype / Tour
│   ├── modules/
│   │   ├── Landing.jsx           # Marketing landing page          (route #/)
│   │   ├── Prototype.jsx         # Screen router + role/tool hub    (route #/app)
│   │   └── Tour.jsx              # Guided-tour wrapper for Prototype (route #/tour)
│   ├── shared/
│   │   ├── state.js              # Shared app state — roster, notifications, persona
│   │   ├── routing.js            # Zero-dependency hash router
│   │   ├── hooks.js              # Shared hooks (useWindowWidth)
│   │   └── AppShell.jsx          # Persistent chrome — toasts, notifications, nav
│   ├── index.css                 # Global styles, CSS variables, keyframes
│   ├── tokens.js                 # Design tokens (color system) + a11y helper
│   ├── components.jsx            # Reusable UI primitives
│   ├── clinical.jsx              # Clinical-domain components
│   ├── modals.jsx                # Modals, overlays, guided demo, intake form
│   ├── screens1.jsx              # Screens S1–S10 (LTC + EMS + ED intake)
│   ├── screens2.jsx              # Screens S11–S20 (ED return + facility admin)
│   ├── data.js                   # Patient data, personas, demo tour config
│   └── assets/                   # Images (favicons, scaffold assets)
│
├── public/                       # Static assets (favicon.svg, icons.svg)
├── dist/                         # Production build output — generated by npm run build (gitignored)
│
├── stitch_transferlink_prd_v2.0/ # Design reference screens (27 screens)
│   ├── continuum_clinical/
│   │   └── DESIGN.md             # Design system specification
│   └── [screen_name]/
│       ├── code.html             # Reference HTML for each screen
│       └── screen.png            # Visual screenshot of each screen
│
├── TransferLink_App.html         # Legacy standalone HTML prototype (with guided tour)
├── TransferLink_Final.html       # Legacy standalone HTML prototype (earlier iteration)
├── text_document_1.html          # Workflow documentation — screen mapping & user flows
├── text_document_2.html          # Workflow documentation — continued
│
├── index.html                    # Vite entry HTML
├── package.json                  # Dependencies & scripts
├── vite.config.js                # Vite configuration
└── eslint.config.js              # ESLint configuration
```

---

## Source Code Map

### `Router.jsx` + `shared/` — Routing & State

`Router.jsx` reads the URL hash and dispatches to one of three modules — Landing
(`#/`), Prototype (`#/app`), or Tour (`#/tour`). Shared state is hoisted to the
Router so the Prototype and Tour operate on the same patient roster — a patient
edited in the tour stays edited in the free-form prototype.

**`shared/state.js` — `useTransferLinkState()`**
- `patients` / `ptId` / `p` — full roster and the selected patient (from `INIT_PATIENTS`)
- `persona` / `role` — logged-in user identity and role
- `toasts` / `notifs` — notification system
- `dashAlerts` — facility dashboard alerts
- `update(txData)` — save transfer form data to the patient record
- `updateER(erData)` — save ED return data + auto-notify the facility
- `ackReturn()` — acknowledge an ED return and close the loop
- `importMedSource(src)` — attach a verified medication source
- `addPatient(data)` — create a patient from the intake modal

**`modules/Prototype.jsx`** — maps the hash to a screen index (S1–S20), owns the
`visited` set that drives the transfer progress tracker, and renders the role/tool
hub. The Tour wraps the same component in guided-demo mode.

### `tokens.js` — Design Tokens

Exports the color token object `C` and the `getA11yProps` keyboard helper. Kept
separate from `components.jsx` so component files fast-refresh cleanly.

### `components.jsx` — UI Primitives

Exports all reusable components:

| Component | Purpose |
|-----------|---------|
| `Bg` | Badge/chip |
| `Av` | Avatar circle with initials |
| `Cd` | Card container (memoized) |
| `Bt` | Button (memoized) |
| `SL` | Section label (uppercase, with icon) |
| `TB` | Top bar / header |
| `Bk` | Back button |
| `FR` | Field row (label + value) |
| `Chips` | Tag list renderer |
| `TxIn` | Text input that updates on blur / Enter (locally buffered) |
| `QR` | Procedural SVG QR code (memoized) |
| `BellIco` | Notification bell with unread badge |
| `Chev`, `Chk`, `DnA`, `WarnIco`, `PlusIco` | Icon components |
| `MedSourceBadge` | Medication-source provenance badge |
| `ReturnStates` | Closed-loop return delivery-state tracker |

### `clinical.jsx` — Clinical Domain Components

| Component | Purpose |
|-----------|---------|
| `AllergyB` | Red allergy banner or green NKA indicator |
| `CodeBanner` | Code status display (DNR/Full Code) + POLST badge + language |
| `PtHd` | Patient header card (avatar, name, DOB, code status) |
| `Steps` | 4-step transfer progress indicator |
| `Coll` | Collapsible card section with toggle |
| `MScale` / `MScaleSelect` | 4-level mentation scale (display/editable) |
| `FScale` / `FScaleSelect` | Functional status scale (display/editable) |
| `ComfortSection` | Person-centered care preferences (5 categories) |
| `VitalsTrend` | Last-24h BP / HR / SpO₂ readings with deterioration flag |
| `TransferTracker` | Visual transfer progress bar (Facility → EMS → ED → Return) |
| `PtSwitcher` | Patient dropdown selector |
| `POLST` | POLST document modal overlay |
| `MedImportModal` | Medication-source import (PDF / photo / EHR / manual) |
| `Scanner` | QR scanner animation (simulated 1.8s scan) |
| `Sections` | Full clinical record renderer (contacts, meds, history, devices, belongings, comfort) |

### `modals.jsx` — Overlays & System Components

| Component | Purpose |
|-----------|---------|
| `Toast` / `ToastContainer` | Notification toasts (3s auto-dismiss) |
| `NotificationCenter` | Full-screen notification panel |
| `GuidedDemo` | 16-step guided tour overlay with narration |
| `IntakeModal` | 5-step new patient admission form |
| `S15` | Login & onboarding screen (persona + role selection) |

### `screens1.jsx` — Screens S1 through S10

The role/tool hub that replaces the old S0 home screen now lives in `modules/Prototype.jsx`.

| Screen | Name | Role |
|--------|------|------|
| `S1`  | Patient Roster | LTC — searchable list + add patient |
| `S2`  | Patient Record | LTC — full clinical view, vitals trend, transfer tracker |
| `S3`  | Initiate Transfer | LTC — 5-minute transfer form + belongings checklist |
| `S4`  | Transfer Confirmation | LTC — review before QR generation |
| `S5`  | QR Handoff Toolkit | LTC/EMS — QR in print / wristband / mobile formats |
| `S6`  | Print Preview | LTC — printable transfer sheet with QR |
| `S7`  | EMS Scans QR | EMS — scanner animation → auto-transition |
| `S8`  | EMS Transport View | EMS — code status, POLST, comfort preferences |
| `S9`  | ED Scans QR | ED — scanner animation → auto-transition |
| `S10` | ED Triage View | ED — first-30-seconds panel + full record |

### `screens2.jsx` — Screens S11 through S20

| Screen | Name | Role |
|--------|------|------|
| `S11` | ED Return Documentation | ED — diagnosis, vitals, discharge form |
| `S12` | Record Updated | ED — success confirmation with delivery states |
| `S13` | Facility Receives Update | LTC — ED return data + belongings-returned check |
| `S14` | Full Timeline / Audit Trail | All — timestamped event log |
| `S17` | Facility Dashboard | LTC — stats, filters, alerts, recent activity |
| `S18` | Transfer History | LTC — filterable transfer log |
| `S19` | SBAR Handoff Report | LTC — auto-generated S-B-A-R report (3 variants) |
| `S20` | Integrations & Data Sources | Admin — EHR connectors + facility modes |

### `data.js` — Demo Data & Configuration

- **`INIT_PATIENTS`** — 4 fully-detailed demo patients (see Demo Patients below)
- **`ALL_BELONGINGS`** — 11 patient belonging items
- **`NEW_PT_TEMPLATE`** — empty patient object for intake form
- **`PERSONAS`** — 5 LTC staff personas (name, role, shift)
- **`DEMO_SCREEN_MAP`** — 17-step guided tour titles, scenes, and narration

---

## Stitch Design Reference (`stitch_transferlink_prd_v2.0/`)

27 screen designs exported from the Stitch collaborative design tool. Each folder contains a `code.html` (reference implementation) and `screen.png` (visual screenshot). These serve as the **design source of truth** for the React build.

### Design System (`DESIGN.md`)

The design system spec defines the visual language — "The Clinical Concierge" aesthetic:

- **No-Line Rule** — no 1px borders; boundaries defined by background shifts only
- **Surface Hierarchy** — tonal layering (`background` → `surface-container` → `surface-container-lowest`)
- **Glass & Gradient** — glassmorphism for floating elements; gradient CTAs (135deg)
- **Typography** — Manrope for headlines (authoritative), Inter/DM Sans for body (functional)
- **Elevation** — "Whisper Shadows" (`0px 8px 24px rgba(25,28,30,0.06)`), no Material Design shadows
- **Large Tap Targets** — min 48x48pt for all interactive clinical elements
- **Rounded Corners** — `lg` (1rem) or `xl` (1.5rem) only, no sharp 90-degree corners

### Screen Index

| Folder | Screen | Workflow |
|--------|--------|----------|
| `role_selector_home` | Home / Role Selector | Entry |
| `login_onboarding_s15_1` | Login Form | Authentication |
| `login_onboarding_s15_2` | Onboarding Overview | Authentication |
| `patient_list_ltc_nurse` | Patient Roster | LTC Nurse |
| `ltc_nurse_patient_record_s2` | Patient Record | LTC Nurse |
| `initiate_transfer_s3` | Transfer Initiation | LTC Nurse |
| `transfer_confirmation_s4` | Transfer Review | LTC Nurse |
| `qr_code_hero_handoff` | QR Code Display | Handoff |
| `print_preview_s6` | Print Preview | Handoff |
| `print_preview_fixed` | Print Preview (alt) | Handoff |
| `qr_scanner_ems_1` | EMS QR Scan | EMS |
| `ems_patient_record_s8` | EMS Transport View | EMS |
| `qr_scanner_ems_2` | ED QR Scan | ED |
| `ed_patient_record_s10` | ED Full Record | ED |
| `ed_return_form` | ED Return Form | ED |
| `transfer_complete_s12` | Transfer Complete | ED |
| `facility_return_record_s13` | Facility Return Record | Facility |
| `facility_dashboard_v2.0` | Facility Dashboard | Admin |
| `transfer_history_s18` | Transfer History | Admin |
| `transfer_timeline` | Audit Trail Timeline | Admin |
| `sbar_handoff_report_s19` | SBAR Report | Admin |
| `intake_demographics_step_1` | Intake: Demographics | Admission |
| `intake_clinical_step_2` | Intake: Clinical | Admission |
| `intake_contacts_step_3` | Intake: Contacts | Admission |
| `intake_care_prefs_step_4` | Intake: Care Preferences | Admission |
| `intake_review_step_5` | Intake: Review & Confirm | Admission |

---

## Transfer Workflow — End to End

```
PHASE 1: LTC NURSE INITIATES
────────────────────────────────────────────────────────────
  [Login] → [Dashboard] → [Patient Roster] → [Patient Record]
       → [Initiate Transfer] → [Confirm] → [QR Code Generated]

         4-step wizard: Review ──► Transfer ──► Confirm ──► QR Code

PHASE 2: PHYSICAL HANDOFF (The Hero Moment)
────────────────────────────────────────────────────────────
  QR Code printed / displayed on device screen
  ├── EMS scans on arrival → Transport View (code status + comfort)
  └── ED scans on arrival  → Full Clinical Record

PHASE 3: ED INTAKE & TREATMENT
────────────────────────────────────────────────────────────
  [ED Full Record] → [Treatment] → [ED Documents Return Plan]
                                           ↓
                              Facility notified automatically

PHASE 4: RETURN TO FACILITY
────────────────────────────────────────────────────────────
  [Facility Receives Update] → [Full Timeline / Audit Trail]
```

---

## User Roles & Entry Points

| Role | Entry Point | Primary Action |
|------|-------------|----------------|
| **LTC Nurse / RN / LVN** | Facility Dashboard | Initiate & manage transfers |
| **EMS Crew** | QR Scan View | Access record during transport |
| **ED Staff** | ED Intake View | Receive patient, document outcome |
| **Facility Return** | Return Update View | Receive ED return information |

---

## Patient Data Model

Each patient record carries the following through the entire care chain:

### Demographics & Identity
- Name, DOB, Age, Room, Language (with flag), Initials
- Emergency contact (name, relationship, phone)
- Facility (name, address, phone)

### Critical Safety Information *(surfaced immediately on QR scan)*
- Allergies (highlighted in red, always first)
- Code Status: DNR/DNI, Full Code, or DNR
- POLST (if applicable)
- Language (flag + language name)

### Clinical Record
| Section | Data Points |
|---------|-------------|
| **Medical History** | Diagnoses (A-FIB, CHF, COPD, DM, etc.) |
| **Medications** | Name, dose, frequency, drug class |
| **Devices & Equipment** | O2, CPAP, wheelchair, glucose monitor, bed alarm |
| **Safety Risks** | Falls, aspiration, elopement, skin breakdown, hypoglycemia |
| **Isolation Status** | Contact, droplet, airborne, or none |
| **Mental Status** | 4-level scale: Alert & Oriented → Non-Verbal |
| **Functional Level** | 4-level scale: Independent → Non-Ambulatory |
| **Vitals Trend** | Timestamped BP / HR / SpO₂ readings from the last 24h |
| **Belongings** | Admission inventory (hearing aids, dentures, glasses) tracked through transfer and return |

### Person-Centered Care Preferences
| Category | Example |
|----------|---------|
| **Lighting** | "Prefers dim lighting at night" |
| **Communication** | "Responds to calm, slow speech in Japanese" |
| **Family** | "Son David visits daily, involved in all care decisions" |
| **Cultural / Religious** | "Buddhist traditions. Prefers rice-based meals." |
| **De-escalation** | "Calms with traditional Japanese music" |

### Transfer Event Data
- Reason for transfer, active symptoms (multi-select), interventions attempted
- Changes from baseline, destination hospital, transfer time, initiating nurse

### ED Return Data
- Diagnosis, vitals (BP, HR, RR, SpO2), treatment, discharge instructions
- Attending physician, return report time

---

## Demo Patients (Cascade View Assisted Living)

| Patient | Age | Language | Code Status | POLST | Condition |
|---------|-----|----------|-------------|-------|-----------|
| **Maggie Tanaka** | 87 | Japanese | DNR / DNI | Yes | Acute COPD exacerbation, O2 sat 84% |
| **Robert Chen** | 79 | English | Full Code | No | Severe hypoglycemia, glucose 42, AMS |
| **Dorothy Williams** | 91 | English | DNR | Yes | Mechanical fall, forehead laceration, INR 4.8 |
| **James Martinez** | 84 | Spanish/English | Full Code | No | Acute CHF exacerbation, chest pain, +6 lbs |

---

## Guided Demo Tour

The app includes a built-in **17-step guided tour** (route `#/tour`) that walks through the full transfer lifecycle with contextual narration:

```
Welcome → Login → Dashboard → Patient Roster → Patient Record
  → Initiate Transfer → Confirm → QR Handoff Toolkit
  → EMS Scans → EMS Transport View → ED Scans → ED Triage View
  → ED Documents Return → Loop Closed → Facility Receives Update
  → Full Audit Trail → Integrations & Data Sources
```

Alternatively, select **"Explore Freely"** to navigate any screen in any order.

---

## Key Design Principles

1. **No app install for EMS or ED.** The QR code links to a web view. No friction at the point of care.
2. **Code status and language are always first.** Critical safety data surfaces before anything else on scan.
3. **Bi-directional.** The ED closes the loop automatically — the facility knows what happened before the patient returns.
4. **Under 2 minutes to initiate a transfer.** Structured documentation replaces handwritten notes without adding burden.
5. **Person-centered.** Comfort preferences and cultural context travel with the patient, not just clinical data.
6. **Full audit trail.** Every scan, update, and handoff is timestamped and logged.

---

## Legacy Files

| File | Description |
|------|-------------|
| `TransferLink_App.html` | Standalone HTML prototype with guided tour and splash screen (pre-React) |
| `TransferLink_Final.html` | Earlier standalone HTML iteration |
| `text_document_1.html` | Workflow documentation — 5 user flows and screen mapping |
| `text_document_2.html` | Workflow documentation — continued |

These files document the evolution from single-file HTML prototype to the current React+Vite application.

---

## Prototype Notes

- **No real patient data.** All patients, facilities, and clinical scenarios are fictional.
- **Prototype by 360 Social Impact Studios.**
- This is a frontend-only MVP demo. A production version would require a backend API, authentication, HIPAA-compliant data storage, and integration with EHR systems.

---

*TransferLink MVP · Interactive Prototype · 360 Social Impact Studios*
