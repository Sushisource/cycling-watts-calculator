import { useId, useState } from "react";
import { formatNumericInput, parseNumericInput } from "./numeric";

export default function NumericInput({ label, value, onChange, onEdit, min = 0, max = 1000, precision = 1 }: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  onEdit?: () => void;
  min?: number;
  max?: number;
  precision?: number;
}) {
  const [previous, setPrevious] = useState(value);
  const [draft, setDraft] = useState(formatNumericInput(value, precision));
  const [dirty, setDirty] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const errorId = useId();
  if (previous !== value) {
    setPrevious(value);
    setDraft(formatNumericInput(value, precision));
    setDirty(false);
    setInvalid(false);
  }
  return <>
    <input
      type="text"
      inputMode="decimal"
      aria-label={label}
      aria-invalid={invalid}
      aria-describedby={invalid ? errorId : undefined}
      value={draft}
      onChange={(e) => {
        setDraft(e.target.value);
        setDirty(true);
        setInvalid(false);
        onEdit?.();
      }}
      onBlur={() => {
        if (!dirty) return;
        const next = parseNumericInput(draft, min, max);
        setInvalid(next === null);
        if (next !== null) {
          setDraft(formatNumericInput(next, precision));
          setDirty(false);
          onChange(next);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.currentTarget.blur();
      }}
    />
    {invalid && <small id={errorId} className="error">Enter a number from {min} to {max}. Calculations use the last valid value.</small>}
  </>;
}
