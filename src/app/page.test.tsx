import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Page from "./page";
import { ScanModeProvider } from "@/components/ScanModeProvider";

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ScanModeProvider>
      {ui}
    </ScanModeProvider>
  );
};

describe("Portfolio page", () => {
  it("renders name and role", () => {
    renderWithProviders(<Page />);
    expect(screen.getByRole("heading", { name: /RANIALI/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Full Stack/i).length).toBeGreaterThanOrEqual(1);
  });

  it("renders navigation anchors", () => {
    renderWithProviders(<Page />);
    expect(screen.getByRole("link", { name: /Projects/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Experience/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Reference/i })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Contact/i }).length).toBeGreaterThanOrEqual(1);
  });

  it("renders projects from data", () => {
    renderWithProviders(<Page />);
    expect(screen.getAllByText("Svarog Tracer").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("ZeroTwo").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("FormAi").length).toBeGreaterThanOrEqual(1);
  });

  it("renders experience timeline", () => {
    renderWithProviders(<Page />);
    expect(screen.getByText("Appleseeds")).toBeInTheDocument();
    expect(screen.getAllByText("Samplead").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Strauss Group")).toBeInTheDocument();
  });

  it("renders contact links including LinkedIn and email", () => {
    renderWithProviders(<Page />);
    expect(screen.getAllByRole("link", { name: /LinkedIn/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("link", { name: /GitHub/i }).length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByRole("link", { name: /ranigfx@gmail.com/i }).length
    ).toBeGreaterThanOrEqual(1);
  });

  it("uses the correct GitHub URL", () => {
    renderWithProviders(<Page />);
    const githubLinks = screen
      .getAllByRole("link")
      .filter((el) => el.getAttribute("href") === "https://github.com/Ci3t/");
    expect(githubLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the profile image", () => {
    renderWithProviders(<Page />);
    const img = screen.getByRole("img", { name: /Rani Ali/i });
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toContain("Profile-Pic");
  });

  it("does not render a phone number", () => {
    renderWithProviders(<Page />);
    const body = document.body.textContent ?? "";
    expect(body).not.toMatch(/\b05\d{8}\b/);
    expect(body).not.toMatch(/\b\+?972\b/);
  });

  it("renders a back-to-top control", () => {
    renderWithProviders(<Page />);
    expect(screen.getByTestId("back-to-top")).toBeInTheDocument();
  });

  it("renders skill categories and bars", () => {
    renderWithProviders(<Page />);
    expect(screen.getAllByRole("tab", { name: /Frontend/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole("tab", { name: /Backend/i })).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText(/95%/)).toBeInTheDocument();
  });
});
