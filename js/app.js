(() => {
'use strict';
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

let layer = 'classic';
let category = 'physics';
let expId = 'kinematics';
let vals = {};
let lang = 'fa';
let theme = 'ocean';
let selectedElement = null;
let reactA = null, reactB = null;
let anim2d = null, t2d = 0;
let advMode = 'motion3d';
let advParams = {};

function t(k) { return (STR[lang] && STR[lang][k]) || k; }
function expName(e) { return lang === 'fa' ? e.nameFa : e.nameEn; }
function catTitle(c) { return lang === 'fa' ? c.titleFa : c.titleEn; }

function init() {
  loadPrefs();
  applyTheme();
  applyLang();
  buildCats();
  selectCategory(category, false);
  bindUI();
  start2dLoop();
}

function loadPrefs() {
  try {
    const s = JSON.parse(localStorage.getItem('ulab-v7') || '{}');
    if (s.theme) theme = s.theme;
    if (s.lang) lang = s.lang;
    if (s.category && CATEGORIES[s.category]) {
      category = s.category;
      expId = s.expId || Object.keys(CATEGORIES[category].experiments)[0];
      if (s.vals) vals = s.vals;
    }
  } catch (e) {}
}
function savePrefs() {
  try {
    localStorage.setItem('ulab-v7', JSON.stringify({ theme, lang, category, expId, vals }));
  } catch (e) {}
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', theme);
  $$('.theme-swatch').forEach(el => el.classList.toggle('active', el.dataset.t === theme));
}
function applyLang() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  $$('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  const bo = $('#badgeOffline'); if (bo) bo.textContent = lang === 'fa' ? 'آفلاین + CDN' : 'Offline + CDN';
}

function bindUI() {
  $('#btnSettings').addEventListener('click', e => {
    e.preventDefault();
    $('#settingsPanel').classList.toggle('open');
  });
  $$('.theme-swatch').forEach(el => el.addEventListener('click', () => {
    theme = el.dataset.t; applyTheme(); savePrefs();
  }));
  $$('.lang-btn').forEach(el => el.addEventListener('click', () => {
    lang = el.dataset.lang; applyLang(); buildCats(); buildSubs(); renderControls(); updateClassic(); savePrefs();
  }));
  $$('.layer-tab').forEach(el => el.addEventListener('click', () => {
    layer = el.dataset.layer;
    $$('.layer-tab').forEach(x => x.classList.toggle('active', x === el));
    $('#layerClassic').classList.toggle('hidden', layer !== 'classic');
    $('#layerAdvanced').classList.toggle('hidden', layer !== 'advanced');
    if (layer === 'advanced') selectAdv(advMode);
  }));
  $('#runBtn').addEventListener('click', () => { $('#savedMsg').textContent = t('ran') || '✓'; updateClassic(); });
  $('#resetBtn').addEventListener('click', () => { fieldsFor(); renderControls(); updateClassic(); $('#savedMsg').textContent = t('resetMsg') || 'Reset'; });
  $('#saveBtn').addEventListener('click', () => { savePrefs(); $('#savedMsg').textContent = t('saved') || 'Saved'; });
  $('#scene2d').addEventListener('click', onCanvasClick);
  $$('#advModes .mode').forEach(btn => btn.addEventListener('click', () => {
    $$('#advModes .mode').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectAdv(btn.dataset.mode);
  }));
  $('#advRun').addEventListener('click', () => selectAdv(advMode));
}

function buildCats() {
  const nav = $('#cats'); nav.innerHTML = '';
  Object.keys(CATEGORIES).forEach(key => {
    const cat = CATEGORIES[key];
    const btn = document.createElement('button');
    btn.className = 'cat' + (key === category ? ' active' : '');
    btn.dataset.cat = key;
    btn.textContent = (cat.icon || '') + ' ' + catTitle(cat);
    btn.addEventListener('click', () => selectCategory(key));
    nav.appendChild(btn);
  });
}

function selectCategory(key, reset = true) {
  category = key;
  $$('.cat').forEach(b => b.classList.toggle('active', b.dataset.cat === key));
  const keys = Object.keys(CATEGORIES[key].experiments);
  if (reset || !CATEGORIES[key].experiments[expId]) expId = keys[0];
  buildSubs(); fieldsFor(); renderControls(); updateClassic(); savePrefs();
}

function buildSubs() {
  const box = $('#subExps'); box.innerHTML = '';
  Object.keys(CATEGORIES[category].experiments).forEach(id => {
    const exp = CATEGORIES[category].experiments[id];
    const btn = document.createElement('button');
    btn.className = 'sub-exp' + (id === expId ? ' active' : '');
    btn.dataset.exp = id;
    btn.textContent = expName(exp);
    btn.addEventListener('click', () => {
      expId = id;
      $$('.sub-exp').forEach(b => b.classList.toggle('active', b.dataset.exp === id));
      fieldsFor(); renderControls(); updateClassic(); savePrefs();
    });
    box.appendChild(btn);
  });
}

function getExp() { return CATEGORIES[category].experiments[expId]; }

function fieldsFor() {
  vals = {};
  const exp = getExp();
  if (exp && exp.fields) exp.fields.forEach(f => { vals[f.k] = f.def; });
  selectedElement = null; reactA = null; reactB = null;
}

function renderControls() {
  const exp = getExp(); if (!exp) return;
  $('#controlTitle').textContent = expName(exp);
  $('#controlDesc').textContent = lang === 'fa' ? exp.descFa : exp.descEn;
  $('#formulaBox').textContent = exp.formula;
  $('#visualTitle').textContent = expName(exp);
  const box = $('#controls'); box.innerHTML = '';

  if (category === 'chemistry' && expId === 'periodic') {
    box.innerHTML = `<div class="field"><div class="field-top"><label>${t('searchEl')||'Search'}</label></div>
      <input type="text" id="chemSearch" placeholder="H, Fe, طلا..."></div>`;
    $('#chemSearch').addEventListener('input', e => {
      const q = e.target.value.trim().toLowerCase();
      selectedElement = q ? ELEMENTS.find(el => el.s.toLowerCase()===q || el.n.includes(q) || el.en.toLowerCase().includes(q) || String(el.z)===q) : null;
      updateClassic();
    });
    return;
  }
  if (category === 'chemistry' && expId === 'reaction') {
    const opts = ELEMENTS.filter(e => e.z <= 20).map(e => `<option value="${e.s}">${e.s} — ${lang==='fa'?e.n:e.en}</option>`).join('');
    box.innerHTML = `<div class="field"><label>${t('elA')||'A'}</label><select id="reactA"><option value="">—</option>${opts}</select></div>
      <div class="field"><label>${t('elB')||'B'}</label><select id="reactB"><option value="">—</option>${opts}</select></div>`;
    $('#reactA').addEventListener('change', e => { reactA = e.target.value; updateClassic(); });
    $('#reactB').addEventListener('change', e => { reactB = e.target.value; updateClassic(); });
    return;
  }
  (exp.fields || []).forEach(f => {
    const div = document.createElement('div');
    div.className = 'field';
    div.innerHTML = `<div class="field-top"><label>${lang==='fa'?f.fa:f.en} (${f.u})</label>
      <output id="out-${f.k}">${vals[f.k]}</output></div>
      <input type="range" id="${f.k}" min="${f.min}" max="${f.max}" step="${f.step}" value="${vals[f.k]}">`;
    box.appendChild(div);
    const inp = div.querySelector('input');
    const out = div.querySelector('output');
    inp.addEventListener('input', () => {
      vals[f.k] = Number(inp.value);
      out.textContent = vals[f.k];
      updateClassic();
    });
  });
}

function updateClassic() {
  const exp = getExp(); if (!exp) return;
  const box = $('#metrics');
  if (category === 'chemistry' && expId === 'periodic') {
    if (!selectedElement) {
      box.innerHTML = `<div class="metric"><div class="label">${t('guide')||'Guide'}</div><div class="value" style="font-size:12px">${t('clickEl')||'Click element'}</div></div>`;
      $('#explanation').textContent = '';
    } else {
      const el = selectedElement;
      box.innerHTML = `<div class="metric"><div class="label">Z</div><div class="value">${el.z}</div></div>
        <div class="metric"><div class="label">Mass</div><div class="value">${el.m}</div></div>
        <div class="metric"><div class="label">G/P</div><div class="value">${el.g||'—'}/${el.p}</div></div>`;
      $('#explanation').innerHTML = `<strong style="color:var(--accent2)">${el.s} — ${lang==='fa'?el.n:el.en}</strong><br><span dir="ltr">${el.e}</span>`;
    }
    return;
  }
  if (category === 'chemistry' && expId === 'reaction') {
    if (!reactA || !reactB) {
      box.innerHTML = `<div class="metric"><div class="value" style="font-size:12px">${t('pickTwo')||'Pick two'}</div></div>`;
      $('#explanation').textContent = '';
    } else {
      const rx = REACTIONS[reactA+'+'+reactB] || REACTIONS[reactB+'+'+reactA];
      if (rx) {
        box.innerHTML = `<div class="metric" style="grid-column:1/-1"><div class="reaction-box">${reactA}+${reactB} → ${rx.prod}<div style="font-size:11px;color:var(--muted)">${lang==='fa'?rx.nameFa:rx.nameEn}</div></div></div>`;
        $('#explanation').textContent = rx.note;
      } else {
        box.innerHTML = `<div class="metric"><div class="value" style="font-size:12px">${t('noReaction')||'—'}</div></div>`;
        $('#explanation').textContent = '';
      }
    }
    return;
  }
  const metrics = exp.calc(vals);
  box.innerHTML = metrics.map(m => `<div class="metric"><div class="label">${lang==='fa'?m.fa:m.en}</div><div class="value">${m.val} <span style="font-size:10px;color:var(--muted)">${m.u||''}</span></div></div>`).join('');
  const expl = lang === 'fa' ? exp.explainFa : exp.explainEn;
  $('#explanation').textContent = typeof expl === 'function' ? expl(vals) : (expl || '');
}

// 2D educational canvas
function start2dLoop() {
  const canvas = $('#scene2d');
  const ctx = canvas.getContext('2d');
  function frame() {
    t2d += 1;
    const w = canvas.width, h = canvas.height;
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--canvas').trim() || '#080e1a';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#1e2d45';
    for (let x = 30; x < w; x += 40) { ctx.beginPath(); ctx.moveTo(x, 10); ctx.lineTo(x, h-10); ctx.stroke(); }
    try {
      if (category === 'chemistry' && expId === 'periodic') drawPeriodic(ctx, w, h);
      else if (category === 'physics') drawPhys2d(ctx, w, h);
      else if (category === 'wave') drawWave2d(ctx, w, h);
      else {
        ctx.fillStyle = '#3b9eff';
        ctx.beginPath();
        ctx.arc(w/2 + Math.sin(t2d*0.04)*40, h/2, 12, 0, Math.PI*2);
        ctx.fill();
      }
    } catch (e) {}
    anim2d = requestAnimationFrame(frame);
  }
  frame();
}

function drawPhys2d(ctx, w, h) {
  const ground = h - 30;
  ctx.strokeStyle = '#3b9eff66';
  ctx.beginPath(); ctx.moveTo(20, ground); ctx.lineTo(w-20, ground); ctx.stroke();
  if (expId === 'kinematics' || expId === 'freefall' || expId === 'projectile') {
    const x = 40 + ((t2d * 2) % (w - 80));
    const y = ground - 20 - Math.abs(Math.sin(t2d * 0.05)) * 40;
    ctx.fillStyle = '#22d3ee';
    ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI*2); ctx.fill();
  } else if (expId === 'circular') {
    const cx = w/2, cy = h/2, r = 60;
    ctx.strokeStyle = '#3b9eff44';
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.stroke();
    const a = t2d * 0.04;
    ctx.fillStyle = '#22d3ee';
    ctx.beginPath(); ctx.arc(cx+Math.cos(a)*r, cy+Math.sin(a)*r, 10, 0, Math.PI*2); ctx.fill();
  } else {
    ctx.fillStyle = '#3b9eff';
    ctx.beginPath(); ctx.arc(40+((t2d*2)%(w-80)), h/2, 10, 0, Math.PI*2); ctx.fill();
  }
}

function drawWave2d(ctx, w, h) {
  const mid = h/2, A = 40, f = vals.f || 1;
  ctx.strokeStyle = '#22d3ee';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let x = 0; x < w - 20; x++) {
    const y = mid - Math.sin(2*Math.PI*f*t2d*0.02 - 0.03*x) * A;
    if (x === 0) ctx.moveTo(10+x, y); else ctx.lineTo(10+x, y);
  }
  ctx.stroke();
}

