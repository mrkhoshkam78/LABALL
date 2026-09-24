const EXP_WAVE = {

    titleFa: 'موج و صوت', titleEn: 'Waves & Sound', icon: '〰️',
    experiments: {
      sine: {
        nameFa: 'موج سینوسی', nameEn: 'Sine wave',
        formula: 'y = A sin(2πft − kx + φ)',
        descFa: 'شکل موج و پارامترها.',
        descEn: 'Wave shape and parameters.',
        fields: [
          {k:'A', fa:'دامنه', en:'Amplitude', u:'—', min:0.2, max:5, step:0.1, def:2},
          {k:'f', fa:'فرکانس', en:'Frequency', u:'Hz', min:0.2, max:5, step:0.1, def:1},
          {k:'phase', fa:'فاز', en:'Phase', u:'rad', min:0, max:6.28, step:0.1, def:0}
        ],
        calc: v => [
          {fa:'دوره', en:'Period', val:(1/v.f).toFixed(3), u:'s'},
          {fa:'فرکانس', en:'Frequency', val:v.f.toFixed(2), u:'Hz'},
          {fa:'دامنه', en:'Amplitude', val:v.A.toFixed(2), u:''}
        ],
        explainFa: v => `f=${v.f} Hz · A=${v.A}`,
        explainEn: v => `f=${v.f} Hz · A=${v.A}`
      },
      string: {
        nameFa: 'موج ریسمان', nameEn: 'String wave',
        formula: 'v = √(T/μ)  ·  λ = 2L/n',
        descFa: 'سرعت موج و طول موج.',
        descEn: 'Wave speed and wavelength.',
        fields: [
          {k:'T', fa:'کشش', en:'Tension', u:'N', min:1, max:200, step:1, def:50},
          {k:'mu', fa:'چگالی خطی', en:'Linear density', u:'g/m', min:0.5, max:20, step:0.5, def:5},
          {k:'L', fa:'طول', en:'Length', u:'m', min:0.2, max:5, step:0.1, def:1},
          {k:'n', fa:'هماهنگ', en:'Harmonic', u:'—', min:1, max:8, step:1, def:1}
        ],
        calc: v => {
          const vel = Math.sqrt(v.T / (v.mu/1000));
          const lambda = 2 * v.L / v.n;
          const f = vel / lambda;
          return [
            {fa:'سرعت موج', en:'Wave speed', val:vel.toFixed(1), u:'m/s'},
            {fa:'λ', en:'λ', val:lambda.toFixed(3), u:'m'},
            {fa:'فرکانس', en:'Frequency', val:f.toFixed(1), u:'Hz'}
          ];
        },
        explainFa: v => `v=√(T/μ)=${Math.sqrt(v.T/(v.mu/1000)).toFixed(1)} m/s`,
        explainEn: v => `v=√(T/μ)=${Math.sqrt(v.T/(v.mu/1000)).toFixed(1)} m/s`
      },
      doppler: {
        nameFa: 'اثر داپلر', nameEn: 'Doppler effect',
        formula: "f′ = f (v±vₒ)/(v±vₛ)",
        descFa: 'فرکانس شنیده‌شده.',
        descEn: 'Heard frequency.',
        fields: [
          {k:'f', fa:'فرکانس منبع', en:'Source freq.', u:'Hz', min:100, max:2000, step:10, def:440},
          {k:'vs', fa:'سرعت منبع', en:'Source speed', u:'m/s', min:-50, max:50, step:1, def:0},
          {k:'vo', fa:'سرعت ناظر', en:'Observer speed', u:'m/s', min:-50, max:50, step:1, def:0},
          {k:'v', fa:'سرعت صوت', en:'Sound speed', u:'m/s', min:300, max:400, step:1, def:343}
        ],
        calc: v => {
          const fp = v.f * (v.v + v.vo) / (v.v + v.vs);
          return [
            {fa:'f′ شنیده‌شده', en:'Heard f′', val:fp.toFixed(1), u:'Hz'},
            {fa:'Δf', en:'Δf', val:(fp-v.f).toFixed(1), u:'Hz'},
            {fa:'نسبت', en:'Ratio', val:(fp/v.f).toFixed(4), u:''}
          ];
        },
        explainFa: v => `f′=${(v.f*(v.v+v.vo)/(v.v+v.vs)).toFixed(1)} Hz`,
        explainEn: v => `f′=${(v.f*(v.v+v.vo)/(v.v+v.vs)).toFixed(1)} Hz`
      },
      beats: {
        nameFa: 'ضربان', nameEn: 'Beats',
        formula: 'f_beat = |f₁ − f₂|',
        descFa: 'فرکانس ضربان.',
        descEn: 'Beat frequency.',
        fields: [
          {k:'f1', fa:'فرکانس ۱', en:'Frequency 1', u:'Hz', min:100, max:1000, step:1, def:440},
          {k:'f2', fa:'فرکانس ۲', en:'Frequency 2', u:'Hz', min:100, max:1000, step:1, def:444}
        ],
        calc: v => {
          const fb = Math.abs(v.f1 - v.f2);
          return [
            {fa:'فرکانس ضربان', en:'Beat freq.', val:fb.toFixed(1), u:'Hz'},
            {fa:'دوره ضربان', en:'Beat period', val:fb>0?(1/fb).toFixed(3):'∞', u:'s'},
            {fa:'میانگین', en:'Average', val:((v.f1+v.f2)/2).toFixed(1), u:'Hz'}
          ];
        },
        explainFa: v => `f_beat=|${v.f1}−${v.f2}|=${Math.abs(v.f1-v.f2).toFixed(1)} Hz`,
        explainEn: v => `f_beat=|${v.f1}−${v.f2}|=${Math.abs(v.f1-v.f2).toFixed(1)} Hz`
      }
    }
};
