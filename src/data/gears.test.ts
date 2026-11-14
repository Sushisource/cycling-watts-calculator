import { describe, expect, it } from "vitest";
import { cassettes, series } from "./gears";
describe("gearing catalog integrity", () => {
  it("has complete, ascending, unique sequences with advertised speed and endpoints", () => {
    for (const [label, cogs] of Object.entries(cassettes)) {
      const [, count, min, max] = label.match(/(\d+) (\d+)-(\d+)/)!;
      expect(cogs).toHaveLength(+count);
      expect(cogs[0]).toBe(+min);
      expect(cogs.at(-1)).toBe(+max);
      expect(cogs.every((t, i) => i === 0 || t > cogs[i - 1])).toBe(true);
    }
  });
  it("every series has valid front options and known cassette options", () => {
    expect(new Set(series.map((s) => s.id)).size).toBe(series.length);
    for (const s of series) {
      expect(s.fronts.length).toBeGreaterThan(0);
      expect(s.rears.length).toBeGreaterThan(0);
      for (const rings of s.fronts) {
        expect([1, 2]).toContain(rings.length);
        expect(rings.every((t) => t > 0)).toBe(true);
      }
      for (const rear of s.rears) expect(cassettes[rear]).toBeDefined();
    }
  });
  it("Shimano 12-speed 11–34 has twelve cogs, not the erroneous thirteen-cog example", () => {
    expect(cassettes["SH12 11-34"]).toEqual([
      11, 12, 13, 14, 15, 17, 19, 21, 24, 27, 30, 34,
    ]);
  });
  it("includes RED OEM large doubles without inventing Force E1 sizes", () => {
    for (const id of ["red", "red-d1"])
      expect(series.find((s) => s.id === id)!.fronts).toEqual(
        expect.arrayContaining([[46, 33], [48, 35], [50, 37], [52, 39], [54, 41], [56, 43]]),
      );
    expect(series.find((s) => s.id === "force")!.fronts).toEqual([[50, 37], [48, 35], [46, 33]]);
  });
  it("retains audited historical cassette sequences and crankset generations", () => {
    expect(cassettes["AXS12 10-26"]).toEqual([10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 23, 26]);
    expect(cassettes["SH11 14-28"]).toEqual([14, 15, 16, 17, 18, 19, 20, 21, 23, 25, 28]);
    expect(series.find((s) => s.id === "ultegra-11")!.fronts).toContainEqual([53, 39]);
    expect(series.find((s) => s.id === "rival-xplr13")!.fronts).toContainEqual([42]);
    expect(series.find((s) => s.id === "red1")!.fronts).toContainEqual([68]);
  });
});
