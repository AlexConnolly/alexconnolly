import { SECTIONS } from "./sections";
import { site } from "./content";
import { Mark } from "./components/Plate";
import { Play, SectionBlock, Stack, Timeline } from "./components/Sections";

const byId = (id: string) => SECTIONS.find((s) => s.id === id)!;

/**
 * Two panes on desktop: who this is, held still on the left, and what he has
 * done, scrolling past it on the right. The identity does not need repeating
 * as you read, and the work gets the top of the page instead of waiting below
 * an introduction.
 *
 * It is one document scrolling, not a pane with its own scrollbar — the left
 * is sticky rather than fixed. Below 900px the two panes become one column and
 * the rail scrolls away like an ordinary header.
 */
export default function App() {
  return (
    <div className="shell">
      <header className="ident" id="overview" aria-labelledby="h-overview">
        <Mark />
        <h1 id="h-overview">{site.name}</h1>
        <p className="super">{site.thesis}</p>

        <div className="intro">
          {site.intro.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        {/* the lock-up: essential information, in a fixed relationship — and
            now literally fixed, sat at the foot of the rail */}
        <p className="lockup">
          <span className="cap">
            {site.role} · {site.location}
          </span>
          <a className="link" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>
      </header>

      <main className="flow">
        <SectionBlock section={byId("work")}>
          <Timeline />
        </SectionBlock>

        <SectionBlock section={byId("stack")}>
          <Stack />
        </SectionBlock>

        <SectionBlock section={byId("play")}>
          <Play />
        </SectionBlock>

        <SectionBlock section={byId("contact")}>
          <p className="ask">{site.ask}</p>
          <a className="link email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <ul className="elsewhere">
            {site.links.map((l) => (
              <li key={l.label}>
                <a className="link" href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </SectionBlock>
      </main>
    </div>
  );
}
