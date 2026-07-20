"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function MotionRoot({ children }: { children: React.ReactNode }) {
	const scope = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const media = gsap.matchMedia();

			media.add("(prefers-reduced-motion: no-preference)", () => {
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
			});

			media.add(
				{
					desktop:
						"(min-width: 960px) and (prefers-reduced-motion: no-preference)",
					tablet:
						"(min-width: 768px) and (max-width: 959px) and (prefers-reduced-motion: no-preference)",
				},
				(context) => {
					gsap.fromTo(
						"[data-identity-word]",
						{ opacity: 0.14 },
						{
							opacity: 1,
							ease: "none",
							stagger: 0.08,
							scrollTrigger: {
								trigger: "[data-identity]",
								start: "top top",
								end: context.conditions?.desktop ? "+=120%" : "+=70%",
								pin: true,
								scrub: 1,
							},
						},
					);
				},
			);

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
					gsap.fromTo(
						"[data-identity-word]",
						{ opacity: 0.14 },
						{
							opacity: 1,
							ease: "none",
							stagger: 0.08,
							scrollTrigger: {
								trigger: "[data-identity]",
								start: "top 85%",
								end: "center 45%",
								scrub: 1,
							},
						},
					);

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

	return <div ref={scope}>{children}</div>;
}
