export interface NavItem {
  id: string;
  label: string;
  href: string;
  creativeLabel?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  codeUrl?: string;
  imageUrl?: string;
  featured: boolean;
  placeholder: boolean;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  dates: string;
  bullets: string[];
  signal: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: Skill[];
}

export interface ContactAction {
  id: string;
  label: string;
  href?: string;
  value?: string;
  kind: "email" | "linkedin" | "github" | "cv" | "contribute" | "recommendation";
  placeholder?: boolean;
}

export interface Capability {
  id: string;
  title: string;
  meta: string;
  proof: string;
}
