"use client";

import { useEffect, useRef } from "react";

// A 2px accent line fixed at the very top that fills left to right as the
// page scrolls. Updated with transform: scaleX at most once per frame,
// without re-rendering React. Decorative: aria-hidden, ignores the pointer.
export function ScrollProgress() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      if (lineRef.current) lineRef.current.style.transform = `scaleX(${progress})`;
    }

    function scheduleUpdate() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={lineRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
