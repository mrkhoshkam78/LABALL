// Universal Lab v7 — All classic experiments + 5 new per major section
// Formulas verified / optimized

const CATEGORIES = {
  physics: {
    titleFa: 'فیزیک و حرکت', titleEn: 'Physics', icon: '⚙️',
    experiments: {
      kinematics: {
        nameFa: 'شتاب ثابت', nameEn: 'Constant accel.',
        formula: 'x=v₀t+½at² · v=v₀+at',
        descFa: 'جابه‌جایی و سرعت نهایی.', descEn: 'Displacement and final velocity.',
        fields: [
          {k:'v',fa:'سرعت اولیه',en:'v₀',u:'m/s',min:-20,max:40,step:0.5,def:8},
          {k:'a',fa:'شتاب',en:'a',u:'m/s²',min:-10,max:15,step:0.5,def:2},
          {k:'t',fa:'زمان',en:'t',u:'s',min:0.5,max:25,step:0.5,def:6}
        ],
        calc: v => {
          const vel=v.v+v.a*v.t, x=v.v*v.t+0.5*v.a*v.t*v.t;
          return [{fa:'جابه‌جایی',en:'x',val:x.toFixed(2),u:'m'},{fa:'سرعت نهایی',en:'v',val:vel.toFixed(2),u:'m/s'},{fa:'زمان',en:'t',val:v.t.toFixed(1),u:'s'}];
        },
        explainFa: v=>`x=${(v.v*v.t+0.5*v.a*v.t*v.t).toFixed(2)} m`,
        explainEn: v=>`x=${(v.v*v.t+0.5*v.a*v.t*v.t).toFixed(2)} m`
      },
      freefall: {
        nameFa: 'سقوط آزاد', nameEn: 'Free fall',
        formula: 't=√(2h/g) · v=gt',
        descFa: 'سقوط بدون مقاومت هوا.', descEn: 'Fall without air resistance.',
        fields: [
          {k:'h',fa:'ارتفاع',en:'h',u:'m',min:1,max:200,step:1,def:50},
          {k:'g',fa:'g',en:'g',u:'m/s²',min:1,max:20,step:0.1,def:9.81}
        ],
        calc: v => {
          const t=Math.sqrt(2*v.h/v.g), vel=v.g*t;
          return [{fa:'زمان',en:'t',val:t.toFixed(2),u:'s'},{fa:'سرعت برخورد',en:'v',val:vel.toFixed(2),u:'m/s'}];
        },
        explainFa: v=>`t=${Math.sqrt(2*v.h/v.g).toFixed(2)} s`,
        explainEn: v=>`t=${Math.sqrt(2*v.h/v.g).toFixed(2)} s`
      },
      projectile: {
        nameFa: 'پرتابه', nameEn: 'Projectile',
        formula: 'R=v₀²sin2θ/g · H=v₀²sin²θ/(2g)',
        descFa: 'برد و ارتفاع بیشینه.', descEn: 'Range and max height.',
        fields: [
          {k:'v0',fa:'سرعت',en:'v₀',u:'m/s',min:5,max:80,step:1,def:30},
          {k:'theta',fa:'زاویه',en:'θ',u:'°',min:5,max:85,step:1,def:45},
          {k:'g',fa:'g',en:'g',u:'m/s²',min:5,max:15,step:0.1,def:9.81}
        ],
        calc: v => {
          const th=v.theta*Math.PI/180;
          const R=(v.v0**2*Math.sin(2*th))/v.g;
          const H=(v.v0**2*Math.sin(th)**2)/(2*v.g);
          const T=(2*v.v0*Math.sin(th))/v.g;
          return [{fa:'برد',en:'R',val:R.toFixed(1),u:'m'},{fa:'ارتفاع',en:'H',val:H.toFixed(1),u:'m'},{fa:'زمان پرواز',en:'T',val:T.toFixed(2),u:'s'}];
        },
        explainFa: v=>`R=${((v.v0**2*Math.sin(2*v.theta*Math.PI/180))/v.g).toFixed(1)} m`,
        explainEn: v=>`R=${((v.v0**2*Math.sin(2*v.theta*Math.PI/180))/v.g).toFixed(1)} m`
      },
      circular: {
        nameFa: 'حرکت دایره‌ای', nameEn: 'Circular motion',
        formula: 'aᶜ=v²/r · F=mv²/r · T=2πr/v',
        descFa: 'شتاب و نیروی مرکزگرا.', descEn: 'Centripetal a and F.',
        fields: [
          {k:'v',fa:'سرعت',en:'v',u:'m/s',min:1,max:50,step:0.5,def:10},
          {k:'r',fa:'شعاع',en:'r',u:'m',min:0.5,max:50,step:0.5,def:5},
          {k:'m',fa:'جرم',en:'m',u:'kg',min:0.1,max:20,step:0.1,def:2}
        ],
        calc: v => {
          const ac=v.v**2/v.r, T=2*Math.PI*v.r/v.v, F=v.m*ac;
          return [{fa:'aᶜ',en:'aᶜ',val:ac.toFixed(2),u:'m/s²'},{fa:'T',en:'T',val:T.toFixed(2),u:'s'},{fa:'F',en:'F',val:F.toFixed(2),u:'N'}];
        },
        explainFa: v=>`aᶜ=${(v.v**2/v.r).toFixed(2)}`,
        explainEn: v=>`aᶜ=${(v.v**2/v.r).toFixed(2)}`
      },
      momentum: {
        nameFa: 'برخورد کشسان', nameEn: 'Elastic collision',
        formula: 'p=mv · v₁′,v₂′ از پایستگی p و KE',
        descFa: 'برخورد یک‌بعدی کاملاً کشسان.', descEn: '1D elastic collision.',
        fields: [
          {k:'m1',fa:'m₁',en:'m₁',u:'kg',min:0.1,max:20,step:0.1,def:2},
          {k:'v1',fa:'v₁',en:'v₁',u:'m/s',min:-20,max:20,step:0.5,def:5},
          {k:'m2',fa:'m₂',en:'m₂',u:'kg',min:0.1,max:20,step:0.1,def:3},
          {k:'v2',fa:'v₂',en:'v₂',u:'m/s',min:-20,max:20,step:0.5,def:-2}
        ],
        calc: v => {
          const p=v.m1*v.v1+v.m2*v.v2;
          const v1f=((v.m1-v.m2)*v.v1+2*v.m2*v.v2)/(v.m1+v.m2);
          const v2f=((v.m2-v.m1)*v.v2+2*v.m1*v.v1)/(v.m1+v.m2);
          return [{fa:'p کل',en:'p',val:p.toFixed(2),u:'kg·m/s'},{fa:'v₁′',en:'v₁′',val:v1f.toFixed(2),u:'m/s'},{fa:'v₂′',en:'v₂′',val:v2f.toFixed(2),u:'m/s'}];
        },
        explainFa: v=>`p=${(v.m1*v.v1+v.m2*v.v2).toFixed(2)}`,
        explainEn: v=>`p=${(v.m1*v.v1+v.m2*v.v2).toFixed(2)}`
      },
      friction: {
        nameFa: 'اصطکاک', nameEn: 'Friction',
        formula: 'f=μmg · s=v₀²/(2μg)',
        descFa: 'مسافت توقف.', descEn: 'Stopping distance.',
        fields: [
          {k:'m',fa:'جرم',en:'m',u:'kg',min:0.5,max:50,step:0.5,def:5},
          {k:'mu',fa:'μ',en:'μ',u:'—',min:0.05,max:1,step:0.01,def:0.3},
          {k:'v0',fa:'v₀',en:'v₀',u:'m/s',min:1,max:30,step:0.5,def:10}
        ],
        calc: v => {
          const f=v.mu*v.m*CONST.G_EARTH, s=(v.v0**2)/(2*v.mu*CONST.G_EARTH);
          return [{fa:'f',en:'f',val:f.toFixed(2),u:'N'},{fa:'مسافت توقف',en:'s',val:s.toFixed(2),u:'m'}];
        },
        explainFa: v=>`s=${(v.v0**2/(2*v.mu*CONST.G_EARTH)).toFixed(2)} m`,
        explainEn: v=>`s=${(v.v0**2/(2*v.mu*CONST.G_EARTH)).toFixed(2)} m`
      },
      spring: {
        nameFa: 'نوسانگر فنر', nameEn: 'Spring SHM',
        formula: 'T=2π√(m/k) · E=½kA²',
        descFa: 'دوره و انرژی.', descEn: 'Period and energy.',
        fields: [
          {k:'m',fa:'جرم',en:'m',u:'kg',min:0.1,max:10,step:0.1,def:1},
          {k:'k',fa:'k',en:'k',u:'N/m',min:10,max:500,step:5,def:100},
          {k:'A',fa:'دامنه',en:'A',u:'m',min:0.01,max:1,step:0.01,def:0.2}
        ],
        calc: v => {
          const T=2*Math.PI*Math.sqrt(v.m/v.k), E=0.5*v.k*v.A*v.A;
          return [{fa:'T',en:'T',val:T.toFixed(3),u:'s'},{fa:'E',en:'E',val:E.toFixed(3),u:'J'}];
        },
        explainFa: v=>`T=${(2*Math.PI*Math.sqrt(v.m/v.k)).toFixed(3)} s`,
        explainEn: v=>`T=${(2*Math.PI*Math.sqrt(v.m/v.k)).toFixed(3)} s`
      },
      torque: {
        nameFa: 'گشتاور', nameEn: 'Torque',
        formula: 'τ=rF sinθ',
        descFa: 'گشتاور نیرو.', descEn: 'Force torque.',
        fields: [
          {k:'F',fa:'نیرو',en:'F',u:'N',min:1,max:200,step:1,def:50},
          {k:'r',fa:'بازو',en:'r',u:'m',min:0.1,max:5,step:0.1,def:1},
          {k:'theta',fa:'زاویه',en:'θ',u:'°',min:0,max:90,step:1,def:90}
        ],
        calc: v => {
          const tau=v.r*v.F*Math.sin(v.theta*Math.PI/180);
          return [{fa:'τ',en:'τ',val:tau.toFixed(2),u:'N·m'}];
        },
        explainFa: v=>`τ=${(v.r*v.F*Math.sin(v.theta*Math.PI/180)).toFixed(2)}`,
        explainEn: v=>`τ=${(v.r*v.F*Math.sin(v.theta*Math.PI/180)).toFixed(2)}`
      },
      density: {
        nameFa: 'چگالی و شناوری', nameEn: 'Density',
        formula: 'ρ=m/V · Fᵦ=ρ_f V g',
        descFa: 'شناوری.', descEn: 'Buoyancy.',
        fields: [
          {k:'m',fa:'جرم',en:'m',u:'kg',min:0.1,max:50,step:0.1,def:5},
          {k:'V',fa:'حجم',en:'V',u:'m³',min:0.001,max:0.5,step:0.001,def:0.01},
          {k:'rho_f',fa:'ρ سیال',en:'ρ_f',u:'kg/m³',min:500,max:1500,step:10,def:1000}
        ],
        calc: v => {
          const rho=v.m/v.V, Fb=v.rho_f*v.V*CONST.G_EARTH;
          return [{fa:'ρ',en:'ρ',val:rho.toFixed(1),u:'kg/m³'},{fa:'Fᵦ',en:'Fᵦ',val:Fb.toFixed(2),u:'N'},{fa:'وضعیت',en:'status',val:rho>v.rho_f?'غرق':'شناور',u:''}];
        },
        explainFa: v=>`ρ=${(v.m/v.V).toFixed(1)}`,
        explainEn: v=>`ρ=${(v.m/v.V).toFixed(1)}`
      },
      workpower: {
        nameFa: 'کار و توان', nameEn: 'Work & power',
        formula: 'W=Fd cosθ · P=W/t',
        descFa: 'کار و توان.', descEn: 'Work and power.',
        fields: [
          {k:'F',fa:'نیرو',en:'F',u:'N',min:1,max:500,step:1,def:100},
          {k:'d',fa:'جابه‌جایی',en:'d',u:'m',min:0.5,max:50,step:0.5,def:10},
          {k:'theta',fa:'زاویه',en:'θ',u:'°',min:0,max:90,step:5,def:0},
          {k:'t',fa:'زمان',en:'t',u:'s',min:0.5,max:60,step:0.5,def:5}
        ],
        calc: v => {
          const W=v.F*v.d*Math.cos(v.theta*Math.PI/180), P=W/v.t;
          return [{fa:'W',en:'W',val:W.toFixed(1),u:'J'},{fa:'P',en:'P',val:P.toFixed(1),u:'W'}];
        },
        explainFa: v=>`W=${(v.F*v.d*Math.cos(v.theta*Math.PI/180)).toFixed(1)} J`,
        explainEn: v=>`W=${(v.F*v.d*Math.cos(v.theta*Math.PI/180)).toFixed(1)} J`
      },
      // NEW ×5
      terminal_velocity: {
        nameFa: 'سرعت حد', nameEn: 'Terminal velocity',
        formula: 'v_t = √(2mg/(ρAC_d))',
        descFa: 'سرعت حد با مقاومت هوا.', descEn: 'Terminal speed with drag.',
        fields: [
          {k:'m',fa:'جرم',en:'m',u:'kg',min:0.1,max:100,step:0.1,def:80},
          {k:'A',fa:'مساحت',en:'A',u:'m²',min:0.1,max:2,step:0.05,def:0.7},
          {k:'Cd',fa:'C_d',en:'C_d',u:'—',min:0.1,max:2,step:0.05,def:1.0},
          {k:'rho',fa:'ρ هوا',en:'ρ',u:'kg/m³',min:0.5,max:1.5,step:0.01,def:1.2}
        ],
        calc: v => {
          const vt=Math.sqrt((2*v.m*CONST.G_EARTH)/(v.rho*v.A*v.Cd));
          return [{fa:'v_t',en:'v_t',val:vt.toFixed(2),u:'m/s'},{fa:'km/h',en:'km/h',val:(vt*3.6).toFixed(1),u:'km/h'}];
        },
        explainFa: v=>`v_t=${Math.sqrt((2*v.m*CONST.G_EARTH)/(v.rho*v.A*v.Cd)).toFixed(2)} m/s`,
        explainEn: v=>`v_t=${Math.sqrt((2*v.m*CONST.G_EARTH)/(v.rho*v.A*v.Cd)).toFixed(2)} m/s`
      },
      banked_curve: {
        nameFa: 'پیچ شیب‌دار', nameEn: 'Banked curve',
        formula: 'v = √(rg tanθ)',
        descFa: 'سرعت ایده‌آل پیچ بدون اصطکاک.', descEn: 'Ideal banked curve speed.',
        fields: [
          {k:'r',fa:'شعاع',en:'r',u:'m',min:10,max:500,step:5,def:50},
          {k:'theta',fa:'زاویه شیب',en:'θ',u:'°',min:5,max:45,step:1,def:15},
          {k:'g',fa:'g',en:'g',u:'m/s²',min:5,max:15,step:0.1,def:9.81}
        ],
        calc: v => {
          const vel=Math.sqrt(v.r*v.g*Math.tan(v.theta*Math.PI/180));
          return [{fa:'v ایده‌آل',en:'v',val:vel.toFixed(2),u:'m/s'},{fa:'km/h',en:'km/h',val:(vel*3.6).toFixed(1),u:''}];
        },
        explainFa: v=>`v=√(rg tanθ)=${Math.sqrt(v.r*v.g*Math.tan(v.theta*Math.PI/180)).toFixed(2)}`,
        explainEn: v=>`v=√(rg tanθ)=${Math.sqrt(v.r*v.g*Math.tan(v.theta*Math.PI/180)).toFixed(2)}`
      },
      impulse: {
        nameFa: 'ضربه و تکانه', nameEn: 'Impulse',
        formula: 'J = FΔt = Δp',
        descFa: 'رابطه ضربه و تغییر تکانه.', descEn: 'Impulse equals change in momentum.',
        fields: [
          {k:'F',fa:'نیرو',en:'F',u:'N',min:1,max:5000,step:10,def:500},
          {k:'dt',fa:'Δt',en:'Δt',u:'s',min:0.001,max:2,step:0.001,def:0.05},
          {k:'m',fa:'جرم',en:'m',u:'kg',min:0.1,max:50,step:0.1,def:1}
        ],
        calc: v => {
          const J=v.F*v.dt, dv=J/v.m;
          return [{fa:'ضربه J',en:'J',val:J.toFixed(2),u:'N·s'},{fa:'Δv',en:'Δv',val:dv.toFixed(2),u:'m/s'}];
        },
        explainFa: v=>`J=${(v.F*v.dt).toFixed(2)} N·s`,
        explainEn: v=>`J=${(v.F*v.dt).toFixed(2)} N·s`
      },
      escape_surface: {
        nameFa: 'سرعت گریز سطحی', nameEn: 'Surface escape v',
        formula: 'v_esc = √(2GM/R)',
        descFa: 'سرعت گریز از سطح سیاره.', descEn: 'Escape velocity from surface.',
        fields: [
          {k:'M',fa:'جرم',en:'M',u:'M⊕',min:0.1,max:100,step:0.1,def:1},
          {k:'R',fa:'شعاع',en:'R',u:'R⊕',min:0.3,max:20,step:0.1,def:1}
        ],
        calc: v => {
          const vesc=Math.sqrt(2*CONST.G*v.M*CONST.M_EARTH/(v.R*CONST.R_EARTH));
          return [{fa:'v_esc',en:'v_esc',val:(vesc/1000).toFixed(2),u:'km/s'}];
        },
        explainFa: v=>`v_esc=${(Math.sqrt(2*CONST.G*v.M*CONST.M_EARTH/(v.R*CONST.R_EARTH))/1000).toFixed(2)} km/s`,
        explainEn: v=>`v_esc=${(Math.sqrt(2*CONST.G*v.M*CONST.M_EARTH/(v.R*CONST.R_EARTH))/1000).toFixed(2)} km/s`
      },
      rocket_eq: {
        nameFa: 'معادله موشک', nameEn: 'Rocket equation',
        formula: 'Δv = v_e ln(m₀/m_f)',
        descFa: 'تغییر سرعت موشک ایده‌آل.', descEn: 'Ideal rocket delta-v.',
        fields: [
          {k:'ve',fa:'v_e',en:'v_e',u:'m/s',min:500,max:5000,step:50,def:3000},
          {k:'m0',fa:'جرم اولیه',en:'m₀',u:'kg',min:100,max:1e6,step:100,def:10000},
          {k:'mf',fa:'جرم نهایی',en:'m_f',u:'kg',min:50,max:5e5,step:50,def:2000}
        ],
        calc: v => {
          const dv=v.ve*Math.log(v.m0/v.mf);
          return [{fa:'Δv',en:'Δv',val:dv.toFixed(0),u:'m/s'},{fa:'km/s',en:'km/s',val:(dv/1000).toFixed(2),u:''}];
        },
        explainFa: v=>`Δv=${(v.ve*Math.log(v.m0/v.mf)).toFixed(0)} m/s`,
        explainEn: v=>`Δv=${(v.ve*Math.log(v.m0/v.mf)).toFixed(0)} m/s`
      }
    }
  },

  electric: {
    titleFa: 'برق و مدار', titleEn: 'Electricity', icon: '⚡',
    experiments: {
      ohm: {
        nameFa: 'قانون اهم', nameEn: "Ohm's law",
        formula: 'I=V/R · P=VI',
        descFa: 'جریان و توان.', descEn: 'Current and power.',
        fields: [
          {k:'v',fa:'ولتاژ',en:'V',u:'V',min:0.5,max:48,step:0.5,def:12},
          {k:'r',fa:'مقاومت',en:'R',u:'Ω',min:1,max:200,step:1,def:6}
        ],
        calc: v => {
          const i=v.v/v.r, p=v.v*i;
          return [{fa:'I',en:'I',val:i.toFixed(3),u:'A'},{fa:'P',en:'P',val:p.toFixed(2),u:'W'}];
        },
        explainFa: v=>`I=${(v.v/v.r).toFixed(3)} A`,
        explainEn: v=>`I=${(v.v/v.r).toFixed(3)} A`
      },
      series: {
        nameFa: 'مقاومت سری', nameEn: 'Series R',
        formula: 'R_eq=R₁+R₂+R₃',
        descFa: 'سه مقاومت سری.', descEn: 'Three series resistors.',
        fields: [
          {k:'v',fa:'V',en:'V',u:'V',min:1,max:48,step:1,def:12},
          {k:'r1',fa:'R₁',en:'R₁',u:'Ω',min:1,max:100,step:1,def:10},
          {k:'r2',fa:'R₂',en:'R₂',u:'Ω',min:1,max:100,step:1,def:20},
          {k:'r3',fa:'R₃',en:'R₃',u:'Ω',min:1,max:100,step:1,def:30}
        ],
        calc: v => {
          const Req=v.r1+v.r2+v.r3, I=v.v/Req;
          return [{fa:'R_eq',en:'R_eq',val:Req.toFixed(1),u:'Ω'},{fa:'I',en:'I',val:I.toFixed(3),u:'A'}];
        },
        explainFa: v=>`R_eq=${v.r1+v.r2+v.r3}`,
        explainEn: v=>`R_eq=${v.r1+v.r2+v.r3}`
      },
      parallel: {
        nameFa: 'مقاومت موازی', nameEn: 'Parallel R',
        formula: '1/R_eq=1/R₁+1/R₂',
        descFa: 'دو مقاومت موازی.', descEn: 'Two parallel resistors.',
        fields: [
          {k:'v',fa:'V',en:'V',u:'V',min:1,max:48,step:1,def:12},
          {k:'r1',fa:'R₁',en:'R₁',u:'Ω',min:1,max:200,step:1,def:10},
          {k:'r2',fa:'R₂',en:'R₂',u:'Ω',min:1,max:200,step:1,def:20}
        ],
        calc: v => {
          const Req=1/(1/v.r1+1/v.r2), It=v.v/Req;
          return [{fa:'R_eq',en:'R_eq',val:Req.toFixed(2),u:'Ω'},{fa:'I کل',en:'I',val:It.toFixed(3),u:'A'}];
        },
        explainFa: v=>`R_eq=${(1/(1/v.r1+1/v.r2)).toFixed(2)}`,
        explainEn: v=>`R_eq=${(1/(1/v.r1+1/v.r2)).toFixed(2)}`
      },
      capacitor: {
        nameFa: 'خازن', nameEn: 'Capacitor',
        formula: 'Q=CV · E=½CV² · τ=RC',
        descFa: 'بار و انرژی خازن.', descEn: 'Charge and energy.',
        fields: [
          {k:'c',fa:'C',en:'C',u:'μF',min:0.1,max:1000,step:0.1,def:100},
          {k:'v',fa:'V',en:'V',u:'V',min:1,max:50,step:1,def:12},
          {k:'r',fa:'R',en:'R',u:'Ω',min:100,max:10000,step:100,def:1000}
        ],
        calc: v => {
          const C=v.c*1e-6, Q=C*v.v, E=0.5*C*v.v*v.v, tau=v.r*C;
          return [{fa:'Q',en:'Q',val:(Q*1e6).toFixed(2),u:'μC'},{fa:'E',en:'E',val:(E*1000).toFixed(3),u:'mJ'},{fa:'τ',en:'τ',val:(tau*1000).toFixed(2),u:'ms'}];
        },
        explainFa: v=>`E=${(0.5*v.c*1e-6*v.v*v.v*1000).toFixed(3)} mJ`,
        explainEn: v=>`E=${(0.5*v.c*1e-6*v.v*v.v*1000).toFixed(3)} mJ`
      },
      coulomb: {
        nameFa: 'قانون کولن', nameEn: 'Coulomb',
        formula: 'F=k|q₁q₂|/r²',
        descFa: 'نیروی بین دو بار.', descEn: 'Force between charges.',
        fields: [
          {k:'q1',fa:'q₁',en:'q₁',u:'μC',min:-50,max:50,step:0.5,def:5},
          {k:'q2',fa:'q₂',en:'q₂',u:'μC',min:-50,max:50,step:0.5,def:-3},
          {k:'r',fa:'r',en:'r',u:'cm',min:1,max:100,step:1,def:10}
        ],
        calc: v => {
          const F=CONST.K_COULOMB*Math.abs(v.q1*1e-6*v.q2*1e-6)/((v.r/100)**2);
          return [{fa:'F',en:'F',val:F.toFixed(3),u:'N'},{fa:'نوع',en:'type',val:(v.q1*v.q2)<0?'ربایش':'رانش',u:''}];
        },
        explainFa: v=>`F=${(CONST.K_COULOMB*Math.abs(v.q1*1e-6*v.q2*1e-6)/((v.r/100)**2)).toFixed(3)} N`,
        explainEn: v=>`F=${(CONST.K_COULOMB*Math.abs(v.q1*1e-6*v.q2*1e-6)/((v.r/100)**2)).toFixed(3)} N`
      },
      magnetic: {
        nameFa: 'لورنتس', nameEn: 'Lorentz',
        formula: 'F=qvB sinθ',
        descFa: 'نیروی مغناطیسی.', descEn: 'Magnetic force.',
        fields: [
          {k:'q',fa:'q',en:'q',u:'e',min:1,max:10,step:1,def:1},
          {k:'v',fa:'v',en:'v',u:'m/s',min:1e3,max:1e7,step:1e3,def:1e5},
          {k:'B',fa:'B',en:'B',u:'T',min:0.01,max:5,step:0.01,def:0.5},
          {k:'theta',fa:'θ',en:'θ',u:'°',min:0,max:90,step:5,def:90}
        ],
        calc: v => {
          const q=v.q*CONST.E, F=q*v.v*v.B*Math.sin(v.theta*Math.PI/180);
          return [{fa:'F',en:'F',val:F.toExponential(3),u:'N'}];
        },
        explainFa: v=>`F=qvBsinθ`,
        explainEn: v=>`F=qvBsinθ`
      },
      transformer: {
        nameFa: 'ترانسفورماتور', nameEn: 'Transformer',
        formula: 'Vₛ/Vₚ=Nₛ/Nₚ',
        descFa: 'نسبت ولتاژ.', descEn: 'Voltage ratio.',
        fields: [
          {k:'vp',fa:'Vₚ',en:'Vₚ',u:'V',min:50,max:500,step:10,def:220},
          {k:'np',fa:'Nₚ',en:'Nₚ',u:'—',min:50,max:1000,step:10,def:200},
          {k:'ns',fa:'Nₛ',en:'Nₛ',u:'—',min:10,max:2000,step:10,def:100}
        ],
        calc: v => {
          const vs=v.vp*(v.ns/v.np);
          return [{fa:'Vₛ',en:'Vₛ',val:vs.toFixed(1),u:'V'},{fa:'نسبت',en:'ratio',val:(v.ns/v.np).toFixed(3),u:''}];
        },
        explainFa: v=>`Vₛ=${(v.vp*v.ns/v.np).toFixed(1)}`,
        explainEn: v=>`Vₛ=${(v.vp*v.ns/v.np).toFixed(1)}`
      },
      rlc: {
        nameFa: 'RLC تشدید', nameEn: 'RLC resonance',
        formula: 'f₀=1/(2π√LC)',
        descFa: 'فرکانس تشدید.', descEn: 'Resonant frequency.',
        fields: [
          {k:'r',fa:'R',en:'R',u:'Ω',min:1,max:500,step:1,def:50},
          {k:'l',fa:'L',en:'L',u:'mH',min:0.1,max:100,step:0.1,def:10},
          {k:'c',fa:'C',en:'C',u:'μF',min:0.01,max:100,step:0.01,def:1},
          {k:'f',fa:'f',en:'f',u:'Hz',min:10,max:5000,step:10,def:500}
        ],
        calc: v => {
          const L=v.l*1e-3, C=v.c*1e-6;
          const f0=1/(2*Math.PI*Math.sqrt(L*C));
          const XL=2*Math.PI*v.f*L, XC=1/(2*Math.PI*v.f*C);
          const Z=Math.sqrt(v.r**2+(XL-XC)**2);
          return [{fa:'f₀',en:'f₀',val:f0.toFixed(1),u:'Hz'},{fa:'Z',en:'Z',val:Z.toFixed(1),u:'Ω'}];
        },
        explainFa: v=>`f₀=${(1/(2*Math.PI*Math.sqrt(v.l*1e-3*v.c*1e-6))).toFixed(1)} Hz`,
        explainEn: v=>`f₀=${(1/(2*Math.PI*Math.sqrt(v.l*1e-3*v.c*1e-6))).toFixed(1)} Hz`
      },
      powerfactor: {
        nameFa: 'ضریب توان', nameEn: 'Power factor',
        formula: 'PF=P/S',
        descFa: 'ضریب توان.', descEn: 'Power factor.',
        fields: [
          {k:'P',fa:'P',en:'P',u:'W',min:10,max:5000,step:10,def:1000},
          {k:'S',fa:'S',en:'S',u:'VA',min:10,max:6000,step:10,def:1200}
        ],
        calc: v => {
          const pf=Math.min(1,v.P/v.S), Q=Math.sqrt(Math.max(0,v.S**2-v.P**2));
          return [{fa:'PF',en:'PF',val:pf.toFixed(3),u:''},{fa:'Q',en:'Q',val:Q.toFixed(1),u:'VAR'}];
        },
        explainFa: v=>`PF=${(v.P/v.S).toFixed(3)}`,
        explainEn: v=>`PF=${(v.P/v.S).toFixed(3)}`
      },
      kirchhoff: {
        nameFa: 'کیرشهف', nameEn: 'Kirchhoff',
        formula: 'ΣV=0',
        descFa: 'جریان حلقه.', descEn: 'Loop current.',
        fields: [
          {k:'v1',fa:'V₁',en:'V₁',u:'V',min:1,max:30,step:1,def:12},
          {k:'v2',fa:'V₂',en:'V₂',u:'V',min:1,max:30,step:1,def:6},
          {k:'r1',fa:'R₁',en:'R₁',u:'Ω',min:1,max:50,step:1,def:10},
          {k:'r2',fa:'R₂',en:'R₂',u:'Ω',min:1,max:50,step:1,def:15}
        ],
        calc: v => {
          const I=(v.v1-v.v2)/(v.r1+v.r2);
          return [{fa:'I',en:'I',val:I.toFixed(3),u:'A'}];
        },
        explainFa: v=>`I=${((v.v1-v.v2)/(v.r1+v.r2)).toFixed(3)}`,
        explainEn: v=>`I=${((v.v1-v.v2)/(v.r1+v.r2)).toFixed(3)}`
      },
      // NEW ×5
      rc_discharge: {
        nameFa: 'تخلیه RC', nameEn: 'RC discharge',
        formula: 'V(t)=V₀ e^(−t/RC)',
        descFa: 'ولتاژ خازن در حال تخلیه.', descEn: 'Capacitor voltage while discharging.',
        fields: [
          {k:'v0',fa:'V₀',en:'V₀',u:'V',min:1,max:50,step:1,def:12},
          {k:'r',fa:'R',en:'R',u:'Ω',min:100,max:1e5,step:100,def:10000},
          {k:'c',fa:'C',en:'C',u:'μF',min:1,max:1000,step:1,def:100},
          {k:'t',fa:'t',en:'t',u:'ms',min:1,max:5000,step:10,def:500}
        ],
        calc: v => {
          const tau=v.r*(v.c*1e-6), Vt=v.v0*Math.exp(-(v.t/1000)/tau);
          return [{fa:'V(t)',en:'V(t)',val:Vt.toFixed(3),u:'V'},{fa:'τ',en:'τ',val:(tau*1000).toFixed(1),u:'ms'}];
        },
        explainFa: v=>`V(t)=${(v.v0*Math.exp(-(v.t/1000)/(v.r*v.c*1e-6))).toFixed(3)} V`,
        explainEn: v=>`V(t)=${(v.v0*Math.exp(-(v.t/1000)/(v.r*v.c*1e-6))).toFixed(3)} V`
      },
      inductor_energy: {
        nameFa: 'انرژی سلف', nameEn: 'Inductor energy',
        formula: 'E=½LI²',
        descFa: 'انرژی ذخیره‌شده در سلف.', descEn: 'Energy stored in inductor.',
        fields: [
          {k:'l',fa:'L',en:'L',u:'mH',min:0.1,max:1000,step:0.1,def:50},
          {k:'i',fa:'I',en:'I',u:'A',min:0.1,max:20,step:0.1,def:2}
        ],
        calc: v => {
          const E=0.5*(v.l*1e-3)*v.i*v.i;
          return [{fa:'E',en:'E',val:(E*1000).toFixed(3),u:'mJ'}];
        },
        explainFa: v=>`E=½LI²=${(0.5*v.l*1e-3*v.i*v.i*1000).toFixed(3)} mJ`,
        explainEn: v=>`E=½LI²=${(0.5*v.l*1e-3*v.i*v.i*1000).toFixed(3)} mJ`
      },
      wheatstone: {
        nameFa: 'پل وتستون', nameEn: 'Wheatstone bridge',
        formula: 'R_x = R₂·R₃/R₁ (تعادل)',
        descFa: 'مقاومت مجهول در تعادل.', descEn: 'Unknown R at balance.',
        fields: [
          {k:'r1',fa:'R₁',en:'R₁',u:'Ω',min:1,max:10000,step:1,def:1000},
          {k:'r2',fa:'R₂',en:'R₂',u:'Ω',min:1,max:10000,step:1,def:1000},
          {k:'r3',fa:'R₃',en:'R₃',u:'Ω',min:1,max:10000,step:1,def:500}
        ],
        calc: v => {
          const rx=v.r2*v.r3/v.r1;
          return [{fa:'R_x',en:'R_x',val:rx.toFixed(2),u:'Ω'}];
        },
        explainFa: v=>`R_x=${(v.r2*v.r3/v.r1).toFixed(2)} Ω`,
        explainEn: v=>`R_x=${(v.r2*v.r3/v.r1).toFixed(2)} Ω`
      },
      joule_heat: {
        nameFa: 'گرمای ژول', nameEn: 'Joule heating',
        formula: 'Q=I²Rt',
        descFa: 'گرمای تولیدشده در مقاومت.', descEn: 'Heat in a resistor.',
        fields: [
          {k:'i',fa:'I',en:'I',u:'A',min:0.1,max:50,step:0.1,def:5},
          {k:'r',fa:'R',en:'R',u:'Ω',min:0.1,max:100,step:0.1,def:4},
          {k:'t',fa:'t',en:'t',u:'s',min:1,max:3600,step:1,def:60}
        ],
        calc: v => {
          const Q=v.i*v.i*v.r*v.t;
          return [{fa:'Q',en:'Q',val:Q.toFixed(1),u:'J'},{fa:'kWh',en:'kWh',val:(Q/3.6e6).toFixed(6),u:''}];
        },
        explainFa: v=>`Q=I²Rt=${(v.i*v.i*v.r*v.t).toFixed(1)} J`,
        explainEn: v=>`Q=I²Rt=${(v.i*v.i*v.r*v.t).toFixed(1)} J`
      },
      skin_depth: {
        nameFa: 'عمق پوسته', nameEn: 'Skin depth',
        formula: 'δ=√(2ρ/(ωμ))',
        descFa: 'عمق نفوذ جریان AC در هادی.', descEn: 'AC current skin depth.',
        fields: [
          {k:'f',fa:'فرکانس',en:'f',u:'Hz',min:50,max:1e6,step:50,def:1000},
          {k:'rho',fa:'مقاومت ویژه',en:'ρ',u:'Ω·m',min:1e-8,max:1e-6,step:1e-8,def:1.68e-8},
          {k:'mu_r',fa:'μ_r',en:'μ_r',u:'—',min:1,max:5000,step:1,def:1}
        ],
        calc: v => {
          const mu=4*Math.PI*1e-7*v.mu_r, omega=2*Math.PI*v.f;
          const delta=Math.sqrt(2*v.rho/(omega*mu));
          return [{fa:'δ',en:'δ',val:(delta*1000).toFixed(3),u:'mm'}];
        },
        explainFa: v=>`δ=${(Math.sqrt(2*v.rho/(2*Math.PI*v.f*4*Math.PI*1e-7*v.mu_r))*1000).toFixed(3)} mm`,
        explainEn: v=>`δ=${(Math.sqrt(2*v.rho/(2*Math.PI*v.f*4*Math.PI*1e-7*v.mu_r))*1000).toFixed(3)} mm`
      }
    }
  },

  energy: {
    titleFa: 'انرژی', titleEn: 'Energy', icon: '🔋',
    experiments: {
      kinetic_potential: {
        nameFa: 'جنبشی و پتانسیل', nameEn: 'KE & PE',
        formula: 'Eₖ=½mv² · Eₚ=mgh',
        descFa: 'انرژی مکانیکی.', descEn: 'Mechanical energy.',
        fields: [
          {k:'m',fa:'جرم',en:'m',u:'kg',min:0.1,max:100,step:0.5,def:5},
          {k:'v',fa:'سرعت',en:'v',u:'m/s',min:0,max:50,step:0.5,def:10},
          {k:'h',fa:'ارتفاع',en:'h',u:'m',min:0,max:100,step:1,def:8}
        ],
        calc: v => {
          const k=0.5*v.m*v.v*v.v, p=v.m*CONST.G_EARTH*v.h;
          return [{fa:'Eₖ',en:'Eₖ',val:k.toFixed(2),u:'J'},{fa:'Eₚ',en:'Eₚ',val:p.toFixed(2),u:'J'},{fa:'کل',en:'E',val:(k+p).toFixed(2),u:'J'}];
        },
        explainFa: v=>`E=${(0.5*v.m*v.v*v.v+v.m*CONST.G_EARTH*v.h).toFixed(2)} J`,
        explainEn: v=>`E=${(0.5*v.m*v.v*v.v+v.m*CONST.G_EARTH*v.h).toFixed(2)} J`
      },
      conservation: {
        nameFa: 'پایستگی', nameEn: 'Conservation',
        formula: 'v=√(2gh)',
        descFa: 'تبدیل پتانسیل به جنبشی.', descEn: 'PE to KE.',
        fields: [
          {k:'h',fa:'ارتفاع',en:'h',u:'m',min:1,max:100,step:1,def:20},
          {k:'g',fa:'g',en:'g',u:'m/s²',min:5,max:15,step:0.1,def:9.81}
        ],
        calc: v => {
          const vel=Math.sqrt(2*v.g*v.h);
          return [{fa:'v',en:'v',val:vel.toFixed(2),u:'m/s'}];
        },
        explainFa: v=>`v=${Math.sqrt(2*v.g*v.h).toFixed(2)}`,
        explainEn: v=>`v=${Math.sqrt(2*v.g*v.h).toFixed(2)}`
      },
      elastic: {
        nameFa: 'انرژی فنر', nameEn: 'Spring energy',
        formula: 'U=½kx²',
        descFa: 'انرژی کشسانی.', descEn: 'Elastic energy.',
        fields: [
          {k:'k',fa:'k',en:'k',u:'N/m',min:10,max:1000,step:10,def:200},
          {k:'x',fa:'x',en:'x',u:'m',min:0.01,max:1,step:0.01,def:0.15}
        ],
        calc: v => {
          const U=0.5*v.k*v.x*v.x;
          return [{fa:'U',en:'U',val:U.toFixed(3),u:'J'}];
        },
        explainFa: v=>`U=${(0.5*v.k*v.x*v.x).toFixed(3)}`,
        explainEn: v=>`U=${(0.5*v.k*v.x*v.x).toFixed(3)}`
      },
      power_mech: {
        nameFa: 'توان مکانیکی', nameEn: 'Mech. power',
        formula: 'P=Fv',
        descFa: 'توان لحظه‌ای.', descEn: 'Instant power.',
        fields: [
          {k:'F',fa:'F',en:'F',u:'N',min:1,max:1000,step:1,def:200},
          {k:'v',fa:'v',en:'v',u:'m/s',min:0.1,max:30,step:0.1,def:5}
        ],
        calc: v => {
          const P=v.F*v.v;
          return [{fa:'P',en:'P',val:P.toFixed(1),u:'W'}];
        },
        explainFa: v=>`P=${(v.F*v.v).toFixed(1)} W`,
        explainEn: v=>`P=${(v.F*v.v).toFixed(1)} W`
      },
      efficiency: {
        nameFa: 'بازده', nameEn: 'Efficiency',
        formula: 'η=W_out/E_in×100%',
        descFa: 'بازده ماشین.', descEn: 'Machine efficiency.',
        fields: [
          {k:'Ein',fa:'E_in',en:'E_in',u:'J',min:100,max:10000,step:50,def:2000},
          {k:'Wout',fa:'W_out',en:'W_out',u:'J',min:50,max:9000,step:50,def:1200}
        ],
        calc: v => {
          const eta=Math.min(100,(v.Wout/v.Ein)*100);
          return [{fa:'η',en:'η',val:eta.toFixed(1),u:'%'}];
        },
        explainFa: v=>`η=${((v.Wout/v.Ein)*100).toFixed(1)}%`,
        explainEn: v=>`η=${((v.Wout/v.Ein)*100).toFixed(1)}%`
      },
      pendulum: {
        nameFa: 'آونگ', nameEn: 'Pendulum',
        formula: 'T=2π√(L/g)',
        descFa: 'دوره آونگ ساده.', descEn: 'Simple pendulum period.',
        fields: [
          {k:'L',fa:'طول',en:'L',u:'m',min:0.1,max:5,step:0.05,def:1},
          {k:'g',fa:'g',en:'g',u:'m/s²',min:5,max:15,step:0.1,def:9.81}
        ],
        calc: v => {
          const T=2*Math.PI*Math.sqrt(v.L/v.g);
          return [{fa:'T',en:'T',val:T.toFixed(3),u:'s'}];
        },
        explainFa: v=>`T=${(2*Math.PI*Math.sqrt(v.L/v.g)).toFixed(3)}`,
        explainEn: v=>`T=${(2*Math.PI*Math.sqrt(v.L/v.g)).toFixed(3)}`
      },
      gravity_pe: {
        nameFa: 'پتانسیل گرانشی', nameEn: 'Grav. PE',
        formula: 'U=−GMm/r',
        descFa: 'پتانسیل عمومی.', descEn: 'Universal PE.',
        fields: [
          {k:'M',fa:'M',en:'M',u:'M⊕',min:0.1,max:100,step:0.1,def:1},
          {k:'r',fa:'r',en:'r',u:'R⊕',min:1,max:20,step:0.1,def:2},
          {k:'m',fa:'m',en:'m',u:'kg',min:1,max:1000,step:1,def:10}
        ],
        calc: v => {
          const M=v.M*CONST.M_EARTH, r=v.r*CONST.R_EARTH;
          const U=-CONST.G*M*v.m/r, g=CONST.G*M/(r*r);
          return [{fa:'U',en:'U',val:U.toExponential(3),u:'J'},{fa:'g',en:'g',val:g.toFixed(3),u:'m/s²'}];
        },
        explainFa: v=>`g=${(CONST.G*v.M*CONST.M_EARTH/(v.r*CONST.R_EARTH)**2).toFixed(3)}`,
        explainEn: v=>`g=${(CONST.G*v.M*CONST.M_EARTH/(v.r*CONST.R_EARTH)**2).toFixed(3)}`
      },
      collision_energy: {
        nameFa: 'اتلاف برخورد', nameEn: 'Collision loss',
        formula: 'e · KE loss',
        descFa: 'اتلاف انرژی با ضریب e.', descEn: 'Energy loss with e.',
        fields: [
          {k:'m1',fa:'m₁',en:'m₁',u:'kg',min:0.5,max:20,step:0.5,def:2},
          {k:'v1',fa:'v₁',en:'v₁',u:'m/s',min:1,max:20,step:0.5,def:8},
          {k:'m2',fa:'m₂',en:'m₂',u:'kg',min:0.5,max:20,step:0.5,def:4},
          {k:'e',fa:'e',en:'e',u:'—',min:0,max:1,step:0.05,def:0.6}
        ],
        calc: v => {
          const KEi=0.5*v.m1*v.v1*v.v1;
          const v1f=((v.m1-v.e*v.m2)*v.v1)/(v.m1+v.m2);
          const v2f=((1+v.e)*v.m1*v.v1)/(v.m1+v.m2);
          const KEf=0.5*v.m1*v1f*v1f+0.5*v.m2*v2f*v2f;
          return [{fa:'KE₀',en:'KE₀',val:KEi.toFixed(2),u:'J'},{fa:'KE′',en:'KE′',val:KEf.toFixed(2),u:'J'},{fa:'اتلاف',en:'loss',val:(KEi-KEf).toFixed(2),u:'J'}];
        },
        explainFa: v=>`e=${v.e}`,
        explainEn: v=>`e=${v.e}`
      },
      heat_mech: {
        nameFa: 'کار به گرما', nameEn: 'Work→heat',
        formula: 'Q=Fd · ΔT=Q/(mc)',
        descFa: 'گرمایش اصطکاکی.', descEn: 'Frictional heating.',
        fields: [
          {k:'F',fa:'F',en:'F',u:'N',min:1,max:500,step:1,def:50},
          {k:'d',fa:'d',en:'d',u:'m',min:1,max:100,step:1,def:20},
          {k:'m',fa:'m',en:'m',u:'kg',min:0.1,max:10,step:0.1,def:1},
          {k:'c',fa:'c',en:'c',u:'J/kg·K',min:100,max:5000,step:50,def:900}
        ],
        calc: v => {
          const Q=v.F*v.d, dT=Q/(v.m*v.c);
          return [{fa:'Q',en:'Q',val:Q.toFixed(0),u:'J'},{fa:'ΔT',en:'ΔT',val:dT.toFixed(2),u:'K'}];
        },
        explainFa: v=>`ΔT=${(v.F*v.d/(v.m*v.c)).toFixed(2)} K`,
        explainEn: v=>`ΔT=${(v.F*v.d/(v.m*v.c)).toFixed(2)} K`
      },
      orbital_energy: {
        nameFa: 'انرژی مداری', nameEn: 'Orbital E',
        formula: 'E=−GMm/(2a)',
        descFa: 'انرژی مدار دایره‌ای.', descEn: 'Circular orbit energy.',
        fields: [
          {k:'M',fa:'M',en:'M',u:'M☉',min:0.1,max:5,step:0.1,def:1},
          {k:'a',fa:'a',en:'a',u:'AU',min:0.1,max:10,step:0.1,def:1},
          {k:'m',fa:'m',en:'m',u:'kg',min:1,max:1000,step:1,def:100}
        ],
        calc: v => {
          const M=v.M*CONST.M_SUN, a=v.a*CONST.AU;
          const E=-CONST.G*M*v.m/(2*a);
          return [{fa:'E',en:'E',val:E.toExponential(3),u:'J'}];
        },
        explainFa: v=>`E=−GMm/(2a)`,
        explainEn: v=>`E=−GMm/(2a)`
      },
      // NEW ×5
      carnot: {
        nameFa: 'بازده کارنو', nameEn: 'Carnot efficiency',
        formula: 'η=1−T_C/T_H',
        descFa: 'بازده ایده‌آل موتور گرمایی.', descEn: 'Ideal heat engine efficiency.',
        fields: [
          {k:'th',fa:'T_H',en:'T_H',u:'K',min:300,max:2000,step:10,def:600},
          {k:'tc',fa:'T_C',en:'T_C',u:'K',min:200,max:400,step:5,def:300}
        ],
        calc: v => {
          const eta=Math.max(0,(1-v.tc/v.th)*100);
          return [{fa:'η_max',en:'η_max',val:eta.toFixed(1),u:'%'}];
        },
        explainFa: v=>`η=${((1-v.tc/v.th)*100).toFixed(1)}%`,
        explainEn: v=>`η=${((1-v.tc/v.th)*100).toFixed(1)}%`
      },
      photon_energy: {
        nameFa: 'انرژی فوتون', nameEn: 'Photon energy',
        formula: 'E=hf=hc/λ',
        descFa: 'انرژی یک فوتون.', descEn: 'Single photon energy.',
        fields: [
          {k:'lambda',fa:'λ',en:'λ',u:'nm',min:100,max:1000,step:5,def:550}
        ],
        calc: v => {
          const E_j=CONST.H*CONST.C/(v.lambda*1e-9);
          const E_ev=E_j/CONST.E;
          return [{fa:'E',en:'E',val:E_ev.toFixed(3),u:'eV'},{fa:'J',en:'J',val:E_j.toExponential(3),u:''}];
        },
        explainFa: v=>`E=${((CONST.H*CONST.C/(v.lambda*1e-9))/CONST.E).toFixed(3)} eV`,
        explainEn: v=>`E=${((CONST.H*CONST.C/(v.lambda*1e-9))/CONST.E).toFixed(3)} eV`
      },
      binding_energy: {
        nameFa: 'انرژی بستگی هسته‌ای', nameEn: 'Nuclear binding',
        formula: 'E_b = Δm · c²',
        descFa: 'از کسر جرم (MeV).', descEn: 'From mass defect (MeV).',
        fields: [
          {k:'dm',fa:'Δm',en:'Δm',u:'u',min:0.001,max:1,step:0.001,def:0.030}
        ],
        calc: v => {
          // 1 u → 931.494 MeV
          const Eb=v.dm*931.494;
          return [{fa:'E_b',en:'E_b',val:Eb.toFixed(2),u:'MeV'}];
        },
        explainFa: v=>`E_b=${(v.dm*931.494).toFixed(2)} MeV`,
        explainEn: v=>`E_b=${(v.dm*931.494).toFixed(2)} MeV`
      },
      wind_power: {
        nameFa: 'توان باد', nameEn: 'Wind power',
        formula: 'P=½ρAv³',
        descFa: 'توان توربین ایده‌آل.', descEn: 'Ideal wind turbine power.',
        fields: [
          {k:'v',fa:'سرعت باد',en:'v',u:'m/s',min:1,max:30,step:0.5,def:12},
          {k:'A',fa:'مساحت روتور',en:'A',u:'m²',min:1,max:5000,step:10,def:100},
          {k:'rho',fa:'ρ هوا',en:'ρ',u:'kg/m³',min:0.9,max:1.4,step:0.01,def:1.225}
        ],
        calc: v => {
          const P=0.5*v.rho*v.A*v.v**3;
          return [{fa:'P',en:'P',val:(P/1000).toFixed(2),u:'kW'}];
        },
        explainFa: v=>`P=${(0.5*v.rho*v.A*v.v**3/1000).toFixed(2)} kW`,
        explainEn: v=>`P=${(0.5*v.rho*v.A*v.v**3/1000).toFixed(2)} kW`
      },
      seebeck: {
        nameFa: 'اثر سیبک', nameEn: 'Seebeck effect',
        formula: 'V = α ΔT',
        descFa: 'ولتاژ ترموالکتریک.', descEn: 'Thermoelectric voltage.',
        fields: [
          {k:'alpha',fa:'α',en:'α',u:'μV/K',min:10,max:1000,step:10,def:200},
          {k:'dT',fa:'ΔT',en:'ΔT',u:'K',min:1,max:500,step:1,def:50}
        ],
        calc: v => {
          const V=v.alpha*v.dT*1e-6;
          return [{fa:'V',en:'V',val:(V*1000).toFixed(2),u:'mV'}];
        },
        explainFa: v=>`V=${(v.alpha*v.dT*1e-3).toFixed(2)} mV`,
        explainEn: v=>`V=${(v.alpha*v.dT*1e-3).toFixed(2)} mV`
      }
    }
  },

  wave: {
    titleFa: 'موج', titleEn: 'Waves', icon: '〰️',
    experiments: {
      sine: {
        nameFa: 'موج سینوسی', nameEn: 'Sine wave',
        formula: 'y=A sin(2πft+φ)',
        descFa: 'پارامترهای موج.', descEn: 'Wave parameters.',
        fields: [
          {k:'A',fa:'A',en:'A',u:'—',min:0.2,max:5,step:0.1,def:2},
          {k:'f',fa:'f',en:'f',u:'Hz',min:0.2,max:5,step:0.1,def:1},
          {k:'phase',fa:'φ',en:'φ',u:'rad',min:0,max:6.28,step:0.1,def:0}
        ],
        calc: v => [{fa:'T',en:'T',val:(1/v.f).toFixed(3),u:'s'},{fa:'f',en:'f',val:v.f.toFixed(2),u:'Hz'}],
        explainFa: v=>`f=${v.f}`,
        explainEn: v=>`f=${v.f}`
      },
      string: {
        nameFa: 'موج ریسمان', nameEn: 'String wave',
        formula: 'v=√(T/μ)',
        descFa: 'سرعت موج عرضی.', descEn: 'Transverse wave speed.',
        fields: [
          {k:'T',fa:'کشش',en:'T',u:'N',min:1,max:200,step:1,def:50},
          {k:'mu',fa:'μ',en:'μ',u:'g/m',min:0.5,max:20,step:0.5,def:5},
          {k:'L',fa:'L',en:'L',u:'m',min:0.2,max:5,step:0.1,def:1},
          {k:'n',fa:'n',en:'n',u:'—',min:1,max:8,step:1,def:1}
        ],
        calc: v => {
          const vel=Math.sqrt(v.T/(v.mu/1000)), lambda=2*v.L/v.n, f=vel/lambda;
          return [{fa:'v',en:'v',val:vel.toFixed(1),u:'m/s'},{fa:'λ',en:'λ',val:lambda.toFixed(3),u:'m'},{fa:'f',en:'f',val:f.toFixed(1),u:'Hz'}];
        },
        explainFa: v=>`v=${Math.sqrt(v.T/(v.mu/1000)).toFixed(1)}`,
        explainEn: v=>`v=${Math.sqrt(v.T/(v.mu/1000)).toFixed(1)}`
      },
      doppler: {
        nameFa: 'داپلر', nameEn: 'Doppler',
        formula: "f′=f(v±vₒ)/(v±vₛ)",
        descFa: 'فرکانس شنیده‌شده.', descEn: 'Heard frequency.',
        fields: [
          {k:'f',fa:'f',en:'f',u:'Hz',min:100,max:2000,step:10,def:440},
          {k:'vs',fa:'v_s',en:'v_s',u:'m/s',min:-50,max:50,step:1,def:0},
          {k:'vo',fa:'v_o',en:'v_o',u:'m/s',min:-50,max:50,step:1,def:0},
          {k:'v',fa:'v صوت',en:'v',u:'m/s',min:300,max:400,step:1,def:343}
        ],
        calc: v => {
          const fp=v.f*(v.v+v.vo)/(v.v+v.vs);
          return [{fa:'f′',en:'f′',val:fp.toFixed(1),u:'Hz'}];
        },
        explainFa: v=>`f′=${(v.f*(v.v+v.vo)/(v.v+v.vs)).toFixed(1)}`,
        explainEn: v=>`f′=${(v.f*(v.v+v.vo)/(v.v+v.vs)).toFixed(1)}`
      },
      beats: {
        nameFa: 'ضربان', nameEn: 'Beats',
        formula: 'f_beat=|f₁−f₂|',
        descFa: 'فرکانس ضربان.', descEn: 'Beat frequency.',
        fields: [
          {k:'f1',fa:'f₁',en:'f₁',u:'Hz',min:100,max:1000,step:1,def:440},
          {k:'f2',fa:'f₂',en:'f₂',u:'Hz',min:100,max:1000,step:1,def:444}
        ],
        calc: v => {
          const fb=Math.abs(v.f1-v.f2);
          return [{fa:'f_beat',en:'f_beat',val:fb.toFixed(1),u:'Hz'}];
        },
        explainFa: v=>`f_beat=${Math.abs(v.f1-v.f2).toFixed(1)}`,
        explainEn: v=>`f_beat=${Math.abs(v.f1-v.f2).toFixed(1)}`
      },
      // NEW ×5 for wave
      snell: {
        nameFa: 'شکست اسنل', nameEn: 'Snell law',
        formula: 'n₁sinθ₁=n₂sinθ₂',
        descFa: 'زاویه شکست.', descEn: 'Refraction angle.',
        fields: [
          {k:'n1',fa:'n₁',en:'n₁',u:'—',min:1,max:2.5,step:0.01,def:1},
          {k:'n2',fa:'n₂',en:'n₂',u:'—',min:1,max:2.5,step:0.01,def:1.33},
          {k:'theta1',fa:'θ₁',en:'θ₁',u:'°',min:1,max:89,step:1,def:30}
        ],
        calc: v => {
          const s=v.n1/v.n2*Math.sin(v.theta1*Math.PI/180);
          if (Math.abs(s)>1) return [{fa:'θ₂',en:'θ₂',val:'بازتاب کلی',u:''}];
          const th2=Math.asin(s)*180/Math.PI;
          return [{fa:'θ₂',en:'θ₂',val:th2.toFixed(2),u:'°'}];
        },
        explainFa: v=>`n₁sinθ₁=n₂sinθ₂`,
        explainEn: v=>`n₁sinθ₁=n₂sinθ₂`
      },
      bragg: {
        nameFa: 'براگ', nameEn: 'Bragg',
        formula: 'nλ=2d sinθ',
        descFa: 'پراش پرتو X.', descEn: 'X-ray diffraction.',
        fields: [
          {k:'n',fa:'n',en:'n',u:'—',min:1,max:5,step:1,def:1},
          {k:'d',fa:'d',en:'d',u:'Å',min:0.5,max:10,step:0.1,def:2.5},
          {k:'theta',fa:'θ',en:'θ',u:'°',min:5,max:80,step:1,def:30}
        ],
        calc: v => {
          const lambda=2*v.d*Math.sin(v.theta*Math.PI/180)/v.n;
          return [{fa:'λ',en:'λ',val:lambda.toFixed(3),u:'Å'}];
        },
        explainFa: v=>`λ=${(2*v.d*Math.sin(v.theta*Math.PI/180)/v.n).toFixed(3)} Å`,
        explainEn: v=>`λ=${(2*v.d*Math.sin(v.theta*Math.PI/180)/v.n).toFixed(3)} Å`
      },
      intensity_db: {
        nameFa: 'تراز شدت صوت', nameEn: 'Sound level',
        formula: 'β=10 log₁₀(I/I₀)',
        descFa: 'دسی‌بل.', descEn: 'Decibel level.',
        fields: [
          {k:'I',fa:'I',en:'I',u:'W/m²',min:1e-12,max:10,step:1e-12,def:1e-6}
        ],
        calc: v => {
          const beta=10*Math.log10(v.I/1e-12);
          return [{fa:'β',en:'β',val:beta.toFixed(1),u:'dB'}];
        },
        explainFa: v=>`β=${(10*Math.log10(v.I/1e-12)).toFixed(1)} dB`,
        explainEn: v=>`β=${(10*Math.log10(v.I/1e-12)).toFixed(1)} dB`
      },
      malus: {
        nameFa: 'قانون مالوس', nameEn: 'Malus law',
        formula: 'I=I₀ cos²θ',
        descFa: 'شدت نور قطبیده.', descEn: 'Polarized light intensity.',
        fields: [
          {k:'I0',fa:'I₀',en:'I₀',u:'—',min:0.1,max:10,step:0.1,def:1},
          {k:'theta',fa:'θ',en:'θ',u:'°',min:0,max:90,step:1,def:45}
        ],
        calc: v => {
          const I=v.I0*Math.cos(v.theta*Math.PI/180)**2;
          return [{fa:'I',en:'I',val:I.toFixed(3),u:''}];
        },
        explainFa: v=>`I=${(v.I0*Math.cos(v.theta*Math.PI/180)**2).toFixed(3)}`,
        explainEn: v=>`I=${(v.I0*Math.cos(v.theta*Math.PI/180)**2).toFixed(3)}`
      },
      thin_film: {
        nameFa: 'لایه نازک', nameEn: 'Thin film',
        formula: '2nt = mλ (سازه)',
        descFa: 'شرط تداخل سازنده (تقریبی).', descEn: 'Constructive interference approx.',
        fields: [
          {k:'n',fa:'n',en:'n',u:'—',min:1,max:2.5,step:0.01,def:1.4},
          {k:'t',fa:'ضخامت',en:'t',u:'nm',min:50,max:1000,step:10,def:200},
          {k:'m',fa:'m',en:'m',u:'—',min:1,max:5,step:1,def:1}
        ],
        calc: v => {
          const lambda=2*v.n*v.t/v.m;
          return [{fa:'λ',en:'λ',val:lambda.toFixed(1),u:'nm'}];
        },
        explainFa: v=>`λ=${(2*v.n*v.t/v.m).toFixed(1)} nm`,
        explainEn: v=>`λ=${(2*v.n*v.t/v.m).toFixed(1)} nm`
      }
    }
  },

  chemistry: {
    titleFa: 'شیمی', titleEn: 'Chemistry', icon: '🧪',
    experiments: {
      periodic: {
        nameFa: 'جدول تناوبی', nameEn: 'Periodic table',
        formula: 'Z · mass · config',
        descFa: '۱۱۸ عنصر.', descEn: '118 elements.',
        fields: [],
        calc: () => [],
        explainFa: () => 'کلیک یا جستجو',
        explainEn: () => 'Click or search'
      },
      reaction: {
        nameFa: 'ترکیب مواد', nameEn: 'Reactions',
        formula: 'A+B→product',
        descFa: 'واکنش آموزشی.', descEn: 'Educational reactions.',
        fields: [],
        calc: () => [],
        explainFa: () => 'دو عنصر انتخاب کنید',
        explainEn: () => 'Select two elements'
      },
      molar: {
        nameFa: 'مول', nameEn: 'Mole',
        formula: 'n=m/M',
        descFa: 'تعداد مول.', descEn: 'Amount of substance.',
        fields: [
          {k:'mass',fa:'جرم',en:'mass',u:'g',min:0.1,max:500,step:0.1,def:18},
          {k:'M',fa:'M',en:'M',u:'g/mol',min:1,max:300,step:0.1,def:18}
        ],
        calc: v => {
          const n=v.mass/v.M, N=n*CONST.N_A;
          return [{fa:'n',en:'n',val:n.toFixed(4),u:'mol'},{fa:'N',en:'N',val:N.toExponential(3),u:''}];
        },
        explainFa: v=>`n=${(v.mass/v.M).toFixed(4)}`,
        explainEn: v=>`n=${(v.mass/v.M).toFixed(4)}`
      },
      // NEW chemistry extras
      ph: {
        nameFa: 'pH', nameEn: 'pH',
        formula: 'pH=−log[H⁺]',
        descFa: 'اسیدیته.', descEn: 'Acidity.',
        fields: [
          {k:'h',fa:'[H⁺]',en:'[H⁺]',u:'mol/L',min:1e-14,max:1,step:1e-14,def:1e-7}
        ],
        calc: v => {
          const ph=-Math.log10(v.h);
          return [{fa:'pH',en:'pH',val:ph.toFixed(2),u:''},{fa:'نوع',en:'type',val:ph<7?'اسیدی':ph>7?'بازی':'خنثی',u:''}];
        },
        explainFa: v=>`pH=${(-Math.log10(v.h)).toFixed(2)}`,
        explainEn: v=>`pH=${(-Math.log10(v.h)).toFixed(2)}`
      },
      ideal_gas: {
        nameFa: 'گاز ایده‌آل', nameEn: 'Ideal gas',
        formula: 'PV=nRT',
        descFa: 'معادله حالت.', descEn: 'Equation of state.',
        fields: [
          {k:'n',fa:'n',en:'n',u:'mol',min:0.1,max:10,step:0.1,def:1},
          {k:'T',fa:'T',en:'T',u:'K',min:100,max:500,step:5,def:298},
          {k:'P',fa:'P',en:'P',u:'atm',min:0.1,max:10,step:0.1,def:1}
        ],
        calc: v => {
          const R=0.082057, V=v.n*R*v.T/v.P;
          return [{fa:'V',en:'V',val:V.toFixed(3),u:'L'}];
        },
        explainFa: v=>`V=nRT/P=${(v.n*0.082057*v.T/v.P).toFixed(3)} L`,
        explainEn: v=>`V=nRT/P=${(v.n*0.082057*v.T/v.P).toFixed(3)} L`
      },
      dilution: {
        nameFa: 'رقیق‌سازی', nameEn: 'Dilution',
        formula: 'C₁V₁=C₂V₂',
        descFa: 'غلظت پس از رقیق‌سازی.', descEn: 'Concentration after dilution.',
        fields: [
          {k:'c1',fa:'C₁',en:'C₁',u:'M',min:0.01,max:10,step:0.01,def:1},
          {k:'v1',fa:'V₁',en:'V₁',u:'mL',min:1,max:500,step:1,def:50},
          {k:'v2',fa:'V₂',en:'V₂',u:'mL',min:1,max:2000,step:1,def:250}
        ],
        calc: v => {
          const c2=v.c1*v.v1/v.v2;
          return [{fa:'C₂',en:'C₂',val:c2.toFixed(4),u:'M'}];
        },
        explainFa: v=>`C₂=${(v.c1*v.v1/v.v2).toFixed(4)} M`,
        explainEn: v=>`C₂=${(v.c1*v.v1/v.v2).toFixed(4)} M`
      },
      half_life: {
        nameFa: 'نیمه‌عمر', nameEn: 'Half-life',
        formula: 'N=N₀ (½)^(t/t½)',
        descFa: 'باقی‌مانده پرتوزا.', descEn: 'Remaining radioactive amount.',
        fields: [
          {k:'n0',fa:'N₀',en:'N₀',u:'—',min:1,max:1000,step:1,def:100},
          {k:'thalf',fa:'t½',en:'t½',u:'y',min:0.1,max:10000,step:0.1,def:10},
          {k:'t',fa:'t',en:'t',u:'y',min:0.1,max:50000,step:0.1,def:30}
        ],
        calc: v => {
          const n=v.n0*Math.pow(0.5,v.t/v.thalf);
          return [{fa:'N',en:'N',val:n.toFixed(2),u:''}];
        },
        explainFa: v=>`N=${(v.n0*Math.pow(0.5,v.t/v.thalf)).toFixed(2)}`,
        explainEn: v=>`N=${(v.n0*Math.pow(0.5,v.t/v.thalf)).toFixed(2)}`
      },
      beer_lambert: {
        nameFa: 'بیر-لامبرت', nameEn: 'Beer–Lambert',
        formula: 'A=εlc',
        descFa: 'جذب نوری محلول.', descEn: 'Absorbance of solution.',
        fields: [
          {k:'eps',fa:'ε',en:'ε',u:'L/mol·cm',min:10,max:1e5,step:10,def:1000},
          {k:'l',fa:'l',en:'l',u:'cm',min:0.1,max:10,step:0.1,def:1},
          {k:'c',fa:'c',en:'c',u:'mol/L',min:1e-6,max:1,step:1e-6,def:0.001}
        ],
        calc: v => {
          const A=v.eps*v.l*v.c;
          return [{fa:'A',en:'A',val:A.toFixed(4),u:''}];
        },
        explainFa: v=>`A=${(v.eps*v.l*v.c).toFixed(4)}`,
        explainEn: v=>`A=${(v.eps*v.l*v.c).toFixed(4)}`
      }
    }
  },

  astronomy: {
    titleFa: 'نجوم و کوانتوم', titleEn: 'Astro & Quantum', icon: '🌌',
    experiments: {
      kepler: {
        nameFa: 'کپلر', nameEn: 'Kepler',
        formula: 'T²∝a³',
        descFa: 'دوره مداری.', descEn: 'Orbital period.',
        fields: [
          {k:'M',fa:'M',en:'M',u:'M☉',min:0.1,max:20,step:0.1,def:1},
          {k:'a',fa:'a',en:'a',u:'AU',min:0.1,max:30,step:0.1,def:1}
        ],
        calc: v => {
          const M=v.M*CONST.M_SUN, a=v.a*CONST.AU;
          const T=2*Math.PI*Math.sqrt(a**3/(CONST.G*M));
          const Ty=T/86400/365.256;
          const vOrb=Math.sqrt(CONST.G*M/a);
          return [{fa:'T',en:'T',val:Ty.toFixed(3),u:'yr'},{fa:'v',en:'v',val:(vOrb/1000).toFixed(2),u:'km/s'}];
        },
        explainFa: v=>`T≈${(2*Math.PI*Math.sqrt((v.a*CONST.AU)**3/(CONST.G*v.M*CONST.M_SUN))/86400/365.256).toFixed(3)} yr`,
        explainEn: v=>`T≈${(2*Math.PI*Math.sqrt((v.a*CONST.AU)**3/(CONST.G*v.M*CONST.M_SUN))/86400/365.256).toFixed(3)} yr`
      },
      escape: {
        nameFa: 'سرعت گریز', nameEn: 'Escape',
        formula: 'v_esc=√(2GM/r)',
        descFa: 'حداقل سرعت خروج.', descEn: 'Min escape speed.',
        fields: [
          {k:'M',fa:'M',en:'M',u:'M⊕',min:0.1,max:1000,step:0.1,def:1},
          {k:'r',fa:'r',en:'r',u:'R⊕',min:0.5,max:50,step:0.1,def:1}
        ],
        calc: v => {
          const vesc=Math.sqrt(2*CONST.G*v.M*CONST.M_EARTH/(v.r*CONST.R_EARTH));
          return [{fa:'v_esc',en:'v_esc',val:(vesc/1000).toFixed(2),u:'km/s'}];
        },
        explainFa: v=>`v_esc=${(Math.sqrt(2*CONST.G*v.M*CONST.M_EARTH/(v.r*CONST.R_EARTH))/1000).toFixed(2)}`,
        explainEn: v=>`v_esc=${(Math.sqrt(2*CONST.G*v.M*CONST.M_EARTH/(v.r*CONST.R_EARTH))/1000).toFixed(2)}`
      },
      blackbody: {
        nameFa: 'جسم سیاه', nameEn: 'Blackbody',
        formula: 'λ_max T=2.897e-3',
        descFa: 'قانون وین.', descEn: "Wien's law.",
        fields: [
          {k:'T',fa:'T',en:'T',u:'K',min:100,max:10000,step:50,def:5800}
        ],
        calc: v => {
          const lambda=2.897771955e-3/v.T;
          return [{fa:'λ_max',en:'λ_max',val:(lambda*1e9).toFixed(1),u:'nm'}];
        },
        explainFa: v=>`λ_max=${(2.897e-3/v.T*1e9).toFixed(1)} nm`,
        explainEn: v=>`λ_max=${(2.897e-3/v.T*1e9).toFixed(1)} nm`
      },
      photoelectric: {
        nameFa: 'فوتوالکتریک', nameEn: 'Photoelectric',
        formula: 'K_max=hf−φ',
        descFa: 'اثر فوتوالکتریک.', descEn: 'Photoelectric effect.',
        fields: [
          {k:'lambda',fa:'λ',en:'λ',u:'nm',min:100,max:800,step:10,def:400},
          {k:'phi',fa:'φ',en:'φ',u:'eV',min:1,max:6,step:0.1,def:2.3}
        ],
        calc: v => {
          const f=CONST.C/(v.lambda*1e-9);
          const E=(CONST.H*f)/CONST.E;
          const K=E-v.phi;
          return [{fa:'hf',en:'hf',val:E.toFixed(3),u:'eV'},{fa:'K_max',en:'K_max',val:K>0?K.toFixed(3):'0',u:'eV'}];
        },
        explainFa: v=>`hf=${((CONST.H*CONST.C/(v.lambda*1e-9))/CONST.E).toFixed(3)} eV`,
        explainEn: v=>`hf=${((CONST.H*CONST.C/(v.lambda*1e-9))/CONST.E).toFixed(3)} eV`
      },
      deBroglie: {
        nameFa: 'دوبروی', nameEn: 'de Broglie',
        formula: 'λ=h/p',
        descFa: 'موج ماده.', descEn: 'Matter wave.',
        fields: [
          {k:'m',fa:'m',en:'m',u:'u',min:0.0005,max:10,step:0.0001,def:1},
          {k:'v',fa:'v',en:'v',u:'m/s',min:1,max:1e7,step:10,def:1e5}
        ],
        calc: v => {
          const mass=v.m*1.660539e-27;
          const lambda=CONST.H/(mass*v.v);
          return [{fa:'λ',en:'λ',val:lambda.toExponential(3),u:'m'}];
        },
        explainFa: v=>`λ=h/p`,
        explainEn: v=>`λ=h/p`
      },
      bohr: {
        nameFa: 'بور', nameEn: 'Bohr',
        formula: 'Eₙ=−13.6/n²',
        descFa: 'تراز هیدروژن.', descEn: 'H levels.',
        fields: [
          {k:'n',fa:'n',en:'n',u:'—',min:1,max:10,step:1,def:2}
        ],
        calc: v => {
          const E=-13.6/(v.n**2);
          return [{fa:'Eₙ',en:'Eₙ',val:E.toFixed(3),u:'eV'}];
        },
        explainFa: v=>`E=${(-13.6/(v.n**2)).toFixed(3)} eV`,
        explainEn: v=>`E=${(-13.6/(v.n**2)).toFixed(3)} eV`
      },
      schwarzschild: {
        nameFa: 'شوارتزشیلد', nameEn: 'Schwarzschild',
        formula: 'Rₛ=2GM/c²',
        descFa: 'افق رویداد.', descEn: 'Event horizon.',
        fields: [
          {k:'M',fa:'M',en:'M',u:'M☉',min:0.1,max:1e6,step:0.1,def:10}
        ],
        calc: v => {
          const Rs=2*CONST.G*v.M*CONST.M_SUN/(CONST.C**2);
          return [{fa:'Rₛ',en:'Rₛ',val:(Rs/1000).toFixed(2),u:'km'}];
        },
        explainFa: v=>`Rₛ=${(2*CONST.G*v.M*CONST.M_SUN/(CONST.C**2)/1000).toFixed(2)} km`,
        explainEn: v=>`Rₛ=${(2*CONST.G*v.M*CONST.M_SUN/(CONST.C**2)/1000).toFixed(2)} km`
      },
      hubble: {
        nameFa: 'هابل', nameEn: 'Hubble',
        formula: 'v=H₀d',
        descFa: 'انبساط کیهان.', descEn: 'Cosmic expansion.',
        fields: [
          {k:'d',fa:'d',en:'d',u:'Mpc',min:1,max:5000,step:1,def:100},
          {k:'H0',fa:'H₀',en:'H₀',u:'km/s/Mpc',min:50,max:100,step:1,def:70}
        ],
        calc: v => {
          const vel=v.H0*v.d;
          return [{fa:'v',en:'v',val:vel.toFixed(0),u:'km/s'}];
        },
        explainFa: v=>`v=${v.H0*v.d}`,
        explainEn: v=>`v=${v.H0*v.d}`
      },
      // NEW ×5
      parallax: {
        nameFa: 'اختلاف منظر', nameEn: 'Parallax',
        formula: 'd(pc)=1/p(")',
        descFa: 'فاصله ستاره از اختلاف منظر.', descEn: 'Stellar distance from parallax.',
        fields: [
          {k:'p',fa:'p',en:'p',u:'arcsec',min:0.001,max:1,step:0.001,def:0.1}
        ],
        calc: v => {
          const d=1/v.p;
          return [{fa:'d',en:'d',val:d.toFixed(2),u:'pc'},{fa:'ly',en:'ly',val:(d*3.26156).toFixed(2),u:'ly'}];
        },
        explainFa: v=>`d=${(1/v.p).toFixed(2)} pc`,
        explainEn: v=>`d=${(1/v.p).toFixed(2)} pc`
      },
      magnitude: {
        nameFa: 'قدر ظاهری', nameEn: 'Magnitude',
        formula: 'm₁−m₂=−2.5 log(F₁/F₂)',
        descFa: 'نسبت شار دو ستاره.', descEn: 'Flux ratio of two stars.',
        fields: [
          {k:'dm',fa:'Δm',en:'Δm',u:'mag',min:0,max:15,step:0.1,def:5}
        ],
        calc: v => {
          const ratio=Math.pow(10, v.dm/2.5);
          return [{fa:'F₁/F₂',en:'F₁/F₂',val:ratio.toFixed(2),u:''}];
        },
        explainFa: v=>`نسبت شار=${Math.pow(10,v.dm/2.5).toFixed(2)}`,
        explainEn: v=>`flux ratio=${Math.pow(10,v.dm/2.5).toFixed(2)}`
      },
      redshift: {
        nameFa: 'انتقال به سرخ', nameEn: 'Redshift',
        formula: 'z=Δλ/λ₀ · v≈cz (کم)',
        descFa: 'سرعت تقریبی از z.', descEn: 'Approx. velocity from z.',
        fields: [
          {k:'z',fa:'z',en:'z',u:'—',min:0,max:3,step:0.01,def:0.1}
        ],
        calc: v => {
          const vel=v.z*CONST.C/1000;
          return [{fa:'v≈',en:'v≈',val:vel.toFixed(0),u:'km/s'}];
        },
        explainFa: v=>`v≈cz=${(v.z*CONST.C/1000).toFixed(0)} km/s`,
        explainEn: v=>`v≈cz=${(v.z*CONST.C/1000).toFixed(0)} km/s`
      },
      planck_peak: {
        nameFa: 'انرژی پلانک', nameEn: 'Planck energy',
        formula: 'E_p=√(ħc⁵/G)',
        descFa: 'مقیاس انرژی پلانک.', descEn: 'Planck energy scale.',
        fields: [],
        calc: () => {
          const Ep=Math.sqrt(CONST.HBAR*Math.pow(CONST.C,5)/CONST.G);
          return [{fa:'E_p',en:'E_p',val:(Ep/1e9).toExponential(3),u:'GeV'}];
        },
        explainFa: ()=>`E_p=√(ħc⁵/G)`,
        explainEn: ()=>`E_p=√(ħc⁵/G)`
      },
      time_dilation: {
        nameFa: 'اتساع زمان', nameEn: 'Time dilation',
        formula: 'Δt=Δt₀/√(1−v²/c²)',
        descFa: 'نسبیت خاص.', descEn: 'Special relativity.',
        fields: [
          {k:'v_c',fa:'v/c',en:'v/c',u:'—',min:0.01,max:0.99,step:0.01,def:0.8},
          {k:'t0',fa:'Δt₀',en:'Δt₀',u:'s',min:1,max:3600,step:1,def:60}
        ],
        calc: v => {
          const gamma=1/Math.sqrt(1-v.v_c*v.v_c);
          const dt=v.t0*gamma;
          return [{fa:'γ',en:'γ',val:gamma.toFixed(3),u:''},{fa:'Δt',en:'Δt',val:dt.toFixed(2),u:'s'}];
        },
        explainFa: v=>`γ=${(1/Math.sqrt(1-v.v_c*v.v_c)).toFixed(3)}`,
        explainEn: v=>`γ=${(1/Math.sqrt(1-v.v_c*v.v_c)).toFixed(3)}`
      }
    }
  }
};
