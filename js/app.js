(() => {
'use strict';
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

let mode = 'motion3d';
let params = {};

const MODES = {
  motion3d: {
    title: 'حرکت سه‌بعدی',
    desc: 'مسیر حرکت با شتاب ثابت در فضای سه‌بعدی (Three.js).',
    hint: 'کشیدن = چرخش دوربین · اسکرول = زوم',
    note: 'فرمول: x = v₀t + ½at² · نمایش سه‌بعدی مسیر و رد حرکت.',
    fields: [
      { k: 'v0', label: 'سرعت اولیه (m/s)', min: -10, max: 30, step: 0.5, def: 8 },
      { k: 'a', label: 'شتاب (m/s²)', min: -5, max: 12, step: 0.5, def: 2 },
      { k: 't', label: 'زمان (s)', min: 1, max: 15, step: 0.5, def: 6 }
    ]
  },
  physics: {
    title: 'موتور فیزیک',
    desc: 'شبیه‌سازی عددی: برخورد، گرانش، فنر و مقاومت سیال.',
    hint: 'Verlet integration · برخورد زمین و ذرات',
    note: 'موتور ساده پایدار: گرانش، فنر (هوک)، درگ سیال، برخورد ناکشسان با زمین.',
    fields: [
      { k: 'type', label: 'نوع آزمایش', type: 'select', options: [
        { v: 'bounce', t: 'توپ جهنده' },
        { v: 'spring', t: 'فنر و جرم' },
        { v: 'collision', t: 'برخورد دو جسم' },
        { v: 'fluid', t: 'سقوط در سیال' }
      ], def: 'bounce' },
      { k: 'k', label: 'ثابت فنر k', min: 20, max: 200, step: 5, def: 80 },
      { k: 'drag', label: 'ضریب درگ', min: 0.01, max: 0.4, step: 0.01, def: 0.15 }
    ]
  },
  atom: {
    title: 'ساختار اتم',
    desc: 'مدل بور ساده‌شده — پوسته‌ها و الکترون‌های در حال گردش.',
    hint: 'n = شماره پوسته',
    note: 'نمایش آموزشی پوسته‌های الکترونی (نه مدل کوانتومی کامل).',
    fields: [
      { k: 'n', label: 'تعداد پوسته', min: 1, max: 4, step: 1, def: 3 }
    ]
  },
  solar: {
    title: 'منظومه شمسی',
    desc: 'مدار تقریبی ۸ سیاره با مقیاس زمانی قابل تنظیم.',
    hint: 'موقعیت‌ها آموزشی هستند نه افمریس دقیق',
    note: 'دوره تناوب نسبی بر اساس سال زمینی. مناسب آموزش قانون کپلر.',
    fields: [
      { k: 'speed', label: 'سرعت زمان', min: 0.2, max: 8, step: 0.2, def: 1 }
    ]
  },
  audio: {
    title: 'صوت و موج',
    desc: 'میکروفون + طیف فرکانس زنده، یا تولید موج سینوسی.',
    hint: 'اجازه دسترسی به میکروفون لازم است',
    note: 'Web Audio API · FFT برای طیف فرکانسی.',
    fields: [
      { k: 'freq', label: 'فرکانس تن (Hz)', min: 100, max: 2000, step: 10, def: 440 },
      { k: 'wave', label: 'نوع موج', type: 'select', options: [
        { v: 'sine', t: 'سینوسی' },
        { v: 'square', t: 'مربعی' },
        { v: 'sawtooth', t: 'اره‌ای' },
        { v: 'triangle', t: 'مثلثی' }
      ], def: 'sine' }
    ]
  },
  molecule: {
    title: 'شیمی مولکولی',
    desc: 'اتم‌ها را اضافه و جابه‌جا کنید؛ پیوندها خودکار تشکیل می‌شوند.',
    hint: 'کشیدن اتم روی بوم · انرژی تقریبی پیوند',
    note: 'انرژی پیوند آموزشی (kcal/mol). فرمول شیمیایی از شمارش اتم‌ها.',
    fields: []
  },
  vr: {
    title: 'حالت VR / WebXR',
    desc: 'آماده‌سازی ورود به فضای مجازی با هدست سازگار.',
    hint: 'نیاز به مرورگر و هدست WebXR',
    note: 'در دستگاه‌های پشتیبانی‌شده می‌توانید صحنه سه‌بعدی را در VR ببینید. در غیر این صورت همان نمای سه‌بعدی دسکتاپ فعال است.',
    fields: []
  }
};

function init() {
  bindModes();
  selectMode('motion3d');
  $('#btnRun').addEventListener('click', runCurrent);
  $('#btnReset').addEventListener('click', () => { selectMode(mode); });
  window.addEventListener('resize', () => {
    if (Scenes3D.onResize) Scenes3D.onResize();
    if (SolarSystem.resize) SolarSystem.resize();
  });
}

function bindModes() {
  $$('.mode').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.mode').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectMode(btn.dataset.mode);
    });
  });
}

