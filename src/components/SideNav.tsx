"use client";

import { useActiveSection } from "@/components/ActiveSectionProvider";
import { SmoothAnchor } from "@/components/SmoothAnchor";
import { contact } from "@/data/contact";
import { navItems } from "@/data/navigation";
import { cn } from "@/lib/utils";
import {
  Activity,
  Code2,
  Fingerprint,
  History,
  LayoutGrid,
  Radio,
  Send,
  User,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  hero: <Radio className="h-4 w-4" />,
  about: <User className="h-4 w-4" />,
  projects: <LayoutGrid className="h-4 w-4" />,
  experience: <History className="h-4 w-4" />,
  stack: <LayoutGrid className="h-4 w-4" />,
  contact: <Send className="h-4 w-4" />,
};

export function SideNav() {
  const { activeSection } = useActiveSection();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-full w-64 flex-col border-r border-terminal-dim bg-brushed-obsidian md:flex">
      <div className="px-6 pb-10 pt-24">
        <SmoothAnchor
          href="#hero"
          className="block font-display text-headline-md text-primary transition-colors hover:text-primary-fixed"
        >
          R. ALI
        </SmoothAnchor>
        <div className="mt-1 font-mono text-label-technical text-on-surface-variant">
          FS / AI ENGINEER
        </div>
        <SmoothAnchor
          href="#contact"
          className="mt-6 block w-full border border-transparent bg-primary-fixed-dim px-4 py-3 text-center font-mono text-label-technical text-background transition-colors hover:border-primary-fixed-dim hover:bg-wet-asphalt hover:text-primary focus-visible:ring-2 focus-visible:ring-primary"
        >
          ESTABLISH CONNECTION
        </SmoothAnchor>
      </div>

      <nav className="flex-1 font-mono text-label-technical" aria-label="Primary">
        {navItems.map((item) => {
          const active = activeSection === item.id;
          return (
            <SmoothAnchor
              key={item.id}
              href={item.href}
              className={cn(
                "relative flex items-center gap-4 px-6 py-3 transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
                active
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
              )}
              aria-current={active ? "page" : undefined}
            >
              {active ? (
                <span className="absolute left-0 top-0 h-full w-1 bg-on-primary" />
              ) : null}
              {iconMap[item.id] ?? <Fingerprint className="h-4 w-4" />}
              {item.label}
            </SmoothAnchor>
          );
        })}
      </nav>

      <div className="border-t border-terminal-dim px-4 py-4">
        <div className="flex items-center gap-3 px-4 py-2 font-mono text-label-technical text-on-surface-variant">
          <Activity className="h-4 w-4" />
          <span className="relative flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-primary-fixed-dim" />
            System Status
          </span>
        </div>
        {contact.actions
          .filter((a) => a.kind === "github")
          .map((action) => (
            <a
              key={action.id}
              href={action.href ?? "#"}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-3 px-4 py-2 font-mono text-label-technical text-on-surface-variant transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Code2 className="h-4 w-4" />
              {action.label}
            </a>
          ))}
      </div>
    </aside>
  );
}
