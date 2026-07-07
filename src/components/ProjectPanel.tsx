"use client";

import { SafeLink } from "@/components/SafeLink";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "./icons";
import { ProjectFrame } from "./ProjectFrame";

interface ProjectPanelProps {
  project: Project;
  featured?: boolean;
}

export function ProjectPanel({ project, featured }: ProjectPanelProps) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      className={cn(
        "group relative bg-black/40 border border-white/5 backdrop-blur-sm transition-all hover:border-white/20 overflow-hidden",
        featured && "lg:col-span-2"
      )}
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <ProjectFrame label={project.title} imageUrl={project.imageUrl} />
      <div className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="h-1.5 w-1.5 bg-primary animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-primary/70">Sys.Op_{project.id || project.title.substring(0,3).toUpperCase()}</span>
            </div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-white">{project.title}</h3>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-primary/80">{project.subtitle}</p>
          </div>
          <div className="flex gap-2">
            {project.liveUrl ? (
              <SafeLink
                href={project.liveUrl}
                className="inline-flex h-10 w-10 items-center justify-center border border-white/10 bg-black/40 text-white/50 transition-all hover:border-white hover:text-white"
                aria-label={`Open ${project.title} demo`}
              >
                <ExternalLink className="h-4 w-4" />
              </SafeLink>
            ) : null}
            {project.codeUrl ? (
              <SafeLink
                href={project.codeUrl}
                className="inline-flex h-10 w-10 items-center justify-center border border-white/10 bg-black/40 text-white/50 transition-all hover:border-white hover:text-white"
                aria-label={`Open ${project.title} source code`}
              >
                <GitHubIcon className="h-4 w-4" />
              </SafeLink>
            ) : null}
          </div>
        </div>
        <p className="mt-5 max-w-2xl text-[14px] leading-relaxed text-white/60 font-light">{project.description}</p>
        <div className="mt-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="border border-white/5 bg-white/[0.02] px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-white/40"
            >
              {tag}
            </span>
          ))}
        </div>
        {project.placeholder ? (
          <p className="mt-4 font-mono text-label-technical text-on-surface-variant/60">
            Links and screenshots are placeholders — updates coming soon.
          </p>
        ) : null}
      </div>
    </motion.article>
  );
}
