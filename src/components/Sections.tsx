import type { ReactNode } from "react";
import type { Section } from "../sections";
import { PlateForm } from "./Plate";
import { RoleIcon } from "./RoleIcon";
import { site, label, isCurrent, spanYears } from "../content";

/* ── a section, with its own plate beside its heading ────────────── */

export function SectionBlock({
  section,
  children,
}: {
  section: Section;
  children: ReactNode;
}) {
  return (
    <section className="level grid" id={section.id} aria-labelledby={`h-${section.id}`}>
      {section.plate && (
        <h2 id={`h-${section.id}`}>
          <PlateForm plate={section.plate} />
          {section.label}
        </h2>
      )}
      {children}
    </section>
  );
}

/* ── work: a timeline that folds, oldest first ───────────────────── */

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
            className={["seg", isCurrent(role) ? "is-now" : ""].filter(Boolean).join(" ")}
          >
            <p className="year cap">{isCurrent(role) ? `${label(role)} — now` : label(role)}</p>
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
    // overprint: three plates crossing, so the overlaps make the secondaries
    <>
      <circle className="mul" cx="112" cy="80" r="60" fill="#0093D5" />
      <circle className="mul" cx="176" cy="104" r="60" fill="#E0006C" />
      <circle className="mul" cx="136" cy="146" r="60" fill="#F5B800" />
    </>,
    // the four forms in a row, the mark itself at tile scale
    <>
      <circle cx="40" cy="136" r="32" fill="#0093D5" />
      <rect x="88" y="118" width="50" height="50" fill="#E0006C" />
      <path d="M 152 168 A 30 30 0 0 1 212 168 Z" fill="#F5B800" />
      <polygon points="262,100 296,134 262,168 228,134" fill="#14130F" />
    </>,
    // one form, four sizes, diminishing
    <>
      <circle cx="52" cy="98" r="52" fill="#0093D5" />
      <circle cx="146" cy="112" r="38" fill="#E0006C" />
      <circle cx="220" cy="124" r="26" fill="#F5B800" />
      <circle cx="272" cy="134" r="16" fill="#14130F" />
    </>,
    // the four forms stepping down the diagonal
    <>
      <circle cx="46" cy="46" r="32" fill="#0093D5" />
      <rect x="92" y="56" width="52" height="52" fill="#E0006C" />
      <path d="M 156 152 A 34 34 0 0 1 224 152 Z" fill="#F5B800" />
      <polygon points="268,120 306,158 268,196 230,158" fill="#14130F" />
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
