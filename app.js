/* DigitalNepal – app logic (data kept in browser localStorage for this demo) */
const $=(s,r=document)=>r.querySelector(s);
const ls=(k,v)=>v===undefined?JSON.parse(localStorage.getItem(k)||"null"):localStorage.setItem(k,JSON.stringify(v));
let db=ls("dn_db")||JSON.parse(JSON.stringify(SEED));const save=()=>ls("dn_db",db);
let lang=localStorage.dn_lang||"en",user=JSON.parse(sessionStorage.dn_user||"null"),page="dash";
const t=k=>I18N[lang][k]||I18N.en[k]||k;
const iso=d=>d.toISOString().slice(0,10),todayS=()=>iso(new Date());
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const pick=(o,f)=>(lang==="ne"?o[f+"Ne"]||o[f+"En"]:o[f+"En"]||o[f+"Ne"])||"";
const dept=k=>DEPTS.find(d=>d.k===k)||{en:k,ne:k};const dn=k=>dept(k)[lang];
const emp=id=>db.emps.find(e=>e.id===id);const isAdmin=()=>user&&user.role==="admin";
const av=(e,c="")=>e.photo?`<img class="av ${c}" src="${e.photo}" alt="">`:`<span class="av ${c}">${esc((e.nameEn||e.nameNe||"?")[0])}</span>`;
const stTag=s=>`<span class="tag ${s==="active"?"g":s==="retired"?"r":"y"}">${t("st_"+s)}</span>`;
const lvTag=s=>`<span class="tag ${s==="approved"?"g":s==="rejected"?"r":"y"}">${t("lst_"+s)}</span>`;
const onLeave=e=>db.leaves.some(l=>l.emp===e.id&&l.status==="approved"&&l.from<=todayS()&&l.to>=todayS());

/* language */
function applyLang(){document.documentElement.lang=lang;document.body.classList.toggle("ne",lang==="ne");
 document.querySelectorAll("[data-i]").forEach(n=>n.textContent=t(n.dataset.i));
 document.querySelectorAll("[data-ph]").forEach(n=>n.placeholder=t(n.dataset.ph));
 document.querySelectorAll("[data-lang]").forEach(b=>b.classList.toggle("on",b.dataset.lang===lang));
 if(user)render()}
document.querySelectorAll("[data-lang]").forEach(b=>b.onclick=()=>{lang=b.dataset.lang;localStorage.dn_lang=lang;applyLang()});

/* auth */

/* Authentication */
let toastTimer;

