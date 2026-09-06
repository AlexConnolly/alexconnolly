# homesite

Alex Connolly's homepage. Built to the Barbican Identity Guidelines (North, 2007) —
one typeface, ranged left, sentence case, leading tighter than default — with a
four-colour process bar as the mark.

The full design rationale, sourced and quoted, is in [PLAN.md](PLAN.md).

## Running it

```bash
npm install
npm run dev        # local
npm test           # 25 tests, mostly design invariants
npm run typecheck
npm run build      # vite build + SSR prerender into dist/
```

## Where things live

| Path | What |
| --- | --- |
| `src/content.ts` | **Every word on the page.** Adding a role or project is an edit here and nowhere else. |
| `src/sections.ts` | The plate table — the mark's single source of truth |
| `src/styles.css` | Design tokens and all component styles |
| `assets/og.html` | Social card, 1200×630. Screenshot it to `public/og.png` |
| `assets/favicon.svg` | The mark at 16px |

## Deploying

Pushing to `main` runs typecheck, tests and build, then publishes to GitHub Pages.
The base path is resolved in CI: `/` if `public/CNAME` exists, otherwise `/<repo>/`.

## Still to do

Every word of copy is placeholder — see PLAN.md §12. Real project screenshots
replace the generated plate compositions by setting `image` on a project.
