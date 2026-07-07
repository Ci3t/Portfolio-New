"use client";

import { SkillBar } from "@/components/SkillBar";
import type { SkillCategory } from "@/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SkillsTabsProps {
  categories: SkillCategory[];
}

export function SkillsTabs({ categories }: SkillsTabsProps) {
  const [active, setActive] = useState(categories[0]?.id ?? "");
  const activeCategory = categories.find((c) => c.id === active) ?? categories[0];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Skill categories">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={active === category.id}
            onClick={() => setActive(category.id)}
            className={cn(
              "border px-4 py-2 font-mono text-label-technical transition-colors focus-visible:ring-2 focus-visible:ring-primary",
              active === category.id
                ? "border-primary bg-primary text-on-primary"
                : "border-terminal-dim text-on-surface-variant hover:border-primary hover:text-primary"
            )}
          >
            {category.title}
          </button>
        ))}
      </div>

      {activeCategory ? (
        <div role="tabpanel" className="space-y-5">
          {activeCategory.skills.map((skill, index) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              level={skill.level}
              delay={0.05 * index}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
