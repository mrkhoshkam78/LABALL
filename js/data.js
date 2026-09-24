// ─── Precise constants ─────────────────────────────────────────────────────
const CONST = {
  G: 6.67430e-11,
  M_SUN: 1.98847e30,
  M_EARTH: 5.9722e24,
  R_EARTH: 6.371e6,
  AU: 1.495978707e11,
  C: 299792458,
  H: 6.62607015e-34,
  HBAR: 1.054571817e-34,
  K_B: 1.380649e-23,
  SIGMA: 5.670374419e-8,
  E: 1.602176634e-19,
  M_E: 9.1093837e-31,
  G_EARTH: 9.80665,
  K_COULOMB: 8.9875517923e9,
  N_A: 6.02214076e23
};

// ─── UI strings (FA / EN) ──────────────────────────────────────────────────
const STR = {
  fa: {
    offline: 'کاملاً آفلاین',
    settings: 'تنظیمات',
    theme: 'تم رنگی',
    language: 'زبان',
    run: '▶ اجرا',
    reset: '↺ بازنشانی',
    save: '☆ ذخیره',
    saved: '✓ ذخیره شد',
    resetMsg: 'پارامترها بازنشانی شدند',
    results: 'نتایج و مشاهده‌گر',
    resultsSub: 'محاسبات زنده و انیمیشن آزمایش',
    liveAnim: 'انیمیشن زنده',
    searchEl: 'جستجوی عنصر',
    pickTwo: 'دو عنصر را انتخاب کنید',
    noReaction: 'واکنش آموزشی ثبت‌نشده',
    guide: 'راهنما',
    clickEl: 'روی عنصر کلیک یا جستجو کنید'
  },
  en: {
    offline: 'Fully offline',
    settings: 'Settings',
    theme: 'Color theme',
    language: 'Language',
    run: '▶ Run',
    reset: '↺ Reset',
    save: '☆ Save',
    saved: '✓ Saved',
    resetMsg: 'Parameters reset',
    results: 'Results & Viewer',
    resultsSub: 'Live calculations and experiment animation',
    liveAnim: 'Live animation',
    searchEl: 'Search element',
    pickTwo: 'Select two elements',
    noReaction: 'No educational reaction listed',
    guide: 'Guide',
    clickEl: 'Click an element or search'
  }
};

