"use client";

import { SectionShell } from "@/components/SectionShell";
import { SmoothAnchor } from "@/components/SmoothAnchor";
import { StatusLamp } from "@/components/StatusLamp";
import { TechLabel } from "@/components/TechLabel";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { HeroBackground } from "@/components/HeroBackground";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, ScanLine, Activity } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useScanMode } from "@/components/ScanModeProvider";

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Hero() {
  const { setScanModeActive } = useScanMode();
  const sectionRef = useRef<HTMLDivElement>(null);
  const nameLine1Ref = useRef<HTMLSpanElement>(null);
  const nameLine2Ref = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const portraitImageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const targets = [roleRef.current, introRef.current, ctaRef.current, metaRef.current];
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        delay: 0.2, // Faster start for energy
      });

      tl.fromTo(contentRef.current, 
        { opacity: 0, filter: "blur(20px)" },
        { opacity: 1, filter: "blur(0px)", duration: 1.2 }
      )
      .fromTo([nameLine1Ref.current, nameLine2Ref.current], 
        { yPercent: 120, rotateX: -90, opacity: 0 },
        { yPercent: 0, rotateX: 0, opacity: 1, duration: 1.2, stagger: 0.1, transformOrigin: "50% 50% -50px" },
        "-=0.8"
      )
      .fromTo(portraitRef.current, 
        { opacity: 0, x: 100, scale: 0.8, rotateY: 15 },
        { opacity: 1, x: 0, scale: 1, rotateY: 0, duration: 1.4, ease: "power4.out" },
        "-=1.0"
      )
      .fromTo(targets, 
        { opacity: 0, x: -30, filter: "blur(10px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 1, stagger: 0.1 },
        "-=1.0"
      );

      gsap.to([nameLine1Ref.current, nameLine2Ref.current], {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1, // Smooth scrub
        },
      });

      // 3D Magnetic Parallax effect on the portrait
      const portrait = portraitRef.current;
      const image = portraitImageRef.current;
      
      if (portrait && image) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = portrait.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = ((y - centerY) / centerY) * -12; // More intense tilt
          const rotateY = ((x - centerX) / centerX) * 12;
          
          gsap.to(portrait, {
            rotateX,
            rotateY,
            transformPerspective: 1200,
            ease: "power2.out",
            duration: 0.5
          });
          
          gsap.to(image, {
            x: ((x - centerX) / centerX) * -20,
            y: ((y - centerY) / centerY) * -20,
            scale: 1.05, // Slight zoom on hover
            ease: "power2.out",
            duration: 0.5
          });
        };

        const handleMouseLeave = () => {
          gsap.to(portrait, {
            rotateX: 0,
            rotateY: 0,
            ease: "elastic.out(1, 0.4)",
            duration: 1.5
          });
          gsap.to(image, {
            x: 0,
            y: 0,
            scale: 1,
            ease: "elastic.out(1, 0.4)",
            duration: 1.5
          });
        };

        portrait.addEventListener("mousemove", handleMouseMove);
        portrait.addEventListener("mouseleave", handleMouseLeave);
        
        return () => {
          portrait.removeEventListener("mousemove", handleMouseMove);
          portrait.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className="relative overflow-hidden bg-background min-h-screen flex items-center">
      <HeroBackground />
      <div className="pointer-events-none absolute left-[10%] top-[18%] h-px w-1/3 bg-primary/40 shadow-[0_0_34px_rgba(var(--color-primary-rgb),0.28)]" />
      <div className="pointer-events-none absolute bottom-[18%] right-[8%] h-px w-1/4 bg-[var(--color-success)]/30 shadow-[0_0_34px_rgba(var(--color-success-rgb),0.22)]" />

      <SectionShell id="hero" fullHeight className="relative z-10 flex items-center py-20 md:py-16 w-full">
        <div
          ref={contentRef}
          className="mx-auto grid w-full max-w-[1500px] gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(400px,0.9fr)] lg:items-center lg:gap-16 xl:gap-24"
        >
          {/* Text Content */}
          <div className="order-1 flex min-w-0 flex-col gap-8 md:gap-10">
            <div className="flex items-center gap-4">
              <StatusLamp color="cyan" pulse />
              <TechLabel className="border-[var(--color-success)]/30 text-[var(--color-success)] bg-[var(--color-success)]/5">
                <Activity className="w-3 h-3 mr-2 inline-block" />
                {"Available for work"}
              </TechLabel>
              <TechLabel className="border-[var(--color-primary)]/30 text-[var(--color-primary)] bg-[var(--color-primary)]/5">
                {"Full-stack / UI"}
              </TechLabel>
            </div>

            <div className="flex flex-col gap-2 perspective-1000">
              <h1 className="font-display text-[clamp(64px,8vw,130px)] font-black leading-[0.85] tracking-tighter text-white">
                <span className="block overflow-hidden pb-2">
                  <span ref={nameLine1Ref} className="block origin-bottom text-high-def-white">
                    RANI
                  </span>
                </span>
                <span className="block overflow-hidden pb-4">
                  <span ref={nameLine2Ref} className="block origin-bottom text-high-def-white/90">
                    ALI
                  </span>
                </span>
              </h1>
              
              <div ref={roleRef} className="mt-6 flex items-center gap-6">
                <div className="h-[2px] w-16 bg-[var(--color-success)] shadow-[0_0_18px_rgba(var(--color-success-rgb),0.28)]" />
                <p className="font-mono text-[clamp(14px,1.5vw,18px)] font-bold tracking-[0.25em] uppercase text-[var(--color-success)] drop-shadow-[0_0_10px_var(--color-success)]">
                  Full Stack & UI Designer
                </p>
              </div>
            </div>

            <p ref={introRef} className="max-w-2xl text-lg md:text-xl text-white/70 font-light leading-relaxed mt-2">
              I engineer high-performance web experiences with uncompromising design, robust systems, and intelligent workflows.
            </p>

            <div ref={ctaRef} className="mt-6 flex flex-wrap items-center gap-6">
              <button
                onClick={() => setScanModeActive(true)}
                className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden border border-[var(--color-success)]/50 bg-[var(--color-success)]/10 px-10 font-mono text-[13px] font-bold uppercase tracking-[0.2em] text-[var(--color-success)] transition-all hover:bg-[var(--color-success)] hover:text-black active:scale-95 shadow-[0_0_20px_rgba(var(--color-success-rgb),0.2)] hover:shadow-[0_0_30px_rgba(var(--color-success-rgb),0.5)]"
              >
                <span className="relative z-10">Explore Site</span>
                <ScanLine className="relative z-10 h-5 w-5 transition-transform group-hover:rotate-90 group-hover:scale-110" />
                <div className="absolute inset-0 z-0 bg-[var(--color-success)] opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
              
              <SmoothAnchor
                href="#projects"
                className="group relative inline-flex h-14 items-center justify-center gap-3 border border-white/20 px-10 font-mono text-[13px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:border-white hover:bg-white hover:text-black active:scale-95"
              >
                <span>View Work</span>
                <ArrowDownRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
              </SmoothAnchor>
            </div>

            <div
              ref={metaRef}
              className="mt-12 flex flex-wrap items-center gap-x-12 gap-y-6 border-t border-white/10 pt-8 font-mono text-[11px] uppercase tracking-[0.15em]"
            >
              <div className="flex flex-col gap-2">
                <span className="text-white/30">Name</span>
                <span className="text-white font-semibold">Rani Ali</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-white/30">Status</span>
                <span className="flex items-center gap-2 text-[var(--color-success)] font-semibold drop-shadow-[0_0_8px_var(--color-success)]">
                  <div className="h-2 w-2 rounded-full bg-[var(--color-success)] animate-ping" />
                  Available
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-white/30">Focus</span>
                <span className="text-[var(--color-primary)] font-semibold">Build / Ship</span>
              </div>
            </div>
          </div>

          {/* Visual Element / Portrait */}
          <div className="order-2 flex justify-center lg:justify-end perspective-1200 mt-10 lg:mt-0">
            <div
              ref={portraitRef}
              className="group relative aspect-[3/4] w-full max-w-[460px] xl:max-w-[520px] transform-style-3d will-change-transform"
            >
              {/* Geometric Frame Elements */}
              <div className="absolute -inset-4 border border-white/10 translate-z-[-20px] transition-all duration-700 group-hover:border-[var(--color-success)]/30 group-hover:scale-105" />
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[var(--color-success)]/70 translate-x-4 -translate-y-4 translate-z-10 transition-transform duration-500 group-hover:translate-x-6 group-hover:-translate-y-6" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[var(--color-primary)]/70 -translate-x-4 translate-y-4 translate-z-10 transition-transform duration-500 group-hover:-translate-x-6 group-hover:translate-y-6" />

              {/* Main Image Container */}
              <div className="absolute inset-0 overflow-hidden bg-black/50 border border-white/5 shadow-2xl shadow-black/80 backdrop-blur-sm">
                <div ref={portraitImageRef} className="absolute inset-[-10%] will-change-transform">
                  <Image
                    src="/Profile-Pic.jpeg"
                    alt="Rani Ali"
                    fill
                    priority
                    className="object-cover object-[50%_32%] grayscale opacity-60 contrast-125 transition-all duration-1000 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:contrast-110"
                    sizes="(max-width: 1024px) 90vw, 45vw"
                  />
                  {/* Energetic Overlays */}
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                </div>
              </div>

              {/* High-end HUD Elements */}
              <div className="absolute top-6 left-6 flex items-center gap-3 translate-z-30 backdrop-blur-md bg-black/40 px-3 py-1.5 border border-white/10">
                <div className="h-2 w-2 bg-[var(--color-success)] shadow-[0_0_10px_var(--color-success)]" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/70">Profile Photo</span>
              </div>

              <div className="absolute bottom-8 right-8 flex flex-col gap-3 translate-z-40">
                <Link
                  href="https://www.linkedin.com/in/rani-ali-b2a78519a/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex h-12 w-12 items-center justify-center bg-black/80 border border-white/20 text-white/70 backdrop-blur-md transition-all duration-300 hover:border-[var(--color-success)] hover:text-[var(--color-success)] hover:scale-110 hover:shadow-[0_0_20px_rgba(var(--color-success-rgb),0.3)]"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="h-5 w-5" />
                </Link>
                <Link
                  href="https://github.com/Ci3t/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex h-12 w-12 items-center justify-center bg-black/80 border border-white/20 text-white/70 backdrop-blur-md transition-all duration-300 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:scale-110 hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.3)]"
                  aria-label="GitHub"
                >
                  <GitHubIcon className="h-5 w-5" />
                </Link>
              </div>

              {/* Scanning Laser Line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--color-success)] to-transparent opacity-0 translate-y-0 group-hover:opacity-100 group-hover:animate-scan translate-z-50 pointer-events-none shadow-[0_0_15px_var(--color-success)]" />
            </div>
          </div>
        </div>
      </SectionShell>
    </div>
  );
}
