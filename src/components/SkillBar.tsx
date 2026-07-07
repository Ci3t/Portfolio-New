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
    <div className="space-y-1">
      <div className="flex items-center justify-between font-mono text-label-technical">
        <span className="text-on-surface">{name}</span>
        <span className="text-primary">{level}%</span>
      </div>
      <div className="h-1 w-full bg-surface-container-high">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: reduced ? `${level}%` : "0%" }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
