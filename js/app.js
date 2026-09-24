(() => {
'use strict';

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// Merge experiment modules
const CATEGORIES = {
  physics: EXP_PHYSICS,
  electric: EXP_ELECTRIC,
  energy: EXP_ENERGY,
  wave: EXP_WAVE,
  chemistry: EXP_CHEMISTRY,
  astronomy: EXP_ASTRONOMY
};

// State
let category = 'physics';
let expId = 'kinematics';
let vals = {};
let lang = 'fa';
let theme = 'ocean';
let selectedElement = null;
let reactA = null, reactB = null;
let animId = null, bgAnimId = null;
let animTime = 0;
let canvas, ctx, bgCanvas, bgCtx;
let settingsOpen = false;

function t(key) { return (STR[lang] && STR[lang][key]) || key; }
function expName(exp) { return lang === 'fa' ? exp.nameFa : exp.nameEn; }
function catTitle(cat) { return lang === 'fa' ? cat.titleFa : cat.titleEn; }

// ─── Init ─────────────────────────────────────────────────────────────────
function init() {
  canvas = $('#scene');
  ctx = canvas.getContext('2d');
  bgCanvas = $('#bgCanvas');
  bgCtx = bgCanvas.getContext('2d');

  loadPrefs();
  applyTheme();
  applyLangDir();
  buildCategoryTabs();
  selectCategory(category, false);
  bindAllEvents();
  resizeAll();
  startAnimLoop();
  startBgLoop();

  window.addEventListener('resize', () => { resizeAll(); });
}

function loadPrefs() {
  try {
    const s = JSON.parse(localStorage.getItem('ulab-v5') || '{}');
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
    localStorage.setItem('ulab-v5', JSON.stringify({ theme, lang, category, expId, vals }));
  } catch (e) {}
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', theme);
  $$('.theme-swatch').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-t') === theme);
  });
}

function applyLangDir() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  // Update static labels
  const offline = $('#badgeOffline');
  if (offline) offline.textContent = t('offline');
  const run = $('#runBtn'); if (run) run.textContent = t('run');
  const reset = $('#resetBtn'); if (reset) reset.textContent = t('reset');
  const save = $('#saveBtn'); if (save) save.textContent = t('save');
  const rt = $('#resultsTitle'); if (rt) rt.textContent = t('results');
  const rs = $('#resultsSub'); if (rs) rs.textContent = t('resultsSub');
  const ll = $('#liveLabel'); if (ll) ll.textContent = t('liveAnim');
  $$('.lang-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-lang') === lang));
}

// ─── UI Builders ──────────────────────────────────────────────────────────
function buildCategoryTabs() {
  const nav = $('#cats');
  if (!nav) return;
  nav.innerHTML = '';
  Object.keys(CATEGORIES).forEach(key => {
    const cat = CATEGORIES[key];
    const btn = document.createElement('button');
    btn.className = 'cat' + (key === category ? ' active' : '');
    btn.setAttribute('data-cat', key);
    btn.textContent = (cat.icon || '') + ' ' + catTitle(cat);
    btn.addEventListener('click', () => selectCategory(key));
    nav.appendChild(btn);
  });
}

function selectCategory(key, resetExp = true) {
  category = key;
  $$('.cat').forEach(b => b.classList.toggle('active', b.getAttribute('data-cat') === key));
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
  if (!box) return;
  box.innerHTML = '';
  const cat = CATEGORIES[category];
  Object.keys(cat.experiments).forEach(id => {
    const exp = cat.experiments[id];
    const btn = document.createElement('button');
    btn.className = 'sub-exp' + (id === expId ? ' active' : '');
    btn.setAttribute('data-exp', id);
    btn.textContent = expName(exp);
    btn.addEventListener('click', () => {
      expId = id;
      $$('.sub-exp').forEach(b => b.classList.toggle('active', b.getAttribute('data-exp') === id));
      fieldsFor();
      renderControls();
      update();
      savePrefs();
    });
    box.appendChild(btn);
  });
}

function getExp() {
  return CATEGORIES[category].experiments[expId];
}

function fieldsFor() {
  vals = {};
  const exp = getExp();
  if (exp && exp.fields) {
    exp.fields.forEach(f => { vals[f.k] = f.def; });
  }
  selectedElement = null;
  reactA = null;
  reactB = null;
}

