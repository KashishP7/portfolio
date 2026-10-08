import { FloatingNav } from "@/components/floating-nav";
import { LoopPlayer } from "@/components/effects/loop-player";
import { PointerTracker } from "@/components/effects/pointer-tracker";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { ScrollSpotlight } from "@/components/effects/scroll-spotlight";
import { SkipLink } from "@/components/skip-link";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Toolkit } from "@/components/sections/toolkit";
import { floatingNav, navItems, sectionHeadings, sectionOrder } from "@/content/site";

export default function Home() {
  return (
    <>
      <SkipLink />
      {/* Section order matches sectionOrder in content/site.ts. */}
      <main>
        <Hero />
        <About />
        <Projects />
        <Toolkit />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <FloatingNav
        items={navItems}
        sections={sectionOrder.map((id) => ({ id, name: sectionHeadings[id] }))}
        label={floatingNav.label}
        hint={floatingNav.hint}
      />
      <PointerTracker />
      <ScrollSpotlight />
      <ScrollReveal />
      <LoopPlayer />
    </>
  );
}