// ─── Periodic table ────────────────────────────────────────────────────────
const ELEMENTS = [
  {z:1,s:'H',n:'هیدروژن',en:'Hydrogen',m:1.008,c:'nonmetal',e:'1s¹',mp:-259.16,bp:-252.87,g:1,p:1},
  {z:2,s:'He',n:'هلیوم',en:'Helium',m:4.0026,c:'noble',e:'1s²',mp:-272.2,bp:-268.93,g:18,p:1},
  {z:3,s:'Li',n:'لیتیوم',en:'Lithium',m:6.94,c:'alkali',e:'[He] 2s¹',mp:180.5,bp:1342,g:1,p:2},
  {z:4,s:'Be',n:'بریلیوم',en:'Beryllium',m:9.0122,c:'alkaline',e:'[He] 2s²',mp:1287,bp:2469,g:2,p:2},
  {z:5,s:'B',n:'بور',en:'Boron',m:10.81,c:'metalloid',e:'[He] 2s² 2p¹',mp:2076,bp:3927,g:13,p:2},
  {z:6,s:'C',n:'کربن',en:'Carbon',m:12.011,c:'nonmetal',e:'[He] 2s² 2p²',mp:3550,bp:4827,g:14,p:2},
  {z:7,s:'N',n:'نیتروژن',en:'Nitrogen',m:14.007,c:'nonmetal',e:'[He] 2s² 2p³',mp:-210.1,bp:-195.8,g:15,p:2},
  {z:8,s:'O',n:'اکسیژن',en:'Oxygen',m:15.999,c:'nonmetal',e:'[He] 2s² 2p⁴',mp:-218.8,bp:-183,g:16,p:2},
  {z:9,s:'F',n:'فلوئور',en:'Fluorine',m:18.998,c:'halogen',e:'[He] 2s² 2p⁵',mp:-219.7,bp:-188.1,g:17,p:2},
  {z:10,s:'Ne',n:'نئون',en:'Neon',m:20.180,c:'noble',e:'[He] 2s² 2p⁶',mp:-248.6,bp:-246.1,g:18,p:2},
  {z:11,s:'Na',n:'سدیم',en:'Sodium',m:22.990,c:'alkali',e:'[Ne] 3s¹',mp:97.8,bp:883,g:1,p:3},
  {z:12,s:'Mg',n:'منیزیم',en:'Magnesium',m:24.305,c:'alkaline',e:'[Ne] 3s²',mp:650,bp:1090,g:2,p:3},
  {z:13,s:'Al',n:'آلومینیوم',en:'Aluminium',m:26.982,c:'post',e:'[Ne] 3s² 3p¹',mp:660.3,bp:2519,g:13,p:3},
  {z:14,s:'Si',n:'سیلیسیم',en:'Silicon',m:28.085,c:'metalloid',e:'[Ne] 3s² 3p²',mp:1414,bp:3265,g:14,p:3},
  {z:15,s:'P',n:'فسفر',en:'Phosphorus',m:30.974,c:'nonmetal',e:'[Ne] 3s² 3p³',mp:44.2,bp:280.5,g:15,p:3},
  {z:16,s:'S',n:'گوگرد',en:'Sulfur',m:32.06,c:'nonmetal',e:'[Ne] 3s² 3p⁴',mp:115.2,bp:444.6,g:16,p:3},
  {z:17,s:'Cl',n:'کلر',en:'Chlorine',m:35.45,c:'halogen',e:'[Ne] 3s² 3p⁵',mp:-101.5,bp:-34.04,g:17,p:3},
  {z:18,s:'Ar',n:'آرگون',en:'Argon',m:39.948,c:'noble',e:'[Ne] 3s² 3p⁶',mp:-189.3,bp:-185.8,g:18,p:3},
  {z:19,s:'K',n:'پتاسیم',en:'Potassium',m:39.098,c:'alkali',e:'[Ar] 4s¹',mp:63.5,bp:759,g:1,p:4},
  {z:20,s:'Ca',n:'کلسیم',en:'Calcium',m:40.078,c:'alkaline',e:'[Ar] 4s²',mp:842,bp:1484,g:2,p:4},
  {z:21,s:'Sc',n:'اسکاندیم',en:'Scandium',m:44.956,c:'transition',e:'[Ar] 3d¹ 4s²',mp:1541,bp:2836,g:3,p:4},
  {z:22,s:'Ti',n:'تیتانیوم',en:'Titanium',m:47.867,c:'transition',e:'[Ar] 3d² 4s²',mp:1668,bp:3287,g:4,p:4},
  {z:23,s:'V',n:'وانادیوم',en:'Vanadium',m:50.942,c:'transition',e:'[Ar] 3d³ 4s²',mp:1910,bp:3407,g:5,p:4},
  {z:24,s:'Cr',n:'کروم',en:'Chromium',m:51.996,c:'transition',e:'[Ar] 3d⁵ 4s¹',mp:1907,bp:2671,g:6,p:4},
  {z:25,s:'Mn',n:'منگنز',en:'Manganese',m:54.938,c:'transition',e:'[Ar] 3d⁵ 4s²',mp:1246,bp:2061,g:7,p:4},
  {z:26,s:'Fe',n:'آهن',en:'Iron',m:55.845,c:'transition',e:'[Ar] 3d⁶ 4s²',mp:1538,bp:2862,g:8,p:4},
  {z:27,s:'Co',n:'کبالت',en:'Cobalt',m:58.933,c:'transition',e:'[Ar] 3d⁷ 4s²',mp:1495,bp:2927,g:9,p:4},
  {z:28,s:'Ni',n:'نیکل',en:'Nickel',m:58.693,c:'transition',e:'[Ar] 3d⁸ 4s²',mp:1455,bp:2913,g:10,p:4},
  {z:29,s:'Cu',n:'مس',en:'Copper',m:63.546,c:'transition',e:'[Ar] 3d¹⁰ 4s¹',mp:1084.6,bp:2562,g:11,p:4},
  {z:30,s:'Zn',n:'روی',en:'Zinc',m:65.38,c:'transition',e:'[Ar] 3d¹⁰ 4s²',mp:419.5,bp:907,g:12,p:4},
  {z:31,s:'Ga',n:'گالیوم',en:'Gallium',m:69.723,c:'post',e:'[Ar] 3d¹⁰ 4s² 4p¹',mp:29.8,bp:2204,g:13,p:4},
  {z:32,s:'Ge',n:'ژرمانیوم',en:'Germanium',m:72.630,c:'metalloid',e:'[Ar] 3d¹⁰ 4s² 4p²',mp:938.3,bp:2833,g:14,p:4},
  {z:33,s:'As',n:'آرسنیک',en:'Arsenic',m:74.922,c:'metalloid',e:'[Ar] 3d¹⁰ 4s² 4p³',mp:817,bp:614,g:15,p:4},
  {z:34,s:'Se',n:'سلنیوم',en:'Selenium',m:78.971,c:'nonmetal',e:'[Ar] 3d¹⁰ 4s² 4p⁴',mp:221,bp:685,g:16,p:4},
  {z:35,s:'Br',n:'برم',en:'Bromine',m:79.904,c:'halogen',e:'[Ar] 3d¹⁰ 4s² 4p⁵',mp:-7.2,bp:58.8,g:17,p:4},
  {z:36,s:'Kr',n:'کریپتون',en:'Krypton',m:83.798,c:'noble',e:'[Ar] 3d¹⁰ 4s² 4p⁶',mp:-157.4,bp:-153.2,g:18,p:4},
  {z:37,s:'Rb',n:'روبیدیوم',en:'Rubidium',m:85.468,c:'alkali',e:'[Kr] 5s¹',mp:39.3,bp:688,g:1,p:5},
  {z:38,s:'Sr',n:'استرانسیم',en:'Strontium',m:87.62,c:'alkaline',e:'[Kr] 5s²',mp:777,bp:1382,g:2,p:5},
  {z:39,s:'Y',n:'ایتریم',en:'Yttrium',m:88.906,c:'transition',e:'[Kr] 4d¹ 5s²',mp:1526,bp:3345,g:3,p:5},
  {z:40,s:'Zr',n:'زیرکونیوم',en:'Zirconium',m:91.224,c:'transition',e:'[Kr] 4d² 5s²',mp:1855,bp:4409,g:4,p:5},
  {z:41,s:'Nb',n:'نیوبیوم',en:'Niobium',m:92.906,c:'transition',e:'[Kr] 4d⁴ 5s¹',mp:2477,bp:4744,g:5,p:5},
  {z:42,s:'Mo',n:'مولیبدن',en:'Molybdenum',m:95.95,c:'transition',e:'[Kr] 4d⁵ 5s¹',mp:2623,bp:4639,g:6,p:5},
  {z:43,s:'Tc',n:'تکنسیم',en:'Technetium',m:98,c:'transition',e:'[Kr] 4d⁵ 5s²',mp:2157,bp:4265,g:7,p:5},
  {z:44,s:'Ru',n:'روتنیوم',en:'Ruthenium',m:101.07,c:'transition',e:'[Kr] 4d⁷ 5s¹',mp:2334,bp:4150,g:8,p:5},
  {z:45,s:'Rh',n:'رودیم',en:'Rhodium',m:102.91,c:'transition',e:'[Kr] 4d⁸ 5s¹',mp:1964,bp:3695,g:9,p:5},
  {z:46,s:'Pd',n:'پالادیوم',en:'Palladium',m:106.42,c:'transition',e:'[Kr] 4d¹⁰',mp:1554.9,bp:2963,g:10,p:5},
  {z:47,s:'Ag',n:'نقره',en:'Silver',m:107.87,c:'transition',e:'[Kr] 4d¹⁰ 5s¹',mp:961.8,bp:2162,g:11,p:5},
  {z:48,s:'Cd',n:'کادمیوم',en:'Cadmium',m:112.41,c:'transition',e:'[Kr] 4d¹⁰ 5s²',mp:321.1,bp:767,g:12,p:5},
  {z:49,s:'In',n:'ایندیم',en:'Indium',m:114.82,c:'post',e:'[Kr] 4d¹⁰ 5s² 5p¹',mp:156.6,bp:2072,g:13,p:5},
  {z:50,s:'Sn',n:'قلع',en:'Tin',m:118.71,c:'post',e:'[Kr] 4d¹⁰ 5s² 5p²',mp:231.9,bp:2602,g:14,p:5},
  {z:51,s:'Sb',n:'آنتیموان',en:'Antimony',m:121.76,c:'metalloid',e:'[Kr] 4d¹⁰ 5s² 5p³',mp:630.6,bp:1587,g:15,p:5},
  {z:52,s:'Te',n:'تلوریم',en:'Tellurium',m:127.60,c:'metalloid',e:'[Kr] 4d¹⁰ 5s² 5p⁴',mp:449.5,bp:988,g:16,p:5},
  {z:53,s:'I',n:'ید',en:'Iodine',m:126.90,c:'halogen',e:'[Kr] 4d¹⁰ 5s² 5p⁵',mp:113.7,bp:184.3,g:17,p:5},
  {z:54,s:'Xe',n:'گزنون',en:'Xenon',m:131.29,c:'noble',e:'[Kr] 4d¹⁰ 5s² 5p⁶',mp:-111.8,bp:-108.1,g:18,p:5},
  {z:55,s:'Cs',n:'سزیم',en:'Caesium',m:132.91,c:'alkali',e:'[Xe] 6s¹',mp:28.5,bp:671,g:1,p:6},
  {z:56,s:'Ba',n:'باریم',en:'Barium',m:137.33,c:'alkaline',e:'[Xe] 6s²',mp:727,bp:1845,g:2,p:6},
  {z:57,s:'La',n:'لانتان',en:'Lanthanum',m:138.91,c:'lanthanide',e:'[Xe] 5d¹ 6s²',mp:920,bp:3464,g:3,p:6},
  {z:58,s:'Ce',n:'سریم',en:'Cerium',m:140.12,c:'lanthanide',e:'[Xe] 4f¹ 5d¹ 6s²',mp:795,bp:3443,g:0,p:6},
  {z:59,s:'Pr',n:'پرازئودیمیم',en:'Praseodymium',m:140.91,c:'lanthanide',e:'[Xe] 4f³ 6s²',mp:935,bp:3520,g:0,p:6},
  {z:60,s:'Nd',n:'نئودیمیم',en:'Neodymium',m:144.24,c:'lanthanide',e:'[Xe] 4f⁴ 6s²',mp:1024,bp:3074,g:0,p:6},
  {z:61,s:'Pm',n:'پرومتیوم',en:'Promethium',m:145,c:'lanthanide',e:'[Xe] 4f⁵ 6s²',mp:1042,bp:3000,g:0,p:6},
  {z:62,s:'Sm',n:'ساماریوم',en:'Samarium',m:150.36,c:'lanthanide',e:'[Xe] 4f⁶ 6s²',mp:1072,bp:1794,g:0,p:6},
  {z:63,s:'Eu',n:'یوروپیم',en:'Europium',m:151.96,c:'lanthanide',e:'[Xe] 4f⁷ 6s²',mp:822,bp:1529,g:0,p:6},
  {z:64,s:'Gd',n:'گادولینیم',en:'Gadolinium',m:157.25,c:'lanthanide',e:'[Xe] 4f⁷ 5d¹ 6s²',mp:1312,bp:3273,g:0,p:6},
  {z:65,s:'Tb',n:'تربیم',en:'Terbium',m:158.93,c:'lanthanide',e:'[Xe] 4f⁹ 6s²',mp:1356,bp:3230,g:0,p:6},
  {z:66,s:'Dy',n:'دیسپروزیم',en:'Dysprosium',m:162.50,c:'lanthanide',e:'[Xe] 4f¹⁰ 6s²',mp:1407,bp:2567,g:0,p:6},
  {z:67,s:'Ho',n:'هولمیم',en:'Holmium',m:164.93,c:'lanthanide',e:'[Xe] 4f¹¹ 6s²',mp:1461,bp:2720,g:0,p:6},
  {z:68,s:'Er',n:'اربیم',en:'Erbium',m:167.26,c:'lanthanide',e:'[Xe] 4f¹² 6s²',mp:1529,bp:2868,g:0,p:6},
  {z:69,s:'Tm',n:'تولیوم',en:'Thulium',m:168.93,c:'lanthanide',e:'[Xe] 4f¹³ 6s²',mp:1545,bp:1950,g:0,p:6},
  {z:70,s:'Yb',n:'ایتربیم',en:'Ytterbium',m:173.05,c:'lanthanide',e:'[Xe] 4f¹⁴ 6s²',mp:824,bp:1196,g:0,p:6},
  {z:71,s:'Lu',n:'لوتتیم',en:'Lutetium',m:174.97,c:'lanthanide',e:'[Xe] 4f¹⁴ 5d¹ 6s²',mp:1652,bp:3402,g:3,p:6},
  {z:72,s:'Hf',n:'هافنیوم',en:'Hafnium',m:178.49,c:'transition',e:'[Xe] 4f¹⁴ 5d² 6s²',mp:2233,bp:4603,g:4,p:6},
  {z:73,s:'Ta',n:'تانتال',en:'Tantalum',m:180.95,c:'transition',e:'[Xe] 4f¹⁴ 5d³ 6s²',mp:3017,bp:5458,g:5,p:6},
  {z:74,s:'W',n:'تنگستن',en:'Tungsten',m:183.84,c:'transition',e:'[Xe] 4f¹⁴ 5d⁴ 6s²',mp:3422,bp:5555,g:6,p:6},
  {z:75,s:'Re',n:'رنیوم',en:'Rhenium',m:186.21,c:'transition',e:'[Xe] 4f¹⁴ 5d⁵ 6s²',mp:3186,bp:5596,g:7,p:6},
  {z:76,s:'Os',n:'اسمیم',en:'Osmium',m:190.23,c:'transition',e:'[Xe] 4f¹⁴ 5d⁶ 6s²',mp:3033,bp:5012,g:8,p:6},
  {z:77,s:'Ir',n:'ایریدیم',en:'Iridium',m:192.22,c:'transition',e:'[Xe] 4f¹⁴ 5d⁷ 6s²',mp:2446,bp:4428,g:9,p:6},
  {z:78,s:'Pt',n:'پلاتین',en:'Platinum',m:195.08,c:'transition',e:'[Xe] 4f¹⁴ 5d⁹ 6s¹',mp:1768.3,bp:3825,g:10,p:6},
  {z:79,s:'Au',n:'طلا',en:'Gold',m:196.97,c:'transition',e:'[Xe] 4f¹⁴ 5d¹⁰ 6s¹',mp:1064.2,bp:2856,g:11,p:6},
  {z:80,s:'Hg',n:'جیوه',en:'Mercury',m:200.59,c:'transition',e:'[Xe] 4f¹⁴ 5d¹⁰ 6s²',mp:-38.83,bp:356.7,g:12,p:6},
  {z:81,s:'Tl',n:'تالیوم',en:'Thallium',m:204.38,c:'post',e:'[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹',mp:304,bp:1473,g:13,p:6},
  {z:82,s:'Pb',n:'سرب',en:'Lead',m:207.2,c:'post',e:'[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²',mp:327.5,bp:1749,g:14,p:6},
  {z:83,s:'Bi',n:'بیسموت',en:'Bismuth',m:208.98,c:'post',e:'[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³',mp:271.4,bp:1564,g:15,p:6},
  {z:84,s:'Po',n:'پولونیوم',en:'Polonium',m:209,c:'post',e:'[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴',mp:254,bp:962,g:16,p:6},
  {z:85,s:'At',n:'آستاتین',en:'Astatine',m:210,c:'halogen',e:'[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵',mp:302,bp:337,g:17,p:6},
  {z:86,s:'Rn',n:'رادون',en:'Radon',m:222,c:'noble',e:'[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶',mp:-71,bp:-61.7,g:18,p:6},
  {z:87,s:'Fr',n:'فرانسیم',en:'Francium',m:223,c:'alkali',e:'[Rn] 7s¹',mp:27,bp:677,g:1,p:7},
  {z:88,s:'Ra',n:'رادیم',en:'Radium',m:226,c:'alkaline',e:'[Rn] 7s²',mp:700,bp:1737,g:2,p:7},
  {z:89,s:'Ac',n:'اکتینیم',en:'Actinium',m:227,c:'actinide',e:'[Rn] 6d¹ 7s²',mp:1050,bp:3200,g:3,p:7},
  {z:90,s:'Th',n:'توریم',en:'Thorium',m:232.04,c:'actinide',e:'[Rn] 6d² 7s²',mp:1750,bp:4820,g:0,p:7},
  {z:91,s:'Pa',n:'پروتاکتینیم',en:'Protactinium',m:231.04,c:'actinide',e:'[Rn] 5f² 6d¹ 7s²',mp:1568,bp:4027,g:0,p:7},
  {z:92,s:'U',n:'اورانیوم',en:'Uranium',m:238.03,c:'actinide',e:'[Rn] 5f³ 6d¹ 7s²',mp:1132.2,bp:4131,g:0,p:7},
  {z:93,s:'Np',n:'نپتونیوم',en:'Neptunium',m:237,c:'actinide',e:'[Rn] 5f⁴ 6d¹ 7s²',mp:639,bp:4174,g:0,p:7},
  {z:94,s:'Pu',n:'پلوتونیوم',en:'Plutonium',m:244,c:'actinide',e:'[Rn] 5f⁶ 7s²',mp:639.4,bp:3228,g:0,p:7},
  {z:95,s:'Am',n:'آمریکیوم',en:'Americium',m:243,c:'actinide',e:'[Rn] 5f⁷ 7s²',mp:1176,bp:2011,g:0,p:7},
  {z:96,s:'Cm',n:'کوریم',en:'Curium',m:247,c:'actinide',e:'[Rn] 5f⁷ 6d¹ 7s²',mp:1340,bp:3110,g:0,p:7},
  {z:97,s:'Bk',n:'برکلیم',en:'Berkelium',m:247,c:'actinide',e:'[Rn] 5f⁹ 7s²',mp:986,bp:2627,g:0,p:7},
  {z:98,s:'Cf',n:'کالیفرنیوم',en:'Californium',m:251,c:'actinide',e:'[Rn] 5f¹⁰ 7s²',mp:900,bp:1470,g:0,p:7},
  {z:99,s:'Es',n:'اینشتینیم',en:'Einsteinium',m:252,c:'actinide',e:'[Rn] 5f¹¹ 7s²',mp:860,bp:996,g:0,p:7},
  {z:100,s:'Fm',n:'فرمیم',en:'Fermium',m:257,c:'actinide',e:'[Rn] 5f¹² 7s²',mp:1527,bp:null,g:0,p:7},
  {z:101,s:'Md',n:'مندلیفیم',en:'Mendelevium',m:258,c:'actinide',e:'[Rn] 5f¹³ 7s²',mp:827,bp:null,g:0,p:7},
  {z:102,s:'No',n:'نوبلیم',en:'Nobelium',m:259,c:'actinide',e:'[Rn] 5f¹⁴ 7s²',mp:827,bp:null,g:0,p:7},
  {z:103,s:'Lr',n:'لارنسیم',en:'Lawrencium',m:266,c:'actinide',e:'[Rn] 5f¹⁴ 7s² 7p¹',mp:1627,bp:null,g:3,p:7},
  {z:104,s:'Rf',n:'راذرفوردیم',en:'Rutherfordium',m:267,c:'transition',e:'[Rn] 5f¹⁴ 6d² 7s²',mp:2100,bp:5500,g:4,p:7},
  {z:105,s:'Db',n:'دوبنیوم',en:'Dubnium',m:268,c:'transition',e:'[Rn] 5f¹⁴ 6d³ 7s²',mp:null,bp:null,g:5,p:7},
  {z:106,s:'Sg',n:'سیبورگیم',en:'Seaborgium',m:269,c:'transition',e:'[Rn] 5f¹⁴ 6d⁴ 7s²',mp:null,bp:null,g:6,p:7},
  {z:107,s:'Bh',n:'بوهریم',en:'Bohrium',m:270,c:'transition',e:'[Rn] 5f¹⁴ 6d⁵ 7s²',mp:null,bp:null,g:7,p:7},
  {z:108,s:'Hs',n:'هاسیم',en:'Hassium',m:269,c:'transition',e:'[Rn] 5f¹⁴ 6d⁶ 7s²',mp:null,bp:null,g:8,p:7},
  {z:109,s:'Mt',n:'مایتنریم',en:'Meitnerium',m:278,c:'unknown',e:'[Rn] 5f¹⁴ 6d⁷ 7s²',mp:null,bp:null,g:9,p:7},
  {z:110,s:'Ds',n:'دارمشتادیم',en:'Darmstadtium',m:281,c:'unknown',e:'[Rn] 5f¹⁴ 6d⁸ 7s²',mp:null,bp:null,g:10,p:7},
  {z:111,s:'Rg',n:'رونتگنیوم',en:'Roentgenium',m:282,c:'unknown',e:'[Rn] 5f¹⁴ 6d⁹ 7s²',mp:null,bp:null,g:11,p:7},
  {z:112,s:'Cn',n:'کوپرنیسیم',en:'Copernicium',m:285,c:'transition',e:'[Rn] 5f¹⁴ 6d¹⁰ 7s²',mp:null,bp:null,g:12,p:7},
  {z:113,s:'Nh',n:'نیهونیم',en:'Nihonium',m:286,c:'unknown',e:'[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹',mp:null,bp:null,g:13,p:7},
  {z:114,s:'Fl',n:'فلروویم',en:'Flerovium',m:289,c:'post',e:'[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²',mp:null,bp:null,g:14,p:7},
  {z:115,s:'Mc',n:'مسکوویم',en:'Moscovium',m:290,c:'unknown',e:'[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³',mp:null,bp:null,g:15,p:7},
  {z:116,s:'Lv',n:'لیورموریوم',en:'Livermorium',m:293,c:'unknown',e:'[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴',mp:null,bp:null,g:16,p:7},
  {z:117,s:'Ts',n:'تنسین',en:'Tennessine',m:294,c:'unknown',e:'[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵',mp:null,bp:null,g:17,p:7},
  {z:118,s:'Og',n:'اوگانسون',en:'Oganesson',m:294,c:'unknown',e:'[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶',mp:null,bp:null,g:18,p:7}
];