function renderControls() {
  const exp = getExp();
  if (!exp) return;
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
    const inp = $('#chemSearch');
    if (inp) {
      inp.addEventListener('input', e => {
        const q = e.target.value.trim().toLowerCase();
        if (!q) { selectedElement = null; update(); return; }
        selectedElement = ELEMENTS.find(el =>
          el.s.toLowerCase() === q || el.n.includes(q) ||
          el.en.toLowerCase().includes(q) || String(el.z) === q
        ) || null;
        update();
      });
    }
    return;
  }

  if (category === 'chemistry' && expId === 'reaction') {
    const opts = ELEMENTS.filter(e => e.z <= 20).map(e =>
      `<option value="${e.s}">${e.s} — ${lang === 'fa' ? e.n : e.en}</option>`
    ).join('');
    controls.innerHTML = `
      <div class="field"><div class="field-top"><label>${t('elA')}</label></div>
        <select id="reactA"><option value="">—</option>${opts}</select></div>
      <div class="field"><div class="field-top"><label>${t('elB')}</label></div>
        <select id="reactB"><option value="">—</option>${opts}</select></div>`;
    const a = $('#reactA'), b = $('#reactB');
    if (a) a.addEventListener('change', e => { reactA = e.target.value; update(); });
    if (b) b.addEventListener('change', e => { reactB = e.target.value; update(); });
    return;
  }

  if (!exp.fields || !exp.fields.length) return;

  exp.fields.forEach(f => {
    const div = document.createElement('div');
    div.className = 'field';
    const label = lang === 'fa' ? f.fa : f.en;
    div.innerHTML = `
      <div class="field-top">
        <label>${label} (${f.u})</label>
        <output id="out-${f.k}">${vals[f.k]}</output>
      </div>
      <input type="range" id="${f.k}" min="${f.min}" max="${f.max}" step="${f.step}" value="${vals[f.k]}">`;
    controls.appendChild(div);
    const input = div.querySelector('input');
    const out = div.querySelector('output');
    input.addEventListener('input', () => {
      vals[f.k] = Number(input.value);
      out.textContent = vals[f.k];
      update();
    });
  });
}

function update() {
  const exp = getExp();
  if (!exp) return;
  const box = $('#metrics');

  if (category === 'chemistry' && expId === 'periodic') {
    renderChem(box);
  } else if (category === 'chemistry' && expId === 'reaction') {
    renderReaction(box);
  } else {
    const metrics = exp.calc(vals);
    box.innerHTML = metrics.map((m, i) => `
      <div class="metric" style="animation-delay:${i * 0.04}s">
        <div class="label">${lang === 'fa' ? m.fa : m.en}</div>
        <div class="value">${m.val} <span class="unit">${m.u || ''}</span></div>
      </div>`).join('');
    const expl = lang === 'fa' ? exp.explainFa : exp.explainEn;
    $('#explanation').textContent = typeof expl === 'function' ? expl(vals) : (expl || '');
  }
}

function renderChem(box) {
  if (!selectedElement) {
    box.innerHTML = `<div class="metric" style="grid-column:1/-1">
      <div class="label">${t('guide')}</div>
      <div class="value" style="font-size:12px;color:var(--muted)">${t('clickEl')}</div>
    </div>`;
    $('#explanation').textContent = '';
    return;
  }
  const el = selectedElement;
  const catN = (CAT_NAMES[lang] && CAT_NAMES[lang][el.c]) || el.c;
  box.innerHTML = `
    <div class="metric"><div class="label">Z</div><div class="value">${el.z}</div></div>
    <div class="metric"><div class="label">${lang==='fa'?'جرم':'Mass'}</div><div class="value">${el.m}</div></div>
    <div class="metric"><div class="label">G/P</div><div class="value">${el.g||'—'} / ${el.p}</div></div>
    <div class="metric"><div class="label">${lang==='fa'?'ذوب':'M.P.'}</div><div class="value">${el.mp!=null?el.mp+'°C':'—'}</div></div>`;
  $('#explanation').innerHTML = `<strong style="color:var(--accent2)">${el.s} — ${lang==='fa'?el.n:el.en}</strong><br>
    <span dir="ltr">${el.e}</span> · ${catN}`;
}

