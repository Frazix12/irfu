import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const styles = readFileSync(new URL("./globals.css", import.meta.url), "utf8");

describe("navigation styling", () => {
	it("keeps the cinematic visual from showing through the navbar", () => {
		const headerRule = styles.match(/\.site-header\s*\{([^}]*)\}/)?.[1] ?? "";

		expect(headerRule).toMatch(/background:\s*var\(--ink\)/);
	});
});
