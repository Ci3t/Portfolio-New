"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  variant?: "slide" | "mask" | "zoom";
}

const distance = 32;

const offsets = {
  up: { y: distance },
  down: { y: -distance },
  left: { x: distance },
  right: { x: -distance },
};

const variants = {
  slide: {
    hidden: { opacity: 0, ...offsets.up },
    visible: { opacity: 1, x: 0, y: 0 },
  },
  mask: {
    hidden: { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
    visible: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  variant = "slide",
}: RevealProps) {
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted || reduced) {
    return <div className={className}>{children}</div>;
  }

  const hidden =
    variant === "slide"
      ? { opacity: 0, ...offsets[direction] }
      : variants[variant].hidden;
  const visible =
    variant === "slide"
      ? { opacity: 1, x: 0, y: 0 }
      : variants[variant].visible;

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={{ once: false, margin: "-80px" }}
      transition={{
        duration: variant === "mask" ? 0.95 : 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
