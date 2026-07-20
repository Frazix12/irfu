import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const cursorPath = new URL("./cinematic-cursor.tsx", import.meta.url);
const cursorSource = existsSync(cursorPath)
	? readFileSync(cursorPath, "utf8")
	: "";
const pageSource = readFileSync(
	new URL("../app/page.tsx", import.meta.url),
	"utf8",
);
const motionSource = readFileSync(
	new URL("./portfolio-motion.tsx", import.meta.url),
	"utf8",
);

describe("cinematic cursor", () => {
	it("uses GSAP pointer tracking without React render churn", () => {
		expect(cursorSource).toContain("useEffect");
		expect(cursorSource).toContain("window.matchMedia(MOTION_MEDIA)");
		expect(cursorSource).toContain('addEventListener("change"');
		expect(cursorSource).not.toContain("useGSAP");
		expect(cursorSource).toContain("gsap.quickTo");
		expect(cursorSource).toContain("pointermove");
		expect(cursorSource).toContain("pointerdown");
		expect(cursorSource).toContain("pointerup");
		expect(cursorSource).toContain(
			'const MOTION_MEDIA = "(prefers-reduced-motion: no-preference)"',
		);
		expect(cursorSource).toContain('event.pointerType !== "mouse"');
		expect(cursorSource).not.toContain("useState");
	});

	it("opens action labels only for interactive hover targets", () => {
		expect(cursorSource).toContain(
			'target?.matches("a, button, summary") ?? false',
		);
		expect(cursorSource).toContain("label.textContent = isInteractive");
	});

	it("cleans up native cursor replacement and pointer listeners", () => {
		expect(cursorSource).toContain(
			'document.documentElement.classList.add("has-cinematic-cursor")',
		);
		expect(cursorSource).toContain(
			'document.documentElement.classList.remove("has-cinematic-cursor")',
		);
		expect(cursorSource).toContain("removeEventListener");
	});

	it("mounts the cursor and marks cinematic interaction targets", () => {
		expect(cursorSource).toContain("data-cinematic-cursor");
		expect(cursorSource).toContain('className="cursor-icon"');
		expect(cursorSource).toContain("target?.dataset.cursorIcon");
		expect(motionSource).toContain("<CinematicCursor />");
		expect(pageSource).toContain('data-cursor="EXPLORE"');
		expect(pageSource).toContain('data-cursor="VIEW"');
		expect(pageSource).toContain('data-cursor-icon="↗"');
		expect(pageSource).toContain('data-cursor-icon="T"');
		expect(pageSource).toContain('String(index + 1).padStart(2, "0")');
	});
});
