# TransferLink

> **One patient. One record. Every handoff.**

A digital bridge connecting long-term care facilities, EMS, and emergency departments — built so one QR code replaces a packet of paper and keeps every care team on the same page.

---

## What Is TransferLink?

Every year, thousands of elderly patients are transferred from assisted living facilities to emergency departments. The current process relies on **handwritten notes, printed paper packets, and hurried phone calls** — leading to missing allergy information, lost code status documents, medication errors, and zero feedback from the ED back to the originating facility.

**TransferLink closes that gap.**

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   LTC Facility ──► QR Code ──► EMS Transport ──► ED ──► Facility   │
│        ▲                                              │             │
│        └──────────────── Return Update ───────────────┘             │
│                                                                     │
│          Bi-directional. Real-time. No paper required.              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## The Core Innovation

```
┌────────────────────┐         ┌──────────────────────┐
│  BEFORE (Today)    │         │  WITH TRANSFERLINK   │
├────────────────────┤         ├──────────────────────┤
│ • Paper face sheet │   ───►  │ • One QR code        │
│ • Verbal handoff   │         │ • Full digital record │
│ • Faxed POLST      │         │ • Instant scan access │
│ • No ED feedback   │         │ • Auto return notify  │
│ • Phone tag        │         │ • Full audit trail    │
└────────────────────┘         └──────────────────────┘
```

---

## User Roles & Entry Points

| Role | Icon | Entry Point | Primary Action |
|------|------|-------------|----------------|
| **LTC Nurse / RN / LVN** | 📋 | Facility Dashboard | Initiate & manage transfers |
| **EMS Crew** | 🚑 | QR Scan View | Access record during transport |
| **ED Staff** | 🏥 | ED Intake View | Receive patient, document outcome |
| **Facility Return** | 🏠 | Return Update View | Receive ED return information |

---

## Transfer Workflow — End to End

```
PHASE 1: LTC NURSE INITIATES
────────────────────────────────────────────────────────────────────
  [Login] → [Dashboard] → [Patient Roster] → [Patient Record]
       → [Initiate Transfer] → [Confirm] → [QR Code Generated]

         4-step wizard: Review ──► Transfer ──► Confirm ──► QR Code

PHASE 2: PHYSICAL HANDOFF (The Hero Moment)
────────────────────────────────────────────────────────────────────
  QR Code printed / displayed on device screen
  ├── EMS scans on arrival → Transport View (code status + comfort)
  └── ED scans on arrival  → Full Clinical Record

PHASE 3: ED INTAKE & TREATMENT
────────────────────────────────────────────────────────────────────
  [ED Full Record] → [Treatment] → [ED Documents Return Plan]
                                           ↓
                              Facility notified automatically

PHASE 4: RETURN TO FACILITY
────────────────────────────────────────────────────────────────────
  [Facility Receives Update] → [Full Timeline / Audit Trail]
```

---

## Screen Map (16 Screens)

| # | Screen | Phase | Who Uses It |
|---|--------|-------|-------------|
| 0 | **Home — Role Selector** | Overview | All roles |
| 15 | **Login & Onboarding** | LTC Nurse Flow | LTC Staff |
| 17 | **Facility Dashboard** | LTC Nurse Flow | LTC Staff |
| 18 | **Transfer History** | LTC Nurse Flow | LTC Staff |
| 19 | **SBAR Handoff Report** | LTC Nurse Flow | LTC Staff |
| 1 | **Patient Roster** | LTC Nurse Flow | LTC Nurse |
| 2 | **Patient Record** | LTC Nurse Flow | LTC Nurse |
| 3 | **Initiate Transfer** | LTC Nurse Flow | LTC Nurse |
| 4 | **Confirm Transfer** | LTC Nurse Flow | LTC Nurse |
| 5 | **QR Code Ready** | Physical Handoff | LTC Nurse / EMS |
| 7 | **EMS Scans QR** | EMS Transport | EMS Crew |
| 8 | **EMS Transport View** | EMS Transport | EMS Crew |
| 9 | **ED Scans QR** | ED Intake | ED Staff |
| 10 | **ED Full Record** | ED Intake | ED Staff |
| 11 | **ED Return Documentation** | ED Intake | ED Staff |
| 12 | **Record Updated** | ED Intake | ED Staff |
| 13 | **Facility Receives Update** | Return to Facility | LTC Nurse |
| 14 | **Full Timeline / Audit Trail** | Return to Facility | All roles |

