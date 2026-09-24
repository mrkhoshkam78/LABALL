// Simple numerical physics engine (Verlet-style integration)
// Supports particles, springs, gravity, ground collision, basic fluid drag

const PhysicsEngine = (() => {
  const G = 9.80665;

  class Particle {
    constructor(x, y, z, mass = 1, radius = 0.3) {
      this.x = x; this.y = y; this.z = z;
      this.px = x; this.py = y; this.pz = z; // previous
      this.mass = mass;
      this.radius = radius;
      this.fx = 0; this.fy = 0; this.fz = 0;
      this.fixed = false;
      this.color = 0x3b9eff;
    }
    applyForce(fx, fy, fz) {
      this.fx += fx; this.fy += fy; this.fz += fz;
    }
  }

  class Spring {
    constructor(a, b, restLen, k = 50, damping = 0.5) {
      this.a = a; this.b = b;
      this.rest = restLen;
      this.k = k;
      this.damping = damping;
    }
  }

  class World {
    constructor() {
      this.particles = [];
      this.springs = [];
      this.gravity = -G;
      this.drag = 0.02;       // air / fluid drag coeff
      this.groundY = 0;
      this.restitution = 0.55;
      this.dt = 1 / 60;
    }

    addParticle(p) { this.particles.push(p); return p; }
    addSpring(s) { this.springs.push(s); return s; }

    clear() {
      this.particles = [];
      this.springs = [];
    }

    step(substeps = 2) {
      const dt = this.dt / substeps;
      for (let s = 0; s < substeps; s++) {
        // springs
        for (const sp of this.springs) {
          const a = sp.a, b = sp.b;
          let dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1e-6;
          const stretch = dist - sp.rest;
          const f = sp.k * stretch;
          dx /= dist; dy /= dist; dz /= dist;
          // relative velocity damping
          const dvx = (b.x - b.px) - (a.x - a.px);
          const dvy = (b.y - b.py) - (a.y - a.py);
          const dvz = (b.z - b.pz) - (a.z - a.pz);
          const vrel = dvx * dx + dvy * dy + dvz * dz;
          const fd = sp.damping * vrel;
          const fx = (f + fd) * dx, fy = (f + fd) * dy, fz = (f + fd) * dz;
          if (!a.fixed) { a.fx += fx; a.fy += fy; a.fz += fz; }
          if (!b.fixed) { b.fx -= fx; b.fy -= fy; b.fz -= fz; }
        }

        // integrate
        for (const p of this.particles) {
          if (p.fixed) continue;
          // gravity
          p.fy += p.mass * this.gravity;
          // drag ~ -c * v
          const vx = p.x - p.px, vy = p.y - p.py, vz = p.z - p.pz;
          p.fx -= this.drag * vx * 60;
          p.fy -= this.drag * vy * 60;
          p.fz -= this.drag * vz * 60;

          const ax = p.fx / p.mass, ay = p.fy / p.mass, az = p.fz / p.mass;
          const nx = 2 * p.x - p.px + ax * dt * dt;
          const ny = 2 * p.y - p.py + ay * dt * dt;
          const nz = 2 * p.z - p.pz + az * dt * dt;
          p.px = p.x; p.py = p.y; p.pz = p.z;
          p.x = nx; p.y = ny; p.z = nz;
          p.fx = p.fy = p.fz = 0;

          // ground collision
          if (p.y - p.radius < this.groundY) {
            p.y = this.groundY + p.radius;
            const vy2 = p.y - p.py;
            p.py = p.y + vy2 * this.restitution;
            // friction on horizontal
            p.px = p.x - (p.x - p.px) * 0.85;
            p.pz = p.z - (p.z - p.pz) * 0.85;
          }
        }

        // particle-particle collisions (simple)
        for (let i = 0; i < this.particles.length; i++) {
          for (let j = i + 1; j < this.particles.length; j++) {
            const a = this.particles[i], b = this.particles[j];
            if (a.fixed && b.fixed) continue;
            let dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1e-6;
            const minD = a.radius + b.radius;
            if (dist < minD) {
              const overlap = minD - dist;
              dx /= dist; dy /= dist; dz /= dist;
              const half = overlap * 0.5;
              if (!a.fixed) { a.x -= dx * half; a.y -= dy * half; a.z -= dz * half; }
              if (!b.fixed) { b.x += dx * half; b.y += dy * half; b.z += dz * half; }
            }
          }
        }
      }
    }

    // Helpers to build common setups
    setupBouncingBall(height = 5, mass = 1) {
      this.clear();
      this.gravity = -G;
      this.drag = 0.01;
      const p = new Particle(0, height, 0, mass, 0.35);
      p.color = 0x22d3ee;
      this.addParticle(p);
      return p;
    }

    setupSpringMass(k = 80) {
      this.clear();
      this.gravity = -G;
      this.drag = 0.02;
      const anchor = new Particle(0, 6, 0, 1, 0.15);
      anchor.fixed = true;
      anchor.color = 0x94a3b8;
      const mass = new Particle(0, 3, 0, 1.5, 0.35);
      mass.color = 0xa78bfa;
      this.addParticle(anchor);
      this.addParticle(mass);
      this.addSpring(new Spring(anchor, mass, 2.5, k, 0.8));
      return { anchor, mass };
    }

    setupCollision() {
      this.clear();
      this.gravity = -G * 0.3;
      this.drag = 0.005;
      const a = new Particle(-3, 2, 0, 2, 0.4);
      a.px = -3.15; // give initial velocity toward +x
      a.color = 0x3b9eff;
      const b = new Particle(1.5, 2, 0, 1, 0.35);
      b.color = 0xfb923c;
      this.addParticle(a);
      this.addParticle(b);
      return { a, b };
    }

    setupFluidDrop(drag = 0.15) {
      this.clear();
      this.gravity = -G;
      this.drag = drag;
      const p = new Particle(0, 7, 0, 1, 0.3);
      p.color = 0x38bdf8;
      this.addParticle(p);
      return p;
    }
  }

  return { Particle, Spring, World, G };
})();
