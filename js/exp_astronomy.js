const EXP_ASTRONOMY = {

    titleFa: 'نجوم و کوانتوم', titleEn: 'Astronomy & Quantum', icon: '🌌',
    experiments: {
      kepler: {
        nameFa: 'قانون کپلر', nameEn: "Kepler's 3rd law",
        formula: 'T² = 4π²a³/GM  ·  v = √(GM/r)',
        descFa: 'دوره و سرعت مداری.',
        descEn: 'Orbital period and speed.',
        fields: [
          {k:'M', fa:'جرم مرکزی', en:'Central mass', u:'M☉', min:0.1, max:20, step:0.1, def:1},
          {k:'a', fa:'نیم‌محور', en:'Semi-major axis', u:'AU', min:0.1, max:30, step:0.1, def:1}
        ],
        calc: v => {
          const M = v.M * CONST.M_SUN;
          const a = v.a * CONST.AU;
          const T = 2 * Math.PI * Math.sqrt(a**3 / (CONST.G * M));
          const Ty = T / 86400 / 365.256;
          const vOrb = Math.sqrt(CONST.G * M / a);
          return [
            {fa:'دوره', en:'Period', val:Ty.toFixed(3), u:'yr'},
            {fa:'سرعت مداری', en:'Orbital speed', val:(vOrb/1000).toFixed(2), u:'km/s'},
            {fa:'a', en:'a', val:v.a.toFixed(2), u:'AU'}
          ];
        },
        explainFa: v => `a=${v.a} AU, M=${v.M} M☉ → T≈${(2*Math.PI*Math.sqrt((v.a*CONST.AU)**3/(CONST.G*v.M*CONST.M_SUN))/86400/365.256).toFixed(3)} yr`,
        explainEn: v => `a=${v.a} AU, M=${v.M} M☉ → T≈${(2*Math.PI*Math.sqrt((v.a*CONST.AU)**3/(CONST.G*v.M*CONST.M_SUN))/86400/365.256).toFixed(3)} yr`
      },
      escape: {
        nameFa: 'سرعت گریز', nameEn: 'Escape velocity',
        formula: 'v_esc = √(2GM/r)',
        descFa: 'حداقل سرعت خروج.',
        descEn: 'Minimum escape speed.',
        fields: [
          {k:'M', fa:'جرم', en:'Mass', u:'M⊕', min:0.1, max:1000, step:0.1, def:1},
          {k:'r', fa:'شعاع', en:'Radius', u:'R⊕', min:0.5, max:50, step:0.1, def:1}
        ],
        calc: v => {
          const M = v.M * CONST.M_EARTH;
          const r = v.r * CONST.R_EARTH;
          const vesc = Math.sqrt(2 * CONST.G * M / r);
          return [
            {fa:'سرعت گریز', en:'Escape speed', val:(vesc/1000).toFixed(2), u:'km/s'},
            {fa:'نسبت به زمین', en:'vs Earth', val:(vesc/11186).toFixed(2), u:'×'},
            {fa:'r', en:'r', val:(r/1000).toFixed(0), u:'km'}
          ];
        },
        explainFa: v => `v_esc=${(Math.sqrt(2*CONST.G*v.M*CONST.M_EARTH/(v.r*CONST.R_EARTH))/1000).toFixed(2)} km/s`,
        explainEn: v => `v_esc=${(Math.sqrt(2*CONST.G*v.M*CONST.M_EARTH/(v.r*CONST.R_EARTH))/1000).toFixed(2)} km/s`
      },
      blackbody: {
        nameFa: 'جسم سیاه', nameEn: 'Blackbody',
        formula: 'λ_max T = 2.897×10⁻³  ·  P = σAT⁴',
        descFa: 'قانون وین و استفان.',
        descEn: "Wien's and Stefan's laws.",
        fields: [
          {k:'T', fa:'دما', en:'Temperature', u:'K', min:100, max:10000, step:50, def:5800},
          {k:'A', fa:'مساحت', en:'Area', u:'m²', min:0.01, max:100, step:0.01, def:1}
        ],
        calc: v => {
          const lambda = 2.897771955e-3 / v.T;
          const P = CONST.SIGMA * v.A * v.T ** 4;
          return [
            {fa:'λ_max', en:'λ_max', val:(lambda*1e9).toFixed(1), u:'nm'},
            {fa:'توان کل', en:'Total power', val:P.toExponential(3), u:'W'},
            {fa:'', en:'', val:v.T>=5000&&v.T<=6000?'≈Sun':'', u:''}
          ];
        },
        explainFa: v => `λ_max≈${(2.897e-3/v.T*1e9).toFixed(1)} nm`,
        explainEn: v => `λ_max≈${(2.897e-3/v.T*1e9).toFixed(1)} nm`
      },
      photoelectric: {
        nameFa: 'فوتوالکتریک', nameEn: 'Photoelectric',
        formula: 'E = hf  ·  K_max = hf − φ',
        descFa: 'انرژی فوتون و الکترون.',
        descEn: 'Photon and electron energy.',
        fields: [
          {k:'lambda', fa:'طول موج', en:'Wavelength', u:'nm', min:100, max:800, step:10, def:400},
          {k:'phi', fa:'تابع کار', en:'Work function', u:'eV', min:1, max:6, step:0.1, def:2.3}
        ],
        calc: v => {
          const f = CONST.C / (v.lambda * 1e-9);
          const E_eV = (CONST.H * f) / CONST.E;
          const Kmax = E_eV - v.phi;
          return [
            {fa:'انرژی فوتون', en:'Photon energy', val:E_eV.toFixed(3), u:'eV'},
            {fa:'K_max', en:'K_max', val:Kmax>0?Kmax.toFixed(3):'0', u:'eV'},
            {fa:'فرکانس', en:'Frequency', val:(f/1e14).toFixed(2), u:'×10¹⁴ Hz'}
          ];
        },
        explainFa: v => {
          const E = (CONST.H*CONST.C/(v.lambda*1e-9))/CONST.E;
          return `hf=${E.toFixed(3)} eV · ${E>v.phi?'گسیل':'بدون گسیل'}`;
        },
        explainEn: v => {
          const E = (CONST.H*CONST.C/(v.lambda*1e-9))/CONST.E;
          return `hf=${E.toFixed(3)} eV · ${E>v.phi?'emission':'no emission'}`;
        }
      },
      deBroglie: {
        nameFa: 'دوبروی', nameEn: 'de Broglie',
        formula: 'λ = h / p = h /(mv)',
        descFa: 'طول موج ماده.',
        descEn: 'Matter wavelength.',
        fields: [
          {k:'m', fa:'جرم', en:'Mass', u:'u', min:0.0005, max:10, step:0.0001, def:1},
          {k:'v', fa:'سرعت', en:'Speed', u:'m/s', min:1, max:1e7, step:10, def:1e5}
        ],
        calc: v => {
          const mass = v.m * 1.660539e-27;
          const lambda = CONST.H / (mass * v.v);
          return [
            {fa:'λ', en:'λ', val:lambda.toExponential(3), u:'m'},
            {fa:'λ (pm)', en:'λ (pm)', val:(lambda*1e12).toFixed(3), u:'pm'},
            {fa:'تکانه', en:'Momentum', val:(mass*v.v).toExponential(3), u:'kg·m/s'}
          ];
        },
        explainFa: v => `λ=h/(mv) برای ${v.m} u`,
        explainEn: v => `λ=h/(mv) for ${v.m} u`
      },
      bohr: {
        nameFa: 'مدل بور', nameEn: 'Bohr model',
        formula: 'Eₙ = −13.6/n² eV  ·  rₙ = 0.529 n² Å',
        descFa: 'ترازهای هیدروژن.',
        descEn: 'Hydrogen energy levels.',
        fields: [
          {k:'n', fa:'تراز n', en:'Level n', u:'—', min:1, max:10, step:1, def:2}
        ],
        calc: v => {
          const E = -13.6 / (v.n ** 2);
          const r = 0.529 * v.n ** 2;
          const delta = v.n > 1 ? (-13.6/(v.n**2) + 13.6) : 0;
          return [
            {fa:'Eₙ', en:'Eₙ', val:E.toFixed(3), u:'eV'},
            {fa:'rₙ', en:'rₙ', val:r.toFixed(3), u:'Å'},
            {fa:'ΔE از پایه', en:'ΔE from ground', val:delta.toFixed(3), u:'eV'}
          ];
        },
        explainFa: v => `n=${v.n} → E=${(-13.6/(v.n**2)).toFixed(3)} eV`,
        explainEn: v => `n=${v.n} → E=${(-13.6/(v.n**2)).toFixed(3)} eV`
      },
      schwarzschild: {
        nameFa: 'شوارتزشیلد', nameEn: 'Schwarzschild',
        formula: 'Rₛ = 2GM/c²',
        descFa: 'افق رویداد سیاه‌چاله.',
        descEn: 'Black hole event horizon.',
        fields: [
          {k:'M', fa:'جرم', en:'Mass', u:'M☉', min:0.1, max:1e6, step:0.1, def:10}
        ],
        calc: v => {
          const Rs = 2 * CONST.G * v.M * CONST.M_SUN / (CONST.C ** 2);
          return [
            {fa:'Rₛ', en:'Rₛ', val:(Rs/1000).toFixed(2), u:'km'},
            {fa:'Rₛ/R☉', en:'Rₛ/R☉', val:(Rs/6.96e8).toFixed(4), u:''},
            {fa:'جرم', en:'Mass', val:v.M.toFixed(1), u:'M☉'}
          ];
        },
        explainFa: v => `Rₛ≈${(2*CONST.G*v.M*CONST.M_SUN/(CONST.C**2)/1000).toFixed(2)} km`,
        explainEn: v => `Rₛ≈${(2*CONST.G*v.M*CONST.M_SUN/(CONST.C**2)/1000).toFixed(2)} km`
      },
      hubble: {
        nameFa: 'قانون هابل', nameEn: "Hubble's law",
        formula: 'v = H₀ × d',
        descFa: 'سرعت دور شدن کهکشان.',
        descEn: 'Galaxy recession speed.',
        fields: [
          {k:'d', fa:'فاصله', en:'Distance', u:'Mpc', min:1, max:5000, step:1, def:100},
          {k:'H0', fa:'H₀', en:'H₀', u:'km/s/Mpc', min:50, max:100, step:1, def:70}
        ],
        calc: v => {
          const vel = v.H0 * v.d;
          const z = vel / 3e5;
          return [
            {fa:'سرعت', en:'Velocity', val:vel.toFixed(0), u:'km/s'},
            {fa:'z تقریبی', en:'Approx. z', val:z.toFixed(4), u:''},
            {fa:'فاصله', en:'Distance', val:v.d.toFixed(0), u:'Mpc'}
          ];
        },
        explainFa: v => `v=${v.H0}×${v.d}=${v.H0*v.d} km/s`,
        explainEn: v => `v=${v.H0}×${v.d}=${v.H0*v.d} km/s`
      }
    }
};