const CAT_NAMES = {
  fa: {alkali:'فلز قلیایی',alkaline:'قلیایی خاکی',transition:'فلز واسطه',post:'فلز پس‌واسطه',metalloid:'شبه فلز',nonmetal:'نافلز',halogen:'هالوژن',noble:'گاز نجیب',lanthanide:'لانتانید',actinide:'اکتینید',unknown:'ناشناخته'},
  en: {alkali:'Alkali metal',alkaline:'Alkaline earth',transition:'Transition',post:'Post-transition',metalloid:'Metalloid',nonmetal:'Nonmetal',halogen:'Halogen',noble:'Noble gas',lanthanide:'Lanthanide',actinide:'Actinide',unknown:'Unknown'}
};

const REACTIONS = {
  'H+O':{prod:'H₂O',nameFa:'آب',nameEn:'Water',note:'2H₂ + O₂ → 2H₂O'},
  'Na+Cl':{prod:'NaCl',nameFa:'نمک خوراکی',nameEn:'Table salt',note:'2Na + Cl₂ → 2NaCl'},
  'C+O':{prod:'CO₂',nameFa:'دی‌اکسید کربن',nameEn:'Carbon dioxide',note:'C + O₂ → CO₂'},
  'Fe+O':{prod:'Fe₂O₃',nameFa:'اکسید آهن',nameEn:'Iron oxide',note:'4Fe + 3O₂ → 2Fe₂O₃'},
  'H+Cl':{prod:'HCl',nameFa:'هیدروکلریک اسید',nameEn:'Hydrochloric acid',note:'H₂ + Cl₂ → 2HCl'},
  'N+H':{prod:'NH₃',nameFa:'آمونیاک',nameEn:'Ammonia',note:'N₂ + 3H₂ → 2NH₃'},
  'Ca+O':{prod:'CaO',nameFa:'اکسید کلسیم',nameEn:'Calcium oxide',note:'2Ca + O₂ → 2CaO'},
  'Mg+O':{prod:'MgO',nameFa:'اکسید منیزیم',nameEn:'Magnesium oxide',note:'2Mg + O₂ → 2MgO'},
  'S+O':{prod:'SO₂',nameFa:'دی‌اکسید گوگرد',nameEn:'Sulfur dioxide',note:'S + O₂ → SO₂'},
  'K+Cl':{prod:'KCl',nameFa:'کلرید پتاسیم',nameEn:'Potassium chloride',note:'2K + Cl₂ → 2KCl'}
};

