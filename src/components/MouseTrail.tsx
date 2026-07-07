"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import { motion, useSpring } from "motion/react";
import { useEffect } from "react";

const tail = Array.from({ length: 5 }, (_, index) => index);

export function MouseTrail() {
  const reduced = useReducedMotion();

  const dotX = useSpring(0, { damping: 28, stiffness: 240 });
  const dotY = useSpring(0, { damping: 28, stiffness: 240 });
  const ringX = useSpring(0, { damping: 48, stiffness: 120 });
  const ringY = useSpring(0, { damping: 48, stiffness: 120 });
  const glowX = useSpring(0, { damping: 70, stiffness: 70 });
  const glowY = useSpring(0, { damping: 70, stiffness: 70 });

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return;

    const handleMove = (event: MouseEvent) => {
      dotX.set(event.clientX);
      dotY.set(event.clientY);
      ringX.set(event.clientX);
      ringY.set(event.clientY);
      glowX.set(event.clientX);
      glowY.set(event.clientY);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reduced, dotX, dotY, ringX, ringY, glowX, glowY]);

  if (reduced) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[60] hidden h-28 w-28 rounded-full bg-primary/10 blur-3xl md:block"
        style={{ x: glowX, y: glowY, translateX: "-50%", translateY: "-50%" }}
        aria-hidden="true"
      />
      {tail.map((index) => (
        <motion.div
          key={index}
          className="pointer-events-none fixed z-[61] hidden rounded-full bg-cyan-300/50 md:block"
          style={{
            x: dotX,
            y: dotY,
            translateX: "-50%",
            translateY: "-50%",
            width: 8 - index,
            height: 8 - index,
            opacity: 0.22 - index * 0.03,
            transitionDelay: `${index * 22}ms`,
          }}
          aria-hidden="true"
        />
      ))}
      <motion.div
        className="pointer-events-none fixed z-[62] hidden h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_18px_rgba(251,188,0,0.8)] md:block"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none fixed z-[61] hidden h-9 w-9 rounded-full border border-cyan-300/35 mix-blend-screen md:block"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        aria-hidden="true"
      />
    </>
  );
}