function drawPeriodic(ctx, w, h) {
  const cellW = Math.floor((w-12)/18), cellH = Math.floor((h-20)/10);
  const colors = {alkali:'#7f1d1d',alkaline:'#9a3412',transition:'#1e3a5f',post:'#365314',metalloid:'#713f12',nonmetal:'#14532d',halogen:'#4c1d95',noble:'#831843',lanthanide:'#164e63',actinide:'#3b0764',unknown:'#1f2937'};
  ELEMENTS.forEach(el => {
    let col = el.g-1, row = el.p-1;
    if (el.c === 'lanthanide') { row = 7; col = el.z-57+2; }
    if (el.c === 'actinide') { row = 8; col = el.z-89+2; }
    if (col<0||col>17||row<0) return;
    const x = 6+col*cellW, y = 8+row*cellH;
    ctx.fillStyle = colors[el.c]||'#1f2937';
    ctx.fillRect(x+1, y+1, cellW-2, cellH-2);
    if (selectedElement && selectedElement.z === el.z) {
      ctx.strokeStyle = '#22d3ee'; ctx.lineWidth = 2;
      ctx.strokeRect(x+1, y+1, cellW-2, cellH-2);
    }
    ctx.fillStyle = '#e8f1ff';
    ctx.font = `bold ${Math.max(6,cellW*0.28)}px Tahoma`;
    ctx.textAlign = 'center';
    ctx.fillText(el.s, x+cellW/2, y+cellH*0.55);
  });
  ctx.textAlign = 'start';
}

