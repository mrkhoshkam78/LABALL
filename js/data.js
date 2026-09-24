// ─── Physical Constants (CODATA / IAU precise) ─────────────────────────────
const CONST = {
  G: 6.67430e-11,       // m³ kg⁻¹ s⁻²
  M_SUN: 1.98847e30,    // kg
  M_EARTH: 5.9722e24,   // kg
  R_EARTH: 6.371e6,     // m
  AU: 1.495978707e11,   // m
  C: 299792458,         // m/s
  H: 6.62607015e-34,    // J·s
  HBAR: 1.054571817e-34,// J·s
  K_B: 1.380649e-23,    // J/K
  SIGMA: 5.670374419e-8,// W m⁻² K⁻⁴
  E: 1.602176634e-19,   // C
  M_E: 9.1093837e-31,   // kg
  M_P: 1.67262192e-27,  // kg
  G_EARTH: 9.80665,     // m/s²
  EPSILON0: 8.8541878128e-12 // F/m
};

// ─── Periodic Table (118 elements) ─────────────────────────────────────────
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
  alkali:'فلز قلیایی', alkaline:'قلیایی خاکی', transition:'فلز واسطه',
  post:'فلز پس‌واسطه', metalloid:'شبه فلز', nonmetal:'نافلز',
  halogen:'هالوژن', noble:'گاز نجیب', lanthanide:'لانتانید',
  actinide:'اکتینید', unknown:'ناشناخته'
};

// Simple known reactions (demo educational)
const REACTIONS = {
  'H+O': { prod: 'H₂O', name: 'آب', note: '۲H₂ + O₂ → ۲H₂O' },
  'Na+Cl': { prod: 'NaCl', name: 'نمک خوراکی', note: '۲Na + Cl₂ → ۲NaCl' },
  'C+O': { prod: 'CO₂', name: 'دی‌اکسید کربن', note: 'C + O₂ → CO₂' },
  'Fe+O': { prod: 'Fe₂O₃', name: 'اکسید آهن (زنگ)', note: '۴Fe + ۳O₂ → ۲Fe₂O₃' },
  'H+Cl': { prod: 'HCl', name: 'هیدروکلریک اسید', note: 'H₂ + Cl₂ → ۲HCl' },
  'N+H': { prod: 'NH₃', name: 'آمونیاک', note: 'N₂ + ۳H₂ → ۲NH₃' },
  'Ca+O': { prod: 'CaO', name: 'اکسید کلسیم', note: '۲Ca + O₂ → ۲CaO' },
  'Mg+O': { prod: 'MgO', name: 'اکسید منیزیم', note: '۲Mg + O₂ → ۲MgO' },
  'S+O': { prod: 'SO₂', name: 'دی‌اکسید گوگرد', note: 'S + O₂ → SO₂' },
  'K+Cl': { prod: 'KCl', name: 'کلرید پتاسیم', note: '۲K + Cl₂ → ۲KCl' }
};

