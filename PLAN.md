# homesite — Alex Connolly

A personal homepage. Ultra-simplistic, drawn from the Barbican's design system.

Status: **plan agreed, not yet built.** Every word of copy in the prototype is placeholder.

---

## 1. Premise

The Barbican's identity is not concrete, and it is not the yellow line. It is **one
typeface, ranged left, set tighter than is comfortable, with a hierarchy violent enough to
be read in the right order without effort.** North's 2007 manual is unusually prescriptive,
and its rules are the design here.

On top of that sits four-colour process. A printer's colour bar — cyan, magenta, yellow,
key, butted together at fixed and unequal heights. Each plate belongs to a section and
reappears as a small swatch beside that section's heading, so the form itself tells you
where you are. Contact, the fifth section, is marked by the whole bar in miniature.
Nothing explains it, and nothing should.

Five sections: **Overview, Work, Stack, Play, Contact.** Work is a left-to-right timeline
because a career runs that way. Stack shows where in a system the engineering actually
happens, because a list of technologies communicates nothing. Play is the side projects,
pulled from the public repos.

Navigation runs horizontally across the top, read the right way up, carrying the motif's
proportions but not its colour.

> "Our identity is not just a logo. It is a design scheme composed of a number of core
> elements that come together to create a distinctive look and feel."
> — Barbican Identity Guidelines, North, 2007

---

## 2. Who it is built for

**Primary — someone who has just heard your name.** A hiring manager, a conference
acquaintance, a person on the other end of an introduction. They arrive with no context,
give it forty seconds, and leave with an impression of you and a way to reach you.

**Secondary — you.** The page is a statement of taste. Its quality is itself the argument,
which means it must survive your own eye months from now.

**Explicitly not built for:** recruiters filtering on keywords, readers of a blog, or
clients being sold to. No CV download, no case studies, no calls to action. Those were
considered and rejected.

### Consequences of that audience

| Because the reader is | The page must |
| --- | --- |
| Unfamiliar with you | Say who you are in the first screen, without scrolling |
| In a hurry | Be short enough to finish |
| Judging craft | Have no loose ends — every detail is evidence |
| Likely on a phone | Work as well at 390px as at 1600px |

---

## 3. Design direction

Rev A and Rev B were designed from assumption and read as template. Rev C onwards is built
from the **Barbican Identity Guidelines (North, 2007)** — the actual manual, extracted from
the published PDF. Sources are in §16. Every quoted rule below comes from that document.

Revs D and E then added four-colour process on top of it, which is the current design.

### What the guidelines actually say

| Rule | Source wording |
| --- | --- |
| One typeface | "The Barbican typeface is Futura. It is at the heart of the Barbican identity and is the foundation for all Barbican branding." Scangraphic cut. |
| Bold is the default | "Futura Bold is the most used weight for Barbican marketing materials across all art forms." |
| Never all caps | "use sentence case and never set sentences solely in capitals." |
| Always ranged left | "Barbican typography is always ranged left. This provides the eye with a constant starting point for each line." |
| Tight leading | "The Barbican leading is usually set tighter than default." The Art Gallery rule is explicit: "line spacing is set at 75% of the character size." |
| Violent hierarchy | Title **108pt** / supporting title **30pt** / body **12pt** / caption **8pt**. "The differences between them must be clearly recognisable." |
| One emphasis method | "Avoid using too many methods together as this will simply confuse the layout and make the message less effective." |
| Colour is flexible | "The logo colour is flexible, but clarity is always maintained by the use of contrasting colours." No fixed brand hue; a "vivid colour palette that creates strong contrasts". |
| Six columns | "The column grid is the underlying grid divided into six columns." |
| Signatures run down | The music signature "is always set in Futura Bold and is positioned vertically and reading downwards". |
| Emphasis devices | "colour, contrast, composition, weight and underlining" — the five permitted methods. |

### The mark: a four-colour process bar

Four rectangles, butted edge to edge, equal width, **fixed and different heights** — a
printer's colour control strip.

| Section | Plate | Height ratio |
| --- | --- | --- |
| Overview | *the whole bar* | — |
| Work | Cyan `#0093D5` | `.62` |
| Stack | Magenta `#E0006C` | `1` |
| Play | Yellow `#F5B800` | `.44` |
| Contact | Key `#14130F` | `.80` |

**Overview has no `h2`** — its heading is the name, and the mark itself sits directly above
it — so the four plates belong to the four sections that *do* carry a heading, in bar order
as you read down the page. Overview is marked by the whole bar, miniature, in the nav.
`U31` fails the build if the two lists fall out of step.

### Headings sit on their plate

The colour is a block behind the word, not a swatch beside it — the heading prints on the
plate. Ink holds on cyan (7.3:1), magenta (4.4:1, and the heading is large text) and yellow
(10.5:1). On the key plate it would be ink on ink, so **that heading alone inverts** to the
page ground at 15.6:1. `U32` pins the inversion, because it is the sort of thing a later
tidy-up would "simplify" into invisibility.

