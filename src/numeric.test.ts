import { describe, expect, it } from "vitest";
import { formatNumericInput, parseNumericInput } from "./numeric";
import { wheelCircumference } from "./physics";

describe("numeric display precision", () => {
  it("rounds preset circumference to whole millimeters without changing its value", () => {
    const circumference = wheelCircumference(622, 28) * 1000;
    expect(formatNumericInput(circumference, 0)).toBe("2130");
    expect(circumference).not.toBe(2130);
  });
  it("removes unit-conversion noise while retaining useful precision", () => {
    expect(formatNumericInput(72.5 * 2.204623, 1)).toBe("159.8");
    expect(formatNumericInput((72.5 * 2.204623) / 2.204623, 1)).toBe("72.5");
    expect(formatNumericInput(0.2849999999, 3)).toBe("0.285");
    expect(formatNumericInput(0.0050999999, 4)).toBe("0.0051");
    expect(formatNumericInput(2.499999999, 1)).toBe("2.5");
    expect(formatNumericInput(123.99999999, 0)).toBe("124");
    expect(formatNumericInput(-0.0000001, 1)).toBe("0");
  });
});

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
