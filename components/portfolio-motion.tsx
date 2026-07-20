"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis, { type ScrollToOptions } from "lenis";
import { CinematicCursor } from "./cinematic-cursor";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function MotionRoot({ children }: { children: React.ReactNode }) {
	const scope = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const media = gsap.matchMedia();

			media.add("(prefers-reduced-motion: no-preference)", () => {
				const anchors = {
					onComplete: () => {
						if (location.hash === "#main") {
							document.getElementById("main")?.focus({ preventScroll: true });
						}
					},
				} satisfies ScrollToOptions;
				const lenis = new Lenis({
					anchors,
					autoRaf: false,
					lerp: 0.12,
					smoothWheel: true,
					syncTouch: false,
				});
				const raf = (time: number) => lenis.raf(time * 1000);

				lenis.on("scroll", ScrollTrigger.update);
				gsap.ticker.add(raf);
				gsap.ticker.lagSmoothing(0);

				gsap
					.timeline({ defaults: { ease: "power3.out" } })
					.from("[data-opening-caption]", {
						opacity: 0,
						y: 16,
						duration: 0.45,
					})
					.from(
						"[data-opening-word]",
						{
							yPercent: 110,
							duration: 0.8,
							stagger: 0.045,
						},
						0.08,
					)
					.from(
						"[data-opening-visual]",
						{ opacity: 0, scale: 0.88, duration: 1.35 },
						0.1,
					);

				gsap.to("[data-field-track]", {
					xPercent: -10,
					ease: "none",
					scrollTrigger: {
						trigger: "[data-field-track]",
						start: "top bottom",
						end: "bottom top",
						scrub: 1,
					},
				});

				return () => {
					gsap.ticker.remove(raf);
					lenis.off("scroll", ScrollTrigger.update);
					lenis.destroy();
				};
			});

			media.add("(prefers-reduced-motion: no-preference)", () => {
				gsap
					.timeline({
						scrollTrigger: {
							trigger: "[data-identity]",
							start: "top top",
							end: "bottom bottom",
							scrub: 1,
						},
					})
					.fromTo(
						"[data-identity-word]",
						{ filter: "blur(12px)", opacity: 0.08, yPercent: 70 },
						{
							filter: "blur(0px)",
							opacity: 1,
							yPercent: 0,
							duration: 1,
							ease: "none",
							stagger: 0.1,
						},
						0,
					)
					.fromTo(
						"[data-identity-progress]",
						{ scaleY: 0 },
						{ scaleY: 1, duration: 1.8, ease: "none" },
						0,
					);
			});

			media.add(
				"(min-width: 768px) and (prefers-reduced-motion: no-preference)",
				() => {
					const scenes = gsap.utils.toArray<HTMLElement>(
						"[data-project-scene]",
					);

					scenes.forEach((scene, index) => {
						const mediaElement = scene.querySelector("[data-project-media]");
						if (mediaElement) {
							gsap.fromTo(
								mediaElement,
								{ scale: 1.08 },
								{
									scale: 1,
									ease: "none",
									scrollTrigger: {
										trigger: scene,
										start: "top bottom",
										end: "top top",
										scrub: 1,
									},
								},
							);
						}

						const nextScene = scenes[index + 1];
						if (!nextScene) return;

						gsap.to(scene.children, {
							opacity: 0.5,
							scale: 0.96,
							ease: "none",
							scrollTrigger: {
								trigger: nextScene,
								start: "top bottom",
								end: "top top",
								scrub: 1,
							},
						});
					});
				},
			);

			media.add(
				"(max-width: 767px) and (prefers-reduced-motion: no-preference)",
				() => {
					gsap.utils
						.toArray<HTMLElement>("[data-project-scene]")
						.forEach((scene) => {
							gsap.from(scene.children, {
								opacity: 0,
								y: 36,
								duration: 0.8,
								stagger: 0.1,
								ease: "power3.out",
								scrollTrigger: {
									trigger: scene,
									start: "top 78%",
									toggleActions: "play none none reverse",
								},
							});
						});
				},
			);

			return () => media.revert();
		},
		{ scope },
	);

	return (
		<div ref={scope}>
			<CinematicCursor />
			{children}
		</div>
	);
}