**Heights are fixed, never randomised.** The page must be pixel-identical on every load, so
the ratios are declared constants — not `Math.random()`, not a seeded shuffle. Bars sit on a
shared baseline so the variation reads upward.

The ratio is a property of the plate, not of the bar, so the same number drives the mark,
the swatch beside a heading, and the miniature bar. They cannot disagree.

**There is no legend and there must never be one.** The swatch is a cue, not a key. An
earlier revision explained the system in a labelled row and it killed it — the point is that
the form is recognised, not read.

**No outlines.** The plates are bare colour, butted straight against each other and against
the ground. An ink border was tried and removed — it made the mark look drawn rather than
printed. Yellow was deepened from `#FFC72C` to `#F5B800` as a consequence, so it still holds
its own on a warm off-white without a line around it.

### Work: a timeline, left to right

A career runs left to right, so the section does too. Each role is a segment flexed to its
own duration — `flex: <years>` — so 2016–18 is two units wide and 2020–23 is three. Each
segment carries a year, a tick, a length of axis, then the role beneath it.

The axis pieces butt together into one continuous line with a tick at every boundary. **The
current role's axis is magenta and thicker.** That is the one place colour marks position
rather than identity, and it is Work's own plate, used once.

Below 900px a left-to-right timeline is a lie — four segments in 390px is unreadable — so it
becomes a vertical stack, keeping the years, ticks and axis pieces.

### Stack: what the dev work actually is

A homepage that lists technologies as tags says nothing. What communicates is **where in a
system someone actually lives**, so the section is five layers — Interfaces, APIs, Services,
Data, Infrastructure — each with a bar showing depth of involvement and the tools at that
layer.

Explicitly **not** a skills chart. No percentages, no ratings, no five-star anything. The
caption says what the bars mean in one line: *"where I actually spend my time, not what I
could put on a CV."* The deepest layer takes the section's plate; the rest are ink.

Bars carry `aria-hidden`; the layer name and its technologies are the readable content, and
the caption states the encoding, so nothing depends on reading a bar length.

### Play: the side projects

Six repos from Alex's public GitHub, each tile linking to its own. Tiles are 3:2, three
across, dropping to two then one.

**Screenshots are real or absent — never invented.** Two repos ship one in their README
(`smarty`, `bugboard`); those are cropped to 3:2 and optimised into `public/img/`. The other
four have no screenshot anywhere, so they get a plate composition, which is obviously not a
screenshot. `U33` fails the build if a composition is ever passed off as one.

An earlier section showed *work* achievements with the CV's figures attached — events per
day, money saved, customer counts. That was the page's sales pitch and it was deleted. Play
is the opposite: things built for fun, linked so anyone can go and look.

### Tone

**This is a personal site, not a CV and not a pitch.** The copy says what the work was and
stops there. **No explanatory captions.** A colophon about the typography and a note
explaining the stack bars were both removed: the first was the designer writing about their
own work on someone else's page, and the second explained a chart that reads fine without it.
If an element needs a paragraph of defence, the element is wrong. The introduction is Alex's own words, verbatim, and carries a comment in
`content.ts` saying not to improve them.

`U30` enforces the line: no money figures, no improvement percentages, no `70M+`-style
counts, no `2,000`-style customer numbers. Tone drifts back the moment someone copies a line
across from a CV, so it is a test rather than a good intention.

The phone number on the CV is deliberately absent; `U29` fails the build if one appears.

### Contact: ask properly

*"Fancy a chat?"* at the supporting step, then the address at display size. A page that has
spent four sections being precise can afford to end warmly, and "Contact" as a bare heading
over an email address is a form, not an invitation.

### Where colour is allowed

Colour appears in exactly three places, and nowhere else:

1. The mark.
2. The swatch beside a section heading.
3. **One positional highlight inside a section, in that section's own plate** — the current
   role on the timeline, the deepest layer in the stack.

**The navigation carries the motif without the colour.** Each nav item keeps its plate's
proportion but takes the tone of its own label via `currentColor`. The nav is chrome; four
colours in a fixed top bar is a toolbar, not an identity.

### Colour rules

Process colours fail text contrast badly on a light ground — cyan 2.3:1, magenta 3.8:1,
yellow 1.05:1. Therefore:

- **Colour is never applied to type. Ever.** Not to headings, not to links, not to labels.
- Colour never carries meaning alone. Every section is named in words everywhere it is
  marked, and the plate's height ratio gives a second, shape-based cue that survives any
  colour vision. The mark itself is decorative and hidden from assistive technology.
- Colour identifies a section. It carries no other meaning.

| Token | Value | Role |
| --- | --- | --- |
| `--ground` | `#F4F3EF` | Page |
| `--ink` | `#14130F` | All type. ~17:1 |
| `--ink-2` | `#55524A` | Secondary prose. 7.4:1 |
| `--ink-3` | `#6E6A5E` | Inactive signatures. 4.9:1 |
| `--rule` | `#DCD9D0` | Hairlines only — 1.3:1, never type |
| `--field` | `#EAE8E2` | The ground a project image sits on |
| `--c` | `#0093D5` | The mark and heading swatches only |
| `--m` | `#E0006C` | " |
| `--y` | `#F5B800` | " — deepened from `#FFC72C` once outlines were dropped |
| `--k` | `#14130F` | " |

