/**
 * The single source of truth for the mark.
 *
 * Overview has no h2 — its heading is the name, and the whole mark sits above
 * it — so the four plates belong to the four sections that DO have a heading,
 * in mark order as you read down the page. See PLAN.md §3.
 */
export type PlateId = "c" | "m" | "y" | "k";

export interface Section {
  id: string;
  label: string;
  /** undefined = Overview, which carries the whole mark instead */
  plate?: PlateId;
}

export const PLATES: PlateId[] = ["c", "m", "y", "k"];

export const SECTIONS: Section[] = [
  { id: "overview", label: "Overview" },
  { id: "work", label: "Work", plate: "c" },
  { id: "stack", label: "Stack", plate: "m" },
  { id: "play", label: "Play", plate: "y" },
  { id: "contact", label: "Contact", plate: "k" },
];
