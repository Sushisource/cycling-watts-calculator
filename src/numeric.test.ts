import { describe, expect, it } from "vitest";
import { parseNumericInput } from "./numeric";

describe("numeric drafts", () => {
  it("accepts fractional values and inclusive bounds", () => {
    expect(parseNumericInput("0.285", 0, 2)).toBe(0.285);
    expect(parseNumericInput("72.5", 10, 300)).toBe(72.5);
    expect(parseNumericInput("-.5", -100, 100)).toBe(-0.5);
    expect(parseNumericInput("0", 0, 2)).toBe(0);
    expect(parseNumericInput("2", 0, 2)).toBe(2);
  });
  it("rejects empty, incomplete, malformed and out-of-range drafts", () => {
    for (const text of ["", " ", "-", ".", "0.2.5", "NaN", "Infinity", "1e2", "-1", "301"])
      expect(parseNumericInput(text, 0, 300)).toBeNull();
  });
});
