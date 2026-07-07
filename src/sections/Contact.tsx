import { CopyEmailButton } from "@/components/CopyEmailButton";
import { Reveal } from "@/components/Reveal";
import { SafeLink } from "@/components/SafeLink";
import { SectionShell } from "@/components/SectionShell";
import { StatusLamp } from "@/components/StatusLamp";
import { TechLabel } from "@/components/TechLabel";
import { contact } from "@/data/contact";
import { Download, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

const iconMap: Record<string, React.ReactNode> = {
  email: <Mail className="h-4 w-4" />,
  linkedin: <LinkedInIcon className="h-4 w-4" />,
  github: <GitHubIcon className="h-4 w-4" />,
  cv: <Download className="h-4 w-4" />,
};

export function Contact() {
  return (
    <SectionShell id="contact" className="border-t border-terminal-dim bg-surface-container-lowest">
      <div className="mb-12">
        <Reveal variant="mask">
          <TechLabel dim className="mb-2 block">
            {"// SECURE UPLINK"}
          </TechLabel>
        </Reveal>
        <Reveal variant="mask" delay={0.1}>
          <h2 className="font-display text-headline-lg text-high-def-white">Contact</h2>
        </Reveal>
      </div>

      <Reveal delay={0.2} variant="zoom">
        <div className="mx-auto max-w-3xl border border-terminal-dim bg-brushed-obsidian p-6 md:p-10 transition-colors hover:border-primary">
          <div className="mb-8 flex items-center justify-between border-b border-terminal-dim pb-4">
              <div className="flex items-center gap-3">
                <StatusLamp color="violet" pulse />
                <span className="font-mono text-label-technical text-secondary">SYSTEM READY</span>
              </div>
              <span className="font-mono text-label-technical text-on-surface-variant">
                {contact.email}
              </span>
            </div>

            <p className="mb-8 text-body-md text-on-surface-variant">{contact.subline}</p>

            <div className="space-y-3">
              {contact.actions.map((action) => (
                <div
                  key={action.id}
                  className="flex flex-wrap items-center gap-3 border border-terminal-dim bg-surface-container-low p-3 transition-colors hover:border-primary"
                >
                  {action.kind === "cv" || !action.href ? (
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
                      className="flex flex-1 items-center gap-3 font-mono text-label-technical text-on-surface transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-primary"
                      title={action.placeholder ? "Link to be updated" : undefined}
                    >
                      {iconMap[action.kind]}
                      <span className="uppercase">{action.label}</span>
                      {action.kind === "email" ? (
                        <span className="ml-auto text-on-surface-variant">{contact.email}</span>
                      ) : action.placeholder ? (
                        <span className="ml-auto text-[10px] uppercase text-on-surface-variant/60">
                          pending
                        </span>
                      ) : (
                        <span className="ml-auto text-[10px] uppercase text-primary">online</span>
                      )}
                    </SafeLink>
                  )}
                  {action.kind === "email" ? <CopyEmailButton email={contact.email} /> : null}
                </div>
              ))}
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
