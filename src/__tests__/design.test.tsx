import { render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import App from "../App";
import { PLATES, PLATE_RATIO, SECTIONS } from "../sections";
import { site, weight, months, isCurrent, MIN_WEIGHT } from "../content";

const css = readFileSync(resolve(process.cwd(), "src/styles.css"), "utf-8");

/* ── the mark ─────────────────────────────────────────────────────── */

describe("the mark", () => {
  it("U9: renders one bar per plate, in plate order", () => {
    const { container } = render(<App />);
    const bars = [...container.querySelectorAll(".mark .bar")];
    expect(bars).toHaveLength(PLATES.length);
    bars.forEach((bar, i) => expect(bar).toHaveClass(`p-${PLATES[i]}`));
  });

  it("U10: every h2 sits on its own plate, matching the bar", () => {
    const { container } = render(<App />);
    for (const s of SECTIONS) {
      const heading = container.querySelector(`h2#h-${s.id}`);
      if (!heading) continue; // Overview's heading is the h1 — see below
      const tag = heading.querySelector(`.tag.p-${s.plate}`);
      expect(tag).toBeTruthy();
      expect(tag!.textContent).toBe(s.label);
    }
  });

  it("Overview is marked by the mark row, not by a swatch on the h1", () => {
    const { container } = render(<App />);
    const h1 = container.querySelector("h1#h-overview")!;
    expect(h1.querySelector(".swatch")).toBeNull();
    // cyan leads the bar, and the bar sits inside Overview
    expect(container.querySelector("#overview .mark .bar")).toHaveClass("p-c");
  });

  it("U16: ratios are declared constants — no randomness in the mark", () => {
    const first = render(<App />).container.innerHTML;
    const second = render(<App />).container.innerHTML;
    expect(first).toEqual(second);
    expect(Object.values(PLATE_RATIO).every((r) => r > 0 && r <= 1)).toBe(true);
    const source = readFileSync(resolve(process.cwd(), "src/sections.ts"), "utf-8");
    expect(source).not.toMatch(/Math\.random/);
  });

  it("U14: no plate is given a border — the mark is bare colour", () => {
    const markBlock = css.slice(css.indexOf(".mark .bar"), css.indexOf(".swatch {"));
    expect(markBlock).not.toMatch(/border\s*:/);
  });

  it("U31: the four headed sections take the four plates, in bar order", () => {
    const headed = SECTIONS.filter((s) => s.plate);
    expect(headed).toHaveLength(PLATES.length);
    expect(headed.map((s) => s.plate)).toEqual(PLATES);
    // Overview is the exception: it has no h2, and the whole bar sits above its h1
    const overview = SECTIONS.find((s) => s.id === "overview")!;
    expect(overview.plate).toBeUndefined();
    const { container } = render(<App />);
    expect(container.querySelectorAll(".nav .minibar")).toHaveLength(1);
  });

  it("U32: heading blocks are white on a solid build, never on a process ink", () => {
    // white on bright yellow is 1.6:1 — the heading block must use the deeper
    // build of each plate, or it is unreadable
    expect(css).toMatch(/\.tag\s*\{[^}]*background:\s*var\(--solid\)/);
    expect(css).toMatch(/\.tag\s*\{[^}]*color:\s*var\(--ground\)/);
    for (const p of PLATES) {
      expect(css).toMatch(new RegExp(`\\.p-${p}\\s*\\{[^}]*--solid:`));
    }
  });

  it("U36: the path is actually switched on at a mobile width", () => {
    // it shipped once as display:none at every width, because the media query
    // was inserted against an anchor that no longer existed
    const mobile = css.slice(css.indexOf("@media (max-width: 760px)"));
    expect(mobile).toContain("@media (max-width: 760px)");
    expect(mobile).toMatch(/\.path\s*\{[^}]*display:\s*block/);
    expect(mobile).toMatch(/\.nav\s*\{\s*display:\s*none/);
  });

  it("U35: the path is a real list of links, not only a drag target", () => {
    const { container } = render(<App />);
    const legs = [...container.querySelectorAll(".path .leg")];
    expect(legs).toHaveLength(SECTIONS.length);
    legs.forEach((leg, i) => {
      const a = leg.querySelector<HTMLAnchorElement>("a");
      expect(a?.getAttribute("href")).toBe(`#${SECTIONS[i].id}`);
      expect(a?.textContent).toBe(SECTIONS[i].label);
    });
    expect(container.querySelectorAll('.path a[aria-current="true"]')).toHaveLength(1);
  });
});

/* ── colour discipline ────────────────────────────────────────────── */

describe("colour never touches type", () => {
  it("U13: no plate variable is used as a color or text-decoration-color", () => {
    const offences = css
      .split("\n")
      .filter((l) => /(^|[^-])color\s*:/.test(l) && /var\(--[cmyk]\)/.test(l));
    expect(offences).toEqual([]);
  });

  it("U17: nav swatches resolve to currentColor, never a plate hue", () => {
    expect(css).toMatch(/\.swatch--mono\s*\{\s*background:\s*currentColor/);
    const { container } = render(<App />);
    container.querySelectorAll(".nav .swatch").forEach((s) => {
      expect(s).toHaveClass("swatch--mono");
    });
  });

  it("U11: nothing is set in all caps — the guidelines forbid it", () => {
    expect(css).not.toMatch(/text-transform:\s*uppercase/);
  });

  it("U12: nothing is centred or justified", () => {
    expect(css).not.toMatch(/text-align:\s*(center|justify)/);
  });
});

/* ── work: the timeline ───────────────────────────────────────────── */

describe("the timeline", () => {
  it("U21: segment widths derive from the dates, never hard-coded", () => {
    const { container } = render(<App />);
    const segs = [...container.querySelectorAll<HTMLElement>(".seg")];
    expect(segs).toHaveLength(site.roles.length);
    segs.forEach((seg, i) => {
      expect(seg.style.getPropertyValue("--yrs")).toBe(String(weight(site.roles[i])));
    });
  });

  it("U28: a short role keeps a readable floor, and longer roles stay proportional", () => {
    site.roles.forEach((r) => {
      expect(weight(r)).toBeGreaterThanOrEqual(MIN_WEIGHT);
      expect(weight(r)).toBe(Math.max(MIN_WEIGHT, months(r)));
    });
    // the floor must not flatten everything into equal segments
    const distinct = new Set(site.roles.map(weight));
    expect(distinct.size).toBeGreaterThan(1);
  });

  it("U22: exactly one role is current, and it is the open-ended one", () => {
    const { container } = render(<App />);
    const now = container.querySelectorAll(".seg.is-now");
    expect(now).toHaveLength(1);
    expect(site.roles.filter(isCurrent)).toHaveLength(1);
    expect(now[0].querySelector("h3")?.textContent).toBe(
      site.roles.find(isCurrent)!.title,
    );
  });

  it("U23: renders chronologically — oldest first, the reverse of CV order", () => {
    const { container } = render(<App />);
    const starts = [...container.querySelectorAll(".seg .year")].map((n) =>
      Number(n.textContent!.slice(0, 4)),
    );
    expect(starts).toEqual([...starts].sort((a, b) => a - b));
  });
});

/* ── stack ────────────────────────────────────────────────────────── */

describe("the stack", () => {
  it("U24: is prose, not a chart — no bars, no depths, no ratings", () => {
    const { container } = render(<App />);
    const stack = container.querySelector("#stack")!;
    expect(stack.querySelectorAll(".layer-bar")).toHaveLength(0);
    expect(stack.textContent).not.toMatch(/\d+\s?%/);
    expect(stack.querySelector(".stack-lead")?.textContent).toBe(site.stack.lead);
    expect(stack.querySelector(".stack-close")?.textContent).toBe(site.stack.close);
  });

  it("U25: every line renders its label and its text", () => {
    const { container } = render(<App />);
    const rows = [...container.querySelectorAll("#stack .stack-list > div")];
    expect(rows).toHaveLength(site.stack.lines.length);
    rows.forEach((row, i) => {
      expect(row.querySelector("dt")?.textContent).toBe(site.stack.lines[i].label);
      expect(row.querySelector("dd")?.textContent).toBe(site.stack.lines[i].text);
    });
  });
});

describe("structure", () => {
  it("U2/E13: one nav item per section, in order, all reachable", () => {
    const { container } = render(<App />);
    const items = [...container.querySelectorAll(".nav a")];
    expect(items).toHaveLength(SECTIONS.length);
    items.forEach((a, i) => {
      expect(a.getAttribute("href")).toBe(`#${SECTIONS[i].id}`);
      expect(a.textContent).toContain(SECTIONS[i].label);
      expect(container.querySelector(`#${SECTIONS[i].id}`)).toBeTruthy();
    });
  });

  it("A3: exactly one nav item is current", () => {
    const { container } = render(<App />);
    expect(container.querySelectorAll('.nav a[aria-current="true"]')).toHaveLength(1);
  });

  it("A2: one h1, then h2 per section — no skipped levels", () => {
    const { container } = render(<App />);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(container.querySelectorAll("h2")).toHaveLength(SECTIONS.length - 1);
  });

  it("U15: every nav item exposes its label as text, not colour alone", () => {
    render(<App />);
    SECTIONS.forEach((s) => {
      expect(screen.getAllByText(s.label, { selector: ".nav a" }).length).toBeGreaterThan(0);
    });
  });

  it("F5: the email is reachable from the first screen and at the close", () => {
    const { container } = render(<App />);
    const mailtos = container.querySelectorAll(`a[href="mailto:${site.email}"]`);
    expect(mailtos.length).toBeGreaterThanOrEqual(2);
  });

  it("U7: outbound links carry rel=noopener noreferrer", () => {
    const { container } = render(<App />);
    const external = container.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]');
    expect(external.length).toBeGreaterThan(0);
    external.forEach((a) => {
      expect(a.rel).toContain("noopener");
      expect(a.rel).toContain("noreferrer");
    });
  });

  it("U33: every Play tile links out, and screenshots are real or absent", () => {
    const { container } = render(<App />);
    const tiles = [...container.querySelectorAll(".projects > li")];
    expect(tiles).toHaveLength(site.play.length);
    tiles.forEach((tile, i) => {
      const a = tile.querySelector<HTMLAnchorElement>("a.project");
      expect(a?.getAttribute("href")).toBe(site.play[i].href);
      const img = tile.querySelector("img");
      if (site.play[i].image) {
        // a real screenshot pulled from the repo
        expect(img?.getAttribute("alt")).toBeTruthy();
      } else {
        // no screenshot exists, so nothing pretends to be one
        expect(img).toBeNull();
        expect(tile.querySelector(".shot svg")).toBeTruthy();
      }
    });
  });

  it("U34: no two generated compositions repeat", () => {
    const { container } = render(<App />);
    const svgs = [...container.querySelectorAll(".project .shot svg")].map((s) => s.innerHTML);
    expect(new Set(svgs).size).toBe(svgs.length);
  });

  it("there is a skip link", () => {
    const { container } = render(<App />);
    expect(container.querySelector("a.skip")?.getAttribute("href")).toBe("#overview");
  });
});
