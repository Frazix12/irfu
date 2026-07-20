import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const styles = readFileSync(new URL("./globals.css", import.meta.url), "utf8");
const layout = readFileSync(new URL("./layout.tsx", import.meta.url), "utf8");
const maskRule = styles.match(/\.title-word-mask\s*\{([^}]*)\}/)?.[1] ?? "";

function emValue(pattern: RegExp) {
	return Number(maskRule.match(pattern)?.[1]);
}

describe("hero typography", () => {
	it("uses Clash Display for cinematic headings and General Sans elsewhere", () => {
		expect(layout).toContain('from "next/font/local"');
		expect(layout).toContain('src: "./fonts/clash-display.woff2"');
		expect(layout).toContain('variable: "--font-clash-display"');
		expect(layout).toContain('src: "./fonts/general-sans.woff2"');
		expect(layout).toContain('variable: "--font-general-sans"');
		expect(styles).toMatch(/--font-sans:\s*var\(--font-general-sans\)/);
		expect(styles).toMatch(/--font-display:\s*var\(--font-clash-display\)/);
		expect(styles).toMatch(
			/h1,[\s\S]*?h2,[\s\S]*?h3\s*\{[\s\S]*?font-family:\s*var\(--font-display\)/,
		);
	});

	it("reserves compensated clip room for masked glyph ink", () => {
		const inlinePadding = emValue(/padding-inline:\s*(-?[\d.]+)em/);
		const bottomPadding = emValue(/padding-bottom:\s*(-?[\d.]+)em/);

		expect(inlinePadding).toBeGreaterThan(0);
		expect(bottomPadding).toBeGreaterThan(0);
		expect(emValue(/margin-inline:\s*(-?[\d.]+)em/)).toBe(-inlinePadding);
		expect(emValue(/margin-bottom:\s*(-?[\d.]+)em/)).toBe(-bottomPadding);
	});

	it("lets the two cinematic title lines rebalance into three lines on mobile", () => {
		const heroLineRules = [...styles.matchAll(/\.hero-line\s*\{([^}]*)\}/g)];
		const mobileRule = heroLineRules.at(-1)?.[1] ?? "";

		expect(mobileRule).toMatch(/display:\s*inline/);
		expect(mobileRule).toMatch(/white-space:\s*normal/);
	});
});
