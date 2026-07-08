"use client";

import { SkillBar } from "@/components/SkillBar";
import type { SkillCategory } from "@/types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SkillsTabsProps {
  categories: SkillCategory[];
}

export function SkillsTabs({ categories }: SkillsTabsProps) {
  const [active, setActive] = useState(categories[0]?.id ?? "");
  const activeCategory = categories.find((c) => c.id === active) ?? categories[0];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3" role="tablist" aria-label="Skill categories">
        {categories.map((category) => {
          const isActive = active === category.id;
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(category.id)}
              className={cn(
                "relative border px-5 py-2.5 font-mono text-label-technical transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary overflow-hidden",
                isActive
                  ? "border-secondary bg-secondary/10 text-secondary"
                  : "border-terminal-dim text-on-surface-variant hover:border-secondary/50 hover:text-secondary"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-secondary/10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 tracking-wider">{category.title}</span>
            </button>
          );
        })}
      </div>

      <div className="relative min-h-[300px]">
        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div
              key={activeCategory.id}
              role="tabpanel"
              className="space-y-6"
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
            >
              {activeCategory.skills.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={0.05 * index}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
