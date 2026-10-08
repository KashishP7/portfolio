"use client";

import { useEffect } from "react";

// Fades in and lifts each [data-reveal] element (section headings, cards,
// Experience rows) the first time it scrolls into view. Renders nothing.
// Elements already on screen when the page loads are shown right away, so
// nothing visible disappears and comes back. Reduced motion: does nothing,
// so everything is simply visible. Styles: "Scroll reveals" in globals.css.
export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "animate";
          observer.unobserve(entry.target); // once each
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    for (const element of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
      const box = element.getBoundingClientRect();
      if (box.top < window.innerHeight && box.bottom > 0) {
        element.dataset.revealed = "now";
      } else {
        observer.observe(element);
      }
    }
    // Turns on the hidden "not yet revealed" state (see globals.css).
    document.documentElement.dataset.reveal = "";

    return () => observer.disconnect();
  }, []);

  return null;
}
