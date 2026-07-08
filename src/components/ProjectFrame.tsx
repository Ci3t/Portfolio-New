"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface ProjectFrameProps {
  label: string;
  imageUrl?: string;
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ProjectFrame({ label, imageUrl }: ProjectFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !innerRef.current) return;

      gsap.fromTo(
        innerRef.current,
        { scale: 1.08 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "top 35%",
            scrub: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="group/frame relative aspect-video w-full overflow-hidden bg-black">
      <div
        ref={innerRef}
        className="absolute inset-0 bg-black/80"
      >
        {imageUrl && !imgError ? (
          <Image
            src={imageUrl}
            alt={`${label} preview`}
            fill
            className="object-cover opacity-60 grayscale contrast-125 transition-all duration-700 group-hover/frame:scale-105 group-hover/frame:opacity-100 group-hover/frame:grayscale-0"
            onError={() => setImgError(true)}
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 border-b border-white/5">
            <span className="font-display text-xl font-bold tracking-tight text-white/20">{label}</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
              Preview coming soon
            </span>
          </div>
        )}
      </div>
      
      {/* HUD scanning overlay */}
      <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 transition-opacity duration-700 group-hover/frame:opacity-100 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 translate-y-0 group-hover/frame:opacity-100 group-hover/frame:animate-scan pointer-events-none" />

      <div className="absolute bottom-4 left-4 border border-white/10 bg-black/60 backdrop-blur-md px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-white/70">
        Preview
      </div>
    </div>
  );
}
