import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const styles = readFileSync(new URL("./globals.css", import.meta.url), "utf8");
const maskRule = styles.match(/\.title-word-mask\s*\{([^}]*)\}/)?.[1] ?? "";

function emValue(pattern: RegExp) {
  return Number(maskRule.match(pattern)?.[1]);
}

describe("hero typography", () => {
  it("reserves compensated clip room for masked glyph ink", () => {
    const inlinePadding = emValue(/padding-inline:\s*(-?[\d.]+)em/);
    const bottomPadding = emValue(/padding-bottom:\s*(-?[\d.]+)em/);

    expect(inlinePadding).toBeGreaterThan(0);
    expect(bottomPadding).toBeGreaterThan(0);
    expect(emValue(/margin-inline:\s*(-?[\d.]+)em/)).toBe(-inlinePadding);
    expect(emValue(/margin-bottom:\s*(-?[\d.]+)em/)).toBe(-bottomPadding);
  });
});
