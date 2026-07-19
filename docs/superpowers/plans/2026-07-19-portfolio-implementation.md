# Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Create Next App screen with Irfan Hossain's production-ready, motion-led portfolio using the approved `DESIGN.md`, project data, and Zepa Cube Unicorn hero.

**Architecture:** Keep `app/page.tsx` as a Server Component for semantic static content. Isolate browser-only Unicorn Studio and GSAP behavior in two small Client Components. Store verified project/contact content in a typed data module and use local optimized project imagery.

**Tech Stack:** Next.js 16.2 App Router, React 19.2, TypeScript, Tailwind CSS 4, GSAP + `@gsap/react`, Unicorn Studio React, Framer Motion, Vitest.

## Global Constraints

- `DESIGN.md` is the visual source of truth.
- The Cube Unicorn is the first major visual below navigation and is part of the hero.
- Use Outfit Variable for primary typography and Geist Mono for taxonomy.
- Hero headline uses `max-w-6xl` and stays within 2 lines on desktop, 3 on narrow mobile.
- Follow AIDA: navigation, hero, interest, desire, hiring CTA/footer.
- Bento math is 12 columns × 2 rows: 14 + 5 + 3 + 2 = 24 occupied cells with `grid-flow-dense`.
- Do not publish precise user counts, fake testimonials, Instagram, or YouTube.
- Email is the primary Hire Me destination; WhatsApp is secondary.
- Provide WebGL and reduced-motion fallbacks.

---

### Task 1: Install runtime dependencies and establish the content contract

**Files:**

- Modify: `package.json`
- Modify: `bun.lock`
- Create: `lib/portfolio.ts`
- Create: `lib/portfolio.test.ts`
- Create: `vitest.config.ts`
- Create: `public/projects/bteb-flow.png`
- Create: `public/projects/amar-hisab.png`
- Create: `public/projects/smd-rework.png`
- Create: `public/projects/soldering-station.jpg`
- Create: `public/unicorn/cube-unicorn.json`

**Interfaces:**

- Produces: `projects`, `capabilities`, `socialLinks`, and `testimonials` for page rendering.
- Produces: local project images and the Zepa Unicorn Studio scene JSON.

- [ ] **Step 1: Install dependencies**

Run:

```bash
bun add gsap @gsap/react unicornstudio-react framer-motion
bun add -d vitest
```

- [ ] **Step 2: Configure Vitest and write the failing content contract test**

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({ test: { environment: "node" } });
```

```ts
import { describe, expect, it } from "vitest";
import { projects, socialLinks, testimonials } from "./portfolio";

describe("portfolio content", () => {
  it("keeps the approved featured-project order and adjacency", () => {
    expect(projects.map((project) => project.slug)).toEqual([
      "bteb-flow",
      "amar-hisab",
      "smd-rework-station",
      "diy-soldering-station",
    ]);
  });

  it("uses email as the primary hiring destination", () => {
    expect(socialLinks[0]).toMatchObject({ label: "Email", primary: true });
    expect(socialLinks[0].href).toBe("mailto:frazixgaming22@gmail.com");
  });

  it("does not publish testimonials before genuine quotes exist", () => {
    expect(testimonials).toEqual([]);
  });
});
```

- [ ] **Step 3: Run the test and verify RED**

Run: `bunx vitest run lib/portfolio.test.ts`

Expected: FAIL because `lib/portfolio.ts` does not exist.

- [ ] **Step 4: Implement the typed content module**

```ts
export type Project = {
  slug: string;
  title: string;
  field: string;
  summary: string;
  image: string;
  imageAlt: string;
  href: string;
  demo?: string;
  tone: "lime" | "lilac" | "coral" | "navy";
  gridClass: string;
};