---

## Patient Data Model

Each patient record carries the following information through the entire care chain:

### Demographics & Identity
```
┌──────────────────────────────────────────────────────┐
│  Name · DOB · Age · Room · Language · Flag           │
│  Emergency Contact · Relationship · Phone            │
│  Facility Name · Address · Facility Phone            │
└──────────────────────────────────────────────────────┘
```

### Critical Safety Information *(surfaced immediately on QR scan)*
```
┌─────────────────────────────────────────────────────────────────┐
│  ⚠ ALLERGIES  [highlighted in red, always first]               │
│  CODE STATUS  DNR / DNI  ●  Full Code  ●  DNR                  │
│  ✓ POLST  (if applicable)                                       │
│  🌐 Language  (flag + language name)                            │
└─────────────────────────────────────────────────────────────────┘
```

### Clinical Record

| Section | Data Points |
|---------|-------------|
| **Medical History** | Diagnoses (A-FIB, CHF, COPD, DM, etc.) |
| **Medications** | Name, dose, frequency, drug class |
| **Devices & Equipment** | O2, CPAP, wheelchair, glucose monitor, bed alarm |
| **Safety Risks** | Falls, aspiration, elopement, skin breakdown, hypoglycemia |
| **Isolation Status** | Contact, droplet, airborne, or none |
| **Mental Status** | 4-level scale: Alert & Oriented → Non-Verbal |
| **Functional Level** | 4-level scale matching mental status |

### Transfer Event Data

| Field | Description |
|-------|-------------|
| Reason for Transfer | Chief complaint narrative |
| Active Symptoms | Multi-select (Chest Pain, SOB, AMS, Fall/Injury, etc.) |
| Interventions Attempted | What the facility already tried |
| Changes from Baseline | What is new or different |
| Destination | Receiving hospital |
| Transfer Time | Timestamp |
| Initiating Nurse | Name and credentials |

### ED Return Data

| Field | Description |
|-------|-------------|
| Diagnosis | Final ED diagnosis |
| Vitals | BP, HR, RR, SpO2 |
| Treatment | Medications given, procedures |
| Discharge Instructions | Follow-up plan for facility |
| Attending Physician | Name and credentials |
| Return Report Time | When facility was notified |

---

## Person-Centered Care — A Key Differentiator

TransferLink stores **comfort and communication preferences** that travel with the patient through every handoff. This data helps EMS manage distress during transport and helps ED staff provide culturally sensitive, individualized care.

| Category | Example |
|----------|---------|
| **Lighting** | "Prefers dim lighting at night" / "Nightlight required, afraid of the dark" |
| **Communication** | "Responds to calm, slow speech in Japanese" / "Hearing aid in right ear" |
| **Family** | "Son David visits daily, involved in all care decisions" |
| **Cultural / Religious** | "Buddhist traditions. Prefers rice-based meals." / "Catholic. Rosary at bedside." |
| **De-escalation** | "Calms with traditional Japanese music" / "Singing hymns during care helps significantly" |

---

## Facility Dashboard

The dashboard gives nurses and charge staff real-time operational awareness:

```
┌──────────────────────────────────────────────────────────┐
│  FACILITY DASHBOARD  ·  Cascade View Assisted Living     │
├──────────┬────────────────┬──────────────┬───────────────┤
│  👥 5    │  🚨 1          │  ✅ 3        │  🔄 0         │
│ Residents│ Active Transfer│ Completed 30d│ Pending Return│
├──────────┴────────────────┴──────────────┴───────────────┤
│  ACTIVE ALERTS                                           │
│  🚨 Maggie Tanaka  — Active transfer to Providence       │
│  💊 Dorothy Williams — INR recheck due tomorrow         │
│  📊 Robert Chen    — BG monitoring q4h, 36h remaining   │
│  ⚖️  James Martinez — Weight check due, fluid restrict  │
└──────────────────────────────────────────────────────────┘
```

