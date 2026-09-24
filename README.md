# Universal Lab v5.0

Interactive offline science laboratory with modular architecture.

## What's new in v5

- **Settings fixed** — theme & language toggle work reliably
- **Live animations fixed** — Canvas redraws every frame with experiment-specific visuals
- **4 themes**: Ocean · Ember · Aurora · **Light**
- **Dynamic particle background** with soft connections
- **Modular JS**: formulas & calculations split per section
  - `exp_physics.js`, `exp_electric.js`, `exp_energy.js`, …
  - `constants.js`, `elements.js`, `reactions.js`, `i18n.js`
- Bilingual FA / EN
- Full periodic table (118), reactions, quantum & astronomy

## Structure

```
Universal_Lab_v5/
├── index.html
├── css/style.css
├── js/
│   ├── constants.js
│   ├── i18n.js
│   ├── elements.js
│   ├── reactions.js
│   ├── exp_physics.js
│   ├── exp_electric.js
│   ├── exp_energy.js
│   ├── exp_wave.js
│   ├── exp_chemistry.js
│   ├── exp_astronomy.js
│   └── app.js
└── README.md
```

## Run

Open `index.html` in a browser. No build or server needed.

GitHub Pages: push folder and enable Pages on main branch.
