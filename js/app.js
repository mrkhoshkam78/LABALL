(() => {
'use strict';

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

let category = 'physics';
let expId = 'kinematics';
let vals = {};
let lang = 'fa';
let theme = 'ocean';
let selectedElement = null;
let reactA = null, reactB = null;
let animId = null;
let animTime = 0;
let canvas, ctx;

function t(key) { return STR[lang][key] || key; }
function expName(exp) { return lang === 'fa' ? exp.nameFa : exp.nameEn; }
function catTitle(cat) { return lang === 'fa' ? cat.titleFa : cat.titleEn; }

function init() {
  canvas = $('#scene');
  ctx = canvas.getContext('2d');
  loadPrefs();
  applyTheme();
  applyLang();
  buildCategoryTabs();
  selectCategory(category, false);
  bindEvents();
  resizeCanvas();
  startLoop();
  window.addEventListener('resize', resizeCanvas);
}

function loadPrefs() {
  try {
    const s = JSON.parse(localStorage.getItem('ulab-v4'));
    if (s) {
      if (s.theme) theme = s.theme;
      if (s.lang) lang = s.lang;
      if (s.category && CATEGORIES[s.category]) {
        category = s.category;
        expId = s.expId || Object.keys(CATEGORIES[category].experiments)[0];
        vals = s.vals || {};
      }
    }
  } catch (e) {}
}

function savePrefs() {
  try {
    localStorage.setItem('ulab-v4', JSON.stringify({ theme, lang, category, expId, vals }));
  } catch (e) {}
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', theme);
  $$('.theme-swatch').forEach(el => el.classList.toggle('active', el.dataset.t === theme));
}

function applyLang() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  $('#badgeOffline').textContent = t('offline');
  $('#btnSettings').title = t('settings');
  $('#runBtn').textContent = t('run');
  $('#resetBtn').textContent = t('reset');
  $('#saveBtn').textContent = t('save');
  $('#resultsTitle').textContent = t('results');
  $('#resultsSub').textContent = t('resultsSub');
  $('#liveLabel').textContent = t('liveAnim');
  $$('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  // rebuild UI texts
  buildCategoryTabs();
  buildSubExps();
  renderControls();
  update();
}

function buildCategoryTabs() {
  const nav = $('#cats');
  nav.innerHTML = '';
  Object.keys(CATEGORIES).forEach(key => {
    const cat = CATEGORIES[key];
    const btn = document.createElement('button');
    btn.className = 'cat' + (key === category ? ' active' : '');
    btn.dataset.cat = key;
    btn.textContent = `${cat.icon} ${catTitle(cat)}`;
    btn.addEventListener('click', () => selectCategory(key));
    nav.appendChild(btn);
  });
}

function selectCategory(key, resetExp = true) {
  category = key;
  $$('.cat').forEach(b => b.classList.toggle('active', b.dataset.cat === key));
  const cat = CATEGORIES[key];
  const keys = Object.keys(cat.experiments);
  if (resetExp || !cat.experiments[expId]) expId = keys[0];
  buildSubExps();
  fieldsFor();
  renderControls();
  update();
  savePrefs();
}

function buildSubExps() {
  const box = $('#subExps');
  box.innerHTML = '';
  const cat = CATEGORIES[category];
  Object.keys(cat.experiments).forEach(id => {
    const exp = cat.experiments[id];
    const btn = document.createElement('button');
    btn.className = 'sub-exp' + (id === expId ? ' active' : '');
    btn.dataset.exp = id;
    btn.textContent = expName(exp);
    btn.addEventListener('click', () => {
      expId = id;
      $$('.sub-exp').forEach(b => b.classList.toggle('active', b.dataset.exp === id));
      fieldsFor();
      renderControls();
      update();
      savePrefs();
    });
    box.appendChild(btn);
  });
}

function getExp() { return CATEGORIES[category].experiments[expId]; }

function fieldsFor() {
  vals = {};
  const exp = getExp();
  if (exp.fields) exp.fields.forEach(f => { vals[f.k] = f.def; });
  selectedElement = null;
  reactA = null; reactB = null;
}

function renderControls() {
  const exp = getExp();
  $('#controlTitle').textContent = expName(exp);
  $('#controlDesc').textContent = lang === 'fa' ? exp.descFa : exp.descEn;
  $('#formulaBox').textContent = exp.formula;
  $('#visualTitle').textContent = expName(exp);
  const controls = $('#controls');
  controls.innerHTML = '';

  if (category === 'chemistry' && expId === 'periodic') {
    controls.innerHTML = `<div class="field">
      <div class="field-top"><label>${t('searchEl')}</label></div>
      <input type="text" id="chemSearch" placeholder="H, Fe, طلا, Gold...">
    </div>`;
    $('#chemSearch').addEventListener('input', e => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) { selectedElement = null; update(); return; }
      selectedElement = ELEMENTS.find(el =>
        el.s.toLowerCase() === q || el.n.includes(q) ||
        el.en.toLowerCase().includes(q) || String(el.z) === q
      ) || null;
      update();
    });
    return;
  }

  if (category === 'chemistry' && expId === 'reaction') {
    const opts = ELEMENTS.filter(e => e.z <= 20).map(e =>
      `<option value="${e.s}">${e.s} — ${lang==='fa'?e.n:e.en}</option>`
    ).join('');
    controls.innerHTML = `
      <div class="field"><div class="field-top"><label>${lang==='fa'?'عنصر اول':'Element A'}</label></div>
        <select id="reactA"><option value="">—</option>${opts}</select></div>
      <div class="field"><div class="field-top"><label>${lang==='fa'?'عنصر دوم':'Element B'}</label></div>
        <select id="reactB"><option value="">—</option>${opts}</select></div>`;
    $('#reactA').addEventListener('change', e => { reactA = e.target.value; update(); });
    $('#reactB').addEventListener('change', e => { reactB = e.target.value; update(); });
    return;
  }

  if (!exp.fields || !exp.fields.length) return;
  exp.fields.forEach(f => {
    const div = document.createElement('div');
    div.className = 'field';
    const label = lang === 'fa' ? f.fa : f.en;
    div.innerHTML = `
      <div class="field-top">
        <label for="${f.k}">${label} (${f.u})</label>
        <output id="out-${f.k}">${vals[f.k]}</output>
      </div>
      <input type="range" id="${f.k}" min="${f.min}" max="${f.max}" step="${f.step}" value="${vals[f.k]}">`;
    controls.appendChild(div);
    const input = div.querySelector('input');
    const out = div.querySelector('output');
    input.addEventListener('input', () => {
      vals[f.k] = Number(input.value);
      out.textContent = vals[f.k];
      update(); // real-time results
    });
  });
}

