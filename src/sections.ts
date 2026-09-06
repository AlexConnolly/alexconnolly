/**
 * The single source of truth for the mark.
 *
 * Overview has no h2 — its heading is the name, and the whole bar sits above
 * it — so the four plates belong to the four sections that DO have a heading,
 * in bar order as you read down the page. See PLAN.md §3.
 *
 * `ratio` is a property of the plate, not of the bar — the same number drives
 * the mark, the swatch beside a heading and the miniature. They cannot disagree.
 * Heights are declared constants: the page must be pixel-identical every load.
 */
export type PlateId = "c" | "m" | "y" | "k";

export interface Section {
  id: string;
  label: string;
  /** undefined = Overview, which is marked by the whole bar */
  plate?: PlateId;
}

export const PLATE_RATIO: Record<PlateId, number> = {
  c: 0.62,
  m: 1,
  y: 0.44,
  k: 0.8,
};

export const PLATES: PlateId[] = ["c", "m", "y", "k"];

export const SECTIONS: Section[] = [
  { id: "overview", label: "Overview" },
  { id: "work", label: "Work", plate: "c" },
  { id: "stack", label: "Stack", plate: "m" },
  { id: "play", label: "Play", plate: "y" },
  { id: "contact", label: "Contact", plate: "k" },
];
