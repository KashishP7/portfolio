import { BottomNav } from "@/components/bottom-nav";
import { About } from "@/components/sections/about";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Toolkit } from "@/components/sections/toolkit";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Toolkit />
        <Projects />
      </main>
      <BottomNav />
    </>
  );
}
