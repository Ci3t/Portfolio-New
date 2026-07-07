import type { ContactAction } from "@/types";

export const contact: {
  email: string;
  headline: string;
  subline: string;
  actions: ContactAction[];
} = {
  email: "ranigfx@gmail.com",
  headline: "Secure Uplink",
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
      href: "https://www.linkedin.com/in/rani-ali/",
      kind: "linkedin",
      placeholder: true,
    },
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/Ci3t",
      kind: "github",
      placeholder: true,
    },
    {
      id: "cv",
      label: "Download CV",
      kind: "cv",
      placeholder: true,
    },
  ],
};
