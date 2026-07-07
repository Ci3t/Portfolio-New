import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 92 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Redux Toolkit", level: 85 },
      { name: "RTK Query", level: 82 },
      { name: "Zustand", level: 80 },
      { name: "shadcn/ui", level: 85 },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express", level: 86 },
      { name: "REST APIs", level: 90 },
      { name: "Prisma ORM", level: 84 },
      { name: "DrizzleORM", level: 78 },
      { name: "Zod", level: 85 },
    ],
  },
  {
    id: "data",
    title: "Data",
    skills: [
      { name: "MongoDB", level: 82 },
      { name: "MySQL", level: 80 },
      { name: "PostgreSQL", level: 75 },
    ],
  },
  {
    id: "integrations",
    title: "Product Integrations",
    skills: [
      { name: "Stripe", level: 78 },
      { name: "OpenAI API", level: 88 },
      { name: "Replicate API", level: 75 },
    ],
  },
  {
    id: "tooling",
    title: "Tooling",
    skills: [
      { name: "Git", level: 88 },
      { name: "Docker", level: 70 },
    ],
  },
  {
    id: "systems",
    title: "Systems Background",
    skills: [
      { name: "Help Desk Tier 2", level: 85 },
      { name: "Computer Maintenance", level: 80 },
      { name: "Network Management", level: 75 },
      { name: "Microsoft MCSA", level: 72 },
    ],
  },
];
