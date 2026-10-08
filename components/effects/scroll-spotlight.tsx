"use client";

import { useEffect } from "react";

const TOUCH = "(hover: none), (pointer: coarse)";

// Touch screens have no hover, so the spotlight follows scrolling instead:
// the card crossing the middle of the screen gets data-active and the other
// cards dim (styles: "Touch screens" in globals.css). Renders nothing.
export function ScrollSpotlight() {
  useEffect(() => {
    if (!window.matchMedia(TOUCH).matches) return;

    const root = document.documentElement;
    const cards = [...document.querySelectorAll<HTMLElement>("main [data-spotlight]")].filter(
      (card) => !card.closest("nav"),
    );
    let active: HTMLElement[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        const hits = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target as HTMLElement);
        // The middle line is in a gap between cards: keep the last card lit,
        // so nothing flickers.
        if (hits.length === 0) return;
        for (const card of active) delete card.dataset.active;
        // Usually one card; a flip card's two faces count as one.
        active = hits;
        for (const card of active) card.dataset.active = "";
        root.dataset.scrollSpotlight = "";
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const card of cards) observer.observe(card);

    return () => {
      observer.disconnect();
      for (const card of active) delete card.dataset.active;
      delete root.dataset.scrollSpotlight;
    };
  }, []);

  return null;
}