### Links

**Underlined, in ink, and nothing else.** Dotted, 2px, offset 5px, going solid on hover.
No colour, no background, no arrow. A link should be unmistakable as a link and silent
about it otherwise. Colour on a link underline was tried and removed.

### Type

**Jost\*** alone, weights 300 / 400 / 500 / 700. Futura cannot be licensed for self-hosted
web use here; Jost\* is an open geometric drawn in that tradition. See §12 Q9 — buying a
real Futura licence is an open decision.

| Role | Size | Leading |
| --- | --- | --- |
| Title | `clamp(3.4rem, 11.5vw, 8.75rem)` | `.78` |
| Supporting | `clamp(1.55rem, 3.1vw, 2.5rem)` | `1.05` |
| Body | `1.0625rem` | `1.42` |
| Caption | `0.6875rem` | `1.4` |

Sentence case throughout; signatures lowercase. **Weight carries focus** — entry titles at
700, roles dropped to 300, the active signature bolding as you scroll.

The supporting line is the page's thesis: *"I enjoy building things that matter."*

### Layout

Six-column grid, everything ranged left. A lock-up under the intro carries role, location
and email, so a reader who never scrolls can still contact you.

**Navigation is horizontal and read the right way up**, fixed to the top of the viewport:
four labels, each preceded by its plate's swatch, active in ink and bold. The vertical
signature was authentic to the guidelines but it made you tilt your head to read a menu,
which is a bad trade — the identity should not cost the reader anything. The swatches carry
the reference instead.

### Motion

Near-still. Signature and mark states change with scroll; smooth-scroll on click, disabled
under `prefers-reduced-motion`. Nothing else moves.

---

## 4. Functional requirements

### Must have

- **F1** Five sections in fixed order: Overview, Work, Stack, Play, Contact.
- **F2** Overview: the mark, name, supporting line, two short paragraphs, and the lock-up.
- **F3** Work: a left-to-right timeline, **chronological**, each role a segment flexed to its
  own duration, carrying company, title, start year, one descriptive line and technologies.
  The current role is marked on the axis. Collapses to a vertical stack below 900px.
- **F3a** Segment widths derive from the dates in `content.ts`, never hand-tuned.
- **F4** Stack: layers, each with a name, a depth bar and its technologies. Not a skills
  chart — no percentages, no ratings.
- **F4b** Play: side projects from the public repos, each tile one outbound link. A tile
  shows a real screenshot or a plate composition, never a stand-in dressed as a screenshot.
- **F4a** A social card at `public/og.png`, 1200×630, generated from `assets/og.html` by
  `npm run og` so it cannot drift from the design.
- **F5** Contact: email as a `mailto:` link, plus GitHub and LinkedIn.
- **F6** A horizontal navigation showing current position, keyboard-reachable, fixed to the
  top so it is available from anywhere on the page.
- **F7** All content authored in one typed data file, separate from any markup.
- **F8** Content is present in the served HTML — the page is readable with JavaScript off.
- **F13** Horizontal navigation fixed to the top: four labels set the right way up, each
  preceded by its plate's swatch **in the label's own tone, not in colour**. Active in ink
  and bold, inactive in `--ink-3`.
- **F14** The mark: a four-colour bar, one plate per section, butted, at fixed height
  ratios — rendered from a single typed table so the bar and every swatch always agree.
- **F15** Bar heights are **deterministic constants**. No randomisation at any point.
- **F16** A lock-up under the intro carrying role, location and email, so the page works
  as a calling card without scrolling.

### Should have

- **F9** Deep links: `#overview`, `#work`, `#projects`, `#contact`.
- **F10** Social preview card (Open Graph + Twitter). Designed — `assets/og.html`, rasterised
  to `public/og.png` at build.
- **F11** `Person` JSON-LD for search results.
- **F12** Favicon derived from the mark. Designed — `assets/favicon.svg`.
- **F17** A print stylesheet: chrome dropped, ink on white, link destinations printed after
  the text, and no entry broken across a page.

### Out of scope (decided, not forgotten)

Blog or writing section · CV download · portrait photograph · decorative or stock imagery ·
dark mode · contact form · analytics · a CMS · client-side routing.

F7 and the level structure are chosen so a writing section *could* be added later without
rework. It just isn't being built now.

---

## 5. Content model

```ts
type Level = 'overview' | 'work' | 'projects' | 'contact'

interface Role {
  company: string
  title: string
  start: string          // 'YYYY' or 'YYYY-MM'
  end: string | null     // null = present
  summary: string        // one sentence, ~120 chars
  tech: string[]
}

interface Project {
  name: string
  year: string
  summary: string        // one sentence, ~120 chars
  tech: string[]
  href?: string
  image?: {              // omit to fall back to a generated plate composition
    src: string          // 3:2, min 900x600, .webp with .avif sibling
    alt: string          // what the thing IS, not "screenshot of X"
  }
}

interface Layer {
  name: string           // 'Services'
  depth: number          // 0-100. Time actually spent, not competence
  tech: string           // one line, ~60 chars, human not a tag list
}

interface Site {
  name: string
  role: string           // 'Software engineer'
  location: string
  intro: string[]        // 1-2 paragraphs
  roles: Role[]
  layers: Layer[]        // exactly one is the deepest; it takes the plate colour
  projects: Project[]
  email: string
  links: { label: string; href: string }[]
}
```

