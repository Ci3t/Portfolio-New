"use client";

import { motion } from "motion/react";
import { useState } from "react";

const panels = [
  "left-0 w-[22%]",
  "left-[22%] w-[18%]",
  "left-[40%] w-[20%]",
  "left-[60%] w-[18%]",
  "left-[78%] w-[22%]",
];

export function Splash() {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {panels.map((panel, index) => (
        <motion.div
          key={panel}
          className={`absolute top-0 h-full ${panel} bg-background`}
          initial={{ y: "0%" }}
          animate={{ y: index % 2 === 0 ? "-105%" : "105%" }}
          transition={{
            duration: 1.05,
            delay: 1.65 + index * 0.055,
            ease: [0.76, 0, 0.24, 1],
          }}
          onAnimationComplete={index === panels.length - 1 ? () => setShow(false) : undefined}
        >
          <div className="absolute inset-y-0 right-0 w-px bg-primary/15" />
        </motion.div>
      ))}

      <motion.div
        className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(var(--color-primary-rgb),0.08)_50%,transparent_100%)]"
        initial={{ x: "-120%" }}
        animate={{ x: "120%" }}
        transition={{ duration: 1.4, delay: 0.35, ease: "circInOut" }}
      />

      <div className="absolute inset-0 flex items-center justify-center px-8">
        <div className="w-full max-w-5xl">
          <div className="overflow-hidden">
            <motion.p
              className="font-mono text-[11px] uppercase tracking-[0.45em] text-primary"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              Portfolio loading
            </motion.p>
          </div>

          <div className="mt-5 overflow-hidden">
            <motion.h1
              className="font-display text-[clamp(58px,12vw,180px)] font-black leading-none tracking-[-0.04em] text-high-def-white"
              initial={{ y: "115%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.75, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              RANI ALI
            </motion.h1>
          </div>

          <motion.div
            className="mt-8 h-px w-full overflow-hidden bg-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.68 }}
          >
            <motion.div
              className="h-full bg-primary shadow-[0_0_24px_rgba(var(--color-primary-rgb),0.5)]"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 0.95, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>

          <motion.div
            className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-on-surface-variant"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: [0, 1, 1, 0], y: [12, 0, 0, -8] }}
            transition={{ duration: 1.35, delay: 0.78, times: [0, 0.22, 0.78, 1] }}
          >
            <span>Full-stack / UI</span>
            <span className="text-success">Ready</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
