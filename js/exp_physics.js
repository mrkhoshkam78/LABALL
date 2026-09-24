const EXP_PHYSICS = {

    titleFa: 'فیزیک و حرکت', titleEn: 'Physics & Motion', icon: '⚙️',
    experiments: {
      kinematics: {
        nameFa: 'حرکت با شتاب ثابت', nameEn: 'Constant acceleration',
        formula: 'x = v₀t + ½at²  ·  v = v₀ + at',
        descFa: 'جابه‌جایی و سرعت نهایی با شتاب ثابت.',
        descEn: 'Displacement and final velocity under constant acceleration.',
        fields: [
          {k:'v', fa:'سرعت اولیه', en:'Initial velocity', u:'m/s', min:-20, max:40, step:0.5, def:8},
          {k:'a', fa:'شتاب', en:'Acceleration', u:'m/s²', min:-10, max:15, step:0.5, def:2},
          {k:'t', fa:'زمان', en:'Time', u:'s', min:0.5, max:25, step:0.5, def:6}
        ],
        calc: v => {
          const vel = v.v + v.a * v.t;
          const x = v.v * v.t + 0.5 * v.a * v.t * v.t;
          return [
            {fa:'جابه‌جایی', en:'Displacement', val:x.toFixed(2), u:'m'},
            {fa:'سرعت نهایی', en:'Final velocity', val:vel.toFixed(2), u:'m/s'},
            {fa:'زمان', en:'Time', val:v.t.toFixed(1), u:'s'}
          ];
        },
        explainFa: v => `در ${v.t} s با v₀=${v.v} و a=${v.a} → x = ${(v.v*v.t+0.5*v.a*v.t*v.t).toFixed(2)} m`,
        explainEn: v => `At t=${v.t}s with v₀=${v.v}, a=${v.a} → x=${(v.v*v.t+0.5*v.a*v.t*v.t).toFixed(2)} m`
      },
      freefall: {
        nameFa: 'سقوط آزاد', nameEn: 'Free fall',
        formula: 'h = ½gt²  ·  v = gt  ·  t = √(2h/g)',
        descFa: 'سقوط از ارتفاع بدون مقاومت هوا.',
        descEn: 'Fall from height with no air resistance.',
        fields: [
          {k:'h', fa:'ارتفاع', en:'Height', u:'m', min:1, max:200, step:1, def:50},
          {k:'g', fa:'شتاب گرانش', en:'Gravity g', u:'m/s²', min:1, max:20, step:0.1, def:9.81}
        ],
        calc: v => {
          const t = Math.sqrt(2 * v.h / v.g);
          const vel = v.g * t;
          return [
            {fa:'زمان سقوط', en:'Fall time', val:t.toFixed(2), u:'s'},
            {fa:'سرعت برخورد', en:'Impact speed', val:vel.toFixed(2), u:'m/s'},
            {fa:'ارتفاع', en:'Height', val:v.h.toFixed(0), u:'m'}
          ];
        },
        explainFa: v => `از ${v.h} m با g=${v.g} → t=${Math.sqrt(2*v.h/v.g).toFixed(2)} s`,
        explainEn: v => `From ${v.h} m at g=${v.g} → t=${Math.sqrt(2*v.h/v.g).toFixed(2)} s`
      },
      projectile: {
        nameFa: 'پرتابه', nameEn: 'Projectile',
        formula: 'R = v₀²sin2θ/g  ·  H = v₀²sin²θ/(2g)',
        descFa: 'برد و ارتفاع بیشینه پرتابه.',
        descEn: 'Range and max height of a projectile.',
        fields: [
          {k:'v0', fa:'سرعت اولیه', en:'Initial speed', u:'m/s', min:5, max:80, step:1, def:30},
          {k:'theta', fa:'زاویه', en:'Angle', u:'°', min:5, max:85, step:1, def:45},
          {k:'g', fa:'g', en:'g', u:'m/s²', min:5, max:15, step:0.1, def:9.81}
        ],
        calc: v => {
          const th = v.theta * Math.PI / 180;
          const R = (v.v0 ** 2 * Math.sin(2 * th)) / v.g;
          const H = (v.v0 ** 2 * Math.sin(th) ** 2) / (2 * v.g);
          const T = (2 * v.v0 * Math.sin(th)) / v.g;
          return [
            {fa:'برد', en:'Range', val:R.toFixed(1), u:'m'},
            {fa:'ارتفاع بیشینه', en:'Max height', val:H.toFixed(1), u:'m'},
            {fa:'زمان پرواز', en:'Flight time', val:T.toFixed(2), u:'s'}
          ];
        },
        explainFa: v => `v₀=${v.v0} در ${v.theta}° → برد ${(v.v0**2*Math.sin(2*v.theta*Math.PI/180)/v.g).toFixed(1)} m`,
        explainEn: v => `v₀=${v.v0} at ${v.theta}° → range ${(v.v0**2*Math.sin(2*v.theta*Math.PI/180)/v.g).toFixed(1)} m`
      },
      circular: {
        nameFa: 'حرکت دایره‌ای', nameEn: 'Uniform circular',
        formula: 'aᶜ = v²/r  ·  T = 2πr/v  ·  F = mv²/r',
        descFa: 'شتاب مرکزگرا و نیروی لازم.',
        descEn: 'Centripetal acceleration and force.',
        fields: [
          {k:'v', fa:'سرعت', en:'Speed', u:'m/s', min:1, max:50, step:0.5, def:10},
          {k:'r', fa:'شعاع', en:'Radius', u:'m', min:0.5, max:50, step:0.5, def:5},
          {k:'m', fa:'جرم', en:'Mass', u:'kg', min:0.1, max:20, step:0.1, def:2}
        ],
        calc: v => {
          const ac = v.v ** 2 / v.r;
          const T = 2 * Math.PI * v.r / v.v;
          const F = v.m * ac;
          return [
            {fa:'شتاب مرکزگرا', en:'Centripetal a', val:ac.toFixed(2), u:'m/s²'},
            {fa:'دوره تناوب', en:'Period', val:T.toFixed(2), u:'s'},
            {fa:'نیروی مرکزگرا', en:'Centripetal F', val:F.toFixed(2), u:'N'}
          ];
        },
        explainFa: v => `v=${v.v}, r=${v.r} → aᶜ=${(v.v**2/v.r).toFixed(2)} m/s²`,
        explainEn: v => `v=${v.v}, r=${v.r} → aᶜ=${(v.v**2/v.r).toFixed(2)} m/s²`
      },
      momentum: {
        nameFa: 'تکانه و برخورد', nameEn: 'Momentum & collision',
        formula: 'p = mv  ·  elastic: v₁′ , v₂′ conserved p & KE',
        descFa: 'برخورد کاملاً کشسان یک‌بعدی.',
        descEn: '1-D perfectly elastic collision.',
        fields: [
          {k:'m1', fa:'جرم ۱', en:'Mass 1', u:'kg', min:0.1, max:20, step:0.1, def:2},
          {k:'v1', fa:'سرعت ۱', en:'Velocity 1', u:'m/s', min:-20, max:20, step:0.5, def:5},
          {k:'m2', fa:'جرم ۲', en:'Mass 2', u:'kg', min:0.1, max:20, step:0.1, def:3},
          {k:'v2', fa:'سرعت ۲', en:'Velocity 2', u:'m/s', min:-20, max:20, step:0.5, def:-2}
        ],
        calc: v => {
          const p = v.m1 * v.v1 + v.m2 * v.v2;
          const v1f = ((v.m1 - v.m2) * v.v1 + 2 * v.m2 * v.v2) / (v.m1 + v.m2);
          const v2f = ((v.m2 - v.m1) * v.v2 + 2 * v.m1 * v.v1) / (v.m1 + v.m2);
          return [
            {fa:'تکانه کل', en:'Total p', val:p.toFixed(2), u:'kg·m/s'},
            {fa:'v₁ نهایی', en:'Final v₁', val:v1f.toFixed(2), u:'m/s'},
            {fa:'v₂ نهایی', en:'Final v₂', val:v2f.toFixed(2), u:'m/s'}
          ];
        },
        explainFa: v => `p کل = ${(v.m1*v.v1+v.m2*v.v2).toFixed(2)} محفوظ است.`,
        explainEn: v => `Total p = ${(v.m1*v.v1+v.m2*v.v2).toFixed(2)} is conserved.`
      },
      friction: {
        nameFa: 'اصطکاک', nameEn: 'Friction',
        formula: 'fₖ = μₖmg  ·  a = −μₖg  ·  s = v₀²/(2μₖg)',
        descFa: 'نیروی اصطکاک جنبشی و مسافت توقف.',
        descEn: 'Kinetic friction force and stopping distance.',
        fields: [
          {k:'m', fa:'جرم', en:'Mass', u:'kg', min:0.5, max:50, step:0.5, def:5},
          {k:'mu', fa:'μₖ', en:'μₖ', u:'—', min:0.05, max:1, step:0.01, def:0.3},
          {k:'v0', fa:'سرعت اولیه', en:'Initial speed', u:'m/s', min:1, max:30, step:0.5, def:10}
        ],
        calc: v => {
          const f = v.mu * v.m * CONST.G_EARTH;
          const a = -v.mu * CONST.G_EARTH;
          const s = (v.v0 ** 2) / (2 * v.mu * CONST.G_EARTH);
          return [
            {fa:'نیروی اصطکاک', en:'Friction force', val:f.toFixed(2), u:'N'},
            {fa:'شتاب', en:'Acceleration', val:a.toFixed(2), u:'m/s²'},
            {fa:'مسافت توقف', en:'Stopping distance', val:s.toFixed(2), u:'m'}
          ];
        },
        explainFa: v => `μₖ=${v.mu}, v₀=${v.v0} → s=${(v.v0**2/(2*v.mu*CONST.G_EARTH)).toFixed(2)} m`,
        explainEn: v => `μₖ=${v.mu}, v₀=${v.v0} → s=${(v.v0**2/(2*v.mu*CONST.G_EARTH)).toFixed(2)} m`
      },
      spring: {
        nameFa: 'نوسانگر فنر', nameEn: 'Spring oscillator',
        formula: 'T = 2π√(m/k)  ·  ω = √(k/m)  ·  E = ½kA²',
        descFa: 'دوره، بسامد زاویه‌ای و انرژی.',
        descEn: 'Period, angular frequency and energy.',
        fields: [
          {k:'m', fa:'جرم', en:'Mass', u:'kg', min:0.1, max:10, step:0.1, def:1},
          {k:'k', fa:'ثابت فنر', en:'Spring k', u:'N/m', min:10, max:500, step:5, def:100},
          {k:'A', fa:'دامنه', en:'Amplitude', u:'m', min:0.01, max:1, step:0.01, def:0.2}
        ],
        calc: v => {
          const T = 2 * Math.PI * Math.sqrt(v.m / v.k);
          const omega = Math.sqrt(v.k / v.m);
          const E = 0.5 * v.k * v.A * v.A;
          return [
            {fa:'دوره تناوب', en:'Period', val:T.toFixed(3), u:'s'},
            {fa:'ω', en:'ω', val:omega.toFixed(2), u:'rad/s'},
            {fa:'انرژی کل', en:'Total energy', val:E.toFixed(3), u:'J'}
          ];
        },
        explainFa: v => `k=${v.k}, m=${v.m} → T=${(2*Math.PI*Math.sqrt(v.m/v.k)).toFixed(3)} s`,
        explainEn: v => `k=${v.k}, m=${v.m} → T=${(2*Math.PI*Math.sqrt(v.m/v.k)).toFixed(3)} s`
      },
      torque: {
        nameFa: 'گشتاور', nameEn: 'Torque',
        formula: 'τ = r F sinθ',
        descFa: 'گشتاور نیرو در فاصله r.',
        descEn: 'Torque of a force at distance r.',
        fields: [
          {k:'F', fa:'نیرو', en:'Force', u:'N', min:1, max:200, step:1, def:50},
          {k:'r', fa:'بازو', en:'Lever arm', u:'m', min:0.1, max:5, step:0.1, def:1},
          {k:'theta', fa:'زاویه', en:'Angle', u:'°', min:0, max:90, step:1, def:90}
        ],
        calc: v => {
          const tau = v.r * v.F * Math.sin(v.theta * Math.PI / 180);
          return [
            {fa:'گشتاور', en:'Torque', val:tau.toFixed(2), u:'N·m'},
            {fa:'مؤلفه عمود', en:'Perp. component', val:(v.F*Math.sin(v.theta*Math.PI/180)).toFixed(2), u:'N'},
            {fa:'بازو', en:'Arm', val:v.r.toFixed(2), u:'m'}
          ];
        },
        explainFa: v => `τ = ${v.r}×${v.F}×sin(${v.theta}°) = ${(v.r*v.F*Math.sin(v.theta*Math.PI/180)).toFixed(2)} N·m`,
        explainEn: v => `τ = ${v.r}×${v.F}×sin(${v.theta}°) = ${(v.r*v.F*Math.sin(v.theta*Math.PI/180)).toFixed(2)} N·m`
      },
      density: {
        nameFa: 'چگالی و شناوری', nameEn: 'Density & buoyancy',
        formula: 'ρ = m/V  ·  Fᵦ = ρ_fluid V g',
        descFa: 'چگالی جسم و نیروی شناوری.',
        descEn: 'Object density and buoyant force.',
        fields: [
          {k:'m', fa:'جرم', en:'Mass', u:'kg', min:0.1, max:50, step:0.1, def:5},
          {k:'V', fa:'حجم', en:'Volume', u:'m³', min:0.001, max:0.5, step:0.001, def:0.01},
          {k:'rho_f', fa:'چگالی سیال', en:'Fluid density', u:'kg/m³', min:500, max:1500, step:10, def:1000}
        ],
        calc: v => {
          const rho = v.m / v.V;
          const Fb = v.rho_f * v.V * CONST.G_EARTH;
          const sinks = rho > v.rho_f;
          return [
            {fa:'چگالی جسم', en:'Object density', val:rho.toFixed(1), u:'kg/m³'},
            {fa:'نیروی شناوری', en:'Buoyant force', val:Fb.toFixed(2), u:'N'},
            {fa:'وضعیت', en:'Status', val:sinks ? (document.documentElement.lang==='en'?'Sinks':'فرومی‌رود') : (document.documentElement.lang==='en'?'Floats':'شناور'), u:''}
          ];
        },
        explainFa: v => `ρ=${(v.m/v.V).toFixed(1)} → ${v.m/v.V > v.rho_f ? 'فرومی‌رود' : 'شناور'}`,
        explainEn: v => `ρ=${(v.m/v.V).toFixed(1)} → ${v.m/v.V > v.rho_f ? 'Sinks' : 'Floats'}`
      },
      workpower: {
        nameFa: 'کار و توان', nameEn: 'Work & power',
        formula: 'W = Fd cosθ  ·  P = W/t',
        descFa: 'کار انجام‌شده و توان متوسط.',
        descEn: 'Work done and average power.',
        fields: [
          {k:'F', fa:'نیرو', en:'Force', u:'N', min:1, max:500, step:1, def:100},
          {k:'d', fa:'جابه‌جایی', en:'Displacement', u:'m', min:0.5, max:50, step:0.5, def:10},
          {k:'theta', fa:'زاویه', en:'Angle', u:'°', min:0, max:90, step:5, def:0},
          {k:'t', fa:'زمان', en:'Time', u:'s', min:0.5, max:60, step:0.5, def:5}
        ],
        calc: v => {
          const W = v.F * v.d * Math.cos(v.theta * Math.PI / 180);
          const P = W / v.t;
          return [
            {fa:'کار', en:'Work', val:W.toFixed(1), u:'J'},
            {fa:'توان', en:'Power', val:P.toFixed(1), u:'W'},
            {fa:'توان (hp)', en:'Power (hp)', val:(P/745.7).toFixed(3), u:'hp'}
          ];
        },
        explainFa: v => `W=${(v.F*v.d*Math.cos(v.theta*Math.PI/180)).toFixed(1)} J · P=${(v.F*v.d*Math.cos(v.theta*Math.PI/180)/v.t).toFixed(1)} W`,
        explainEn: v => `W=${(v.F*v.d*Math.cos(v.theta*Math.PI/180)).toFixed(1)} J · P=${(v.F*v.d*Math.cos(v.theta*Math.PI/180)/v.t).toFixed(1)} W`
      }
    }
};
