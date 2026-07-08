"use client";

import { SafeLink } from "@/components/SafeLink";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "./icons";
import { ProjectFrame } from "./ProjectFrame";
import { useRef, MouseEvent } from "react";

interface ProjectPanelProps {
  project: Project;
  featured?: boolean;
}

export function ProjectPanel({ project, featured }: ProjectPanelProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Mouse position values for the spotlight and tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tilt
  const rotateX = useSpring(useMotionValue(0), { damping: 30, stiffness: 100 });
  const rotateY = useSpring(useMotionValue(0), { damping: 30, stiffness: 100 });

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (reduced) return;
    
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;

    // Update spotlight
    mouseX.set(x);
    mouseY.set(y);

    // Update tilt (max 5 degrees)
    const maxTilt = 5;
    const tiltX = (y / height - 0.5) * -maxTilt;
    const tiltY = (x / width - 0.5) * maxTilt;
    
    rotateX.set(tiltX);
    rotateY.set(tiltY);
  }

  function handleMouseLeave() {
    if (reduced) return;
    // Reset tilt
    rotateX.set(0);
    rotateY.set(0);
    // Move spotlight away
    mouseX.set(-1000);
    mouseY.set(-1000);
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative flex flex-col bg-[#000000] border border-white/10 rounded-xl overflow-hidden transition-all duration-300 shadow-2xl",
        featured && "lg:col-span-2"
      )}
      style={{
        transformStyle: "preserve-3d",
        rotateX: reduced ? 0 : rotateX,
        rotateY: reduced ? 0 : rotateY,
      }}
    >
      {/* Spotlight Hover Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(57, 255, 20, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      {/* Animated Border Reveal */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 border border-[#39ff14]/50 z-20"
        style={{
          maskImage: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              black,
              transparent
            )
          `,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              black,
              transparent
            )
          `,
        }}
      />

      <div className="relative z-10 w-full overflow-hidden border-b border-white/5 rounded-t-xl transform-gpu" style={{ transform: "translateZ(30px)" }}>
        <ProjectFrame label={project.title} imageUrl={project.imageUrl} />
      </div>
      
      <div className="p-6 relative z-10 flex flex-col flex-1 transform-gpu" style={{ transform: "translateZ(40px)" }}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="h-1.5 w-1.5 bg-[#ffbf00] animate-pulse rounded-full shadow-[0_0_8px_rgba(255,191,0,0.8)]" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#00ffff]/80 drop-shadow-[0_0_5px_rgba(0,255,255,0.4)]">
                Sys.Op_{project.id || project.title.substring(0,3).toUpperCase()}
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-white group-hover:text-[#39ff14] transition-colors duration-300">
              {project.title}
            </h3>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[#ffbf00]/80">
              {project.subtitle}
            </p>
          </div>
          <div className="flex gap-2">
            {project.liveUrl ? (
              <SafeLink
                href={project.liveUrl}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/50 transition-all hover:border-[#39ff14] hover:bg-[#39ff14]/10 hover:text-[#39ff14] hover:shadow-[0_0_15px_rgba(57,255,20,0.3)]"
                aria-label={`Open ${project.title} demo`}
              >
                <ArrowUpRight className="h-4 w-4" />
              </SafeLink>
            ) : null}
            {project.codeUrl ? (
              <SafeLink
                href={project.codeUrl}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/50 transition-all hover:border-[#00ffff] hover:bg-[#00ffff]/10 hover:text-[#00ffff] hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                aria-label={`Open ${project.title} source code`}
              >
                <GitHubIcon className="h-4 w-4" />
              </SafeLink>
            ) : null}
          </div>
        </div>
        
        <p className="mt-5 text-[14px] leading-relaxed text-white/70 font-light max-w-2xl group-hover:text-white/90 transition-colors">
          {project.description}
        </p>
        
        <div className="mt-auto pt-8 flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <span
              key={tag}
              className="rounded-sm border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-[#00ffff]/70 transition-all group-hover:border-[#00ffff]/30 group-hover:bg-[#00ffff]/5"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {tag}
            </span>
          ))}
        </div>
        
        {project.placeholder ? (
          <p className="mt-4 font-mono text-xs text-[#ffbf00]/80">
            [!] PLACEHOLDER_DATA // UPDATES_PENDING
          </p>
        ) : null}
      </div>
    </motion.article>
  );
}
