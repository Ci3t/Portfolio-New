import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Page from "./page";

describe("Portfolio page", () => {
  it("renders name and role", () => {
    render(<Page />);
    expect(screen.getByRole("heading", { name: /RANIALI/i })).toBeInTheDocument();
    expect(screen.getByText(/Full Stack Developer/i)).toBeInTheDocument();
  });

  it("renders navigation anchors", () => {
    render(<Page />);
    expect(screen.getByRole("link", { name: /Deployments/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Chronicles/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Uplink/i })).toBeInTheDocument();
  });

  it("renders projects from data", () => {
    render(<Page />);
    expect(screen.getAllByText("Svarog Tracer").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("ZeroTwo").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("FormAi").length).toBeGreaterThanOrEqual(1);
  });

  it("renders experience timeline", () => {
    render(<Page />);
    expect(screen.getByText("Appleseeds")).toBeInTheDocument();
    expect(screen.getByText("Samplead")).toBeInTheDocument();
    expect(screen.getByText("Strauss Group")).toBeInTheDocument();
  });

  it("renders contact links including LinkedIn and email", () => {
    render(<Page />);
    expect(screen.getAllByRole("link", { name: /LinkedIn/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("link", { name: /GitHub/i }).length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByRole("link", { name: /ranigfx@gmail.com/i }).length
    ).toBeGreaterThanOrEqual(1);
  });

  it("uses the correct GitHub URL", () => {
    render(<Page />);
    const githubLinks = screen
      .getAllByRole("link")
      .filter((el) => el.getAttribute("href") === "https://github.com/Ci3t");
    expect(githubLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the profile image", () => {
    render(<Page />);
    const img = screen.getByRole("img", { name: /Rani Ali/i });
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toContain("Profile-Pic");
  });

  it("does not render a phone number", () => {
    render(<Page />);
    const body = document.body.textContent ?? "";
    expect(body).not.toMatch(/\b05\d{8}\b/);
    expect(body).not.toMatch(/\b\+?972\b/);
  });

  it("renders a back-to-top control", () => {
    render(<Page />);
    expect(screen.getByTestId("back-to-top")).toBeInTheDocument();
  });

  it("renders skill categories and bars", () => {
    render(<Page />);
    expect(screen.getByRole("tab", { name: /Frontend/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /Backend/i })).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText(/95%/)).toBeInTheDocument();
  });
});
