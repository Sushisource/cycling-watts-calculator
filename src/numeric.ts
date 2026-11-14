export function formatNumericInput(value: number, precision: number): string {
  return String(Number(value.toFixed(precision)));
}

export function parseNumericInput(text: string, min: number, max: number): number | null {
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(text.trim())) return null;
  const value = Number(text);
  return Number.isFinite(value) && value >= min && value <= max ? value : null;
}
