import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "svarog-tracer",
    title: "Svarog Tracer",
    subtitle: "Live prediction & tracing engine",
    description:
      "A live game-analysis and prediction tool with custom calculations and accuracy-focused logic. Built to trace, calculate, and surface high-confidence outcomes through a clean interface.",
    tags: ["Next.js", "TypeScript", "Algorithms", "UI Engineering"],
    liveUrl: undefined,
    codeUrl: undefined,
    featured: true,
    placeholder: true,
  },
  {
    id: "zerotwo",
    title: "ZeroTwo",
    subtitle: "AI assistant SaaS platform",
    description:
      "A paid AI assistant platform that generates outputs through OpenAI and Replicate, with secure payments, persistent user data, and a polished product surface.",
    tags: ["Next.js 13", "Prisma", "MySQL", "Zustand", "Stripe", "OpenAI", "Replicate"],
    liveUrl: undefined,
    codeUrl: undefined,
    featured: false,
    placeholder: true,
  },
  {
    id: "formai",
    title: "FormAi",
    subtitle: "AI survey form generator",
    description:
      "An AI-powered form builder that turns a prompt into a previewable survey, collects responses, and exports them. Focused on generation flow, UI state, and data handling.",
    tags: ["Next.js", "DrizzleORM", "shadcn/ui", "Stripe", "MySQL"],
    liveUrl: undefined,
    codeUrl: undefined,
    featured: false,
    placeholder: true,
  },
];
