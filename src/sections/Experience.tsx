import { Reveal } from "@/components/Reveal";
import { SectionShell } from "@/components/SectionShell";
import { TechLabel } from "@/components/TechLabel";
import { TimelineLine } from "@/components/TimelineLine";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <SectionShell id="experience" className="border-t border-terminal-dim bg-surface-container-lowest">
      <div className="mb-12">
        <Reveal variant="mask">
          <TechLabel dim className="mb-2 block">
            {"// CHRONICLES"}
          </TechLabel>
        </Reveal>
        <Reveal variant="mask" delay={0.1}>
          <h2 className="font-display text-headline-lg text-high-def-white">Experience</h2>
        </Reveal>
      </div>

      <div className="relative">
        <TimelineLine />

        <div className="space-y-0 lg:space-y-16">
          {experience.map((item, index) => (
            <div key={item.id} className="relative grid gap-6 lg:grid-cols-2">
              <div
                className={`${
                  index % 2 === 0
                    ? "lg:col-start-1 lg:pr-16"
                    : "lg:col-start-2 lg:pl-16"
                }`}
              >
                <Reveal delay={0.15 * index}>
                  <div className="border border-terminal-dim bg-surface-container-low p-6 transition-colors hover:border-primary hover:bg-surface-container">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="font-mono text-label-technical text-primary">
                          {item.dates}
                        </span>
                        <h3 className="mt-1 font-display text-headline-md text-high-def-white">
                          {item.company}
                        </h3>
                      </div>
                      <span className="border border-terminal-dim px-2 py-1 font-mono text-label-technical text-on-surface-variant">
                        {item.signal}
                      </span>
                    </div>
                    <p className="mt-2 font-mono text-label-technical text-on-surface-variant">
                      {item.role}
                    </p>
                    <ul className="mt-4 space-y-2 text-body-md text-on-surface-variant">
                      {item.bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 bg-primary-fixed-dim" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>

              <div
                className="absolute left-0 top-6 hidden h-3 w-3 -translate-x-1.5 bg-primary md:left-1/2 lg:block"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