// ─── Experiment Definitions ────────────────────────────────────────────────
// Each category has multiple experiments
const CATEGORIES = {
  physics: {
    title: 'فیزیک و حرکت',
    icon: '⚙️',
    experiments: {
      kinematics: {
        name: 'حرکت با شتاب ثابت',
        formula: 'x = v₀t + ½at²   ·   v = v₀ + at',
        desc: 'جابه‌جایی و سرعت نهایی جسم با شتاب ثابت.',
        fields: [['v','سرعت اولیه','m/s',-20,40,0.5,8],['a','شتاب','m/s²',-10,15,0.5,2],['t','زمان','s',0.5,25,0.5,6]],
        calc: v => {
          const vel = v.v + v.a * v.t;
          const x = v.v * v.t + 0.5 * v.a * v.t * v.t;
          return [['جابه‌جایی',x.toFixed(2),'m'],['سرعت نهایی',vel.toFixed(2),'m/s'],['زمان',v.t.toFixed(1),'s']];
        },
        explain: v => `در ${v.t} s با v₀=${v.v} m/s و a=${v.a} m/s² → x=${(v.v*v.t+0.5*v.a*v.t*v.t).toFixed(2)} m`
      },
      freefall: {
        name: 'سقوط آزاد',
        formula: 'h = ½gt²   ·   v = gt',
        desc: 'سقوط آزاد از ارتفاع بدون مقاومت هوا.',
        fields: [['h','ارتفاع','m',1,200,1,50],['g','شتاب گرانش','m/s²',1,20,0.1,9.81]],
        calc: v => {
          const t = Math.sqrt(2 * v.h / v.g);
          const vel = v.g * t;
          return [['زمان سقوط',t.toFixed(2),'s'],['سرعت برخورد',vel.toFixed(2),'m/s'],['ارتفاع',v.h.toFixed(0),'m']];
        },
        explain: v => `از ارتفاع ${v.h} m با g=${v.g} → زمان سقوط ${Math.sqrt(2*v.h/v.g).toFixed(2)} s`
      },
      projectile: {
        name: 'پرتابه (پرتاب اریب)',
        formula: 'R = v₀²sin(2θ)/g   ·   H = v₀²sin²θ/(2g)',
        desc: 'برد و ارتفاع بیشینه پرتابه در زاویه θ.',
        fields: [['v0','سرعت اولیه','m/s',5,80,1,30],['theta','زاویه','°',5,85,1,45],['g','g','m/s²',5,15,0.1,9.81]],
        calc: v => {
          const th = v.theta * Math.PI / 180;
          const R = (v.v0 ** 2 * Math.sin(2 * th)) / v.g;
          const H = (v.v0 ** 2 * Math.sin(th) ** 2) / (2 * v.g);
          const T = (2 * v.v0 * Math.sin(th)) / v.g;
          return [['برد',R.toFixed(1),'m'],['ارتفاع بیشینه',H.toFixed(1),'m'],['زمان پرواز',T.toFixed(2),'s']];
        },
        explain: v => `پرتابه با ${v.v0} m/s در زاویه ${v.theta}° → برد ${(v.v0**2*Math.sin(2*v.theta*Math.PI/180)/v.g).toFixed(1)} m`
      },
      circular: {
        name: 'حرکت دایره‌ای یکنواخت',
        formula: 'aᶜ = v²/r   ·   T = 2πr/v   ·   F = mv²/r',
        desc: 'شتاب مرکزگرا و نیروی لازم برای حرکت دایره‌ای.',
        fields: [['v','سرعت','m/s',1,50,0.5,10],['r','شعاع','m',0.5,50,0.5,5],['m','جرم','kg',0.1,20,0.1,2]],
        calc: v => {
          const ac = v.v ** 2 / v.r;
          const T = 2 * Math.PI * v.r / v.v;
          const F = v.m * ac;
          return [['شتاب مرکزگرا',ac.toFixed(2),'m/s²'],['دوره تناوب',T.toFixed(2),'s'],['نیروی مرکزگرا',F.toFixed(2),'N']];
        },
        explain: v => `v=${v.v} m/s در r=${v.r} m → aᶜ=${(v.v**2/v.r).toFixed(2)} m/s²`
      },
      momentum: {
        name: 'تکانه و برخورد',
        formula: 'p = mv   ·   p₁ + p₂ = p₁′ + p₂′ (کشسان)',
        desc: 'تکانه قبل و بعد از برخورد کاملاً کشسان یک‌بعدی.',
        fields: [['m1','جرم ۱','kg',0.1,20,0.1,2],['v1','سرعت ۱','m/s',-20,20,0.5,5],['m2','جرم ۲','kg',0.1,20,0.1,3],['v2','سرعت ۲','m/s',-20,20,0.5,-2]],
        calc: v => {
          const p1 = v.m1 * v.v1, p2 = v.m2 * v.v2;
          const v1f = ((v.m1 - v.m2) * v.v1 + 2 * v.m2 * v.v2) / (v.m1 + v.m2);
          const v2f = ((v.m2 - v.m1) * v.v2 + 2 * v.m1 * v.v1) / (v.m1 + v.m2);
          return [['تکانه کل', (p1+p2).toFixed(2),'kg·m/s'],['سرعت نهایی ۱',v1f.toFixed(2),'m/s'],['سرعت نهایی ۲',v2f.toFixed(2),'m/s']];
        },
        explain: v => `برخورد کشسان: p کل = ${(v.m1*v.v1 + v.m2*v.v2).toFixed(2)} kg·m/s محفوظ می‌ماند.`
      },
      friction: {
        name: 'اصطکاک سطح افقی',
        formula: 'fₖ = μₖN = μₖmg   ·   a = −μₖg',
        desc: 'نیروی اصطکاک جنبشی و مسافت توقف.',
        fields: [['m','جرم','kg',0.5,50,0.5,5],['mu','μₖ','—',0.05,1,0.01,0.3],['v0','سرعت اولیه','m/s',1,30,0.5,10]],
        calc: v => {
          const f = v.mu * v.m * CONST.G_EARTH;
          const a = -v.mu * CONST.G_EARTH;
          const s = (v.v0 ** 2) / (2 * v.mu * CONST.G_EARTH);
          return [['نیروی اصطکاک',f.toFixed(2),'N'],['شتاب',a.toFixed(2),'m/s²'],['مسافت توقف',s.toFixed(2),'m']];
        },
        explain: v => `با μₖ=${v.mu} و v₀=${v.v0} → مسافت توقف ${(v.v0**2/(2*v.mu*CONST.G_EARTH)).toFixed(2)} m`
      },
      spring: {
        name: 'نوسانگر هارمونیک (فنر)',
        formula: 'T = 2π√(m/k)   ·   ω = √(k/m)   ·   E = ½kA²',
        desc: 'دوره تناوب، بسامد زاویه‌ای و انرژی نوسانگر.',
        fields: [['m','جرم','kg',0.1,10,0.1,1],['k','ثابت فنر','N/m',10,500,5,100],['A','دامنه','m',0.01,1,0.01,0.2]],
        calc: v => {
          const T = 2 * Math.PI * Math.sqrt(v.m / v.k);
          const omega = Math.sqrt(v.k / v.m);
          const E = 0.5 * v.k * v.A * v.A;
          return [['دوره تناوب',T.toFixed(3),'s'],['ω',omega.toFixed(2),'rad/s'],['انرژی کل',E.toFixed(3),'J']];
        },
        explain: v => `فنر k=${v.k} با جرم ${v.m} kg → T=${(2*Math.PI*Math.sqrt(v.m/v.k)).toFixed(3)} s`
      },
      torque: {
        name: 'گشتاور و تعادل',
        formula: 'τ = r × F = rF sinθ   ·   Στ = 0 (تعادل)',
        desc: 'گشتاور نیروی اعمال‌شده در فاصله r و زاویه θ.',
        fields: [['F','نیرو','N',1,200,1,50],['r','بازو','m',0.1,5,0.1,1],['theta','زاویه','°',0,90,1,90]],
        calc: v => {
          const tau = v.r * v.F * Math.sin(v.theta * Math.PI / 180);
          return [['گشتاور',tau.toFixed(2),'N·m'],['مؤلفه عمود',(v.F*Math.sin(v.theta*Math.PI/180)).toFixed(2),'N'],['بازو',v.r.toFixed(2),'m']];
        },
        explain: v => `τ = ${v.r} × ${v.F} × sin(${v.theta}°) = ${(v.r*v.F*Math.sin(v.theta*Math.PI/180)).toFixed(2)} N·m`
      },
      density: {
        name: 'چگالی و شناوری',
        formula: 'ρ = m/V   ·   Fᵦ = ρ_fluid V g',
        desc: 'چگالی جسم و نیروی شناوری در سیال.',
        fields: [['m','جرم','kg',0.1,50,0.1,5],['V','حجم','m³',0.001,0.5,0.001,0.01],['rho_f','چگالی سیال','kg/m³',500,1500,10,1000]],
        calc: v => {
          const rho = v.m / v.V;
          const Fb = v.rho_f * v.V * CONST.G_EARTH;
          const sinks = rho > v.rho_f;
          return [['چگالی جسم',rho.toFixed(1),'kg/m³'],['نیروی شناوری',Fb.toFixed(2),'N'],['وضعیت',sinks?'فرومی‌رود':'شناور','']];
        },
        explain: v => `ρ = ${(v.m/v.V).toFixed(1)} kg/m³ → ${v.m/v.V > v.rho_f ? 'فرومی‌رود' : 'شناور می‌ماند'}`
      },
      workpower: {
        name: 'کار و توان',
        formula: 'W = F·d = Fd cosθ   ·   P = W/t = Fv',
        desc: 'کار انجام‌شده و توان متوسط.',
        fields: [['F','نیرو','N',1,500,1,100],['d','جابه‌جایی','m',0.5,50,0.5,10],['theta','زاویه','°',0,90,5,0],['t','زمان','s',0.5,60,0.5,5]],
        calc: v => {
          const W = v.F * v.d * Math.cos(v.theta * Math.PI / 180);
          const P = W / v.t;
          return [['کار',W.toFixed(1),'J'],['توان',P.toFixed(1),'W'],['توان (hp)',(P/745.7).toFixed(3),'hp']];
        },
        explain: v => `W = ${v.F}×${v.d}×cos(${v.theta}°) = ${(v.F*v.d*Math.cos(v.theta*Math.PI/180)).toFixed(1)} J`
      }
    }
  },

  electric: {
    title: 'برق و مدار',
    icon: '⚡',
    experiments: {
      ohm: {
        name: 'قانون اهم ساده',
        formula: 'I = V/R   ·   P = VI = V²/R',
        desc: 'جریان و توان در مدار مقاومتی ساده.',
        fields: [['v','ولتاژ','V',0.5,48,0.5,12],['r','مقاومت','Ω',1,200,1,6]],
        calc: v => {
          const i = v.v / v.r, p = v.v * i;
          return [['جریان',i.toFixed(3),'A'],['توان',p.toFixed(2),'W'],['مقاومت',v.r.toFixed(1),'Ω']];
        },
        explain: v => `I = ${v.v}/${v.r} = ${(v.v/v.r).toFixed(3)} A · P = ${(v.v*v.v/v.r).toFixed(2)} W`
      },
      series: {
        name: 'مقاومت‌های سری',
        formula: 'R_eq = R₁ + R₂ + R₃   ·   I = V/R_eq',
        desc: 'مدار سری سه مقاومتی.',
        fields: [['v','ولتاژ منبع','V',1,48,1,12],['r1','R₁','Ω',1,100,1,10],['r2','R₂','Ω',1,100,1,20],['r3','R₃','Ω',1,100,1,30]],
        calc: v => {
          const Req = v.r1 + v.r2 + v.r3;
          const I = v.v / Req;
          return [['R معادل',Req.toFixed(1),'Ω'],['جریان',I.toFixed(3),'A'],['افت ولتاژ R₁',(I*v.r1).toFixed(2),'V']];
        },
        explain: v => `R_eq = ${v.r1+v.r2+v.r3} Ω → I = ${(v.v/(v.r1+v.r2+v.r3)).toFixed(3)} A`
      },
      parallel: {
        name: 'مقاومت‌های موازی',
        formula: '1/R_eq = 1/R₁ + 1/R₂   ·   I_total = V/R_eq',
        desc: 'دو مقاومت موازی.',
        fields: [['v','ولتاژ','V',1,48,1,12],['r1','R₁','Ω',1,200,1,10],['r2','R₂','Ω',1,200,1,20]],
        calc: v => {
          const Req = 1 / (1/v.r1 + 1/v.r2);
          const It = v.v / Req;
          return [['R معادل',Req.toFixed(2),'Ω'],['جریان کل',It.toFixed(3),'A'],['جریان R₁',(v.v/v.r1).toFixed(3),'A']];
        },
        explain: v => `R_eq = ${(1/(1/v.r1+1/v.r2)).toFixed(2)} Ω`
      },
      capacitor: {
        name: 'خازن و شارژ',
        formula: 'Q = CV   ·   E = ½CV²   ·   τ = RC',
        desc: 'بار، انرژی ذخیره‌شده و ثابت زمانی RC.',
        fields: [['c','ظرفیت','μF',0.1,1000,0.1,100],['v','ولتاژ','V',1,50,1,12],['r','مقاومت سری','Ω',100,10000,100,1000]],
        calc: v => {
          const C = v.c * 1e-6;
          const Q = C * v.v;
          const E = 0.5 * C * v.v * v.v;
          const tau = v.r * C;
          return [['بار', (Q*1e6).toFixed(2),'μC'],['انرژی',(E*1000).toFixed(3),'mJ'],['τ', (tau*1000).toFixed(2),'ms']];
        },
        explain: v => `C=${v.c} μF در ${v.v} V → E = ${(0.5*v.c*1e-6*v.v*v.v*1000).toFixed(3)} mJ`
      },
      coulomb: {
        name: 'قانون کولن',
        formula: 'F = k|q₁q₂|/r²   ·   k = 8.99×10⁹',
        desc: 'نیروی الکترواستاتیک بین دو بار نقطه‌ای.',
        fields: [['q1','بار ۱','μC',-50,50,0.5,5],['q2','بار ۲','μC',-50,50,0.5,-3],['r','فاصله','cm',1,100,1,10]],
        calc: v => {
          const k = 8.9875517923e9;
          const F = k * Math.abs(v.q1 * 1e-6 * v.q2 * 1e-6) / ((v.r/100)**2);
          const attr = (v.q1 * v.q2) < 0 ? 'ربایش' : 'رانش';
          return [['نیرو',F.toFixed(3),'N'],['نوع',attr,''],['فاصله',v.r.toFixed(0),'cm']];
        },
        explain: v => `F = k|q₁q₂|/r² = ${(8.99e9*Math.abs(v.q1*1e-6*v.q2*1e-6)/((v.r/100)**2)).toFixed(3)} N`
      },
      magnetic: {
        name: 'نیروی لورنتس',
        formula: 'F = qvB sinθ   ·   r = mv/(qB)',
        desc: 'نیروی مغناطیسی روی بار متحرک و شعاع مسیر.',
        fields: [['q','بار','e',1,10,1,1],['v','سرعت','m/s',1e3,1e7,1e3,1e5],['B','میدان B','T',0.01,5,0.01,0.5],['theta','زاویه','°',0,90,5,90]],
        calc: v => {
          const q = v.q * CONST.E;
          const F = q * v.v * v.B * Math.sin(v.theta * Math.PI / 180);
          const r = (CONST.M_E * v.v) / (q * v.B);
          return [['نیرو',F.toExponential(3),'N'],['شعاع مسیر',r.toExponential(3),'m'],['sinθ',Math.sin(v.theta*Math.PI/180).toFixed(3),'']];
        },
        explain: v => `F = qvB sinθ برای الکترون با v=${v.v} m/s در B=${v.B} T`
      },
      transformer: {
        name: 'ترانسفورماتور ایده‌آل',
        formula: 'Vₛ/Vₚ = Nₛ/Nₚ   ·   Iₚ/Iₛ = Nₛ/Nₚ',
        desc: 'نسبت ولتاژ و جریان در ترانسفورماتور.',
        fields: [['vp','ولتاژ اولیه','V',50,500,10,220],['np','دور اولیه','—',50,1000,10,200],['ns','دور ثانویه','—',10,2000,10,100]],
        calc: v => {
          const vs = v.vp * (v.ns / v.np);
          const ratio = v.ns / v.np;
          return [['ولتاژ ثانویه',vs.toFixed(1),'V'],['نسبت دور',ratio.toFixed(3),''],['نوع',ratio>1?'افزاینده':'کاهنده','']];
        },
        explain: v => `Vₛ = ${v.vp} × (${v.ns}/${v.np}) = ${(v.vp*v.ns/v.np).toFixed(1)} V`
      },
      rlc: {
        name: 'مدار RLC سری (رزونانس)',
        formula: 'f₀ = 1/(2π√(LC))   ·   Z = √(R²+(X_L−X_C)²)',
        desc: 'فرکانس تشدید و امپدانس مدار RLC.',
        fields: [['r','R','Ω',1,500,1,50],['l','L','mH',0.1,100,0.1,10],['c','C','μF',0.01,100,0.01,1],['f','فرکانس','Hz',10,5000,10,500]],
        calc: v => {
          const L = v.l * 1e-3, C = v.c * 1e-6;
          const f0 = 1 / (2 * Math.PI * Math.sqrt(L * C));
          const XL = 2 * Math.PI * v.f * L;
          const XC = 1 / (2 * Math.PI * v.f * C);
          const Z = Math.sqrt(v.r ** 2 + (XL - XC) ** 2);
          return [['f₀ تشدید',f0.toFixed(1),'Hz'],['امپدانس Z',Z.toFixed(1),'Ω'],['X_L − X_C',(XL-XC).toFixed(1),'Ω']];
        },
        explain: v => `f₀ = 1/(2π√LC) ≈ ${(1/(2*Math.PI*Math.sqrt(v.l*1e-3*v.c*1e-6))).toFixed(1)} Hz`
      },
      powerfactor: {
        name: 'ضریب توان',
        formula: 'PF = cosφ = P/S   ·   Q = √(S²−P²)',
        desc: 'توان حقیقی، ظاهری و راکتیو.',
        fields: [['P','توان حقیقی','W',10,5000,10,1000],['S','توان ظاهری','VA',10,6000,10,1200]],
        calc: v => {
          const pf = Math.min(1, v.P / v.S);
          const Q = Math.sqrt(Math.max(0, v.S ** 2 - v.P ** 2));
          const phi = Math.acos(pf) * 180 / Math.PI;
          return [['ضریب توان',pf.toFixed(3),''],['توان راکتیو',Q.toFixed(1),'VAR'],['زاویه φ',phi.toFixed(1),'°']];
        },
        explain: v => `PF = ${v.P}/${v.S} = ${(v.P/v.S).toFixed(3)}`
      },
      kirchhoff: {
        name: 'قوانین کیرشهف (حلقه)',
        formula: 'ΣV = 0   ·   ΣI = 0',
        desc: 'ولتاژ و جریان در مدار ساده دو حلقه‌ای (تقریبی).',
        fields: [['v1','منبع ۱','V',1,30,1,12],['v2','منبع ۲','V',1,30,1,6],['r1','R₁','Ω',1,50,1,10],['r2','R₂','Ω',1,50,1,15]],
        calc: v => {
          // Simple mesh: I ≈ (V1-V2)/(R1+R2) for opposing sources
          const I = (v.v1 - v.v2) / (v.r1 + v.r2);
          return [['جریان حلقه',I.toFixed(3),'A'],['افت روی R₁',(Math.abs(I)*v.r1).toFixed(2),'V'],['افت روی R₂',(Math.abs(I)*v.r2).toFixed(2),'V']];
        },
        explain: v => `با فرض منابع مخالف: I ≈ (${v.v1}−${v.v2})/(${v.r1}+${v.r2}) = ${((v.v1-v.v2)/(v.r1+v.r2)).toFixed(3)} A`
      }
    }
  },

  energy: {
    title: 'انرژی مکانیکی',
    icon: '🔋',
    experiments: {
      kinetic_potential: {
        name: 'انرژی جنبشی و پتانسیل',
        formula: 'Eₖ = ½mv²   ·   Eₚ = mgh   ·   E = Eₖ+Eₚ',
        desc: 'مقایسه انرژی جنبشی و پتانسیل گرانشی.',
        fields: [['m','جرم','kg',0.1,100,0.5,5],['v','سرعت','m/s',0,50,0.5,10],['h','ارتفاع','m',0,100,1,8]],
        calc: v => {
          const k = 0.5 * v.m * v.v * v.v;
          const p = v.m * CONST.G_EARTH * v.h;
          return [['Eₖ',k.toFixed(2),'J'],['Eₚ',p.toFixed(2),'J'],['کل',(k+p).toFixed(2),'J']];
        },
        explain: v => `E کل = ${(0.5*v.m*v.v*v.v + v.m*CONST.G_EARTH*v.h).toFixed(2)} J`
      },
      conservation: {
        name: 'پایستگی انرژی (سرسره)',
        formula: 'mgh = ½mv² → v = √(2gh)',
        desc: 'تبدیل انرژی پتانسیل به جنبشی بدون اصطکاک.',
        fields: [['h','ارتفاع اولیه','m',1,100,1,20],['g','g','m/s²',5,15,0.1,9.81]],
        calc: v => {
          const vel = Math.sqrt(2 * v.g * v.h);
          const Ep = 1 * v.g * v.h; // per unit mass
          return [['سرعت پایین',vel.toFixed(2),'m/s'],['Eₚ اولیه',Ep.toFixed(2),'J/kg'],['Eₖ نهایی',Ep.toFixed(2),'J/kg']];
        },
        explain: v => `از ارتفاع ${v.h} m → v = √(2gh) = ${Math.sqrt(2*v.g*v.h).toFixed(2)} m/s`
      },
      elastic: {
        name: 'انرژی کشسانی فنر',
        formula: 'U = ½kx²   ·   F = −kx',
        desc: 'انرژی ذخیره‌شده در فنر فشرده/کشیده.',
        fields: [['k','ثابت فنر','N/m',10,1000,10,200],['x','تغییر طول','m',0.01,1,0.01,0.15]],
        calc: v => {
          const U = 0.5 * v.k * v.x * v.x;
          const F = v.k * v.x;
          return [['انرژی کشسانی',U.toFixed(3),'J'],['نیروی فنر',F.toFixed(2),'N'],['x',v.x.toFixed(3),'m']];
        },
        explain: v => `U = ½×${v.k}×${v.x}² = ${(0.5*v.k*v.x*v.x).toFixed(3)} J`
      },
      power_mech: {
        name: 'توان مکانیکی',
        formula: 'P = Fv = τω   ·   P = W/t',
        desc: 'توان لحظه‌ای و متوسط.',
        fields: [['F','نیرو','N',1,1000,1,200],['v','سرعت','m/s',0.1,30,0.1,5],['t','زمان','s',0.5,60,0.5,10]],
        calc: v => {
          const P = v.F * v.v;
          const W = P * v.t;
          return [['توان',P.toFixed(1),'W'],['کار',W.toFixed(0),'J'],['توان (kW)',(P/1000).toFixed(3),'kW']];
        },
        explain: v => `P = ${v.F}×${v.v} = ${(v.F*v.v).toFixed(1)} W`
      },
      efficiency: {
        name: 'بازده ماشین',
        formula: 'η = W_out / E_in × 100%',
        desc: 'بازده انرژی و توان خروجی مفید.',
        fields: [['Ein','انرژی ورودی','J',100,10000,50,2000],['Wout','کار مفید','J',50,9000,50,1200]],
        calc: v => {
          const eta = Math.min(100, (v.Wout / v.Ein) * 100);
          const loss = v.Ein - v.Wout;
          return [['بازده',eta.toFixed(1),'%'],['اتلاف',loss.toFixed(0),'J'],['نسبت', (v.Wout/v.Ein).toFixed(3),'']];
        },
        explain: v => `η = ${v.Wout}/${v.Ein} = ${((v.Wout/v.Ein)*100).toFixed(1)}%`
      },
      pendulum: {
        name: 'آونگ ساده',
        formula: 'T = 2π√(L/g)   ·   E ≈ mgLθ²/2 (کوچک)',
        desc: 'دوره تناوب آونگ ساده برای زاویه کوچک.',
        fields: [['L','طول','m',0.1,5,0.05,1],['g','g','m/s²',5,15,0.1,9.81],['theta','زاویه بیشینه','°',1,30,1,15]],
        calc: v => {
          const T = 2 * Math.PI * Math.sqrt(v.L / v.g);
          const th = v.theta * Math.PI / 180;
          const E = 0.5 * 1 * v.g * v.L * th * th; // per unit mass approx
          return [['دوره تناوب',T.toFixed(3),'s'],['فرکانس',(1/T).toFixed(3),'Hz'],['انرژی تقریبی',E.toFixed(4),'J/kg']];
        },
        explain: v => `T = 2π√(${v.L}/${v.g}) = ${(2*Math.PI*Math.sqrt(v.L/v.g)).toFixed(3)} s`
      },
      gravity_pe: {
        name: 'پتانسیل گرانشی عمومی',
        formula: 'U = −GMm/r   ·   g = GM/r²',
        desc: 'انرژی پتانسیل گرانشی و شتاب در فاصله r از جرم M.',
        fields: [['M','جرم مرکزی','M⊕',0.1,100,0.1,1],['r','فاصله','R⊕',1,20,0.1,2],['m','جرم آزمون','kg',1,1000,1,10]],
        calc: v => {
          const M = v.M * CONST.M_EARTH;
          const r = v.r * CONST.R_EARTH;
          const U = -CONST.G * M * v.m / r;
          const g = CONST.G * M / (r * r);
          return [['U',U.toExponential(3),'J'],['g محلی',g.toFixed(3),'m/s²'],['r',(r/1000).toFixed(0),'km']];
        },
        explain: v => `در فاصله ${v.r} R⊕ از جرم ${v.M} M⊕ → g = ${(CONST.G*v.M*CONST.M_EARTH/(v.r*CONST.R_EARTH)**2).toFixed(3)} m/s²`
      },
      collision_energy: {
        name: 'اتلاف انرژی در برخورد',
        formula: 'e = (v₂′−v₁′)/(v₁−v₂)   ·   KE_loss',
        desc: 'ضریب بازگشت و انرژی از دست‌رفته در برخورد.',
        fields: [['m1','جرم ۱','kg',0.5,20,0.5,2],['v1','سرعت ۱','m/s',1,20,0.5,8],['m2','جرم ۲','kg',0.5,20,0.5,4],['e','ضریب e','—',0,1,0.05,0.6]],
        calc: v => {
          const KEi = 0.5*v.m1*v.v1*v.v1;
          // assume m2 at rest
          const v1f = ((v.m1 - v.e*v.m2)*v.v1)/(v.m1+v.m2);
          const v2f = ((1+v.e)*v.m1*v.v1)/(v.m1+v.m2);
          const KEf = 0.5*v.m1*v1f*v1f + 0.5*v.m2*v2f*v2f;
          return [['KE اولیه',KEi.toFixed(2),'J'],['KE نهایی',KEf.toFixed(2),'J'],['اتلاف',(KEi-KEf).toFixed(2),'J']];
        },
        explain: v => `با e=${v.e} → اتلاف انرژی = ${(0.5*v.m1*v.v1*v.v1 - (0.5*v.m1*((v.m1-v.e*v.m2)*v.v1/(v.m1+v.m2))**2 + 0.5*v.m2*((1+v.e)*v.m1*v.v1/(v.m1+v.m2))**2)).toFixed(2)} J`
      },
      heat_mech: {
        name: 'تبدیل کار به گرما',
        formula: 'Q = W = Fd   ·   ΔT = Q/(mc)',
        desc: 'گرمایش ناشی از کار مکانیکی (اصطکاک).',
        fields: [['F','نیرو','N',1,500,1,50],['d','مسافت','m',1,100,1,20],['m','جرم','kg',0.1,10,0.1,1],['c','ظرفیت ویژه','J/kg·K',100,5000,50,900]],
        calc: v => {
          const Q = v.F * v.d;
          const dT = Q / (v.m * v.c);
          return [['گرما Q',Q.toFixed(0),'J'],['ΔT',dT.toFixed(2),'K'],['انرژی بر جرم',(Q/v.m).toFixed(1),'J/kg']];
        },
        explain: v => `W = ${v.F}×${v.d} = ${v.F*v.d} J → ΔT = ${(v.F*v.d/(v.m*v.c)).toFixed(2)} K`
      },
      orbital_energy: {
        name: 'انرژی مداری',
        formula: 'E = −GMm/(2a)   ·   Eₖ = GMm/(2a)',
        desc: 'انرژی کل و جنبشی در مدار دایره‌ای.',
        fields: [['M','جرم مرکزی','M☉',0.1,5,0.1,1],['a','نیم‌محور','AU',0.1,10,0.1,1],['m','جرم ماهواره','kg',1,1000,1,100]],
        calc: v => {
          const M = v.M * CONST.M_SUN;
          const a = v.a * CONST.AU;
          const E = -CONST.G * M * v.m / (2 * a);
          const Ek = -E;
          return [['E کل',E.toExponential(3),'J'],['Eₖ',Ek.toExponential(3),'J'],['Eₚ',(2*E).toExponential(3),'J']];
        },
        explain: v => `E = −GMm/(2a) برای مدار با a=${v.a} AU`
      }
    }
  },

  wave: {
    title: 'موج و صوت',
    icon: '〰️',
    experiments: {
      sine: {
        name: 'موج سینوسی',
        formula: 'y = A sin(2πft − kx + φ)',
        desc: 'شکل موج و پارامترهای آن.',
        fields: [['A','دامنه','—',0.2,5,0.1,2],['f','فرکانس','Hz',0.2,5,0.1,1],['phase','فاز','rad',0,6.28,0.1,0]],
        calc: v => [['دوره',(1/v.f).toFixed(3),'s'],['فرکانس',v.f.toFixed(2),'Hz'],['دامنه',v.A.toFixed(2),'']],
        explain: v => `موج با f=${v.f} Hz و A=${v.A}`
      },
      string: {
        name: 'موج روی ریسمان',
        formula: 'v = √(T/μ)   ·   λ = 2L/n',
        desc: 'سرعت موج و طول موج هماهنگ‌ها.',
        fields: [['T','کشش','N',1,200,1,50],['mu','چگالی خطی','g/m',0.5,20,0.5,5],['L','طول','m',0.2,5,0.1,1],['n','هماهنگ','—',1,8,1,1]],
        calc: v => {
          const vel = Math.sqrt(v.T / (v.mu/1000));
          const lambda = 2 * v.L / v.n;
          const f = vel / lambda;
          return [['سرعت موج',vel.toFixed(1),'m/s'],['λ',lambda.toFixed(3),'m'],['فرکانس',f.toFixed(1),'Hz']];
        },
        explain: v => `v = √(T/μ) = ${Math.sqrt(v.T/(v.mu/1000)).toFixed(1)} m/s`
      },
      doppler: {
        name: 'اثر داپلر',
        formula: 'f′ = f (v ± vₒ)/(v ± vₛ)',
        desc: 'فرکانس شنیده‌شده با حرکت منبع/ناظر.',
        fields: [['f','فرکانس منبع','Hz',100,2000,10,440],['vs','سرعت منبع','m/s',-50,50,1,0],['vo','سرعت ناظر','m/s',-50,50,1,0],['v','سرعت صوت','m/s',300,400,1,343]],
        calc: v => {
          const fp = v.f * (v.v + v.vo) / (v.v + v.vs);
          return [['f′ شنیده‌شده',fp.toFixed(1),'Hz'],['Δf',(fp-v.f).toFixed(1),'Hz'],['نسبت',(fp/v.f).toFixed(4),'']];
        },
        explain: v => `f′ = ${v.f}×(${v.v}+${v.vo})/(${v.v}+${v.vs}) = ${(v.f*(v.v+v.vo)/(v.v+v.vs)).toFixed(1)} Hz`
      },
      beats: {
        name: 'ضربان (بی‌ت)',
        formula: 'f_beat = |f₁ − f₂|',
        desc: 'فرکانس ضربان دو موج نزدیک.',
        fields: [['f1','فرکانس ۱','Hz',100,1000,1,440],['f2','فرکانس ۲','Hz',100,1000,1,444]],
        calc: v => {
          const fb = Math.abs(v.f1 - v.f2);
          return [['فرکانس ضربان',fb.toFixed(1),'Hz'],['دوره ضربان',fb>0?(1/fb).toFixed(3):'∞','s'],['میانگین',((v.f1+v.f2)/2).toFixed(1),'Hz']];
        },
        explain: v => `f_beat = |${v.f1}−${v.f2}| = ${Math.abs(v.f1-v.f2).toFixed(1)} Hz`
      }
    }
  },

  chemistry: {
    title: 'شیمی',
    icon: '🧪',
    experiments: {
      periodic: {
        name: 'جدول تناوبی',
        formula: 'Z · جرم اتمی · آرایش الکترونی',
        desc: 'کاوش جدول مندلیف کامل ۱۱۸ عنصری.',
        fields: [],
        calc: () => [],
        explain: () => 'روی عنصر کلیک کنید یا جستجو کنید.'
      },
      reaction: {
        name: 'ترکیب مواد',
        formula: 'واکنش‌های ساده آموزشی',
        desc: 'دو عنصر را انتخاب کنید تا واکنش ممکن را ببینید.',
        fields: [],
        calc: () => [],
        explain: () => 'عنصر اول و دوم را از لیست انتخاب کنید.'
      },
      molar: {
        name: 'جرم مولی و مول',
        formula: 'n = m/M   ·   N = n × N_A',
        desc: 'تعداد مول و تعداد ذرات از جرم و جرم مولی.',
        fields: [['mass','جرم نمونه','g',0.1,500,0.1,18],['M','جرم مولی','g/mol',1,300,0.1,18]],
        calc: v => {
          const n = v.mass / v.M;
          const N = n * 6.02214076e23;
          return [['مول',n.toFixed(4),'mol'],['تعداد ذرات',N.toExponential(3),''],['جرم مولی',v.M.toFixed(2),'g/mol']];
        },
        explain: v => `n = ${v.mass}/${v.M} = ${(v.mass/v.M).toFixed(4)} mol`
      }
    }
  },

  astronomy: {
    title: 'نجوم و کوانتوم',
    icon: '🌌',
    experiments: {
      kepler: {
        name: 'قانون سوم کپلر',
        formula: 'T² = 4π²a³ / GM   ·   v = √(GM/r)',
        desc: 'دوره مداری و سرعت در مدار دایره‌ای.',
        fields: [['M','جرم مرکزی','M☉',0.1,20,0.1,1],['a','نیم‌محور','AU',0.1,30,0.1,1]],
        calc: v => {
          const M = v.M * CONST.M_SUN;
          const a = v.a * CONST.AU;
          const T = 2 * Math.PI * Math.sqrt(a**3 / (CONST.G * M));
          const Ty = T / 86400 / 365.256;
          const vOrb = Math.sqrt(CONST.G * M / a);
          return [['دوره',Ty.toFixed(3),'سال'],['سرعت مداری',(vOrb/1000).toFixed(2),'km/s'],['a',v.a.toFixed(2),'AU']];
        },
        explain: v => `برای a=${v.a} AU و M=${v.M} M☉ → T ≈ ${(2*Math.PI*Math.sqrt((v.a*CONST.AU)**3/(CONST.G*v.M*CONST.M_SUN))/86400/365.256).toFixed(3)} سال`
      },
      escape: {
        name: 'سرعت گریز',
        formula: 'v_esc = √(2GM/r)',
        desc: 'حداقل سرعت برای خروج از میدان گرانشی.',
        fields: [['M','جرم','M⊕',0.1,1000,0.1,1],['r','شعاع','R⊕',0.5,50,0.1,1]],
        calc: v => {
          const M = v.M * CONST.M_EARTH;
          const r = v.r * CONST.R_EARTH;
          const vesc = Math.sqrt(2 * CONST.G * M / r);
          return [['سرعت گریز',(vesc/1000).toFixed(2),'km/s'],['مقایسه زمین',(vesc/11186).toFixed(2),'×'],['r',(r/1000).toFixed(0),'km']];
        },
        explain: v => `v_esc = √(2GM/r) = ${(Math.sqrt(2*CONST.G*v.M*CONST.M_EARTH/(v.r*CONST.R_EARTH))/1000).toFixed(2)} km/s`
      },
      blackbody: {
        name: 'جسم سیاه (وین و استفان)',
        formula: 'λ_max T = 2.897×10⁻³   ·   P = σAT⁴',
        desc: 'قانون جابه‌جایی وین و توان تابشی.',
        fields: [['T','دما','K',100,10000,50,5800],['A','مساحت','m²',0.01,100,0.01,1]],
        calc: v => {
          const lambda = 2.897771955e-3 / v.T; // m
          const P = CONST.SIGMA * v.A * v.T ** 4;
          return [['λ_max',(lambda*1e9).toFixed(1),'nm'],['توان کل',P.toExponential(3),'W'],['دمای خورشید',v.T>=5000&&v.T<=6000?'نزدیک':'—','']];
        },
        explain: v => `λ_max = 2.898×10⁻³ / ${v.T} ≈ ${(2.897e-3/v.T*1e9).toFixed(1)} nm`
      },
      photoelectric: {
        name: 'اثر فوتوالکتریک',
        formula: 'E = hf   ·   K_max = hf − φ',
        desc: 'انرژی فوتون و انرژی جنبشی بیشینه الکترون.',
        fields: [['lambda','طول موج','nm',100,800,10,400],['phi','تابع کار','eV',1,6,0.1,2.3]],
        calc: v => {
          const f = CONST.C / (v.lambda * 1e-9);
          const E_eV = (CONST.H * f) / CONST.E;
          const Kmax = E_eV - v.phi;
          return [['انرژی فوتون',E_eV.toFixed(3),'eV'],['K_max',Kmax>0?Kmax.toFixed(3):'۰ (گسیل نمی‌شود)','eV'],['فرکانس',(f/1e14).toFixed(2),'×10¹⁴ Hz']];
        },
        explain: v => {
          const E = (CONST.H * CONST.C / (v.lambda*1e-9)) / CONST.E;
          return `hf = ${E.toFixed(3)} eV · φ = ${v.phi} eV → ${E>v.phi ? 'گسیل الکترون' : 'گسیلی رخ نمی‌دهد'}`;
        }
      },
      deBroglie: {
        name: 'طول موج دوبروی',
        formula: 'λ = h / p = h / (mv)',
        desc: 'موج ماده برای ذرات.',
        fields: [['m','جرم','u (amu)',0.0005,10,0.0001,1],['v','سرعت','m/s',1,1e7,10,1e5]],
        calc: v => {
          const mass = v.m * 1.660539e-27;
          const lambda = CONST.H / (mass * v.v);
          return [['λ',lambda.toExponential(3),'m'],['λ (pm)',(lambda*1e12).toFixed(3),'pm'],['تکانه',(mass*v.v).toExponential(3),'kg·m/s']];
        },
        explain: v => `λ = h/(mv) برای جرم ${v.m} u با سرعت ${v.v} m/s`
      },
      bohr: {
        name: 'مدل بور (هیدروژن)',
        formula: 'Eₙ = −13.6 / n² eV   ·   rₙ = 0.529 n² Å',
        desc: 'ترازهای انرژی و شعاع مدار در اتم هیدروژن.',
        fields: [['n','تراز n','—',1,10,1,2]],
        calc: v => {
          const E = -13.6 / (v.n ** 2);
          const r = 0.529 * v.n ** 2;
          const delta = v.n > 1 ? (-13.6/(v.n**2) + 13.6) : 0;
          return [['Eₙ',E.toFixed(3),'eV'],['rₙ',r.toFixed(3),'Å'],['ΔE از پایه',delta.toFixed(3),'eV']];
        },
        explain: v => `n=${v.n} → E = −13.6/${v.n}² = ${(-13.6/(v.n**2)).toFixed(3)} eV`
      },
      schwarzschild: {
        name: 'شعاع شوارتزشیلد',
        formula: 'Rₛ = 2GM / c²',
        desc: 'افق رویداد سیاه‌چاله.',
        fields: [['M','جرم','M☉',0.1,1e6,0.1,10]],
        calc: v => {
          const Rs = 2 * CONST.G * v.M * CONST.M_SUN / (CONST.C ** 2);
          return [['Rₛ',(Rs/1000).toFixed(2),'km'],['Rₛ / R☉',(Rs/6.96e8).toFixed(4),''],['جرم',v.M.toFixed(1),'M☉']];
        },
        explain: v => `Rₛ = 2GM/c² برای ${v.M} M☉ ≈ ${(2*CONST.G*v.M*CONST.M_SUN/(CONST.C**2)/1000).toFixed(2)} km`
      },
      hubble: {
        name: 'قانون هابل',
        formula: 'v = H₀ × d',
        desc: 'سرعت دور شدن کهکشان‌ها.',
        fields: [['d','فاصله','Mpc',1,5000,1,100],['H0','H₀','km/s/Mpc',50,100,1,70]],
        calc: v => {
          const vel = v.H0 * v.d;
          const z = vel / 3e5; // rough
          return [['سرعت دور شدن',vel.toFixed(0),'km/s'],['انتقال به سرخ تقریبی',z.toFixed(4),''],['فاصله',v.d.toFixed(0),'Mpc']];
        },
        explain: v => `v = ${v.H0} × ${v.d} = ${v.H0*v.d} km/s`
      }
    }
  }
};
