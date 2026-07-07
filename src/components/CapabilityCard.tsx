import type { Capability } from "@/types";

interface CapabilityCardProps {
  capability: Capability;
}

export function CapabilityCard({ capability }: CapabilityCardProps) {
  return (
    <div className="group border-b border-terminal-dim p-6 transition-colors last:border-b-0 hover:bg-surface-container">
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-label-technical text-primary">{capability.id}</span>
        <div className="flex-1">
          <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
            <h3 className="font-display text-headline-md text-high-def-white">
              {capability.title}
            </h3>
            <span className="font-mono text-label-technical text-on-surface-variant">
              {capability.meta}
            </span>
          </div>
          <p className="mt-2 font-mono text-label-technical text-on-surface-variant opacity-0 transition-opacity group-hover:opacity-100">
            {capability.proof}
          </p>
        </div>
      </div>
    </div>
  );
}