---

## Transfer History & SBAR

**Transfer History** (S18) provides a filterable log of all transfers:
- Filter by: All · Active · Completed · Last 30 Days
- Each entry shows: patient, date, destination, diagnosis, status, attending physician

**SBAR Handoff Report** (S19) auto-generates a structured communication report:

```
S — Situation    What is happening right now
B — Background   Medical history, medications, baseline
A — Assessment   Current vitals, mental status, risk flags
R — Recommendation  Transfer destination, interventions, follow-up plan
```

---

## Demo Patients (Cascade View Assisted Living)

| Patient | Age | Language | Code Status | POLST | Condition Transferred For |
|---------|-----|----------|-------------|-------|---------------------------|
| **Maggie Tanaka** | 87 | 🇯🇵 Japanese | DNR / DNI | ✓ | Acute COPD exacerbation, O2 sat 84% |
| **Robert Chen** | 79 | 🇺🇸 English | Full Code | — | Severe hypoglycemia, glucose 42, AMS |
| **Dorothy Williams** | 91 | 🇺🇸 English | DNR | ✓ | Mechanical fall, forehead laceration, INR 4.8 |
| **James Martinez** | 84 | 🇲🇽 Spanish/English | Full Code | — | Acute CHF exacerbation, chest pain, +6 lbs |

---

## Technical Overview

### Architecture

```
Single-file HTML Application
├── No build step
├── No backend
├── No app install required for EMS/ED (scan QR → web view)
└── All state managed client-side (React useState)
```

### Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 18 (loaded via CDN/UMD) |
| Styling | Inline styles with JS design token system |
| Fonts | Inter (Google Fonts) |
| Icons | Custom inline SVG |
| QR Code | SVG-rendered mock QR pattern |
| Responsive | Breakpoint at 640px (`m` flag) |

### Design Tokens (Color System)

| Token | Hex | Used For |
|-------|-----|----------|
| `navy` | `#0F1D2F` | Primary background, headers |
| `accent` | `#1B9AAA` | Primary actions, active states |
| `amber` | `#F4A261` | Warnings, active transfers |
| `red` | `#E63946` | Allergies, DNR status, alerts |
| `green` | `#2A9D8F` | Full code, completed states |
| `purple` | `#7C4DFF` | Return-to-facility flow |

---

## Files in This Repository

| File | Description |
|------|-------------|
| `TransferLink_App.html` | **Primary prototype** — full interactive app with guided tour, splash screen, 16+ screens, all four user flows, patient intake wizard, notifications, and demo mode |
| `TransferLink_Final.html` | **Alternate version** — earlier iteration of the same prototype, same patient data and core screens |

---

## How to Run

No installation. No build. Open either file directly in a browser:

```bash
# Option A — double-click the file in your file manager
open TransferLink_App.html

# Option B — serve locally (avoids any browser file:// restrictions)
npx serve .
# then visit http://localhost:3000/TransferLink_App.html
```

**Recommended entry:** `TransferLink_App.html` — it includes the guided demo tour and splash screen.

---

## Guided Demo Tour

The app includes a built-in **~2 minute guided tour** that walks through the full transfer lifecycle:

```
Start Guided Tour
      │
      ▼
  Welcome → Login → Dashboard → Patient Roster
      → Patient Record → Initiate Transfer
      → Confirm → QR Code Ready
      → EMS Scans → EMS Transport View
      → ED Scans → ED Full Record
      → ED Documents Return → Record Updated
      → Facility Receives Update → Full Timeline
```

Each step shows **contextual narration** explaining what is happening and why it matters clinically.

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

## Prototype Notes

- **No real patient data.** All patients, facilities, and clinical scenarios are fictional.
- **Prototype by 360 Social Impact Studios.**
- This is a frontend-only MVP demo. A production version would require a backend API, authentication, HIPAA-compliant data storage, and integration with EHR systems.

---

*TransferLink MVP · Interactive Prototype · 360 Social Impact Studios*
