"use client";

import { useEffect } from "react";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const GLOW_RADIUS = 220; // px, matches the mask circle in hero-dots.tsx

// Follows the mouse for the hero dot grid. Renders nothing and never sets
// React state: it writes CSS variables, at most once per animation frame,
// so moving the mouse doesn't re-render React.
//   --hx / --hy  cursor position inside the hero (on the dot grid layer)
//
// Only pointer movement triggers an update, never scrolling. Rewriting the
// variables while scrolling repainted the masked dot layer under the
// pointer, which made Safari flash its default cursor. While you scroll
// without moving the mouse, the lit dots simply stay where they were and
// catch up on the next move.
export function PointerTracker() {
  useEffect(() => {
    // Touch screens get no dots, so there's nothing to track.
    if (!window.matchMedia(FINE_POINTER).matches) return;

    const root = document.documentElement;
    const found = document.querySelector<HTMLElement>("[data-hero-dots]");
    if (!found) return;
    // A new const with a non-null type, so the functions below (which
    // TypeScript treats as callable before the check) know it exists.
    const dots: HTMLElement = found;

    let x = 0;
    let y = 0;
    let frame = 0; // id of the pending animation frame, 0 if none
    let wasNear = false; // was the last written position close to the hero?

    function update() {
      frame = 0;
      const box = dots.getBoundingClientRect();
      const localX = x - box.left;
      const localY = y - box.top;

      // Skip the write when the lit circle couldn't reach the hero, e.g.
      // while the mouse moves over other sections. One last write still
      // happens on the way out, which moves the circle fully off the hero.
      const near =
        localX > -GLOW_RADIUS &&
        localY > -GLOW_RADIUS &&
        localX < box.width + GLOW_RADIUS &&
        localY < box.height + GLOW_RADIUS;
      if (!near && !wasNear) return;
      wasNear = near;

      dots.style.setProperty("--hx", `${localX}px`);
      dots.style.setProperty("--hy", `${localY}px`);
    }

    function handleMove(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      x = event.clientX;
      y = event.clientY;
      root.dataset.pointer = ""; // reveals the bright dots after the first move
      // However many events arrive, only one update runs per frame.
      if (!frame) frame = requestAnimationFrame(update);
    }

    window.addEventListener("pointermove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(frame);
      delete root.dataset.pointer;
    };
  }, []);

  return null;
}
