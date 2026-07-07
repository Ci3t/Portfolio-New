"use client";

import { useRef } from "react";
import { useScanMode } from "./ScanModeProvider";
import { motion, AnimatePresence } from "framer-motion";

const nodes = [
  { id: "about", label: "IDENTITY", top: "20%", left: "10%" },
  { id: "projects", label: "DEPLOYMENTS", top: "35%", left: "85%" },
  { id: "experience", label: "CHRONICLES", top: "50%", left: "15%" },
  { id: "stack", label: "CAPABILITIES", top: "65%", left: "80%" },
  { id: "contact", label: "UPLINK", top: "80%", left: "20%" },
];

export function PortfolioHUD() {
  const { isScanModeActive, setScanModeActive, hoveredSection, setHoveredSection } = useScanMode();

  // Draw lines to the center or to hovered sections
  const svgRef = useRef<SVGSVGElement>(null);

  const handleNodeClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(el, { offset: -50, duration: 1.5, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
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
          <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.05)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
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
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(168,85,247,0.2)" strokeWidth="1" strokeDasharray="4 4" />
            
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
                    stroke={isHovered ? "#22d3ee" : "rgba(168,85,247,0.4)"}
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
            [X] Abort Scan
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
