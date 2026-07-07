"use client";

import { MobileMenu } from "./MobileMenu";

export function TopBar() {
  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-terminal-dim bg-background px-5 md:hidden">
      <span className="font-display text-headline-md text-primary">RANI ALI</span>
      <MobileMenu />
    </header>
  );
}
