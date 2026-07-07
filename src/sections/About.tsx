import { CapabilityCard } from "@/components/CapabilityCard";
import { HoverLift } from "@/components/HoverLift";
import { Reveal } from "@/components/Reveal";
import { SectionShell } from "@/components/SectionShell";
import { TechLabel } from "@/components/TechLabel";
import { capabilities } from "@/data/about";

export function About() {
  return (
    <SectionShell id="about" className="border-t border-terminal-dim bg-surface-container-lowest">
      <div className="mb-12">
        <Reveal variant="mask">
          <TechLabel dim className="mb-2 block">
            {"// OPERATOR PROFILE"}
          </TechLabel>
        </Reveal>
        <Reveal variant="mask" delay={0.1}>
          <h2 className="font-display text-headline-lg text-high-def-white">About</h2>
        </Reveal>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal delay={0.2} className="space-y-6 text-body-md text-on-surface-variant">
          <p>
            I am a full-stack developer who likes turning rough product ideas into clean, usable web
            apps. My work sits between interface craft and backend plumbing: React and Next.js on
            the surface, Node.js, databases, and third-party APIs underneath.
          </p>
          <p>
            I have shipped AI SaaS projects, taught frontend and full-stack bootcamps at Appleseeds,
            and worked with event-driven cloud integrations. I communicate in three languages and
            enjoy explaining complex systems to non-technical audiences.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4 font-mono text-label-technical text-on-surface-variant">
            <div>
              <span className="text-primary">AR</span> Native
            </div>
            <div>
              <span className="text-primary">HE</span> Native
            </div>
            <div>
              <span className="text-primary">EN</span> Fluent
            </div>
            <div>
              <span className="text-primary">LOC</span> Available remote / onsite
            </div>
          </div>
        </Reveal>

        <div className="space-y-0 border border-terminal-dim">
          {capabilities.map((capability, index) => (
            <HoverLift key={capability.id}>
              <Reveal delay={0.1 * index}>
                <CapabilityCard capability={capability} />
              </Reveal>
            </HoverLift>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
