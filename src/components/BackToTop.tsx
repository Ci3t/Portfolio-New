"use client";

import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    try {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("lenisScrollTo", { detail: { target: 0 } }));
      }
    } catch {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    window.history.replaceState(null, "", "#hero");
  };

  return (
    <motion.button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.25 }}
      data-testid="back-to-top"
      className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center border border-terminal-dim bg-background text-primary shadow-lg backdrop-blur-sm transition-colors hover:border-primary hover:bg-primary hover:text-on-primary focus-visible:ring-2 focus-visible:ring-primary md:bottom-8 md:right-8"
    >
      <ArrowUp className="h-5 w-5" />
    </motion.button>
  );
}
