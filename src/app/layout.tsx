import { ActiveSectionProvider } from "@/components/ActiveSectionProvider";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { ScanModeProvider } from "@/components/ScanModeProvider";
import { PortfolioHUD } from "@/components/PortfolioHUD";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rani Ali - Full Stack Developer",
  description:
    "Portfolio of Rani Ali, a UI-focused full-stack developer with AI SaaS experience and instructor-level communication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full scroll-smooth antialiased">
      <body className="min-h-full bg-background font-body text-on-surface">
        <SmoothScrollProvider>
          <ActiveSectionProvider>
            <ScanModeProvider>
              <PortfolioHUD />
              {children}
            </ScanModeProvider>
          </ActiveSectionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
