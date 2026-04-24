import React, { useState, useEffect } from 'react';

// ===== DESIGN TOKENS =====
export const C = {
  navy:"#0F1D2F", navyL:"#1a2d42", accent:"#1B9AAA", accentD:"#168a99",
  accentG:"rgba(27,154,170,0.20)", amber:"#F4A261", amberD:"#E08A3A",
  red:"#E63946", green:"#2A9D8F", greenD:"#228B7E", purple:"#7C4DFF",
  bg:"#F0F2F5", card:"#FFF", dis:"#9E9E9E",
  lA:"#E8F6F8", lR:"#FDEAEA", lW:"#FFF3E0", lG:"#E6F5F0", lP:"#EDE7F6",
  bdr:"#E0E4EA", tx:"#1a1a2e", txS:"#5A6678", txT:"#8E99A8",
};

// ===== SVG ICONS =====
export const Chev=()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>;
export const Chk=({s=14,c="#fff"})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>;
export const DnA=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.txS} strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>;
export const WarnIco=()=><svg width="18" height="18" viewBox="0 0 24 24" fill={C.red}><path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6zm-1 5v4h2v-4h-2zm0 6v2h2v-2h-2z"/></svg>;
export const PlusIco=()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>;
export const BellIco=({n})=><div style={{position:"relative",cursor:"pointer"}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>{n>0&&<span style={{position:"absolute",top:-4,right:-6,background:C.red,color:"#fff",fontSize:9,fontWeight:800,borderRadius:10,padding:"1px 5px",minWidth:16,textAlign:"center"}}>{n}</span>}</div>;

// ===== HELPER TO ADD A11Y TO CLICKABLE DIVS =====
export const getA11yProps = (onClick) => onClick ? {
  role: "button",
  tabIndex: 0,
  onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e); } }
} : {};

// ===== QR CODE (Optimization 1: Memoize) =====
export const QR = React.memo(({sz=200})=>{const g=25,cs=sz/g,cells=[];const sd=[1,0,1,1,0,0,1,0,1,1,1,0,0,1,0,1,1,0,1,0,0,1,1,0,1];for(let r=0;r<g;r++)for(let c=0;c<g;c++){const inF=(r<7&&c<7)||(r<7&&c>=g-7)||(r>=g-7&&c<7);if(inF){const cr=r<7?r:r-(g-7),cc=c<7?c:c-(g-7);if([0,2,3].includes(Math.max(Math.abs(cr-3),Math.abs(cc-3))))cells.push(<rect key={r+"-"+c} x={c*cs} y={r*cs} width={cs} height={cs} fill={C.navy} rx={1}/>);}else if(((r*31+c*17+sd[(r+c)%sd.length])*2654435761>>>0)%3!==0)cells.push(<rect key={r+"-"+c} x={c*cs} y={r*cs} width={cs} height={cs} fill={C.navy} rx={.5}/>);}return <svg width={sz} height={sz} viewBox={`0 0 ${sz} ${sz}`} style={{borderRadius:8}}><rect width={sz} height={sz} fill="#fff" rx={8}/>{cells}</svg>;});

