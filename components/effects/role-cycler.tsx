"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+/<>";
const ENTRANCE_DELAY = 300; // ms of scramble before the first role settles
const SWITCH_DELAY = 250; // ms of scramble between roles
const DECODE_TIME = 1000; // ms for a role to settle, left to right
const HOLD_TIME = 3000; // ms each role stays readable

// Cycles through the roles with a decode effect: each one settles out of
// scrambled characters, holds, then scrambles into the next. Purely visual
// (aria-hidden); the hero gives screen readers the first role in an
// sr-only copy. Writes the DOM text directly instead of setting React state.
//
// It also watches the hero: when the hero leaves the screen completely the
// cycle pauses, and when it comes back the entrance replays (the name's
// letters and the first role's decode). Small scrolls that keep part of the
// hero visible don't restart anything. Reduced motion: shows the first role
// and does nothing else.
export function RoleCycler({ roles }: { roles: string[] }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const found = ref.current;
    if (!found || roles.length === 0) return;
    // A new const with a non-null type, so the functions below (which
    // TypeScript treats as callable before the check) know it exists.
    const element: HTMLSpanElement = found;
    element.dataset.decoding = ""; // lets CSS show it (see .decode)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let index = 0;
    let frame = 0;
    let timer = 0;

    // Settle `text` out of scrambled characters, then call `done`.
    function decode(text: string, delay: number, done: () => void) {
      let start = 0;
      function tick(now: number) {
        if (!start) start = now;
        const progress = (now - start - delay) / DECODE_TIME;
        if (progress >= 1) {
          element.textContent = text;
          done();
          return;
        }
        const settled = Math.max(0, progress) * text.length;
        element.textContent = [...text]
          .map((char, i) =>
            char === " " || i < settled ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join("");
        frame = requestAnimationFrame(tick);
      }
      frame = requestAnimationFrame(tick);
    }

    function showRole(delay: number) {
      decode(roles[index], delay, () => {
        timer = window.setTimeout(() => {
          index = (index + 1) % roles.length;
          showRole(SWITCH_DELAY);
        }, HOLD_TIME);
      });
    }

    function stop() {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    }

    // Restart the CSS letter animations of the name (see .hero-letter).
    // Finished CSS animations aren't returned by getAnimations(), so each
    // letter's animation-name is switched off and on again instead; the
    // per-letter animation-delay (inline style) is left untouched.
    function replayName(hero: Element) {
      const letters = hero.querySelectorAll<HTMLElement>(".hero-letter");
      for (const letter of letters) letter.style.animationName = "none";
      void hero.getBoundingClientRect(); // apply "none" before turning it back on
      for (const letter of letters) letter.style.animationName = "";
    }

    const hero = element.closest("#home");
    let hasLeft = false;
    let running = false;

    // isIntersecting is false only when no part of the hero is on screen.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        hasLeft = true;
        if (running) stop();
        running = false;
        return;
      }
      if (running) return;
      running = true;
      if (hasLeft && hero) {
        // Came back after leaving completely: replay the whole entrance.
        replayName(hero);
        index = 0;
        showRole(ENTRANCE_DELAY);
      } else {
        // First time on screen (page load).
        showRole(ENTRANCE_DELAY);
      }
    });
    if (hero) observer.observe(hero);

    return () => {
      observer.disconnect();
      stop();
      element.textContent = roles[0];
    };
  }, [roles]);

  return (
    <span ref={ref} aria-hidden="true" className="decode">
      {roles[0]}
    </span>
  );
}
