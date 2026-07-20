import { readFileSync } from "node:fs";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({
	default: ({
		children,
		href,
		...props
	}: AnchorHTMLAttributes<HTMLAnchorElement> & {
		children: ReactNode;
		href: string;
	}) => (
		<a href={href} {...props}>
			{children}
		</a>
	),
}));

vi.mock("next/image", () => ({
	default: ({ src, alt }: { src: string; alt: string }) => (
		<img src={src} alt={alt} />
	),
}));

vi.mock("@/components/cube-unicorn", () => ({
	CubeUnicorn: () => <div data-cube-fallback />,
}));

vi.mock("@/components/portfolio-motion", () => ({
	MotionRoot: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

import { socialLinks } from "@/lib/portfolio";
import Home from "./page";

const projectSlugs = [
	"bteb-flow",
	"amar-hisab",
	"smd-rework-station",
	"diy-soldering-station",
];
const motionSource = readFileSync(
	new URL("../components/portfolio-motion.tsx", import.meta.url),
	"utf8",
);

describe("cinematic portfolio structure", () => {
	const html = renderToStaticMarkup(<Home />);

	it("renders the opening, identity, project sequence, and final contact scene", () => {
		expect(html).toContain("data-opening");
		expect(html).toContain("data-identity");
		expect(html).toContain("data-project-sequence");
		expect(html).toContain("data-contact");
	});

	it("preserves whitespace in the server-rendered hero heading", () => {
		const heading = html.match(/<h1[^>]*>(.*?)<\/h1>/)?.[1];
		expect(heading?.replace(/<[^>]+>/g, "")).toBe(
			"I build digital products and physical systems.",
		);
	});

	it("exposes the animated identity heading as a readable sentence", () => {
		expect(html).toContain(
			'aria-label="From screen to circuit, I build the systems between."',
		);
	});

	it("renders each featured project once and in approved order", () => {
		expect(html.match(/data-project-scene=/g)).toHaveLength(4);
		const positions = projectSlugs.map((slug) => {
			const token = `data-project-slug=\"${slug}\"`;
			expect(html.match(new RegExp(token, "g"))).toHaveLength(1);
			return html.indexOf(token);
		});
		expect(positions).toEqual([...positions].sort((a, b) => a - b));
	});

	it("removes the duplicated legacy project layouts", () => {
		expect(html).not.toContain("project-bento");
		expect(html).not.toContain("project-accordion");
		expect(html).not.toContain("stack-card");
	});

	it("keeps opening actions out of the intro tweens", () => {
		expect(motionSource).not.toContain("[data-opening-actions]");
	});

	it("scopes the only identity pin to tablet and desktop distances", () => {
		expect(motionSource.match(/pin: true/g)).toHaveLength(1);
		expect(motionSource).toContain(
			"(min-width: 960px) and (prefers-reduced-motion: no-preference)",
		);
		expect(motionSource).toContain(
			"(min-width: 768px) and (max-width: 959px) and (prefers-reduced-motion: no-preference)",
		);
		expect(motionSource).toContain(
			'context.conditions?.desktop ? "+=120%" : "+=70%"',
		);
	});

	it("keeps the footer to essential navigation and verified public links", () => {
		const footer = html.match(/<footer[^>]*>([\s\S]*?)<\/footer>/)?.[1] ?? "";

		expect(footer).toContain('aria-label="Footer navigation"');
		expect(footer).toContain('aria-label="Footer social links"');
		for (const href of ["#work", "#about", "#contact"]) {
			expect(footer).toContain(`href="${href}"`);
		}
		for (const link of socialLinks.slice(1)) {
			expect(footer).toContain(`href="${link.href}"`);
		}
		expect(footer).not.toContain(socialLinks[0].href);
	});
});
