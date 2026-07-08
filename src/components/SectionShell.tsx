"use client";

import { cn } from "@/lib/utils";
import { useScanMode } from "./ScanModeProvider";

interface SectionShellProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
}

export function SectionShell({ id, children, className, fullHeight = false }: SectionShellProps) {
  const { isScanModeActive, hoveredSection } = useScanMode();
  const isHovered = hoveredSection === id;

  return (
    <section
      id={id}
      className={cn(
        "relative px-5 py-24 md:px-16 lg:px-24 transition-all duration-700",
        fullHeight && "min-h-screen",
        isScanModeActive && "border-l-4 border-r-4 mx-4",
        isHovered && isScanModeActive ? "border-cyan-400 bg-cyan-900/10 shadow-[0_0_30px_rgba(34,211,238,0.15)]" : (isScanModeActive ? "border-primary/30" : ""),
        className
      )}
    >
      {/* Scan Mode Corner Brackets */}
      {isScanModeActive && (
        <>
          <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 transition-colors ${isHovered ? 'border-cyan-400' : 'border-primary/50'}`} />
          <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 transition-colors ${isHovered ? 'border-cyan-400' : 'border-primary/50'}`} />
          <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 transition-colors ${isHovered ? 'border-cyan-400' : 'border-primary/50'}`} />
          <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 transition-colors ${isHovered ? 'border-cyan-400' : 'border-primary/50'}`} />
        </>
      )}
      
      {children}
    </section>
  );
}
