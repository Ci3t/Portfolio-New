"use client";

import { SectionShell } from "@/components/SectionShell";
import { TechLabel } from "@/components/TechLabel";
import { recommendation } from "@/data/recommendation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, FileText, Quote } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function Recommendation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const highlightRefs = useRef<(HTMLDivElement | null)[]>([]);
  const quoteRef = useRef<SVGSVGElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const pulseRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 74%",
          end: "bottom 18%",
          toggleActions: "play reverse play reverse",
        },
      });

      timeline
        .fromTo(
          titleRef.current,
          { yPercent: 90, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.65 },
          0
        )
        .fromTo(
          summaryRef.current,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 },
          0.12
        )
        .fromTo(
          statsRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          0.22
        )
        .fromTo(
          cardRef.current,
          {
            clipPath: "inset(0 0 100% 0)",
            y: 70,
            opacity: 0.35,
          },
          {
            clipPath: "inset(0 0 0% 0)",
            y: 0,
            opacity: 1,
            duration: 0.85,
          },
          0.24
        )
        .fromTo(
          quoteRef.current,
          { rotate: -18, scale: 0.55, opacity: 0 },
          { rotate: 0, scale: 1, opacity: 1, duration: 0.45 },
          0.65
        )
        .fromTo(
          highlightRefs.current,
          { x: 48, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.14, duration: 0.5 },
          0.72
        )
        .fromTo(
          buttonRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35 },
          1.06
        );

      gsap.fromTo(
        sweepRef.current,
        { xPercent: -110 },
        {
          xPercent: 110,
          duration: 1.6,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 70%",
            end: "bottom 25%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.to(pulseRefs.current, {
        scale: 1.55,
        opacity: 0.35,
        duration: 0.9,
        ease: "sine.inOut",
        stagger: 0.16,
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: sectionRef }
  );

  return (
    <SectionShell
      id="recommendation"
      className="border-t border-terminal-dim bg-surface-container-lowest"
    >
      <div ref={sectionRef} className="relative">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <TechLabel dim className="mb-4 block">
              {"// REFERENCE"}
            </TechLabel>
            <div className="overflow-hidden pb-2">
              <h2 ref={titleRef} className="font-display text-headline-lg text-high-def-white">
                Recommendation
              </h2>
            </div>
            <p ref={summaryRef} className="mt-5 max-w-xl text-body-md text-on-surface-variant">
              {recommendation.summary}
            </p>

            <div className="mt-8 flex gap-3" aria-hidden="true">
              {[0, 1, 2].map((item) => (
                <span
                  key={item}
                  ref={(element) => {
                    pulseRefs.current[item] = element;
                  }}
                  className="h-2 w-8 border border-primary/40 bg-primary/10"
                />
              ))}
            </div>

            <div
              ref={statsRef}
              className="mt-8 grid max-w-md grid-cols-3 border border-terminal-dim font-mono text-[10px] uppercase tracking-[0.14em] text-on-surface-variant"
            >
              <div className="border-r border-terminal-dim p-3">
                <span className="block text-primary">Source</span>
                Samplead
              </div>
              <div className="border-r border-terminal-dim p-3">
                <span className="block text-success">Type</span>
                Letter
              </div>
              <div className="p-3">
                <span className="block text-high-def-white">Proof</span>
                PDF
              </div>
            </div>
          </div>

          <article
            ref={cardRef}
            className="relative overflow-hidden border border-terminal-dim bg-brushed-obsidian p-6 md:p-8"
          >
            <div className="pointer-events-none absolute inset-0 grid-texture opacity-20" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(var(--color-primary-rgb),0.1),transparent_32%),radial-gradient(circle_at_82%_100%,rgba(var(--color-success-rgb),0.08),transparent_34%)]" />
            <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div
              ref={sweepRef}
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-primary/18 to-transparent"
            />
            <div className="relative">
              <div className="mb-8 flex items-start justify-between gap-6 border-b border-terminal-dim pb-5">
                <div>
                  <div className="flex items-center gap-3 font-mono text-label-technical text-primary">
                    <FileText className="h-4 w-4" />
                    {recommendation.title}
                  </div>
                  <h3 className="mt-3 font-display text-headline-md text-high-def-white">
                    {recommendation.company}
                  </h3>
                </div>
                <Quote ref={quoteRef} className="h-9 w-9 text-success/70" aria-hidden="true" />
              </div>

              <div className="grid gap-3">
                {recommendation.highlights.map((highlight, index) => (
                  <div
                    key={highlight}
                    ref={(element) => {
                      highlightRefs.current[index] = element;
                    }}
                    className="group flex gap-3 border border-terminal-dim bg-surface-container-low/70 p-4 text-body-md text-on-surface-variant transition-colors hover:border-primary/70 hover:text-on-surface"
                  >
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 bg-success shadow-[0_0_14px_rgba(var(--color-success-rgb),0.4)] transition-transform group-hover:scale-150" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              <a
                ref={buttonRef}
                href={recommendation.file}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-8 inline-flex items-center gap-3 border border-primary/50 px-5 py-3 font-mono text-label-technical text-primary transition-colors hover:bg-primary hover:text-on-primary"
              >
                Read the letter
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </SectionShell>
  );
}
