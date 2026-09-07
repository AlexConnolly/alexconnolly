import { PLATES, PLATE_RATIO, type PlateId } from "../sections";

/** Every plate-coloured thing resolves its hue and ratio through this class. */
export const plateClass = (p: PlateId) => `p-${p}`;

/** The mark: the four-colour process bar. Decorative — the headings carry the names. */
export function Mark() {
  return (
    <ul className="mark" aria-hidden="true">
      {PLATES.map((p) => (
        <li key={p}>
          <span className={`bar ${plateClass(p)}`} />
        </li>
      ))}
    </ul>
  );
}

/** Exported so the mark and the heading blocks share one set of numbers. */
export { PLATE_RATIO };
