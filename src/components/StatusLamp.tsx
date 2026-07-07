import { cn } from "@/lib/utils";

interface StatusLampProps {
  color?: "amber" | "violet";
  className?: string;
  pulse?: boolean;
}

export function StatusLamp({ color = "amber", className, pulse = false }: StatusLampProps) {
  return (
    <span
      className={cn(
        "inline-block h-2 w-2 rounded-none",
        color === "amber" ? "bg-primary-fixed-dim" : "bg-secondary",
        pulse && "animate-pulse",
        className
      )}
      aria-hidden="true"
    />
  );
}
