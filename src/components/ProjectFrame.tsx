"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface ProjectFrameProps {
  label: string;
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ProjectFrame({ label }: ProjectFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !innerRef.current) return;

      gsap.fromTo(
        innerRef.current,
        { scale: 1.08 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "top 35%",
            scrub: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative aspect-video w-full overflow-hidden border border-terminal-dim bg-surface-container-low">
      <div
        ref={innerRef}
        className="absolute inset-0 bg-gradient-to-br from-surface-container-high via-surface-container to-brushed-obsidian"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <span className="font-display text-headline-md text-on-surface-variant/30">{label}</span>
        <span className="font-mono text-label-technical text-on-surface-variant/60">
          PREVIEW_PLACEHOLDER
        </span>
      </div>
      <div className="absolute bottom-0 left-0 border-t border-r border-terminal-dim bg-background/80 px-3 py-1 font-mono text-label-technical text-primary">
        SYS.PREVIEW
      </div>
    </div>
  );
}