// ─── Categories & experiments (verified formulas) ──────────────────────────
// Physics formulas checked:
// kinematics: x = v0*t + 0.5*a*t^2 , v = v0 + a*t          ✓
// freefall:   t = sqrt(2h/g) , v = g*t                      ✓
// projectile: R = v0^2*sin(2θ)/g , H = v0^2*sin^2(θ)/(2g)  ✓
// circular:   ac = v^2/r , T = 2πr/v , F = m*ac             ✓
// momentum:   elastic 1D formulas                           ✓
// friction:   fk = μ*m*g , s = v0^2/(2μg)                   ✓
// spring:     T = 2π√(m/k) , ω = √(k/m) , E = 0.5*k*A^2    ✓
// torque:     τ = r*F*sinθ                                  ✓
// density:    ρ = m/V , Fb = ρf*V*g                         ✓
// workpower:  W = F*d*cosθ , P = W/t                        ✓

const CATEGORIES = {
  physics: {
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
  },

  electric: {
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
  },

  // Energy formulas verified:
  // Ek=0.5mv^2, Ep=mgh                                    ✓
  // freefall conversion v=√(2gh)                          ✓
  // spring U=0.5kx^2                                      ✓
  // power P=Fv                                            ✓
  // efficiency η=Wout/Ein                                 ✓
  // pendulum T=2π√(L/g)                                   ✓
  // gravity U=-GMm/r , g=GM/r^2                           ✓
  // inelastic KE loss with coefficient of restitution     ✓
  // heat Q=Fd , ΔT=Q/(mc)                                 ✓
  // orbital E=-GMm/(2a)                                   ✓
  energy: {
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
  },

  wave: {
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
  },

  chemistry: {
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
  },

  astronomy: {
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
  }
};
