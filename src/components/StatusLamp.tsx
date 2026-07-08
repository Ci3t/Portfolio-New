import { cn } from "@/lib/utils";

interface StatusLampProps {
  color?: "cyan" | "green" | "primary";
  className?: string;
  pulse?: boolean;
}

const colorClass: Record<NonNullable<StatusLampProps["color"]>, string> = {
  cyan: "bg-cyan-300",
  green: "bg-[var(--color-success)]",
  primary: "bg-[var(--color-primary)]",
};

export function StatusLamp({ color = "cyan", className, pulse = false }: StatusLampProps) {
  return (
    <span
      className={cn(
        "inline-block h-2 w-2 rounded-none",
        colorClass[color],
        pulse && "animate-pulse",
        className
      )}
      aria-hidden="true"
    />
  );
}
