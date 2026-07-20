import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

interface LenisSpy {
	options: Record<string, unknown>;
	on: ReturnType<typeof vi.fn>;
	off: ReturnType<typeof vi.fn>;
	raf: ReturnType<typeof vi.fn>;
	destroy: ReturnType<typeof vi.fn>;
}

const harness = vi.hoisted(() => ({
	normalMotion: true,
	instances: [] as LenisSpy[],
	rootCleanups: [] as Array<() => void>,
	tickerCallbacks: new Set<(time: number) => void>(),
	scrollUpdate: vi.fn(),
	lagSmoothing: vi.fn(),
}));

vi.mock("lenis", () => ({
	default: class {
		options: Record<string, unknown>;
		on = vi.fn();
		off = vi.fn();
		raf = vi.fn();
		destroy = vi.fn();

		constructor(options: Record<string, unknown>) {
			this.options = options;
			harness.instances.push(this);
		}
	},
}));

vi.mock("gsap/ScrollTrigger", () => ({
	ScrollTrigger: { update: harness.scrollUpdate },
}));

vi.mock("gsap", () => {
	const timeline = { from: vi.fn() };
	timeline.from.mockReturnValue(timeline);

	return {
		default: {
			registerPlugin: vi.fn(),
			matchMedia: vi.fn(() => {
				const cleanups: Array<() => void> = [];
				return {
					add: vi.fn((query: unknown, callback: () => void | (() => void)) => {
						if (
							harness.normalMotion &&
							query === "(prefers-reduced-motion: no-preference)"
						) {
							const cleanup = callback();
							if (cleanup) cleanups.push(cleanup);
						}
					}),
					revert: vi.fn(() => {
						for (const cleanup of cleanups.splice(0).reverse()) cleanup();
					}),
				};
			}),
			ticker: {
				add: vi.fn((callback: (time: number) => void) => {
					harness.tickerCallbacks.add(callback);
				}),
				remove: vi.fn((callback: (time: number) => void) => {
					harness.tickerCallbacks.delete(callback);
				}),
				lagSmoothing: harness.lagSmoothing,
			},
			timeline: vi.fn(() => timeline),
			to: vi.fn(),
			from: vi.fn(),
			fromTo: vi.fn(),
			utils: { toArray: vi.fn(() => []) },
		},
	};
});

vi.mock("@gsap/react", () => ({
	useGSAP: (setup: () => void | (() => void)) => {
		const cleanup = setup();
		if (cleanup) harness.rootCleanups.push(cleanup);
	},
}));

import { MotionRoot } from "./portfolio-motion";

function mount(children: ReactNode = <main />) {
	renderToStaticMarkup(<MotionRoot>{children}</MotionRoot>);
	return harness.rootCleanups.at(-1);
}

describe("MotionRoot Lenis integration", () => {
	beforeEach(() => {
		harness.normalMotion = true;
		harness.instances.length = 0;
		harness.rootCleanups.length = 0;
		harness.tickerCallbacks.clear();
		vi.clearAllMocks();
	});

	afterEach(() => vi.unstubAllGlobals());

	it("bridges one restrained Lenis instance to GSAP and fully cleans it up", () => {
		const cleanup = mount();
		const [lenis] = harness.instances;
		const [tickerCallback] = harness.tickerCallbacks;

		expect(harness.instances).toHaveLength(1);
		expect(lenis.options).toMatchObject({
			anchors: { onComplete: expect.any(Function) },
			autoRaf: false,
			lerp: 0.12,
			smoothWheel: true,
			syncTouch: false,
		});
		expect(lenis.on).toHaveBeenCalledWith("scroll", harness.scrollUpdate);
		expect(harness.lagSmoothing).toHaveBeenCalledWith(0);

		tickerCallback(1.25);
		expect(lenis.raf).toHaveBeenCalledWith(1250);

		cleanup?.();
		expect(harness.tickerCallbacks).toHaveLength(0);
		expect(lenis.off).toHaveBeenCalledWith("scroll", harness.scrollUpdate);
		expect(lenis.destroy).toHaveBeenCalledOnce();

		const remountCleanup = mount();
		expect(harness.instances).toHaveLength(2);
		expect(harness.tickerCallbacks).toHaveLength(1);
		remountCleanup?.();
		expect(harness.tickerCallbacks).toHaveLength(0);
	});

	it("focuses main after its anchor completes without stealing other anchor focus", () => {
		const cleanup = mount();
		const anchors = harness.instances[0].options.anchors as {
			onComplete: () => void;
		};
		const focus = vi.fn();
		const getElementById = vi.fn(() => ({ focus }));
		vi.stubGlobal("document", { getElementById });
		vi.stubGlobal("location", { hash: "#main" });

		anchors.onComplete();
		expect(getElementById).toHaveBeenCalledWith("main");
		expect(focus).toHaveBeenCalledWith({ preventScroll: true });

		for (const hash of ["#work", "#about", "#contact", "#top"]) {
			location.hash = hash;
			anchors.onComplete();
		}
		expect(focus).toHaveBeenCalledOnce();
		cleanup?.();
	});

	it("leaves reduced-motion users on native scrolling", () => {
		harness.normalMotion = false;
		const cleanup = mount();

		expect(harness.instances).toHaveLength(0);
		expect(harness.tickerCallbacks).toHaveLength(0);
		cleanup?.();
	});
});
