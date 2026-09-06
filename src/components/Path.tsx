import { useEffect, useRef, useState } from "react";
import { SECTIONS } from "../sections";

const scrollable = () =>
  Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

/**
 * The mobile navigation: a coloured path across the bottom of the screen.
 *
 * Each section owns a stretch of the path proportional to how much page it
 * takes up, so the handle's position is literally where you are in the
 * document. Drag it and the page follows; tap a stretch and it scrolls there.
 *
 * It is still a list of links underneath — each stretch is a real anchor with
 * a name — so it works by keyboard and by screen reader, where dragging a
 * coloured bar would be useless.
 */
export function Path() {
  const [progress, setProgress] = useState(0);
  const [stops, setStops] = useState<number[]>(() => SECTIONS.map((_, i) => i / SECTIONS.length));
  const track = useRef<HTMLElement>(null);
  const dragged = useRef(false);

  useEffect(() => {
    const measure = () => {
      const max = scrollable();
      setStops(
        SECTIONS.map((s) => {
          const el = document.getElementById(s.id);
          return el ? Math.min(1, Math.max(0, el.offsetTop / max)) : 0;
        }),
      );
    };
    const read = () => setProgress(Math.min(1, Math.max(0, window.scrollY / scrollable())));

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        read();
      });
    };

    measure();
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      measure();
      read();
    });
    if (document.fonts?.ready) document.fonts.ready.then(measure);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrubTo = (clientX: number) => {
    const el = track.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const t = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    window.scrollTo({ top: t * scrollable(), behavior: "auto" });
  };

  /*
    Drag is tracked on the window rather than on the element. Relying on
    pointer capture alone drops moves as soon as the pointer leaves the 14px
    track — which, on a bar this thin, is immediately.
  */
  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    dragged.current = false;
    scrubTo(e.clientX);

    const move = (ev: PointerEvent) => {
      dragged.current = true;
      scrubTo(ev.clientX);
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      // let the click that follows a drag be swallowed, then forget it
      setTimeout(() => {
        dragged.current = false;
      }, 0);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };

  const active = stops.reduce((best, s, i) => (progress + 0.001 >= s ? i : best), 0);

  return (
    <nav
      className="path"
      aria-label="Sections"
      ref={track}
      onPointerDown={onPointerDown}
    >
      <ul>
        {SECTIONS.map((s, i) => {
          const from = stops[i];
          const to = i + 1 < stops.length ? stops[i + 1] : 1;
          return (
            <li
              key={s.id}
              className={`leg${s.plate ? ` p-${s.plate}` : " leg--none"}`}
              style={{ ["--w" as string]: `${Math.max(0.06, to - from) * 100}%` }}
            >
              <a
                href={`#${s.id}`}
                aria-current={i === active ? "true" : undefined}
                // a drag ends over some link; that must not count as a click
                onClick={(e) => {
                  if (dragged.current) e.preventDefault();
                }}
              >
                <span className="vh">{s.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <span
        className="path-handle"
        style={{ ["--at" as string]: `${progress * 100}%` }}
        aria-hidden="true"
      />
    </nav>
  );
}