function update() {
  const exp = getExp();
  const box = $('#metrics');

  if (category === 'chemistry' && expId === 'periodic') {
    renderChemMetrics(box);
  } else if (category === 'chemistry' && expId === 'reaction') {
    renderReaction(box);
  } else {
    const metrics = exp.calc(vals);
    box.innerHTML = metrics.map((m, i) => `
      <div class="metric" style="animation-delay:${i*0.04}s">
        <div class="label">${lang==='fa'?m.fa:m.en}</div>
        <div class="value">${m.val} <span class="unit">${m.u||''}</span></div>
      </div>`).join('');
    const expl = lang === 'fa' ? exp.explainFa : exp.explainEn;
    $('#explanation').textContent = typeof expl === 'function' ? expl(vals) : expl;
  }
}

function renderChemMetrics(box) {
  if (!selectedElement) {
    box.innerHTML = `<div class="metric" style="grid-column:1/-1">
      <div class="label">${t('guide')}</div>
      <div class="value" style="font-size:12px;color:var(--muted)">${t('clickEl')}</div>
    </div>`;
    $('#explanation').textContent = lang==='fa' ? 'جدول ۱۱۸ عنصری.' : '118-element table.';
    return;
  }
  const el = selectedElement;
  const catN = CAT_NAMES[lang][el.c] || el.c;
  box.innerHTML = `
    <div class="metric"><div class="label">Z</div><div class="value">${el.z}</div></div>
    <div class="metric"><div class="label">${lang==='fa'?'جرم':'Mass'}</div><div class="value">${el.m}</div></div>
    <div class="metric"><div class="label">${lang==='fa'?'گروه/دوره':'Group/Period'}</div><div class="value">${el.g||'—'} / ${el.p}</div></div>
    <div class="metric"><div class="label">${lang==='fa'?'ذوب':'M.P.'}</div><div class="value">${el.mp!=null?el.mp+'°C':'—'}</div></div>`;
  $('#explanation').innerHTML = `<strong style="color:var(--accent2)">${el.s} — ${lang==='fa'?el.n:el.en}</strong><br>
    <span dir="ltr" style="color:var(--yellow)">${el.e}</span> · ${catN}`;
}