function renderReaction(box) {
  if (!reactA || !reactB) {
    box.innerHTML = `<div class="metric" style="grid-column:1/-1">
      <div class="value" style="font-size:12px;color:var(--muted)">${t('pickTwo')}</div></div>`;
    $('#explanation').textContent = '';
    return;
  }
  const rx = REACTIONS[reactA+'+'+reactB] || REACTIONS[reactB+'+'+reactA];
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

// ─── Canvas resize ────────────────────────────────────────────────────────
function resizeAll() {
  // Experiment canvas
  const wrap = canvas.parentElement;
  const ratio = window.devicePixelRatio || 1;
  const w = Math.max(280, wrap.clientWidth || 600);
  const h = 280;
  canvas.width = Math.round(w * ratio);
  canvas.height = Math.round(h * ratio);
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  // Background canvas
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
}

// ─── Background animation ─────────────────────────────────────────────────
const particles = [];
function initParticles() {
  particles.length = 0;
  const n = 40;
  for (let i = 0; i < n; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 0.8 + Math.random() * 2,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      a: 0.15 + Math.random() * 0.35
    });
  }
}

function startBgLoop() {
  initParticles();
  function frame() {
    const w = bgCanvas.width, h = bgCanvas.height;
    bgCtx.clearRect(0, 0, w, h);
    const style = getComputedStyle(document.documentElement);
    const color = style.getPropertyValue('--particle').trim() || '#3b9eff';
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
      bgCtx.beginPath();
      bgCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      bgCtx.fillStyle = color;
      bgCtx.globalAlpha = p.a;
      bgCtx.fill();
    });
    bgCtx.globalAlpha = 1;
    // soft connections
    bgCtx.strokeStyle = color;
    bgCtx.lineWidth = 0.5;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          bgCtx.globalAlpha = 0.08 * (1 - dist / 120);
          bgCtx.beginPath();
          bgCtx.moveTo(particles[i].x, particles[i].y);
          bgCtx.lineTo(particles[j].x, particles[j].y);
          bgCtx.stroke();
        }
      }
    }
    bgCtx.globalAlpha = 1;
    bgAnimId = requestAnimationFrame(frame);
  }
  frame();
}

// ─── Experiment animation loop ────────────────────────────────────────────
function startAnimLoop() {
  if (animId) cancelAnimationFrame(animId);
  function frame() {
    animTime += 1;
    drawScene();
    animId = requestAnimationFrame(frame);
  }
  frame();
}

function cssVar(name, fallback) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

function drawScene() {
  const ratio = window.devicePixelRatio || 1;
  const w = canvas.width / ratio;
  const h = canvas.height / ratio;
  if (w < 10 || h < 10) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const bg = cssVar('--canvas', '#080e1a');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // grid
  ctx.strokeStyle = cssVar('--grid', '#121c2e');
  ctx.lineWidth = 1;
  for (let x = 25; x < w; x += 36) {
    ctx.beginPath(); ctx.moveTo(x, 6); ctx.lineTo(x, h - 6); ctx.stroke();
  }
  for (let y = 18; y < h; y += 30) {
    ctx.beginPath(); ctx.moveTo(15, y); ctx.lineTo(w - 15, y); ctx.stroke();
  }

  try {
    if (category === 'chemistry' && expId === 'periodic') drawPeriodic(w, h);
    else if (category === 'chemistry' && expId === 'reaction') drawReactionVis(w, h);
    else if (category === 'physics') drawPhysics(w, h);
    else if (category === 'electric') drawElectric(w, h);
    else if (category === 'energy') drawEnergy(w, h);
    else if (category === 'wave') drawWave(w, h);
    else if (category === 'astronomy') drawAstronomy(w, h);
    else {
      // fallback pulse
      const cx = w / 2, cy = h / 2;
      const r = 20 + Math.sin(animTime * 0.05) * 8;
      ctx.fillStyle = cssVar('--accent', '#3b9eff');
      ctx.globalAlpha = 0.6;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
    }
  } catch (err) {
    ctx.fillStyle = '#f87171';
    ctx.font = '12px Tahoma';
    ctx.fillText('Draw error: ' + err.message, 20, 30);
  }
}

