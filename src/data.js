export const INIT_PATIENTS = [
  {
    id:0, name:'Margaret "Maggie" Tanaka', short:"Maggie Tanaka", init:"MT",
    room:204, dob:"04/12/1938", age:87, lang:"Japanese", flag:"🇯🇵",
    contact:"David Tanaka", contactRel:"Son, POA", contactPh:"(206) 555-0147",
    fac:"Cascade View Assisted Living", facAddr:"4200 Evergreen Way, Everett, WA 98201", facPh:"(425) 555-0312",
    code:"DNR / DNI", codeType:"dnr", polst:true,
    allergy:["Penicillin","Sulfa drugs"],
    hx:["A-FIB","CHF","COPD","DM (Type 2)"],
    meds:[{n:"Metoprolol 50mg",f:"BID",t:"Cardiac"},{n:"Lasix 40mg",f:"Daily",t:"Cardiac"},{n:"Metformin 500mg",f:"BID",t:"Endocrine"},{n:"Eliquis 5mg",f:"BID",t:"Anticoag"},{n:"Albuterol",f:"PRN",t:"Respiratory"}],
    mLvl:2, fLvl:2, dev:["O2 at 2 L/min","CPAP"], risks:["Falls","Aspiration","Needs Meds Crushed"], iso:"None",
    belongings: ["Hearing Aid (Right)", "Glasses"],
    vitalsHistory: [
      { time: "08:00", bp: "128/76", hr: 82, sp: 94 },
      { time: "12:00", bp: "132/80", hr: 88, sp: 92 },
      { time: "14:00", bp: "138/82", hr: 96, sp: 84 }
    ],
    comfort:{light:"Prefers dim lighting at night",comm:"Responds to calm, slow speech in Japanese",fam:"Son David visits daily, involved in all care decisions",cult:"Buddhist traditions. Prefers rice-based meals",dist:"Agitated in loud environments. Calms with traditional Japanese music"},
    tx:{reason:"Acute shortness of breath, O2 sat dropped to 84%, not responding to PRN albuterol",symp:["Shortness of Breath"],intv:"Administered PRN albuterol nebulizer, increased O2 to 4 L/min, placed in high Fowler's position",chg:"Increased confusion at night, decreased appetite x2 days, new productive cough",dest:"Providence Regional Medical Center, Everett",time:"March 20, 2026 at 2:47 PM",nurse:"RN Sarah Mitchell", belongingsSent: ["Hearing Aid (Right)", "Glasses"]},
    er:{dx:"Acute exacerbation of COPD with hypoxemia",bp:"138/82",hr:"96",rr:"22",sp:"93% on 3L",rx:"Prednisone 40mg x5 days, Azithromycin 250mg x5 days",rpt:"Called RN Mitchell at Cascade View, 6:12 PM",ins:"Follow up with pulmonology within 7 days. Continue O2 at 2 L/min. Monitor for worsening cough or fever. Return to ED if O2 sat drops below 90%.",dr:"Dr. James Park, MD",time:"March 20, 2026 at 6:15 PM"},
  },
  {
    id:1, name:"Robert Chen", short:"Robert Chen", init:"RC",
    room:118, dob:"09/23/1946", age:79, lang:"English", flag:"🇺🇸",
    contact:"Linda Chen", contactRel:"Wife", contactPh:"(206) 555-0283",
    fac:"Cascade View Assisted Living", facAddr:"4200 Evergreen Way, Everett, WA 98201", facPh:"(425) 555-0312",
    code:"Full Code", codeType:"full", polst:false,
    allergy:["Metformin","Iodine contrast"],
    hx:["DM (Type 2)","CKD Stage 3","Hypertension","Peripheral Neuropathy"],
    meds:[{n:"Glipizide 10mg",f:"BID",t:"Endocrine"},{n:"Lisinopril 20mg",f:"Daily",t:"Cardiac"},{n:"Amlodipine 5mg",f:"Daily",t:"Cardiac"},{n:"Gabapentin 300mg",f:"TID",t:"Neuro"},{n:"Sevelamer 800mg",f:"TID",t:"Renal"}],
    mLvl:1, fLvl:1, dev:["Glucose monitor"], risks:["Falls","Hypoglycemia"], iso:"None",
    belongings: ["Hearing Aid (Left)", "Walking Stick"],
    vitalsHistory: [
      { time: "07:00", bp: "148/86", hr: 98, sp: 98 },
      { time: "09:00", bp: "152/88", hr: 104, sp: 98 }
    ],
    comfort:{light:"Normal lighting, no preference",comm:"Alert and conversant in English. Hearing aid in right ear.",fam:"Wife Linda visits every evening. Son Kevin calls weekly.",cult:"No specific cultural preferences noted",dist:"Becomes anxious about blood sugar readings. Reassurance helps."},
    tx:{reason:"Blood glucose dropped to 42 mg/dL, diaphoretic, confused, not responsive to oral glucose gel",symp:["Altered Mental Status"],intv:"Administered oral glucose gel x2, juice box, checked glucose q15min. Glucose at 58 after 30 min but patient still confused.",chg:"Reduced appetite x3 days, Glipizide dose increased last week by PCP, one episode of vomiting yesterday",dest:"Providence Regional Medical Center, Everett",time:"March 20, 2026 at 10:15 AM",nurse:"RN Sarah Mitchell", belongingsSent: ["Hearing Aid (Left)"]},
    er:{dx:"Severe hypoglycemia with altered mental status",bp:"152/88",hr:"104",rr:"18",sp:"98% RA",rx:"Glipizide reduced to 5mg BID, D50 administered in ED",rpt:"Called RN Mitchell at Cascade View, 2:30 PM",ins:"Hold Glipizide tonight. Resume at 5mg BID tomorrow. Check BG q4h for 48 hours. Follow up with endocrinology within 5 days. Return if BG < 60 or AMS recurs.",dr:"Dr. Anika Patel, MD",time:"March 20, 2026 at 2:45 PM"},
  },
  {
    id:2, name:"Dorothy Williams", short:"Dorothy Williams", init:"DW",
    room:305, dob:"01/07/1935", age:91, lang:"English", flag:"🇺🇸",
    contact:"Patricia Williams-Scott", contactRel:"Daughter, POA", contactPh:"(425) 555-0891",
    fac:"Cascade View Assisted Living", facAddr:"4200 Evergreen Way, Everett, WA 98201", facPh:"(425) 555-0312",
    code:"DNR", codeType:"dnr", polst:true,
    allergy:["Aspirin","Codeine","Latex"],
    hx:["CVA (2023)","A-FIB","Vascular Dementia","Osteoporosis","Chronic UTIs"],
    meds:[{n:"Warfarin 3mg",f:"Daily",t:"Anticoag"},{n:"Donepezil 10mg",f:"Daily",t:"Neuro"},{n:"Calcium/Vit D",f:"Daily",t:"Bone"},{n:"Omeprazole 20mg",f:"Daily",t:"GI"},{n:"Cranberry extract",f:"BID",t:"Urinary"}],
    mLvl:3, fLvl:3, dev:["Wheelchair","Bed alarm"], risks:["Falls","Elopement","Skin breakdown","Dysphagia"], iso:"None",
    belongings: ["Dentures (Upper)", "Dentures (Lower)", "Glasses"],
    vitalsHistory: [
      { time: "06:00", bp: "124/72", hr: 74, sp: 97 },
      { time: "08:00", bp: "128/74", hr: 78, sp: 96 }
    ],
    comfort:{light:"Nightlight required. Afraid of the dark.",comm:"Limited verbal. Responds to touch and familiar voices. Daughter's voice calms her.",fam:"Daughter Patricia visits MWF. Granddaughter Sundays. Very involved family.",cult:"Christian faith. Enjoys hymns. Pastor visits monthly.",dist:"Becomes agitated during personal care. Singing hymns during care helps significantly."},
    tx:{reason:"Found on floor next to wheelchair, laceration to right forehead, brief LOC per aide, INR due today",symp:["Fall/Injury","Altered Mental Status"],intv:"Applied pressure to laceration, ice pack, neuro checks q15min, vitals stable. Unable to obtain INR at facility.",chg:"Increased restlessness x2 days, refused breakfast this morning, new bruising on left arm noted yesterday",dest:"Providence Regional Medical Center, Everett",time:"March 20, 2026 at 8:30 AM",nurse:"RN David Park", belongingsSent: ["Glasses"]},
    er:{dx:"Mechanical fall with forehead laceration, supratherapeutic INR (4.8)",bp:"128/74",hr:"78",rr:"16",sp:"96% RA",rx:"Warfarin held x2 days, resume at 2mg daily. Steri-strips applied. Tetanus updated.",rpt:"Called RN Park at Cascade View, 1:15 PM",ins:"Monitor laceration for signs of infection. Neuro checks q4h x24h. Recheck INR in 3 days. Fall precautions. No Warfarin tonight or tomorrow. Resume 2mg on day 3. Return if increased confusion, vomiting, or new bleeding.",dr:"Dr. Maria Santos, MD",time:"March 20, 2026 at 1:20 PM"},
  },
  {
    id:3, name:"James Martinez", short:"James Martinez", init:"JM",
    room:112, dob:"11/30/1941", age:84, lang:"Spanish", flag:"🇲🇽",
    contact:"Maria Martinez", contactRel:"Wife", contactPh:"(206) 555-0467",
    fac:"Cascade View Assisted Living", facAddr:"4200 Evergreen Way, Everett, WA 98201", facPh:"(425) 555-0312",
    code:"Full Code", codeType:"full", polst:false,
    allergy:["NSAIDs","ACE inhibitors"],
    hx:["COPD","Prior MI (2021)","CHF (EF 35%)","Anxiety","GERD"],
    meds:[{n:"Carvedilol 12.5mg",f:"BID",t:"Cardiac"},{n:"Entresto 49/51mg",f:"BID",t:"Cardiac"},{n:"Spironolactone 25mg",f:"Daily",t:"Cardiac"},{n:"Tiotropium",f:"Daily",t:"Respiratory"},{n:"Lorazepam 0.5mg",f:"PRN",t:"Psych"},{n:"Pantoprazole 40mg",f:"Daily",t:"GI"}],
    mLvl:1, fLvl:2, dev:["O2 at 1 L/min","Daily weights","Telemetry-ready"], risks:["Falls","Fluid overload","Anxiety episodes"], iso:"None",
    belongings: ["Rosary", "Phone"],
    vitalsHistory: [
      { time: "10:00", bp: "158/92", hr: 102, sp: 91 },
      { time: "16:00", bp: "168/96", hr: 110, sp: 89 }
    ],
    comfort:{light:"Keeps TV on for background noise, especially sports",comm:"Bilingual (Spanish/English). Prefers Spanish when anxious. Wife translates when needed.",fam:"Wife Maria visits daily, brings home-cooked meals. Large extended family visits weekends.",cult:"Catholic faith. Rosary at bedside. Priest visits weekly. Family brings traditional Mexican food.",dist:"Anxiety escalates with chest sensations. Lorazepam PRN helps. Wife's presence is most effective."},
    tx:{reason:"Acute onset chest pain radiating to left arm, diaphoretic, new 3+ pitting edema bilateral lower extremities, weight up 6 lbs in 3 days",symp:["Chest Pain"],intv:"O2 increased to 3 L/min, elevated HOB, obtained vitals, placed on facility pulse ox monitoring, called 911",chg:"Progressive dyspnea on exertion x4 days, sleeping upright x2 nights, decreased urine output, missed Entresto dose x2 days (nausea)",dest:"Providence Regional Medical Center, Everett",time:"March 20, 2026 at 4:22 PM",nurse:"RN Sarah Mitchell", belongingsSent: ["Rosary"]},
    er:{dx:"Acute decompensated heart failure (CHF exacerbation), troponin negative",bp:"168/96",hr:"110",rr:"26",sp:"89% on 3L",rx:"IV Lasix 40mg in ED, resume Entresto. Add Metolazone 2.5mg PRN. Strict I&Os.",rpt:"Called RN Mitchell at Cascade View, 10:45 PM",ins:"Daily weights (call if >2 lb gain). Strict 1.5L fluid restriction. Low sodium diet. Monitor for worsening dyspnea. Follow up with cardiology within 3 days. Return immediately for chest pain, worsening SOB, or weight gain >3 lbs.",dr:"Dr. James Park, MD",time:"March 20, 2026 at 10:50 PM"},
  },
];

