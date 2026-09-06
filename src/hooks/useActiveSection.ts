import { useEffect, useState } from "react";

/**
 * The page's only piece of state: which section you are in.
 *
 * Scroll is read on a requestAnimationFrame-throttled listener; smooth scrolling
 * on a nav click is disabled under prefers-reduced-motion.
 */
export function useActiveSection(ids: string[]): number {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const read = () => {
      const probe = window.scrollY + window.innerHeight * 0.35;
      let next = 0;
      ids.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= probe) next = i;
      });
      setActive(next);
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        read();
      });
    };

    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>(".nav a[data-target]");
      if (!link) return;
      const el = document.getElementById(link.dataset.target ?? "");
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
    };
  }, [ids.join("|")]);

  return active;
}
