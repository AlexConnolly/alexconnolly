import { PLATES, PLATE_RATIO, type PlateId } from "../sections";

/** Every plate-coloured thing resolves its hue and ratio through this class. */
export const plateClass = (p: PlateId) => `p-${p}`;

/** The mark: the four-colour process bar. Decorative — the nav carries the names. */
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

/** One plate, small, wherever a section is named. */
export function Swatch({ plate, mono = false }: { plate: PlateId; mono?: boolean }) {
  return (
    <span
      className={`swatch ${mono ? "swatch--mono " : ""}${plateClass(plate)}`}
      aria-hidden="true"
    />
  );
}

/** Ratios are exported for tests: the mark and every swatch share these numbers. */
export { PLATE_RATIO };
