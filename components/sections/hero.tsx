import { BottomNav } from "@/components/bottom-nav";
import { Container } from "@/components/ui/container";
import { profile } from "@/content/profile";
import { TorontoTime } from "./toronto-time";

export function Hero() {
  const [firstName, lastName] = profile.name.split(" ");

  return (
    // Phones: as tall as the content. From 640px up: fills the screen, with
    // the name block centered between the top line and the nav.
    <section id="home" className="flex flex-col pt-6 pb-4 sm:min-h-svh sm:pt-8 sm:pb-6">
      <Container className="flex flex-1 flex-col">
        <div className="flex flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
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

        <div className="flex flex-col items-center pt-16 pb-12 text-center sm:flex-1 sm:justify-center sm:py-10">
          <h1 className="text-[clamp(3.5rem,14vw,10.5rem)] leading-[0.9] font-extrabold font-stretch-semi-expanded tracking-tight">
            <span className="block">{firstName}</span>{" "}
            <span className="block">{lastName}</span>
          </h1>
          <p className="mt-8 text-lg font-medium text-text-soft sm:text-xl">
            {profile.role}
          </p>
          <p className="mt-4 max-w-xl font-serif text-lg text-muted sm:text-xl">
            {profile.tagline}
          </p>
        </div>

        <BottomNav />
      </Container>
    </section>
  );
}
