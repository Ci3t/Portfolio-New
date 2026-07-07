"use client";

import { HeroCautionLines } from "@/components/HeroCautionLines";
import { SectionShell } from "@/components/SectionShell";
import { SmoothAnchor } from "@/components/SmoothAnchor";
import { StatusLamp } from "@/components/StatusLamp";
import { TechLabel } from "@/components/TechLabel";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion() {
  return false;
}

export function Hero() {
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
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          scale: 1.08,
          duration: 1.0,
          ease: "power3.inOut",
        }, "-=0.75")
        .from(targets, {
          opacity: 0,
          y: 36,
          duration: 0.72,
          stagger: 0.08,
        }, "-=0.55")
        .set([contentRef.current, portraitRef.current, ...targets], {
          clearProps: "filter,opacity,transform,clipPath",
        });

      gsap.set(portraitRef.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
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

      gsap.to(portraitRef.current, {
        y: -14,
        rotate: 0.35,
        duration: 4.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      gsap.to(portraitImageRef.current, {
        scale: 1.045,
        duration: 6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className="relative overflow-hidden bg-brushed-obsidian">
      <HeroCautionLines />
      <div className="absolute inset-0 z-0 grid-texture opacity-40" />
      <SectionShell id="hero" fullHeight className="z-10 flex items-center overflow-hidden py-20 md:py-16">
        <div
          ref={contentRef}
          className="mx-auto grid w-full max-w-[1500px] gap-8 lg:grid-cols-[minmax(0,0.98fr)_minmax(380px,0.78fr)] lg:items-center lg:gap-10 xl:gap-16"
        >
          <div className="order-1 flex min-w-0 flex-col gap-6 md:gap-7">
            <div className="flex items-center gap-3">
              <StatusLamp color="amber" pulse />
              <TechLabel>{"// INITIALIZING SEQUENCE"}</TechLabel>
            </div>

            <h1 className="font-display text-[clamp(68px,8.6vw,132px)] font-black leading-[0.82] tracking-[-0.055em] text-high-def-white">
              <span className="block overflow-hidden">
                <span ref={nameLine1Ref} className="block">
                  RANI
                </span>
              </span>
              <span className="block overflow-hidden">
                <span ref={nameLine2Ref} className="block">
                  ALI
                </span>
              </span>
            </h1>

            <p
              ref={roleRef}
              className="max-w-[980px] whitespace-normal font-display text-[clamp(34px,4.5vw,70px)] font-black leading-[0.98] tracking-[-0.035em] text-on-surface-variant"
            >
              {"// FULL STACK DEVELOPER"}
            </p>

            <p ref={introRef} className="max-w-xl text-body-md text-on-surface-variant">
              I build polished full-stack products with sharp UI, reliable APIs, and AI-powered
              workflows.
            </p>

            <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
              <SmoothAnchor
                href="#projects"
                className="group inline-flex items-center gap-2 border border-transparent bg-primary-fixed-dim px-6 py-3 font-mono text-label-technical text-background transition-colors hover:border-primary-fixed-dim hover:bg-wet-asphalt hover:text-primary focus-visible:ring-2 focus-visible:ring-primary"
              >
                VIEW PROJECTS
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </SmoothAnchor>
              <SmoothAnchor
                href="#contact"
                className="inline-flex items-center gap-2 border border-terminal-dim px-6 py-3 font-mono text-label-technical text-on-surface transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Mail className="h-4 w-4" />
                CONTACT
              </SmoothAnchor>
            </div>

            <div
              ref={metaRef}
              className="flex flex-wrap gap-6 pt-4 font-mono text-label-technical text-on-surface-variant"
            >
              <span>SYS.PROFILE_01</span>
              <span className="flex items-center gap-2">
                <StatusLamp color="amber" />
                STATUS: AVAILABLE
              </span>
              <span>STACK: NEXT / NODE / AI</span>
            </div>
          </div>

          <div className="order-2 flex justify-center lg:justify-end">
            <div
              ref={portraitRef}
              className="group relative aspect-[0.78] w-[min(78vw,390px)] overflow-visible lg:w-full lg:max-w-[460px] xl:max-w-[520px]"
            >
              <div className="absolute -inset-4 border border-primary/20 opacity-70" />
              <div className="absolute -inset-2 translate-x-4 translate-y-4 border border-terminal-dim bg-black/40 shadow-[18px_18px_0_rgba(0,0,0,0.85)]" />
              <div className="absolute -right-5 top-10 h-28 w-px bg-gradient-to-b from-transparent via-primary/80 to-transparent" />
              <div className="absolute -bottom-5 left-10 h-px w-40 bg-gradient-to-r from-transparent via-secondary/70 to-transparent" />

              <div className="relative h-full overflow-hidden border border-terminal-dim bg-surface-container-low ambient-glow">
                <div ref={portraitImageRef} className="absolute inset-0">
                  <Image
                    src="/Profile-Pic.jpeg"
                    alt="Rani Ali"
                    fill
                    priority
                    className="object-cover object-[50%_32%] grayscale contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:contrast-110"
                    sizes="(max-width: 768px) 78vw, 36vw"
                  />
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,transparent_0,rgba(0,0,0,0.1)_42%,rgba(0,0,0,0.72)_100%)]" />
                <div className="absolute inset-0 border border-terminal-dim ring-1 ring-inset ring-white/5" />
                <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 opacity-70 mix-blend-screen" />
              </div>

              <div className="absolute bottom-0 left-0 border-t border-r border-terminal-dim bg-background/90 px-3 py-1 font-mono text-label-technical text-primary backdrop-blur">
                SYS.IMG_01
              </div>
              <div className="absolute bottom-4 right-4 flex gap-3">
                <Link
                  href="https://www.linkedin.com/in/rani-ali/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-on-surface-variant transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="h-5 w-5" />
                </Link>
                <Link
                  href="https://github.com/Ci3t"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-on-surface-variant transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="GitHub"
                >
                  <GitHubIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SectionShell>
    </div>
  );
}
