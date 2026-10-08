// A dot every --dot-spacing (28px), drawn with a repeating background. The
// hard stop (same value twice) gives tiny crisp dots instead of soft blobs.
const dotPattern = (color: string, size: string) =>
  `radial-gradient(circle, ${color} ${size}, transparent ${size})`;

const spacing = "var(--dot-spacing) var(--dot-spacing)";

// Over the bottom 35% of the hero, the faint dots fade to half strength:
// 0.10 × 50% = 0.05, the same as the page grid below (--dot-page), so the
// two grids meet with no visible edge.
const fadeToPage = "linear-gradient(to bottom, black 65%, rgb(0 0 0 / 0.5) 100%)";

// Shows the bright dots only within 220px of the cursor, fading out to
// the edge. --hx/--hy come from PointerTracker; the -999px defaults keep
// the circle off-screen until the mouse moves.
const nearCursor =
  "radial-gradient(circle 220px at var(--hx, -999px) var(--hy, -999px), black, transparent)";

// Dot grid behind the hero: faint everywhere, brighter near the cursor.
// Hidden on touch screens (see .hero-dots in globals.css). Masks are set
// in both spellings so Safari gets them too.
export function HeroDots() {
  return (
    <div
      aria-hidden="true"
      data-hero-dots
      className="hero-dots pointer-events-none absolute inset-0 -z-10"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: dotPattern("var(--dot)", "1px"),
          backgroundSize: spacing,
          maskImage: fadeToPage,
          WebkitMaskImage: fadeToPage,
        }}
      />
      <div
        className="hero-dots-lit absolute inset-0"
        style={{
          backgroundImage: dotPattern("var(--dot-lit)", "1.2px"),
          backgroundSize: spacing,
          maskImage: nearCursor,
          WebkitMaskImage: nearCursor,
        }}
      />
    </div>
  );
}