function ball(x, y, r, color) {
  const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 1, x, y, r);
  g.addColorStop(0, 'rgba(255,255,255,0.5)');
  g.addColorStop(0.45, color);
  g.addColorStop(1, color);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function drawPhysics(w, h) {
  const ground = h - 38;
  const ac = cssVar('--accent', '#3b9eff');
  const a2 = cssVar('--accent2', '#22d3ee');
  ctx.strokeStyle = ac + '66';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(20, ground); ctx.lineTo(w - 12, ground); ctx.stroke();

  if (expId === 'kinematics') {
    const tMax = vals.t || 6;
    const tA = (animTime * 0.03) % (tMax + 0.5);
    const scaleX = (w - 80) / Math.max(Math.abs((vals.v || 8) * tMax + 0.5 * (vals.a || 2) * tMax * tMax), 10);
    ctx.strokeStyle = a2 + '55';
    ctx.beginPath();
    for (let t = 0; t <= tMax; t += 0.05) {
      const xx = 40 + ((vals.v || 8) * t + 0.5 * (vals.a || 2) * t * t) * scaleX;
      if (t === 0) ctx.moveTo(xx, ground - 18); else ctx.lineTo(xx, ground - 18);
    }
    ctx.stroke();
    const xPos = 40 + ((vals.v || 8) * tA + 0.5 * (vals.a || 2) * tA * tA) * scaleX;
    ball(xPos, ground - 18, 13, a2);
  } else if (expId === 'freefall') {
    const g = vals.g || 9.81, hh = vals.h || 50;
    const tMax = Math.sqrt(2 * hh / g);
    const tA = (animTime * 0.025) % (tMax + 0.4);
    const scaleY = (h - 80) / hh;
    const fallen = Math.min(0.5 * g * tA * tA, hh);
    ball(w / 2, 28 + fallen * scaleY, 13, a2);
  } else if (expId === 'projectile') {
    const th = ((vals.theta || 45) * Math.PI) / 180;
    const v0 = vals.v0 || 30, g = vals.g || 9.81;
    const T = 2 * v0 * Math.sin(th) / g;
    const R = v0 * v0 * Math.sin(2 * th) / g;
    const scaleX = (w - 60) / Math.max(R, 8);
    const scaleY = (h - 70) / Math.max((v0 * Math.sin(th)) ** 2 / (2 * g), 4);
    ctx.strokeStyle = a2 + '55';
    ctx.beginPath();
    for (let t = 0; t <= T; t += T / 45) {
      const x = 30 + v0 * Math.cos(th) * t * scaleX;
      const y = ground - (v0 * Math.sin(th) * t - 0.5 * g * t * t) * scaleY;
      if (t === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    const tA = (animTime * 0.02) % (T + 0.25);
    const px = 30 + v0 * Math.cos(th) * tA * scaleX;
    const py = ground - (v0 * Math.sin(th) * tA - 0.5 * g * tA * tA) * scaleY;
    ball(px, py, 10, '#fbbf24');
  } else if (expId === 'circular') {
    const cx = w / 2, cy = h / 2, r = Math.min(w, h) * 0.28;
    ctx.strokeStyle = ac + '44';
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]);
    const ang = animTime * 0.04;
    const px = cx + Math.cos(ang) * r, py = cy + Math.sin(ang) * r;
    ctx.strokeStyle = a2 + '66';
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py); ctx.stroke();
    ball(px, py, 11, a2);
  } else if (expId === 'spring') {
    const cx = w / 2;
    const A = Math.min(60, (vals.A || 0.2) * 160);
    const omega = Math.sqrt((vals.k || 100) / (vals.m || 1));
    const y = h / 2 + Math.sin(animTime * 0.03 * omega) * A;
    ctx.strokeStyle = '#a78bfa';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, 22);
    for (let i = 0; i <= 16; i++) {
      const yy = 22 + (y - 40) * (i / 16);
      ctx.lineTo(cx + (i % 2 ? 14 : -14), yy);
    }
    ctx.lineTo(cx, y - 12);
    ctx.stroke();
    ball(cx, y, 13, '#a78bfa');
  } else if (expId === 'momentum') {
    const phase = (animTime * 0.018) % 2;
    let x1, x2;
    if (phase < 1) {
      x1 = 35 + phase * (w / 2 - 55);
      x2 = w - 35 - phase * (w / 2 - 55);
    } else {
      const t2 = phase - 1;
      x1 = w / 2 - 28 + t2 * 35 * Math.sign(vals.v1 || 1);
      x2 = w / 2 + 28 + t2 * 35 * Math.sign(vals.v2 || -1);
    }
    ball(x1, h / 2, 14, a2);
    ball(x2, h / 2, 14, '#f97316');
  } else {
    const x = 30 + ((animTime * 2) % (w - 60));
    ball(x, h / 2, 11, ac);
  }
}

