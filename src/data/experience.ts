import type { ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    id: "appleseeds",
    company: "Appleseeds",
    role: "Full Stack / Frontend Instructor",
    dates: "2023 – 2024",
    bullets: [
      "Led MERN stack bootcamps for 25+ students across a 720-hour program.",
      "Delivered lectures and hands-on projects in React, TypeScript, Next.js, Redux Toolkit, RTK Query, and Tailwind CSS.",
      "Designed exercises, assessments, and real-world practice systems.",
    ],
    signal: "Teaching / Leadership",
  },
  {
    id: "samplead",
    company: "Samplead",
    role: "Fullstack Developer Intern",
    dates: "Jan 2023 – Apr 2023",
    bullets: [
      "Integrated AWS services with Slack for real-time event notifications.",
      "Worked with DB, EC2, and cluster alerts in an event-driven workflow.",
      "Used AWS EventBridge and Lambda to route and surface critical events.",
    ],
    signal: "Cloud Events / Automation",
  },
  {
    id: "strauss",
    company: "Strauss Group",
    role: "Help Desk Tier 2",
    dates: "2021 – 2022",
    bullets: [
      "Provided hardware and software support across departments.",
      "Documented resolutions and maintained consistent service quality.",
    ],
    signal: "Troubleshooting / Support",
  },
];
