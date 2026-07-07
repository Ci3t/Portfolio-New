import { cn } from "@/lib/utils";

interface SectionShellProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
}

export function SectionShell({ id, children, className, fullHeight = false }: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative px-5 py-24 md:px-16 lg:px-24",
        fullHeight && "min-h-screen",
        className
      )}
    >
      {children}
    </section>
  );
}
