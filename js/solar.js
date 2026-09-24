// Approximate 3D solar system (scaled, educational — not full ephemeris)
const SolarSystem = (() => {
  let renderer, scene, camera, container;
  let planets = [];
  let animId = null;
  let timeScale = 1;
  let t = 0;

  // Semi-major axis (AU visual), period (Earth years), color, size
  const DATA = [
    { name: 'Mercury', a: 1.2,  T: 0.24, color: 0xb0b0b0, r: 0.12 },
    { name: 'Venus',   a: 1.7,  T: 0.62, color: 0xe8cda0, r: 0.18 },
    { name: 'Earth',   a: 2.3,  T: 1.00, color: 0x3b9eff, r: 0.2 },
    { name: 'Mars',    a: 3.0,  T: 1.88, color: 0xef4444, r: 0.15 },
    { name: 'Jupiter', a: 4.5,  T: 11.9, color: 0xd4a574, r: 0.45 },
    { name: 'Saturn',  a: 5.8,  T: 29.5, color: 0xf0d9a0, r: 0.38 },
    { name: 'Uranus',  a: 7.0,  T: 84.0, color: 0x7dd3fc, r: 0.28 },
    { name: 'Neptune', a: 8.0,  T: 165,  color: 0x2563eb, r: 0.27 }
  ];

  function init(el) {
    container = el;
    if (typeof THREE === 'undefined') return false;
    const w = el.clientWidth || 700, h = el.clientHeight || 420;
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x03060e, 1);
    el.innerHTML = '';
    el.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 200);
    camera.position.set(0, 8, 16);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0x445566, 0.6));
    const sunLight = new THREE.PointLight(0xfff0c0, 2, 50);
    scene.add(sunLight);

    // stars
    const starGeo = new THREE.BufferGeometry();
    const starPos = [];
    for (let i = 0; i < 800; i++) {
      const r = 40 + Math.random() * 40;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      starPos.push(r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th), r * Math.cos(ph));
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.08 })));

    // sun
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
    );
    scene.add(sun);
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(0.95, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.25 })
    );
    scene.add(glow);

    planets = DATA.map(d => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(d.r, 20, 20),
        new THREE.MeshStandardMaterial({ color: d.color, roughness: 0.6 })
      );
      scene.add(mesh);
      // orbit ring
      const curve = new THREE.EllipseCurve(0, 0, d.a, d.a * 0.97, 0, Math.PI * 2, false, 0);
      const pts = curve.getPoints(64);
      const geo = new THREE.BufferGeometry().setFromPoints(pts.map(p => new THREE.Vector3(p.x, 0, p.y)));
      const ring = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0x1e3a5f }));
      scene.add(ring);
      return { ...d, mesh, angle: Math.random() * Math.PI * 2 };
    });

    // pointer rotate
    let drag = false, px = 0, py = 0, th = 0.3, ph = 0.9, rad = 18;
    const upd = () => {
      camera.position.set(rad * Math.sin(ph) * Math.cos(th), rad * Math.cos(ph), rad * Math.sin(ph) * Math.sin(th));
      camera.lookAt(0, 0, 0);
    };
    upd();
    el.addEventListener('pointerdown', e => { drag = true; px = e.clientX; py = e.clientY; });
    window.addEventListener('pointerup', () => { drag = false; });
    window.addEventListener('pointermove', e => {
      if (!drag) return;
      th += (e.clientX - px) * 0.006;
      ph = Math.max(0.2, Math.min(Math.PI - 0.2, ph + (e.clientY - py) * 0.006));
      px = e.clientX; py = e.clientY;
      upd();
    });
    el.addEventListener('wheel', e => {
      e.preventDefault();
      rad = Math.max(6, Math.min(40, rad + e.deltaY * 0.01));
      upd();
    }, { passive: false });

    return true;
  }

  function setTimeScale(s) { timeScale = s; }

  function start() {
    if (animId) cancelAnimationFrame(animId);
    let last = performance.now();
    function frame(now) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt * timeScale;
      planets.forEach(p => {
        // Kepler-ish: angular speed ~ 1/T
        p.angle += (dt * timeScale * Math.PI * 2) / (p.T * 10);
        p.mesh.position.x = Math.cos(p.angle) * p.a;
        p.mesh.position.z = Math.sin(p.angle) * p.a * 0.97;
        p.mesh.position.y = 0;
      });
      renderer.render(scene, camera);
      animId = requestAnimationFrame(frame);
    }
    frame(performance.now());
  }

  function stop() {
    if (animId) cancelAnimationFrame(animId);
    animId = null;
  }

  function resize() {
    if (!container || !renderer) return;
    const w = container.clientWidth, h = container.clientHeight || 420;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  function getPlanetInfo() {
    return planets.map(p => ({
      name: p.name,
      angle: p.angle,
      x: p.mesh.position.x,
      z: p.mesh.position.z
    }));
  }

  return { init, start, stop, setTimeScale, resize, getPlanetInfo, DATA };
})();
