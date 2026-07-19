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

import Home from "./page";

const projectSlugs = [
	"bteb-flow",
	"amar-hisab",
	"smd-rework-station",
	"diy-soldering-station",
];

describe("cinematic portfolio structure", () => {
	const html = renderToStaticMarkup(<Home />);

	it("renders the opening, identity, project sequence, and final contact scene", () => {
		expect(html).toContain("data-opening");
		expect(html).toContain("data-identity");
		expect(html).toContain("data-project-sequence");
		expect(html).toContain("data-contact");
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
});
