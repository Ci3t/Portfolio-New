import { KnowledgeGlobe } from "@/components/KnowledgeGlobe";
import { Reveal } from "@/components/Reveal";
import { SectionShell } from "@/components/SectionShell";
import { SkillsTabs } from "@/components/SkillsTabs";
import { TechLabel } from "@/components/TechLabel";
import { skillCategories } from "@/data/skills";

export function Stack() {
  return (
    <SectionShell id="stack" className="border-t border-terminal-dim">
      <div className="mb-12">
        <Reveal variant="mask">
          <TechLabel dim className="mb-2 block">
            {"// CAPABILITIES"}
          </TechLabel>
        </Reveal>
        <Reveal variant="mask" delay={0.1}>
          <h2 className="font-display text-headline-lg text-high-def-white">Stack</h2>
        </Reveal>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <SkillsTabs categories={skillCategories} />
        </Reveal>
        <Reveal delay={0.2}>
          <KnowledgeGlobe />
        </Reveal>
      </div>
    </SectionShell>
  );
}
