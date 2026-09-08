/**
 * The single source of truth for the mark.
 *
 * Overview has no h2 — its heading is the name, and the whole mark sits above
 * it — so the plates belong to the sections that DO have a heading, in mark
 * order as you read down the page. See PLAN.md §3.
 *
 * There are four plates and three such sections. The fourth, the key plate,
 * belongs to the lock-up at the foot of the rail: that is the contact, and it
 * is why there is no Contact section to give the plate to.
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
];
