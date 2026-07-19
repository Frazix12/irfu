import { describe, expect, it } from "vitest";
import { projects, socialLinks, testimonials } from "./portfolio";

describe("portfolio content", () => {
  it("keeps the approved featured-project order and adjacency", () => {
    expect(projects.map((project) => project.slug)).toEqual([
      "bteb-flow",
      "amar-hisab",
      "smd-rework-station",
      "diy-soldering-station",
    ]);
  });

  it("uses email as the primary hiring destination", () => {
    expect(socialLinks[0]).toMatchObject({ label: "Email", primary: true });
    expect(socialLinks[0].href).toBe("mailto:frazixgaming22@gmail.com");
  });

  it("does not publish testimonials before genuine quotes exist", () => {
    expect(testimonials).toEqual([]);
  });
});
