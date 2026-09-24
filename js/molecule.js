// Simple 2D molecular builder on canvas — drag atoms, auto-bond nearby, estimate energy
const MoleculeLab = (() => {
  let canvas, ctx;
  let atoms = []; // {el, x, y, r, color}
  let bonds = []; // {i, j}
  let drag = null;
  let running = false;

  const EL = {
    H:  { r: 14, color: '#e5e5e5', valence: 1, mass: 1 },
    C:  { r: 18, color: '#555',    valence: 4, mass: 12 },
    N:  { r: 17, color: '#3b82f6', valence: 3, mass: 14 },
    O:  { r: 16, color: '#ef4444', valence: 2, mass: 16 },
    Cl: { r: 20, color: '#22c55e', valence: 1, mass: 35.5 }
  };

  // rough bond energy kcal/mol educational
  const BOND_E = {
    'H-H': 104, 'C-H': 99, 'C-C': 83, 'C-O': 86, 'O-H': 111,
    'N-H': 93, 'C-N': 73, 'O-O': 35, 'Cl-Cl': 58, 'H-Cl': 103,
    'C-Cl': 79, 'N-N': 40, 'N-O': 50
  };

  function init(c) {
    canvas = c;
    ctx = canvas.getContext('2d');
    running = true;
    canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    loop();
  }

  function addAtom(el, x, y) {
    const info = EL[el];
    if (!info) return;
    atoms.push({ el, x, y, r: info.r, color: info.color });
    recomputeBonds();
  }

  function clear() {
    atoms = [];
    bonds = [];
  }

  function recomputeBonds() {
    bonds = [];
    const bondCount = atoms.map(() => 0);
    // greedy nearest bonding by valence
    const pairs = [];
    for (let i = 0; i < atoms.length; i++) {
      for (let j = i + 1; j < atoms.length; j++) {
        const dx = atoms[j].x - atoms[i].x;
        const dy = atoms[j].y - atoms[i].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const maxD = atoms[i].r + atoms[j].r + 28;
        if (d < maxD) pairs.push({ i, j, d });
      }
    }
    pairs.sort((a, b) => a.d - b.d);
    for (const p of pairs) {
      const vi = EL[atoms[p.i].el].valence;
      const vj = EL[atoms[p.j].el].valence;
      if (bondCount[p.i] < vi && bondCount[p.j] < vj) {
        bonds.push({ i: p.i, j: p.j });
        bondCount[p.i]++;
        bondCount[p.j]++;
      }
    }
  }

  function energy() {
    let e = 0;
    bonds.forEach(b => {
      const a = atoms[b.i].el, c = atoms[b.j].el;
      const key1 = a + '-' + c, key2 = c + '-' + a;
      e += BOND_E[key1] || BOND_E[key2] || 60;
    });
    return e;
  }

  function formula() {
    const counts = {};
    atoms.forEach(a => { counts[a.el] = (counts[a.el] || 0) + 1; });
    return Object.keys(counts).sort().map(k => k + (counts[k] > 1 ? counts[k] : '')).join('') || '—';
  }

  function onDown(e) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    for (let i = atoms.length - 1; i >= 0; i--) {
      const a = atoms[i];
      const dx = x - a.x, dy = y - a.y;
      if (dx * dx + dy * dy < a.r * a.r * 1.5) {
        drag = { i, ox: dx, oy: dy };
        return;
      }
    }
  }
  function onMove(e) {
    if (drag == null) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    atoms[drag.i].x = x - drag.ox;
    atoms[drag.i].y = y - drag.oy;
    recomputeBonds();
  }
  function onUp() { drag = null; }

  function loop() {
    if (!running) return;
    const w = canvas.width, h = canvas.height;
    ctx.fillStyle = '#080e1a';
    ctx.fillRect(0, 0, w, h);
    // bonds
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 4;
    bonds.forEach(b => {
      const a = atoms[b.i], c = atoms[b.j];
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(c.x, c.y);
      ctx.stroke();
    });
    // atoms
    atoms.forEach(a => {
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
      ctx.fillStyle = a.color;
      ctx.fill();
      ctx.strokeStyle = '#fff3';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = (a.el === 'H' || a.el === 'C') ? '#111' : '#fff';
      if (a.el === 'C') ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px Tahoma';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(a.el, a.x, a.y);
    });
    requestAnimationFrame(loop);
  }

  function stop() { running = false; }

  return { init, addAtom, clear, energy, formula, bonds: () => bonds, atoms: () => atoms, stop, recomputeBonds };
})();