function renderReaction(box) {
  if (!reactA || !reactB) {
    box.innerHTML = `<div class="metric" style="grid-column:1/-1">
      <div class="label">${lang==='fa'?'ترکیب':'Reaction'}</div>
      <div class="value" style="font-size:12px;color:var(--muted)">${t('pickTwo')}</div>
    </div>`;
    $('#explanation').textContent = '';
    return;
  }
  const key1 = reactA+'+'+reactB, key2 = reactB+'+'+reactA;
  const rx = REACTIONS[key1] || REACTIONS[key2];
  if (rx) {
    box.innerHTML = `<div class="metric" style="grid-column:1/-1">
      <div class="reaction-box">${reactA} + ${reactB} <span class="arrow">→</span> ${rx.prod}
        <div style="font-size:11px;color:var(--muted);margin-top:4px">${lang==='fa'?rx.nameFa:rx.nameEn}</div>
      </div></div>`;
    $('#explanation').textContent = rx.note;
  } else {
    box.innerHTML = `<div class="metric" style="grid-column:1/-1">
      <div class="value" style="font-size:12px">${t('noReaction')}</div></div>`;
    $('#explanation').textContent = '';
  }
}

// ─── Animation ────────────────────────────────────────────────────────────
function startLoop() {
  if (animId) cancelAnimationFrame(animId);
  function frame() {
    animTime += 1;
    draw();
    animId = requestAnimationFrame(frame);
  }
  frame();
}

