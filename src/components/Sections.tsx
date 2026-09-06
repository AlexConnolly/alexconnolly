import type { ReactNode } from "react";
import { SECTIONS, type Section } from "../sections";
import { MiniBar, Swatch } from "./Plate";
import { site, years, isCurrent, deepestLayer } from "../content";

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
              {s.plate ? <Swatch plate={s.plate} mono /> : <MiniBar mono />}
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
          {section.plate ? <Swatch plate={section.plate} /> : <MiniBar />}
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
    <div className="timeline">
      {site.roles.map((role, i) => (
        <article
          key={`${role.company}-${role.start}-${i}`}
          className={`seg${isCurrent(role) ? " is-now" : ""}`}
          style={{ ["--yrs" as string]: years(role) }}
        >
          <p className="year cap">{isCurrent(role) ? `${role.start} — now` : role.start}</p>
          <div className="axis" aria-hidden="true" />
          <h3>{role.company}</h3>
          <p className="role">{role.title}</p>
          <p className="sum">{role.summary}</p>
          <ul className="tech">
            <li>{role.tech}</li>
          </ul>
        </article>
      ))}
    </div>
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
        Bar length is where I actually spend my time, not what I could put on a CV.
      </p>
    </>
  );
}

/* ── projects: small tiles, the whole tile is the link ───────────── */

/** Placeholder art, built from the same four plates. Delete when real images land. */
function PlateComposition({ index }: { index: number }) {
  const art = [
    <>
      <rect x="44" y="86" width="40" height="80" fill="#0093D5" />
      <rect x="92" y="42" width="40" height="124" fill="#E0006C" />
      <rect x="140" y="112" width="40" height="54" fill="#F5B800" />
      <rect x="188" y="68" width="40" height="98" fill="#14130F" />
    </>,
    <g style={{ mixBlendMode: "multiply" }}>
      <rect x="48" y="30" width="104" height="104" fill="#0093D5" />
      <rect x="108" y="58" width="104" height="104" fill="#E0006C" />
      <rect x="78" y="86" width="104" height="104" fill="#F5B800" />
    </g>,
    <>
      <rect x="44" y="42" width="212" height="24" fill="#0093D5" />
      <rect x="44" y="74" width="152" height="24" fill="#E0006C" />
      <rect x="44" y="106" width="104" height="24" fill="#F5B800" />
      <rect x="44" y="138" width="60" height="24" fill="#14130F" />
    </>,
  ];
  return (
    <span className="shot" aria-hidden="true">
      <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
        {art[index % art.length]}
      </svg>
    </span>
  );
}

export function ProjectTiles() {
  return (
    <ul className="projects">
      {site.projects.map((p, i) => (
        <li key={`${p.name}-${p.year}`}>
          <a
            className="project"
            href={p.href ?? "#projects"}
            {...(p.href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {p.image ? (
              <span className="shot">
                <img src={p.image.src} alt={p.image.alt} width={900} height={600} loading="lazy" />
              </span>
            ) : (
              <PlateComposition index={i} />
            )}
            <h3>{p.name}</h3>
            <span className="p-year cap">{p.year}</span>
            <span className="p-sum">{p.summary}</span>
            <span className="p-tech">{p.tech}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
