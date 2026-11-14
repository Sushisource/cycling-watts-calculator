# Cadence / Lab

A standalone cycling power and gearing calculator. React, TypeScript, Vite and plain CSS; no backend or account. Settings stay in localStorage. Google Fonts are optional; system fonts work offline.

## Local development

Node 20.19+ (Node 20 LTS recommended):

```sh
npm ci
npm run dev -- --host 0.0.0.0 --port 5173
npm run lint
npm test
npm run build
```

`dist/` is a static site with relative asset paths. In GitHub Settings → Pages, select **GitHub Actions** as the source. Push to `main` to lint, test, build and deploy via the included Pages workflow.

## Model & data

Cadence and selected gearing determine speed. Steady-state rider power balances gravity, rolling resistance and signed air drag, then accounts for drivetrain loss. Standard-atmosphere density uses a 15°C sea-level temperature and tropospheric lapse rate. Negative power is displayed as zero/coasting, with signed wheel power retained. W/kg uses total rider + bicycle mass. Development and gear inches retain their conventional units in both display modes.

`src/physics.ts` contains pure functions and hand-calculated sanity tests. `src/data/gears.ts` contains explicit cassette tooth sequences and manufacturer source URLs. The Shimano 12-speed 11–34 sequence intentionally has **no 16T** (adding one would make thirteen cogs). Catalog entries are identified by model/generation; they are not a compatibility checker or exhaustive historical catalog. GRX and gravel mullet cassettes may originate in MTB ranges, but no MTB cranksets or triples are included. Cassette ranges offered under a series include compatible same-manufacturer alternatives (e.g. HG710 11–36 with 105).

Theoretical ETRTO circumference is π × (BSD + 2 × width). Tire deformation, pressure, road surface, rider movement and acceleration are not modeled; results are estimates, not a power meter.
