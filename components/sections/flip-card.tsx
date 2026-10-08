"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { moveFocus } from "@/lib/focus";

type FlipCardProps = {
  front: React.ReactNode; // rendered on the server and passed in
  back: React.ReactNode;
  projectName: string;
  flipLabel: string; // corner text on the front, e.g. "Flip for details"
  flipBackLabel: string; // corner text on the back, e.g. "Flip back"
  className?: string;
};

// Set as a style (not a class) so Safari's -webkit- version is always there.
// A face pointing away from the viewer is then invisible.
const faceStyle = {
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
} as const;

const MAX_TILT = 5; // degrees, at the card's edges

export function FlipCard({
  front,
  back,
  projectName,
  flipLabel,
  flipBackLabel,
  className = "",
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const frontButton = useRef<HTMLButtonElement>(null);
  const backButton = useRef<HTMLButtonElement>(null);
  const outer = useRef<HTMLDivElement>(null);
  const tiltFrame = useRef(0);

  // Tilt toward the mouse: write --tilt-x / --tilt-y on the outer wrapper,
  // at most once per frame, without re-rendering. The CSS (.tilt in
  // globals.css) only applies them for a mouse and without reduced motion.
  function handlePointerMove(event: React.PointerEvent) {
    if (event.pointerType !== "mouse") return;
    const { clientX, clientY } = event;
    cancelAnimationFrame(tiltFrame.current);
    tiltFrame.current = requestAnimationFrame(() => {
      const element = outer.current;
      if (!element) return;
      const box = element.getBoundingClientRect();
      const x = (clientX - box.left) / box.width - 0.5; // -0.5 (left) to 0.5 (right)
      const y = (clientY - box.top) / box.height - 0.5; // -0.5 (top) to 0.5 (bottom)
      element.style.setProperty("--tilt-y", `${(x * 2 * MAX_TILT).toFixed(2)}deg`);
      element.style.setProperty("--tilt-x", `${(-y * 2 * MAX_TILT).toFixed(2)}deg`);
    });
  }

  function handlePointerLeave() {
    cancelAnimationFrame(tiltFrame.current);
    outer.current?.style.setProperty("--tilt-x", "0deg");
    outer.current?.style.setProperty("--tilt-y", "0deg");
  }

  useEffect(() => () => cancelAnimationFrame(tiltFrame.current), []);

  function flip(toBack: boolean, fromKeyboard: boolean) {
    // flushSync applies the new state right away, so the side we're turning
    // to is no longer inert (an inert button can't take focus). Then focus
    // its corner button; the ring only shows after a keyboard flip.
    flushSync(() => setFlipped(toBack));
    moveFocus((toBack ? backButton : frontButton).current, fromKeyboard);
  }

  // A click from Enter/Space has detail 0; a mouse click has its click count.
  const fromKeyboard = (event: React.MouseEvent) => event.detail === 0;

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape" && flipped) {
      flip(false, true);
    }
  }

  // The hidden side is inert (no Tab, no clicks, skipped by screen readers)
  // and ignores the pointer. With reduced motion there is no rotation; the
  // hidden side just fades out (motion-reduce:opacity-0).
  const hidden = "pointer-events-none motion-reduce:opacity-0";

  return (
    // The outer wrapper tilts; the rotor inside flips. Keeping them on
    // separate elements means the two transforms never interfere.
    <div
      ref={outer}
      role="group"
      aria-label={projectName}
      onKeyDown={handleKeyDown}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`tilt perspective-[1600px] ${className}`}
    >
      {/* Both faces share one grid cell, so the card is always as tall as
          the taller side. This "rotor" is what turns. */}
      <div
        className={`grid h-full transform-3d transition-transform duration-650 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none ${
          flipped ? "rotate-y-180 motion-reduce:rotate-y-0" : ""
        }`}
      >
        <div
          inert={flipped}
          style={faceStyle}
          className={`relative [grid-area:1/1] transition-opacity duration-200 ${flipped ? hidden : ""}`}
        >
          {front}
          <FlipCorner
            ref={frontButton}
            text={flipLabel}
            label={`${flipLabel}: ${projectName}`}
            onClick={(event) => flip(true, fromKeyboard(event))}
          />
        </div>

        {/* Pre-turned 180°, so it reads correctly once the card has flipped. */}
        <div
          inert={!flipped}
          style={faceStyle}
          className={`relative rotate-y-180 [grid-area:1/1] transition-opacity duration-200 motion-reduce:rotate-y-0 ${flipped ? "" : hidden}`}
        >
          {back}
          <FlipCorner
            ref={backButton}
            text={flipBackLabel}
            label={`${flipBackLabel}: ${projectName}`}
            onClick={(event) => flip(false, fromKeyboard(event))}
          />
        </div>
      </div>
    </div>
  );
}

// The fold: the bottom-right half of the square is the page background (the
// corner looks cut away), a thin line marks the crease, and the top-left
// half is the folded-back flap.
const foldBackground =
  "linear-gradient(to top left, var(--bg) 49%, var(--border-hover) 49% 51%, var(--card-hover) 51%)";

type FlipCornerProps = {
  text: string;
  label: string; // visible text plus the project name, for screen readers
  onClick: (event: React.MouseEvent) => void;
  ref: React.Ref<HTMLButtonElement>;
};

function FlipCorner({ text, label, onClick, ref }: FlipCornerProps) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      onClick={onClick}
      // -right-px/-bottom-px: sits over the card's border so the cut-away
      // corner hides it. pr-18 leaves room for the fold beside the text.
      className="group absolute -right-px -bottom-px rounded-br-3xl py-4 pr-18 pl-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span className="text-xs font-medium text-muted transition-colors group-hover:text-text">
        {text}
      </span>
      {/* Grows from 56px to 64px on hover, like the page lifting a little. */}
      <span
        aria-hidden="true"
        className="absolute right-0 bottom-0 size-14 rounded-tl-xl transition-[width,height] duration-200 group-hover:size-16 motion-reduce:transition-none"
        style={{ background: foldBackground }}
      />
    </button>
  );
}
