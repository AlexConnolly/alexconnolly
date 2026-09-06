import type { ReactNode } from "react";
import { SECTIONS, type Section } from "../sections";
import { MiniBar, Swatch } from "./Plate";
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
      {heading && section.plate && (
        <h2 id={`h-${section.id}`}>
          <span className={`tag p-${section.plate}`}>{section.label}</span>
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
  );
}

/* ── play: side projects, each tile one link ─────────────────────── */

/** Only used where a repo has no screenshot. Never dressed up as one. */
function PlateComposition({ index }: { index: number }) {
  const art = [
    <>
      <rect className="mul" x="48" y="30" width="104" height="104" fill="#0093D5" />
      <rect className="mul" x="108" y="58" width="104" height="104" fill="#E0006C" />
      <rect className="mul" x="78" y="86" width="104" height="104" fill="#F5B800" />
    </>,
    <>
      <rect x="44" y="86" width="40" height="80" fill="#0093D5" />
      <rect x="92" y="42" width="40" height="124" fill="#E0006C" />
      <rect x="140" y="112" width="40" height="54" fill="#F5B800" />
      <rect x="188" y="68" width="40" height="98" fill="#14130F" />
    </>,
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

export function Play() {
  return (
    <>
      <ul className="projects">
        {site.play.map((p, i) => (
          <li key={p.name}>
            <a className="project" href={p.href} target="_blank" rel="noopener noreferrer">
              {p.image ? (
                <span className="shot">
                  <img src={p.image.src} alt={p.image.alt} width={900} height={600} loading="lazy" />
                </span>
              ) : (
                <PlateComposition index={i} />
              )}
              <h3>{p.name}</h3>
              <span className="p-sum">{p.summary}</span>
              <span className="p-tech">{p.tech}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="play-note">{site.playNote}</p>
    </>
  );
}
