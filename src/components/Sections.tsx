import type { ReactNode } from "react";
import { SECTIONS, type Section } from "../sections";
import { Swatch } from "./Plate";
import { site, weight, label, isCurrent, deepestLayer, spanYears } from "../content";

/* ── navigation: horizontal, read the right way up ───────────────── */

export function Nav({ activeIndex }: { activeIndex: number }) {
  return (
    <nav className="nav" aria-label="Sections">
      <ul>
        {SECTIONS.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              data-target={s.id}
              aria-current={i === activeIndex ? "true" : undefined}
            >
              {/* the motif, without the colour — chrome must not compete with the mark */}
              <Swatch plate={s.plate} mono />
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ── a section, with its own plate beside its heading ────────────── */

export function SectionBlock({
  section,
  children,
  heading = true,
}: {
  section: Section;
  children: ReactNode;
  heading?: boolean;
}) {
  return (
    <section className="level grid" id={section.id} aria-labelledby={`h-${section.id}`}>
      {heading && (
        <h2 id={`h-${section.id}`}>
          <Swatch plate={section.plate} />
          {section.label}
        </h2>
      )}
      {children}
    </section>
  );
}

/* ── work: a timeline, left to right, chronological ──────────────── */

export function Timeline() {
  return (
    <>
      <p className="work-lead">
        <strong>{site.employer}</strong> · {spanYears(site.roles)} years · {site.employerNote}
      </p>
      <div className="timeline">
        {site.roles.map((role, i) => (
          <article
            key={`${role.title}-${role.start}-${i}`}
            className={`seg${isCurrent(role) ? " is-now" : ""}`}
            style={{ ["--yrs" as string]: weight(role) }}
          >
            <p className="year cap">{isCurrent(role) ? `${label(role)} — now` : label(role)}</p>
            <div className="axis" aria-hidden="true" />
            <h3>{role.title}</h3>
            <p className="role">{role.team}</p>
            <p className="sum">{role.summary}</p>
            <ul className="tech">
              <li>{role.tech}</li>
            </ul>
          </article>
        ))}
      </div>
    </>
  );
}

/* ── stack: where in a system the work actually happens ──────────── */

export function Stack() {
  const deepest = deepestLayer(site.layers);
  return (
    <>
      <ul className="stack">
        {site.layers.map((layer, i) => (
          <li
            key={layer.name}
            className={`layer${i === deepest ? " is-deep" : ""}`}
            style={{ ["--d" as string]: Math.min(100, Math.max(0, layer.depth)) }}
          >
            <span className="layer-name">{layer.name}</span>
            <span className="layer-bar" aria-hidden="true">
              <i />
            </span>
            <span className="layer-tech">{layer.tech}</span>
          </li>
        ))}
      </ul>
      <p className="stack-note">
        Bar length is roughly where the time goes. It isn't a skills rating.
      </p>
    </>
  );
}
