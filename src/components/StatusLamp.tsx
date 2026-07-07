import { cn } from "@/lib/utils";

interface StatusLampProps {
  color?: "purple" | "violet";
  className?: string;
  pulse?: boolean;
}

export function StatusLamp({ color = "purple", className, pulse = false }: StatusLampProps) {
  return (
    <span
      className={cn(
        "inline-block h-2 w-2 rounded-none",
        color === "purple" ? "bg-primary-fixed-dim" : "bg-secondary",
        pulse && "animate-pulse",
        className
      )}
      aria-hidden="true"
    />
  );
}
