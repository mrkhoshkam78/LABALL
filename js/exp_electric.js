const EXP_ELECTRIC = {

    titleFa: 'برق و مدار', titleEn: 'Electricity', icon: '⚡',
    experiments: {
      ohm: {
        nameFa: 'قانون اهم', nameEn: "Ohm's law",
        formula: 'I = V/R  ·  P = VI = V²/R',
        descFa: 'جریان و توان مدار مقاومتی.',
        descEn: 'Current and power in a resistive circuit.',
        fields: [
          {k:'v', fa:'ولتاژ', en:'Voltage', u:'V', min:0.5, max:48, step:0.5, def:12},
          {k:'r', fa:'مقاومت', en:'Resistance', u:'Ω', min:1, max:200, step:1, def:6}
        ],
        calc: v => {
          const i = v.v / v.r, p = v.v * i;
          return [
            {fa:'جریان', en:'Current', val:i.toFixed(3), u:'A'},
            {fa:'توان', en:'Power', val:p.toFixed(2), u:'W'},
            {fa:'مقاومت', en:'Resistance', val:v.r.toFixed(1), u:'Ω'}
          ];
        },
        explainFa: v => `I=${(v.v/v.r).toFixed(3)} A · P=${(v.v*v.v/v.r).toFixed(2)} W`,
        explainEn: v => `I=${(v.v/v.r).toFixed(3)} A · P=${(v.v*v.v/v.r).toFixed(2)} W`
      },
      series: {
        nameFa: 'مقاومت سری', nameEn: 'Series resistors',
        formula: 'R_eq = R₁+R₂+R₃  ·  I = V/R_eq',
        descFa: 'سه مقاومت سری.',
        descEn: 'Three resistors in series.',
        fields: [
          {k:'v', fa:'ولتاژ', en:'Voltage', u:'V', min:1, max:48, step:1, def:12},
          {k:'r1', fa:'R₁', en:'R₁', u:'Ω', min:1, max:100, step:1, def:10},
          {k:'r2', fa:'R₂', en:'R₂', u:'Ω', min:1, max:100, step:1, def:20},
          {k:'r3', fa:'R₃', en:'R₃', u:'Ω', min:1, max:100, step:1, def:30}
        ],
        calc: v => {
          const Req = v.r1 + v.r2 + v.r3;
          const I = v.v / Req;
          return [
            {fa:'R معادل', en:'R equivalent', val:Req.toFixed(1), u:'Ω'},
            {fa:'جریان', en:'Current', val:I.toFixed(3), u:'A'},
            {fa:'افت R₁', en:'Drop on R₁', val:(I*v.r1).toFixed(2), u:'V'}
          ];
        },
        explainFa: v => `R_eq=${v.r1+v.r2+v.r3} Ω → I=${(v.v/(v.r1+v.r2+v.r3)).toFixed(3)} A`,
        explainEn: v => `R_eq=${v.r1+v.r2+v.r3} Ω → I=${(v.v/(v.r1+v.r2+v.r3)).toFixed(3)} A`
      },
      parallel: {
        nameFa: 'مقاومت موازی', nameEn: 'Parallel resistors',
        formula: '1/R_eq = 1/R₁ + 1/R₂',
        descFa: 'دو مقاومت موازی.',
        descEn: 'Two resistors in parallel.',
        fields: [
          {k:'v', fa:'ولتاژ', en:'Voltage', u:'V', min:1, max:48, step:1, def:12},
          {k:'r1', fa:'R₁', en:'R₁', u:'Ω', min:1, max:200, step:1, def:10},
          {k:'r2', fa:'R₂', en:'R₂', u:'Ω', min:1, max:200, step:1, def:20}
        ],
        calc: v => {
          const Req = 1 / (1/v.r1 + 1/v.r2);
          const It = v.v / Req;
          return [
            {fa:'R معادل', en:'R equivalent', val:Req.toFixed(2), u:'Ω'},
            {fa:'جریان کل', en:'Total current', val:It.toFixed(3), u:'A'},
            {fa:'جریان R₁', en:'Current R₁', val:(v.v/v.r1).toFixed(3), u:'A'}
          ];
        },
        explainFa: v => `R_eq=${(1/(1/v.r1+1/v.r2)).toFixed(2)} Ω`,
        explainEn: v => `R_eq=${(1/(1/v.r1+1/v.r2)).toFixed(2)} Ω`
      },
      capacitor: {
        nameFa: 'خازن', nameEn: 'Capacitor',
        formula: 'Q = CV  ·  E = ½CV²  ·  τ = RC',
        descFa: 'بار، انرژی و ثابت زمانی.',
        descEn: 'Charge, energy and time constant.',
        fields: [
          {k:'c', fa:'ظرفیت', en:'Capacitance', u:'μF', min:0.1, max:1000, step:0.1, def:100},
          {k:'v', fa:'ولتاژ', en:'Voltage', u:'V', min:1, max:50, step:1, def:12},
          {k:'r', fa:'مقاومت', en:'Resistance', u:'Ω', min:100, max:10000, step:100, def:1000}
        ],
        calc: v => {
          const C = v.c * 1e-6;
          const Q = C * v.v;
          const E = 0.5 * C * v.v * v.v;
          const tau = v.r * C;
          return [
            {fa:'بار', en:'Charge', val:(Q*1e6).toFixed(2), u:'μC'},
            {fa:'انرژی', en:'Energy', val:(E*1000).toFixed(3), u:'mJ'},
            {fa:'τ', en:'τ', val:(tau*1000).toFixed(2), u:'ms'}
          ];
        },
        explainFa: v => `C=${v.c} μF @ ${v.v} V → E=${(0.5*v.c*1e-6*v.v*v.v*1000).toFixed(3)} mJ`,
        explainEn: v => `C=${v.c} μF @ ${v.v} V → E=${(0.5*v.c*1e-6*v.v*v.v*1000).toFixed(3)} mJ`
      },
      coulomb: {
        nameFa: 'قانون کولن', nameEn: "Coulomb's law",
        formula: 'F = k|q₁q₂|/r²',
        descFa: 'نیروی بین دو بار نقطه‌ای.',
        descEn: 'Force between two point charges.',
        fields: [
          {k:'q1', fa:'بار ۱', en:'Charge 1', u:'μC', min:-50, max:50, step:0.5, def:5},
          {k:'q2', fa:'بار ۲', en:'Charge 2', u:'μC', min:-50, max:50, step:0.5, def:-3},
          {k:'r', fa:'فاصله', en:'Distance', u:'cm', min:1, max:100, step:1, def:10}
        ],
        calc: v => {
          const F = CONST.K_COULOMB * Math.abs(v.q1*1e-6 * v.q2*1e-6) / ((v.r/100)**2);
          const attr = (v.q1*v.q2) < 0;
          return [
            {fa:'نیرو', en:'Force', val:F.toFixed(3), u:'N'},
            {fa:'نوع', en:'Type', val:attr?'ربایش':'رانش', u:''},
            {fa:'فاصله', en:'Distance', val:v.r.toFixed(0), u:'cm'}
          ];
        },
        explainFa: v => `F=${(CONST.K_COULOMB*Math.abs(v.q1*1e-6*v.q2*1e-6)/((v.r/100)**2)).toFixed(3)} N`,
        explainEn: v => `F=${(CONST.K_COULOMB*Math.abs(v.q1*1e-6*v.q2*1e-6)/((v.r/100)**2)).toFixed(3)} N`
      },
      magnetic: {
        nameFa: 'نیروی لورنتس', nameEn: 'Lorentz force',
        formula: 'F = qvB sinθ  ·  r = mv/(qB)',
        descFa: 'نیروی مغناطیسی روی بار متحرک.',
        descEn: 'Magnetic force on a moving charge.',
        fields: [
          {k:'q', fa:'بار', en:'Charge', u:'e', min:1, max:10, step:1, def:1},
          {k:'v', fa:'سرعت', en:'Speed', u:'m/s', min:1e3, max:1e7, step:1e3, def:1e5},
          {k:'B', fa:'میدان B', en:'B field', u:'T', min:0.01, max:5, step:0.01, def:0.5},
          {k:'theta', fa:'زاویه', en:'Angle', u:'°', min:0, max:90, step:5, def:90}
        ],
        calc: v => {
          const q = v.q * CONST.E;
          const F = q * v.v * v.B * Math.sin(v.theta * Math.PI / 180);
          const r = (CONST.M_E * v.v) / (q * v.B);
          return [
            {fa:'نیرو', en:'Force', val:F.toExponential(3), u:'N'},
            {fa:'شعاع مسیر', en:'Path radius', val:r.toExponential(3), u:'m'},
            {fa:'sinθ', en:'sinθ', val:Math.sin(v.theta*Math.PI/180).toFixed(3), u:''}
          ];
        },
        explainFa: v => `F=qvBsinθ برای v=${v.v} در B=${v.B} T`,
        explainEn: v => `F=qvBsinθ for v=${v.v} in B=${v.B} T`
      },
      transformer: {
        nameFa: 'ترانسفورماتور', nameEn: 'Transformer',
        formula: 'Vₛ/Vₚ = Nₛ/Nₚ',
        descFa: 'نسبت ولتاژ ایده‌آل.',
        descEn: 'Ideal voltage ratio.',
        fields: [
          {k:'vp', fa:'ولتاژ اولیه', en:'Primary V', u:'V', min:50, max:500, step:10, def:220},
          {k:'np', fa:'دور اولیه', en:'Primary turns', u:'—', min:50, max:1000, step:10, def:200},
          {k:'ns', fa:'دور ثانویه', en:'Secondary turns', u:'—', min:10, max:2000, step:10, def:100}
        ],
        calc: v => {
          const vs = v.vp * (v.ns / v.np);
          const ratio = v.ns / v.np;
          return [
            {fa:'ولتاژ ثانویه', en:'Secondary V', val:vs.toFixed(1), u:'V'},
            {fa:'نسبت دور', en:'Turns ratio', val:ratio.toFixed(3), u:''},
            {fa:'نوع', en:'Type', val:ratio>1?'افزاینده':'کاهنده', u:''}
          ];
        },
        explainFa: v => `Vₛ=${(v.vp*v.ns/v.np).toFixed(1)} V`,
        explainEn: v => `Vₛ=${(v.vp*v.ns/v.np).toFixed(1)} V`
      },
      rlc: {
        nameFa: 'مدار RLC', nameEn: 'RLC circuit',
        formula: 'f₀ = 1/(2π√LC)  ·  Z = √[R²+(X_L−X_C)²]',
        descFa: 'فرکانس تشدید و امپدانس.',
        descEn: 'Resonant frequency and impedance.',
        fields: [
          {k:'r', fa:'R', en:'R', u:'Ω', min:1, max:500, step:1, def:50},
          {k:'l', fa:'L', en:'L', u:'mH', min:0.1, max:100, step:0.1, def:10},
          {k:'c', fa:'C', en:'C', u:'μF', min:0.01, max:100, step:0.01, def:1},
          {k:'f', fa:'فرکانس', en:'Frequency', u:'Hz', min:10, max:5000, step:10, def:500}
        ],
        calc: v => {
          const L = v.l*1e-3, C = v.c*1e-6;
          const f0 = 1 / (2*Math.PI*Math.sqrt(L*C));
          const XL = 2*Math.PI*v.f*L;
          const XC = 1 / (2*Math.PI*v.f*C);
          const Z = Math.sqrt(v.r**2 + (XL-XC)**2);
          return [
            {fa:'f₀ تشدید', en:'Resonant f₀', val:f0.toFixed(1), u:'Hz'},
            {fa:'امپدانس Z', en:'Impedance Z', val:Z.toFixed(1), u:'Ω'},
            {fa:'X_L−X_C', en:'X_L−X_C', val:(XL-XC).toFixed(1), u:'Ω'}
          ];
        },
        explainFa: v => `f₀≈${(1/(2*Math.PI*Math.sqrt(v.l*1e-3*v.c*1e-6))).toFixed(1)} Hz`,
        explainEn: v => `f₀≈${(1/(2*Math.PI*Math.sqrt(v.l*1e-3*v.c*1e-6))).toFixed(1)} Hz`
      },
      powerfactor: {
        nameFa: 'ضریب توان', nameEn: 'Power factor',
        formula: 'PF = cosφ = P/S  ·  Q = √(S²−P²)',
        descFa: 'توان حقیقی، ظاهری و راکتیو.',
        descEn: 'Real, apparent and reactive power.',
        fields: [
          {k:'P', fa:'توان حقیقی', en:'Real power', u:'W', min:10, max:5000, step:10, def:1000},
          {k:'S', fa:'توان ظاهری', en:'Apparent power', u:'VA', min:10, max:6000, step:10, def:1200}
        ],
        calc: v => {
          const pf = Math.min(1, v.P / v.S);
          const Q = Math.sqrt(Math.max(0, v.S**2 - v.P**2));
          const phi = Math.acos(pf) * 180 / Math.PI;
          return [
            {fa:'ضریب توان', en:'Power factor', val:pf.toFixed(3), u:''},
            {fa:'توان راکتیو', en:'Reactive power', val:Q.toFixed(1), u:'VAR'},
            {fa:'زاویه φ', en:'Angle φ', val:phi.toFixed(1), u:'°'}
          ];
        },
        explainFa: v => `PF=${(v.P/v.S).toFixed(3)}`,
        explainEn: v => `PF=${(v.P/v.S).toFixed(3)}`
      },
      kirchhoff: {
        nameFa: 'کیرشهف', nameEn: 'Kirchhoff',
        formula: 'ΣV = 0  ·  ΣI = 0',
        descFa: 'جریان در حلقه ساده.',
        descEn: 'Current in a simple loop.',
        fields: [
          {k:'v1', fa:'منبع ۱', en:'Source 1', u:'V', min:1, max:30, step:1, def:12},
          {k:'v2', fa:'منبع ۲', en:'Source 2', u:'V', min:1, max:30, step:1, def:6},
          {k:'r1', fa:'R₁', en:'R₁', u:'Ω', min:1, max:50, step:1, def:10},
          {k:'r2', fa:'R₂', en:'R₂', u:'Ω', min:1, max:50, step:1, def:15}
        ],
        calc: v => {
          const I = (v.v1 - v.v2) / (v.r1 + v.r2);
          return [
            {fa:'جریان حلقه', en:'Loop current', val:I.toFixed(3), u:'A'},
            {fa:'افت R₁', en:'Drop R₁', val:(Math.abs(I)*v.r1).toFixed(2), u:'V'},
            {fa:'افت R₂', en:'Drop R₂', val:(Math.abs(I)*v.r2).toFixed(2), u:'V'}
          ];
        },
        explainFa: v => `I≈${((v.v1-v.v2)/(v.r1+v.r2)).toFixed(3)} A`,
        explainEn: v => `I≈${((v.v1-v.v2)/(v.r1+v.r2)).toFixed(3)} A`
      }
    }
};