// ===== PRIMITIVE COMPONENTS (Optimization 1: Memoize highly used components, Optimization 7: a11y) =====
export const Bg=({ch,bg,color="#fff",pulse,style:s,onClick})=><span onClick={onClick} {...getA11yProps(onClick)} style={{display:"inline-flex",alignItems:"center",padding:"5px 12px",borderRadius:20,fontSize:12,fontWeight:700,color,background:bg||C.accent,whiteSpace:"nowrap",animation:pulse?"bp 2s ease infinite":"none",cursor:onClick?"pointer":"default",...s}}>{ch}</span>;
export const Av=({sz=48,init="MT"})=><div style={{width:sz,height:sz,borderRadius:sz/2,background:`linear-gradient(135deg,${C.accent},${C.accentD})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:sz*.36,flexShrink:0,boxShadow:`0 2px 8px ${C.accentG}`}}>{init}</div>;
export const Cd=React.memo(({ch,hl,style:s,m,onClick})=><div onClick={onClick} {...getA11yProps(onClick)} className={onClick ? "card-hover" : ""} style={{background:hl||C.card,borderRadius:16,padding:m?"14px":"18px 20px",marginBottom:m?10:14,border:`1px solid ${hl?"transparent":C.bdr}`,boxShadow:"0 1px 3px rgba(15,29,47,.04),0 4px 12px rgba(15,29,47,.03)",cursor:onClick?"pointer":"default",transition:"all .2s",...s}}>{ch}</div>);
export const Bt=React.memo(({ch,onClick,bg=C.accent,full,outline,style:s,m,disabled})=><button disabled={disabled} onClick={onClick} className={!disabled ? "hover-scale" : ""} style={{display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,padding:m?"14px 16px":"14px 28px",borderRadius:12,fontSize:m?14:15,fontWeight:600,cursor:disabled?"not-allowed":"pointer",border:outline?`2px solid ${bg}`:"none",color:outline?bg:"#fff",background:outline?"transparent":disabled?C.dis:bg,width:full?"100%":"auto",minHeight:48,transition:"all .15s",opacity:disabled?.5:1,fontFamily:"inherit",...s}}>{ch}</button>);
export const SL=({ch,ic})=><div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1.2,color:C.txS,marginBottom:10,display:"flex",alignItems:"center",gap:6}}>{ic&&<span style={{fontSize:14}}>{ic}</span>}{ch}</div>;
export const TB=({left,ctr,right,m,accent})=><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:m?"12px 14px":"14px 20px",background:`linear-gradient(135deg,${C.navy},${C.navyL})`,color:"#fff",position:"sticky",top:0,zIndex:10,minHeight:52,borderBottom:accent?`3px solid ${accent}`:"none"}}><div style={{flex:1,display:"flex",alignItems:"center"}}>{left}</div><div style={{flex:2,textAlign:"center",fontWeight:700,fontSize:m?13:15,letterSpacing:-.2}}>{ctr}</div><div style={{flex:1,display:"flex",justifyContent:"flex-end",alignItems:"center",gap:8}}>{right||null}</div></div>;
export const Bk=({go,to,label="Back"})=><button aria-label={label} onClick={()=>go(to)} className="hover-scale" style={{cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:14,opacity:.9,minHeight:44,minWidth:44,color:"#fff",background:"none",border:"none",padding:0,fontFamily:"inherit"}}><Chev/>{label}</button>;
export const FR=({l,v,hl})=><div style={{marginBottom:8,...(hl?{background:C.lA,padding:"6px 10px",borderRadius:8,margin:"0 -4px 8px"}:{})}}><span style={{fontSize:11,fontWeight:700,color:C.txS,textTransform:"uppercase",letterSpacing:.8}}>{l}</span><div style={{fontSize:14,color:C.tx,marginTop:1}}>{v}</div></div>;
export const Chips=({items,bg=C.lA,color=C.tx})=><div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:4}}>{items.map((t,i)=><Bg key={i} ch={t} bg={bg} color={color} style={{fontSize:12,fontWeight:600}}/>)}</div>;

// ===== TXIN (Optimization 2: Debounce/Local State) =====
export const TxIn = ({ value, onChange, placeholder, rows }) => {
  const [local, setLocal] = useState(value || '');
  useEffect(() => { setLocal(value || ''); }, [value]);
  const handleBlur = () => { if (local !== value) onChange(local); };
  const hKeyDown = (e) => { if (e.key === 'Enter' && !rows) handleBlur(); };

  const style = { width: "100%", padding: "10px 14px", borderRadius: 10, border: `1px solid ${C.bdr}`, fontSize: 14, color: C.tx, background: "#F8F9FB", boxSizing: "border-box", fontFamily: "inherit" };
  if (rows) return <textarea value={local} onChange={e => setLocal(e.target.value)} onBlur={handleBlur} placeholder={placeholder} rows={rows} style={{ ...style, resize: "vertical" }} />;
  return <input value={local} onChange={e => setLocal(e.target.value)} onBlur={handleBlur} onKeyDown={hKeyDown} placeholder={placeholder} style={style} />;
};

// ===== MEDICATION SOURCE BADGE =====
export const MedSourceBadge = ({ src, compact, onClick }) => {
  if (!src) return (
    <span onClick={onClick} {...getA11yProps(onClick)} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 16, background: C.lW, color: C.amberD, fontSize: 11, fontWeight: 700, border: `1px dashed ${C.amber}`, cursor: onClick ? "pointer" : "default" }}>
      <span>📎</span>{compact ? "Attach meds" : "No medication source · attach or import"}
    </span>
  );
  const icons = { pdf: "📄", photo: "📷", pcc_import: "🏥", epic: "🩺", manual: "✍️", csv: "📊" };
  const verified = !!src.verified;
  const style = {
    display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 16,
    fontSize: 11, fontWeight: 700,
    background: verified ? "#E6F7FA" : C.lW,
    color: verified ? C.accentD : C.amberD,
    border: `1px solid ${verified ? C.accent + "40" : C.amber + "60"}`,
    cursor: onClick ? "pointer" : "default",
  };
  const status = verified ? "verified at transfer" : "unverified";
  const shortStatus = verified ? "verified" : "unverified";
  return (
    <span onClick={onClick} {...getA11yProps(onClick)} style={style}>
      <span>{icons[src.method] || "📎"}</span>
      {compact ? `${src.count} meds · ${shortStatus}` : `${src.label} · ${src.count} meds · ${status}`}
    </span>
  );
};

// ===== NOTIFICATION STATES (closed-loop return) =====
export const ReturnStates = ({ er, m }) => {
  const states = [
    { k: "submittedAt", label: "ED submitted return packet", ic: "📤", ts: er?.submittedAt },
    { k: "notifiedAt", label: "Facility notified", ic: "🔔", ts: er?.notifiedAt },
    { k: "ackedAt", label: er?.ackedBy ? `Acknowledged by ${er.ackedBy}` : "Awaiting nurse acknowledgement", ic: "✅", ts: er?.ackedAt },
    { k: "closedAt", label: "Return record closed", ic: "📁", ts: er?.closedAt },
  ];
  return (
    <div style={{ background: "#fff", border: `1px solid ${C.bdr}`, borderRadius: 12, padding: m ? 10 : 14 }}>
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: C.txS, marginBottom: 10 }}>Return Delivery States</div>
      {states.map((s, i) => {
        const done = !!s.ts;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: i < states.length - 1 ? `1px dashed ${C.bdr}` : "none" }}>
            <div style={{ width: 26, height: 26, borderRadius: 13, background: done ? C.green : "#F0F2F5", color: done ? "#fff" : C.txT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>
              {done ? <Chk s={12} /> : i + 1}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: done ? C.tx : C.txT }}>{s.ic} {s.label}</div>
              <div style={{ fontSize: 10, color: C.txT }}>{done ? s.ts : "Pending"}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ===== PROGRESS METER (used in 5-minute mode) =====
export const ProgressMeter = ({ pct, est, label, c = C.accent }) => (
  <div style={{ background: "#fff", border: `1px solid ${C.bdr}`, borderRadius: 12, padding: "10px 14px", marginBottom: 12 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
      <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: .8, color: C.txS }}>{label || "Transfer Progress"}</span>
      <span style={{ fontSize: 11, fontWeight: 700, color: c }}>{est || `${Math.round(pct)}%`}</span>
    </div>
    <div style={{ height: 6, background: "#F0F2F5", borderRadius: 3, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${Math.max(4, Math.min(100, pct))}%`, background: `linear-gradient(90deg,${c},${C.accentD})`, borderRadius: 3, transition: "width .3s" }} />
    </div>
  </div>
);

// ===== SECTION HEADING (semantic, consistent spacing) =====
export const SecH = ({ title, kicker, m }) => (
  <div style={{ marginTop: m ? 18 : 22, marginBottom: m ? 8 : 10 }}>
    {kicker && <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: C.accent, marginBottom: 4 }}>{kicker}</div>}
    <div style={{ fontSize: m ? 15 : 17, fontWeight: 800, color: C.navy, letterSpacing: -.2 }}>{title}</div>
  </div>
);
