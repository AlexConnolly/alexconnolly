/**
 * Every word on the page lives here. Adding a role or a highlight is an edit to
 * this file and nothing else.
 *
 * Copy constraints, so the layout keeps working (PLAN.md §5):
 *   intro paragraphs   <= 240 chars
 *   role/highlight summaries, one sentence, <= 145 chars
 *   layer.tech, one line, ~65 chars
 *
 * Deliberately NOT here: phone number. It is on the CV; it does not belong on
 * a public page that anyone can scrape.
 */

export interface Role {
  title: string;
  /** team or division — the company is stated once, above the timeline */
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
  /** 0-100. Time actually spent, not competence. */
  depth: number;
  tech: string;
}

export interface Highlight {
  name: string;
  year: string;
  summary: string;
  tech: string;
  href?: string;
  image?: { src: string; alt: string };
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
  highlights: Highlight[];
  ask: string;
}

export const site: Site = {
  name: "Alex Connolly",
  thesis: "I enjoy building things that matter.",
  role: "Senior software engineer",
  location: "London",

  intro: [
    "Twelve years building distributed, event-driven, multi-tenant systems at scale — most recently a change-propagation platform moving more than 70 million events a day.",
    "I care most about the parts that don't demo well: hot paths, failure modes, and the generic layer that turns a change across twenty integrations into a one-line edit.",
  ],

  email: "alex.connolly.engineer@gmail.com",
  links: [
    { label: "LinkedIn", href: "https://linkedin.com/in/-alex-connolly" },
    { label: "GitHub", href: "https://github.com/AlexConnolly" },
  ],

  employer: "Linnworks",
  employerNote: "E-commerce operations SaaS · London · one company, five roles",

  // Chronological. The timeline renders oldest-left; widths come from the dates.
  roles: [
    {
      title: "Software Engineer",
      team: "Platform",
      start: "2014-10",
      end: "2017-07",
      summary:
        "Built the developer ecosystem and app store — payments, recurring billing, third-party integrations — now hosting 150+ apps.",
      tech: "C# · .NET · JavaScript",
    },
    {
      title: "Software Engineer",
      team: "Order Management",
      start: "2017-07",
      end: "2022-01",
      summary:
        "Batch inventory tracking that opened an entirely new industry vertical, plus a high-volume open-orders screen on Redis and MSSQL.",
      tech: "C# · Redis · MSSQL",
    },
    {
      title: "Engineering Team Lead",
      team: "Analytics",
      start: "2022-01",
      end: "2024-01",
      summary:
        "Launched a customer-facing analytics product from zero: hired and led five engineers across five countries, ETL moving 20M+ records a day.",
      tech: "PostgreSQL · ETL · C#",
    },
    {
      title: "Senior Software Engineer",
      team: "Carrier Solutions",
      start: "2024-01",
      end: "2026-03",
      summary:
        "Delivered a full system rewrite on schedule with 70% less follow-up rework, and a generic data layer that made twenty-carrier edits one-line changes.",
      tech: "C# · .NET · Azure",
    },
    {
      title: "Software Architect",
      team: "Senior Software Engineer",
      start: "2026-03",
      end: null,
      summary:
        "Change propagation across products at 70M+ events a day, and a broker that resolves which product owns each entity, per tenant.",
      tech: "C# · Azure Service Bus · TypeScript",
    },
  ],

  layers: [
    {
      name: "Interfaces",
      depth: 40,
      tech: "TypeScript · React — enough to be useful, not my home",
    },
    {
      name: "Services & APIs",
      depth: 85,
      tech: "C# · .NET — and the contracts other teams build against",
    },
    {
      name: "Distributed systems",
      depth: 100,
      tech: "Azure Service Bus · Kafka · SQS/SNS — queues, retries, idempotency",
    },
    {
      name: "Data",
      depth: 75,
      tech: "PostgreSQL · MSSQL · Redis · ETL — schemas, migrations, query plans",
    },
    {
      name: "AI & agents",
      depth: 70,
      tech: "Claude Code · Codex · RAG · local open-weight models",
    },
    {
      name: "Infrastructure",
      depth: 45,
      tech: "Docker · GitHub Actions · AWS Lambda, S3 · Hangfire",
    },
  ],

  highlights: [
    {
      name: "Change propagation at 70M events a day",
      year: "2026",
      summary:
        "An Azure Service Bus platform distributing data to tenant-specific platforms across multiple products, with a broker resolving source of truth per tenant.",
      tech: "Azure Service Bus · C# · multi-tenant",
    },
    {
      name: "Agents that replaced a £60k/year system",
      year: "2025",
      summary:
        "Internal AI agents built and shipped to production, then agentic delivery rolled out across engineering — one team cut a sprint's work to a day.",
      tech: "Claude Code · RAG · agentic design",
    },
    {
      name: "An analytics product from zero",
      year: "2022",
      summary:
        "Hired and led a greenfield team of five across five countries, shipping stock forecasting and BI dashboards to 2,000 customers on a 20M-record-a-day ETL.",
      tech: "PostgreSQL · ETL · team of five",
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

/** Total span, for the line above the timeline. */
export function spanYears(roles: Role[]): number {
  if (!roles.length) return 0;
  const total = months(roles[0]) + roles.slice(1).reduce((s, r) => s + months(r), 0);
  return Math.round(total / 12);
}
