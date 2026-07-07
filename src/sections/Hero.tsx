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
import { ArrowDownRight, ScanLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useScanMode } from "@/components/ScanModeProvider";

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion() {
  return false;
}

export function Hero() {
  const { setScanModeActive } = useScanMode();
  const sectionRef = useRef<HTMLDivElement>(null);
  const nameLine1Ref = useRef<HTMLSpanElement>(null);
  const nameLine2Ref = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
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
        defaults: { ease: "power4.inOut" },
        delay: 1.8,
      });

      tl.from(contentRef.current, {
        opacity: 0,
        filter: "blur(14px)",
        duration: 0.7,
      })
        .from([nameLine1Ref.current, nameLine2Ref.current], {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.08,
        }, "-=0.35")
        .from(portraitRef.current, {
          opacity: 0,
          y: 40,
          scale: 0.95,
          duration: 1.0,
          ease: "power3.out",
        }, "-=0.75")
        .from(targets, {
          opacity: 0,
          y: 36,
          duration: 0.72,
          stagger: 0.08,
        }, "-=0.55")
        .set([contentRef.current, portraitRef.current, ...targets], {
          clearProps: "filter,opacity,transform",
        });

      gsap.to([nameLine1Ref.current, nameLine2Ref.current], {
        y: -60,
        opacity: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
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
          
          const rotateX = ((y - centerY) / centerY) * -8; // Max 8 degrees tilt
          const rotateY = ((x - centerX) / centerX) * 8;
          
          // Tilt the container
          gsap.to(portrait, {
            rotateX,
            rotateY,
            transformPerspective: 1000,
            ease: "power2.out",
            duration: 0.4
          });
          
          // Parallax the image in the opposite direction
          gsap.to(image, {
            x: ((x - centerX) / centerX) * -15,
            y: ((y - centerY) / centerY) * -15,
            ease: "power2.out",
            duration: 0.4
          });
        };

        const handleMouseLeave = () => {
          gsap.to(portrait, {
            rotateX: 0,
            rotateY: 0,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2
          });
          gsap.to(image, {
            x: 0,
            y: 0,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2
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
    <div ref={sectionRef} className="relative overflow-hidden bg-background">
      <HeroBackground />

      <SectionShell id="hero" fullHeight className="relative z-10 flex items-center py-20 md:py-16">
        <div
          ref={contentRef}
          className="mx-auto grid w-full max-w-[1500px] gap-8 lg:grid-cols-[minmax(0,0.98fr)_minmax(380px,0.78fr)] lg:items-center lg:gap-10 xl:gap-16"
        >
          <div className="order-1 flex min-w-0 flex-col gap-6 md:gap-8">
            <div className="flex items-center gap-3">
              <StatusLamp color="purple" pulse />
              <TechLabel>{"// INITIALIZING SEQUENCE"}</TechLabel>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-display text-[clamp(56px,7vw,110px)] font-black leading-[0.9] tracking-tighter text-high-def-white">
                <span className="block overflow-hidden">
                  <span ref={nameLine1Ref} className="block pb-1">
                    RANI
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span ref={nameLine2Ref} className="block text-white/90 pb-2">
                    ALI
                  </span>
                </span>
              </h1>
              
              <div ref={roleRef} className="mt-4 flex items-center gap-4">
                <div className="h-[1px] w-12 bg-primary/50" />
                <p className="font-mono text-[clamp(14px,1.5vw,18px)] tracking-[0.2em] uppercase text-primary">
                  Full Stack & UI Designer
                </p>
              </div>
            </div>

            <p ref={introRef} className="max-w-xl text-body-md text-on-surface-variant font-light leading-relaxed mt-2">
              I build polished full-stack products with sharp UI, reliable APIs, and AI-powered
              workflows.
            </p>

            <div ref={ctaRef} className="mt-4 flex flex-wrap items-center gap-5">
              <button
                onClick={() => setScanModeActive(true)}
                className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden bg-white px-8 font-mono text-[12px] uppercase tracking-widest text-black transition-transform hover:scale-[1.02] active:scale-95"
              >
                <span className="relative z-10 font-bold">Start_Scan</span>
                <div className="absolute inset-0 z-0 bg-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
                <ScanLine className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              
              <SmoothAnchor
                href="#projects"
                className="group relative inline-flex h-12 items-center justify-center gap-2 border border-white/20 px-8 font-mono text-[12px] uppercase tracking-widest text-white transition-all hover:border-white hover:bg-white/5 active:scale-95"
              >
                <ArrowDownRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                <span>Explore_Work</span>
              </SmoothAnchor>
            </div>

            <div
              ref={metaRef}
              className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-6 font-mono text-[10px] uppercase tracking-widest text-white/40"
            >
              <div className="flex flex-col gap-1">
                <span className="text-white/20">System</span>
                <span>PROFILE_01</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/20">Status</span>
                <span className="flex items-center gap-2 text-primary">
                  <StatusLamp color="purple" />
                  AVAILABLE
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/20">Core_Stack</span>
                <span className="text-white/80">NEXT / NODE / AI</span>
              </div>
            </div>
          </div>

          <div className="order-2 flex justify-center lg:justify-end perspective-1200">
            <div
              ref={portraitRef}
              className="group relative aspect-[0.85] w-[min(82vw,420px)] lg:w-full lg:max-w-[480px] xl:max-w-[540px] transform-style-3d will-change-transform"
            >
              {/* Holographic Blend Container */}
              <div 
                className="absolute inset-0 overflow-hidden"
                style={{ 
                  WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)',
                  maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)'
                }}
              >
                <div ref={portraitImageRef} className="absolute inset-[-10%] will-change-transform">
                  <Image
                    src="/Profile-Pic.jpeg"
                    alt="Rani Ali"
                    fill
                    priority
                    className="object-cover object-[50%_32%] grayscale opacity-70 contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:contrast-110 group-hover:scale-105"
                    sizes="(max-width: 768px) 82vw, 38vw"
                  />
                  {/* Color burn overlays for tech feel */}
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-50 group-hover:opacity-0 transition-opacity duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                </div>
              </div>

              {/* Floating Reticles / HUD Elements (These hover in 3D space above the masked image) */}
              <div className="absolute top-1/4 left-1/4 h-[1px] w-4 bg-white/40 -translate-x-12 translate-z-10 transition-transform duration-500 group-hover:translate-x-0" />
              <div className="absolute bottom-1/4 right-1/4 h-4 w-[1px] bg-white/40 translate-x-12 translate-z-20 transition-transform duration-500 group-hover:translate-x-0" />
              
              <div className="absolute top-10 left-10 flex items-center gap-2 translate-z-30">
                <div className="flex h-6 w-6 items-center justify-center border border-white/20 bg-black/40 backdrop-blur-md">
                  <div className="h-1.5 w-1.5 bg-primary animate-pulse" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">SYS.IMG_01</span>
              </div>

              <div className="absolute bottom-10 right-10 flex flex-col gap-2 translate-z-40">
                <Link
                  href="https://www.linkedin.com/in/rani-ali/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex h-10 w-10 items-center justify-center bg-black/60 border border-white/10 text-white/50 backdrop-blur-sm transition-all hover:border-white hover:text-white"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="h-4 w-4" />
                </Link>
                <Link
                  href="https://github.com/Ci3t"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex h-10 w-10 items-center justify-center bg-black/60 border border-white/10 text-white/50 backdrop-blur-sm transition-all hover:border-white hover:text-white"
                  aria-label="GitHub"
                >
                  <GitHubIcon className="h-4 w-4" />
                </Link>
              </div>

              {/* Scanning laser line effect on hover */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 translate-y-0 group-hover:opacity-100 group-hover:animate-scan translate-z-50 pointer-events-none" />
            </div>
          </div>
        </div>
      </SectionShell>
    </div>
  );
}