export const projects: Project[] = [
  {
    slug: "bteb-flow",
    title: "BTEB Flow",
    field: "Education product",
    summary: "Learning resources and practical tools for Bangladesh's technical education students.",
    image: "/projects/bteb-flow.png",
    imageAlt: "BTEB Flow routine interface",
    href: "https://github.com/Frazix12/btebflow",
    demo: "https://btebflow.vercel.app/",
    tone: "lime",
    gridClass: "md:col-span-7 md:row-span-2",
  },
  {
    slug: "amar-hisab",
    title: "AmarHisab",
    field: "Finance product",
    summary: "An expense tracker with grocery-list management in one focused interface.",
    image: "/projects/amar-hisab.png",
    imageAlt: "AmarHisab expense dashboard",
    href: "https://github.com/Frazix12/AmarHisab",
    tone: "lilac",
    gridClass: "md:col-span-5",
  },
  {
    slug: "smd-rework-station",
    title: "SMD Rework Station",
    field: "Embedded system",
    summary: "PID heat control, airflow calibration, desktop tools, and a live web UI.",
    image: "/projects/smd-rework.png",
    imageAlt: "SMD Rework Station control interface",
    href: "https://github.com/Frazix12/SMD-Rework-Station",
    demo: "https://smd-station.vercel.app/",
    tone: "coral",
    gridClass: "md:col-span-3",
  },
  {
    slug: "diy-soldering-station",
    title: "DIY Soldering Station",
    field: "Electronics",
    summary: "A practical Arduino Nano and ATmega8 soldering-iron station.",
    image: "/projects/soldering-station.jpg",
    imageAlt: "Completed DIY soldering station",
    href: "https://github.com/Frazix12/SolderingStation",
    tone: "navy",
    gridClass: "md:col-span-2",
  },
];

export const capabilities = ["Web products", "APIs and systems", "Mobile", "IoT and electronics"];

export const socialLinks = [
  { label: "Email", href: "mailto:frazixgaming22@gmail.com", primary: true },
  { label: "GitHub", href: "https://github.com/Frazix12", primary: false },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/irfan-nig", primary: false },
  { label: "Facebook", href: "https://www.facebook.com/irfan.nig", primary: false },
  { label: "WhatsApp", href: "https://wa.me/irfan.nig", primary: false },
] as const;

export const testimonials: readonly [] = [];
```

- [ ] **Step 5: Download verified project assets and extract the Zepa scene**

Use these exact sources:

```text
https://raw.githubusercontent.com/Frazix12/btebflow/main/docs/Routine.png
https://raw.githubusercontent.com/Frazix12/AmarHisab/main/docs/screenshots/Expence.png
https://raw.githubusercontent.com/Frazix12/SMD-Rework-Station/main/docs/screenshots/main.png
https://raw.githubusercontent.com/Frazix12/SolderingStation/main/docs/demo.jpg
```

Extract the scene without sending its 41 KB content through the model context:

```js
const fs = require("node:fs");
const registry = await fetch("https://zepa.design/r/cube-unicorn.json").then((response) => response.json());
const scene = registry.files.find((file) => file.path === "ui/cube_scene.json");
fs.mkdirSync("public/unicorn", { recursive: true });
fs.writeFileSync("public/unicorn/cube-unicorn.json", scene.content);
```

- [ ] **Step 6: Run the test and verify GREEN**

Run: `bunx vitest run lib/portfolio.test.ts`

Expected: 3 tests pass.

### Task 2: Build the semantic AIDA page and visual system

**Files:**

- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Modify: `app/page.tsx`

**Interfaces:**

- Consumes: `projects`, `capabilities`, and `socialLinks` from `lib/portfolio.ts`.
- Produces: semantic page sections with stable IDs `work`, `about`, and `contact`.

- [ ] **Step 1: Update root metadata and fonts**

Use `Outfit` and `Geist_Mono` from `next/font/google`, and export static metadata:

```ts
export const metadata: Metadata = {
  metadataBase: new URL("https://irfu.ami.bd"),
  title: "Irfan Hossain — Full-Stack Developer",
  description: "Irfan Hossain builds web products, backend systems, mobile experiences, IoT, and electronics from Dhaka, Bangladesh.",
};
```

- [ ] **Step 2: Replace starter CSS with DESIGN.md tokens**

Use these exact approximations from the approved design:

```css
:root {
  --ink: #000000;
  --canvas: #ffffff;
  --surface-soft: #f3f3f3;
  --hairline: #e5e5e5;
  --block-lime: #c8f169;
  --block-lilac: #daccff;
  --block-cream: #f4efc6;
  --block-mint: #bdf3dc;
  --block-pink: #ffc7e8;
  --block-coral: #ff8f7e;
  --block-navy: #25244f;
}
```

Add 24px large radii, 50px pill controls, smooth anchor scrolling, visible `:focus-visible` outlines, reduced-motion overrides, and no dark color-scheme branch.

- [ ] **Step 3: Replace the starter page**

Create:

```tsx
<MotionRoot>
  <main className="w-full max-w-full overflow-x-hidden">
    <SiteNav />
    <Hero />
    <CapabilityMarquee />
    <ProjectBento projects={projects} />
    <FieldStatement />
    <ProjectStack projects={projects} />
    <ContactSection links={socialLinks} />
    <SiteFooter links={socialLinks} />
  </main>
