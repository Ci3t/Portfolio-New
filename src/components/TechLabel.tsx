import { cn } from "@/lib/utils";

interface TechLabelProps {
  children: React.ReactNode;
  className?: string;
  dim?: boolean;
}

export function TechLabel({ children, className, dim }: TechLabelProps) {
  return (
    <span
      className={cn(
        "font-mono text-label-technical uppercase tracking-wider",
        dim ? "text-on-surface-variant" : "text-primary",
        className
      )}
    >
      {children}
    </span>
  );
}