function drawElectric(w, h) {
  const cx = w / 2, cy = h / 2;
  const ac = cssVar('--accent', '#3b9eff');
  const a2 = cssVar('--accent2', '#22d3ee');
  ctx.fillStyle = '#1e3a5f';
  ctx.fillRect(cx - 130, cy - 20, 30, 40);
  ctx.fillStyle = ac;
  ctx.fillRect(cx - 130, cy - 9, 5, 18);
  ctx.strokeStyle = '#fb923c';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  let rx = cx + 12;
  ctx.moveTo(rx, cy);
  for (let i = 0; i < 5; i++) {
    ctx.lineTo(rx + 5, cy - 8);
    ctx.lineTo(rx + 10, cy + 8);
    rx += 10;
  }
  ctx.lineTo(rx + 4, cy);
  ctx.stroke();
  ctx.strokeStyle = ac;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(cx - 100, cy); ctx.lineTo(cx + 12, cy);
  ctx.moveTo(rx + 4, cy); ctx.lineTo(cx + 135, cy);
  ctx.lineTo(cx + 135, cy + 55); ctx.lineTo(cx - 110, cy + 55); ctx.lineTo(cx - 110, cy + 20);
  ctx.stroke();
  const speed = 0.6 + ((vals.v || 12) / (vals.r || 10)) * 0.35;
  for (let k = 0; k < 8; k++) {
    const phase = (animTime * speed * 0.013 + k / 8) % 1;
    let px, py;
    if (phase < 0.22) { px = cx - 100 + phase / 0.22 * 112; py = cy; }
    else if (phase < 0.38) { px = cx + 12 + (phase - 0.22) / 0.16 * 60; py = cy; }
    else if (phase < 0.52) { px = cx + 135; py = cy + (phase - 0.38) / 0.14 * 55; }
    else if (phase < 0.82) { px = cx + 135 - (phase - 0.52) / 0.3 * 245; py = cy + 55; }
    else { px = cx - 110; py = cy + 55 - (phase - 0.82) / 0.18 * 35; }
    ctx.fillStyle = a2;
    ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill();
  }
}

function drawEnergy(w, h) {
  const ground = h - 34;
  ctx.fillStyle = cssVar('--grid', '#152030');
  ctx.fillRect(0, ground, w, h - ground);
  const maxH = Math.max(vals.h || 10, 5);
  const scaleY = (h - 90) / maxH;
  const y = ground - (vals.h || 8) * scaleY;
  const bounce = Math.sin(animTime * 0.07) * 2;
  ball(w / 2, y + bounce, 14, '#a78bfa');
  const k = 0.5 * (vals.m || 5) * (vals.v || 10) ** 2;
  const p = (vals.m || 5) * 9.81 * (vals.h || 8);
  const tot = k + p || 1;
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(28, ground - 10 - (k / tot) * 55, 18, (k / tot) * 55);
  ctx.fillStyle = '#34d399';
  ctx.fillRect(52, ground - 10 - (p / tot) * 55, 18, (p / tot) * 55);
}

function drawWave(w, h) {
  const mid = h / 2;
  const A = Math.min(45, (vals.A || 2) * 16);
  const f = vals.f || 1;
  const phase = vals.phase || 0;
  const a2 = cssVar('--accent2', '#22d3ee');
  ctx.strokeStyle = a2;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  for (let x = 0; x < w - 30; x++) {
    const y = mid - Math.sin(2 * Math.PI * f * animTime * 0.02 - 0.02 * x + phase) * A;
    if (x === 0) ctx.moveTo(20 + x, y); else ctx.lineTo(20 + x, y);
  }
  ctx.stroke();
}

