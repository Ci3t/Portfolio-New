import { BackToTop } from "@/components/BackToTop";
import { GridBackground } from "@/components/GridBackground";
import { MouseTrail } from "@/components/MouseTrail";
import { NetworkBackground } from "@/components/NetworkBackground";
import { SideNav } from "@/components/SideNav";
import { Splash } from "@/components/Splash";
import { TopBar } from "@/components/TopBar";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Experience } from "@/sections/Experience";
import { Hero } from "@/sections/Hero";
import { Projects } from "@/sections/Projects";
import { Recommendation } from "@/sections/Recommendation";
import { Stack } from "@/sections/Stack";

export default function Home() {
  return (
    <>
      <Splash />
      <GridBackground />
      <NetworkBackground />
      <MouseTrail />
      <TopBar />
      <SideNav />
      <BackToTop />
      <main className="md:ml-64">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Recommendation />
        <Stack />
        <Contact />
        <footer className="border-t border-terminal-dim bg-brushed-obsidian px-5 py-8 text-center font-mono text-label-technical text-on-surface-variant md:px-16">
          Copyright 2026 Rani Ali. All systems nominal.
        </footer>
      </main>
    </>
  );
}