function selectMode(m) {
  // cleanup previous
  AudioLab.stopMic();
  AudioLab.stopTone();
  SolarSystem.stop();
  MoleculeLab.stop();

  mode = m;
  const cfg = MODES[m];
  $('#ctrlTitle').textContent = cfg.title;
  $('#ctrlDesc').textContent = cfg.desc;
  $('#hint').textContent = cfg.hint || '';
  $('#note').textContent = cfg.note || '';
  $('#viewTitle').textContent = cfg.title;
  $('#viewHint').textContent = cfg.hint || '';

  // show 3d or 2d
  const use2d = (m === 'audio' || m === 'molecule');
  $('#view3d').style.display = use2d ? 'none' : 'block';
  $('#view2d').style.display = use2d ? 'block' : 'none';

  params = {};
  renderFields(cfg);
  setupScene();
  updateMetrics();
}

function renderFields(cfg) {
  const box = $('#controls');
  box.innerHTML = '';
  if (mode === 'molecule') {
    box.innerHTML = `<div class="mol-palette" id="molPalette">
      <div class="mol-atom" data-el="H">H</div>
      <div class="mol-atom" data-el="C">C</div>
      <div class="mol-atom" data-el="N">N</div>
      <div class="mol-atom" data-el="O">O</div>
      <div class="mol-atom" data-el="Cl">Cl</div>
    </div>
    <button class="btn btn-sec" id="molClear" style="width:100%">پاک کردن مولکول</button>`;
    $$('.mol-atom').forEach(el => {
      el.addEventListener('click', () => {
        const c = $('#view2d');
        MoleculeLab.addAtom(el.dataset.el, 80 + Math.random() * (c.width - 160), 60 + Math.random() * (c.height - 120));
        updateMetrics();
      });
    });
    $('#molClear').addEventListener('click', () => { MoleculeLab.clear(); updateMetrics(); });
    return;
  }
  if (mode === 'audio') {
    box.innerHTML = `
      <button class="btn btn-primary" id="micBtn" style="width:100%;margin-bottom:8px">🎙️ شروع میکروفون</button>
      <button class="btn btn-sec" id="toneBtn" style="width:100%;margin-bottom:8px">🔊 پخش تن</button>
      <button class="btn btn-sec" id="stopAudioBtn" style="width:100%;margin-bottom:8px">⏹ توقف صوت</button>
      <div class="freq-bars" id="freqBars"></div>`;
    AudioLab.makeBarStrip($('#freqBars'), 32);
    $('#micBtn').addEventListener('click', async () => {
      const r = await AudioLab.startMic($('#view2d'), $('#freqBars'));
      $('#note').textContent = r.ok ? 'میکروفون فعال — طیف فرکانس زنده.' : ('خطا: ' + r.error);
    });
    $('#toneBtn').addEventListener('click', () => {
      AudioLab.playTone(params.freq || 440, params.wave || 'sine');
    });
    $('#stopAudioBtn').addEventListener('click', () => {
      AudioLab.stopMic();
      AudioLab.stopTone();
    });
  }
  if (mode === 'vr') {
    box.innerHTML = `
      <button class="btn btn-primary" id="vrBtn" style="width:100%">ورود به VR (WebXR)</button>
      <p class="hint" style="margin-top:8px">اگر هدست متصل باشد، مرورگر اجازه ورود می‌دهد. در غیر این صورت از نمای سه‌بعدی عادی استفاده کنید.</p>`;
    $('#vrBtn').addEventListener('click', () => {
      const ok = Scenes3D.enableVR();
      $('#note').textContent = ok
        ? 'WebXR فعال شد (در صورت پشتیبانی مرورگر/هدست).'
        : 'WebXR در این محیط در دسترس نیست — نمای سه‌بعدی دسکتاپ فعال است.';
      // fallback: show atom scene in 3d
      $('#view3d').style.display = 'block';
      $('#view2d').style.display = 'none';
      Scenes3D.init($('#view3d'));
      Scenes3D.setupAtom(3);
      Scenes3D.startLoop();
    });
  }

  (cfg.fields || []).forEach(f => {
    params[f.k] = f.def;
    const div = document.createElement('div');
    div.className = 'field';
    if (f.type === 'select') {
      div.innerHTML = `<label>${f.label}</label>
        <select id="f-${f.k}">${f.options.map(o => `<option value="${o.v}" ${o.v===f.def?'selected':''}>${o.t}</option>`).join('')}</select>`;
      box.appendChild(div);
      div.querySelector('select').addEventListener('change', e => {
        params[f.k] = e.target.value;
        setupScene();
        updateMetrics();
      });
    } else {
      div.innerHTML = `<label>${f.label} <output id="o-${f.k}">${f.def}</output></label>
        <input type="range" id="f-${f.k}" min="${f.min}" max="${f.max}" step="${f.step}" value="${f.def}">`;
      box.appendChild(div);
      const inp = div.querySelector('input');
      const out = div.querySelector('output');
      inp.addEventListener('input', () => {
        params[f.k] = Number(inp.value);
        out.textContent = params[f.k];
        onParamChange();
        updateMetrics();
      });
    }
  });
}

