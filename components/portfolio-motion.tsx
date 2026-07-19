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
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.utils
        .toArray<HTMLElement>("[data-project-media]")
        .forEach((media) => {
          gsap.fromTo(
            media,
            { scale: 0.8, opacity: 0.2 },
            {
              scale: 1,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: media,
                start: "top 90%",
                end: "center 55%",
                scrub: true,
              },
            },
          );
        });

      gsap.utils
        .toArray<HTMLElement>("[data-stack-card]")
        .forEach((card, index) => {
          ScrollTrigger.create({
            trigger: card,
            start: `top ${96 + index * 18}px`,
            endTrigger: "[data-stack]",
            end: "bottom bottom",
            pin: true,
            pinSpacing: false,
          });
        });
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
