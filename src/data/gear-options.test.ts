import { describe, expect, it } from "vitest";
import { defaultCassette, gearCategories, gearOptions } from "./gear-options";
import { series } from "./gears";

describe("unique gearing choices", () => {
  it("has no duplicate tooth sets within any manufacturer and discipline", () => {
    for (const category of gearCategories) {
      const [manufacturer, discipline] = category.split("/");
      for (const front of [true, false]) {
        const options = gearOptions(manufacturer, discipline, front);
        expect(options.length).toBeGreaterThan(0);
        expect(new Set(options.map((o) => o.teeth.join(","))).size).toBe(
          options.length,
        );
        expect(options.every((o) => o.groupsets.length > 0)).toBe(true);
      }
    }
  });
  it("merges identical rings and aggregates compact groupset labels", () => {
    const options = gearOptions("SRAM", "Road", true);
    const matches = options.filter((o) => o.teeth.join(",") === "48,35");
    expect(matches).toHaveLength(1);
    expect(matches[0].groupsets).toEqual(["Red", "Force", "Rival"]);
  });
  it("retains different full sequences sharing range labels", () => {
    const options = gearOptions("Shimano", "Road", false);
    const matches = options.filter(
      (o) => o.teeth[0] === 11 && o.teeth.at(-1) === 34,
    );
    expect(matches.map((o) => o.label)).toEqual(["11–34 · 12s", "11–34 · 11s"]);
    expect(matches[0].teeth).not.toEqual(matches[1].teeth);
  });
  it("deduplicates normalized tooth sets rather than catalog IDs", () => {
    const group = series[0];
    const options = gearOptions("Shimano", "Road", true, [
      { ...group, fronts: [[50, 34]] },
      { ...group, id: "alternate", fronts: [[34, 50]] },
    ]);
    expect(options).toHaveLength(1);
    expect(options[0].teeth).toEqual([50, 34]);
  });
  it("handles empty or unknown categories without inventing choices", () => {
    expect(gearOptions("Shimano", "Road", true, [])).toEqual([]);
    expect(gearOptions("Unknown", "Road", false)).toEqual([]);
    expect(defaultCassette("custom")).toBe(0);
  });
  it("picks the sensible 12-speed 11–34 default when present", () => {
    const options = gearOptions("Shimano", "Road", false);
    expect(options[defaultCassette("Shimano/Road")].label).toBe("11–34 · 12s");
  });
});
