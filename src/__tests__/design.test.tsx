import { render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import App from "../App";
import { PLATES, PLATE_RATIO, SECTIONS } from "../sections";
import { site, weight, months, isCurrent, deepestLayer, MIN_WEIGHT } from "../content";

const css = readFileSync(resolve(process.cwd(), "src/styles.css"), "utf-8");

/* ── the mark ─────────────────────────────────────────────────────── */

describe("the mark", () => {
  it("U9: renders one bar per plate, in plate order", () => {
    const { container } = render(<App />);
    const bars = [...container.querySelectorAll(".mark .bar")];
    expect(bars).toHaveLength(PLATES.length);
    bars.forEach((bar, i) => expect(bar).toHaveClass(`p-${PLATES[i]}`));
  });

  it("U10: every h2 carries its own plate, matching the bar", () => {
    const { container } = render(<App />);
    for (const s of SECTIONS) {
      const heading = container.querySelector(`h2#h-${s.id}`);
      if (!heading) continue; // Overview's heading is the h1 — see below
      expect(heading.querySelector(`.swatch.p-${s.plate}`)).toBeTruthy();
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

  it("four plates, four sections, one each", () => {
    expect(SECTIONS).toHaveLength(PLATES.length);
    expect(SECTIONS.map((s) => s.plate)).toEqual(PLATES);
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
  it("U24: exactly one layer is deepest, and it is the highest depth", () => {
    const { container } = render(<App />);
    const deep = container.querySelectorAll(".layer.is-deep");
    expect(deep).toHaveLength(1);
    const idx = deepestLayer(site.layers);
    expect(deep[0].querySelector(".layer-name")?.textContent).toBe(site.layers[idx].name);
    expect(site.layers[idx].depth).toBe(Math.max(...site.layers.map((l) => l.depth)));
  });

  it("U25: depths are clamped to 0-100 and every layer keeps its name and tech", () => {
    const { container } = render(<App />);
    container.querySelectorAll<HTMLElement>(".layer").forEach((l, i) => {
      const d = Number(l.style.getPropertyValue("--d"));
      expect(d).toBeGreaterThanOrEqual(0);
      expect(d).toBeLessThanOrEqual(100);
      expect(l.querySelector(".layer-name")?.textContent).toBe(site.layers[i].name);
      expect(l.querySelector(".layer-tech")?.textContent).toBe(site.layers[i].tech);
    });
  });

  it("U29: no phone number reaches the page", () => {
    const { container } = render(<App />);
    // CV carries one; a public page should not
    expect(container.textContent).not.toMatch(/0\d{4}\s?\d{6}/);
    expect(container.textContent).not.toMatch(/\+44/);
  });

  it("U30: reads as a personal site, not a pitch", () => {
    const { container } = render(<App />);
    const text = container.textContent ?? "";
    // The CV's figures are written to win a job. They do not belong here,
    // and some of them are generous. Keep them on the CV.
    expect(text).not.toMatch(/[£$€]\s?\d/);          // money
    expect(text).not.toMatch(/\d+\s?%/);              // improvement percentages
    expect(text).not.toMatch(/\d+\s?[MKmk]\+/);      // "70M+", "150+"
    expect(text).not.toMatch(/\d{1,3},\d{3}/);   // "2,000 customers"
  });

  it("U26: emits no percentage, rating or score — it is not a skills chart", () => {
    const { container } = render(<App />);
    const text = container.querySelector("#stack")!.textContent!;
    expect(text).not.toMatch(/\d+\s*%/);
    expect(text).not.toMatch(/\b\d\s*\/\s*(5|10)\b/);
  });
});

/* ── projects ─────────────────────────────────────────────────────── */

/* ── structure and accessibility ──────────────────────────────────── */

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

  it("there is a skip link", () => {
    const { container } = render(<App />);
    expect(container.querySelector("a.skip")?.getAttribute("href")).toBe("#overview");
  });
});
