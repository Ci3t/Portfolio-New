"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ScanModeContextType {
  isScanModeActive: boolean;
  setScanModeActive: (active: boolean) => void;
  hoveredSection: string | null;
  setHoveredSection: (id: string | null) => void;
}

const ScanModeContext = createContext<ScanModeContextType | undefined>(undefined);

export function ScanModeProvider({ children }: { children: ReactNode }) {
  const [isScanModeActive, setScanModeActive] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  return (
    <ScanModeContext.Provider
      value={{
        isScanModeActive,
        setScanModeActive,
        hoveredSection,
        setHoveredSection,
      }}
    >
      {children}
    </ScanModeContext.Provider>
  );
}

export function useScanMode() {
  const context = useContext(ScanModeContext);
  if (context === undefined) {
    throw new Error("useScanMode must be used within a ScanModeProvider");
  }
  return context;
}
