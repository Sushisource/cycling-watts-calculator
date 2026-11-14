import { describe, expect, it } from "vitest";
import { advancedDefaults, combinedMass, readMasses, restoreAdvanced, wattsPerKg } from "./settings";
import { calculate } from "./physics";

describe("mass settings", () => {
  it("uses rider plus bike and kit for physics, but only rider mass for W/kg", () => {
    expect(combinedMass(advancedDefaults)).toBe(80);
    expect(wattsPerKg(216, advancedDefaults.riderMass)).toBe(3);
    const conditions = { ...advancedDefaults, cadence: 90, grade: 5, mass: combinedMass(advancedDefaults) };
    const heavier = { ...advancedDefaults, bikeMass: 18 };
    expect(calculate({ ...conditions, mass: combinedMass(heavier) }, 50, 34).gravity)
      .toBeGreaterThan(calculate(conditions, 50, 34).gravity);
    expect(wattsPerKg(216, heavier.riderMass)).toBe(3);
  });
  it("loads valid split masses and resets legacy combined or invalid masses", () => {
    expect(readMasses({ riderMass: 72.5, bikeMass: 9 })).toEqual({ riderMass: 72.5, bikeMass: 9 });
    for (const saved of [{}, { mass: 90 }, { riderMass: 0, bikeMass: 8 }, { riderMass: 72, bikeMass: NaN }])
      expect(readMasses(saved)).toEqual({ riderMass: 72, bikeMass: 8 });
  });
});

describe("advanced-only reset", () => {
  it("restores every advanced value while preserving conditions, units and gearing", () => {
    const unrelated = { cadence: 104, grade: 7, imperial: true, front: "SRAM/Gravel", rear: "custom", fo: 2, ro: 3, ring: 0, cog: 4, follow: false };
    const state = { ...advancedDefaults, ...unrelated, riderMass: 85, bikeMass: 12, circumference: 2.2, cda: 0.285, crr: 0.006, loss: 0.03, wind: 4, altitude: 1000, tire: "custom", position: "custom" };
    expect(restoreAdvanced(state)).toEqual({ ...advancedDefaults, ...unrelated });
    expect(state.riderMass).toBe(85);
  });
  it("is safe when all advanced settings are already defaults", () => {
    expect(restoreAdvanced(advancedDefaults)).toEqual(advancedDefaults);
  });
});
