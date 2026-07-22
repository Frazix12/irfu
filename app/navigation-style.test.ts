import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const styles = readFileSync(new URL("./globals.css", import.meta.url), "utf8");

describe("cinematic surface styling", () => {
	it("hides browser chrome without disabling page scrolling", () => {
		expect(styles).toMatch(/scrollbar-width:\s*none/);
		expect(styles).toMatch(/::-webkit-scrollbar[\s\S]*?display:\s*none/);
	});

	it("softens project imagery into each scene instead of showing hard edges", () => {
		const mediaRule =
			styles.match(/\.project-scene-media img\s*\{([^}]*)\}/)?.[1] ?? "";

		expect(mediaRule).toMatch(/mask-image:\s*radial-gradient/);
		expect(mediaRule).toMatch(/filter:\s*saturate/);
	});

	it("preserves visible spacing between animated identity words", () => {
		expect(styles).toMatch(
			/\[data-identity-word\]:not\(:last-child\)[\s\S]*?margin-right:\s*0\.2em/,
		);
	});

	it("gives buttons a smooth keyboard-accessible cinematic wipe", () => {
		const buttonRule = styles.match(/\.button\s*\{([^}]*)\}/)?.[1] ?? "";
		const wipeRule = styles.match(/\.button::before\s*\{([^}]*)\}/)?.[1] ?? "";

		expect(buttonRule).toMatch(/position:\s*relative/);
		expect(buttonRule).toMatch(/overflow:\s*hidden/);
		expect(buttonRule).toMatch(/transition:[\s\S]*?600ms/);
		expect(wipeRule).toMatch(/inset:\s*-20% -5%/);
		expect(wipeRule).toMatch(/transform:\s*translateY\(125%\) rotate\(-4deg\)/);
		expect(wipeRule).not.toMatch(/clip-path/);
		expect(wipeRule).toMatch(/transition:\s*transform 600ms/);
		expect(styles).toMatch(
			/\.button:is\(:hover,\s*:focus-visible\)::before\s*\{[^}]*transform:\s*translateY\(0\) rotate\(0deg\)/,
		);
	});

	it("only replaces the native cursor for fine pointers with motion enabled", () => {
		expect(styles).toMatch(
			/@media\s*\(hover:\s*hover\)\s*and\s*\(pointer:\s*fine\)\s*and\s*\(\s*prefers-reduced-motion:\s*no-preference\s*\)/,
		);
		expect(styles).toMatch(
			/html\.has-cinematic-cursor[\s\S]*?cursor:\s*none\s*!important/,
		);
		expect(styles).toMatch(
			/\.cinematic-cursor\s*\{[\s\S]*?pointer-events:\s*none/,
		);
	});

	it("keeps the reticle compact and detaches action labels", () => {
		const cursorStyles =
			styles.match(/\.cinematic-cursor\s*\{[\s\S]*?@media/)?.[0] ?? "";
		const ringRule = styles.match(/\.cursor-ring\s*\{([^}]*)\}/)?.[1] ?? "";
		const labelRule = styles.match(/\.cursor-label\s*\{([^}]*)\}/)?.[1] ?? "";

		expect(ringRule).toMatch(/width:\s*2\.35rem/);
		expect(ringRule).toMatch(/height:\s*2\.35rem/);
		expect(cursorStyles).not.toMatch(
			/\.cinematic-cursor\.is-(?:action|text) \.cursor-ring\s*\{[^}]*\b(?:width|height):/,
		);
		expect(labelRule).toMatch(/position:\s*absolute/);
		expect(labelRule).toMatch(/left:\s*calc\(100% \+ 0\.75rem\)/);
		expect(styles).toMatch(
			/\.cinematic-cursor\.is-action \.cursor-label\s*\{[^}]*opacity:\s*1/,
		);
		expect(styles).not.toMatch(
			/\.cinematic-cursor\.is-text \.cursor-label\s*\{[^}]*opacity:\s*1/,
		);
	});

	it("uses an angular reticle and dash trails instead of a common circle", () => {
		const ringRule = styles.match(/\.cursor-ring\s*\{([^}]*)\}/)?.[1] ?? "";
		const trailRule =
			[...styles.matchAll(/\.cursor-trail\s*\{([^}]*)\}/g)]
				.map((match) => match[1])
				.find((rule) => /height:/.test(rule)) ?? "";

		expect(ringRule).not.toMatch(/border-radius:\s*999px/);
		expect(styles).toMatch(
			/\.cursor-ring::before\s*\{[\s\S]*?clip-path:\s*polygon/,
		);
		expect(trailRule).toMatch(/height:\s*1px/);
		expect(styles).toMatch(
			/\.cursor-trail::before\s*\{[\s\S]*?transform:\s*rotate\(-24deg\)/,
		);
	});

	it("renders a masked local cloth-refraction field", () => {
		const clothRule = styles.match(/\.cursor-cloth\s*\{([^}]*)\}/)?.[1] ?? "";

		expect(clothRule).toMatch(/width:\s*10rem/);
		expect(clothRule).toMatch(/height:\s*10rem/);
		expect(clothRule).toMatch(/backdrop-filter:/);
		expect(clothRule).toMatch(/mask-image:\s*radial-gradient/);
		expect(clothRule).toMatch(/will-change:\s*transform/);
		expect(styles).toMatch(
			/\.cinematic-cursor\.is-action \.cursor-cloth\s*\{[^}]*opacity:/,
		);
	});
});
