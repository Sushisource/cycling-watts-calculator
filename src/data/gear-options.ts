import { cassettes, series } from "./gears";
import type { Series } from "./gears";

export interface GearOption {
  teeth: number[];
  label: string;
  groupsets: string[];
}

export function gearOptions(
  manufacturer: string,
  discipline: string,
  front: boolean,
  catalog: Series[] = series,
): GearOption[] {
  const unique = new Map<string, GearOption>();
  for (const group of catalog.filter(
    (g) => g.manufacturer === manufacturer && g.discipline === discipline,
  )) {
    const name =
      group.manufacturer === "SRAM"
        ? group.name.split(" ")[0]
        : group.name.split(" · ")[0].replace(/ R\d+$/, "");
    for (const teeth of front
      ? group.fronts
      : group.rears.map((key) => cassettes[key])) {
      const ordered = [...teeth].sort((a, b) => (front ? b - a : a - b));
      const key = ordered.join(",");
      const option = unique.get(key) || {
        teeth: ordered,
        label: front
          ? ordered.length === 1
            ? `${ordered[0]}T`
            : ordered.join("/")
          : `${ordered[0]}–${ordered.at(-1)} · ${ordered.length}s`,
        groupsets: [],
      };
      if (!option.groupsets.includes(name)) option.groupsets.push(name);
      unique.set(key, option);
    }
  }
  return [...unique.values()];
}

export const gearCategories = [
  ...new Set(series.map((g) => `${g.manufacturer}/${g.discipline}`)),
];

export function defaultCassette(category: string): number {
  const [manufacturer, discipline] = category.split("/");
  const choices = gearOptions(manufacturer, discipline, false);
  const preferred = choices.findIndex(
    (o) => o.teeth.length === 12 && o.teeth[0] === 11 && o.teeth.at(-1) === 34,
  );
  return Math.max(0, preferred);
}
