(() => {
'use strict';

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// State
let category = 'physics';
let expId = 'kinematics';
let vals = {};
let selectedElement = null;
let reactA = null, reactB = null;
let animId = null;
let animTime = 0;
let canvas, ctx;

// ─── Init ─────────────────────────────────────────────────────────────────
function init() {
  canvas = $('#scene');
  ctx = canvas.getContext('2d');
  buildCategoryTabs();
  loadState();
  selectCategory(category, false);
  bindEvents();
  resizeCanvas();
  startLoop();
  window.addEventListener('resize', () => { resizeCanvas(); });
}

function resizeCanvas() {
  const wrap = canvas.parentElement;
  const ratio = window.devicePixelRatio || 1;
  const w = wrap.clientWidth || 600;
  const h = 320;
  canvas.width = Math.round(w * ratio);
  canvas.height = Math.round(h * ratio);
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

// ─── Category & Experiment UI ─────────────────────────────────────────────
function buildCategoryTabs() {
  const nav = $('#cats');
  nav.innerHTML = '';
  Object.keys(CATEGORIES).forEach(key => {
    const cat = CATEGORIES[key];
    const btn = document.createElement('button');
    btn.className = 'cat' + (key === category ? ' active' : '');
    btn.dataset.cat = key;
    btn.textContent = `${cat.icon} ${cat.title}`;
    btn.addEventListener('click', () => selectCategory(key));
    nav.appendChild(btn);
  });
}

function selectCategory(key, resetExp = true) {
  category = key;
  $$('.cat').forEach(b => b.classList.toggle('active', b.dataset.cat === key));
  const cat = CATEGORIES[key];
  const expKeys = Object.keys(cat.experiments);
  if (resetExp || !cat.experiments[expId]) expId = expKeys[0];
  buildSubExps();
  fieldsFor();
  renderControls();
  update();
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
    btn.textContent = exp.name;
    btn.addEventListener('click', () => {
      expId = id;
      $$('.sub-exp').forEach(b => b.classList.toggle('active', b.dataset.exp === id));
      fieldsFor();
      renderControls();
      update();
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
  if (exp.fields) exp.fields.forEach(f => vals[f[0]] = f[6]);
  selectedElement = null;
  reactA = null; reactB = null;
}

// ─── Controls Rendering ───────────────────────────────────────────────────
function renderControls() {
  const exp = getExp();
  $('#controlTitle').textContent = exp.name;
  $('#controlDesc').textContent = exp.desc;
  $('#formulaBox').textContent = exp.formula;
  $('#visualTitle').textContent = exp.name;
  const controls = $('#controls');
  controls.innerHTML = '';

  // Chemistry special UIs
  if (category === 'chemistry' && expId === 'periodic') {
    controls.innerHTML = `
      <div class="field">
        <div class="field-top"><label>جستجوی عنصر</label></div>
        <input type="text" id="chemSearch" placeholder="نماد، نام فارسی یا انگلیسی یا عدد اتمی...">
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
      `<option value="${e.s}">${e.s} — ${e.n}</option>`
    ).join('');
    controls.innerHTML = `
      <div class="field">
        <div class="field-top"><label>عنصر / ماده اول</label></div>
        <select id="reactA"><option value="">— انتخاب —</option>${opts}</select>
      </div>
      <div class="field">
        <div class="field-top"><label>عنصر / ماده دوم</label></div>
        <select id="reactB"><option value="">— انتخاب —</option>${opts}</select>
      </div>`;
    $('#reactA').addEventListener('change', e => { reactA = e.target.value; update(); });
    $('#reactB').addEventListener('change', e => { reactB = e.target.value; update(); });
    return;
  }

  // Normal fields
  if (!exp.fields || !exp.fields.length) return;
  exp.fields.forEach(f => {
    const div = document.createElement('div');
    div.className = 'field';
    div.innerHTML = `
      <div class="field-top">
        <label for="${f[0]}">${f[1]} (${f[2]})</label>
        <output id="out-${f[0]}">${vals[f[0]]}</output>
      </div>
      <input type="range" id="${f[0]}" min="${f[3]}" max="${f[4]}" step="${f[5]}" value="${vals[f[0]]}">`;
    controls.appendChild(div);
    const input = div.querySelector('input');
    const out = div.querySelector('output');
    input.addEventListener('input', () => {
      vals[f[0]] = Number(input.value);
      out.textContent = vals[f[0]];
      update();
    });
  });
}

// ─── Update Metrics & Explanation ─────────────────────────────────────────
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
      <div class="metric" style="animation-delay:${i * 0.05}s">
        <div class="label">${m[0]}</div>
        <div class="value">${m[1]} <span class="unit">${m[2] || ''}</span></div>
      </div>`).join('');
    $('#explanation').textContent = typeof exp.explain === 'function' ? exp.explain(vals) : exp.explain;
  }
}

function renderChemMetrics(box) {
  if (!selectedElement) {
    box.innerHTML = `<div class="metric" style="grid-column:1/-1">
      <div class="label">راهنما</div>
      <div class="value" style="font-size:13px;color:var(--muted)">روی عنصر در جدول کلیک کنید یا جستجو کنید</div>
    </div>`;
    $('#explanation').textContent = 'جدول تناوبی کامل ۱۱۸ عنصر. رنگ‌ها بر اساس دسته‌بندی شیمیایی.';
    return;
  }
  const el = selectedElement;
  box.innerHTML = `
    <div class="metric"><div class="label">عدد اتمی</div><div class="value">${el.z}</div></div>
    <div class="metric"><div class="label">جرم اتمی</div><div class="value">${el.m}</div></div>
    <div class="metric"><div class="label">گروه / دوره</div><div class="value">${el.g || '—'} / ${el.p}</div></div>
    <div class="metric"><div class="label">نقطه ذوب</div><div class="value">${el.mp != null ? el.mp + ' °C' : '—'}</div></div>`;
  $('#explanation').innerHTML = `<strong style="color:var(--cyan)">${el.s} — ${el.n} (${el.en})</strong><br>
    آرایش: <span dir="ltr" style="color:var(--yellow)">${el.e}</span> ·
    جوش: ${el.bp != null ? el.bp + ' °C' : '—'} · ${CAT_NAMES[el.c] || el.c}`;
}

function renderReaction(box) {
  if (!reactA || !reactB) {
    box.innerHTML = `<div class="metric" style="grid-column:1/-1">
      <div class="label">ترکیب مواد</div>
      <div class="value" style="font-size:13px;color:var(--muted)">دو عنصر را انتخاب کنید</div>
    </div>`;
    $('#explanation').textContent = 'واکنش‌های ساده آموزشی برای یادگیری استوکیومتری پایه.';
    return;
  }
  const key1 = reactA + '+' + reactB;
  const key2 = reactB + '+' + reactA;
  const rx = REACTIONS[key1] || REACTIONS[key2];
  if (rx) {
    box.innerHTML = `
      <div class="metric" style="grid-column:1/-1">
        <div class="reaction-box">
          ${reactA} + ${reactB} <span class="arrow">→</span> ${rx.prod}
          <div style="font-size:12px;color:var(--muted);margin-top:6px">${rx.name}</div>
        </div>
      </div>`;
    $('#explanation').textContent = rx.note + ' — این یک مدل آموزشی ساده‌شده است.';
  } else {
    box.innerHTML = `<div class="metric" style="grid-column:1/-1">
      <div class="label">نتیجه</div>
      <div class="value" style="font-size:13px">واکنش ساده‌ای در پایگاه داده آموزشی ثبت نشده</div>
    </div>`;
    $('#explanation').textContent = `${reactA} و ${reactB} ممکن است واکنش دهند، اما در این نسخه آموزشی تعریف نشده.`;
  }
}

// ─── Animation Loop ───────────────────────────────────────────────────────
function startLoop() {
  if (animId) cancelAnimationFrame(animId);
  function frame() {
    animTime += 1;
    draw();
    animId = requestAnimationFrame(frame);
  }
  frame();
}

function draw() {
  const w = canvas.width / (window.devicePixelRatio || 1);
  const h = canvas.height / (window.devicePixelRatio || 1);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  ctx.fillStyle = '#080e1a';
  ctx.fillRect(0, 0, w, h);

  // Subtle grid
  ctx.strokeStyle = '#121c2e';
  ctx.lineWidth = 1;
  for (let x = 30; x < w; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 10); ctx.lineTo(x, h - 10); ctx.stroke();
  }
  for (let y = 20; y < h; y += 35) {
    ctx.beginPath(); ctx.moveTo(20, y); ctx.lineTo(w - 20, y); ctx.stroke();
  }

  if (category === 'chemistry' && expId === 'periodic') {
    drawPeriodicTable(w, h);
  } else if (category === 'chemistry' && expId === 'reaction') {
    drawReactionVisual(w, h);
  } else if (category === 'physics') {
    drawPhysics(w, h);
  } else if (category === 'electric') {
    drawElectric(w, h);
  } else if (category === 'energy') {
    drawEnergy(w, h);
  } else if (category === 'wave') {
    drawWave(w, h);
  } else if (category === 'astronomy') {
    drawAstronomy(w, h);
  }
}

// ─── Drawers ──────────────────────────────────────────────────────────────
function drawPhysics(w, h) {
  const ground = h - 45;
  ctx.strokeStyle = '#3b9eff55';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(30, ground); ctx.lineTo(w - 20, ground); ctx.stroke();

  if (expId === 'kinematics' || expId === 'freefall') {
    const tMax = vals.t || Math.sqrt(2 * (vals.h || 50) / (vals.g || 9.81));
    const tAnim = (animTime * 0.03) % (tMax + 0.8);
    let xPos, yPos;
    if (expId === 'kinematics') {
      const scaleX = (w - 100) / Math.max(Math.abs(vals.v * tMax + 0.5 * vals.a * tMax * tMax), 15);
      xPos = 50 + (vals.v * tAnim + 0.5 * vals.a * tAnim * tAnim) * scaleX;
      yPos = ground - 22;
      // trail
      ctx.strokeStyle = '#22d3ee44';
      ctx.beginPath();
      for (let t = 0; t <= tMax; t += 0.08) {
        const xx = 50 + (vals.v * t + 0.5 * vals.a * t * t) * scaleX;
        if (t === 0) ctx.moveTo(xx, yPos); else ctx.lineTo(xx, yPos);
      }
      ctx.stroke();
    } else {
      const scaleY = (h - 100) / Math.max(vals.h || 50, 10);
      const fallen = 0.5 * (vals.g || 9.81) * tAnim * tAnim;
      xPos = w / 2;
      yPos = 40 + Math.min(fallen * scaleY, (vals.h || 50) * scaleY);
    }
    // ball
    const g = ctx.createRadialGradient(xPos - 5, yPos - 5, 2, xPos, yPos, 16);
    g.addColorStop(0, '#7dd3fc'); g.addColorStop(1, '#0284c7');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(xPos, yPos, 15, 0, Math.PI * 2); ctx.fill();
  } else if (expId === 'projectile') {
    const th = (vals.theta || 45) * Math.PI / 180;
    const v0 = vals.v0 || 30, g = vals.g || 9.81;
    const T = 2 * v0 * Math.sin(th) / g;
    const R = v0 * v0 * Math.sin(2 * th) / g;
    const scaleX = (w - 80) / Math.max(R, 10);
    const scaleY = (h - 90) / Math.max((v0 * Math.sin(th)) ** 2 / (2 * g), 5);
    ctx.strokeStyle = '#22d3ee55';
    ctx.beginPath();
    for (let t = 0; t <= T; t += T / 60) {
      const x = 40 + v0 * Math.cos(th) * t * scaleX;
      const y = ground - (v0 * Math.sin(th) * t - 0.5 * g * t * t) * scaleY;
      if (t === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    const tA = (animTime * 0.025) % (T + 0.3);
    const px = 40 + v0 * Math.cos(th) * tA * scaleX;
    const py = ground - (v0 * Math.sin(th) * tA - 0.5 * g * tA * tA) * scaleY;
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.arc(px, py, 10, 0, Math.PI * 2); ctx.fill();
  } else if (expId === 'circular') {
    const cx = w / 2, cy = h / 2;
    const r = Math.min(w, h) * 0.28;
    ctx.strokeStyle = '#3b9eff44';
    ctx.setLineDash([5, 5]);
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]);
    const ang = animTime * 0.04;
    const px = cx + Math.cos(ang) * r, py = cy + Math.sin(ang) * r;
    ctx.fillStyle = '#22d3ee';
    ctx.beginPath(); ctx.arc(px, py, 12, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#22d3ee66';
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py); ctx.stroke();
  } else if (expId === 'spring') {
    const cx = w / 2;
    const A = Math.min(80, (vals.A || 0.2) * 200);
    const omega = Math.sqrt((vals.k || 100) / (vals.m || 1));
    const y = h / 2 + Math.sin(animTime * 0.03 * omega) * A;
    // spring coils
    ctx.strokeStyle = '#a78bfa';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, 30);
    for (let i = 0; i <= 20; i++) {
      const yy = 30 + (y - 50) * (i / 20);
      const xx = cx + (i % 2 === 0 ? 18 : -18);
      ctx.lineTo(xx, yy);
    }
    ctx.lineTo(cx, y - 18);
    ctx.stroke();
    ctx.fillStyle = '#a78bfa';
    ctx.beginPath(); ctx.arc(cx, y, 16, 0, Math.PI * 2); ctx.fill();
  } else {
    // generic moving indicator
    const x = 50 + ((animTime * 2) % (w - 100));
    ctx.fillStyle = '#3b9eff';
    ctx.beginPath(); ctx.arc(x, h / 2, 12, 0, Math.PI * 2); ctx.fill();
  }
  ctx.fillStyle = '#8aa0b8';
  ctx.font = '12px Tahoma';
  ctx.fillText('انیمیشن زنده', 30, 28);
}

function drawElectric(w, h) {
  const cx = w / 2, cy = h / 2;
  // battery
  ctx.fillStyle = '#1e3a5f';
  ctx.fillRect(cx - 150, cy - 25, 36, 50);
  ctx.fillStyle = '#3b9eff';
  ctx.fillRect(cx - 150, cy - 12, 7, 24);
  // resistor zigzag
  ctx.strokeStyle = '#fb923c';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  let rx = cx + 20;
  ctx.moveTo(rx, cy);
  for (let i = 0; i < 5; i++) {
    ctx.lineTo(rx + 7, cy - 10);
    ctx.lineTo(rx + 14, cy + 10);
    rx += 14;
  }
  ctx.lineTo(rx + 6, cy);
  ctx.stroke();
  // wires
  ctx.strokeStyle = '#3b9eff';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(cx - 114, cy); ctx.lineTo(cx + 20, cy);
  ctx.moveTo(rx + 6, cy); ctx.lineTo(cx + 160, cy);
  ctx.lineTo(cx + 160, cy + 70); ctx.lineTo(cx - 130, cy + 70); ctx.lineTo(cx - 130, cy + 25);
  ctx.stroke();
  // particles
  const speed = 0.8 + (vals.v || 12) / (vals.r || 10) * 0.5;
  for (let k = 0; k < 10; k++) {
    const phase = (animTime * speed * 0.015 + k / 10) % 1;
    let px, py;
    if (phase < 0.22) { px = cx - 114 + phase / 0.22 * 134; py = cy; }
    else if (phase < 0.38) { px = cx + 20 + (phase - 0.22) / 0.16 * 80; py = cy; }
    else if (phase < 0.52) { px = cx + 160; py = cy + (phase - 0.38) / 0.14 * 70; }
    else if (phase < 0.82) { px = cx + 160 - (phase - 0.52) / 0.3 * 290; py = cy + 70; }
    else { px = cx - 130; py = cy + 70 - (phase - 0.82) / 0.18 * 45; }
    ctx.fillStyle = `hsla(190,90%,60%,0.85)`;
    ctx.beginPath(); ctx.arc(px, py, 3.5, 0, Math.PI * 2); ctx.fill();
  }
  ctx.fillStyle = '#8aa0b8';
  ctx.font = '12px Tahoma';
  ctx.fillText('جریان ذرات', 30, 28);
}

function drawEnergy(w, h) {
  const ground = h - 40;
  ctx.fillStyle = '#152030';
  ctx.fillRect(0, ground, w, h - ground);
  const maxH = Math.max(vals.h || 10, 5);
  const scaleY = (h - 110) / maxH;
  const y = ground - (vals.h || 8) * scaleY;
  const bounce = Math.sin(animTime * 0.07) * 2;
  const mx = w / 2, my = y + bounce;
  const g = ctx.createRadialGradient(mx - 5, my - 5, 2, mx, my, 18);
  g.addColorStop(0, '#c4b5fd'); g.addColorStop(1, '#7c3aed');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(mx, my, 17, 0, Math.PI * 2); ctx.fill();
  // bars
  const k = 0.5 * (vals.m || 5) * (vals.v || 10) ** 2;
  const p = (vals.m || 5) * 9.81 * (vals.h || 8);
  const tot = k + p || 1;
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(35, ground - 15 - (k / tot) * 70, 22, (k / tot) * 70);
  ctx.fillStyle = '#34d399';
  ctx.fillRect(65, ground - 15 - (p / tot) * 70, 22, (p / tot) * 70);
  ctx.fillStyle = '#8aa0b8';
  ctx.font = '11px Tahoma';
  ctx.fillText('Eₖ', 37, ground - 2);
  ctx.fillText('Eₚ', 67, ground - 2);
}

function drawWave(w, h) {
  const mid = h / 2;
  const A = Math.min(55, (vals.A || 2) * 20);
  const f = vals.f || 1;
  const phase = vals.phase || 0;
  ctx.strokeStyle = '#22d3ee';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  const k = 0.02;
  for (let x = 0; x < w - 40; x++) {
    const y = mid - Math.sin(2 * Math.PI * f * animTime * 0.025 - k * x + phase) * A;
    if (x === 0) ctx.moveTo(30 + x, y); else ctx.lineTo(30 + x, y);
  }
  ctx.stroke();
  // glow
  ctx.strokeStyle = '#22d3ee22';
  ctx.lineWidth = 8;
  ctx.beginPath();
  for (let x = 0; x < w - 40; x++) {
    const y = mid - Math.sin(2 * Math.PI * f * animTime * 0.025 - k * x + phase) * A;
    if (x === 0) ctx.moveTo(30 + x, y); else ctx.lineTo(30 + x, y);
  }
  ctx.stroke();
  ctx.fillStyle = '#8aa0b8';
  ctx.font = '12px Tahoma';
  ctx.fillText('موج متحرک', 30, 28);
}

function drawAstronomy(w, h) {
  const cx = w / 2, cy = h / 2;
  if (expId === 'kepler' || expId === 'escape' || expId === 'orbital_energy') {
    const r = Math.min(w, h) * 0.32;
    // star
    const sg = ctx.createRadialGradient(cx, cy, 2, cx, cy, 20);
    sg.addColorStop(0, '#fef9c3'); sg.addColorStop(0.6, '#fbbf24'); sg.addColorStop(1, '#b45309');
    ctx.fillStyle = sg;
    ctx.beginPath(); ctx.arc(cx, cy, 16 + Math.sin(animTime * 0.04) * 1.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fbbf2422';
    ctx.beginPath(); ctx.arc(cx, cy, 36, 0, Math.PI * 2); ctx.fill();
    // orbit
    ctx.strokeStyle = '#3b9eff40';
    ctx.setLineDash([4, 5]);
    ctx.beginPath(); ctx.ellipse(cx, cy, r, r * 0.82, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]);
    const ang = animTime * 0.012;
    const px = cx + Math.cos(ang) * r, py = cy + Math.sin(ang) * r * 0.82;
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath(); ctx.arc(px, py, 10, 0, Math.PI * 2); ctx.fill();
  } else if (expId === 'blackbody') {
    // color by temperature
    const T = vals.T || 5800;
    let col = '#ff6600';
    if (T > 8000) col = '#aaccff';
    else if (T > 6000) col = '#fff4e0';
    else if (T > 4000) col = '#ffcc66';
    else if (T > 2000) col = '#ff8833';
    const rg = ctx.createRadialGradient(cx, cy, 5, cx, cy, 70);
    rg.addColorStop(0, col);
    rg.addColorStop(1, '#0000');
    ctx.fillStyle = rg;
    ctx.beginPath(); ctx.arc(cx, cy, 70 + Math.sin(animTime * 0.05) * 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#8aa0b8';
    ctx.font = '12px Tahoma';
    ctx.fillText(`T = ${T} K`, 30, 28);
  } else if (expId === 'photoelectric' || expId === 'deBroglie' || expId === 'bohr') {
    // atom model
    ctx.strokeStyle = '#3b9eff44';
    for (let n = 1; n <= 3; n++) {
      ctx.beginPath(); ctx.arc(cx, cy, 25 * n, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.fill();
    const n = vals.n || 2;
    const ang = animTime * 0.04 / n;
    const rr = 25 * Math.min(n, 3);
    ctx.fillStyle = '#22d3ee';
    ctx.beginPath(); ctx.arc(cx + Math.cos(ang) * rr, cy + Math.sin(ang) * rr, 6, 0, Math.PI * 2); ctx.fill();
  } else if (expId === 'schwarzschild') {
    // black hole
    const rg = ctx.createRadialGradient(cx, cy, 5, cx, cy, 60);
    rg.addColorStop(0, '#000');
    rg.addColorStop(0.5, '#1a0533');
    rg.addColorStop(0.8, '#4c1d95');
    rg.addColorStop(1, '#0000');
    ctx.fillStyle = rg;
    ctx.beginPath(); ctx.arc(cx, cy, 55 + Math.sin(animTime * 0.03) * 3, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#a78bfa66';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy, 40, 0, Math.PI * 2); ctx.stroke();
  } else {
    // stars background
    for (let i = 0; i < 40; i++) {
      const sx = (Math.sin(i * 12.3 + animTime * 0.001) * 0.5 + 0.5) * w;
      const sy = (Math.cos(i * 7.7) * 0.5 + 0.5) * h;
      ctx.fillStyle = `rgba(200,220,255,${0.3 + 0.5 * Math.sin(animTime * 0.02 + i)})`;
      ctx.beginPath(); ctx.arc(sx, sy, 1.2, 0, Math.PI * 2); ctx.fill();
    }
  }
}

function drawPeriodicTable(w, h) {
  const cellW = Math.floor((w - 16) / 18);
  const cellH = Math.floor((h - 30) / 10);
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
    const x = 8 + col * cellW;
    const y = 12 + row * cellH;
    ctx.fillStyle = colors[el.c] || '#1f2937';
    ctx.fillRect(x + 1, y + 1, cellW - 2, cellH - 2);
    if (selectedElement && selectedElement.z === el.z) {
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 2;
      ctx.strokeRect(x + 1, y + 1, cellW - 2, cellH - 2);
    }
    ctx.fillStyle = '#e8f1ff';
    ctx.font = `bold ${Math.max(7, cellW * 0.32)}px Tahoma`;
    ctx.textAlign = 'center';
    ctx.fillText(el.s, x + cellW / 2, y + cellH * 0.58);
    ctx.font = `${Math.max(6, cellW * 0.18)}px Tahoma`;
    ctx.fillStyle = '#a5b4c8';
    ctx.fillText(String(el.z), x + cellW / 2, y + cellH * 0.28);
  });
  ctx.textAlign = 'start';
}

function drawReactionVisual(w, h) {
  ctx.fillStyle = '#8aa0b8';
  ctx.font = '14px Tahoma';
  ctx.textAlign = 'center';
  if (reactA && reactB) {
    ctx.fillStyle = '#22d3ee';
    ctx.font = 'bold 22px Tahoma';
    ctx.fillText(`${reactA}  +  ${reactB}`, w / 2, h / 2 - 10);
    const key1 = reactA + '+' + reactB;
    const key2 = reactB + '+' + reactA;
    const rx = REACTIONS[key1] || REACTIONS[key2];
    if (rx) {
      ctx.fillStyle = '#fbbf24';
      ctx.font = '18px Tahoma';
      ctx.fillText(`→  ${rx.prod}`, w / 2, h / 2 + 30);
    }
  } else {
    ctx.fillText('دو عنصر را از پنل کنترل انتخاب کنید', w / 2, h / 2);
  }
  ctx.textAlign = 'start';
}

// Canvas click for periodic table
function onCanvasClick(e) {
  if (category !== 'chemistry' || expId !== 'periodic') return;
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  const mx = (e.clientX - rect.left);
  const my = (e.clientY - rect.top);
  const w = canvas.width / ratio;
  const h = canvas.height / ratio;
  const cellW = Math.floor((w - 16) / 18);
  const cellH = Math.floor((h - 30) / 10);
  for (const el of ELEMENTS) {
    let col = el.g - 1, row = el.p - 1;
    if (el.c === 'lanthanide') { row = 7; col = el.z - 57 + 2; }
    if (el.c === 'actinide') { row = 8; col = el.z - 89 + 2; }
    if (col < 0 || col > 17 || row < 0) continue;
    const x = 8 + col * cellW;
    const y = 12 + row * cellH;
    if (mx >= x && mx <= x + cellW && my >= y && my <= y + cellH) {
      selectedElement = el;
      update();
      return;
    }
  }
}

// ─── Events & Storage ─────────────────────────────────────────────────────
function bindEvents() {
  $('#runBtn').addEventListener('click', () => {
    $('#savedMsg').textContent = '✓ آزمایش با پارامترهای فعلی محاسبه و اجرا شد.';
    update();
  });
  $('#resetBtn').addEventListener('click', () => {
    fieldsFor();
    renderControls();
    $('#savedMsg').textContent = 'پارامترها به مقدار پیش‌فرض برگشتند.';
    update();
  });
  $('#saveBtn').addEventListener('click', () => {
    try {
      localStorage.setItem('universal-lab-v3', JSON.stringify({ category, expId, vals }));
      $('#savedMsg').textContent = '✓ تنظیمات در همین مرورگر ذخیره شد.';
    } catch (e) {
      $('#savedMsg').textContent = 'ذخیره‌سازی در دسترس نیست.';
    }
  });
  canvas.addEventListener('click', onCanvasClick);
}

function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem('universal-lab-v3'));
    if (s && CATEGORIES[s.category]) {
      category = s.category;
      expId = s.expId || Object.keys(CATEGORIES[category].experiments)[0];
      vals = s.vals || {};
    }
  } catch (e) { /* ignore */ }
}

// Boot
document.addEventListener('DOMContentLoaded', init);
})();
