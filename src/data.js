export const INIT_PATIENTS = [
  {
    id:0, name:'Margaret "Maggie" Tanaka', short:"Maggie Tanaka", init:"MT",
    room:204, dob:"04/12/1938", age:87, lang:"Japanese", flag:"🇯🇵", interpreter:true,
    contact:"David Tanaka", contactRel:"Son, POA", contactPh:"(206) 555-0147",
    fac:"Cascade View Assisted Living", facAddr:"4200 Evergreen Way, Everett, WA 98201", facPh:"(425) 555-0312",
    code:"DNR / DNI", codeType:"dnr", polst:true,
    allergy:["Penicillin","Sulfa drugs"],
    hx:["A-FIB","CHF","COPD","DM (Type 2)"],
    meds:[{n:"Metoprolol 50mg",f:"BID",t:"Cardiac"},{n:"Lasix 40mg",f:"Daily",t:"Cardiac"},{n:"Metformin 500mg",f:"BID",t:"Endocrine"},{n:"Eliquis 5mg",f:"BID",t:"Anticoag"},{n:"Albuterol",f:"PRN",t:"Respiratory"}],
    medSource:{ method:"pcc_import", label:"PointClickCare MAR", file:"CascadeView_MAR_20260320.pdf", importedAt:"March 20, 2026 at 2:41 AM", importedBy:"RN Sarah Mitchell", count:5, verified:true },
    mLvl:2, fLvl:2, dev:["O2 at 2 L/min","CPAP"], risks:["Falls","Aspiration","Needs Meds Crushed"], iso:"None",
    belongings: ["Hearing Aid (Right)", "Glasses"],
    vitalsHistory: [
      { time: "08:00", bp: "128/76", hr: 82, sp: 94 },
      { time: "12:00", bp: "132/80", hr: 88, sp: 92 },
      { time: "14:00", bp: "138/82", hr: 96, sp: 84 }
    ],
    comfort:{light:"Prefers dim lighting at night",comm:"Responds to calm, slow speech in Japanese",fam:"Son David visits daily, involved in all care decisions",cult:"Buddhist traditions. Prefers rice-based meals",dist:"Agitated in loud environments. Calms with traditional Japanese music",triggers:"Loud voices, being rushed, bright overhead lights",calming:"Hold hand, speak slowly, play traditional Japanese koto music",diet:"Soft rice-based diet, small portions, no dairy"},
    tx:{reason:"Acute shortness of breath, O2 sat dropped to 84%, not responding to PRN albuterol",symp:["Shortness of Breath"],intv:"Administered PRN albuterol nebulizer, increased O2 to 4 L/min, placed in high Fowler's position",chg:"Increased confusion at night, decreased appetite x2 days, new productive cough",dest:"Providence Regional Medical Center, Everett",time:"March 20, 2026 at 2:47 AM",nurse:"RN Sarah Mitchell", belongingsSent: ["Hearing Aid (Right)", "Glasses"], eventId:"TXF-2026-0320-0247-MT", lastVitals:"HR 96 · BP 138/82 · SpO2 84% on 2L · 2:45 AM"},
    er:{dx:"Acute exacerbation of COPD with hypoxemia",bp:"138/82",hr:"96",rr:"22",sp:"93% on 3L",rx:"Prednisone 40mg x5 days, Azithromycin 250mg x5 days",rpt:"Called RN Mitchell at Cascade View, 6:12 PM",ins:"Follow up with pulmonology within 7 days. Continue O2 at 2 L/min. Monitor for worsening cough or fever. Return to ED if O2 sat drops below 90%.",dr:"Dr. James Park, MD",time:"March 20, 2026 at 6:15 PM", submittedAt:"March 20, 2026 at 6:15 PM", notifiedAt:"March 20, 2026 at 6:15 PM", ackedAt:null, ackedBy:null, followUpRequired:true},
  },
  {
    id:1, name:"Robert Chen", short:"Robert Chen", init:"RC",
    room:118, dob:"09/23/1946", age:79, lang:"English", flag:"🇺🇸", interpreter:false,
    contact:"Linda Chen", contactRel:"Wife", contactPh:"(206) 555-0283",
    fac:"Cascade View Assisted Living", facAddr:"4200 Evergreen Way, Everett, WA 98201", facPh:"(425) 555-0312",
    code:"Full Code", codeType:"full", polst:false,
    allergy:["Metformin","Iodine contrast"],
    hx:["DM (Type 2)","CKD Stage 3","Hypertension","Peripheral Neuropathy"],
    meds:[{n:"Glipizide 10mg",f:"BID",t:"Endocrine"},{n:"Lisinopril 20mg",f:"Daily",t:"Cardiac"},{n:"Amlodipine 5mg",f:"Daily",t:"Cardiac"},{n:"Gabapentin 300mg",f:"TID",t:"Neuro"},{n:"Sevelamer 800mg",f:"TID",t:"Renal"}],
    medSource:{ method:"photo", label:"Photo of paper MAR", file:"IMG_MAR_20260320.jpg", importedAt:"March 20, 2026 at 9:48 AM", importedBy:"RN Sarah Mitchell", count:5, verified:true },
    mLvl:1, fLvl:1, dev:["Glucose monitor"], risks:["Falls","Hypoglycemia"], iso:"None",
    belongings: ["Hearing Aid (Left)", "Walking Stick"],
    vitalsHistory: [
      { time: "07:00", bp: "148/86", hr: 98, sp: 98 },
      { time: "09:00", bp: "152/88", hr: 104, sp: 98 }
    ],
    comfort:{light:"Normal lighting, no preference",comm:"Alert and conversant in English. Hearing aid in right ear. Advance care planning conversation has been initiated; wife Linda is actively involved in all care decisions.",fam:"Wife Linda visits every evening. Son Kevin calls weekly.",cult:"No specific cultural preferences noted",dist:"Becomes anxious about blood sugar readings. Reassurance and clear explanations help.",triggers:"Low blood sugar fears, unfamiliar faces explaining medications",calming:"Clear explanation of each step, show the glucose number, call wife Linda",diet:"Diabetic diet, consistent carb counting, no concentrated sweets"},
    tx:{reason:"Blood glucose dropped to 42 mg/dL, diaphoretic, confused, not responsive to oral glucose gel",symp:["Altered Mental Status"],intv:"Administered oral glucose gel x2, juice box, checked glucose q15min. Glucose at 58 after 30 min but patient still confused.",chg:"Reduced appetite x3 days, Glipizide dose increased last week by PCP, one episode of vomiting yesterday",dest:"Providence Regional Medical Center, Everett",time:"March 20, 2026 at 10:15 AM",nurse:"RN Sarah Mitchell", belongingsSent: ["Hearing Aid (Left)"], eventId:"TXF-2026-0320-1015-RC", lastVitals:"HR 104 · BP 152/88 · Glucose 58 · 10:12 AM"},
    er:{dx:"Severe hypoglycemia with altered mental status",bp:"152/88",hr:"104",rr:"18",sp:"98% RA",rx:"Glipizide reduced to 5mg BID, D50 administered in ED",rpt:"Called RN Mitchell at Cascade View, 2:30 PM",ins:"Hold Glipizide tonight. Resume at 5mg BID tomorrow. Check BG q4h for 48 hours. Follow up with endocrinology within 5 days. Return if BG < 60 or AMS recurs.",dr:"Dr. Anika Patel, MD",time:"March 20, 2026 at 2:45 PM", submittedAt:"March 20, 2026 at 2:45 PM", notifiedAt:"March 20, 2026 at 2:46 PM", ackedAt:null, ackedBy:null, followUpRequired:true},
  },
  {
    id:2, name:"Dorothy Williams", short:"Dorothy Williams", init:"DW",
    room:305, dob:"01/07/1935", age:91, lang:"English", flag:"🇺🇸", interpreter:false,
    contact:"Patricia Williams-Scott", contactRel:"Daughter, POA", contactPh:"(425) 555-0891",
    fac:"Cascade View Assisted Living", facAddr:"4200 Evergreen Way, Everett, WA 98201", facPh:"(425) 555-0312",
    code:"DNR", codeType:"dnr", polst:true,
    allergy:["Aspirin","Codeine","Latex"],
    hx:["CVA (2023)","A-FIB","Vascular Dementia","Osteoporosis","Chronic UTIs"],
    meds:[{n:"Warfarin 3mg",f:"Daily",t:"Anticoag"},{n:"Donepezil 10mg",f:"Daily",t:"Neuro"},{n:"Calcium/Vit D",f:"Daily",t:"Bone"},{n:"Omeprazole 20mg",f:"Daily",t:"GI"},{n:"Cranberry extract",f:"BID",t:"Urinary"}],
    medSource:{ method:"pdf", label:"Uploaded medication report", file:"DW_MedList_202603.pdf", importedAt:"March 18, 2026 at 4:15 PM", importedBy:"RN David Park", count:5, verified:true },
    mLvl:3, fLvl:3, dev:["Wheelchair","Bed alarm"], risks:["Falls","Elopement","Skin breakdown","Dysphagia"], iso:"None",
    belongings: ["Dentures (Upper)", "Dentures (Lower)", "Glasses"],
    vitalsHistory: [
      { time: "06:00", bp: "124/72", hr: 74, sp: 97 },
      { time: "08:00", bp: "128/74", hr: 78, sp: 96 }
    ],
    comfort:{light:"Nightlight required. Afraid of the dark.",comm:"Limited verbal. Responds to touch and familiar voices. Daughter's voice calms her.",fam:"Daughter Patricia visits MWF. Granddaughter Sundays. Very involved family.",cult:"Christian faith. Enjoys hymns. Pastor visits monthly.",dist:"Becomes agitated during personal care. Singing hymns during care helps significantly.",triggers:"Personal care in the dark, strangers approaching without warning, loud ED environments",calming:"Sing a hymn quietly, call daughter Patricia on speakerphone, turn on a soft light",diet:"Mechanical soft / puree for dysphagia. Thickened liquids (honey). Favorite: tomato soup."},
    tx:{reason:"Found on floor next to wheelchair, laceration to right forehead, brief LOC per aide, INR due today",symp:["Fall/Injury","Altered Mental Status"],intv:"Applied pressure to laceration, ice pack, neuro checks q15min, vitals stable. Unable to obtain INR at facility.",chg:"Increased restlessness x2 days, refused breakfast this morning, new bruising on left arm noted yesterday",dest:"Providence Regional Medical Center, Everett",time:"March 20, 2026 at 8:30 AM",nurse:"RN David Park", belongingsSent: ["Glasses"], eventId:"TXF-2026-0320-0830-DW", lastVitals:"HR 78 · BP 128/74 · SpO2 96% RA · 8:25 AM"},
    er:{dx:"Mechanical fall with forehead laceration, supratherapeutic INR (4.8)",bp:"128/74",hr:"78",rr:"16",sp:"96% RA",rx:"Warfarin held x2 days, resume at 2mg daily. Steri-strips applied. Tetanus updated.",rpt:"Called RN Park at Cascade View, 1:15 PM",ins:"Monitor laceration for signs of infection. Neuro checks q4h x24h. Recheck INR in 3 days. Fall precautions. No Warfarin tonight or tomorrow. Resume 2mg on day 3. Return if increased confusion, vomiting, or new bleeding.",dr:"Dr. Maria Santos, MD",time:"March 20, 2026 at 1:20 PM", submittedAt:"March 20, 2026 at 1:20 PM", notifiedAt:"March 20, 2026 at 1:21 PM", ackedAt:"March 20, 2026 at 1:34 PM", ackedBy:"RN David Park", followUpRequired:true},
  },
  {
    id:3, name:"James Martinez", short:"James Martinez", init:"JM",
    room:112, dob:"11/30/1941", age:84, lang:"Spanish", flag:"🇲🇽", interpreter:true,
    contact:"Maria Martinez", contactRel:"Wife", contactPh:"(206) 555-0467",
    fac:"Cascade View Assisted Living", facAddr:"4200 Evergreen Way, Everett, WA 98201", facPh:"(425) 555-0312",
    code:"Full Code", codeType:"full", polst:false,
    allergy:["NSAIDs","ACE inhibitors"],
    hx:["COPD","Prior MI (2021)","CHF (EF 35%)","Anxiety","GERD"],
    meds:[{n:"Carvedilol 12.5mg",f:"BID",t:"Cardiac"},{n:"Entresto 49/51mg",f:"BID",t:"Cardiac"},{n:"Spironolactone 25mg",f:"Daily",t:"Cardiac"},{n:"Tiotropium",f:"Daily",t:"Respiratory"},{n:"Lorazepam 0.5mg",f:"PRN",t:"Psych"},{n:"Pantoprazole 40mg",f:"Daily",t:"GI"}],
    medSource:{ method:"manual", label:"Manually entered at admission", file:null, importedAt:"March 2, 2026 at 11:00 AM", importedBy:"RN Sarah Mitchell", count:6, verified:true },
    mLvl:1, fLvl:2, dev:["O2 at 1 L/min","Daily weights","Telemetry-ready"], risks:["Falls","Fluid overload","Anxiety episodes"], iso:"None",
    belongings: ["Rosary", "Phone"],
    vitalsHistory: [
      { time: "10:00", bp: "158/92", hr: 102, sp: 91 },
      { time: "16:00", bp: "168/96", hr: 110, sp: 89 }
    ],
    comfort:{light:"Keeps TV on for background noise, especially sports",comm:"Bilingual (Spanish/English). Prefers Spanish when anxious. Wife translates when needed.",fam:"Wife Maria visits daily, brings home-cooked meals. Large extended family visits weekends.",cult:"Catholic faith. Rosary at bedside. Priest visits weekly. Family brings traditional Mexican food.",dist:"Anxiety escalates with chest sensations. Lorazepam PRN helps. Wife's presence is most effective.",triggers:"Chest sensations, feeling alone, being told 'it's nothing to worry about'",calming:"Hold rosary, speak in Spanish, acknowledge the fear, call wife Maria",diet:"Low sodium, 1.5L fluid restriction, heart-healthy. Enjoys caldo de pollo."},
    tx:{reason:"Acute onset chest pain radiating to left arm, diaphoretic, new 3+ pitting edema bilateral lower extremities, weight up 6 lbs in 3 days",symp:["Chest Pain"],intv:"O2 increased to 3 L/min, elevated HOB, obtained vitals, placed on facility pulse ox monitoring, called 911",chg:"Progressive dyspnea on exertion x4 days, sleeping upright x2 nights, decreased urine output, missed Entresto dose x2 days (nausea)",dest:"Providence Regional Medical Center, Everett",time:"March 20, 2026 at 4:22 PM",nurse:"RN Sarah Mitchell", belongingsSent: ["Rosary"], eventId:"TXF-2026-0320-1622-JM", lastVitals:"HR 110 · BP 168/96 · SpO2 89% on 3L · 4:18 PM"},
    er:{dx:"Acute decompensated heart failure (CHF exacerbation), troponin negative",bp:"168/96",hr:"110",rr:"26",sp:"89% on 3L",rx:"IV Lasix 40mg in ED, resume Entresto. Add Metolazone 2.5mg PRN. Strict I&Os.",rpt:"Called RN Mitchell at Cascade View, 10:45 PM",ins:"Daily weights (call if >2 lb gain). Strict 1.5L fluid restriction. Low sodium diet. Monitor for worsening dyspnea. Follow up with cardiology within 3 days. Return immediately for chest pain, worsening SOB, or weight gain >3 lbs.",dr:"Dr. James Park, MD",time:"March 20, 2026 at 10:50 PM", submittedAt:"March 20, 2026 at 10:50 PM", notifiedAt:"March 20, 2026 at 10:51 PM", ackedAt:"March 20, 2026 at 11:03 PM", ackedBy:"RN Sarah Mitchell", followUpRequired:true},
  },
];

