/**
 * One small mark per role, drawn from the same rectangles as everything else.
 * Each says what that team actually did.
 *
 *   platform      things built on top of a base — the app store and ecosystem
 *   orders        a stack of stock being drawn down
 *   analytics     bars on an axis
 *   carriers      many separate carriers feeding one lane
 *   architecture  one change going out to many products
 *
 * Carriers and architecture are deliberate mirrors: one job pulled twenty
 * integrations into a single layer, the next pushes one change out to many.
 */
export type IconKind = "platform" | "orders" | "analytics" | "carriers" | "architecture";

const SHAPES: Record<IconKind, JSX.Element> = {
  platform: (
    <>
      <rect className="f-c" x="6" y="12" width="9" height="9" />
      <rect className="f-m" x="18" y="7" width="9" height="14" />
      <rect className="f-k" x="3" y="23" width="26" height="5" />
    </>
  ),
  orders: (
    <>
      <rect className="f-c" x="6" y="7" width="14" height="6" />
      <rect className="f-m" x="6" y="15" width="20" height="6" />
      <rect className="f-k" x="6" y="23" width="20" height="6" />
    </>
  ),
  analytics: (
    <>
      <rect className="f-c" x="4" y="17" width="6" height="8" />
      <rect className="f-m" x="13" y="11" width="6" height="14" />
      <rect className="f-y" x="22" y="5" width="6" height="20" />
      <rect className="f-k" x="3" y="27" width="26" height="3" />
    </>
  ),
  carriers: (
    <>
      <rect className="f-c" x="3" y="5" width="9" height="6" />
      <rect className="f-m" x="3" y="13" width="9" height="6" />
      <rect className="f-y" x="3" y="21" width="9" height="6" />
      <rect className="f-k" x="19" y="5" width="10" height="22" />
    </>
  ),
  architecture: (
    <>
      <rect className="f-k" x="3" y="5" width="10" height="22" />
      <rect className="f-c" x="20" y="5" width="9" height="6" />
      <rect className="f-m" x="20" y="13" width="9" height="6" />
      <rect className="f-y" x="20" y="21" width="9" height="6" />
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