One file, `src/content.ts`, fully typed. Adding a job is a five-line edit and never touches
a component.

**Copy constraints, so the design keeps working:** intro paragraphs ≤ 240 characters each;
role and project summaries one sentence, ≤ 130 characters; ≤ 4 technology tags per entry.
These are enforced by review, not by code — but they are the reason the layout holds.

---

## 6. Non-functional requirements

### Performance

| Metric | Target |
| --- | --- |
| JS shipped (gzip) | < 60 KB |
| CSS shipped (gzip) | < 8 KB |
| Project images | < 120 KB each, AVIF with WebP fallback, lazy below the fold |
| Largest Contentful Paint | < 1.2s on a 4G throttle |
| Cumulative Layout Shift | 0 — fonts preloaded, no late-injected content |
| Lighthouse | 100 across all four categories |

React is heavier than this page needs. Two mitigations, both non-negotiable:

1. **Prerender at build time.** A small Node script renders the app with
   `react-dom/server` and writes the markup into `index.html`. First paint needs no
   JavaScript; hydration only activates the rail.
2. **Self-host the font.** Subset Jost\* (or licensed Futura) to Latin, serve as `.woff2` from
   the same origin, `<link rel="preload">` both, `font-display: swap` with a metric-matched
   fallback stack so nothing shifts.

### Accessibility — WCAG 2.2 AA, non-negotiable

- All text meets 4.5:1 (large text 3:1). Palette is chosen against this, not adjusted after.
- One `<h1>`, then `<h2>` per level. Real `<section>` landmarks with `aria-labelledby`.
- The rail is a `<nav aria-label="Levels">` of buttons, tabbable, with `aria-current="true"`
  on the active tick.
- Visible focus everywhere: a 2px yellow ring with a 2px offset. Yellow on the light ground
  measures below 3:1 on its own, so the ring pairs yellow with a charcoal outer edge.
- `prefers-reduced-motion: reduce` disables smooth scrolling and marker transitions.
- Skip link to main content.
- Verified with axe-core in CI and one manual keyboard pass.

### Responsive

| Breakpoint | Behaviour |
| --- | --- |
| ≥ 1200px | Full rail with numbers and level names, wide margins |
| 900–1199px | Rail with numbers only |
| < 900px | Rail replaced by top progress hairline; single column; levels tighten |
| 390px | Must remain comfortable — this is the real test |

### Other

- **Browsers:** evergreen Chrome, Firefox, Safari, Edge. No IE, no polyfills.
- **Privacy:** no analytics, no third-party requests at runtime, no cookies. Nothing to
  disclose because nothing is collected.
- **Maintainability:** adding a role or project must require editing exactly one file.
- **Longevity:** no dependency that will rot. Pinned versions, `npm ci`, lockfile committed.

---

## 7. User experience expectations

**The first frame.** Before any scrolling, the reader sees your name, what you do, where
you are, and the beginning of the intro. The page is not a full-viewport hero — the overview
is sized to its content, so the reader can already see there is more below. The mark is the
first thing on the page, above the name.

**The only required interaction is scrolling.** The rail is an affordance, never a
requirement. Someone who ignores it entirely gets the whole page.

**Orientation.** The marker's position answers "where am I and how much is left" without a
word. The reader should never wonder how long the page is.

**The ending.** Contact is a deliberate close, not a footer people scroll past. Your email
is the last thing, at a size that says it is the point.

**Feel.** Calm, spacious, exact. The reader should not consciously notice the design — they
should notice that the person who made it is careful.

**Failure states.** JavaScript off: everything readable, rail absent, anchors still work.
Fonts blocked: metric-matched fallbacks, no reflow. Narrow viewport: nothing clipped,
nothing horizontally scrolling.

---

## 8. Architecture

```
homesite/
├─ index.html                 # shell; prerendered markup injected at build
├─ vite.config.ts             # base path from env
├─ scripts/prerender.mjs      # react-dom/server → index.html
├─ .github/workflows/deploy.yml
├─ assets/                    # design sources, not shipped
│  ├─ favicon.svg             # the mark at 16px
│  └─ og.html                 # 1200x630 card; screenshot to public/og.png
├─ public/
│  ├─ fonts/                  # subset woff2, self-hosted
│  ├─ img/                    # project images, avif + webp
│  ├─ favicon.svg
│  ├─ og.png                  # built from assets/og.html
│  └─ .nojekyll               # required for GitHub Pages
└─ src/
   ├─ main.tsx
   ├─ App.tsx
   ├─ content.ts              # ALL copy lives here
   ├─ tokens.css              # the six colour tokens + type scale
   ├─ sections.ts            # THE table: id, label, plate, form. Single source
   ├─ components/
   │  ├─ Nav.tsx              # fixed, horizontal; motif without colour
   │  ├─ Swatch.tsx           # one plate, driven by sections.ts
   │  ├─ Mark.tsx             # the four-colour bar
   │  ├─ Section.tsx          # six-column wrapper; renders its own swatch in the h2
   │  ├─ Timeline.tsx         # work, left to right; widths from dates
   │  ├─ Stack.tsx            # layers, depth bars
   │  └─ Play.tsx             # side-project tiles, real screenshots or plates
   │  └─ Colophon.tsx
   └─ hooks/
      └─ useActiveSection.ts  # rAF-throttled; drives the signatures
```