export const ALL_BELONGINGS = ["Hearing Aid (Left)", "Hearing Aid (Right)", "Glasses", "Dentures (Upper)", "Dentures (Lower)", "Walking Stick", "Wheelchair", "Personal Bag", "Phone", "Wallet/ID", "Rosary"];

export const NEW_PT_TEMPLATE = {
  name:"", short:"", init:"",
  room:"", dob:"", age:"", lang:"English", flag:"🇺🇸",
  contact:"", contactRel:"", contactPh:"",
  fac:"Cascade View Assisted Living", facAddr:"4200 Evergreen Way, Everett, WA 98201", facPh:"(425) 555-0312",
  code:"Full Code", codeType:"full", polst:false,
  allergy:[],
  hx:[],
  meds:[],
  mLvl:1, fLvl:1, dev:[], risks:[], iso:"None",
  belongings: [],
  vitalsHistory: [],
  comfort:{light:"",comm:"",fam:"",cult:"",dist:""},
  tx:{reason:"",symp:[],intv:"",chg:"",dest:"",time:"",nurse:"", belongingsSent: []},
  er:{dx:"",bp:"",hr:"",rr:"",sp:"",rx:"",rpt:"",ins:"",dr:"",time:""},
};

export const PERSONAS = [
  {name:"Sarah Mitchell", role:"RN / LVN", shift:"Day (7a-7p)"},
  {name:"David Park", role:"RN / LVN", shift:"Night (7p-7a)"},
  {name:"Dr. Angela Kim", role:"MD / NP", shift:"Day (7a-7p)"},
  {name:"Teresa Morales", role:"Charge Nurse", shift:"Day (7a-7p)"},
  {name:"Mark Johnson", role:"Administrator", shift:"Day (7a-7p)"},
];