function resizeCanvas() {
  const wrap = canvas.parentElement;
  const ratio = window.devicePixelRatio || 1;
  const w = wrap.clientWidth || 600;
  const h = 300;
  canvas.width = Math.round(w * ratio);
  canvas.height = Math.round(h * ratio);
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function draw() {
  const ratio = window.devicePixelRatio || 1;
  const w = canvas.width / ratio;
  const h = canvas.height / ratio;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // bg from CSS variable approximation
  const bg = getComputedStyle(document.documentElement).getPropertyValue('--canvas-bg').trim() || '#080e1a';
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const grid = getComputedStyle(document.documentElement).getPropertyValue('--grid').trim() || '#121c2e';
  ctx.strokeStyle = grid;
  ctx.lineWidth = 1;
  for (let x = 30; x < w; x += 40) { ctx.beginPath(); ctx.moveTo(x, 8); ctx.lineTo(x, h-8); ctx.stroke(); }
  for (let y = 20; y < h; y += 32) { ctx.beginPath(); ctx.moveTo(18, y); ctx.lineTo(w-18, y); ctx.stroke(); }

  if (category === 'chemistry' && expId === 'periodic') drawPeriodic(w, h);
  else if (category === 'chemistry' && expId === 'reaction') drawReactionVis(w, h);
  else if (category === 'physics') drawPhysics(w, h);
  else if (category === 'electric') drawElectric(w, h);
  else if (category === 'energy') drawEnergy(w, h);
  else if (category === 'wave') drawWave(w, h);
  else if (category === 'astronomy') drawAstronomy(w, h);
}

function accentColor() {
  return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#3b9eff';
}
function accent2Color() {
  return getComputedStyle(document.documentElement).getPropertyValue('--accent2').trim() || '#22d3ee';
}

function drawPhysics(w, h) {
  const ground = h - 40;
  const ac = accentColor();
  const a2 = accent2Color();
  ctx.strokeStyle = ac + '66';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(25, ground); ctx.lineTo(w-15, ground); ctx.stroke();

  if (expId === 'kinematics') {
    const tMax = vals.t || 6;
    const tA = (animTime * 0.03) % (tMax + 0.6);
    const scaleX = (w - 90) / Math.max(Math.abs((vals.v||8)*tMax + 0.5*(vals.a||2)*tMax*tMax), 12);
    // trail
    ctx.strokeStyle = a2 + '55';
    ctx.beginPath();
    for (let t = 0; t <= tMax; t += 0.06) {
      const xx = 45 + ((vals.v||8)*t + 0.5*(vals.a||2)*t*t) * scaleX;
      if (t === 0) ctx.moveTo(xx, ground-20); else ctx.lineTo(xx, ground-20);
    }
    ctx.stroke();
    const xPos = 45 + ((vals.v||8)*tA + 0.5*(vals.a||2)*tA*tA) * scaleX;
    ball(xPos, ground-20, 14, a2);
  } else if (expId === 'freefall') {
    const g = vals.g || 9.81, hh = vals.h || 50;
    const tMax = Math.sqrt(2*hh/g);
    const tA = (animTime * 0.025) % (tMax + 0.5);
    const scaleY = (h - 90) / hh;
    const fallen = Math.min(0.5*g*tA*tA, hh);
    ball(w/2, 30 + fallen*scaleY, 14, a2);
  } else if (expId === 'projectile') {
    const th = ((vals.theta||45)*Math.PI)/180;
    const v0 = vals.v0||30, g = vals.g||9.81;
    const T = 2*v0*Math.sin(th)/g;
    const R = v0*v0*Math.sin(2*th)/g;
    const scaleX = (w-70)/Math.max(R,8);
    const scaleY = (h-80)/Math.max((v0*Math.sin(th))**2/(2*g),4);
    ctx.strokeStyle = a2+'55';
    ctx.beginPath();
    for (let t=0; t<=T; t+=T/50) {
      const x=35+v0*Math.cos(th)*t*scaleX;
      const y=ground-(v0*Math.sin(th)*t-0.5*g*t*t)*scaleY;
      if(t===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
    }
    ctx.stroke();
    const tA=(animTime*0.022)%(T+0.3);
    const px=35+v0*Math.cos(th)*tA*scaleX;
    const py=ground-(v0*Math.sin(th)*tA-0.5*g*tA*tA)*scaleY;
    ball(px, py, 11, '#fbbf24');
  } else if (expId === 'circular') {
    const cx=w/2, cy=h/2, r=Math.min(w,h)*0.28;
    ctx.strokeStyle=ac+'44'; ctx.setLineDash([5,5]);
    ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.stroke();
    ctx.setLineDash([]);
    const ang=animTime*0.04;
    const px=cx+Math.cos(ang)*r, py=cy+Math.sin(ang)*r;
    ctx.strokeStyle=a2+'66'; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(px,py); ctx.stroke();
    ball(px,py,12,a2);
  } else if (expId === 'spring') {
    const cx=w/2;
    const A=Math.min(70,(vals.A||0.2)*180);
    const omega=Math.sqrt((vals.k||100)/(vals.m||1));
    const y=h/2+Math.sin(animTime*0.03*omega)*A;
    ctx.strokeStyle='#a78bfa'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(cx,25);
    for(let i=0;i<=18;i++){const yy=25+(y-45)*(i/18);ctx.lineTo(cx+(i%2?16:-16),yy);}
    ctx.lineTo(cx,y-15); ctx.stroke();
    ball(cx,y,14,'#a78bfa');
  } else if (expId === 'momentum') {
    // two balls approaching / post collision simplified
    const mid = w/2;
    const phase = (animTime * 0.02) % 2;
    let x1, x2;
    if (phase < 1) {
      x1 = 40 + phase * (mid - 60);
      x2 = w - 40 - phase * (mid - 60);
    } else {
      // after (use final velocities sign for direction)
      const t2 = phase - 1;
      x1 = mid - 30 + t2 * 40 * Math.sign(vals.v1 || 1);
      x2 = mid + 30 + t2 * 40 * Math.sign(vals.v2 || -1);
    }
    ball(x1, h/2, 16, a2);
    ball(x2, h/2, 16, '#f97316');
  } else {
    const x = 40 + ((animTime * 2.2) % (w - 80));
    ball(x, h/2, 12, ac);
  }
}

function ball(x, y, r, color) {
  const g = ctx.createRadialGradient(x-r*0.3, y-r*0.3, 1, x, y, r);
  g.addColorStop(0, '#fff8');
  g.addColorStop(0.4, color);
  g.addColorStop(1, color + 'cc');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fill();
}

function drawElectric(w, h) {
  const cx=w/2, cy=h/2;
  const ac=accentColor(), a2=accent2Color();
  ctx.fillStyle='#1e3a5f'; ctx.fillRect(cx-145,cy-22,34,44);
  ctx.fillStyle=ac; ctx.fillRect(cx-145,cy-10,6,20);
  ctx.strokeStyle='#fb923c'; ctx.lineWidth=2.5;
  ctx.beginPath(); let rx=cx+15; ctx.moveTo(rx,cy);
  for(let i=0;i<5;i++){ctx.lineTo(rx+6,cy-9);ctx.lineTo(rx+12,cy+9);rx+=12;}
  ctx.lineTo(rx+5,cy); ctx.stroke();
  ctx.strokeStyle=ac; ctx.lineWidth=2.5;
  ctx.beginPath();
  ctx.moveTo(cx-111,cy);ctx.lineTo(cx+15,cy);
  ctx.moveTo(rx+5,cy);ctx.lineTo(cx+150,cy);
  ctx.lineTo(cx+150,cy+60);ctx.lineTo(cx-120,cy+60);ctx.lineTo(cx-120,cy+22);
  ctx.stroke();
  const speed=0.7+((vals.v||12)/(vals.r||10))*0.4;
  for(let k=0;k<9;k++){
    const phase=(animTime*speed*0.014+k/9)%1;
    let px,py;
    if(phase<0.22){px=cx-111+phase/0.22*126;py=cy;}
    else if(phase<0.38){px=cx+15+(phase-0.22)/0.16*70;py=cy;}
    else if(phase<0.52){px=cx+150;py=cy+(phase-0.38)/0.14*60;}
    else if(phase<0.82){px=cx+150-(phase-0.52)/0.3*270;py=cy+60;}
    else{px=cx-120;py=cy+60-(phase-0.82)/0.18*38;}
    ctx.fillStyle=a2; ctx.beginPath(); ctx.arc(px,py,3.2,0,Math.PI*2); ctx.fill();
  }
}

function drawEnergy(w, h) {
  const ground=h-36;
  ctx.fillStyle='#152030'; ctx.fillRect(0,ground,w,h-ground);
  const maxH=Math.max(vals.h||10,5);
  const scaleY=(h-100)/maxH;
  const y=ground-(vals.h||8)*scaleY;
  const bounce=Math.sin(animTime*0.07)*2;
  ball(w/2, y+bounce, 15, '#a78bfa');
  const k=0.5*(vals.m||5)*(vals.v||10)**2;
  const p=(vals.m||5)*9.81*(vals.h||8);
  const tot=k+p||1;
  ctx.fillStyle='#fbbf24'; ctx.fillRect(30,ground-12-(k/tot)*65,20,(k/tot)*65);
  ctx.fillStyle='#34d399'; ctx.fillRect(56,ground-12-(p/tot)*65,20,(p/tot)*65);
  ctx.fillStyle='#8aa0b8'; ctx.font='10px Tahoma';
  ctx.fillText('Ek',32,ground); ctx.fillText('Ep',58,ground);
}

function drawWave(w, h) {
  const mid=h/2;
  const A=Math.min(50,(vals.A||2)*18);
  const f=vals.f||1;
  const phase=vals.phase||0;
  const a2=accent2Color();
  ctx.strokeStyle=a2; ctx.lineWidth=2.5;
  ctx.beginPath();
  for(let x=0;x<w-35;x++){
    const y=mid-Math.sin(2*Math.PI*f*animTime*0.022-0.02*x+phase)*A;
    if(x===0)ctx.moveTo(25+x,y);else ctx.lineTo(25+x,y);
  }
  ctx.stroke();
}

function drawAstronomy(w, h) {
  const cx=w/2, cy=h/2;
  const ac=accentColor(), a2=accent2Color();
  if (['kepler','escape','orbital_energy'].includes(expId)) {
    const r=Math.min(w,h)*0.3;
    const sg=ctx.createRadialGradient(cx,cy,2,cx,cy,18);
    sg.addColorStop(0,'#fef9c3'); sg.addColorStop(0.5,'#fbbf24'); sg.addColorStop(1,'#b45309');
    ctx.fillStyle=sg; ctx.beginPath(); ctx.arc(cx,cy,15+Math.sin(animTime*0.04)*1.5,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle=ac+'44'; ctx.setLineDash([4,5]);
    ctx.beginPath(); ctx.ellipse(cx,cy,r,r*0.8,0,0,Math.PI*2); ctx.stroke();
    ctx.setLineDash([]);
    const ang=animTime*0.012;
    ball(cx+Math.cos(ang)*r, cy+Math.sin(ang)*r*0.8, 9, a2);
  } else if (expId === 'blackbody') {
    const T=vals.T||5800;
    let col=T>8000?'#aaccff':T>6000?'#fff4e0':T>4000?'#ffcc66':'#ff8833';
    const rg=ctx.createRadialGradient(cx,cy,5,cx,cy,65);
    rg.addColorStop(0,col); rg.addColorStop(1,'#0000');
    ctx.fillStyle=rg; ctx.beginPath(); ctx.arc(cx,cy,60+Math.sin(animTime*0.05)*3,0,Math.PI*2); ctx.fill();
  } else if (['photoelectric','deBroglie','bohr'].includes(expId)) {
    ctx.strokeStyle=ac+'44';
    for(let n=1;n<=3;n++){ctx.beginPath();ctx.arc(cx,cy,22*n,0,Math.PI*2);ctx.stroke();}
    ctx.fillStyle='#fbbf24'; ctx.beginPath(); ctx.arc(cx,cy,7,0,Math.PI*2); ctx.fill();
    const n=vals.n||2;
    const ang=animTime*0.04/n;
    const rr=22*Math.min(n,3);
    ball(cx+Math.cos(ang)*rr, cy+Math.sin(ang)*rr, 5, a2);
  } else if (expId === 'schwarzschild') {
    const rg=ctx.createRadialGradient(cx,cy,4,cx,cy,55);
    rg.addColorStop(0,'#000'); rg.addColorStop(0.5,'#1a0533'); rg.addColorStop(0.85,'#4c1d95'); rg.addColorStop(1,'#0000');
    ctx.fillStyle=rg; ctx.beginPath(); ctx.arc(cx,cy,50+Math.sin(animTime*0.03)*2,0,Math.PI*2); ctx.fill();
  } else {
    for(let i=0;i<35;i++){
      const sx=(Math.sin(i*12.3+animTime*0.001)*0.5+0.5)*w;
      const sy=(Math.cos(i*7.7)*0.5+0.5)*h;
      ctx.fillStyle=`rgba(200,220,255,${0.3+0.4*Math.sin(animTime*0.02+i)})`;
      ctx.beginPath(); ctx.arc(sx,sy,1.1,0,Math.PI*2); ctx.fill();
    }
  }
}

function drawPeriodic(w, h) {
  const cellW=Math.floor((w-14)/18);
  const cellH=Math.floor((h-26)/10);
  const colors={alkali:'#7f1d1d',alkaline:'#9a3412',transition:'#1e3a5f',post:'#365314',metalloid:'#713f12',nonmetal:'#14532d',halogen:'#4c1d95',noble:'#831843',lanthanide:'#164e63',actinide:'#3b0764',unknown:'#1f2937'};
  ELEMENTS.forEach(el=>{
    let col=el.g-1, row=el.p-1;
    if(el.c==='lanthanide'){row=7;col=el.z-57+2;}
    if(el.c==='actinide'){row=8;col=el.z-89+2;}
    if(col<0||col>17||row<0)return;
    const x=7+col*cellW, y=10+row*cellH;
    ctx.fillStyle=colors[el.c]||'#1f2937';
    ctx.fillRect(x+1,y+1,cellW-2,cellH-2);
    if(selectedElement&&selectedElement.z===el.z){
      ctx.strokeStyle=accent2Color(); ctx.lineWidth=2;
      ctx.strokeRect(x+1,y+1,cellW-2,cellH-2);
    }
    ctx.fillStyle='#e8f1ff';
    ctx.font=`bold ${Math.max(7,cellW*0.3)}px Tahoma`;
    ctx.textAlign='center';
    ctx.fillText(el.s,x+cellW/2,y+cellH*0.55);
    ctx.font=`${Math.max(6,cellW*0.17)}px Tahoma`;
    ctx.fillStyle='#a5b4c8';
    ctx.fillText(String(el.z),x+cellW/2,y+cellH*0.26);
  });
  ctx.textAlign='start';
}

function drawReactionVis(w, h) {
  ctx.fillStyle='#8aa0b8'; ctx.font='13px Tahoma'; ctx.textAlign='center';
  if(reactA&&reactB){
    ctx.fillStyle=accent2Color(); ctx.font='bold 20px Tahoma';
    ctx.fillText(`${reactA}  +  ${reactB}`, w/2, h/2-8);
    const rx=REACTIONS[reactA+'+'+reactB]||REACTIONS[reactB+'+'+reactA];
    if(rx){ctx.fillStyle='#fbbf24';ctx.font='16px Tahoma';ctx.fillText(`→  ${rx.prod}`,w/2,h/2+28);}
  } else {
    ctx.fillText(t('pickTwo'), w/2, h/2);
  }
  ctx.textAlign='start';
}

function onCanvasClick(e) {
  if(category!=='chemistry'||expId!=='periodic')return;
  const rect=canvas.getBoundingClientRect();
  const mx=e.clientX-rect.left, my=e.clientY-rect.top;
  const ratio=window.devicePixelRatio||1;
  const w=canvas.width/ratio, h=canvas.height/ratio;
  const cellW=Math.floor((w-14)/18), cellH=Math.floor((h-26)/10);
  for(const el of ELEMENTS){
    let col=el.g-1, row=el.p-1;
    if(el.c==='lanthanide'){row=7;col=el.z-57+2;}
    if(el.c==='actinide'){row=8;col=el.z-89+2;}
    if(col<0||col>17||row<0)continue;
    const x=7+col*cellW, y=10+row*cellH;
    if(mx>=x&&mx<=x+cellW&&my>=y&&my<=y+cellH){
      selectedElement=el; update(); return;
    }
  }
}

function bindEvents() {
  $('#runBtn').addEventListener('click', () => {
    $('#savedMsg').textContent = t('saved').replace('ذخیره','اجرا').replace('Saved','Ran');
    update();
  });
  $('#resetBtn').addEventListener('click', () => {
    fieldsFor(); renderControls(); update();
    $('#savedMsg').textContent = t('resetMsg');
  });
  $('#saveBtn').addEventListener('click', () => {
    savePrefs();
    $('#savedMsg').textContent = t('saved');
  });
  canvas.addEventListener('click', onCanvasClick);

  $('#btnSettings').addEventListener('click', () => {
    $('#settingsPanel').classList.toggle('open');
  });
  $$('.theme-swatch').forEach(el => {
    el.addEventListener('click', () => {
      theme = el.dataset.t;
      applyTheme();
      savePrefs();
    });
  });
  $$('.lang-btn').forEach(el => {
    el.addEventListener('click', () => {
      lang = el.dataset.lang;
      applyLang();
      savePrefs();
    });
  });
}

document.addEventListener('DOMContentLoaded', init);
})();
