"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface SkillBarProps {
  name: string;
  level: number;
  delay?: number;
}

export function SkillBar({ name, level, delay = 0 }: SkillBarProps) {
  const reduced = useReducedMotion();

  return (
    <div className="group space-y-2">
      <div className="flex items-center justify-between font-mono text-label-technical">
        <span className="text-on-surface transition-colors group-hover:text-secondary">{name}</span>
        <span className="text-secondary drop-shadow-[0_0_8px_var(--color-secondary)]">{level}%</span>
      </div>
      <div className="h-1.5 w-full bg-surface-container-high overflow-hidden rounded-full relative">
        <motion.div
          className="h-full bg-secondary shadow-[0_0_12px_var(--color-secondary)] rounded-full relative"
          initial={{ width: reduced ? `${level}%` : "0%" }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 bg-white/20 w-full animate-[bandGlint_3s_ease-in-out_infinite]" />
        </motion.div>
      </div>
    </div>
  );
}
