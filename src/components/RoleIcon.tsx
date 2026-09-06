/**
 * One small mark per role. Loose concepts, not pictures — the same rectangles
 * as everything else, arranged to suggest what the work was about.
 *
 *   platform      things resting on a base
 *   orders        a stack of equal units
 *   analytics     unequal heights — measuring one thing against another
 *   carriers      many, gathered into one
 *   architecture  one, spread across many
 *
 * Carriers and architecture are mirrors on purpose: one job pulled twenty
 * integrations into a single layer, the next pushes one change out to many.
 *
 * Fills come from classes, never inline `fill` attributes — React strips
 * inline SVG styles during hydration.
 */
export type IconKind = "platform" | "orders" | "analytics" | "carriers" | "architecture";

const SHAPES: Record<IconKind, JSX.Element> = {
  platform: (
    <>
      <rect className="f-c" x="6" y="13" width="9" height="8" />
      <rect className="f-m" x="18" y="8" width="9" height="13" />
      <rect className="f-k" x="3" y="23" width="26" height="5" />
    </>
  ),
  orders: (
    <>
      <rect className="f-c" x="10" y="4" width="13" height="7" />
      <rect className="f-m" x="10" y="13" width="13" height="7" />
      <rect className="f-y" x="10" y="22" width="13" height="7" />
    </>
  ),
  analytics: (
    <>
      <rect className="f-c" x="4" y="18" width="6" height="10" />
      <rect className="f-m" x="13" y="10" width="6" height="18" />
      <rect className="f-y" x="22" y="4" width="6" height="24" />
    </>
  ),
  carriers: (
    <>
      <rect className="f-c" x="2" y="6" width="10" height="5" />
      <rect className="f-m" x="2" y="13" width="10" height="5" />
      <rect className="f-y" x="2" y="20" width="10" height="5" />
      <rect className="f-k" x="20" y="6" width="9" height="19" />
    </>
  ),
  architecture: (
    <>
      <rect className="f-k" x="3" y="6" width="9" height="19" />
      <rect className="f-c" x="20" y="6" width="10" height="5" />
      <rect className="f-m" x="20" y="13" width="10" height="5" />
      <rect className="f-y" x="20" y="20" width="10" height="5" />
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