**No client-side router.** Four levels on one page with hash anchors. A router would be
weight spent on nothing.

**Tailwind** for layout and spacing utilities, with the six colours and the type scale
defined as theme tokens — so `text-ink-body` exists and arbitrary hex values never appear
in a component.

**State** is one number: scroll position. `useScrollPosition` reads it on a
`requestAnimationFrame`-throttled scroll listener and returns progress plus active index.
No context, no store, no library.

---

## 9. Build and deploy

- **Vite** + `@vitejs/plugin-react`. `base` read from `VITE_BASE` (default `/`), so the same
  build works on a custom domain, a user site, or a project path — the hosting decision
  stays deferred, as agreed.
- **GitHub Actions:** on push to `main` — `npm ci`, typecheck, lint, test, build,
  prerender, upload artifact, `actions/deploy-pages`.
- `public/.nojekyll` prevents Jekyll from eating underscore-prefixed assets.
- If a custom domain is chosen later: add `public/CNAME`, set the A/AAAA or CNAME DNS
  records, tick *Enforce HTTPS*. Roughly ten minutes of work, no code change.

The repository is live at **https://github.com/AlexConnolly/homesite**, public, with Pages
set to build from GitHub Actions. The first commit is made locally and waits only on an
interactive `git push` — see §17.

---

## 10. Test plan

Written before the code, per the usual cycle.

### Unit — Vitest + React Testing Library

| # | Test |
| --- | --- |
| U1 | `content.ts` satisfies its types; no role has an end date before its start |
| U2 | Rail renders exactly one tick per level, labelled and in order |
| U3 | Active index is derived correctly at each section boundary, including the ends |
| U4 | Marker offset is clamped to 0–100% and never escapes the rail |
| U5 | Tick click calls `scrollIntoView` with `behavior: 'auto'` under reduced motion |
| U6 | Role list renders reverse-chronologically and shows "present" for a null end date |
| U7 | Project link renders `rel="noopener noreferrer"` and `target="_blank"` |
| U8 | Every project without an `href` renders as plain text, not a dead link |
| U9 | The mark renders one bar per section, in section order, from the shared table |
| U10 | A section's heading swatch matches its bar in both plate and height ratio |
| U11 | No component emits `text-transform: uppercase` — the guidelines forbid all-caps sentences |
| U12 | Every text block is ranged left; nothing is centred or justified |
| U13 | **No plate colour is ever applied to a `color` or `text-decoration-color`** — colour never touches type |
| U14 | No plate is ever rendered with a border — the mark is bare colour |
| U15 | Every nav item exposes its label as text, not as colour alone |
| U16 | Bar heights are identical across two renders — no randomness anywhere in the mark |
| U17 | Nav swatches resolve to `currentColor`, never to a plate hue |
| U18 | A project with an `image` renders it; one without falls back to a plate composition |
| U19 | Every real project image carries non-empty, non-redundant `alt` |
| U20 | Each project tile is exactly one link — never a link nested inside a link |
| U21 | Timeline segment flex values derive from role dates and are never hard-coded |
| U22 | Exactly one role is marked current, and it is the one with a null end date |
| U23 | The timeline renders chronologically — oldest left — the reverse of CV order |
| U24 | Exactly one layer is marked deepest, and it is the highest `depth` |
| U25 | Layer depths are clamped to 0–100 and a 0-depth layer still renders its name and tech |
| U26 | The Stack section emits no percentage, rating or score — only a bar and a caption |

### Accessibility — vitest-axe, in CI

| # | Test |
| --- | --- |
| A1 | Zero axe violations on the full rendered page |
| A2 | Heading order is h1 → h2, with no skipped levels |
| A3 | Active tick carries `aria-current="true"` and only one does |
| A4 | Every interactive element is reachable by keyboard, with a visible focus style |

### End-to-end — Playwright

| # | Test |
| --- | --- |
| E1 | Scrolling to each level updates the active tick |
| E2 | Clicking a tick scrolls to the matching level |
| E3 | With JavaScript disabled, all four levels' text is present in the DOM |
| E4 | At 390px the rail is absent, the top hairline is present, and nothing overflows on X |
| E5 | No horizontal scrollbar at 390, 768, 1024, 1440, 1920 |
| E6 | Scrolling updates the current nav item, and only one is ever current |
| E7 | The fixed nav wraps rather than overflowing at 390px, and never covers a heading |
| E8 | Anchor jumps clear the fixed nav — `scroll-margin-top` is honoured on every section |
| E9 | Print emulation: nav and stamp are absent, and link destinations are visible |
| E10 | At 390px the nav wraps without covering a heading after an anchor jump |
| E11 | The timeline is horizontal above 900px and vertical below it, losing no content |
| E12 | Clicking anywhere on a project tile follows its link |
| E13 | One nav item per section, and scrolling reaches every one |
| E14 | Every Play tile opens its repo |

