"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { moveFocus } from "@/lib/focus";

type FloatingNavProps = {
  items: { label: string; target: string }[]; // the full list of links
  sections: { id: string; name: string }[]; // one dot each, in page order
  label: string; // names the <nav> for screen readers
  hint: string; // added to the button's label, e.g. "show all sections"
};

// Where focus goes after opening/closing, and whether a keyboard did it
// (the focus ring only shows then).
type FocusTarget = { to: "row" | "button"; keyboard: boolean } | null;

// A small pill fixed at the bottom of the screen. It appears once the
// hero's own nav has scrolled out of view and shows the current section
// plus a dot per section. Pressing it slides a slim row with the other
// sections up just above it; the pill itself stays put. State only changes
// when an observer fires or the visitor acts, never on every scroll frame.
export function FloatingNav({ items, sections, label, hint }: FloatingNavProps) {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(sections[0]?.id);
  const [open, setOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rowRef = useRef<HTMLUListElement>(null);
  const focusAfter = useRef<FocusTarget>(null); // where focus goes after a change

  function changeOpen(next: boolean, focus: FocusTarget = null) {
    focusAfter.current = focus;
    setOpen(next);
  }

  // Show the pill when the hero's nav is out of view; hide it again (and
  // close it) when that nav returns.
  useEffect(() => {
    const heroNav = document.querySelector("#home nav");
    if (!heroNav) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting);
      if (entry.isIntersecting) setOpen(false);
    });
    observer.observe(heroNav);
    return () => observer.disconnect();
  }, []);

  // The current section is the one crossing the middle of the screen
  // (the -50% margins shrink the observed area to that middle line).
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(entry.target.id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [sections]);

  // While open: a click outside or Escape closes it.
  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) {
        focusAfter.current = null;
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        focusAfter.current = { to: "button", keyboard: true };
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  // After opening or closing, move focus (the row is inert until it opens,
  // so this has to wait for the render).
  useLayoutEffect(() => {
    const target = focusAfter.current;
    focusAfter.current = null;
    if (target?.to === "row") {
      moveFocus(rowRef.current?.querySelector<HTMLElement>("a") ?? null, target.keyboard);
    } else if (target?.to === "button") {
      moveFocus(buttonRef.current, target.keyboard);
    }
  }, [open]);

  // Scroll to the section ourselves rather than relying on the link's
  // default jump, so it works however the menu closes. scrollIntoView
  // follows the CSS scroll-behavior (smooth, or instant with reduced
  // motion). The hash is updated too, so the URL points to the section.
  function goTo(event: React.MouseEvent, target: string) {
    event.preventDefault();
    changeOpen(false);
    document.getElementById(target)?.scrollIntoView();
    history.replaceState(null, "", `#${target}`);
  }

  const currentName = sections.find((section) => section.id === current)?.name ?? "";
  const otherItems = items.filter((item) => item.target !== current);

  return (
    // Hidden: faded out, slightly larger and lower, and inert. Shown: it
    // shrinks into place. Reduced motion: no scale or movement, just the fade.
    // The bottom offset keeps it above the iPhone home indicator.
    <div
      inert={!visible}
      className={`pointer-events-none fixed inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 px-4 transition-[opacity,scale,translate] duration-300 ease-out motion-reduce:translate-y-0 motion-reduce:scale-100 ${
        visible ? "opacity-100" : "translate-y-2 scale-125 opacity-0"
      }`}
    >
      <nav
        ref={navRef}
        aria-label={label}
        // Tabbing to something outside closes it. (A mouse click on a link
        // in Safari doesn't focus the link, so relatedTarget is null then;
        // that case must not close the menu before the click lands.)
        onBlur={(event) => {
          const next = event.relatedTarget as Node | null;
          if (open && next && !navRef.current?.contains(next)) changeOpen(false);
        }}
        className="flex flex-col items-center gap-2"
      >
        {/* The other sections: a slim pill that slides up and fades in.
            Scrolls sideways inside itself on narrow phones. */}
        <ul
          ref={rowRef}
          id="floating-nav-links"
          inert={!open}
          className={`flex max-w-full overflow-x-auto rounded-full border border-border bg-card/90 p-1 backdrop-blur-md [scrollbar-width:none] transition-[opacity,translate] duration-200 ease-out motion-reduce:translate-y-0 motion-reduce:duration-150 [&::-webkit-scrollbar]:hidden ${
            open ? "pointer-events-auto opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          {otherItems.map((item) => (
            <li key={item.target} className="shrink-0">
              <a
                href={`#${item.target}`}
                onClick={(event) => goTo(event, item.target)}
                className="flex h-9 items-center rounded-full px-3 text-xs font-medium whitespace-nowrap text-muted hover:bg-(--nav-hover) hover:text-text focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* The pill: the current section and one dot per section. */}
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls="floating-nav-links"
          aria-label={`${currentName}, ${hint}`}
          // A click from Enter/Space has detail 0; a mouse click doesn't.
          onClick={(event) =>
            changeOpen(!open, open ? null : { to: "row", keyboard: event.detail === 0 })
          }
          className="pointer-events-auto flex min-h-11 items-center gap-3 rounded-full border border-border bg-card/90 px-4 text-xs font-medium text-text backdrop-blur-md hover:bg-(--nav-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:text-sm"
        >
          {currentName}
          <span aria-hidden="true" className="flex gap-1">
            {sections.map((section) => (
              <span
                key={section.id}
                className={`size-1.5 rounded-full transition-colors ${
                  section.id === current ? "bg-accent" : "bg-faint"
                }`}
              />
            ))}
          </span>
        </button>
      </nav>
    </div>
  );
}
