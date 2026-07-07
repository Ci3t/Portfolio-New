import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SmoothAnchor } from "./SmoothAnchor";

describe("SmoothAnchor", () => {
  it("scrolls to the target and replaces the hash without duplication", async () => {
    const scrollIntoView = vi.fn();
    const replaceState = vi.fn();

    Object.defineProperty(window, "location", {
      value: { hash: "#hero" },
      writable: true,
    });
    Object.defineProperty(window, "history", {
      value: { replaceState },
      writable: true,
    });

    const target = document.createElement("section");
    target.id = "projects";
    target.scrollIntoView = scrollIntoView;
    document.body.appendChild(target);

    render(
      <SmoothAnchor href="#projects" className="test-link">
        Projects
      </SmoothAnchor>
    );

    await userEvent.click(screen.getByRole("link", { name: /Projects/i }));

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
    expect(replaceState).toHaveBeenCalledWith(null, "", "#projects");

    document.body.removeChild(target);
  });
});
