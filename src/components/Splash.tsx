"use client";

import { motion } from "motion/react";
import { useState } from "react";

export function Splash() {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-transparent"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.1, delay: 2.8 }}
      onAnimationComplete={() => setShow(false)}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 100 100"
      >
        <defs>
          <mask id="splash-zoom-mask">
            <rect width="100" height="100" fill="white" />
            <motion.polygon
              points="50,45 55,50 50,55 45,50"
              fill="black"
              style={{ transformOrigin: "50px 50px" }}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 60, rotate: 90 }}
              transition={{
                duration: 1.6,
                delay: 1.0,
                ease: [0.76, 0, 0.24, 1],
              }}
            />
          </mask>
        </defs>
        
        {/* Solid Black Screen */}
        <rect width="100" height="100" fill="#050506" mask="url(#splash-zoom-mask)" />
        
        {/* Decorative White/Cyan SVG lines drawing in before zoom */}
        <motion.path
          d="M 50 10 L 50 40 M 50 60 L 50 90 M 10 50 L 40 50 M 60 50 L 90 50"
          stroke="white"
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "circInOut" }}
        />
        <motion.circle
          cx="50"
          cy="50"
          r="8"
          stroke="#00cce0"
          strokeWidth="0.25"
          fill="none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="font-mono text-xs uppercase tracking-[0.4em] text-white mix-blend-difference"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          System Initializing
        </motion.div>
      </div>
    </motion.div>
  );
}
