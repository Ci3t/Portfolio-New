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
        "group border border-terminal-dim bg-surface-container-lowest transition-colors hover:border-primary",
        featured && "lg:col-span-2"
      )}
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <ProjectFrame label={project.title} />
      <div className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-headline-md text-high-def-white">{project.title}</h3>
            <p className="mt-1 font-mono text-label-technical text-primary">{project.subtitle}</p>
          </div>
          <div className="flex gap-2">
            {project.liveUrl ? (
              <SafeLink
                href={project.liveUrl}
                className="inline-flex h-10 w-10 items-center justify-center border border-terminal-dim text-on-surface-variant transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={`Open ${project.title} demo`}
              >
                <ExternalLink className="h-4 w-4" />
              </SafeLink>
            ) : null}
            {project.codeUrl ? (
              <SafeLink
                href={project.codeUrl}
                className="inline-flex h-10 w-10 items-center justify-center border border-terminal-dim text-on-surface-variant transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={`Open ${project.title} source code`}
              >
                <GitHubIcon className="h-4 w-4" />
              </SafeLink>
            ) : null}
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-body-md text-on-surface-variant">{project.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="border border-terminal-dim px-2 py-1 font-mono text-label-technical text-on-surface-variant"
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
