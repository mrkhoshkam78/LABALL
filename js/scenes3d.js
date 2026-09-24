// Three.js scene manager for motion, atom, physics visualization, VR prep
const Scenes3D = (() => {
  let renderer, scene, camera, controls = null;
  let animId = null;
  let container = null;
  let currentMode = null;
  let clock = null;

  // shared objects
  let meshBall = null, trailLine = null, trailPts = [];
  let atomGroup = null, electronMeshes = [];
  let physMeshes = [];
  let world = null;

  // orbit state for motion
  let motionParams = { v0: 8, a: 2, t: 6 };

  function init(el) {
    container = el;
    if (typeof THREE === 'undefined') {
      el.innerHTML = '<p style="padding:20px;color:#f87171">Three.js load failed. Check network/CDN.</p>';
      return false;
    }
    const w = el.clientWidth || 700;
    const h = el.clientHeight || 420;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x050a12, 1);
    el.innerHTML = '';
    el.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 500);
    camera.position.set(6, 5, 10);

    // lights
    const amb = new THREE.AmbientLight(0x6688aa, 0.55);
    scene.add(amb);
    const dir = new THREE.DirectionalLight(0xffffff, 0.85);
    dir.position.set(5, 10, 7);
    scene.add(dir);

    // grid + axes helper
    const grid = new THREE.GridHelper(20, 20, 0x1e3a5f, 0x152033);
    scene.add(grid);

    // simple orbit controls (manual)
    setupPointerControls(el);

    clock = new THREE.Clock();
    window.addEventListener('resize', onResize);
    return true;
  }

  function setupPointerControls(el) {
    let dragging = false, prevX = 0, prevY = 0;
    let theta = 0.6, phi = 0.9, radius = 14;
    const updateCam = () => {
      camera.position.x = radius * Math.sin(phi) * Math.cos(theta);
      camera.position.y = radius * Math.cos(phi);
      camera.position.z = radius * Math.sin(phi) * Math.sin(theta);
      camera.lookAt(0, 1, 0);
    };
    updateCam();
    el.addEventListener('pointerdown', e => { dragging = true; prevX = e.clientX; prevY = e.clientY; });
    window.addEventListener('pointerup', () => { dragging = false; });
    window.addEventListener('pointermove', e => {
      if (!dragging) return;
      const dx = e.clientX - prevX, dy = e.clientY - prevY;
      prevX = e.clientX; prevY = e.clientY;
      theta += dx * 0.008;
      phi = Math.max(0.15, Math.min(Math.PI - 0.15, phi + dy * 0.008));
      updateCam();
    });
    el.addEventListener('wheel', e => {
      e.preventDefault();
      radius = Math.max(4, Math.min(40, radius + e.deltaY * 0.01));
      updateCam();
    }, { passive: false });
  }

  function onResize() {
    if (!container || !renderer) return;
    const w = container.clientWidth, h = container.clientHeight || 420;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  function clearDynamic() {
    if (meshBall) { scene.remove(meshBall); meshBall = null; }
    if (trailLine) { scene.remove(trailLine); trailLine = null; }
    trailPts = [];
    if (atomGroup) { scene.remove(atomGroup); atomGroup = null; electronMeshes = []; }
    physMeshes.forEach(m => scene.remove(m));
    physMeshes = [];
  }

  // ─── Motion 3D (kinematics path) ───────────────────────────────────────
  function setupMotion(params) {
    currentMode = 'motion3d';
    motionParams = { ...params };
    clearDynamic();
    const geo = new THREE.SphereGeometry(0.35, 24, 24);
    const mat = new THREE.MeshStandardMaterial({ color: 0x22d3ee, metalness: 0.3, roughness: 0.4 });
    meshBall = new THREE.Mesh(geo, mat);
    scene.add(meshBall);

    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(300 * 3);
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setDrawRange(0, 0);
    trailLine = new THREE.Line(g, new THREE.LineBasicMaterial({ color: 0x3b9eff, transparent: true, opacity: 0.6 }));
    scene.add(trailLine);
    trailPts = [];
  }

  function updateMotion(t) {
    if (!meshBall) return;
    const { v0, a } = motionParams;
    // motion along x, slight arc in y for visual
    const x = v0 * t + 0.5 * a * t * t;
    const y = 0.5 + Math.max(0, 2 - 0.08 * t * t);
    meshBall.position.set(x * 0.4, y, 0);

    trailPts.push(x * 0.4, y, 0);
    if (trailPts.length > 300 * 3) trailPts.splice(0, 9);
    if (trailLine) {
      const pos = trailLine.geometry.attributes.position.array;
      for (let i = 0; i < trailPts.length; i++) pos[i] = trailPts[i];
      trailLine.geometry.attributes.position.needsUpdate = true;
      trailLine.geometry.setDrawRange(0, trailPts.length / 3);
    }
  }

  // ─── Atom (Bohr-like) ──────────────────────────────────────────────────
  function setupAtom(nMax = 3) {
    currentMode = 'atom';
    clearDynamic();
    atomGroup = new THREE.Group();
    // nucleus
    const nuc = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 24, 24),
      new THREE.MeshStandardMaterial({ color: 0xfbbf24, emissive: 0x664400, metalness: 0.4 })
    );
    atomGroup.add(nuc);
    // shells + electrons
    electronMeshes = [];
    const colors = [0x22d3ee, 0x3b9eff, 0xa78bfa];
    for (let n = 1; n <= nMax; n++) {
      const r = 1.2 * n;
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.015, 8, 64),
        new THREE.MeshBasicMaterial({ color: 0x334455, transparent: true, opacity: 0.5 })
      );
      ring.rotation.x = Math.PI / 2;
      atomGroup.add(ring);
      const eCount = Math.min(2 * n * n, 8);
      for (let e = 0; e < eCount; e++) {
        const em = new THREE.Mesh(
          new THREE.SphereGeometry(0.12, 12, 12),
          new THREE.MeshStandardMaterial({ color: colors[(n - 1) % 3], emissive: colors[(n - 1) % 3], emissiveIntensity: 0.3 })
        );
        em.userData = { n, angle: (e / eCount) * Math.PI * 2, speed: 0.8 / n };
        atomGroup.add(em);
        electronMeshes.push(em);
      }
    }
    scene.add(atomGroup);
    camera.position.set(5, 4, 7);
  }

  function updateAtom(dt) {
    electronMeshes.forEach(em => {
      em.userData.angle += em.userData.speed * dt;
      const r = 1.2 * em.userData.n;
      em.position.x = Math.cos(em.userData.angle) * r;
      em.position.z = Math.sin(em.userData.angle) * r;
      em.position.y = Math.sin(em.userData.angle * 2) * 0.15;
    });
  }

  // ─── Physics world visualization ───────────────────────────────────────
  function setupPhysics(type, opts = {}) {
    currentMode = 'physics';
    clearDynamic();
    world = new PhysicsEngine.World();
    if (type === 'bounce') world.setupBouncingBall(opts.h || 5);
    else if (type === 'spring') world.setupSpringMass(opts.k || 80);
    else if (type === 'collision') world.setupCollision();
    else if (type === 'fluid') world.setupFluidDrop(opts.drag || 0.15);
    else world.setupBouncingBall(5);

    physMeshes = world.particles.map(p => {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(p.radius, 20, 20),
        new THREE.MeshStandardMaterial({ color: p.color, metalness: 0.25, roughness: 0.45 })
      );
      scene.add(m);
      return m;
    });
    // ground plane visual
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(16, 16),
      new THREE.MeshStandardMaterial({ color: 0x0f1a28, roughness: 0.9 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    scene.add(ground);
    physMeshes.push(ground);
  }

  function stepPhysics() {
    if (!world) return;
    world.step(2);
    world.particles.forEach((p, i) => {
      if (physMeshes[i]) physMeshes[i].position.set(p.x, p.y, p.z);
    });
  }

  // ─── Main loop ─────────────────────────────────────────────────────────
  let motionT = 0;
  function startLoop() {
    if (animId) cancelAnimationFrame(animId);
    function frame() {
      const dt = Math.min(clock.getDelta(), 0.05);
      if (currentMode === 'motion3d') {
        motionT += dt * 0.7;
        const tMax = motionParams.t || 6;
        if (motionT > tMax + 0.5) { motionT = 0; trailPts = []; }
        updateMotion(Math.min(motionT, tMax));
      } else if (currentMode === 'atom') {
        updateAtom(dt);
      } else if (currentMode === 'physics') {
        stepPhysics();
      }
      if (renderer && scene && camera) renderer.render(scene, camera);
      animId = requestAnimationFrame(frame);
    }
    frame();
  }

  function setMotionParams(p) {
    motionParams = { ...motionParams, ...p };
    motionT = 0;
    trailPts = [];
  }

  function getWorld() { return world; }

  function enableVR() {
    if (!renderer || !renderer.xr) return false;
    renderer.xr.enabled = true;
    // WebXR button injection is browser-dependent; flag ready
    return true;
  }

  return {
    init, setupMotion, setMotionParams, setupAtom, setupPhysics,
    startLoop, getWorld, enableVR, onResize
  };
})();
