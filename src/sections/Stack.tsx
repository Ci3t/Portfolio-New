import { KnowledgeGlobe } from "@/components/KnowledgeGlobe";
import { Reveal } from "@/components/Reveal";
import { SectionShell } from "@/components/SectionShell";
import { SkillsTabs } from "@/components/SkillsTabs";
import { TechLabel } from "@/components/TechLabel";
import { skillCategories } from "@/data/skills";

export function Stack() {
  return (
    <SectionShell id="stack" className="border-t border-terminal-dim relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_right,var(--color-secondary-container)_0%,transparent_50%)] opacity-5 mix-blend-screen" />
      
      <div className="mb-16 relative z-10">
        <Reveal variant="mask">
          <TechLabel className="mb-4 block text-secondary">
            {"// SKILLS"}
          </TechLabel>
        </Reveal>
        <Reveal variant="mask" delay={0.1}>
          <h2 className="font-display text-headline-lg text-high-def-white">
            Tech <span className="text-secondary drop-shadow-[0_0_12px_rgba(var(--color-primary-rgb),0.32)]">Stack</span>
          </h2>
        </Reveal>
      </div>

      <div className="grid gap-16 lg:grid-cols-2 relative z-10 items-center">
        <Reveal className="order-2 lg:order-1">
          <SkillsTabs categories={skillCategories} />
        </Reveal>
        <Reveal delay={0.2} className="order-1 lg:order-2 flex justify-center">
          <KnowledgeGlobe />
        </Reveal>
      </div>
    </SectionShell>
  );
}
