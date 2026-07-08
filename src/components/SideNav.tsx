"use client";

import { useActiveSection } from "@/components/ActiveSectionProvider";
import { SmoothAnchor } from "@/components/SmoothAnchor";
import { contact } from "@/data/contact";
import { navItems } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { Activity } from "lucide-react";
import { motion } from "motion/react";

export function SideNav() {
  const { activeSection } = useActiveSection();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-full w-[280px] flex-col md:flex pointer-events-none">
      {/* Precision Spine */}
      <div className="absolute left-[39px] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      <div className="relative px-10 pb-12 pt-20 pointer-events-auto">
        <SmoothAnchor
          href="#hero"
          className="group flex flex-col focus-visible:outline-none"
        >
          <span className="font-display text-2xl font-bold tracking-tight text-white transition-transform group-hover:translate-x-1">
            R. ALI
          </span>
          <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            FS / AI Engineer
          </span>
        </SmoothAnchor>
        
        {/* Architectural Button */}
        <div className="mt-10">
          <SmoothAnchor
            href="#contact"
            className="group relative inline-flex items-center gap-4 focus-visible:outline-none"
          >
            {/* Minimal line drawing button */}
            <div className="relative flex h-10 items-center justify-center border border-white/20 bg-transparent px-4 font-mono text-[10px] uppercase tracking-widest text-white/70 transition-all duration-300 group-hover:border-primary group-hover:text-primary group-hover:bg-primary/5">
              <span className="relative z-10">Contact Me</span>
              <div className="absolute left-0 top-0 h-[1px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
              <div className="absolute bottom-0 right-0 h-[1px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
            </div>
          </SmoothAnchor>
        </div>
      </div>

      <nav className="relative flex-1 py-10 pointer-events-auto" aria-label="Primary">
        <div className="flex flex-col gap-6">
          {navItems.map((item) => {
            const active = activeSection === item.id;
            return (
              <SmoothAnchor
                key={item.id}
                href={item.href}
                className="group relative flex items-center focus-visible:outline-none h-6"
                aria-current={active ? "page" : undefined}
              >
                {/* Node on the spine */}
                <div className="absolute left-[39px] -translate-x-1/2 flex items-center justify-center">
                  <div 
                    className={cn(
                      "h-[3px] w-[3px] transition-all duration-500",
                      active ? "bg-primary scale-[2] rotate-45" : "bg-white/20 group-hover:bg-white/60"
                    )} 
                  />
                  {active && (
                    <motion.div
                      layoutId="activeSpinePulse"
                      className="absolute h-4 w-4 border border-primary/50 rotate-45"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </div>

                {/* Connecting line */}
                <div 
                  className={cn(
                    "absolute left-[39px] h-[1px] bg-gradient-to-r from-primary/50 to-transparent transition-all duration-500 origin-left",
                    active ? "w-4 scale-x-100 opacity-100" : "w-4 scale-x-0 opacity-0 group-hover:scale-x-50 group-hover:opacity-50 group-hover:from-white/30"
                  )} 
                />
                
                {/* Text Label */}
                <span 
                  className={cn(
                    "ml-[60px] font-mono text-[11px] uppercase tracking-[0.2em] transition-all duration-300",
                    active ? "text-primary translate-x-2" : "text-white/40 group-hover:text-white/80 group-hover:translate-x-1"
                  )}
                >
                  {item.label}
                </span>
              </SmoothAnchor>
            );
          })}
        </div>
      </nav>

      <div className="relative px-10 py-10 pointer-events-auto">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            <Activity className="h-3 w-3" />
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 bg-primary animate-pulse" />
              Available
            </span>
          </div>
          
          <div className="flex flex-col gap-4">
            {contact.actions
              .filter((a) => a.kind === "github" || a.kind === "linkedin")
              .map((action) => (
                <a
                  key={action.id}
                  href={action.href ?? "#"}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white"
                >
                  <span className="h-[1px] w-3 bg-white/20 transition-all group-hover:w-6 group-hover:bg-primary" />
                  {action.label}
                </a>
              ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
