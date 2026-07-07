"use client";

import { useActiveSection } from "@/components/ActiveSectionProvider";
import { SmoothAnchor } from "@/components/SmoothAnchor";
import { navItems } from "@/data/navigation";
import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { activeSection } = useActiveSection();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center text-primary transition-colors hover:text-primary-fixed focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex flex-col bg-background p-6"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">Navigation menu</Dialog.Title>
          <div className="flex items-center justify-between">
            <span className="font-display text-headline-md text-primary">RANI ALI</span>
            <Dialog.Close asChild>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center text-primary transition-colors hover:text-primary-fixed focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Close navigation menu"
              >
                <X className="h-6 w-6" />
              </button>
            </Dialog.Close>
          </div>
          <nav className="mt-12 flex flex-col gap-2 font-mono text-label-technical" aria-label="Primary mobile">
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <SmoothAnchor
                  key={item.id}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "border-b border-terminal-dim py-4 transition-colors focus-visible:ring-2 focus-visible:ring-primary",
                    active ? "text-primary" : "text-on-surface hover:text-primary"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="text-on-surface-variant">{item.label}</span>
                  <span className="ml-3 text-primary">{item.creativeLabel}</span>
                </SmoothAnchor>
              );
            })}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
