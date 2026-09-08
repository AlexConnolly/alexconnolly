import { PLATES, type PlateId } from "../sections";

/**
 * The four forms, one per plate:
 *
 *   c  circle
 *   m  square
 *   y  half-circle
 *   k  diamond
 *
 * They appear twice — all four together as the mark at the top of the page,
 * and one at a time beside the heading of the section that owns that plate.
 * Both come from the geometry below, so the two can never drift apart.
 *
 * Sizes are optical, not arithmetic. Equal areas leave the diamond reading
 * much larger than the square and the half-circle reading much smaller, so
 * each form is tuned by eye to carry the same weight.
 *
 * Fills come from classes, never inline `fill` attributes.
 */
const BAND = 100;

/**
 * `tuck` is how far a form's silhouette pulls back from its own box. A square
 * fills its box, so it tucks nothing; a diamond touches each side at a single
 * point, so a gap beside it reads far wider than it measures. Subtracting both
 * neighbours' tuck from one lead value makes the gaps look even when they are
 * not, which is the only kind of even that matters here.
 */
const LEAD = 24;

/**
 * Text needs its own tuck. Against another form, a receding silhouette wants
 * the measured gap pulled in; against a word it mostly does not, because a
 * letter is full height and circle, square and diamond all reach their widest
 * somewhere a letter occupies. Only the half-circle — widest at the baseline
 * and gone by mid-cap — still needs pulling in. The diamond needs none at all:
 * its point sticks out exactly where the first letter is.
 */
interface Form {
  w: number;
  tuck: number;
  textTuck: number;
  at: (x: number) => JSX.Element;
}

const FORMS: Record<PlateId, Form> = {
  c: { w: 78, tuck: 4, textTuck: 0, at: (x) => <circle cx={x + 39} cy={61} r={39} /> },
  m: { w: 70, tuck: 0, textTuck: 0, at: (x) => <rect x={x} y={30} width={70} height={70} /> },
  y: {
    w: 104,
    tuck: 7,
    textTuck: 6,
    at: (x) => <path d={`M ${x} 100 A 52 52 0 0 1 ${x + 104} 100 Z`} />,
  },
  k: {
    w: 86,
    tuck: 10,
    textTuck: 0,
    at: (x) => <polygon points={`${x + 43},14 ${x + 86},57 ${x + 43},100 ${x},57`} />,
  },
};

/** The mark: all four forms in a row, sat on a common baseline. */
export function Mark() {
  let x = 0;
  const forms = PLATES.map((p, i) => {
    const form = FORMS[p];
    if (i > 0) x += LEAD - FORMS[PLATES[i - 1]].tuck - form.tuck;
    const here = x;
    x += form.w;
    return (
      <g key={p} className={`f-${p}`}>
        {form.at(here)}
      </g>
    );
  });

  return (
    <svg className="mark" viewBox={`0 0 ${x} ${BAND}`} aria-hidden="true" focusable="false">
      {forms}
    </svg>
  );
}

/**
 * One plate's form, for the heading of the section that owns it. The lead that
 * would follow it in the mark is baked into the viewBox, so the heading needs
 * no gap of its own and the space after a diamond still looks like the space
 * after a square.
 */
export function PlateForm({ plate }: { plate: PlateId }) {
  const { w, textTuck, at } = FORMS[plate];
  return (
    <svg
      className={`plate-form f-${plate}`}
      viewBox={`0 0 ${w + LEAD - textTuck} ${BAND}`}
      aria-hidden="true"
      focusable="false"
    >
      {at(0)}
    </svg>
  );
}
