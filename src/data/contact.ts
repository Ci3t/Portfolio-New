import type { ContactAction } from "@/types";

export const contact: {
  email: string;
  headline: string;
  subline: string;
  actions: ContactAction[];
} = {
  email: "ranigfx@gmail.com",
  headline: "Contact",
  subline: "Available for frontend, full-stack, and AI product roles.",
  actions: [
    {
      id: "email",
      label: "Email",
      href: "mailto:ranigfx@gmail.com",
      value: "ranigfx@gmail.com",
      kind: "email",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/rani-ali-b2a78519a/",
      kind: "linkedin",
    },
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/Ci3t/",
      kind: "github",
    },
    {
      id: "contribute",
      label: "Contribute / Source",
      href: "https://github.com/Ci3t/",
      kind: "contribute",
    },
    {
      id: "recommendation",
      label: "Recommendation Letter",
      href: "/Samplead-Recommendation.pdf",
      kind: "recommendation",
    },
    {
      id: "cv",
      label: "Download CV",
      href: "/Rani-Ali-CV-8-2026.pdf",
      kind: "cv",
    },
  ],
};
