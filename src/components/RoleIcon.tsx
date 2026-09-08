/**
 * One small mark per role. Loose concepts, not pictures — built from the same
 * four forms as the mark, arranged to suggest what the work was about.
 *
 *   platform      things resting on a base
 *   orders        a stack of equal units
 *   analytics     unequal sizes — measuring one thing against another
 *   carriers      many, gathered into one
 *   architecture  one, spread across many
 *
 * Carriers and architecture are mirrors on purpose: one job pulled twenty
 * integrations into a single layer, the next pushes one change out to many.
 *
 * The circle is the unit here and the diamond is the singular thing, which is
 * what makes the last two read as opposites at 30px.
 *
 * Fills come from classes, never inline `fill` attributes — React strips
 * inline SVG styles during hydration.
 */
export type IconKind = "platform" | "orders" | "analytics" | "carriers" | "architecture";

/** cx of the column of units in the two mirrored icons, and their radius */
const UNIT = 2.8;
const ROWS = [7, 16, 25];

const units = (cx: number) => (
  <>
    <circle className="f-c" cx={cx} cy={ROWS[0]} r={UNIT} />
    <circle className="f-m" cx={cx} cy={ROWS[1]} r={UNIT} />
    <circle className="f-y" cx={cx} cy={ROWS[2]} r={UNIT} />
  </>
);

const SHAPES: Record<IconKind, JSX.Element> = {
  platform: (
    <>
      <path className="f-c" d="M 4 25 A 7 7 0 0 1 18 25 Z" />
      <rect className="f-m" x="19" y="14" width="11" height="11" />
      <rect className="f-k" x="1" y="25" width="30" height="4" />
    </>
  ),
  orders: (
    <>
      <circle className="f-c" cx="16" cy="6" r="4.3" />
      <circle className="f-m" cx="16" cy="16" r="4.3" />
      <circle className="f-y" cx="16" cy="26" r="4.3" />
    </>
  ),
  analytics: (
    <>
      <circle className="f-c" cx="4.5" cy="24.4" r="2.6" />
      <circle className="f-m" cx="13.8" cy="23" r="4" />
      <circle className="f-y" cx="25" cy="21.2" r="5.8" />
    </>
  ),
  carriers: (
    <>
      {units(6)}
      <polygon className="f-k" points="23,8 31,16 23,24 15,16" />
    </>
  ),
  architecture: (
    <>
      <polygon className="f-k" points="9,8 17,16 9,24 1,16" />
      {units(26)}
    </>
  ),
};

export function RoleIcon({ kind }: { kind: IconKind }) {
  return (
    <svg className="role-icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      {SHAPES[kind]}
    </svg>
  );
}
