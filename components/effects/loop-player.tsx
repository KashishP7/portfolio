"use client";

import { useEffect } from "react";

// Pauses the looping project illustrations ([data-loop]) while they're off
// screen, by setting data-paused (CSS sets animation-play-state: paused).
// Renders nothing.
export function LoopPlayer() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) delete element.dataset.paused;
        else element.dataset.paused = "";
      }
    });
    for (const element of document.querySelectorAll("[data-loop]")) {
      observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  return null;
}
