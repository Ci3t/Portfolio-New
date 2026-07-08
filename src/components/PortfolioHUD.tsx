"use client";

import { useRef } from "react";
import { useScanMode } from "./ScanModeProvider";
import { motion, AnimatePresence } from "motion/react";

type LenisScrollWindow = Window & {
  lenis?: {
    scrollTo: (
      target: HTMLElement,
      options?: {
        offset?: number;
        duration?: number;
        easing?: (time: number) => number;
      }
    ) => void;
  };
};

const nodes = [
  { id: "about", label: "ABOUT", top: "20%", left: "10%" },
  { id: "projects", label: "PROJECTS", top: "35%", left: "85%" },
  { id: "experience", label: "EXPERIENCE", top: "50%", left: "15%" },
  { id: "recommendation", label: "REFERENCE", top: "62%", left: "30%" },
  { id: "stack", label: "SKILLS", top: "72%", left: "80%" },
  { id: "contact", label: "CONTACT", top: "84%", left: "20%" },
];

export function PortfolioHUD() {
  const { isScanModeActive, setScanModeActive, hoveredSection, setHoveredSection } = useScanMode();

  // Draw lines to the center or to hovered sections
  const svgRef = useRef<SVGSVGElement>(null);

  const handleNodeClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const smoothWindow = window as unknown as LenisScrollWindow;

      if (smoothWindow.lenis) {
        smoothWindow.lenis.scrollTo(el, {
          offset: -50,
          duration: 1.5,
          easing: (time: number) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
        });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <AnimatePresence>
      {isScanModeActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 pointer-events-none"
        >
          {/* Scan overlay effect */}
          <div className="absolute inset-0 bg-primary/5 mix-blend-screen pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
          <motion.div 
            initial={{ top: "-10%" }}
            animate={{ top: "110%" }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-[2px] bg-primary/40 blur-[2px] pointer-events-none" 
          />

          {/* SVG Connection Lines */}
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 51 }}
          >
            {/* Draw a vertical spine line */}
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(6,182,212,0.2)" strokeWidth="1" strokeDasharray="4 4" />
            
            {nodes.map((node) => {
              const isHovered = hoveredSection === node.id;
              return (
                <g key={`line-${node.id}`}>
                  <motion.line
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    x1="50%"
                    y1={node.top}
                    x2={node.left}
                    y2={node.top}
                    stroke={isHovered ? "#22d3ee" : "rgba(6,182,212,0.4)"}
                    strokeWidth={isHovered ? "2" : "1"}
                  />
                </g>
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node, i) => {
            const isHovered = hoveredSection === node.id;
            return (
              <motion.div
                key={node.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1, type: "spring" }}
                className="absolute pointer-events-auto group -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 cursor-pointer"
                style={{ top: node.top, left: node.left, zIndex: 52 }}
                onMouseEnter={() => setHoveredSection(node.id)}
                onMouseLeave={() => setHoveredSection(null)}
                onClick={() => handleNodeClick(node.id)}
              >
                <div className={`relative flex items-center justify-center w-8 h-8 border transition-colors ${isHovered ? 'border-cyan-400 bg-cyan-400/20' : 'border-primary/50 bg-black/80'}`}>
                  <div className={`w-2 h-2 ${isHovered ? 'bg-cyan-400' : 'bg-primary'}`} />
                  {isHovered && (
                    <motion.div
                      layoutId="node-pulse"
                      className="absolute inset-0 border border-cyan-400 animate-ping"
                    />
                  )}
                </div>
                <div className={`font-mono text-sm tracking-widest uppercase transition-colors ${isHovered ? 'text-cyan-400 font-bold' : 'text-primary/70'}`}>
                  {node.label}
                </div>
              </motion.div>
            );
          })}

          {/* Close HUD Button */}
          <button
            onClick={() => setScanModeActive(false)}
            className="absolute top-24 right-8 px-4 py-2 border border-primary/50 text-primary font-mono text-xs uppercase tracking-widest hover:bg-primary/10 transition-colors pointer-events-auto"
            style={{ zIndex: 53 }}
          >
            Close
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
