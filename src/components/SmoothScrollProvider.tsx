"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });
    
    // Attach to window so other components can use lenis.scrollTo
    (window as unknown as { lenis: Lenis }).lenis = lenis;

    const handleCustomScroll = (e: Event) => {
      const target = (e as CustomEvent).detail?.target || 0;
      lenis.scrollTo(target, { duration: 0.8, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
    };
    window.addEventListener("lenisScrollTo", handleCustomScroll);

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("lenisScrollTo", handleCustomScroll);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}
