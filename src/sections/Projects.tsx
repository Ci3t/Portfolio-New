import { ProjectPanel } from "@/components/ProjectPanel";
import { Reveal } from "@/components/Reveal";
import { SectionShell } from "@/components/SectionShell";
import { TechLabel } from "@/components/TechLabel";
import { projects } from "@/data/projects";

export function Projects() {
  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <SectionShell id="projects" className="border-t border-terminal-dim">
      <div className="mb-12">
        <Reveal variant="mask">
          <TechLabel dim className="mb-2 block">
            {"// DEPLOYMENTS"}
          </TechLabel>
        </Reveal>
        <Reveal variant="mask" delay={0.1}>
          <h2 className="font-display text-headline-lg text-high-def-white">Projects</h2>
        </Reveal>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {featured ? (
          <Reveal>
            <ProjectPanel project={featured} featured />
          </Reveal>
        ) : null}
        {others.map((project, index) => (
          <Reveal key={project.id} delay={0.15 * (index + 1)}>
            <ProjectPanel project={project} />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