### Manual

- Keyboard-only pass, top to bottom.
- VoiceOver or NVDA pass over the rail.
- Read the whole page on a real phone, outdoors, in daylight — the actual contrast test.
- View source and confirm the prerendered markup is clean and readable.

### Build verification

`npm run build && npm run preview`, then Lighthouse against the preview server. The four
100s are a merge gate, not an aspiration.

---

## 11. Delivery phases

| Phase | Contents | Done when |
| --- | --- | --- |
| **0** | `git init`, Vite + React + TS + Tailwind, tokens, fonts subset and self-hosted, CI skeleton | `npm run build` passes in Actions |
| **1** | Tests U1–U8, A1–A4 written and failing | Red suite committed |
| **2** | `sections.ts`, section shell, type scale, all five sections | Page reads correctly, unit tests green |
| **3** | The rail: proportional ticks, travelling marker, keyboard, mobile hairline | E1, E2, E4 green |
| **4** | Prerender script, `.nojekyll`, deploy workflow, rasterise `assets/og.html`, copy favicon, print styles | Live on Pages; Cmd-P produces a clean page |
| **5** | Accessibility and Lighthouse pass; manual checks; fix what they find | Four 100s; axe clean |
| **6** | Replace every placeholder with real copy | You have written it |

Phases 0–5 do not depend on your content. **Phase 6 is the blocker and it is yours.**

---

## 12. Open questions

Ordered by how much they hold things up.

