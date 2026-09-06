/**
 * Every word on the page lives here. Adding a role or a project is an edit to
 * this file and nothing else.
 *
 * DRAFT — all copy below is placeholder. See PLAN.md §12 Q1.
 *
 * Copy constraints, so the layout keeps working (PLAN.md §5):
 *   intro paragraphs   <= 240 chars
 *   role/project summaries, one sentence, <= 130 chars
 *   layer.tech, one line, ~60 chars
 */

export interface Role {
  company: string;
  title: string;
  /** 'YYYY' or 'YYYY-MM' */
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

export interface Project {
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
  roles: Role[];
  layers: Layer[];
  projects: Project[];
  ask: string;
}

export const site: Site = {
  name: "Alex Connolly",
  thesis: "I enjoy building things that matter.",
  role: "Software engineer",
  location: "London",

  intro: [
    "I build the parts of systems that other people build on — APIs, data pipelines, and the unglamorous infrastructure underneath commerce platforms.",
    "I care most about the things that don't demo well: schema design, failure modes, and the shape an interface still has a year after it shipped.",
  ],

  email: "hello@example.com",
  links: [
    { label: "GitHub", href: "https://github.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],

  // Chronological. The timeline renders oldest-left; widths come from the dates.
  roles: [
    {
      company: "Company Name",
      title: "Junior Developer",
      start: "2016",
      end: "2018",
      summary: "First role. Learned most of what I know about not breaking production here.",
      tech: "C# · JavaScript",
    },
    {
      company: "Company Name",
      title: "Developer",
      start: "2018",
      end: "2020",
      summary: "Internal tooling for a logistics team, plus the reporting nobody else wanted to own.",
      tech: ".NET · SQL Server · Vue",
    },
    {
      company: "Company Name",
      title: "Senior Developer",
      start: "2020",
      end: "2023",
      summary: "Rebuilt a payments integration layer that had grown past the point anyone could safely change it.",
      tech: "C# · Azure · RabbitMQ",
    },
    {
      company: "Linnworks",
      title: "Software Engineer",
      start: "2023",
      end: null,
      summary: "Order and inventory systems for retailers moving several million units a month.",
      tech: "TypeScript · .NET · AWS · Postgres",
    },
  ],

  layers: [
    { name: "Interfaces", depth: 35, tech: "TypeScript · React — enough to be useful, not my home" },
    { name: "APIs", depth: 80, tech: ".NET · Node · REST and the contracts around them" },
    { name: "Services", depth: 100, tech: "C# · Go · queues, retries, idempotency, the boring correctness" },
    { name: "Data", depth: 75, tech: "Postgres · SQL Server — schema design, migrations, query plans" },
    { name: "Infrastructure", depth: 50, tech: "AWS · Terraform · CI — I own what I ship" },
  ],

  projects: [
    {
      name: "Project Name",
      year: "2025",
      summary: "A command-line tool that does one thing correctly and has needed no changes since.",
      tech: "Go · SQLite",
    },
    {
      name: "Project Name",
      year: "2024",
      summary: "Rendering very large datasets in the browser without a virtual list.",
      tech: "TypeScript · WebGL",
    },
    {
      name: "Project Name",
      year: "2022",
      summary: "A parser for a file format that should not still exist, written mostly out of spite.",
      tech: "Rust",
    },
  ],

  ask: "Fancy a chat?",
};

/** Years served. An open role runs to today. */
export function years(role: Role): number {
  const start = Number(role.start.slice(0, 4));
  const end = role.end ? Number(role.end.slice(0, 4)) : new Date().getFullYear();
  return Math.max(1, end - start);
}

export function isCurrent(role: Role): boolean {
  return role.end === null;
}

/** The single deepest layer takes the section's plate colour. */
export function deepestLayer(layers: Layer[]): number {
  return layers.reduce((best, l, i) => (l.depth > layers[best].depth ? i : best), 0);
}