export const FACILITY_INFO = {
  name: "Cascade View Assisted Living",
  shortName: "Cascade View",
  addr: "4200 Evergreen Way, Everett, WA 98201",
  ph: "(425) 555-0312",
  mode: "documentUpload",
  modeLabel: "Document-upload facility",
  bedCount: 64,
  type: "Assisted Living + Memory Care",
};

export const ALL_BELONGINGS = ["Hearing Aid (Left)", "Hearing Aid (Right)", "Glasses", "Dentures (Upper)", "Dentures (Lower)", "Walking Stick", "Wheelchair", "Personal Bag", "Phone", "Wallet/ID", "Rosary"];

export const NEW_PT_TEMPLATE = {
  name:"", short:"", init:"",
  room:"", dob:"", age:"", lang:"English", flag:"🇺🇸", interpreter:false,
  contact:"", contactRel:"", contactPh:"",
  fac:"Cascade View Assisted Living", facAddr:"4200 Evergreen Way, Everett, WA 98201", facPh:"(425) 555-0312",
  code:"Full Code", codeType:"full", polst:false,
  allergy:[],
  hx:[],
  meds:[],
  medSource:null,
  mLvl:1, fLvl:1, dev:[], risks:[], iso:"None",
  belongings: [],
  vitalsHistory: [],
  comfort:{light:"",comm:"",fam:"",cult:"",dist:"",triggers:"",calming:"",diet:""},
  tx:{reason:"",symp:[],intv:"",chg:"",dest:"",time:"",nurse:"", belongingsSent: [], eventId:"", lastVitals:""},
  er:{dx:"",bp:"",hr:"",rr:"",sp:"",rx:"",rpt:"",ins:"",dr:"",time:"", submittedAt:null, notifiedAt:null, ackedAt:null, ackedBy:null, followUpRequired:true},
};

