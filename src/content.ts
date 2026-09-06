/**
 * Every word on the page lives here.
 *
 * Tone: this is a personal site, not a CV and not a pitch. Say what the work
 * actually was; leave the numbers, the money and the percentages on the CV
 * where they belong. If a line reads like it is trying to win something,
 * rewrite it. U30 guards the obvious cases.
 *
 * Deliberately NOT here: phone number, and anything from the CV that was
 * written to impress rather than to describe.
 *
 * Copy constraints, so the layout keeps working (PLAN.md §5):
 *   intro paragraphs   <= 240 chars
 *   role summaries, one sentence, <= 145 chars
 *   layer.tech, one line, ~65 chars
 */

export interface Role {
  title: string;
  /** team or area — the company is stated once, above the timeline */
  team: string;
  /** 'YYYY-MM' */
  start: string;
  /** null = present */
  end: string | null;
  summary: string;
  tech: string;
}

export interface Layer {
  name: string;
  /** 0-100. Roughly where the time goes. Not a competence rating. */
  depth: number;
  tech: string;
}

export interface Site {
  name: string;
  thesis: string;
  role: string;
  location: string;
  intro: string[];
  email: string;
  links: { label: string; href: string }[];
  employer: string;
  employerNote: string;
  roles: Role[];
  layers: Layer[];
  ask: string;
}

export const site: Site = {
  name: "Alex Connolly",
  thesis: "I enjoy building things that matter.",
  role: "Software engineer",
  location: "London",

  intro: [
    "I'm a software engineer in London. I've spent most of my career at Linnworks, mostly on the backend — the plumbing that moves data between systems and tries to keep it consistent.",
    "I like the unglamorous parts: how things fail, what an interface looks like a year after it shipped, and how to stop twenty near-identical integrations from being twenty separate things.",
    "Away from work it's road cycling, cooking, and whichever AI side project has my attention this month.",
  ],

  email: "alex.connolly.engineer@gmail.com",
  links: [
    { label: "LinkedIn", href: "https://linkedin.com/in/-alex-connolly" },
    { label: "GitHub", href: "https://github.com/AlexConnolly" },
  ],

  employer: "Linnworks",
  employerNote: "E-commerce operations software, in London",

  // Chronological. The timeline renders oldest-left; widths come from the dates.
  roles: [
    {
      title: "Software Engineer",
      team: "Platform",
      start: "2014-10",
      end: "2017-07",
      summary: "The developer ecosystem and app store — payments, billing, and third-party integrations.",
      tech: "C# · .NET · JavaScript",
    },
    {
      title: "Software Engineer",
      team: "Order Management",
      start: "2017-07",
      end: "2022-01",
      summary: "Batch inventory tracking, and an open-orders screen built to cope with a lot of changes at once.",
      tech: "C# · Redis · MSSQL",
    },
    {
      title: "Engineering Team Lead",
      team: "Analytics",
      start: "2022-01",
      end: "2024-01",
      summary: "Started the analytics product and the team around it, and built the ETL underneath it.",
      tech: "PostgreSQL · ETL · C#",
    },
    {
      title: "Senior Software Engineer",
      team: "Carrier Solutions",
      start: "2024-01",
      end: "2026-03",
      summary: "Rewrote the carrier integration layer so a change stopped meaning the same edit in twenty places.",
      tech: "C# · .NET · Azure",
    },
    {
      title: "Senior Software Engineer",
      team: "Software Architect",
      start: "2026-03",
      end: null,
      summary: "Moving changes between products, and working out which product owns which data for each customer.",
      tech: "C# · Azure Service Bus · TypeScript",
    },
  ],

  layers: [
    {
      name: "Interfaces",
      depth: 40,
      tech: "TypeScript and React. Enough to be useful, not where I live.",
    },
    {
      name: "Services & APIs",
      depth: 85,
      tech: "C# and .NET, and the contracts other teams build against.",
    },
    {
      name: "Distributed systems",
      depth: 100,
      tech: "Service Bus, Kafka, SQS. Queues, retries, and making things idempotent.",
    },
    {
      name: "Data",
      depth: 75,
      tech: "Postgres, MSSQL, Redis. Schemas, migrations, the occasional query plan.",
    },
    {
      name: "AI & agents",
      depth: 70,
      tech: "Agentic coding tools, RAG, and running small open models locally.",
    },
    {
      name: "Infrastructure",
      depth: 45,
      tech: "Docker, GitHub Actions, and enough AWS to keep things running.",
    },
  ],

  ask: "Fancy a chat?",
};

/* ── derived values ───────────────────────────────────────────────── */

function parse(ym: string): [number, number] {
  const [y, m] = ym.split("-");
  return [Number(y), m ? Number(m) : 1];
}

/** Whole months served. An open role runs to today. */
export function months(role: Role): number {
  const [sy, sm] = parse(role.start);
  const now = new Date();
  const [ey, em] = role.end ? parse(role.end) : [now.getFullYear(), now.getMonth() + 1];
  return Math.max(1, (ey - sy) * 12 + (em - sm));
}

/**
 * Timeline width. Proportional to time served, with a floor: a six-month role
 * squeezed to 4% of the width is unreadable, and the current role is the one
 * people most want to read. The dates in the label carry the exact truth.
 */
export const MIN_WEIGHT = 26;
export function weight(role: Role): number {
  return Math.max(MIN_WEIGHT, months(role));
}

const MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function label(role: Role): string {
  const [y, m] = parse(role.start);
  return `${MONTH[m - 1]} ${y}`;
}

export function isCurrent(role: Role): boolean {
  return role.end === null;
}

/** The single deepest layer takes the section's plate colour. */
export function deepestLayer(layers: Layer[]): number {
  return layers.reduce((best, l, i) => (l.depth > layers[best].depth ? i : best), 0);
}

/** Span of the whole timeline, for the line above it. */
export function spanYears(roles: Role[]): number {
  if (!roles.length) return 0;
  return Math.round(roles.reduce((s, r) => s + months(r), 0) / 12);
}
