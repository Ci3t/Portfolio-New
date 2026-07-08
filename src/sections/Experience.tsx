"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/Reveal";
import { SectionShell } from "@/components/SectionShell";
import { TechLabel } from "@/components/TechLabel";
import { experience } from "@/data/experience";

gsap.registerPlugin(ScrollTrigger);

const colors = ["#2ff3d7", "#39d353", "#2ff3d7"];

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current || !lineRef.current) return;

    // Line draw animation
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      }
    );

    // Node glows
    nodesRef.current.forEach((node, i) => {
      if (!node) return;
      const color = colors[i % colors.length];
      
      gsap.to(node, {
        boxShadow: `0 0 20px ${color}`,
        backgroundColor: color,
        scrollTrigger: {
          trigger: node,
          start: "top center",
          end: "bottom center",
          toggleActions: "play reverse play reverse",
        },
      });
    });
  }, { scope: containerRef });

  return (
    <SectionShell id="experience" className="border-t border-terminal-dim bg-surface-container-lowest">
      <div className="mb-12">
        <Reveal variant="mask">
          <TechLabel dim className="mb-2 block">
            {"// WORK HISTORY"}
          </TechLabel>
        </Reveal>
        <Reveal variant="mask" delay={0.1}>
          <h2 className="font-display text-headline-lg text-high-def-white">Experience</h2>
        </Reveal>
      </div>

      <div className="relative" ref={containerRef}>
        <div className="absolute left-0 top-0 bottom-0 w-px bg-terminal-dim md:left-1/2 md:-translate-x-1/2">
          <div 
            ref={lineRef}
            className="w-full h-full origin-top"
            style={{ background: `linear-gradient(to bottom, ${colors[0]}, ${colors[1]}, ${colors[2]})` }}
          />
        </div>

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
                ref={(el) => {
                  nodesRef.current[index] = el;
                }}
                className="absolute left-0 top-6 hidden h-3 w-3 -translate-x-[5px] md:-translate-x-1.5 bg-terminal-dim md:left-1/2 lg:block z-10 transition-colors duration-300"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

