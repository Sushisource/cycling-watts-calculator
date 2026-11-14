import { useEffect, useState } from "react";
import NumericInput from "./NumericInput";
import { calculate, parseTeeth, wheelCircumference } from "./physics";
import {
  defaultCassette,
  gearCategories,
  gearOptions,
} from "./data/gear-options";
import "./App.css";
const defaults = {
  cadence: 90,
  grade: 0,
  mass: 80,
  circumference: wheelCircumference(622, 28),
  cda: 0.32,
  crr: 0.005,
  loss: 0.025,
  wind: 0,
  altitude: 0,
  imperial: false,
  front: "Shimano/Road",
  rear: "Shimano/Road",
  fo: 1,
  ro: defaultCassette("Shimano/Road"),
  ring: 0,
  cog: 5,
  follow: true,
  cf: "50,34",
  cr: "11,13,15,17,19,21,24,28,32,36",
  tire: "622-28",
  position: "0.32",
};
type State = typeof defaults;
function load(): State {
  try {
    const v = JSON.parse(localStorage.getItem("cadence-lab-v2") || "null");
    if (!v) return defaults;
    const s = { ...defaults };
    for (const k of Object.keys(s) as (keyof State)[])
      if (
        typeof v[k] === typeof s[k] &&
        (typeof v[k] !== "number" || Number.isFinite(v[k]))
      )
        Object.assign(s, { [k]: v[k] });
    if (v.position === undefined)
      s.position = [0.4, 0.32, 0.28, 0.23].includes(s.cda) ? String(s.cda) : "custom";
    if (
      ![s.front, s.rear].every(
        (id) => id === "custom" || gearCategories.includes(id),
      ) ||
      s.mass < 10 ||
      s.mass > 300 ||
      s.loss < 0 ||
      s.loss > 0.5 ||
      s.cda < 0 ||
      s.crr < 0 ||
      s.circumference <= 0 ||
      s.altitude < -500 ||
      s.altitude > 10000 ||
      s.cadence < 0 ||
      ![s.fo, s.ro, s.ring, s.cog].every((n) => Number.isInteger(n) && n >= 0)
    )
      return defaults;
    return s;
  } catch {
    return defaults;
  }
}
function NumberField({
  label,
  value,
  onChange,
  onEdit,
  min = 0,
  max = 1000,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  onEdit?: () => void;
  min?: number;
  max?: number;
}) {
  return (
    <label className="field">
      {label}
      <NumericInput
        label={label}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        onEdit={onEdit}
      />
    </label>
  );
}
function Drawing({
  teeth,
  active,
  select,
  front,
}: {
  teeth: number[];
  active: number;
  select: (i: number) => void;
  front: boolean;
}) {
  const spacing = front ? 48 : 24;
  const width = Math.max(front ? 120 : 280, teeth.length * spacing + 8);
  const stack = teeth
    .map((tooth, index) => ({ tooth, index }))
    .sort((a, b) => (front ? a.tooth - b.tooth : b.tooth - a.tooth));
  return (
    <div className="stack-picker">
      <div className="stack-direction">
        <span>← {front ? "Inboard / frame" : "Inboard / wheel"}</span>
        <span>Outboard →</span>
      </div>
      <div className="gear-stack">
        <svg
          viewBox={`0 0 ${width} 260`}
          aria-label={front ? "Chainrings" : "Cassette"}
          role="group"
        >
          <line
            x1="0"
            y1="120"
            x2={width}
            y2="120"
            stroke="#b5c1aa"
            strokeWidth="8"
          />
          {stack.map(({ tooth: t, index: i }, position) => {
            const x = (width - stack.length * spacing) / 2 + position * spacing + spacing / 2;
            const height = (t / Math.max(...teeth)) * 180;
            return (
              <g
                key={t}
                className={i === active ? "gear active" : "gear"}
                role="button"
                tabIndex={0}
                aria-label={`${t} tooth ${front ? "chainring" : "cog"}`}
                aria-pressed={i === active}
                onClick={() => select(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    select(i);
                  }
                }}
              >
                <rect
                  className="gear-hit"
                  x={x - spacing / 2 + 1}
                  y="12"
                  width={spacing - 2}
                  height="240"
                  rx="8"
                />
                <rect
                  className="plate"
                  x={x - 3}
                  y={120 - height / 2}
                  width="6"
                  height={height}
                  rx="3"
                />
                <path
                  className="plate-edge"
                  d={`M${x - 2} ${120 - height / 2 + 5} V${120 + height / 2 - 5}`}
                />
                <rect
                  className="hub"
                  x={x - 5}
                  y="112"
                  width="10"
                  height="16"
                  rx="3"
                />
                <text x={x} y="238" textAnchor="middle">
                  {t}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className="stack-note">
        Top-down view ·{" "}
        {front ? "big ring outboard" : "largest cog nearest wheel"}
      </p>
    </div>
  );
}
export default function App() {
  const [resetVersion, setResetVersion] = useState(0);
  const [presetVersion, setPresetVersion] = useState(0);
  const [s, set] = useState(load),
    update = (p: Partial<State>) => set((old) => ({ ...old, ...p }));
  useEffect(() => {
    try {
      if (s !== defaults) localStorage.setItem("cadence-lab-v2", JSON.stringify(s));
    } catch {
      /* Storage is optional. */
    }
  }, [s]);
  const [fm, fd] = s.front.split("/"),
    [rm, rd] = s.rear.split("/");
  const fronts = gearOptions(fm, fd, true),
    rears = gearOptions(rm, rd, false);
  const cf = parseTeeth(s.cf, true),
    cr = parseTeeth(s.cr);
  const rings =
    s.front === "custom" ? cf || [50, 34] : (fronts[s.fo] || fronts[0]).teeth;
  const cogs =
    s.rear === "custom" ? cr || [17] : (rears[s.ro] || rears[0]).teeth;
  const ring = Math.max(0, Math.min(s.ring, rings.length - 1)),
    cog = Math.max(0, Math.min(s.cog, cogs.length - 1));
  const result = calculate(s, rings[ring], cogs[cog]),
    unit = s.imperial ? "mph" : "km/h",
    factor = s.imperial ? 2.236936 : 3.6;
  const changeCategory = (id: string, front: boolean) =>
    update(
      front
        ? {
            front: id,
            fo: 0,
            ring: 0,
            ...(s.follow ? { rear: id, ro: defaultCassette(id), cog: 0 } : {}),
          }
        : { rear: id, ro: defaultCassette(id), cog: 0, follow: false },
    );
  const picker = (front: boolean) => {
    const id = front ? s.front : s.rear;
    const [manufacturer, discipline = "Road"] = id.split("/");
    const options = front ? fronts : rears;
    const optionIndex = front ? s.fo : s.ro;
    return (
      <div className="picker">
        <div className="section-label">
          <span>{front ? "01 / FRONT" : "02 / REAR"}</span>
          <b>{front ? "Chainrings" : "Cassette"}</b>
        </div>
        <div className="two-col">
          <label className="field">
            Manufacturer
            <select
              value={id === "custom" ? "Custom" : manufacturer}
              onChange={(e) =>
                changeCategory(
                  e.target.value === "Custom"
                    ? "custom"
                    : `${e.target.value}/${discipline}`,
                  front,
                )
              }
            >
              {["Shimano", "SRAM", "Custom"].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
          <label className="field">
            Discipline
            <select
              disabled={id === "custom"}
              value={discipline}
              onChange={(e) =>
                changeCategory(`${manufacturer}/${e.target.value}`, front)
              }
            >
              <option>Road</option>
              <option>Gravel</option>
            </select>
          </label>
        </div>
        {id === "custom" ? (
          <label className="field">
            {front ? "1–2 rings" : "Cogs"} · comma-separated
            <input
              value={front ? s.cf : s.cr}
              aria-invalid={!(front ? cf : cr)}
              onChange={(e) =>
                update(
                  front
                    ? { cf: e.target.value, ring: 0 }
                    : { cr: e.target.value, cog: 0 },
                )
              }
            />
            {!(front ? cf : cr) && (
              <small className="error">
                Use unique integers 1–100. Preview uses fallback gearing.
              </small>
            )}
          </label>
        ) : (
          <>
            <label className="field">
              {front ? "Chainring combination" : "Cassette range"}
              <select
                value={options[optionIndex] ? optionIndex : 0}
                onChange={(e) =>
                  update(
                    front
                      ? { fo: +e.target.value, ring: 0 }
                      : { ro: +e.target.value, cog: 0 },
                  )
                }
              >
                {options.map((v, i) => (
                  <option key={i} value={i}>
                    {v.label}
                  </option>
                ))}
              </select>
              <span className="groupset-caption">
                Offered by{" "}
                {(options[optionIndex] || options[0]).groupsets.join(", ")}
              </span>
            </label>
          </>
        )}
        <Drawing
          teeth={front ? rings : cogs}
          active={front ? ring : cog}
          front={front}
          select={(i) => update(front ? { ring: i } : { cog: i })}
        />
        <div className="gear-caption">
          {front ? rings[ring] : cogs[cog]} tooth {front ? "chainring" : "cog"}
          <span>Click a gear to select</span>
        </div>
      </div>
    );
  };
  return (
    <>
      <header>
        <a className="brand" href="./">
          <span className="brand-icon">↗</span> CADENCE <span>/ LAB</span>
        </a>
        <div className="header-right">
          <button className="reset" onClick={() => {
            try {
              localStorage.removeItem("cadence-lab");
              localStorage.removeItem("cadence-lab-v2");
            } catch { /* Storage is optional. */ }
            set(defaults);
            setResetVersion((v) => v + 1);
          }}>Reset all settings</button>
          <div className="segmented">
            {[false, true].map((v) => (
              <button
                key={String(v)}
                className={s.imperial === v ? "selected" : ""}
                onClick={() => update({ imperial: v })}
              >
                {v ? "Imperial" : "Metric"}
              </button>
            ))}
          </div>
        </div>
      </header>
      <div className="compact-results" role="status" aria-label="Current power, speed and gear">
        <strong>{Math.round(result.power)} W</strong>
        <span>{(result.v * factor).toFixed(1)} {unit}</span>
        <span>{rings[ring]} / {cogs[cog]} T</span>
      </div>
      <main key={resetVersion}>
        <div className="intro">
          <div>
            <h1>Cycling power calculator</h1>
          </div>
        </div>
        <div className="workspace">
          <div className="controls">
            <section className="card ride">
              <div className="card-title">
                <h2>Riding conditions</h2>
                <span>01</span>
              </div>
              {(
                [
                  {
                    key: "cadence",
                    name: "Cadence",
                    min: 40,
                    max: 140,
                    step: 1,
                    unit: "rpm",
                    left: "40 rpm",
                    right: "140 rpm",
                  },
                  {
                    key: "grade",
                    name: "Road gradient",
                    min: -15,
                    max: 25,
                    step: 0.1,
                    unit: "%",
                    left: "−15% descent",
                    right: "25% climb",
                  },
                ] as const
              ).map((c) => (
                <div key={c.key}>
                  <div className="slider-row">
                    <div>
                      <h3>{c.name}</h3>
                    </div>
                    <div className="number-unit">
                      <NumericInput
                        label={c.name}
                        value={s[c.key]}
                        min={c.min}
                        max={c.max}
                        onChange={(n) => update({ [c.key]: n })}
                      />
                      <span>{c.unit}</span>
                    </div>
                  </div>
                  <input
                    className="range"
                    aria-label={`${c.name} slider`}
                    type="range"
                    min={c.min}
                    max={c.max}
                    step={c.step}
                    value={s[c.key]}
                    onChange={(e) => update({ [c.key]: +e.target.value })}
                  />
                  <div className="range-labels">
                    <span>{c.left}</span>
                    <span>{c.right}</span>
                  </div>
                </div>
              ))}
            </section>
            <section className="card drivetrain">
              <div className="card-title">
                <h2>Your drivetrain</h2>
                <span>02</span>
              </div>
              <div className="follow-row">
                <label>
                  <input
                    type="checkbox"
                    checked={s.follow}
                    onChange={(e) =>
                      update({
                        follow: e.target.checked,
                        ...(e.target.checked
                          ? {
                              rear: s.front,
                              ro: defaultCassette(s.front),
                              cog: 0,
                            }
                          : {}),
                      })
                    }
                  />{" "}
                  Match rear to front
                </label>
              </div>
              <div className="pickers">
                {picker(true)}
                {picker(false)}
              </div>
              <p className="compatibility">
                Mix and match to compare ratios. Component compatibility is
                not guaranteed.
              </p>
            </section>
            <details className="card advanced">
              <summary>
                Advanced settings <span>Rider, tires & environment</span>
              </summary>
              <div className="advanced-grid">
                <NumberField
                  label={`Rider + bike mass (${s.imperial ? "lb" : "kg"})`}
                  value={s.mass * (s.imperial ? 2.204623 : 1)}
                  min={s.imperial ? 22.05 : 10}
                  max={s.imperial ? 661 : 300}
                  onChange={(n) =>
                    update({ mass: n / (s.imperial ? 2.204623 : 1) })
                  }
                />
                <label className="field">
                  Tire size (ETRTO)
                  <select
                    value={s.tire}
                    onChange={(e) => {
                      setPresetVersion((v) => v + 1);
                      const tire = e.target.value,
                        [bsd, w] = tire.split("-").map(Number);
                      update({
                        tire,
                        ...(tire === "custom"
                          ? {}
                          : { circumference: wheelCircumference(bsd, w) }),
                      });
                    }}
                  >
                    {[25, 28, 30, 32, 35, 40, 45].map((w) => (
                      <option key={w} value={`622-${w}`}>
                        700 × {w} · {w}-622
                      </option>
                    ))}
                    {[47, 50].map((w) => (
                      <option key={w} value={`584-${w}`}>
                        650b × {w} · {w}-584
                      </option>
                    ))}
                    <option value="custom">Custom circumference</option>
                  </select>
                </label>
                <NumberField
                  key={`circumference-${presetVersion}`}
                  label="Circumference (mm)"
                  value={s.circumference * 1000}
                  min={500}
                  max={4000}
                  onChange={(n) =>
                    update({ circumference: n / 1000, tire: "custom" })
                  }
                  onEdit={() => update({ tire: "custom" })}
                />
                <label className="field">
                  Position preset
                  <select
                    value={s.position}
                    onChange={(e) => {
                      setPresetVersion((v) => v + 1);
                      update({ position: e.target.value, ...(e.target.value !== "custom" ? { cda: +e.target.value } : {}) });
                    }}
                  >
                    <option value="0.4">Tops · 0.40</option>
                    <option value="0.32">Hoods · 0.32</option>
                    <option value="0.28">Drops · 0.28</option>
                    <option value="0.23">Aero / TT · 0.23</option>
                    <option value="custom">Custom CdA</option>
                  </select>
                </label>
                <NumberField
                  key={`cda-${presetVersion}`}
                  label="CdA (m²)"
                  value={s.cda}
                  max={2}
                  onChange={(n) => update({ cda: n, position: "custom" })}
                  onEdit={() => update({ position: "custom" })}
                />
                <NumberField
                  label="Rolling resistance · Crr"
                  value={s.crr}
                  max={0.1}
                  onChange={(n) => update({ crr: n })}
                />
                <NumberField
                  label="Drivetrain loss (%)"
                  value={s.loss * 100}
                  max={50}
                  onChange={(n) => update({ loss: n / 100 })}
                />
                <NumberField
                  label={`Wind (${unit}) · + head / − tail`}
                  value={s.wind * factor}
                  min={-100}
                  max={100}
                  onChange={(n) => update({ wind: n / factor })}
                />
                <NumberField
                  label={`Altitude (${s.imperial ? "ft" : "m"})`}
                  value={s.altitude * (s.imperial ? 3.28084 : 1)}
                  min={s.imperial ? -1640 : -500}
                  max={s.imperial ? 32808 : 10000}
                  onChange={(n) =>
                    update({ altitude: n / (s.imperial ? 3.28084 : 1) })
                  }
                />
              </div>
              <p className="note">
                Theoretical tire circumference: π × (BSD + 2 × width). Actual
                rollout varies with tire and pressure.
              </p>
            </details>
          </div>
          <aside>
            <section className="result-card">
              <div className="result-top">
                <span>RIDER POWER</span>
              </div>
              <div className="power">
                {Math.round(result.power)}
                <span>W</span>
              </div>
              <p className="power-label">
                {result.signedPower < 0
                  ? "Coasting — no pedaling required"
                  : "Required power at the pedals"}
              </p>
              <div className="result-primary">
                <div>
                  <strong>
                    {(result.power / s.mass).toFixed(2)}
                    <small>W/kg</small>
                  </strong>
                  <span>Total system mass</span>
                </div>
                <div>
                  <strong>
                    {(result.v * factor).toFixed(1)}
                    <small>{unit}</small>
                  </strong>
                  <span>Ground speed</span>
                </div>
              </div>
              <div className="result-details">
                {[
                  ["Selected gear", `${rings[ring]} / ${cogs[cog]} T`],
                  ["Gear ratio", `${result.ratio.toFixed(2)} : 1`],
                  ["Development", `${result.development.toFixed(2)} m/rev`],
                  ["Gear inches", `${result.gearInches.toFixed(1)}″`],
                ].map(([k, v]) => (
                  <div key={k}>
                    <span>{k}</span>
                    <b>{v}</b>
                  </div>
                ))}
              </div>
              {result.signedPower < 0 && <p className="force-note">Net wheel power: {result.wheelPower.toFixed(0)} W.</p>}
            </section>
            <section className="explain">
              <h3>Wheel power breakdown</h3>
              {[
                ["Air resistance", result.aero],
                ["Rolling resistance", result.rolling],
                ["Gravity", result.gravity],
              ].map(([name, f]) => (
                <div className="force" key={name}>
                  <span>{name}</span>
                  <b>{(Number(f) * result.v).toFixed(0)} W</b>
                </div>
              ))}
              <p>
                Wheel-level forces · standard atmosphere. W/kg uses rider + bike
                mass.
              </p>
            </section>
          </aside>
        <section className="card chart">
          <div className="card-title">
            <div>
              <h2>Gear chart</h2>
              <p>
                Power and speed at {s.cadence} rpm. Select a cell to explore.
              </p>
            </div>
            <div className="legend">
              Less effort <span /> More effort
            </div>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>FRONT / REAR</th>
                  {cogs.map((t) => (
                    <th key={t}>{t}T</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rings.map((f, fi) => (
                  <tr key={f}>
                    <th>{f}T</th>
                    {cogs.map((r, ri) => {
                      const c = calculate(s, f, r);
                      return (
                        <td key={r}>
                          <button
                            style={{
                              background: `hsl(${100 - Math.min(1, c.power / 700) * 75} 50% ${96 - Math.min(1, c.power / 700) * 12}%)`,
                            }}
                            className={
                              fi === ring && ri === cog ? "current" : ""
                            }
                            aria-pressed={fi === ring && ri === cog}
                            aria-label={`${f} by ${r}: ${Math.round(c.power)} watts, ${(c.v * factor).toFixed(1)} ${unit}`}
                            onClick={() => update({ ring: fi, cog: ri })}
                          >
                            <b>
                              {Math.round(c.power)}
                              <small> W</small>
                            </b>
                            <span>
                              {(c.v * factor).toFixed(1)} {unit}
                            </span>
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        </div>
        <footer>
          <span>Estimated steady-state power · not a power meter.</span>
        </footer>
      </main>
    </>
  );
}
