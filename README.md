# Universal Lab v6.0

Major upgrade: WebGL 3D, physics engine, live audio, solar system, molecular builder, WebXR-ready.

## Features

| Mode | Description |
|------|-------------|
| **3D Motion** | Kinematics path in Three.js with trail |
| **Physics Engine** | Verlet integration — bounce, spring, collision, fluid drag |
| **Atom** | Bohr-like shells with orbiting electrons |
| **Solar System** | 8 planets, adjustable time scale, starfield |
| **Audio / Wave** | Microphone FFT spectrum + tone generator |
| **Molecule** | Drag atoms (H,C,N,O,Cl), auto bonds, bond energy estimate |
| **VR** | WebXR entry point when headset/browser supports it |

## Stack

- Three.js r160 (CDN)
- Web Audio API
- Canvas 2D (molecule + spectrum)
- Vanilla JS modules

## Run

1. Open `index.html` in a modern browser (Chrome/Edge/Firefox recommended).
2. For 3D: network access once to load Three.js from CDN, or place a local copy in `lib/`.
3. Microphone mode requires user permission.

## Structure

```
Universal_Lab_v6/
├── index.html
├── css/style.css
├── js/
│   ├── app.js
│   ├── scenes3d.js
│   ├── physics_engine.js
│   ├── audio_lab.js
│   ├── solar.js
│   └── molecule.js
└── README.md
```

## Notes

- Solar positions are educational (relative periods), not full ephemerides.
- Molecular energies are approximate textbook bond energies.
- WebXR depends on device/browser support.
