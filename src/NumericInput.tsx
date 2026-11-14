import { useId, useState } from "react";
import { parseNumericInput } from "./numeric";

export default function NumericInput({ label, value, onChange, onEdit, min = 0, max = 1000 }: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  onEdit?: () => void;
  min?: number;
  max?: number;
}) {
  const [previous, setPrevious] = useState(value);
  const [draft, setDraft] = useState(String(+value.toFixed(6)));
  const [invalid, setInvalid] = useState(false);
  const errorId = useId();
  if (previous !== value) {
    setPrevious(value);
    setDraft(String(+value.toFixed(6)));
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
        setInvalid(false);
        onEdit?.();
      }}
      onBlur={() => {
        const next = parseNumericInput(draft, min, max);
        setInvalid(next === null);
        if (next !== null) onChange(next);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.currentTarget.blur();
      }}
    />
    {invalid && <small id={errorId} className="error">Enter a number from {min} to {max}. Calculations use the last valid value.</small>}
  </>;
}
