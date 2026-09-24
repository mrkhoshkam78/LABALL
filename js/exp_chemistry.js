const EXP_CHEMISTRY = {

    titleFa: 'شیمی', titleEn: 'Chemistry', icon: '🧪',
    experiments: {
      periodic: {
        nameFa: 'جدول تناوبی', nameEn: 'Periodic table',
        formula: 'Z · atomic mass · e⁻ config',
        descFa: 'جدول کامل ۱۱۸ عنصری.',
        descEn: 'Full 118-element table.',
        fields: [],
        calc: () => [],
        explainFa: () => 'روی عنصر کلیک یا جستجو کنید.',
        explainEn: () => 'Click an element or search.'
      },
      reaction: {
        nameFa: 'ترکیب مواد', nameEn: 'Reactions',
        formula: 'A + B → product',
        descFa: 'واکنش‌های ساده آموزشی.',
        descEn: 'Simple educational reactions.',
        fields: [],
        calc: () => [],
        explainFa: () => 'دو عنصر را انتخاب کنید.',
        explainEn: () => 'Select two elements.'
      },
      molar: {
        nameFa: 'جرم مولی', nameEn: 'Molar mass',
        formula: 'n = m/M  ·  N = n × N_A',
        descFa: 'مول و تعداد ذرات.',
        descEn: 'Moles and particle count.',
        fields: [
          {k:'mass', fa:'جرم نمونه', en:'Sample mass', u:'g', min:0.1, max:500, step:0.1, def:18},
          {k:'M', fa:'جرم مولی', en:'Molar mass', u:'g/mol', min:1, max:300, step:0.1, def:18}
        ],
        calc: v => {
          const n = v.mass / v.M;
          const N = n * CONST.N_A;
          return [
            {fa:'مول', en:'Moles', val:n.toFixed(4), u:'mol'},
            {fa:'تعداد ذرات', en:'Particles', val:N.toExponential(3), u:''},
            {fa:'جرم مولی', en:'Molar mass', val:v.M.toFixed(2), u:'g/mol'}
          ];
        },
        explainFa: v => `n=${(v.mass/v.M).toFixed(4)} mol`,
        explainEn: v => `n=${(v.mass/v.M).toFixed(4)} mol`
      }
    }
};
