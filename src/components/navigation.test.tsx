import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { MobileMenu } from "./MobileMenu";
import { SideNav } from "./SideNav";

const expectedHashes = ["#hero", "#about", "#projects", "#experience", "#stack", "#contact"];

describe("SideNav", () => {
  it("renders exactly one nav anchor per section with clean hashes", () => {
    render(<SideNav />);

    const nav = screen.getByRole("navigation", { name: /primary/i });
    const links = within(nav).getAllByRole("link");

    for (const hash of expectedHashes) {
      expect(links.filter((el) => el.getAttribute("href") === hash).length).toBe(1);
    }
  });
});

describe("MobileMenu", () => {
  it("renders exactly one nav anchor per section with clean hashes when open", async () => {
    render(<MobileMenu />);

    await userEvent.click(screen.getByRole("button", { name: /open navigation menu/i }));

    const nav = screen.getByRole("navigation", { name: /primary mobile/i });
    const links = within(nav).getAllByRole("link");

    for (const hash of expectedHashes) {
      expect(links.filter((el) => el.getAttribute("href") === hash).length).toBe(1);
    }
  });
});