function onCanvasClick(e) {
  if (category !== 'chemistry' || expId !== 'periodic') return;
  const canvas = $('#scene2d');
  const rect = canvas.getBoundingClientRect();
  const mx = (e.clientX-rect.left)*(canvas.width/rect.width);
  const my = (e.clientY-rect.top)*(canvas.height/rect.height);
  const cellW = Math.floor((canvas.width-12)/18), cellH = Math.floor((canvas.height-20)/10);
  for (const el of ELEMENTS) {
    let col=el.g-1, row=el.p-1;
    if (el.c==='lanthanide'){row=7;col=el.z-57+2;}
    if (el.c==='actinide'){row=8;col=el.z-89+2;}
    if (col<0||col>17||row<0) continue;
    const x=6+col*cellW, y=8+row*cellH;
    if (mx>=x&&mx<=x+cellW&&my>=y&&my<=y+cellH) { selectedElement=el; updateClassic(); return; }
  }
}

// ─── Advanced 3D layer ────────────────────────────────────────────────────
function selectAdv(m) {
  advMode = m;
  AudioLab.stopMic(); AudioLab.stopTone(); SolarSystem.stop(); MoleculeLab.stop();

  const titles = {
    motion3d: ['حرکت سه‌بعدی', 'Kinematics path in 3D'],
    physics3d: ['موتور فیزیک', 'Verlet physics engine'],
    atom3d: ['ساختار اتم', 'Bohr atom model'],
    solar3d: ['منظومه شمسی', 'Solar system'],
    audio3d: ['صوت و موج', 'Microphone + FFT'],
    mol3d: ['شیمی مولکولی', 'Molecule builder'],
    vr3d: ['حالت VR', 'WebXR entry']
  };
  const ti = titles[m] || ['—', '—'];
  $('#advTitle').textContent = lang === 'fa' ? ti[0] : ti[1];
  $('#advViewTitle').textContent = $('#advTitle').textContent;
  $('#advDesc').textContent = lang === 'fa' ? 'پارامترها را تنظیم کنید' : 'Adjust parameters';
  $('#advHint').textContent = m.includes('3d') && m !== 'audio3d' && m !== 'mol3d' ? (lang==='fa'?'کشیدن=چرخش · اسکرول=زوم':'Drag=orbit · Scroll=zoom') : '';

  const use2d = (m === 'audio3d' || m === 'mol3d');
  $('#view3d').style.display = use2d ? 'none' : 'block';
  const c2 = $('#view2d');
  c2.style.display = use2d ? 'block' : 'none';
  c2.classList.toggle('hidden', !use2d);

  const box = $('#advControls');
  box.innerHTML = '';
  advParams = {};

  if (m === 'motion3d') {
    advParams = { v0: 8, a: 2, t: 6 };
    box.innerHTML = fieldRange('v0','v₀',-10,30,0.5,8)+fieldRange('a','a',-5,12,0.5,2)+fieldRange('t','t',1,15,0.5,6);
    bindAdvRanges();
    Scenes3D.init($('#view3d'));
    Scenes3D.setupMotion(advParams);
    Scenes3D.startLoop();
    $('#advNote').textContent = 'x = v₀t + ½at²';
  } else if (m === 'physics3d') {
    advParams = { type: 'bounce', k: 80, drag: 0.15 };
    box.innerHTML = `<div class="field"><label>Type</label>
      <select id="ap-type"><option value="bounce">Bounce</option><option value="spring">Spring</option><option value="collision">Collision</option><option value="fluid">Fluid</option></select></div>
      ${fieldRange('k','k',20,200,5,80)}${fieldRange('drag','drag',0.01,0.4,0.01,0.15)}`;
    $('#ap-type').addEventListener('change', e => { advParams.type = e.target.value; Scenes3D.setupPhysics(advParams.type, advParams); });
    bindAdvRanges(() => Scenes3D.setupPhysics(advParams.type||'bounce', advParams));
    Scenes3D.init($('#view3d'));
    Scenes3D.setupPhysics('bounce', advParams);
    Scenes3D.startLoop();
    $('#advNote').textContent = 'Verlet · gravity · springs · collisions · drag';
  } else if (m === 'atom3d') {
    advParams = { n: 3 };
    box.innerHTML = fieldRange('n','shells',1,4,1,3);
    bindAdvRanges(() => Scenes3D.setupAtom(advParams.n||3));
    Scenes3D.init($('#view3d'));
    Scenes3D.setupAtom(3);
    Scenes3D.startLoop();
    $('#advNote').textContent = 'Eₙ = −13.6/n² eV';
  } else if (m === 'solar3d') {
    advParams = { speed: 1 };
    box.innerHTML = fieldRange('speed','time scale',0.2,8,0.2,1);
    bindAdvRanges(() => SolarSystem.setTimeScale(advParams.speed||1));
    SolarSystem.init($('#view3d'));
    SolarSystem.setTimeScale(1);
    SolarSystem.start();
    $('#advNote').textContent = 'Educational relative periods (not full ephemeris)';
  } else if (m === 'audio3d') {
    box.innerHTML = `<button type="button" class="btn btn-primary" id="micBtn" style="width:100%;margin-bottom:6px">🎙️ Mic</button>
      <button type="button" class="btn btn-sec" id="toneBtn" style="width:100%;margin-bottom:6px">🔊 Tone 440Hz</button>
      <button type="button" class="btn btn-sec" id="stopAud" style="width:100%">⏹ Stop</button>
      <div class="freq-bars" id="freqBars"></div>`;
    AudioLab.makeBarStrip($('#freqBars'), 32);
    const c = $('#view2d');
    c.width = Math.max(400, c.clientWidth||700); c.height = 400;
    $('#micBtn').onclick = async () => {
      const r = await AudioLab.startMic(c, $('#freqBars'));
      $('#advNote').textContent = r.ok ? 'Mic live' : r.error;
    };
    $('#toneBtn').onclick = () => AudioLab.playTone(440, 'sine');
    $('#stopAud').onclick = () => { AudioLab.stopMic(); AudioLab.stopTone(); };
    $('#advNote').textContent = 'Web Audio API · FFT spectrum';
  } else if (m === 'mol3d') {
    box.innerHTML = `<div class="mol-palette">
      <div class="mol-atom" data-el="H">H</div><div class="mol-atom" data-el="C">C</div>
      <div class="mol-atom" data-el="N">N</div><div class="mol-atom" data-el="O">O</div>
      <div class="mol-atom" data-el="Cl">Cl</div></div>
      <button type="button" class="btn btn-sec" id="molClear" style="width:100%">Clear</button>`;
    const c = $('#view2d');
    c.width = Math.max(400, c.clientWidth||700); c.height = 400;
    MoleculeLab.init(c);
    $$('.mol-atom').forEach(el => el.onclick = () => {
      MoleculeLab.addAtom(el.dataset.el, 80+Math.random()*(c.width-160), 60+Math.random()*(c.height-120));
      updateAdvMetrics();
    });
    $('#molClear').onclick = () => { MoleculeLab.clear(); updateAdvMetrics(); };
    $('#advNote').textContent = 'Drag atoms · auto bonds · approx. bond energy';
  } else if (m === 'vr3d') {
    box.innerHTML = `<button type="button" class="btn btn-primary" id="vrBtn" style="width:100%">Enter VR (WebXR)</button>`;
    $('#vrBtn').onclick = () => {
      const ok = Scenes3D.enableVR();
      $('#advNote').textContent = ok ? 'WebXR enabled if supported' : 'WebXR unavailable — desktop 3D active';
      $('#view3d').style.display = 'block';
      $('#view2d').style.display = 'none';
      Scenes3D.init($('#view3d'));
      Scenes3D.setupAtom(3);
      Scenes3D.startLoop();
    };
    $('#advNote').textContent = 'Requires XR headset + compatible browser';
  }
  updateAdvMetrics();
}

