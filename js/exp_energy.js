const EXP_ENERGY = {

    titleFa: 'انرژی مکانیکی', titleEn: 'Mechanical Energy', icon: '🔋',
    experiments: {
      kinetic_potential: {
        nameFa: 'جنبشی و پتانسیل', nameEn: 'Kinetic & potential',
        formula: 'Eₖ = ½mv²  ·  Eₚ = mgh  ·  E = Eₖ+Eₚ',
        descFa: 'مقایسه انرژی جنبشی و پتانسیل.',
        descEn: 'Compare kinetic and potential energy.',
        fields: [
          {k:'m', fa:'جرم', en:'Mass', u:'kg', min:0.1, max:100, step:0.5, def:5},
          {k:'v', fa:'سرعت', en:'Speed', u:'m/s', min:0, max:50, step:0.5, def:10},
          {k:'h', fa:'ارتفاع', en:'Height', u:'m', min:0, max:100, step:1, def:8}
        ],
        calc: v => {
          const k = 0.5 * v.m * v.v * v.v;
          const p = v.m * CONST.G_EARTH * v.h;
          return [
            {fa:'Eₖ', en:'Eₖ', val:k.toFixed(2), u:'J'},
            {fa:'Eₚ', en:'Eₚ', val:p.toFixed(2), u:'J'},
            {fa:'کل', en:'Total', val:(k+p).toFixed(2), u:'J'}
          ];
        },
        explainFa: v => `E کل = ${(0.5*v.m*v.v*v.v + v.m*CONST.G_EARTH*v.h).toFixed(2)} J`,
        explainEn: v => `Total E = ${(0.5*v.m*v.v*v.v + v.m*CONST.G_EARTH*v.h).toFixed(2)} J`
      },
      conservation: {
        nameFa: 'پایستگی انرژی', nameEn: 'Energy conservation',
        formula: 'mgh = ½mv² → v = √(2gh)',
        descFa: 'تبدیل پتانسیل به جنبشی.',
        descEn: 'Potential to kinetic conversion.',
        fields: [
          {k:'h', fa:'ارتفاع', en:'Height', u:'m', min:1, max:100, step:1, def:20},
          {k:'g', fa:'g', en:'g', u:'m/s²', min:5, max:15, step:0.1, def:9.81}
        ],
        calc: v => {
          const vel = Math.sqrt(2 * v.g * v.h);
          const Ep = v.g * v.h;
          return [
            {fa:'سرعت پایین', en:'Bottom speed', val:vel.toFixed(2), u:'m/s'},
            {fa:'Eₚ اولیه', en:'Initial Eₚ', val:Ep.toFixed(2), u:'J/kg'},
            {fa:'Eₖ نهایی', en:'Final Eₖ', val:Ep.toFixed(2), u:'J/kg'}
          ];
        },
        explainFa: v => `از ${v.h} m → v=√(2gh)=${Math.sqrt(2*v.g*v.h).toFixed(2)} m/s`,
        explainEn: v => `From ${v.h} m → v=√(2gh)=${Math.sqrt(2*v.g*v.h).toFixed(2)} m/s`
      },
      elastic: {
        nameFa: 'انرژی فنر', nameEn: 'Spring energy',
        formula: 'U = ½kx²  ·  F = −kx',
        descFa: 'انرژی ذخیره‌شده در فنر.',
        descEn: 'Energy stored in a spring.',
        fields: [
          {k:'k', fa:'ثابت فنر', en:'Spring k', u:'N/m', min:10, max:1000, step:10, def:200},
          {k:'x', fa:'تغییر طول', en:'Extension', u:'m', min:0.01, max:1, step:0.01, def:0.15}
        ],
        calc: v => {
          const U = 0.5 * v.k * v.x * v.x;
          const F = v.k * v.x;
          return [
            {fa:'انرژی کشسانی', en:'Elastic energy', val:U.toFixed(3), u:'J'},
            {fa:'نیروی فنر', en:'Spring force', val:F.toFixed(2), u:'N'},
            {fa:'x', en:'x', val:v.x.toFixed(3), u:'m'}
          ];
        },
        explainFa: v => `U=½×${v.k}×${v.x}²=${(0.5*v.k*v.x*v.x).toFixed(3)} J`,
        explainEn: v => `U=½×${v.k}×${v.x}²=${(0.5*v.k*v.x*v.x).toFixed(3)} J`
      },
      power_mech: {
        nameFa: 'توان مکانیکی', nameEn: 'Mechanical power',
        formula: 'P = Fv  ·  P = W/t',
        descFa: 'توان لحظه‌ای.',
        descEn: 'Instantaneous power.',
        fields: [
          {k:'F', fa:'نیرو', en:'Force', u:'N', min:1, max:1000, step:1, def:200},
          {k:'v', fa:'سرعت', en:'Speed', u:'m/s', min:0.1, max:30, step:0.1, def:5},
          {k:'t', fa:'زمان', en:'Time', u:'s', min:0.5, max:60, step:0.5, def:10}
        ],
        calc: v => {
          const P = v.F * v.v;
          const W = P * v.t;
          return [
            {fa:'توان', en:'Power', val:P.toFixed(1), u:'W'},
            {fa:'کار', en:'Work', val:W.toFixed(0), u:'J'},
            {fa:'توان (kW)', en:'Power (kW)', val:(P/1000).toFixed(3), u:'kW'}
          ];
        },
        explainFa: v => `P=${v.F}×${v.v}=${(v.F*v.v).toFixed(1)} W`,
        explainEn: v => `P=${v.F}×${v.v}=${(v.F*v.v).toFixed(1)} W`
      },
      efficiency: {
        nameFa: 'بازده', nameEn: 'Efficiency',
        formula: 'η = W_out / E_in × 100%',
        descFa: 'بازده ماشین.',
        descEn: 'Machine efficiency.',
        fields: [
          {k:'Ein', fa:'انرژی ورودی', en:'Input energy', u:'J', min:100, max:10000, step:50, def:2000},
          {k:'Wout', fa:'کار مفید', en:'Useful work', u:'J', min:50, max:9000, step:50, def:1200}
        ],
        calc: v => {
          const eta = Math.min(100, (v.Wout / v.Ein) * 100);
          const loss = v.Ein - v.Wout;
          return [
            {fa:'بازده', en:'Efficiency', val:eta.toFixed(1), u:'%'},
            {fa:'اتلاف', en:'Loss', val:loss.toFixed(0), u:'J'},
            {fa:'نسبت', en:'Ratio', val:(v.Wout/v.Ein).toFixed(3), u:''}
          ];
        },
        explainFa: v => `η=${((v.Wout/v.Ein)*100).toFixed(1)}%`,
        explainEn: v => `η=${((v.Wout/v.Ein)*100).toFixed(1)}%`
      },
      pendulum: {
        nameFa: 'آونگ ساده', nameEn: 'Simple pendulum',
        formula: 'T = 2π√(L/g)',
        descFa: 'دوره تناوب آونگ (زاویه کوچک).',
        descEn: 'Pendulum period (small angle).',
        fields: [
          {k:'L', fa:'طول', en:'Length', u:'m', min:0.1, max:5, step:0.05, def:1},
          {k:'g', fa:'g', en:'g', u:'m/s²', min:5, max:15, step:0.1, def:9.81},
          {k:'theta', fa:'زاویه بیشینه', en:'Max angle', u:'°', min:1, max:30, step:1, def:15}
        ],
        calc: v => {
          const T = 2 * Math.PI * Math.sqrt(v.L / v.g);
          const th = v.theta * Math.PI / 180;
          const E = 0.5 * v.g * v.L * th * th;
          return [
            {fa:'دوره تناوب', en:'Period', val:T.toFixed(3), u:'s'},
            {fa:'فرکانس', en:'Frequency', val:(1/T).toFixed(3), u:'Hz'},
            {fa:'انرژی تقریبی', en:'Approx. energy', val:E.toFixed(4), u:'J/kg'}
          ];
        },
        explainFa: v => `T=2π√(${v.L}/${v.g})=${(2*Math.PI*Math.sqrt(v.L/v.g)).toFixed(3)} s`,
        explainEn: v => `T=2π√(${v.L}/${v.g})=${(2*Math.PI*Math.sqrt(v.L/v.g)).toFixed(3)} s`
      },
      gravity_pe: {
        nameFa: 'پتانسیل گرانشی', nameEn: 'Gravitational PE',
        formula: 'U = −GMm/r  ·  g = GM/r²',
        descFa: 'پتانسیل و شتاب در فاصله r.',
        descEn: 'Potential and g at distance r.',
        fields: [
          {k:'M', fa:'جرم مرکزی', en:'Central mass', u:'M⊕', min:0.1, max:100, step:0.1, def:1},
          {k:'r', fa:'فاصله', en:'Distance', u:'R⊕', min:1, max:20, step:0.1, def:2},
          {k:'m', fa:'جرم آزمون', en:'Test mass', u:'kg', min:1, max:1000, step:1, def:10}
        ],
        calc: v => {
          const M = v.M * CONST.M_EARTH;
          const r = v.r * CONST.R_EARTH;
          const U = -CONST.G * M * v.m / r;
          const g = CONST.G * M / (r * r);
          return [
            {fa:'U', en:'U', val:U.toExponential(3), u:'J'},
            {fa:'g محلی', en:'Local g', val:g.toFixed(3), u:'m/s²'},
            {fa:'r', en:'r', val:(r/1000).toFixed(0), u:'km'}
          ];
        },
        explainFa: v => `در ${v.r} R⊕ → g=${(CONST.G*v.M*CONST.M_EARTH/(v.r*CONST.R_EARTH)**2).toFixed(3)} m/s²`,
        explainEn: v => `At ${v.r} R⊕ → g=${(CONST.G*v.M*CONST.M_EARTH/(v.r*CONST.R_EARTH)**2).toFixed(3)} m/s²`
      },
      collision_energy: {
        nameFa: 'اتلاف در برخورد', nameEn: 'Collision energy loss',
        formula: 'e = (v₂′−v₁′)/(v₁−v₂)  ·  KE loss',
        descFa: 'ضریب بازگشت و انرژی از دست‌رفته.',
        descEn: 'Coefficient of restitution and lost KE.',
        fields: [
          {k:'m1', fa:'جرم ۱', en:'Mass 1', u:'kg', min:0.5, max:20, step:0.5, def:2},
          {k:'v1', fa:'سرعت ۱', en:'Velocity 1', u:'m/s', min:1, max:20, step:0.5, def:8},
          {k:'m2', fa:'جرم ۲', en:'Mass 2', u:'kg', min:0.5, max:20, step:0.5, def:4},
          {k:'e', fa:'ضریب e', en:'Coeff. e', u:'—', min:0, max:1, step:0.05, def:0.6}
        ],
        calc: v => {
          const KEi = 0.5 * v.m1 * v.v1 * v.v1;
          const v1f = ((v.m1 - v.e * v.m2) * v.v1) / (v.m1 + v.m2);
          const v2f = ((1 + v.e) * v.m1 * v.v1) / (v.m1 + v.m2);
          const KEf = 0.5 * v.m1 * v1f * v1f + 0.5 * v.m2 * v2f * v2f;
          return [
            {fa:'KE اولیه', en:'Initial KE', val:KEi.toFixed(2), u:'J'},
            {fa:'KE نهایی', en:'Final KE', val:KEf.toFixed(2), u:'J'},
            {fa:'اتلاف', en:'Loss', val:(KEi - KEf).toFixed(2), u:'J'}
          ];
        },
        explainFa: v => {
          const KEi = 0.5*v.m1*v.v1*v.v1;
          const v1f = ((v.m1-v.e*v.m2)*v.v1)/(v.m1+v.m2);
          const v2f = ((1+v.e)*v.m1*v.v1)/(v.m1+v.m2);
          const KEf = 0.5*v.m1*v1f*v1f + 0.5*v.m2*v2f*v2f;
          return `e=${v.e} → اتلاف ${(KEi-KEf).toFixed(2)} J`;
        },
        explainEn: v => {
          const KEi = 0.5*v.m1*v.v1*v.v1;
          const v1f = ((v.m1-v.e*v.m2)*v.v1)/(v.m1+v.m2);
          const v2f = ((1+v.e)*v.m1*v.v1)/(v.m1+v.m2);
          const KEf = 0.5*v.m1*v1f*v1f + 0.5*v.m2*v2f*v2f;
          return `e=${v.e} → loss ${(KEi-KEf).toFixed(2)} J`;
        }
      },
      heat_mech: {
        nameFa: 'کار به گرما', nameEn: 'Work to heat',
        formula: 'Q = Fd  ·  ΔT = Q/(mc)',
        descFa: 'گرمایش ناشی از کار اصطکاکی.',
        descEn: 'Heating from frictional work.',
        fields: [
          {k:'F', fa:'نیرو', en:'Force', u:'N', min:1, max:500, step:1, def:50},
          {k:'d', fa:'مسافت', en:'Distance', u:'m', min:1, max:100, step:1, def:20},
          {k:'m', fa:'جرم', en:'Mass', u:'kg', min:0.1, max:10, step:0.1, def:1},
          {k:'c', fa:'ظرفیت ویژه', en:'Specific heat', u:'J/kg·K', min:100, max:5000, step:50, def:900}
        ],
        calc: v => {
          const Q = v.F * v.d;
          const dT = Q / (v.m * v.c);
          return [
            {fa:'گرما Q', en:'Heat Q', val:Q.toFixed(0), u:'J'},
            {fa:'ΔT', en:'ΔT', val:dT.toFixed(2), u:'K'},
            {fa:'انرژی بر جرم', en:'Energy/mass', val:(Q/v.m).toFixed(1), u:'J/kg'}
          ];
        },
        explainFa: v => `Q=${v.F*v.d} J → ΔT=${(v.F*v.d/(v.m*v.c)).toFixed(2)} K`,
        explainEn: v => `Q=${v.F*v.d} J → ΔT=${(v.F*v.d/(v.m*v.c)).toFixed(2)} K`
      },
      orbital_energy: {
        nameFa: 'انرژی مداری', nameEn: 'Orbital energy',
        formula: 'E = −GMm/(2a)  ·  Eₖ = GMm/(2a)',
        descFa: 'انرژی کل در مدار دایره‌ای.',
        descEn: 'Total energy in circular orbit.',
        fields: [
          {k:'M', fa:'جرم مرکزی', en:'Central mass', u:'M☉', min:0.1, max:5, step:0.1, def:1},
          {k:'a', fa:'نیم‌محور', en:'Semi-major axis', u:'AU', min:0.1, max:10, step:0.1, def:1},
          {k:'m', fa:'جرم ماهواره', en:'Satellite mass', u:'kg', min:1, max:1000, step:1, def:100}
        ],
        calc: v => {
          const M = v.M * CONST.M_SUN;
          const a = v.a * CONST.AU;
          const E = -CONST.G * M * v.m / (2 * a);
          return [
            {fa:'E کل', en:'Total E', val:E.toExponential(3), u:'J'},
            {fa:'Eₖ', en:'Eₖ', val:(-E).toExponential(3), u:'J'},
            {fa:'Eₚ', en:'Eₚ', val:(2*E).toExponential(3), u:'J'}
          ];
        },
        explainFa: v => `E=−GMm/(2a) برای a=${v.a} AU`,
        explainEn: v => `E=−GMm/(2a) for a=${v.a} AU`
      }
    }
};