function setupScene() {
  if (mode === 'motion3d') {
    Scenes3D.init($('#view3d'));
    Scenes3D.setupMotion({ v0: params.v0 || 8, a: params.a || 2, t: params.t || 6 });
    Scenes3D.startLoop();
  } else if (mode === 'physics') {
    Scenes3D.init($('#view3d'));
    const type = params.type || 'bounce';
    Scenes3D.setupPhysics(type, { k: params.k || 80, drag: params.drag || 0.15, h: 5 });
    Scenes3D.startLoop();
  } else if (mode === 'atom') {
    Scenes3D.init($('#view3d'));
    Scenes3D.setupAtom(params.n || 3);
    Scenes3D.startLoop();
  } else if (mode === 'solar') {
    SolarSystem.init($('#view3d'));
    SolarSystem.setTimeScale(params.speed || 1);
    SolarSystem.start();
  } else if (mode === 'molecule') {
    const c = $('#view2d');
    const ratio = window.devicePixelRatio || 1;
    c.width = c.clientWidth * ratio;
    c.height = 420 * ratio;
    c.style.height = '420px';
    const ctx = c.getContext('2d');
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    // fix: molecule uses canvas pixel coords — set logical size
    c.width = Math.max(400, c.clientWidth);
    c.height = 420;
    MoleculeLab.init(c);
  } else if (mode === 'audio') {
    const c = $('#view2d');
    c.width = Math.max(400, c.clientWidth);
    c.height = 420;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#080e1a';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = '#8aa0b8';
    ctx.font = '14px Tahoma';
    ctx.fillText('میکروفون را از پنل شروع کنید یا تن پخش کنید', 20, 40);
  } else if (mode === 'vr') {
    // wait for button
    const el = $('#view3d');
    el.innerHTML = '<p style="padding:24px;color:#8aa0b8;text-align:center">دکمه ورود به VR را بزنید یا از سایر حالت‌های سه‌بعدی استفاده کنید.</p>';
  }
}

function onParamChange() {
  if (mode === 'motion3d') {
    Scenes3D.setMotionParams({ v0: params.v0, a: params.a, t: params.t });
  } else if (mode === 'solar') {
    SolarSystem.setTimeScale(params.speed || 1);
  } else if (mode === 'audio') {
    AudioLab.setToneFreq(params.freq || 440);
  } else if (mode === 'atom') {
    Scenes3D.setupAtom(params.n || 3);
  } else if (mode === 'physics') {
    Scenes3D.setupPhysics(params.type || 'bounce', { k: params.k, drag: params.drag });
  }
}

function runCurrent() {
  if (mode === 'physics') {
    Scenes3D.setupPhysics(params.type || 'bounce', { k: params.k, drag: params.drag });
  } else if (mode === 'motion3d') {
    Scenes3D.setMotionParams({ v0: params.v0, a: params.a, t: params.t });
  } else if (mode === 'atom') {
    Scenes3D.setupAtom(params.n || 3);
  }
  updateMetrics();
}

function updateMetrics() {
  const box = $('#metrics');
  let html = '';
  if (mode === 'motion3d') {
    const v0 = params.v0 || 8, a = params.a || 2, t = params.t || 6;
    const x = v0 * t + 0.5 * a * t * t;
    const v = v0 + a * t;
    html = metric('جابه‌جایی', x.toFixed(2), 'm') + metric('سرعت نهایی', v.toFixed(2), 'm/s') + metric('زمان', t.toFixed(1), 's');
  } else if (mode === 'physics') {
    const w = Scenes3D.getWorld && Scenes3D.getWorld();
    const n = w ? w.particles.length : 0;
    html = metric('ذرات', n, '') + metric('نوع', params.type || 'bounce', '') + metric('g', '9.81', 'm/s²');
  } else if (mode === 'atom') {
    const n = params.n || 3;
    html = metric('پوسته‌ها', n, '') + metric('Eₙ (تقریبی)', (-13.6 / (n * n)).toFixed(2), 'eV');
  } else if (mode === 'solar') {
    html = metric('سیارات', '8', '') + metric('مقیاس زمان', (params.speed || 1).toFixed(1), '×');
  } else if (mode === 'molecule') {
    html = metric('فرمول', MoleculeLab.formula(), '') +
      metric('پیوندها', MoleculeLab.bonds().length, '') +
      metric('انرژی ≈', MoleculeLab.energy().toFixed(0), 'kcal/mol');
  } else if (mode === 'audio') {
    html = metric('فرکانس تن', params.freq || 440, 'Hz') + metric('موج', params.wave || 'sine', '');
  } else {
    html = metric('حالت', mode, '');
  }
  box.innerHTML = html;
}

function metric(l, v, u) {
  return `<div class="metric"><div class="l">${l}</div><div class="v">${v} ${u || ''}</div></div>`;
}

// periodic metrics refresh for molecule / physics
setInterval(() => {
  if (mode === 'molecule' || mode === 'physics') updateMetrics();
}, 500);

document.addEventListener('DOMContentLoaded', init);
})();
