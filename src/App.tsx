import { SECTIONS } from "./sections";
import { site } from "./content";
import { Mark, PlateForm } from "./components/Plate";
import { Play, SectionBlock, Stack, Timeline } from "./components/Sections";

const byId = (id: string) => SECTIONS.find((s) => s.id === id)!;

/**
 * Two panes on desktop: who this is, held still on the left, and what he has
 * done, scrolling past it on the right. The identity does not need repeating
 * as you read, and the work gets the top of the page instead of waiting below
 * an introduction.
 *
 * There is no Contact section. Every way of reaching him sits at the foot of
 * the rail, in view at any scroll position, so a section at the end would be
 * the same information a second time and further away.
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

        {/* the lock-up: every way of reaching him, in a fixed relationship —
            and now literally fixed, sat at the foot of the rail. It wears the
            key plate, because it is the contact: there is no longer a section
            for that, and the fourth plate would otherwise do no work. */}
        <div className="lockup">
          <PlateForm plate="k" />
          <p className="cap">
            {site.role} · {site.location}
          </p>
          <a className="link" href={`mailto:${site.email}`}>
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
        </div>
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
      </main>
    </div>
  );
}
