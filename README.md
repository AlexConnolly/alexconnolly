<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/readme/mark-dark.svg">
  <img src="assets/readme/mark.svg" height="56" alt="">
</picture>

# Alex Connolly

**I love building things that matter.**

Senior software engineer with 12 years of industry experience across multiple disciplines, including leadership and IC roles. Systems thinking, hard problem solving and products that people use daily are what excite me.

Senior software engineer · London · [alex.connolly.cloud](https://alex.connolly.cloud)

## <picture><img src="assets/readme/plate-c.svg" height="22" alt=""></picture> Work

**[Linnworks](https://www.linnworks.com)** · 12 years · e-commerce operations software, in London

- **2026–now** · Senior Software Engineer, Software Architect<br>Moving changes between products, and working out which product owns which data for each customer.
- **2024–2026** · Senior Software Engineer, Carrier Solutions<br>Rewrote the carrier integration layer so a change stopped meaning the same edit in twenty places.
- **2022–2024** · Engineering Team Lead, Analytics<br>Started the analytics product and the team around it, and built the ETL underneath it.
- **2017–2022** · Software Engineer, Order Management<br>Batch inventory tracking, and an open-orders screen built to cope with a lot of changes at once.
- **2014–2017** · Software Engineer, Platform<br>The developer ecosystem and app store — payments, billing, and third-party integrations.

## <picture><img src="assets/readme/plate-m.svg" height="22" alt=""></picture> Stack

Full stack, with the back end as home.

- **Day to day** — C# and .NET on the server, TypeScript and React in front of it.
- **Data** — Postgres, MSSQL and Redis: schemas, migrations, and the occasional query plan.
- **Distributed** — Service Bus, Kafka and SQS. Queues, retries, and making things idempotent.
- **Cloud** — AWS by preference, Azure by experience. Docker and GitHub Actions around both.
- **Lately** — Agentic tooling, RAG, and running small open models locally.

Mostly I believe in picking the right tool for the job.

## <picture><img src="assets/readme/plate-y.svg" height="22" alt=""></picture> Play

- **[smarty](https://github.com/AlexConnolly/smarty)** · C# — a personal assistant on your own machine, on whatever model you point it at. It works in the background, and takes plugins and any MCP server you give it.
- **[agent-skills](https://github.com/AlexConnolly/agent-skills)** · Python — skills for coding agents. Each one packages a working toolkit and the method for using it, not just a prompt.
- **[interchange](https://github.com/AlexConnolly/interchange)** · TypeScript — a yard, two trucks, and a district you slowly end up owning. Playable at [interchange.connolly.cloud](https://interchange.connolly.cloud).
- **[miniweather](https://github.com/AlexConnolly/miniweather)** · TypeScript — cute, mini world weather for wherever you happen to be.

Mostly evenings and weekends. All of it is on GitHub.

## <picture><source media="(prefers-color-scheme: dark)" srcset="assets/readme/plate-k-dark.svg"><img src="assets/readme/plate-k.svg" height="22" alt=""></picture> Elsewhere

- [alex.connolly.cloud](https://alex.connolly.cloud) — the longer version of this page
- [alex.connolly.engineer@gmail.com](mailto:alex.connolly.engineer@gmail.com)
- [LinkedIn](https://linkedin.com/in/-alex-connolly)

<details>
<summary>This repo is also the source of that page</summary>

<br>

A React and Vite site built to the Barbican Identity Guidelines (North, 2007) — one typeface, ranged left, sentence case, leading tighter than default — with the four forms of the four-colour process, circle, square, half-circle and diamond, as the mark, one per section. The full design rationale, sourced and quoted, is in [PLAN.md](PLAN.md).

```bash
npm install
npm run dev        # local
npm run typecheck
npm run build      # vite build + SSR prerender into dist/
npm run og         # re-render the social card (needs: npx playwright install chromium)
```

| Path | What |
| --- | --- |
| `src/content.ts` | Every word on the page. Adding a role or project is an edit here and nowhere else. |
| `src/sections.ts` | The plate table — the mark's single source of truth |
| `src/styles.css` | Design tokens and all component styles |
| `assets/og.html` | Social card, 1200×630. `npm run og` renders it to `public/og.png` |
| `assets/favicon.svg` | The mark at 16px |
| `assets/readme/` | The mark and the four forms as they appear above |

Pushing to `main` runs typecheck and build, then publishes to GitHub Pages. `public/CNAME` holds the custom domain; DNS is a CNAME record `alex` → `alexconnolly.github.io.` on `connolly.cloud`.

</details>
