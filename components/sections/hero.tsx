import { Container } from "@/components/ui/container";
import { profile } from "@/content/profile";
import { TorontoTime } from "./toronto-time";

export function Hero() {
  const [firstName, lastName] = profile.name.split(" ");

  return (
    // pb-28 keeps the bottom nav from covering the intro on short screens.
    <section id="home" className="flex min-h-svh flex-col pt-6 pb-28 sm:pt-8">
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

        <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
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
      </Container>
    </section>
  );
}
