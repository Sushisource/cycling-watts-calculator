import { describe, expect, it } from "vitest";
import {
  airDensity,
  calculate,
  parseTeeth,
  speed,
  wheelCircumference,
} from "./physics";
const p = {
  cadence: 60,
  grade: 0,
  mass: 80,
  circumference: 2,
  cda: 0.32,
  crr: 0.005,
  loss: 0.025,
  wind: 0,
  altitude: 0,
};
describe("steady-state cycling physics", () => {
  it("flat: 10 m/s, 3.92266 N rolling and 19.6 N drag", () => {
    const r = calculate(p, 50, 10);
    expect(r.v).toBe(10);
    expect(r.power).toBeCloseTo(241.25805, 4);
    expect(r.development).toBe(10);
  });
  it("10% climb at 5 m/s is gravity dominated", () => {
    const r = calculate({ ...p, grade: 10 }, 50, 20);
    expect(r.gravity).toBeCloseTo(78.06385, 4);
    expect(r.power).toBeCloseTo(445.47202, 3);
    expect(r.gravity).toBeGreaterThan(r.aero * 10);
  });
  it("headwind adds drag and strong tailwind reverses drag", () => {
    expect(calculate({ ...p, wind: 5 }, 50, 10).power).toBeCloseTo(492.5401, 3);
    expect(calculate({ ...p, wind: -15 }, 50, 10).aero).toBeCloseTo(-4.9);
  });
  it("barometric density falls with altitude", () => {
    expect(airDensity(0)).toBe(1.225);
    expect(airDensity(2000)).toBeCloseTo(1.0065, 3);
  });
  it("zero cadence and descending coasting retain signed information", () => {
    expect(calculate({ ...p, cadence: 0 }, 50, 10).power).toBe(0);
    const r = calculate({ ...p, grade: -10 }, 50, 10);
    expect(r.power).toBe(0);
    expect(r.signedPower).toBeLessThan(0);
  });
  it("ETRTO circumference and gearing", () => {
    expect(wheelCircumference(622, 28)).toBeCloseTo(2.13, 2);
    expect(speed(90, 50, 25, 2)).toBe(6);
  });
  it("rejects invalid physical inputs", () => {
    expect(() => calculate({ ...p, loss: 1 }, 50, 10)).toThrow(RangeError);
    expect(() => speed(90, 50, 0, 2)).toThrow(RangeError);
    expect(() => airDensity(NaN)).toThrow(RangeError);
  });
  it("accepts a conditions object that also carries application state", () => {
    const state = { ...p, imperial: false, selectedSeries: "105" };
    expect(calculate(state, 50, 10).power).toBeCloseTo(241.25805, 4);
  });
  it("parses custom single and double gearing, rejects empty/error cases", () => {
    expect(parseTeeth("36, 50", true)).toEqual([50, 36]);
    expect(parseTeeth("17")).toEqual([17]);
    for (const s of ["", "0", "11,11", "12,x", "12,"])
      expect(parseTeeth(s)).toBeNull();
    expect(parseTeeth("50,40,30", true)).toBeNull();
  });
});
