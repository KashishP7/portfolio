"use client";

import { useEffect } from "react";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const GLOW_RADIUS = 220; // px, the mouse mask circle in hero-dots.tsx

// Lights up the hero dots under the mouse (or, on touch screens, under the
// finger). Renders nothing and never sets React state: it writes CSS
// variables, at most once per animation frame.
//   --hx / --hy  position inside the hero (on the dot grid layer)
//
// Mouse: only pointer movement triggers an update, never scrolling.
// Rewriting the variables while scrolling repainted the masked dot layer
// under the pointer, which made Safari flash its default cursor. While you
// scroll without moving the mouse, the lit dots stay where they were and
// catch up on the next move.
// Touch: there's no cursor, so updates also run while the finger scrolls.
export function PointerTracker() {
  useEffect(() => {
    const found = document.querySelector<HTMLElement>("[data-hero-dots]");
    if (!found) return;
    // A new const with a non-null type, so the functions below (which
    // TypeScript treats as callable before the check) know it exists.
    const dots: HTMLElement = found;
    const root = document.documentElement;
    const hero = dots.parentElement ?? dots;

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

    function scheduleUpdate() {
      // However many events arrive, only one update runs per frame.
      if (!frame) frame = requestAnimationFrame(update);
    }

    if (window.matchMedia(FINE_POINTER).matches) {
      function handleMove(event: PointerEvent) {
        if (event.pointerType === "touch") return;
        x = event.clientX;
        y = event.clientY;
        root.dataset.pointer = ""; // reveals the bright dots after the first move
        scheduleUpdate();
      }

      window.addEventListener("pointermove", handleMove, { passive: true });
      return () => {
        window.removeEventListener("pointermove", handleMove);
        cancelAnimationFrame(frame);
        delete root.dataset.pointer;
      };
    }

    // Touch: bright dots follow the finger while it's down on the hero,
    // and fade out when it lifts.
    function handleTouch(event: TouchEvent) {
      const touch = event.touches[0];
      if (!touch) return;
      x = touch.clientX;
      y = touch.clientY;
      root.dataset.touching = "";
      scheduleUpdate();
    }
    function handleTouchEnd() {
      delete root.dataset.touching;
    }

    hero.addEventListener("touchstart", handleTouch, { passive: true });
    hero.addEventListener("touchmove", handleTouch, { passive: true });
    hero.addEventListener("touchend", handleTouchEnd);
    hero.addEventListener("touchcancel", handleTouchEnd);
    return () => {
      hero.removeEventListener("touchstart", handleTouch);
      hero.removeEventListener("touchmove", handleTouch);
      hero.removeEventListener("touchend", handleTouchEnd);
      hero.removeEventListener("touchcancel", handleTouchEnd);
      cancelAnimationFrame(frame);
      delete root.dataset.touching;
    };
  }, []);

  return null;
}