function fieldRange(k, label, min, max, step, def) {
  advParams[k] = def;
  return `<div class="field"><div class="field-top"><label>${label}</label><output id="ao-${k}">${def}</output></div>
    <input type="range" id="ap-${k}" min="${min}" max="${max}" step="${step}" value="${def}"></div>`;
}
function bindAdvRanges(extra) {
  Object.keys(advParams).forEach(k => {
    const inp = $('#ap-'+k), out = $('#ao-'+k);
    if (!inp) return;
    inp.addEventListener('input', () => {
      advParams[k] = Number(inp.value);
      if (out) out.textContent = advParams[k];
      if (advMode === 'motion3d') Scenes3D.setMotionParams(advParams);
      if (typeof extra === 'function') extra();
      updateAdvMetrics();
    });
  });
}

function updateAdvMetrics() {
  const box = $('#advMetrics');
  let html = '';
  if (advMode === 'motion3d') {
    const v0=advParams.v0||8,a=advParams.a||2,t=advParams.t||6;
    html = mcard('x', (v0*t+0.5*a*t*t).toFixed(2),'m')+mcard('v',(v0+a*t).toFixed(2),'m/s');
  } else if (advMode === 'mol3d') {
    html = mcard('Formula', MoleculeLab.formula(),'')+mcard('Bonds', MoleculeLab.bonds().length,'')+mcard('E≈', MoleculeLab.energy().toFixed(0),'kcal/mol');
  } else if (advMode === 'atom3d') {
    const n=advParams.n||3;
    html = mcard('n', n,'')+mcard('Eₙ', (-13.6/(n*n)).toFixed(2),'eV');
  } else {
    html = mcard('Mode', advMode, '');
  }
  box.innerHTML = html;
}
function mcard(l,v,u){return `<div class="metric"><div class="label">${l}</div><div class="value">${v} ${u||''}</div></div>`;}

setInterval(() => { if (layer==='advanced' && advMode==='mol3d') updateAdvMetrics(); }, 600);

document.addEventListener('DOMContentLoaded', init);
})();