function showAuthToast(message, type) {
  const toast = $("#authToast");

  clearTimeout(toastTimer);

  toast.textContent = message;
  toast.className = `auth-toast ${type} show`;

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

$("#loginForm").onsubmit = (e) => {
  e.preventDefault();

  const u = $("#lu").value.trim();
  const p = $("#lp").value;

  let loggedInUser = null;

  if (u === "admin" && p === "admin123") {
    loggedInUser = {
      role: "admin",
      id: "admin",
      name: "Administrator"
    };
  } else {
    const employee = db.emps.find(
      x => x.id.toLowerCase() === u.toLowerCase()
    );

    if (employee && p === "emp123") {
      loggedInUser = {
        role: "emp",
        id: employee.id,
        name: employee.nameEn
      };
    }
  }

  // Invalid credentials: remain on the login screen.
  if (!loggedInUser) {
    user = null;
    $("#lerr").textContent = t("bad");
    return;
  }

  // Successful login.
  user = loggedInUser;
  sessionStorage.dn_user = JSON.stringify(user);
  page = isAdmin() ? "dash" : "me";

  boot();

  showAuthToast("Logged in successfully!", "success");
};

$("#logout").onclick = () => {
  sessionStorage.removeItem("dn_user");
  user = null;
  page = "dash";

  // Hide the dashboard and restore the original login screen.
  boot();

  $("#loginForm").reset();

  showAuthToast("Logged out successfully!", "error");
};

function boot() {
  $("#login").hidden = !!user;
  $("#app").hidden = !user;
  $("#logout").hidden = !user;
  $("#lerr").textContent = "";

  if (user) {
    render();
  }
}

// Restore the correct screen when the page loads.
boot();


/* shell */
function render(){const tabs=isAdmin()?["dash","dir","att","leave","rep"]:["me","att","leave"];
 $("#nav").innerHTML=`<div class="who">${t("welcome")}, ${esc(user.name)}</div>`+tabs.map(k=>`<button data-act="go" data-k="${k}" class="${k===page?"on":""}">${t(k)}</button>`).join("");
 $("#view").innerHTML=({dash:vDash,dir:vDir,att:vAtt,leave:vLeave,rep:vRep,me:vMe})[page]()}
document.addEventListener("click",ev=>{const b=ev.target.closest("[data-act]");if(!b)return;const a=b.dataset.act,d=b.dataset;
 ({go:()=>{page=d.k;render()},open:()=>openEmp(d.id),add:()=>empForm(),edit:()=>empForm(d.id),
 del:()=>{if(confirm(t("confirmDel"))){db.emps=db.emps.filter(e=>e.id!==d.id);save();closeM();render()}},
 hist:()=>histForm(d.id),close:closeM,cin:()=>mark("in"),cout:()=>mark("out"),
 lv:()=>leaveForm(),dec:()=>{db.leaves.find(l=>l.id==d.id).status=d.v;save();render()},
 print:()=>window.print(),printp:printPreeti,csv:exportCSV})[a]?.()});
function modal(h){$("#sheet").innerHTML=h;$("#modal").hidden=false}function closeM(){$("#modal").hidden=true}
$("#modal").onclick=e=>{if(e.target.id==="modal")closeM()};

/* views */
function vDash(){const A=db.emps.filter(e=>e.status==="active");
 const s=[["total",db.emps.length],["active",A.length],["retired",db.emps.filter(e=>e.status==="retired").length],["onLeave",A.filter(onLeave).length],["pending",db.leaves.filter(l=>l.status==="pending").length]];
 return `<h2>${t("dash")}</h2><div class="grid">${s.map(([k,v])=>`<div class="card stat"><b>${v}</b>${t(k)}</div>`).join("")}</div>
 <h3 style="margin-top:2rem">${t("transfers")}</h3>${histTable(5)}`}
function histTable(n){const r=db.emps.flatMap(e=>e.hist.map(h=>({e,h}))).filter(x=>x.h.type!=="appointment").sort((a,b)=>b.h.date.localeCompare(a.h.date)).slice(0,n);
 return r.length?`<div class="scroll"><table><tr><th>${t("date")}</th><th>${t("name")}</th><th>${t("type")}</th><th>${t("note")}</th></tr>${r.map(({e,h})=>`<tr><td>${h.date}</td><td>${esc(pick(e,"name"))}</td><td>${t(h.type)}</td><td>${esc(h.note)}</td></tr>`).join("")}</table></div>`:`<p class="muted">${t("noneYet")}</p>`}
let q="",qd="";
function vDir(){const L=filt();return `<h2>${t("dir")}</h2><div class="row"><input class="grow" id="q" value="${esc(q)}" placeholder="${t("search")}" aria-label="${t("search")}">
 <select id="qd" style="width:auto"><option value="">${t("allDept")}</option>${DEPTS.map(d=>`<option value="${d.k}" ${qd===d.k?"selected":""}>${d[lang]}</option>`).join("")}</select>
 <button class="primary" data-act="add">+ ${t("add")}</button></div><div class="grid" id="list">${cards(L)}</div>`}
const filt=()=>db.emps.filter(e=>(!qd||e.dept===qd)&&(`${e.id} ${e.nameEn} ${e.nameNe}`.toLowerCase().includes(q.toLowerCase())));
const cards=L=>L.map(e=>`<button class="person" data-act="open" data-id="${e.id}">${av(e)}<span><b>${esc(pick(e,"name"))}</b><br><small class="muted">${esc(pick(e,"desig"))} · ${dn(e.dept)}</small><br>${stTag(e.status)}</span></button>`).join("")||`<p class="muted">${t("noneYet")}</p>`;
document.addEventListener("input",e=>{if(e.target.id==="q"){q=e.target.value;$("#list").innerHTML=cards(filt())}});
document.addEventListener("change",e=>{if(e.target.id==="qd"){qd=e.target.value;$("#list").innerHTML=cards(filt())}});
function openEmp(id){const e=emp(id);if(!e)return;
 modal(`<div class="row">${av(e,"lg")}<div><h2 style="margin:0">${esc(pick(e,"name"))}</h2><p class="muted" style="margin:0">${esc(e.nameEn)} · ${esc(e.nameNe)}</p>${stTag(e.status)}</div></div>
 <div class="cols"><p><b>${t("empId")}</b><br>${e.id}</p><p><b>${t("desigEn")}</b><br>${esc(pick(e,"desig"))}</p><p><b>${t("dept")}</b><br>${dn(e.dept)}</p><p><b>${t("phone")}</b><br>${esc(e.phone)}</p><p><b>${t("email")}</b><br>${esc(e.email)}</p><p><b>${t("qual")}</b><br>${esc(e.qual)}</p><p><b>${t("joined")}</b><br>${e.joined}</p><p><b>${t("dob")}</b><br>${e.dob}</p></div>
 <h3>${t("history")}</h3><div class="tl">${[...e.hist].sort((a,b)=>b.date.localeCompare(a.date)).map(h=>`<p><span class="tag">${t(h.type)}</span> ${h.date}<br>${esc(h.note)}</p>`).join("")}</div>
 <div class="row" style="margin-top:1rem">${isAdmin()?`<button class="primary" data-act="edit" data-id="${id}">${t("edit")}</button><button class="ghost" data-act="hist" data-id="${id}">${t("addHist")}</button><button class="danger" data-act="del" data-id="${id}">${t("del")}</button>`:""}<button class="ghost" data-act="close">${t("close")}</button></div>`)}
const fld=(k,v="",type="text",extra="")=>`<label>${t(k)}<input name="${k}" type="${type}" value="${esc(v)}" ${extra}></label>`;
const deptSel=v=>`<select name="dept">${DEPTS.map(d=>`<option value="${d.k}" ${d.k===v?"selected":""}>${d[lang]}</option>`).join("")}</select>`;
function empForm(id){const e=id?emp(id):{id:"EMP-"+String(db.emps.length+1).padStart(3,"0"),status:"active",dept:"adm"};
 modal(`<h2>${t(id?"edit":"add")}</h2><form id="ef"><div class="cols">${fld("nameEn",e.nameEn,"text",'lang="en" required')}${fld("nameNe",e.nameNe,"text",'lang="ne" required')}${fld("empId",e.id,"text",id?"readonly":"required")}
 <label>${t("dept")}${deptSel(e.dept)}</label>${fld("desigEn",e.desigEn,"text",'lang="en"')}${fld("desigNe",e.desigNe,"text",'lang="ne"')}${fld("phone",e.phone)}${fld("email",e.email,"email")}${fld("qual",e.qual)}${fld("joined",e.joined,"date")}${fld("dob",e.dob,"date")}
 <label>${t("status")}<select name="status">${["active","retired","transferred"].map(s=>`<option value="${s}" ${s===e.status?"selected":""}>${t("st_"+s)}</option>`).join("")}</select></label></div>
 <label>${t("photo")}<input name="photo" type="file" accept="image/*"></label>
 <div class="row"><button class="primary">${t("save")}</button><button type="button" class="ghost" data-act="close">${t("cancel")}</button></div></form>`);
 $("#ef").onsubmit=async ev=>{ev.preventDefault();const f=new FormData(ev.target),g=k=>f.get(k).trim();
  let photo=e.photo||"",file=f.get("photo");if(file&&file.size)photo=await new Promise(r=>{const fr=new FileReader();fr.onload=()=>r(fr.result);fr.readAsDataURL(file)});
  const o={id:g("empId"),nameEn:g("nameEn"),nameNe:g("nameNe"),desigEn:g("desigEn"),desigNe:g("desigNe"),dept:f.get("dept"),phone:g("phone"),email:g("email"),qual:g("qual"),joined:f.get("joined"),dob:f.get("dob"),status:f.get("status"),photo};
  if(id)Object.assign(e,o);else{if(emp(o.id))return alert("ID exists");o.hist=[{type:"appointment",date:o.joined||todayS(),note:dn(o.dept)}];db.emps.push(o)}
  save();closeM();render()}}
function histForm(id){const e=emp(id);modal(`<h2>${t("addHist")}</h2><form id="hf"><label>${t("type")}<select name="type"><option value="transfer">${t("transfer")}</option><option value="promotion">${t("promotion")}</option></select></label>
 ${fld("date",todayS(),"date","required")}<label>${t("newDept")}${deptSel(e.dept)}</label><div class="cols">${fld("desigEn","","text",'lang="en" placeholder="'+t("newDesig")+'"')}${fld("desigNe","","text",'lang="ne" placeholder="'+t("newDesig")+'"')}</div>${fld("note","","text","required")}
 <div class="row"><button class="primary">${t("save")}</button><button type="button" class="ghost" data-act="close">${t("cancel")}</button></div></form>`);
 $("#hf").onsubmit=ev=>{ev.preventDefault();const f=new FormData(ev.target);
  if(f.get("dept")!==e.dept)e.dept=f.get("dept");if(f.get("desigEn").trim())e.desigEn=f.get("desigEn").trim();if(f.get("desigNe").trim())e.desigNe=f.get("desigNe").trim();
  e.hist.push({type:f.get("type"),date:f.get("date"),note:f.get("note").trim()});save();closeM();render()}}
function vMe(){const e=emp(user.id);return `<h2>${t("me")}</h2><div class="card"><div class="row">${av(e,"lg")}<div><h3 style="margin:0">${esc(pick(e,"name"))}</h3>${esc(pick(e,"desig"))} · ${dn(e.dept)}<br>${stTag(e.status)}</div></div><button class="ghost" data-act="open" data-id="${e.id}">${t("history")}</button></div>`}

/* attendance */
function mark(w){const d=todayS();let r=db.att.find(a=>a.emp===user.id&&a.date===d);if(!r){r={emp:user.id,date:d,in:"",out:""};db.att.push(r)}
 r[w]=new Date().toTimeString().slice(0,5);save();render()}
function vAtt(){const d=todayS();
 if(!isAdmin()){const r=db.att.filter(a=>a.emp===user.id).sort((a,b)=>b.date.localeCompare(a.date));
  return `<h2>${t("att")}</h2><div class="row"><button class="primary" data-act="cin">${t("checkIn")}</button><button class="ghost" data-act="cout">${t("checkOut")}</button></div>${attTable(r.map(a=>[a.date,"",a.in,a.out,"present"]),false)}`}
 const rows=db.emps.filter(e=>e.status==="active").map(e=>{const a=db.att.find(x=>x.emp===e.id&&x.date===d);return [d,pick(e,"name"),a?.in||"",a?.out||"",a?"present":onLeave(e)?"onl":"absent"]});
 return `<h2>${t("att")} · ${t("today")} (${d})</h2>${attTable(rows,true)}`}
function attTable(r,n){return `<div class="scroll"><table><tr><th>${t("date")}</th>${n?`<th>${t("name")}</th>`:""}<th>${t("in")}</th><th>${t("out")}</th><th>${t("status")}</th></tr>${r.map(x=>`<tr><td>${x[0]}</td>${n?`<td>${esc(x[1])}</td>`:""}<td>${x[2]||"–"}</td><td>${x[3]||"–"}</td><td><span class="tag ${x[4]==="present"?"g":x[4]==="onl"?"y":"r"}">${t(x[4])}</span></td></tr>`).join("")}</table></div>`}

/* leave */
function vLeave(){const L=db.leaves.filter(l=>isAdmin()||l.emp===user.id).sort((a,b)=>b.id-a.id);
 return `<h2>${t("leave")}</h2>${isAdmin()?"":`<div class="row"><button class="primary" data-act="lv">+ ${t("reqLeave")}</button></div>`}${L.length?`<div class="scroll"><table><tr>${isAdmin()?`<th>${t("name")}</th>`:""}<th>${t("ltype")}</th><th>${t("from")}</th><th>${t("to")}</th><th>${t("reason")}</th><th>${t("status")}</th>${isAdmin()?`<th>${t("action")}</th>`:""}</tr>${L.map(l=>`<tr>${isAdmin()?`<td>${esc(pick(emp(l.emp)||{},"name"))}</td>`:""}<td>${t(l.type)}</td><td>${l.from}</td><td>${l.to}</td><td>${esc(l.reason)}</td><td>${lvTag(l.status)}</td>${isAdmin()?`<td>${l.status==="pending"?`<button class="ok sm" data-act="dec" data-id="${l.id}" data-v="approved">${t("approve")}</button> <button class="danger sm" data-act="dec" data-id="${l.id}" data-v="rejected">${t("reject")}</button>`:"–"}</td>`:""}</tr>`).join("")}</table></div>`:`<p class="muted">${t("noneYet")}</p>`}`}
function leaveForm(){modal(`<h2>${t("reqLeave")}</h2><form id="lf"><label>${t("ltype")}<select name="type">${["sick","home","casual","mat"].map(k=>`<option value="${k}">${t(k)}</option>`).join("")}</select></label>
 <div class="cols">${fld("from",todayS(),"date","required")}${fld("to",todayS(),"date","required")}</div><label>${t("reason")}<textarea name="reason" rows="3" required></textarea></label>
 <div class="row"><button class="primary">${t("reqLeave")}</button><button type="button" class="ghost" data-act="close">${t("cancel")}</button></div></form>`);
 $("#lf").onsubmit=ev=>{ev.preventDefault();const f=Object.fromEntries(new FormData(ev.target));if(f.to<f.from)return alert(t("to")+" < "+t("from"));
  db.leaves.push({id:Date.now(),emp:user.id,...f,status:"pending"});save();closeM();render()}}

/* reports */
const retireDate=e=>{const d=new Date(e.dob);d.setFullYear(d.getFullYear()+58);return d};
function repData(){return DEPTS.map(d=>{const f=db.emps.filter(e=>e.dept===d.k&&e.status==="active").length;return {d,f,v:Math.max(0,d.posts-f)}})}
function vRep(){const R=repData(),lim=new Date();lim.setFullYear(lim.getFullYear()+2);
 const rs=db.emps.filter(e=>e.status==="active"&&retireDate(e)<=lim);
 return `<h2>${t("rep")}</h2><div class="row no-print"><button class="primary" data-act="print">${t("print")}</button><button class="ghost" data-act="printp">${t("printP")}</button><button class="ghost" data-act="csv">${t("csv")}</button></div><p class="muted no-print">${t("preetiHelp")}</p>
 <div class="scroll"><table><tr><th>${t("dept")}</th><th>${t("sanctioned")}</th><th>${t("filled")}</th><th>${t("vacant")}</th><th></th></tr>${R.map(x=>`<tr><td>${x.d[lang]}</td><td>${x.d.posts}</td><td>${x.f}</td><td>${x.v?`<span class="tag r">${x.v}</span>`:0}</td><td><div class="bar"><i style="width:${Math.min(100,x.f/x.d.posts*100)}%"></i></div></td></tr>`).join("")}</table></div>
 <h3 style="margin-top:1.5rem">${t("retireSoon")}</h3>${rs.length?`<ul>${rs.map(e=>`<li>${esc(pick(e,"name"))} — ${iso(retireDate(e))}</li>`).join("")}</ul>`:`<p class="muted">${t("noneYet")}</p>`}
 <h3>${t("transfers")}</h3>${histTable(20)}`}
function exportCSV(){const rows=[["ID","Name EN","Name NE","Designation EN","Designation NE","Department","Phone","Email","Status"],...db.emps.map(e=>[e.id,e.nameEn,e.nameNe,e.desigEn,e.desigNe,dept(e.dept).en,e.phone,e.email,e.status])];
 const a=document.createElement("a");a.href=URL.createObjectURL(new Blob(["\ufeff"+rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(",")).join("\n")],{type:"text/csv"}));a.download="digitalnepal-employees.csv";a.click()}
function printPreeti(){const v=$("#view"),w=document.createTreeWalker(v,NodeFilter.SHOW_TEXT),L=[];let n;
 while(n=w.nextNode())if(/[\u0900-\u097F]/.test(n.nodeValue))L.push([n,n.nodeValue]);
 L.forEach(([n,s])=>n.nodeValue=toPreeti(s));document.body.classList.add("preeti");window.print();
 document.body.classList.remove("preeti");L.forEach(([n,s])=>n.nodeValue=s)}


