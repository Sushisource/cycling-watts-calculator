export const G = 9.80665;
export function airDensity(altitude: number): number {
  if (!Number.isFinite(altitude) || altitude < -500 || altitude > 10000)
    throw new RangeError("Altitude must be -500 to 10000 m");
  return (
    1.225 * (1 - (0.0065 * altitude) / 288.15) ** (G / (287.05 * 0.0065) - 1)
  );
}
export function wheelCircumference(bsd: number, width: number): number {
  return (Math.PI * (bsd + 2 * width)) / 1000;
}
export function speed(
  cadence: number,
  front: number,
  rear: number,
  circumference: number,
): number {
  if (
    ![cadence, front, rear, circumference].every(Number.isFinite) ||
    cadence < 0 ||
    Math.min(front, rear, circumference) <= 0
  )
    throw new RangeError("Invalid gearing or cadence");
  return (((cadence / 60) * front) / rear) * circumference;
}
export interface Conditions {
  cadence: number;
  grade: number;
  mass: number;
  circumference: number;
  cda: number;
  crr: number;
  loss: number;
  wind: number;
  altitude: number;
}
export function calculate(p: Conditions, front: number, rear: number) {
  if (
    ![
      p.cadence,
      p.grade,
      p.mass,
      p.circumference,
      p.cda,
      p.crr,
      p.loss,
      p.wind,
      p.altitude,
    ].every(Number.isFinite) ||
    p.mass <= 0 ||
    p.cda < 0 ||
    p.crr < 0 ||
    p.loss < 0 ||
    p.loss >= 1
  )
    throw new RangeError("Invalid riding conditions");
  const v = speed(p.cadence, front, rear, p.circumference);
  const theta = Math.atan(p.grade / 100);
  const gravity = p.mass * G * Math.sin(theta);
  const rolling = p.crr * p.mass * G * Math.cos(theta);
  const aero =
    0.5 * airDensity(p.altitude) * p.cda * (v + p.wind) * Math.abs(v + p.wind);
  const wheelPower = (gravity + rolling + aero) * v;
  const signedPower = wheelPower / (1 - p.loss);
  return {
    v,
    gravity,
    rolling,
    aero,
    wheelPower,
    signedPower,
    power: Math.max(0, signedPower),
    ratio: front / rear,
    development: (front / rear) * p.circumference,
    gearInches: ((front / rear) * p.circumference) / Math.PI / 0.0254,
  };
}
export function parseTeeth(value: string, front = false): number[] | null {
  if (!/^\s*\d+(\s*,\s*\d+)*\s*$/.test(value)) return null;
  const values = value.split(",").map(Number);
  if (
    values.length > (front ? 2 : 14) ||
    values.some((t) => t < 1 || t > 100) ||
    new Set(values).size !== values.length
  )
    return null;
  return values.sort((a, b) => (front ? b - a : a - b));
}
