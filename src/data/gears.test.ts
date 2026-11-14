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
});