export const INTEGRATIONS = [
  {
    id: "pcc",
    name: "PointClickCare",
    category: "LTC EHR",
    status: "connected",
    logo: "🏥",
    desc: "Most common EHR in Washington State skilled nursing and assisted living.",
    scopes: [
      { k: "demographics", v: "Pull baseline demographics", on: true },
      { k: "meds", v: "Pull active medication list", on: true },
      { k: "code", v: "Pull code status / advance directives", on: true },
      { k: "txEvent", v: "Push transfer event summary", on: true },
      { k: "erReturn", v: "Receive ED return update", on: true },
    ],
  },
  {
    id: "epic",
    name: "Epic (Care Everywhere)",
    category: "Hospital / Health System EHR",
    status: "available",
    logo: "🩺",
    desc: "Receiving EDs on Epic can consume the transfer packet via Care Everywhere or FHIR.",
    scopes: [
      { k: "demographics", v: "Pull demographics", on: true },
      { k: "meds", v: "Pull active medications", on: false },
      { k: "code", v: "Pull code status / POLST", on: true },
      { k: "txEvent", v: "Push transfer event summary", on: true },
      { k: "erReturn", v: "Receive ED return update", on: true },
    ],
  },
  {
    id: "csv",
    name: "Other EHR / CSV Export",
    category: "Generic",
    status: "available",
    logo: "📄",
    desc: "For facilities on MatrixCare, AL Advantage, or any system that can export a roster.",
    scopes: [
      { k: "demographics", v: "Import demographics from CSV", on: true },
      { k: "meds", v: "Import medication list from PDF / photo", on: true },
      { k: "code", v: "Manual code status entry", on: true },
      { k: "txEvent", v: "Download transfer event summary", on: true },
      { k: "erReturn", v: "Receive ED return push notification", on: true },
    ],
  },
  {
    id: "standalone",
    name: "Standalone Mode",
    category: "No EHR required",
    status: "available",
    logo: "📋",
    desc: "For adult family homes, small assisted living, and rural facilities with no EHR at all.",
    scopes: [
      { k: "demographics", v: "Manual intake at admission", on: true },
      { k: "meds", v: "Photo / manual medication entry", on: true },
      { k: "code", v: "POLST upload + code status", on: true },
      { k: "txEvent", v: "Printable transfer sheet + QR", on: true },
      { k: "erReturn", v: "Receive ED return push notification", on: true },
    ],
  },
];

