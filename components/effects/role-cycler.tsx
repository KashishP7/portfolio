"use client";

import { useEffect, useRef } from "react";

const HOLD_TIME = 2400; // ms between rolls

// Rolls through the roles like a word ticker: the current role slides up
// and fades out while the next slides up into place from below. All roles
// share one grid cell inside a one-line window that clips them, so the
// window is as wide as the longest role and nothing shifts. The sliding is
// CSS ("Role roll" in globals.css); this only switches data-state every
// 2.4 seconds: "current", "leaving" (sliding out) or "waiting" (below, hidden).
// Purely visual (aria-hidden); the hero gives screen readers the first role.
//
// It also watches the hero: when the hero leaves the screen completely the
// roll pauses, and when it comes back the entrance replays (the name's
// letters, and the roll restarts from the first role). Small scrolls that
// keep part of the hero visible don't restart anything. Reduced motion:
// the first role stays put.
export function RoleCycler({ roles }: { roles: string[] }) {
  const windowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const found = windowRef.current;
    if (!found || roles.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // A new const with a non-null type, so the functions below (which
    // TypeScript treats as callable before the check) know it exists.
    const box: HTMLSpanElement = found;
    const words = [...box.querySelectorAll<HTMLElement>("[data-state]")];

    let index = 0;
    let timer = 0;

    function show(next: number) {
      words.forEach((word, i) => {
        if (i === next) word.dataset.state = "current";
        else if (i === index) word.dataset.state = "leaving";
        // Anything that left earlier jumps back below, unseen (no transition).
        else word.dataset.state = "waiting";
      });
      index = next;
    }

    function stop() {
      clearInterval(timer);
    }

    function start() {
      stop();
      timer = window.setInterval(() => show((index + 1) % words.length), HOLD_TIME);
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

    const hero = box.closest("#home");
    let hasLeft = false;
    let running = false;

    // isIntersecting is false only when no part of the hero is on screen.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        hasLeft = true;
        running = false;
        stop();
        return;
      }
      if (running) return;
      running = true;
      if (hasLeft && hero) {
        // Came back after leaving completely: replay the entrance.
        replayName(hero);
        index = 0;
        words.forEach((word, i) => {
          word.dataset.state = i === 0 ? "current" : "waiting";
        });
      }
      start();
    });
    if (hero) observer.observe(hero);

    return () => {
      observer.disconnect();
      stop();
    };
  }, [roles]);

  return (
    <span ref={windowRef} aria-hidden="true" className="role-window">
      {roles.map((role, i) => (
        <span key={role} data-state={i === 0 ? "current" : "waiting"} className="role-word">
          {role}
        </span>
      ))}
    </span>
  );
}
