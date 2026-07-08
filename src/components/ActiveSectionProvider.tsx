"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ActiveSectionContextValue = {
  activeSection: string;
  setActiveSection: (id: string) => void;
};

const ActiveSectionContext = createContext<ActiveSectionContextValue>({
  activeSection: "hero",
  setActiveSection: () => {},
});

export function ActiveSectionProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sectionIds = ["hero", "about", "projects", "experience", "stack", "contact"];
    const elements = sectionIds
      .map((id) => ({ id, el: document.getElementById(id) }))
      .filter((item): item is { id: string; el: HTMLElement } => item.el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    elements.forEach(({ el }) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSection() {
  return useContext(ActiveSectionContext);
}
