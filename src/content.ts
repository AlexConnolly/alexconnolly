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

export interface Stack {
  lead: string;
  lines: { label: string; text: string }[];
  close: string;
}

export interface Project {
  name: string;
  summary: string;
  tech: string;
  href: string;
  /** a real screenshot from the repo, or nothing — never a stand-in for one */
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
  stack: Stack;
  play: Project[];
  playNote: string;
}

export const site: Site = {
  name: "Alex Connolly",
  thesis: "I love building things that matter.",
  role: "Senior software engineer",
  location: "London",

  // Alex's own words. Do not "improve" these.
  intro: [
    "Senior software engineer with 12 years of industry experience across multiple disciplines, including leadership and IC roles.",
    "Systems thinking, hard problem solving and products that people use daily are what excite me.",
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

  stack: {
    lead: "Full stack, with the back end as home.",
    lines: [
      { label: "Day to day", text: "C# and .NET on the server, TypeScript and React in front of it." },
      { label: "Data", text: "Postgres, MSSQL and Redis — schemas, migrations, and the occasional query plan." },
      { label: "Distributed", text: "Service Bus, Kafka and SQS. Queues, retries, and making things idempotent." },
      { label: "Cloud", text: "AWS by preference, Azure by experience. Docker and GitHub Actions around both." },
      { label: "Lately", text: "Agentic tooling, RAG, and running small open models locally." },
    ],
    close: "Mostly I believe in picking the right tool for the job.",
  },

  play: [
    {
      name: "smarty",
      summary: "A personal assistant on your own machine, on whatever model you point it at. It works in the background, and takes plugins and MCP servers.",
      tech: "C#",
      href: "https://github.com/AlexConnolly/smarty",
      image: { src: "img/smarty.jpg", alt: "Smarty's home, built from live panels" },
    },
    {
      name: "agent-skills",
      summary: "Skills for coding agents. Each one packages a working toolkit and the method for using it, not just a prompt.",
      tech: "Python",
      href: "https://github.com/AlexConnolly/agent-skills",
    },
    {
      name: "interchange",
      summary: "A yard, two trucks, and a district you slowly end up owning. A town you plan and haul for, in the browser.",
      tech: "TypeScript · three.js",
      href: "https://github.com/AlexConnolly/interchange",
    },
    {
      name: "miniweather",
      summary: "Cute, mini world weather for wherever you happen to be.",
      tech: "TypeScript",
      href: "https://github.com/AlexConnolly/miniweather",
    },
  ],
  playNote: "Mostly evenings and weekends. All of it is on GitHub.",

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

const MONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function label(role: Role): string {
  const [y, m] = parse(role.start);
  return `${MONTH[m - 1]} ${y}`;
}

export function isCurrent(role: Role): boolean {
  return role.end === null;
}

/** Span of the whole timeline, for the line above it. */
export function spanYears(roles: Role[]): number {
  if (!roles.length) return 0;
  return Math.round(roles.reduce((s, r) => s + months(r), 0) / 12);
}
