import "@testing-library/jest-dom";

// Mock next/font/google so tests do not fetch fonts.
vi.mock("next/font/google", () => ({
  Syne: () => ({ variable: "--font-syne", className: "font-syne" }),
  Hanken_Grotesk: () => ({ variable: "--font-hanken", className: "font-hanken" }),
  JetBrains_Mono: () => ({ variable: "--font-jetbrains", className: "font-jetbrains" }),
}));

// Mock Next.js Image so tests render a plain img.
vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: Record<string, unknown>) => <img {...props} alt={(props.alt as string) ?? ""} />,
}));

// Mock Next.js Link so tests render a plain anchor.
vi.mock("next/link", () => ({
  default: (props: Record<string, unknown>) => <a {...props} href={(props.href as string) ?? "#"} />,
}));

// Mock next/navigation hooks used by client components.
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));


// Minimal IntersectionObserver stub.
global.IntersectionObserver = class IntersectionObserver {
  root = null;
  rootMargin = "";
  thresholds = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
};

// Minimal ResizeObserver stub.
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Minimal matchMedia stub.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: query === "(prefers-reduced-motion: reduce)",
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