| # | Question | Blocks | Default if unanswered |
| --- | --- | --- | --- |
| Q1 | ~~All copy~~ | — | **Answered from the CV.** Live and indexable |
| Q2 | ~~Public email~~ | — | **`alex.connolly.engineer@gmail.com`** — the personal one, not work |
| Q3 | ~~GitHub and LinkedIn~~ | — | **Both live.** Phone number deliberately withheld |
| Q4 | ~~Custom domain?~~ | — | **Answered: `alex.connolly.cloud`.** `public/CNAME` set, so CI builds with base `/` |
| Q5 | ~~GitHub username and repo name~~ | — | **Answered: `AlexConnolly/homesite`, public** |
| Q6 | Do projects link to repos, live sites, or both? | F4 | Repo where one exists, otherwise no link |
| Q7 | ~~Are work achievements cleared to publish?~~ | — | **Moot.** The section carrying them was deleted; the page describes work without figures |
| Q8 | ~~How many roles~~ | — | **All five.** Twelve years at one employer is the story |
| Q9 | **Buy a Futura licence?** Self-hosted from Scangraphic (the Barbican's exact cut, named in their own manual), Neufville, or URW. Adobe Fonts forbids self-hosting and adds a third-party request | Nothing — Jost\* ships today | Stay on Jost\*, swap later in one line |
| Q10 | ~~Project images~~ | — | **Moot** until there are public side projects to show |

---

## 13. Unexplored areas

Genuinely not yet thought through, flagged rather than hidden.

- **Long content.** The layout is designed around roughly four roles and three projects. A
  fifteen-year history would need the work section rethought, probably as a denser table.
- **Writing, later.** The structure permits a fifth section. What it would actually look
  like is unexplored, and I would not design for it speculatively.
- **Real screenshots against a calm page.** The image field is designed and the placeholders
  work, but no real screenshot has been dropped in yet. Busy product UI in a 3:2 tile next
  to this much white space is the one thing that could still break the restraint.

### Closed since first draft

| Was unexplored | Now |
| --- | --- |
| The OG image | `assets/og.html` — a 1200×630 card, rendered in the browser so it uses the real webfont. Rasterise with `npx playwright screenshot --viewport-size=1200,630 assets/og.html public/og.png` |
| The favicon | `assets/favicon.svg` — the mark at 16px, same four plates at the same height ratios, no outlines |
| Print | A full `@media print` block: nav and stamp dropped, ink on white, link destinations printed after the text, `break-inside: avoid` on every entry |
| The 390px experience | Designed rather than squeezed — the nav wraps and `scroll-margin` grows to match, the bar keeps its proportions at a smaller scale, and the 9:1 type ratio closes up because it is too violent at that width |
| The Barbican reference | Resolved. The 2007 North manual was found and extracted; §3 is quoted from it and §16 lists the sources |

---

## 14. Risks

| Risk | Severity | Response |
| --- | --- | --- |
| Design judged on placeholder copy, then real copy breaks it | High | Placeholders written at realistic length; copy constraints in §5 |
| React undercuts "ultra-simple" — heavy, JS-dependent | Medium | Prerender at build; hard performance budgets in §6 |
| "Soft contrast" drifts into unreadable | Medium | AA floor is a hard constraint; palette designed against it upfront |
| The rail is fragile at odd viewports | Medium | E4/E5 cover five widths; rail is removed rather than squeezed on mobile |
| The mark drifts back into being a legend | High | It happened once and it killed the design. §3 forbids it; any label attached to a plate is a regression |
| Someone "improves" it by colouring a link or a heading | High | U13 fails the build. Colour never touches type |
| The mark reads as decoration and the cue is missed | Medium | Mitigated by repeating the plate at each heading and by the nav carrying its proportions. Watch a real person use it |
| Colour creeps back into the nav, or outlines back onto the plates | Medium | U14 and U17 fail the build. Both were tried and deliberately removed |
| Generated plate compositions ship as if they were the projects | **High** | They are scaffolding. F4a and Q10 both say so; nothing goes public until real images replace them |
| Real screenshots destroy the restraint — busy UI against a calm page | Medium | Tiles are small and fixed 3:2 on a tinted ground so they read as plates in a layout; crop tightly and prefer one clear idea per image |
| A project image belongs to an employer | Medium | Q10. Only ship images you own or are cleared to show |
| Jost\* is not Futura and a typographer will notice | Medium | Named honestly in the colophon; swaps in one line once a licence is bought — Q9 |
| The 9:1 hierarchy overwhelms on a small screen | Medium | Title clamps down to 3.4rem; check at 390px specifically |
| Two navigations (signatures and mark) feel redundant | Low | They differ in role — one is persistent, one is the front-door index. Drop the mark's links if it grates |
| Yellow is divisive at full saturation | Low | One token; the whole palette can be retuned in one line |
| The bar and the heading swatches drift apart as code changes | Medium | Both render from `sections.ts`; U10 fails the build if they disagree |

---

## 15. Decisions

| Decision | Rationale |
| --- | --- |
| Statement of taste + calling card | Not a hiring pitch, not a blog — so copy stays short and craft carries the argument |
| React + TypeScript + Tailwind, static build | Your call; you maintain it, and familiarity beats my preference for something lighter |
| Sectioned like a building, four levels | Chosen over one-page scroll, poster, and index+detail |
| Vertical rail with travelling marker | Chosen over a drawn cornering route (fragile) and a top progress bar (loses the idea) |
| Yellow deepened to `#F5B800` | Barbican yellow needed an outline to hold on this ground, and outlines were dropped |
| One sans + one mono | Each face has a job; mono labels data rather than decorating |
| Imagery only where it is evidence | Project images show the work; no decorative photography anywhere else. Texture was tried and removed |
| One committed light palette | A statement of taste commits; no dark mode |
| Near-still motion | Only the marker moves — never tiring, never gimmicky |
| Four-colour process as the mark | The identity fixes no brand hue and calls for vivid contrast; CMYK is the page's own language, one plate per section |
| A colour bar, not circles | A butted swatch at varying fixed heights reads as print; four identical dots read as bullets |
| No outlines on the plates | Bare colour looks printed; a border looks drawn |
| Horizontal navigation | The vertical signature was authentic but made you tilt your head to read a menu — the identity should cost the reader nothing |
| Motif in the nav, colour withheld | Colour appears twice only, so it stays a cue; a four-colour top bar is a toolbar, not an identity |
| Work is a timeline, not a list | A career runs left to right; duration is information a list throws away |
| A Stack section, not skill bars | Where someone works in a system is the honest visual answer; percentages and star ratings are not |
| Projects shrank to tiles | They are an invitation to click through, not the argument itself |
| Contact asks properly | Four sections of precision earn a warm ending |
| Headings sit on their plate | The colour is the label, not an ornament beside it |
| Play, and no Highlights | Side projects invite you to go and look; work achievements with figures attached were a pitch |
| Screenshots real or absent | A generated composition must never stand in for a screenshot of software |
| No explanatory captions | If an element needs a paragraph of defence, the element is wrong |
| Contact gives up its plate | CMYK is four; the page is five. The whole bar as a sign-off beats inventing a fifth colour |
| No legend, ever | A labelled key was built and removed — explaining the cue destroys it |
| One meaning per plate | Encoding completion in the fill state as well was one method too many |
| Links underlined in ink only | Colour never touches type; the underline alone must carry it |
| Design from the source manual, not from assumption | Rev A and Rev B were both invented and both read as template. Every rule in §3 is now quoted |
| One typeface (Jost\*), not two | "The Barbican typeface is Futura" — a single face is the identity's actual economy |
| Sentence case, ranged left, tight leading | Direct quotations from the guidelines, not preferences |
| Hierarchy at 9:1 | The manual's own 108 / 30 / 12 / 8 |
| The colour bar replaces the arcade and the carrier | Both were invented; the process bar is the page's own language |
| "I enjoy building things that matter." | The supporting line is the page's thesis, not a job title |
| Near-black ink, real contrast | The guidelines demand contrast for clarity — this supersedes the earlier "high contrast is wrong" |
| No portrait, no CV | Consistent with the restraint; both were offered and declined |
| Base path configurable | Keeps the hosting decision open at zero cost |

---

## 16. Sources

Primary, and the basis for everything in §3:

- **Barbican Identity Guidelines**, North, 2007 — [the manual itself](https://gd3branding.wordpress.com/wp-content/uploads/2012/12/barbican-brand-guidelines.pdf).
  Every quoted rule in §3 comes from this document.
- [Barbican Brand Guidelines](https://guidelines.barbican.org.uk/brand/) — the current
  official site. Returned HTTP 526 (TLS failure) on every attempt this session; worth
  retrying, since it supersedes the 2007 manual.

Supporting:

- [Fonts In Use — Barbican Arts Centre identity](https://fontsinuse.com/uses/3250/barbican-arts-centre-identity)
  — confirms Futura SH from Scangraphic, "tight spacing", round forms staying circular in
  all weights. Notes the 1970s Lloyd Northover identity used Walbaum with the same cropped circle.
- [It's Nice That — North's Barbican identity](https://www.itsnicethat.com/articles/north-barbican-identity)
  — the logo deconstructed into "the word mark and the carrier within which the word mark is contained".
- [Creative Bloq — the power of three](https://www.creativebloq.com/branding/barbican-s-new-brand-guidelines-pack-power-three-9134583)
  — the carrier as "a cut-off circle", and the invitation to "position it, repeat it, or use
  it to represent an idea such as music or movement or the passage of time".
- [Barbican Living — hammered and brushed concrete](https://www.barbicanliving.co.uk/barbican-story/construction/hammered-and-brushed-finish/)
  — every column hammered by hand with pick axes to disguise the pour joints; Penlee granite aggregate.
- [ianVisits — the Barbican's baffling layout](https://www.ianvisits.co.uk/articles/barbican-seeks-wayfinding-designers-to-improve-its-baffling-layout-77749/)
  — the yellow line ran the highwalks from the Underground to the Centre and is now largely
  worn away. Pentagram's early-1990s rethink made Level 5 the ground floor.
- [Google Arts & Culture — Barbican signs](https://artsandculture.google.com/story/archive-objects-in-focus-barbican-signs-barbican-centre/zAUR83IXZH0Suw)
  — original 1982 signage by Ken Briggs & Associates, pictogram-led.

**One caveat worth recording.** The 2007 manual shows Futura in Extra Light, Book, Medium
and Bold plus italics. Later coverage describes a tightened system of *three* weights and
*three* sizes, with the wordmark set vertically. The identity was evolved over roughly a
decade, so these are two stages of the same system rather than a contradiction — this plan
follows the 2007 manual because it is the document that could actually be read.

---

## 17. Status

**Live at https://alex.connolly.cloud** (was `alexconnolly.github.io/homesite`)

| Done | Detail |
| --- | --- |
| Repository | `AlexConnolly/homesite`, public |
| Pages | Source: GitHub Actions. First deploy green in 38s |
| Domain | `alex.connolly.cloud` — CNAME `alex` → `alexconnolly.github.io.` at Namecheap, custom domain set in Pages |
| Project | Vite 6 + React 18 + TypeScript, no client-side router |
| Design | `src/styles.css` is the approved stylesheet, unchanged |
| Content | `src/content.ts` holds every word; `src/sections.ts` the plate table |
| Tests | 25 passing — design invariants, not just markup |
| Typecheck | Clean |
| Build | **48 KB JS gzipped** (budget 60), **3 KB CSS** (budget 8) |
| Prerender | `dist/index.html` carries every section; reads with JavaScript off |
| Favicon | `public/favicon.svg`, the mark at 16px |
| CI | typecheck, test, build, deploy on push to `main` |
| Draft guard | `robots: noindex, nofollow` while the copy is placeholder |

### Verified in the browser, not just in CI

The live page was walked end to end: the colour bar, the timeline with its magenta
current-role axis, the Stack with Services deepest in yellow, the project tiles, and
the Contact sign-off with the whole bar in miniature.

One bug was found that way and only that way: `mix-blend-mode` sat on the `<g>`, so the
three overlapping squares composited as a group against the page and stacked opaquely.
The overlaps — cyan over magenta making blue, all three making near-black — never
appeared, which is the entire point of a four-colour composition. Fixed by moving the
blend onto each rect. **No test would have caught it; it needed an eye on the real page.**

### Content

Written from the CV, and it changed the shape of the page. Twelve years at **one**
employer across **five** roles is a better story than four anonymous companies, so
Linnworks is stated once above the timeline and each segment carries the role.

The section showing work achievements was then deleted outright: attaching the CV's
figures to them turned it into a pitch, which is not what this page is for.

Timeline widths moved from whole years to **months**, because the roles are not
year-aligned and the current one is six months old. Proportional-only squeezed it to
4% of the width, so `weight()` applies a floor — segments stay proportional, the
shortest stays readable, and the dates carry the exact truth.

**The phone number on the CV is deliberately not here.** U29 fails the build if one
ever reaches the page.

### Then, in order

1. Decide Q9 — buying a real Futura licence. Everything else is done.