</MotionRoot>
```

The hero must place `<CubeUnicorn />` directly after the centered headline and two CTAs. Project cards use `grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 grid-flow-dense` and the exact grid spans from Task 1.

- [ ] **Step 4: Run static checks**

Run: `bun run lint`

Expected: exit 0.

### Task 3: Add the Cube Unicorn and GSAP motion boundaries

**Files:**

- Create: `components/cube-unicorn.tsx`
- Create: `components/portfolio-motion.tsx`
- Modify: `app/page.tsx`

**Interfaces:**

- Produces: `CubeUnicorn(): JSX.Element`.
- Produces: `MotionRoot({ children }: { children: React.ReactNode }): JSX.Element`.

- [ ] **Step 1: Implement the client-only Cube Unicorn wrapper**

```tsx
"use client";

import { UnicornScene } from "unicornstudio-react";

export function CubeUnicorn() {
  return (
    <div className="cube-stage" aria-label="Interactive three-dimensional cube">
      <UnicornScene
        jsonFilePath="/unicorn/cube-unicorn.json"
        sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.2.5/dist/unicornStudio.umd.js"
        width="100%"
        height="100%"
        lazyLoad
      />
      <noscript><div className="cube-fallback" aria-hidden="true" /></noscript>
    </div>
  );
}
```

- [ ] **Step 2: Implement GSAP with reduced-motion protection**

```tsx
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function MotionRoot({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.utils.toArray<HTMLElement>("[data-project-media]").forEach((media) => {
      gsap.fromTo(media, { scale: 0.8 }, {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: media, start: "top 90%", end: "center 55%", scrub: true },
      });
    });

    gsap.utils.toArray<HTMLElement>("[data-stack-card]").forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: `top ${96 + index * 18}px`,
        endTrigger: "[data-stack]",
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
      });
    });
  }, { scope });

  return <div ref={scope}>{children}</div>;
}
```

- [ ] **Step 3: Verify client boundaries and production compilation**

Run: `bun run build`

Expected: successful production build with `/` statically generated.

### Task 4: Final accessibility, responsiveness, and requirement verification

**Files:**

- Verify and correct: `app/page.tsx`
- Verify and correct: `app/globals.css`
- Verify and correct: `components/cube-unicorn.tsx`
- Verify and correct: `components/portfolio-motion.tsx`

**Interfaces:**

- Consumes the completed page.
- Produces a verified portfolio with no blocking diagnostics.

- [ ] **Step 1: Run the complete automated checks**

```bash
bunx vitest run
bun run lint
bun run build
```

Expected: all commands exit 0.

- [ ] **Step 2: Verify key requirements in rendered output**

Check that the Cube Unicorn is in the first viewport below navigation, H1 remains 2–3 lines, primary CTA opens email, project links are correct, SMD and DIY soldering cards are adjacent, no testimonial content renders, and no horizontal scrollbar appears at mobile or desktop widths.

- [ ] **Step 3: Run diagnostics**

Run LSP diagnostics for all modified TypeScript files and `lens_diagnostics` mode `all`.

Expected: no blocking errors.
