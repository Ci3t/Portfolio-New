"use client";

import { skillCategories } from "@/data/skills";

export function KnowledgeGlobeFallback() {
  const labels = skillCategories.flatMap((category) =>
    category.skills.slice(0, 2).map((skill) => skill.name)
  );

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-md overflow-hidden border border-terminal-dim bg-brushed-obsidian p-6 ambient-glow"
      aria-label="Knowledge core"
    >
      <div className="absolute left-4 top-4 z-10 font-mono text-label-technical text-primary">
        KNOWLEDGE CORE
      </div>
      <div className="absolute inset-0 grid-texture opacity-30" />
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent opacity-60 blur-3xl" />
      <div className="absolute inset-[8%] rounded-full border border-primary/30" />
      <div className="absolute inset-[18%] rounded-full border border-secondary/20" />
      <div className="absolute inset-[29%] rounded-full border border-terminal-dim" />
      <div className="absolute inset-[12%] animate-spin-slow rounded-full border border-dashed border-primary/30" />
      <div className="absolute inset-[23%] animate-reverse-spin rounded-full border border-dashed border-secondary/25" />
      <div className="absolute inset-0 animate-spin-slow opacity-80">
        <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
        <div className="absolute bottom-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
        <div className="absolute left-0 top-1/2 h-1/2 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-primary/70 to-transparent" />
        <div className="absolute right-0 top-1/2 h-1/2 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-primary/70 to-transparent" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex h-28 w-28 items-center justify-center border border-primary/40 bg-background/70 shadow-[0_0_40px_rgba(251,188,0,0.18)]">
          <span className="font-display text-headline-md text-high-def-white">CORE</span>
        </div>
      </div>
      {labels.slice(0, 8).map((label, index) => {
        const angle = (index / 8) * Math.PI * 2;
        const x = 50 + Math.cos(angle) * 38;
        const y = 50 + Math.sin(angle) * 38;

        return (
          <span
            key={label}
            aria-hidden="true"
            className="absolute border border-primary/30 bg-background/80 px-2 py-1 font-mono text-[10px] text-primary backdrop-blur"
            style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
          >
            CORE {label}
          </span>
        );
      })}
      <div className="pointer-events-none absolute inset-0 scanlines opacity-30" />
      <ul className="sr-only">
        {skillCategories.map((category) => (
          <li key={category.id}>{category.title}</li>
        ))}
      </ul>
    </div>
  );
}
