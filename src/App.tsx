import { SECTIONS } from "./sections";
import { site } from "./content";
import { Mark } from "./components/Plate";
import { Nav, ProjectTiles, SectionBlock, Stack, Timeline } from "./components/Sections";
import { useActiveSection } from "./hooks/useActiveSection";

const byId = (id: string) => SECTIONS.find((s) => s.id === id)!;

export default function App() {
  const active = useActiveSection(SECTIONS.map((s) => s.id));

  return (
    <>
      <a className="skip" href="#overview">
        Skip to content
      </a>

      <p className="stamp">Draft — placeholder copy</p>

      <Nav activeIndex={active} />

      <main className="page">
        <SectionBlock section={byId("overview")} heading={false}>
          <Mark />
          <h1 id="h-overview">{site.name}</h1>
          <p className="super">{site.thesis}</p>

          <div className="intro">
            {site.intro.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          {/* the lock-up: essential information, in a fixed relationship */}
          <p className="lockup">
            <span className="cap">
              {site.role} · {site.location}
            </span>
            <a className="link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        </SectionBlock>

        <SectionBlock section={byId("work")}>
          <Timeline />
        </SectionBlock>

        <SectionBlock section={byId("stack")}>
          <Stack />
        </SectionBlock>

        <SectionBlock section={byId("projects")}>
          <ProjectTiles />
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
          <p className="colophon">
            Set in Jost*, a geometric revival in the Futura tradition, after the Barbican
            Identity Guidelines by North. Ranged left, sentence case, leading set tighter than
            default. The mark is a four-colour process bar. Draft — every word on this page is
            placeholder.
          </p>
        </SectionBlock>
      </main>
    </>
  );
}