function drawAstronomy(w, h) {
  const cx = w / 2, cy = h / 2;
  const ac = cssVar('--accent', '#3b9eff');
  const a2 = cssVar('--accent2', '#22d3ee');
  if (['kepler', 'escape', 'orbital_energy'].includes(expId)) {
    const r = Math.min(w, h) * 0.28;
    const sg = ctx.createRadialGradient(cx, cy, 2, cx, cy, 16);
    sg.addColorStop(0, '#fef9c3');
    sg.addColorStop(0.5, '#fbbf24');
    sg.addColorStop(1, '#b45309');
    ctx.fillStyle = sg;
    ctx.beginPath();
    ctx.arc(cx, cy, 14 + Math.sin(animTime * 0.04) * 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = ac + '44';
    ctx.setLineDash([3, 4]);
    ctx.beginPath();
    ctx.ellipse(cx, cy, r, r * 0.78, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    const ang = animTime * 0.012;
    ball(cx + Math.cos(ang) * r, cy + Math.sin(ang) * r * 0.78, 8, a2);
  } else if (expId === 'blackbody') {
    const T = vals.T || 5800;
    const col = T > 8000 ? '#aaccff' : T > 6000 ? '#fff4e0' : T > 4000 ? '#ffcc66' : '#ff8833';
    const rg = ctx.createRadialGradient(cx, cy, 4, cx, cy, 55);
    rg.addColorStop(0, col);
    rg.addColorStop(1, 'transparent');
    ctx.fillStyle = rg;
    ctx.beginPath();
    ctx.arc(cx, cy, 50 + Math.sin(animTime * 0.05) * 3, 0, Math.PI * 2);
    ctx.fill();
  } else if (['photoelectric', 'deBroglie', 'bohr'].includes(expId)) {
    ctx.strokeStyle = ac + '44';
    for (let n = 1; n <= 3; n++) {
      ctx.beginPath();
      ctx.arc(cx, cy, 20 * n, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fill();
    const n = vals.n || 2;
    const ang = animTime * 0.04 / n;
    const rr = 20 * Math.min(n, 3);
    ball(cx + Math.cos(ang) * rr, cy + Math.sin(ang) * rr, 5, a2);
  } else if (expId === 'schwarzschild') {
    const rg = ctx.createRadialGradient(cx, cy, 3, cx, cy, 48);
    rg.addColorStop(0, '#000');
    rg.addColorStop(0.5, '#1a0533');
    rg.addColorStop(0.85, '#4c1d95');
    rg.addColorStop(1, 'transparent');
    ctx.fillStyle = rg;
    ctx.beginPath();
    ctx.arc(cx, cy, 44 + Math.sin(animTime * 0.03) * 2, 0, Math.PI * 2);
    ctx.fill();
  } else {
    for (let i = 0; i < 30; i++) {
      const sx = (Math.sin(i * 12.3 + animTime * 0.001) * 0.5 + 0.5) * w;
      const sy = (Math.cos(i * 7.7) * 0.5 + 0.5) * h;
      ctx.fillStyle = `rgba(200,220,255,${0.3 + 0.4 * Math.sin(animTime * 0.02 + i)})`;
      ctx.beginPath();
      ctx.arc(sx, sy, 1.1, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawPeriodic(w, h) {
  const cellW = Math.floor((w - 12) / 18);
  const cellH = Math.floor((h - 22) / 10);
  const colors = {
    alkali: '#7f1d1d', alkaline: '#9a3412', transition: '#1e3a5f',
    post: '#365314', metalloid: '#713f12', nonmetal: '#14532d',
    halogen: '#4c1d95', noble: '#831843', lanthanide: '#164e63',
    actinide: '#3b0764', unknown: '#1f2937'
  };
  ELEMENTS.forEach(el => {
    let col = el.g - 1, row = el.p - 1;
    if (el.c === 'lanthanide') { row = 7; col = el.z - 57 + 2; }
    if (el.c === 'actinide') { row = 8; col = el.z - 89 + 2; }
    if (col < 0 || col > 17 || row < 0) return;
    const x = 6 + col * cellW, y = 8 + row * cellH;
    ctx.fillStyle = colors[el.c] || '#1f2937';
    ctx.fillRect(x + 1, y + 1, cellW - 2, cellH - 2);
    if (selectedElement && selectedElement.z === el.z) {
      ctx.strokeStyle = cssVar('--accent2', '#22d3ee');
      ctx.lineWidth = 2;
      ctx.strokeRect(x + 1, y + 1, cellW - 2, cellH - 2);
    }
    ctx.fillStyle = '#e8f1ff';
    ctx.font = `bold ${Math.max(6, cellW * 0.28)}px Tahoma`;
    ctx.textAlign = 'center';
    ctx.fillText(el.s, x + cellW / 2, y + cellH * 0.55);
    ctx.font = `${Math.max(5, cellW * 0.16)}px Tahoma`;
    ctx.fillStyle = '#a5b4c8';
    ctx.fillText(String(el.z), x + cellW / 2, y + cellH * 0.26);
  });
  ctx.textAlign = 'start';
}

function drawReactionVis(w, h) {
  ctx.fillStyle = cssVar('--muted', '#8aa0b8');
  ctx.font = '13px Tahoma';
  ctx.textAlign = 'center';
  if (reactA && reactB) {
    ctx.fillStyle = cssVar('--accent2', '#22d3ee');
    ctx.font = 'bold 18px Tahoma';
    ctx.fillText(`${reactA}  +  ${reactB}`, w / 2, h / 2 - 6);
    const rx = REACTIONS[reactA + '+' + reactB] || REACTIONS[reactB + '+' + reactA];
    if (rx) {
      ctx.fillStyle = '#fbbf24';
      ctx.font = '15px Tahoma';
      ctx.fillText(`→  ${rx.prod}`, w / 2, h / 2 + 24);
    }
  } else {
    ctx.fillText(t('pickTwo'), w / 2, h / 2);
  }
  ctx.textAlign = 'start';
}

function onCanvasClick(e) {
  if (category !== 'chemistry' || expId !== 'periodic') return;
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  const ratio = window.devicePixelRatio || 1;
  const w = canvas.width / ratio, h = canvas.height / ratio;
  const cellW = Math.floor((w - 12) / 18);
  const cellH = Math.floor((h - 22) / 10);
  for (const el of ELEMENTS) {
    let col = el.g - 1, row = el.p - 1;
    if (el.c === 'lanthanide') { row = 7; col = el.z - 57 + 2; }
    if (el.c === 'actinide') { row = 8; col = el.z - 89 + 2; }
    if (col < 0 || col > 17 || row < 0) continue;
    const x = 6 + col * cellW, y = 8 + row * cellH;
    if (mx >= x && mx <= x + cellW && my >= y && my <= y + cellH) {
      selectedElement = el;
      update();
      return;
    }
  }
}

// ─── Events (fixed settings) ──────────────────────────────────────────────
function bindAllEvents() {
  // Settings toggle
  const btnSet = $('#btnSettings');
  const panel = $('#settingsPanel');
  if (btnSet && panel) {
    btnSet.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      settingsOpen = !settingsOpen;
      panel.classList.toggle('open', settingsOpen);
    });
  }

  // Theme swatches
  $$('.theme-swatch').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      theme = el.getAttribute('data-t');
      applyTheme();
      savePrefs();
      initParticles(); // refresh bg colors
    });
  });

  // Language
  $$('.lang-btn').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      lang = el.getAttribute('data-lang');
      applyLangDir();
      buildCategoryTabs();
      buildSubExps();
      renderControls();
      update();
      savePrefs();
    });
  });

  // Action buttons
  const runBtn = $('#runBtn');
  if (runBtn) runBtn.addEventListener('click', () => {
    $('#savedMsg').textContent = t('ran');
    update();
  });
  const resetBtn = $('#resetBtn');
  if (resetBtn) resetBtn.addEventListener('click', () => {
    fieldsFor();
    renderControls();
    update();
    $('#savedMsg').textContent = t('resetMsg');
  });
  const saveBtn = $('#saveBtn');
  if (saveBtn) saveBtn.addEventListener('click', () => {
    savePrefs();
    $('#savedMsg').textContent = t('saved');
  });

  canvas.addEventListener('click', onCanvasClick);
}

// Boot
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
})();
