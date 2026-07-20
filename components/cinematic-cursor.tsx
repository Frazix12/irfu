"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const MOTION_MEDIA = "(prefers-reduced-motion: no-preference)";
const CURSOR_TARGET = "[data-cursor], a, button, summary";

type MoveTo = (x: number, y: number) => void;

function createMover(element: HTMLElement, duration: number): MoveTo {
	const moveX = gsap.quickTo(element, "x", { duration, ease: "power3.out" });
	const moveY = gsap.quickTo(element, "y", { duration, ease: "power3.out" });
	return (x, y) => {
		moveX(x);
		moveY(y);
	};
}

function getCursorTarget(target: EventTarget | null) {
	return target instanceof Element
		? target.closest<HTMLElement>(CURSOR_TARGET)
		: null;
}

function updateCursorMode(
	root: HTMLElement,
	label: HTMLElement,
	icon: HTMLElement,
	target: HTMLElement | null,
) {
	const isInteractive = target?.matches("a, button, summary") ?? false;
	const isText = !isInteractive && target?.dataset.cursorMode === "text";
	const fallback = target?.matches(".button") ? "GO" : "OPEN";

	root.classList.toggle("is-action", isInteractive);
	root.classList.toggle("is-text", isText);
	label.textContent = isInteractive
		? (target?.dataset.cursor ?? fallback)
		: "";
	icon.textContent = target?.dataset.cursorIcon ?? (target ? "↗" : "+");
}

function attachCursorEvents(
	move: (event: PointerEvent) => void,
	hide: () => void,
	press: () => void,
	release: () => void,
) {
	document.addEventListener("pointermove", move, { passive: true });
	document.addEventListener("pointerdown", press, { passive: true });
	document.addEventListener("pointerup", release, { passive: true });
	document.documentElement.addEventListener("pointerleave", hide);
	window.addEventListener("blur", hide);
	return () => {
		document.removeEventListener("pointermove", move);
		document.removeEventListener("pointerdown", press);
		document.removeEventListener("pointerup", release);
		document.documentElement.removeEventListener("pointerleave", hide);
		window.removeEventListener("blur", hide);
	};
}

function moverDuration(index: number) {
	if (index === 0) return 0.16;
	if (index === 1) return 0.05;
	return 0.2 + index * 0.045;
}

function activateCursor(root: HTMLElement) {
	const ring = root.querySelector<HTMLElement>(".cursor-ring");
	const dot = root.querySelector<HTMLElement>(".cursor-dot");
	const label = root.querySelector<HTMLElement>(".cursor-label");
	const icon = root.querySelector<HTMLElement>(".cursor-icon");
	const trails = [...root.querySelectorAll<HTMLElement>(".cursor-trail")];
	if (!ring || !dot || !label || !icon) return;

	const nodes = [ring, dot, ...trails];
	const movers = nodes.map((node, index) =>
		createMover(node, moverDuration(index)),
	);
	gsap.set(nodes, { x: -100, xPercent: -50, y: -100, yPercent: -50 });
	document.documentElement.classList.add("has-cinematic-cursor");

	let activeTarget: HTMLElement | null = null;
	const move = (event: PointerEvent) => {
		if (event.pointerType !== "mouse") return;
		root.classList.add("is-visible");
		movers.forEach((moveTo) => moveTo(event.clientX, event.clientY));
		const target = getCursorTarget(event.target);
		if (target === activeTarget) return;
		activeTarget = target;
		updateCursorMode(root, label, icon, target);
	};
	const hide = () => root.classList.remove("is-visible");
	const press = () => root.classList.add("is-pressed");
	const release = () => root.classList.remove("is-pressed");

	const detach = attachCursorEvents(move, hide, press, release);
	return () => {
		detach();
		document.documentElement.classList.remove("has-cinematic-cursor");
		gsap.killTweensOf(nodes);
	};
}

export function CinematicCursor() {
	const scope = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const root = scope.current;
		if (!root) return;
		const media = window.matchMedia(MOTION_MEDIA);
		let deactivate: (() => void) | undefined;
		const sync = () => {
			deactivate?.();
			deactivate = media.matches ? activateCursor(root) : undefined;
		};
		sync();
		media.addEventListener("change", sync);
		return () => {
			media.removeEventListener("change", sync);
			deactivate?.();
		};
	}, []);

	return (
		<div
			ref={scope}
			className="cinematic-cursor"
			data-cinematic-cursor
			aria-hidden="true"
		>
			<span className="cursor-ring">
				<span className="cursor-icon">+</span>
				<span className="cursor-label" />
			</span>
			<span className="cursor-dot" />
			<span className="cursor-trails">
				{Array.from({ length: 5 }, (_, index) => (
					<span className="cursor-trail" key={index} />
				))}
			</span>
		</div>
	);
}
