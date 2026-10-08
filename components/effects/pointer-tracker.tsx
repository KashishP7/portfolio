"use client";

import { useEffect } from "react";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

// Follows the mouse for the hero dot grid. Renders nothing and never sets
// React state: it writes CSS variables, at most once per animation frame,
// so moving the mouse doesn't re-render React.
//   --hx / --hy  cursor position inside the hero (on the dot grid layer)
export function PointerTracker() {
  useEffect(() => {
    // Touch screens get no dots, so there's nothing to track.
    if (!window.matchMedia(FINE_POINTER).matches) return;

    const root = document.documentElement;
    const dots = document.querySelector<HTMLElement>("[data-hero-dots]");
    let x = 0;
    let y = 0;
    let frame = 0; // id of the pending animation frame, 0 if none

    function update() {
      frame = 0;
      if (dots) {
        // Recomputed each frame because the hero moves when the page scrolls.
        const box = dots.getBoundingClientRect();
        dots.style.setProperty("--hx", `${x - box.left}px`);
        dots.style.setProperty("--hy", `${y - box.top}px`);
      }
    }

    // However many events arrive, only one update runs per frame.
    function scheduleUpdate() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    function handleMove(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      x = event.clientX;
      y = event.clientY;
      root.dataset.pointer = ""; // reveals the bright dots after the first move
      scheduleUpdate();
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("scroll", scheduleUpdate, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("scroll", scheduleUpdate);
      cancelAnimationFrame(frame);
      delete root.dataset.pointer;
    };
  }, []);

  return null;
}
