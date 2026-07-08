import { describe, expect, it } from "vitest";
import { contact } from "./contact";
import { experience } from "./experience";
import { navItems } from "./navigation";
import { projects } from "./projects";
import { skillCategories } from "./skills";

describe("portfolio data", () => {
  it("has nav items pointing to valid section anchors", () => {
    const ids = navItems.map((item) => item.id);
    for (const item of navItems) {
      expect(item.href).toMatch(/^#[a-z0-9-]+$/);
      expect(ids).toContain(item.href.slice(1));
    }
  });

  it("has at least one featured project", () => {
    const featured = projects.filter((p) => p.featured);
    expect(featured.length).toBeGreaterThanOrEqual(1);
    expect(featured[0]?.title.toLowerCase()).toContain("svarog");
  });

  it("does not expose a phone number in contact data", () => {
    const json = JSON.stringify(contact);
    expect(json).not.toMatch(/\b\d{7,}\b/);
  });

  it("includes LinkedIn and GitHub actions", () => {
    const kinds = contact.actions.map((a) => a.kind);
    expect(kinds).toContain("linkedin");
    expect(kinds).toContain("github");
  });

  it("has email link with correct address", () => {
    const emailAction = contact.actions.find((a) => a.kind === "email");
    expect(emailAction?.href).toBe("mailto:ranigfx@gmail.com");
  });

  it("renders experience timeline with companies and dates", () => {
    expect(experience.length).toBeGreaterThanOrEqual(3);
    for (const item of experience) {
      expect(item.company).toBeTruthy();
      expect(item.role).toBeTruthy();
      expect(item.dates).toBeTruthy();
      expect(item.bullets.length).toBeGreaterThan(0);
    }
  });

  it("groups skills into categories with levels", () => {
    expect(skillCategories.length).toBeGreaterThan(0);
    for (const category of skillCategories) {
      expect(category.title).toBeTruthy();
      expect(category.skills.length).toBeGreaterThan(0);
      for (const skill of category.skills) {
        expect(skill.name).toBeTruthy();
        expect(skill.level).toBeGreaterThanOrEqual(0);
        expect(skill.level).toBeLessThanOrEqual(100);
      }
    }
  });
});