export const FACILITY_MODES = [
  {
    id: "standalone",
    label: "Standalone Facility",
    sub: "No EHR · adult family home · small AL",
    ic: "📋",
    color: "#7C4DFF",
  },
  {
    id: "documentUpload",
    label: "Document-Upload Facility",
    sub: "Has some digital records · uploads PDFs / photos",
    ic: "📎",
    color: "#F4A261",
  },
  {
    id: "apiConnected",
    label: "API-Connected Facility",
    sub: "PointClickCare, Epic, or other live EHR",
    ic: "🔌",
    color: "#1B9AAA",
  },
];

export const PERSONAS = [
  {name:"Sarah Mitchell", role:"RN / LVN", shift:"Night (7p-7a)"},
  {name:"David Park", role:"RN / LVN", shift:"Night (7p-7a)"},
  {name:"Dr. Angela Kim", role:"MD / NP", shift:"Day (7a-7p)"},
  {name:"Teresa Morales", role:"Charge Nurse", shift:"Day (7a-7p)"},
  {name:"Mark Johnson", role:"Administrator", shift:"Day (7a-7p)"},
];

export const DEMO_SCREEN_MAP = [
  {
    screen: 0,
    title: "Welcome to TransferLink",
    desc: "Built from WA State LTC Transformation Workgroup feedback",
    scene: "The committee validated the single-QR concept. Their push was on operational readiness: medication accuracy without transcription, support for facilities with and without an EHR, a true closed loop on return, and person-centered content that travels with the patient. This build answers each of those points.",
    note: "One patient. One record. Every handoff. Under five minutes for the nurse. No lost paper, no medication transcription errors, no phone tag when the patient returns."
  },
  {
    screen: 15,
    title: "Login & Onboarding",
    desc: "Facility staff signs in — no separate app, no EMR password",
    scene: "It's March 20, 2026. RN Sarah Mitchell starts her night shift at Cascade View Assisted Living. She logs in with a facility ID — no separate app to install, no EMR portal to navigate.",
    note: "Zero friction at login means nurses are in the record in seconds, not minutes."
  },
  {
    screen: 17,
    title: "Facility Dashboard",
    desc: "Real-time visibility into active transfers and follow-up alerts",
    scene: "Sarah's dashboard shows one active transfer, three follow-up alerts, and recent activity. Maggie Tanaka's name is at the top — her transfer to Providence Regional is in progress.",
    note: "Charge nurses currently manage this visibility through whiteboards, sticky notes, and phone calls."
  },
  {
    screen: 1,
    title: "Patient Roster",
    desc: "Every resident at Cascade View, searchable at a glance",
    scene: "Four residents tonight. Maggie Tanaka — Room 204, 87 years old — is showing an active transfer badge. One tap to her full record.",
    note: "The color bar on each card reflects each resident's documented code status — their own documented wishes, at a glance."
  },
  {
    screen: 2,
    title: "Patient Record",
    desc: "Medication list imported, person-centered preferences captured",
    scene: "Maggie's record: Japanese speaker needing interpreter. DNR/DNI with POLST on file. Penicillin and Sulfa allergies. Her 5-medication list was imported from PointClickCare at 2:41 AM and verified at transfer — no retyping. Person-centered preferences are here too: she calms with traditional Japanese music.",
    note: "Brenda Groves on the committee emphasized that medication transcription is the largest error source in LTC transfers. The medication list now arrives with a verified source, timestamp, and import method — no retyping required."
  },
  {
    screen: 3,
    title: "Initiate Transfer — Under 5 Minutes",
    desc: "Five essential fields up front, secondary detail expandable",
    scene: "2:47 AM. Maggie's O2 sat is 84% and she is not responding to albuterol. Sarah sees five essential fields — reason, symptoms, recent change, destination, safety confirmation — with a visible 'under 5 minutes' progress meter. Baseline data is reused from admission.",
    note: "88% of survey respondents preferred completion in 3-5 minutes. Time (38%) and information burden (31%) were the top two barriers. The primary path asks only what changed."
  },
  {
    screen: 4,
    title: "Confirm Transfer",
    desc: "Final review before the QR code generates",
    scene: "One last look before the QR is generated: DNR/DNI. POLST on file. Language: Japanese. These aren't checkboxes to rush through — they are the information that determines what happens the moment EMS walks in.",
    note: "In this research, a patient's language was miscommunicated as Korean instead of Japanese — and no one knew until the wrong interpreter arrived. Language is surfaced first. Always."
  },
  {
    screen: 5,
    title: "QR Handoff Toolkit",
    desc: "Print · wristband · mobile display · backup short link",
    scene: "Margie's question on the committee was practical: who scans it and on what device? The answer is all three formats. Printed transfer sheet for the paper hand-off. A wristband label so the code stays with the patient. A mobile display if the ED prefers to scan the tablet. Plus a short link and transfer event ID as a scanning fallback.",
    note: "EMS and ED get read-only access through the scan. ED return documentation is the only write action in the handoff chain — permission is separated, not conflated."
  },
  {
    screen: 7,
    title: "EMS Scans QR",
    desc: "Crew scans on arrival — no app install, no login required",
    scene: "3:14 AM. EMS arrives at Cascade View. One scan from their tablet or phone. The record opens in a web browser — no app to install, no credentials to enter for transport teams.",
    note: "The same QR code works at every handoff point. EMS. ED. The same current record, every time."
  },
  {
    screen: 8,
    title: "EMS Transport View",
    desc: "Safety facts, behavioral triggers, and calming strategies — in that order",
    scene: "The first screen EMS sees surfaces the safety facts: Japanese speaker, interpreter needed. DNR/DNI. POLST on file. Penicillin, Sulfa. Below that, person-centered content: triggers are loud voices and being rushed; calming strategies are to hold her hand and play koto music. Not a soft extra — operational.",
    note: "The committee named psycho-social and cultural content as a workgroup priority. It now surfaces alongside the clinical data at the moment it matters, not buried in a back section."
  },
  {
    screen: 9,
    title: "ED Scans QR",
    desc: "Same code, same record — no app install for ED staff",
    scene: "Providence Regional ED. Triage nurse scans the same QR that EMS used. No app install, no second data entry. Language need is visible before Maggie is moved from the ambulance bay.",
    note: "One record. Every handoff. Zero duplicate data entry."
  },
  {
    screen: 10,
    title: "ED Triage View — First 30 Seconds",
    desc: "Code, POLST, allergies, language, reason, last vitals — above the fold",
    scene: "The committee asked for a view ED staff could read in the first 30 seconds. This screen puts it all up top: name and DOB, DNR/DNI and POLST, Penicillin and Sulfa allergies, Japanese with interpreter needed, reason for transfer, last known vitals. Medications, history, devices and person-centered detail live in the second layer — one tap away, but not in the way.",
    note: "POLST preview is one tap from this screen. The committee flagged POLST unavailability at the point of crisis as a persistent risk under paper processes."
  },
  {
    screen: 11,
    title: "ED Return Documentation",
    desc: "ED closes the loop — diagnosis, vitals, medication changes, discharge plan",
    scene: "Maggie is stable. The ED physician documents COPD exacerbation, prednisone and azithromycin, pulmonology follow-up in 7 days. Submitting pushes an immediate notification to Cascade View and opens the acknowledgement loop.",
    note: "Donald on the committee emphasized the LTC facility needs return information as badly as the ED needs outgoing information. The return is now a tracked, acknowledged event — not a passive screen."
  },
  {
    screen: 12,
    title: "Loop Closed — Delivery States",
    desc: "Submitted → Facility notified → Nurse acknowledged → Record closed",
    scene: "The return packet moves through four visible states. Submitted by the ED physician. Facility notified via push notification. Acknowledged by the receiving nurse with one tap. Record closed. Every state is timestamped. Every transition is visible.",
    note: "In the current paper-and-fax world, this notification is manual and routinely skipped or delayed. Making it a tracked state change is what the word 'automatically' has to earn."
  },
  {
    screen: 13,
    title: "Facility Receives and Acknowledges",
    desc: "One-tap acknowledgement · copy instructions · download summary",
    scene: "7:22 AM. Morning RN opens Maggie's record before handoff. COPD exacerbation, O2 at 2L/min, prednisone and azithromycin for 5 days, pulmonology follow-up this week. One tap acknowledges receipt and closes the return loop. Copy or download the instructions for the chart.",
    note: "In the current system, the patient often arrives before any information does. TransferLink flips that: the record arrives and is acknowledged before the patient comes back through the door."
  },
  {
    screen: 14,
    title: "Full Audit Trail",
    desc: "Every scan, every handoff — timestamped and accountable",
    scene: "Every moment in Maggie's care is timestamped and permanent. Medication list imported and verified. Transfer initiated. QR generated. EMS accessed the record en route. ED received and documented. Facility notified automatically. Acknowledgement captured. One patient. One record. Every handoff — auditable and defensible.",
    note: "This audit trail protects patients, facilities, and care teams. It is built into every transfer — not an add-on."
  },
  {
    screen: 20,
    title: "Integrations & Data Sources",
    desc: "Works with EHR, without EHR, and everything in between",
    scene: "Donald, Brenda, and Margie each raised the integration question from different angles: large-system, rural, and adult family home. TransferLink has one answer that respects all three — an API-connected mode for PointClickCare or Epic, a document-upload mode for facilities that have some digital records, and a standalone mode for facilities with no EHR at all.",
    note: "Large-system reviewers see how it integrates without becoming an EHR module. Small-facility reviewers see they can still use it without EHR access. Same product, three postures."
  },
];
