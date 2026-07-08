"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { SafeLink } from "@/components/SafeLink";
import { SectionShell } from "@/components/SectionShell";
import { StatusLamp } from "@/components/StatusLamp";
import { TechLabel } from "@/components/TechLabel";
import { contact } from "@/data/contact";
import { Code2, Download, FileText, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  email: <Mail className="h-4 w-4" />,
  linkedin: <LinkedInIcon className="h-4 w-4" />,
  github: <GitHubIcon className="h-4 w-4" />,
  contribute: <Code2 className="h-4 w-4" />,
  recommendation: <FileText className="h-4 w-4" />,
  cv: <Download className="h-4 w-4" />,
};

const actionTone: Record<string, string> = {
  email: "hover:border-cyan-300/80 hover:text-cyan-200 hover:shadow-[0_0_34px_rgba(34,211,238,0.16)]",
  linkedin: "hover:border-cyan-300/80 hover:text-cyan-200 hover:shadow-[0_0_34px_rgba(34,211,238,0.16)]",
  github: "hover:border-success/80 hover:text-success hover:shadow-[0_0_34px_rgba(57,211,83,0.15)]",
  contribute: "hover:border-success/80 hover:text-success hover:shadow-[0_0_38px_rgba(57,211,83,0.18)]",
  recommendation: "hover:border-cyan-300/80 hover:text-cyan-200 hover:shadow-[0_0_34px_rgba(34,211,238,0.16)]",
  cv: "hover:border-white/70 hover:text-white hover:shadow-[0_0_34px_rgba(248,248,248,0.1)]",
};

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      )
        .fromTo(
          cardRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.2)" },
          "-=0.3"
        )
        .fromTo(
          actionsRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
          "-=0.2"
        );
    },
    { scope: containerRef }
  );

  return (
    <SectionShell id="contact" className="border-t border-terminal-dim bg-surface-container-lowest">
      <div ref={containerRef}>
        <div ref={headerRef} className="mb-12">
          <TechLabel dim className="mb-2 block">
            {"// CONTACT"}
          </TechLabel>
          <h2 className="font-display text-headline-lg text-high-def-white">Contact</h2>
        </div>

        <div
          ref={cardRef}
          className="relative mx-auto max-w-3xl overflow-hidden border border-terminal-dim bg-brushed-obsidian p-6 transition-colors hover:border-primary md:p-10"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.12),transparent_34%),radial-gradient(circle_at_82%_22%,rgba(57,211,83,0.1),transparent_34%),radial-gradient(circle_at_50%_110%,rgba(248,248,248,0.06),transparent_30%)] opacity-80" />
          <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
          <div className="relative">
            <div className="mb-8 flex items-center justify-between border-b border-terminal-dim pb-4">
              <div className="flex items-center gap-3">
                <StatusLamp color="cyan" pulse />
                <span className="font-mono text-label-technical text-cyan-200">AVAILABLE</span>
              </div>
              <span className="font-mono text-label-technical text-on-surface-variant">
                {contact.email}
              </span>
            </div>

            <p className="mb-8 text-body-md text-on-surface-variant">{contact.subline}</p>

            <div className="space-y-3">
              {contact.actions.map((action, i) => (
                <div
                  key={action.id}
                  ref={(el) => {
                    actionsRef.current[i] = el;
                  }}
                  className={`group flex flex-wrap items-center gap-3 border border-terminal-dim bg-surface-container-low/85 p-3 transition-all duration-300 ${actionTone[action.kind]}`}
                >
                  {!action.href ? (
                    <button
                      type="button"
                      disabled
                      className="flex flex-1 items-center gap-3 font-mono text-label-technical text-on-surface-variant"
                      title="CV download will be enabled once the CV is approved"
                    >
                      {iconMap[action.kind]}
                      <span className="uppercase">{action.label}</span>
                      <span className="ml-auto text-[10px] uppercase text-on-surface-variant/60">
                        pending
                      </span>
                    </button>
                  ) : (
                    <SafeLink
                      href={action.href}
                      download={action.kind === "cv" ? true : undefined}
                      className="flex flex-1 items-center gap-3 font-mono text-label-technical text-on-surface transition-colors focus-visible:ring-2 focus-visible:ring-primary"
                      title={action.placeholder ? "Link to be updated" : undefined}
                    >
                      <span className="transition-transform duration-300 group-hover:scale-110">
                        {iconMap[action.kind]}
                      </span>
                      <span className="uppercase">{action.label}</span>
                      {action.kind === "email" ? (
                        <span className="ml-auto text-on-surface-variant">{contact.email}</span>
                      ) : action.placeholder ? (
                        <span className="ml-auto text-[10px] uppercase text-on-surface-variant/60">
                          pending
                        </span>
                      ) : (
                        <span className="ml-auto text-[10px] uppercase text-primary">
                          {action.kind === "cv"
                            ? "pdf"
                            : action.kind === "recommendation"
                              ? "letter"
                            : action.kind === "contribute"
                              ? "source"
                              : "online"}
                        </span>
                      )}
                    </SafeLink>
                  )}
                  {action.kind === "email" ? <CopyEmailButton email={contact.email} /> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