export const DEMO_SCREEN_MAP = [
  {screen:0, title:"Welcome to TransferLink", desc:"Home screen with role-based entry points"},
  {screen:15, title:"Login & Onboarding", desc:"Facility staff signs in and sees workflow overview"},
  {screen:17, title:"Facility Dashboard", desc:"Active alerts, transfer stats, and follow-ups"},
  {screen:1, title:"Patient Roster", desc:"View all residents at Cascade View"},
  {screen:2, title:"Patient Record", desc:"Full clinical record for Maggie Tanaka"},
  {screen:3, title:"Initiate Transfer", desc:"Nurse documents reason, symptoms, interventions"},
  {screen:4, title:"Confirm Transfer", desc:"Review all data before generating QR"},
  {screen:5, title:"QR Code Ready", desc:"Scannable code for EMS crew"},
  {screen:7, title:"EMS Scans QR", desc:"EMS crew scans code on arrival"},
  {screen:8, title:"EMS Transport View", desc:"EMS sees full record with comfort preferences"},
  {screen:9, title:"ED Scans QR", desc:"ED staff scans code on arrival"},
  {screen:10, title:"ED Full Record", desc:"ED sees complete transfer data and history"},
  {screen:11, title:"ED Return Documentation", desc:"ED staff documents diagnosis and discharge plan"},
  {screen:12, title:"Record Updated", desc:"Confirmation that facility has been notified"},
  {screen:13, title:"Facility Receives Update", desc:"Nurse sees ED return info on patient record"},
  {screen:14, title:"Full Timeline", desc:"Complete audit trail of every handoff event"},
];
