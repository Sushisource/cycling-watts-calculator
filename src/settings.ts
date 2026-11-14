import { wheelCircumference } from "./physics";

export const advancedDefaults = {
  riderMass: 72,
  bikeMass: 8,
  circumference: wheelCircumference(622, 28),
  cda: 0.32,
  crr: 0.005,
  loss: 0.025,
  wind: 0,
  altitude: 0,
  tire: "622-28",
  position: "0.32",
};

export function restoreAdvanced<T extends typeof advancedDefaults>(state: T): T {
  return { ...state, ...advancedDefaults };
}

export function readMasses(saved: Record<string, unknown>) {
  const { riderMass, bikeMass } = saved;
  if (
    typeof riderMass === "number" && Number.isFinite(riderMass) &&
    riderMass >= 10 && riderMass <= 250 &&
    typeof bikeMass === "number" && Number.isFinite(bikeMass) &&
    bikeMass >= 0 && bikeMass <= 100
  ) return { riderMass, bikeMass };
  return { riderMass: advancedDefaults.riderMass, bikeMass: advancedDefaults.bikeMass };
}

export function combinedMass(settings: { riderMass: number; bikeMass: number }) {
  return settings.riderMass + settings.bikeMass;
}

export function wattsPerKg(power: number, riderMass: number) {
  return power / riderMass;
}
