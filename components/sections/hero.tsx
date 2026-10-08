import { BottomNav } from "@/components/bottom-nav";
import { HeroDots } from "@/components/effects/hero-dots";
import { RoleCycler } from "@/components/effects/role-cycler";
import { Container } from "@/components/ui/container";
import { StyledText } from "@/components/ui/styled-text";
import { heroDetails, profile } from "@/content/profile";
import { TorontoTime } from "./toronto-time";

const LETTER_STAGGER = 35; // ms between letters of the name

export function Hero() {
  const words = profile.name.split(" ");

  return (
    // Phones: as tall as the content. From 640px up: fills the screen, with
    // the name block centered between the top line and the nav.
    // relative + isolate keep the dot grid (-z-10) inside the hero, behind
    // its content. bg-bg covers the fainter page grid on <body>, so the two
    // grids don't stack up here.
    <section
      id="home"
      className="relative isolate flex flex-col bg-bg pt-6 pb-4 sm:min-h-svh sm:pt-8 sm:pb-6"
    >
      <HeroDots />
      <Container className="flex flex-1 flex-col">
        <div data-dim className="flex flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-3">
            {profile.location}
            <span className="size-1 rounded-full bg-faint" aria-hidden="true" />
            <TorontoTime />
          </p>
          <p className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-live" aria-hidden="true" />
            {profile.availability}
          </p>
        </div>

        {/* Entrance (on load, and again when the hero returns after fully
            leaving the screen; off with reduced motion, see "Hero
            entrance" in globals.css): the name appears letter by letter,
            the roles decode and cycle (RoleCycler), and on load the intro
            and dots fade in. Screen readers get the real text right away
            from the sr-only copies. */}
        <div data-dim className="flex flex-col items-center pt-16 pb-12 text-center sm:flex-1 sm:justify-center sm:py-10">
          <h1 className="text-[clamp(3.5rem,14vw,10.5rem)] leading-[0.9] font-extrabold font-stretch-semi-expanded tracking-tight">
            <span className="sr-only">{profile.name}</span>
            <span aria-hidden="true">
              {words.map((word, wordIndex) => {
                // Letters before this word, so the stagger runs across both lines.
                const offset = words.slice(0, wordIndex).join("").length;
                return (
                  <span key={word} className="block">
                    {[...word].map((letter, index) => (
                      <span
                        key={index}
                        className="hero-letter"
                        style={{ animationDelay: `${(offset + index) * LETTER_STAGGER}ms` }}
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                );
              })}
            </span>
          </h1>
          <p className="mt-8 text-lg font-medium text-text-soft sm:text-xl">
            {/* One stable label for screen readers; the cycling is visual. */}
            <span className="sr-only">{profile.roles[0]}</span>
            <RoleCycler roles={profile.roles} />
          </p>
          <p
            className="hero-fade mt-4 max-w-xl font-serif text-lg text-muted sm:text-xl"
            style={{ animationDelay: "1200ms" }}
          >
            <StyledText value={profile.tagline} />
          </p>
        </div>

        {/* Detail strip: a thin line, then three columns (left, center,
            right) on wide screens, stacked on phones. */}
        <dl data-dim className="mb-6 grid gap-5 border-t border-border pt-6 sm:mb-8 sm:grid-cols-3">
          {heroDetails.map((detail, index) => {
            const align =
              index === 0
                ? ""
                : index === heroDetails.length - 1
                  ? "sm:items-end sm:text-right"
                  : "sm:items-center sm:text-center";
            return (
              <div key={detail.label} className={`flex flex-col ${align}`}>
                <dt className="small-label">{detail.label}</dt>
                <dd className="mt-1.5 flex items-center gap-2 text-sm text-text-soft">
                  {detail.live && (
                    <span className="size-2 rounded-full bg-live" aria-hidden="true" />
                  )}
                  {detail.value}
                </dd>
              </div>
            );
          })}
        </dl>

        <BottomNav />
      </Container>
    </section>
  );
}
