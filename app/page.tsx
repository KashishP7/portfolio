import { PointerTracker } from "@/components/effects/pointer-tracker";
import { SkipLink } from "@/components/skip-link";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Toolkit } from "@/components/sections/toolkit";

export default function Home() {
  return (
    <>
      <SkipLink />
      <main>
        <Hero />
        <About />
        <Toolkit />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <PointerTracker />
    </>
  );
}
