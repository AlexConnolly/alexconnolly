/**
 * The single source of truth for the mark.
 *
 * Four plates, four sections. See PLAN.md §3.
 *
 * `ratio` is a property of the plate, not of the bar — the same number drives
 * the mark, the swatch beside a heading and the miniature. They cannot disagree.
 * Heights are declared constants: the page must be pixel-identical every load.
 */
export type PlateId = "c" | "m" | "y" | "k";

export interface Section {
  id: string;
  label: string;
  plate: PlateId;
}

export const PLATE_RATIO: Record<PlateId, number> = {
  c: 0.62,
  m: 1,
  y: 0.44,
  k: 0.8,
};

export const PLATES: PlateId[] = ["c", "m", "y", "k"];

export const SECTIONS: Section[] = [
  { id: "overview", label: "Overview", plate: "c" },
  { id: "work", label: "Work", plate: "m" },
  { id: "stack", label: "Stack", plate: "y" },
  { id: "contact", label: "Contact", plate: "k" },
];
