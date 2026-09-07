import type { ReactNode } from "react";
import type { Section } from "../sections";
import { RoleIcon } from "./RoleIcon";
import { site, weight, label, isCurrent, spanYears } from "../content";

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
            className={[
              "seg",
              i % 2 === 0 ? "seg--left" : "seg--right",
              isCurrent(role) ? "is-now" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            // one row each, so the sides alternate down the line rather than
            // pairing up beside each other
            style={{ ["--yrs" as string]: weight(role), gridRow: i + 1 }}
          >
            <p className="year cap">{isCurrent(role) ? `${label(role)} — now` : label(role)}</p>
            <div className="axis" aria-hidden="true" />
            <RoleIcon kind={role.icon} />
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

/* ── stack: prose, not a chart ───────────────────────────────────── */

export function Stack() {
  return (
    <div className="stack">
      <p className="stack-lead">{site.stack.lead}</p>
      <dl className="stack-list">
        {site.stack.lines.map((l) => (
          <div key={l.label}>
            <dt>{l.label}</dt>
            <dd>{l.text}</dd>
          </div>
        ))}
      </dl>
      <p className="stack-close">{site.stack.close}</p>
    </div>
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
    <>
      <rect x="52" y="34" width="58" height="58" fill="#0093D5" />
      <rect x="112" y="70" width="58" height="58" fill="#E0006C" />
      <rect x="172" y="106" width="58" height="58" fill="#F5B800" />
      <rect x="232" y="142" width="58" height="58" fill="#14130F" />
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
  // Compositions are indexed by position among the screenshot-less tiles, not
  // by position in the list — otherwise two of them come out identical.
  let plain = -1;
  const variant = site.play.map((p) => (p.image ? -1 : ++plain));

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
                <PlateComposition index={variant[i]} />
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
