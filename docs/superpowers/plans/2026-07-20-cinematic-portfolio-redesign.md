# Cinematic Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the repeated editorial portfolio layout with a cinematic, naturally scrolling title sequence that presents every featured project once and preserves fast, accessible access to Hire Me.

**Architecture:** Keep `app/page.tsx` server-rendered and use semantic `data-*` hooks for enhancement. Keep GSAP inside the existing `MotionRoot` client boundary, use CSS sticky positioning for project layering, and reserve ScrollTrigger pinning for the identity scene. Reuse the verified project screenshots, Cube Unicorn, portfolio data, Outfit font, and existing dependencies.

**Tech Stack:** Next.js 16.2.10 App Router, React 19.2.4, TypeScript 5, Tailwind CSS 4 plus global CSS, GSAP 3.15 with `@gsap/react`, Unicorn Studio React, Vitest 4.

## Global Constraints

- Treat `docs/superpowers/specs/2026-07-20-cinematic-portfolio-redesign-design.md` as the approved feature specification.
- Checkpoint the six currently modified tracked files before redesign work; the user explicitly approved this baseline commit.
- Do not stage or modify unrelated untracked inputs: `.agents/`, `.pi-subagents/`, `.superpowers/`, `DEASIGN.html`, `DESIGN.md`, or `skills-lock.json`.
- Preserve `app/page.tsx` as a Server Component and isolate browser APIs in `components/portfolio-motion.tsx` and `components/cube-unicorn.tsx`.
- Use existing GSAP and native scrolling. Do not add a smooth-scroll package, animation library, CMS, video, audio, or global state.
- Keep Outfit as the display/body typeface and Geist Mono only for restrained captions.
- Render BTEB Flow, AmarHisab, SMD Rework Station, and DIY Soldering Station exactly once, in that order.
- Use project scene tones in this order: lilac, mint, coral, navy.
- Keep the opening animation non-blocking and no longer than two seconds.
- Keep Hire Me and Selected Work usable immediately.
- Hero headline: at most two rendered lines on desktop and three at 320px.
- Use only transform and opacity for JS animation.
- Reduced motion disables opening animation, pinning, scrub motion, marquee movement, and image scaling while preserving all content.
- Do not add testimonials, metrics, clients, user counts, or stronger personal claims.
- Preserve ordinary links, semantic landmarks, visible focus, 44px touch targets, project alt text, and no-JavaScript readability.
- Follow the local Next.js 16 guidance already reviewed: narrow client boundaries, `next/image` with reserved parent geometry and accurate `sizes`, global CSS imported only from the root layout, and production-build verification.

## File map

- Modify `app/page.tsx`: replace bento, accordion, and duplicate project stack with opening, identity, single project sequence, field montage, contact title card, and minimal footer.
- Replace `app/globals.css`: implement the near-black title-sequence visual system, project color arc, responsive sticky scenes, focus states, static fallback, and reduced-motion rules.
- Modify `components/portfolio-motion.tsx`: implement the non-blocking opening timeline, pinned identity reveal, project depth transitions, and mobile reveals.
- Modify `lib/portfolio.ts`: remove bento-only `gridClass` data and assign the approved scene tones.
- Modify `lib/portfolio.test.ts`: lock project order, scene tones, and presentation-free project data.
- Modify `vitest.config.ts`: resolve the existing `@/` alias for component tests.
- Create `app/page.test.tsx`: verify one cinematic sequence, four unique project scenes, correct order, and removal of duplicate legacy layouts.
- Leave `app/layout.tsx` and `components/cube-unicorn.tsx` unchanged after the approved baseline checkpoint unless verification exposes a real defect.

---

### Task 0: Checkpoint the approved current baseline

**Files:**

- Commit existing modifications: `app/layout.tsx`
- Commit existing modifications: `app/page.tsx`
- Commit existing modifications: `components/cube-unicorn.tsx`
- Commit existing modifications: `components/portfolio-motion.tsx`
- Commit existing modifications: `lib/portfolio.test.ts`
- Commit existing modifications: `lib/portfolio.ts`

**Interfaces:**

- Consumes: the current working tree, which differs semantically only by formatting according to `git diff -w`.
- Produces: a clean tracked baseline from which redesign commits can be reviewed independently.

- [ ] **Step 1: Confirm only the approved tracked files are selected**

Run:

```bash
git status --short
git diff -w --stat
```

Expected: the six files listed above are modified; `git diff -w --stat` reports only formatting-level changes in `app/page.tsx` and `lib/portfolio.ts`; untracked design/tool inputs remain untouched.

- [ ] **Step 2: Verify the baseline before committing**

Run:

```bash
bunx vitest run
bun run lint
bunx tsc --noEmit
```

Expected: 3 tests pass; ESLint and TypeScript report no errors.

- [ ] **Step 3: Commit only the approved baseline files**

```bash
git add app/layout.tsx app/page.tsx components/cube-unicorn.tsx components/portfolio-motion.tsx lib/portfolio.test.ts lib/portfolio.ts
git commit -m "chore: checkpoint portfolio formatting"
```

Expected: one commit containing only those six tracked files. Do not use `git add .`.

---

### Task 1: Establish the cinematic page contract and single project sequence

**Files:**

- Modify: `vitest.config.ts:1-3`
- Create: `app/page.test.tsx`
- Modify: `lib/portfolio.test.ts:1-25`
- Modify: `lib/portfolio.ts:1-91`
- Replace: `app/page.tsx:1-301`

**Interfaces:**

- Consumes: `projects`, `capabilities`, `socialLinks`, and `Project` from `lib/portfolio.ts`; `CubeUnicorn`; `MotionRoot`.
- Produces: `Project.tone: "lilac" | "mint" | "coral" | "navy"`; DOM hooks `[data-opening]`, `[data-opening-word]`, `[data-opening-visual]`, `[data-identity]`, `[data-identity-word]`, `[data-project-sequence]`, `[data-project-scene]`, `[data-project-media]`, `[data-field-track]`, and `[data-contact]`.

- [ ] **Step 1: Add alias resolution for component tests**

Replace `vitest.config.ts` with:

```ts
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
 resolve: {
  alias: { "@": fileURLToPath(new URL(".", import.meta.url)) },
 },
 test: { environment: "node" },
});
```

- [ ] **Step 2: Write the failing page-structure test**

Create `app/page.test.tsx`:

```tsx
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
```

- [ ] **Step 3: Extend the failing content contract**

Add this test inside the existing `describe` block in `lib/portfolio.test.ts`:

```ts
 it("keeps cinematic scene tones in the approved order", () => {
  expect(projects.map((project) => project.tone)).toEqual([
   "lilac",
   "mint",
   "coral",
   "navy",
  ]);
  expect(projects.every((project) => !("gridClass" in project))).toBe(true);
 });
```

- [ ] **Step 4: Run the tests and verify the new contract fails**

Run:

```bash
bunx vitest run app/page.test.tsx lib/portfolio.test.ts
```

Expected: failures because the cinematic data hooks do not exist, legacy layouts still render, BTEB Flow still uses `lime`, AmarHisab still uses `lilac`, and `gridClass` still exists.

- [ ] **Step 5: Remove bento layout data and assign cinematic scene tones**

In `lib/portfolio.ts`, change `Project` to:

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
 tone: "lilac" | "mint" | "coral" | "navy";
};
```

Delete every `gridClass` property. Set the project tones exactly as follows:

```ts
// BTEB Flow
tone: "lilac",

// AmarHisab
tone: "mint",

// SMD Rework Station
tone: "coral",

// DIY Soldering Station
tone: "navy",
```

Do not change titles, summaries, URLs, image paths, or alt text.

- [ ] **Step 6: Replace the page with one semantic cinematic sequence**

Replace `app/page.tsx` with the following structure. Preserve the exact public copy and links shown here:

```tsx
import Image from "next/image";
import Link from "next/link";
import { CubeUnicorn } from "@/components/cube-unicorn";
import { MotionRoot } from "@/components/portfolio-motion";
import {
 capabilities,
 projects,
 socialLinks,
 type Project,
} from "@/lib/portfolio";

const heroWords = "I build digital products and physical systems.".split(" ");
const identityWords = "From screen to circuit, I build the systems between.".split(
 " ",
);

function SiteNav() {
 return (
  <header className="site-header">
   <nav className="site-nav" aria-label="Primary navigation">
    <Link className="wordmark" href="#top" aria-label="Irfan Hossain, home">
     Irfan Hossain
    </Link>
    <div className="nav-links">
     <Link href="#work">Work</Link>
     <Link href="#about">About</Link>
     <Link href="#contact">Contact</Link>
    </div>
    <details className="mobile-nav">
     <summary>Menu</summary>
     <div>
      <Link href="#work">Work</Link>
      <Link href="#about">About</Link>
      <Link href="#contact">Contact</Link>
     </div>
    </details>
    <Link className="button button-light nav-hire" href={socialLinks[0].href}>
     Hire Me
    </Link>
   </nav>
  </header>
 );
}

function OpeningScene() {
 return (
  <section className="opening-scene" id="top" aria-labelledby="hero-title" data-opening>
   <div className="opening-copy">
    <p className="scene-caption" data-opening-caption>
     Full-Stack Developer · Dhaka, Bangladesh
    </p>
    <h1 id="hero-title">
     {heroWords.map((word) => (
      <span className="title-word-mask" key={word}>
       <span data-opening-word>{word}</span>
      </span>
     ))}
    </h1>
    <div className="hero-actions" data-opening-actions>
     <Link className="button button-light" href={socialLinks[0].href}>
      Hire Me
     </Link>
     <Link className="button button-outline" href="#work">
      Selected Work
     </Link>
    </div>
   </div>
   <div className="opening-visual" data-opening-visual>
    <CubeUnicorn />
   </div>
   <p className="scroll-prompt" aria-hidden="true">
    Scroll to enter
   </p>
  </section>
 );
}

function IdentityScene() {
 return (
  <section className="identity-scene" id="about" aria-labelledby="identity-title" data-identity>
   <p className="scene-caption">One practice across software and hardware</p>
   <h2 id="identity-title">
    {identityWords.map((word, index) => (
     <span data-identity-word key={`${word}-${index}`}>
      {word}{" "}
     </span>
    ))}
   </h2>
  </section>
 );
}

function ProjectLinks({ project }: { project: Project }) {
 return (
  <div className="project-links">
   <Link href={project.href} target="_blank" rel="noreferrer">
    Repository <span aria-hidden="true">↗</span>
   </Link>
   {project.demo ? (
    <Link href={project.demo} target="_blank" rel="noreferrer">
     Live product <span aria-hidden="true">↗</span>
    </Link>
   ) : null}
  </div>
 );
}

function ProjectSequence() {
 return (
  <section className="project-sequence" id="work" aria-labelledby="work-title" data-project-sequence>
   <header className="sequence-intro">
    <p className="scene-caption">Selected work</p>
    <h2 id="work-title">Four projects. One practice.</h2>
   </header>
   <div className="project-scenes">
    {projects.map((project) => (
     <article
      className={`project-scene tone-${project.tone}`}
      data-project-scene
      data-project-slug={project.slug}
      key={project.slug}
     >
      <div className="project-scene-copy">
       <p className="scene-caption">{project.field}</p>
       <h3>{project.title}</h3>
       <p>{project.summary}</p>
       <ProjectLinks project={project} />
      </div>
      <Link
       className="project-scene-media"
       href={project.demo ?? project.href}
       target="_blank"
       rel="noreferrer"
       aria-label={`View ${project.title}`}
      >
       <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        sizes="(max-width: 767px) 100vw, 58vw"
        data-project-media
       />
      </Link>
     </article>
    ))}
   </div>
  </section>
 );
}

function FieldMontage() {
 return (
  <section className="field-montage" aria-labelledby="fields-title">
   <p className="scene-caption">Built across disciplines</p>
   <h2 id="fields-title">Products that move between pixels and physical systems.</h2>
   <div className="field-track" data-field-track>
    {capabilities.map((capability) => (
     <span key={capability}>{capability}</span>
    ))}
   </div>
  </section>
 );
}

function ContactScene() {
 return (
  <section className="contact-scene" id="contact" aria-labelledby="contact-title" data-contact>
   <p className="scene-caption">Available for internships and freelance projects.</p>
   <h2 id="contact-title">Let&apos;s build what comes next.</h2>
   <Link className="button button-dark" href={socialLinks[0].href}>
    Hire Me
   </Link>
   <nav className="contact-links" aria-label="Contact and social links">
    {socialLinks.slice(1).map((link) => (
     <Link key={link.label} href={link.href} target="_blank" rel="noreferrer">
      {link.label}
     </Link>
    ))}
   </nav>
  </section>
 );
}

function SiteFooter() {
 return (
  <footer className="site-footer">
   <div>
    <Link className="footer-name" href="#top">Irfan Hossain</Link>
    <p>Full-Stack Developer · Dhaka, Bangladesh</p>
   </div>
   <Link href="#top">Back to top</Link>
  </footer>
 );
}

export default function Home() {
 return (
  <MotionRoot>
   <a className="skip-link" href="#main">Skip to content</a>
   <SiteNav />
   <main id="main" className="cinematic-page">
    <OpeningScene />
    <IdentityScene />
    <ProjectSequence />
    <FieldMontage />
    <ContactScene />
   </main>
   <SiteFooter />
  </MotionRoot>
 );
}
```

- [ ] **Step 7: Run focused tests and diagnostics**

Run:

```bash
bunx vitest run app/page.test.tsx lib/portfolio.test.ts
bun run lint -- app/page.tsx app/page.test.tsx lib/portfolio.ts lib/portfolio.test.ts vitest.config.ts
bunx tsc --noEmit
```

Expected: 7 tests pass; lint and TypeScript report no errors. If the test runner counts differ because Vitest groups files differently, all named tests must pass.

- [ ] **Step 8: Commit the server-rendered cinematic structure**

```bash
git add app/page.tsx app/page.test.tsx lib/portfolio.ts lib/portfolio.test.ts vitest.config.ts
git commit -m "feat: build cinematic portfolio chapters"
```

---

### Task 2: Build the cinematic visual system and responsive scene layout

**Files:**

- Replace: `app/globals.css:1-847`

**Interfaces:**

- Consumes: the classes and `data-*` hooks produced by Task 1.
- Produces: stable scene geometry for GSAP, desktop sticky project layers, a normal-flow mobile layout, visible focus states, static no-JavaScript presentation, and reduced-motion CSS fallbacks.

- [ ] **Step 1: Record the mandatory design preflight before editing CSS**

Use this approved preflight in the implementation log:

```text
Hero: Cinematic Center with a dominant Cube Unicorn.
Font: Outfit with restrained Geist Mono captions.
AIDA: navigation → opening/identity attention → project interest → motion-led desire → hiring action.
Hero width: min(92vw, 88rem), two desktop lines and three lines at 320px.
Project density: four projects rendered once; no bento cells and therefore no empty-grid state.
Labels: no section numbers, fake timecodes, badges, or technical filler.
Buttons: off-white on charcoal, charcoal on off-white, and outlined off-white all meet AA contrast.
```

- [ ] **Step 2: Replace the global stylesheet with the cinematic foundation**

Begin `app/globals.css` with the exact token and reset foundation below, then implement the selector groups in Steps 3–6 in the same file:

```css
@import "tailwindcss";

:root {
 --ink: #111214;
 --paper: #f4f2ed;
 --muted: #aaa8a3;
 --line-dark: rgb(244 242 237 / 18%);
 --line-light: rgb(17 18 20 / 18%);
 --scene-lilac: #daccff;
 --scene-mint: #bdf3dc;
 --scene-coral: #ff8f7e;
 --scene-navy: #25244f;
 --scene-gutter: clamp(1rem, 3vw, 3rem);
 --content-width: 90rem;
 --font-sans: var(--font-outfit);
 --font-mono: var(--font-geist-mono);
}

* {
 box-sizing: border-box;
}

html {
 scroll-behavior: smooth;
 scroll-padding-top: 5rem;
 background: var(--ink);
}

body {
 margin: 0;
 background: var(--ink);
 color: var(--paper);
 font-family: var(--font-sans), sans-serif;
 text-rendering: optimizeLegibility;
}

body::after {
 position: fixed;
 inset: 0;
 z-index: 30;
 background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.18'/%3E%3C/svg%3E");
 content: "";
 opacity: 0.035;
 pointer-events: none;
}

a {
 color: inherit;
 text-decoration: none;
}

button,
a,
summary {
 touch-action: manipulation;
}

:focus-visible {
 outline: 3px solid currentColor;
 outline-offset: 4px;
}

.skip-link {
 position: fixed;
 top: 0.75rem;
 left: 0.75rem;
 z-index: 50;
 padding: 0.75rem 1rem;
 background: var(--paper);
 color: var(--ink);
 transform: translateY(-150%);
}

.skip-link:focus {
 transform: translateY(0);
}

.cinematic-page {
 width: 100%;
 max-width: 100%;
 overflow-x: clip;
}

.scene-caption {
 margin: 0;
 font-family: var(--font-mono), monospace;
 font-size: clamp(0.7rem, 0.8vw, 0.82rem);
 line-height: 1.3;
 letter-spacing: 0.12em;
 text-transform: uppercase;
}

.button {
 display: inline-flex;
 min-height: 2.75rem;
 align-items: center;
 justify-content: center;
 padding: 0.72rem 1.35rem;
 border: 1px solid transparent;
 border-radius: 999px;
 font-size: 1rem;
 font-weight: 600;
 line-height: 1;
 white-space: nowrap;
 transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1), background-color 220ms ease, color 220ms ease;
}

.button:hover {
 transform: translateY(-2px);
}

.button:active {
 transform: translateY(0) scale(0.98);
}

.button-light {
 background: var(--paper);
 color: var(--ink);
}

.button-dark {
 background: var(--ink);
 color: var(--paper);
}

.button-outline {
 border-color: var(--line-dark);
 background: transparent;
 color: var(--paper);
}
```

- [ ] **Step 3: Implement navigation and the opening frame**

Add selectors with these exact responsibilities and values:

```css
.site-header {
 position: absolute;
 top: 0;
 left: 0;
 z-index: 20;
 width: 100%;
}

.site-nav {
 display: grid;
 width: min(100%, var(--content-width));
 min-height: 4.5rem;
 grid-template-columns: 1fr auto 1fr;
 align-items: center;
 gap: 2rem;
 margin-inline: auto;
 padding-inline: var(--scene-gutter);
 border-bottom: 1px solid var(--line-dark);
}

.wordmark {
 font-size: 1rem;
 font-weight: 600;
}

.nav-links {
 display: flex;
 gap: 2rem;
 font-size: 0.95rem;
}

.nav-links a,
.contact-links a,
.site-footer a {
 transition: opacity 180ms ease;
}

.nav-links a:hover,
.contact-links a:hover,
.site-footer a:hover {
 opacity: 0.58;
}

.nav-hire {
 justify-self: end;
}

.mobile-nav {
 display: none;
}

.opening-scene {
 position: relative;
 display: grid;
 min-height: 100svh;
 align-items: end;
 isolation: isolate;
 padding: clamp(7rem, 12vh, 10rem) var(--scene-gutter) clamp(4rem, 8vh, 7rem);
 background: var(--ink);
 overflow: hidden;
}

.opening-copy {
 position: relative;
 z-index: 2;
 width: min(100%, var(--content-width));
 margin-inline: auto;
}

.opening-copy .scene-caption {
 margin-bottom: clamp(1.5rem, 3vh, 2.5rem);
 color: var(--muted);
}

.opening-copy h1 {
 width: min(92vw, 88rem);
 max-width: 100%;
 margin: 0;
 font-size: clamp(3.2rem, 8.2vw, 8.4rem);
 font-weight: 500;
 line-height: 0.88;
 letter-spacing: -0.055em;
 text-wrap: balance;
}

.title-word-mask {
 display: inline-block;
 overflow: hidden;
 vertical-align: bottom;
}

.title-word-mask:not(:last-child) {
 margin-right: 0.2em;
}

.title-word-mask > span {
 display: inline-block;
}

.hero-actions {
 display: flex;
 flex-wrap: wrap;
 gap: 0.75rem;
 margin-top: clamp(1.75rem, 4vh, 3rem);
}

.opening-visual {
 position: absolute;
 inset: 3.5rem 0 0 38%;
 z-index: 1;
 opacity: 0.82;
}

.cube-stage {
 width: 100%;
 height: 100%;
 min-height: 42rem;
}

.cube-stage > div {
 width: 100% !important;
 height: 100% !important;
}

.cube-fallback {
 position: absolute;
 top: 50%;
 left: 55%;
 width: clamp(12rem, 24vw, 25rem);
 aspect-ratio: 1;
 transform: translate(-50%, -50%) rotate(35deg);
 border: 1px solid var(--line-dark);
 background: rgb(244 242 237 / 4%);
}

.cube-fallback span {
 position: absolute;
 inset: 12%;
 border: 1px solid var(--line-dark);
}

.cube-fallback span:nth-child(2) {
 inset: 28%;
}

.cube-fallback span:nth-child(3) {
 inset: 42%;
}

.scroll-prompt {
 position: absolute;
 right: var(--scene-gutter);
 bottom: 1.25rem;
 z-index: 2;
 margin: 0;
 font-family: var(--font-mono), monospace;
 font-size: 0.7rem;
 letter-spacing: 0.12em;
 text-transform: uppercase;
}
```

- [ ] **Step 4: Implement identity, project scenes, montage, contact, and footer**

Add the following layout contract. Preserve open layouts; do not wrap these scenes in generic cards:

```css
.identity-scene {
 display: flex;
 min-height: 100svh;
 flex-direction: column;
 justify-content: center;
 padding: clamp(6rem, 12vh, 10rem) var(--scene-gutter);
 background: var(--ink);
}

.identity-scene > * {
 width: min(100%, var(--content-width));
 margin-inline: auto;
}

.identity-scene .scene-caption {
 margin-bottom: 2rem;
 color: var(--muted);
}

.identity-scene h2 {
 margin-block: 0;
 font-size: clamp(3.1rem, 7.6vw, 8rem);
 font-weight: 500;
 line-height: 0.94;
 letter-spacing: -0.05em;
}

.identity-scene [data-identity-word] {
 display: inline;
 opacity: 1;
}

.sequence-intro {
 display: flex;
 min-height: 72svh;
 flex-direction: column;
 justify-content: end;
 padding: 6rem var(--scene-gutter) 4rem;
 background: var(--ink);
}

.sequence-intro > * {
 width: min(100%, var(--content-width));
 margin-inline: auto;
}

.sequence-intro .scene-caption {
 margin-bottom: 1.5rem;
 color: var(--muted);
}

.sequence-intro h2 {
 margin-block: 0;
 font-size: clamp(3rem, 7vw, 7.5rem);
 font-weight: 500;
 line-height: 0.94;
 letter-spacing: -0.05em;
}

.project-scenes {
 position: relative;
}

.project-scene {
 position: sticky;
 top: 0;
 display: grid;
 min-height: 100svh;
 grid-template-columns: minmax(18rem, 0.8fr) minmax(0, 1.2fr);
 align-items: center;
 gap: clamp(2rem, 6vw, 7rem);
 padding: clamp(5.5rem, 10vh, 8rem) var(--scene-gutter) clamp(2rem, 5vh, 4rem);
 color: var(--ink);
 overflow: hidden;
}

.project-scene > * {
 min-width: 0;
}

.tone-lilac { background: var(--scene-lilac); }
.tone-mint { background: var(--scene-mint); }
.tone-coral { background: var(--scene-coral); }
.tone-navy { background: var(--scene-navy); color: var(--paper); }

.project-scene-copy {
 position: relative;
 z-index: 2;
 max-width: 35rem;
}

.project-scene-copy h3 {
 margin: 1rem 0 1.5rem;
 font-size: clamp(3.2rem, 6vw, 7rem);
 font-weight: 550;
 line-height: 0.9;
 letter-spacing: -0.055em;
}

.project-scene-copy > p:not(.scene-caption) {
 max-width: 32rem;
 margin: 0;
 font-size: clamp(1.1rem, 1.5vw, 1.35rem);
 line-height: 1.5;
}

.project-links {
 display: flex;
 flex-wrap: wrap;
 gap: 1.25rem;
 margin-top: 2rem;
 font-size: 1rem;
 font-weight: 600;
}

.project-links a {
 border-bottom: 1px solid currentColor;
}

.project-scene-media {
 position: relative;
 display: block;
 width: 100%;
 aspect-ratio: 16 / 10;
 background: rgb(17 18 20 / 9%);
 overflow: hidden;
}

.project-scene-media img {
 object-fit: cover;
 transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
}

.project-scene-media:hover img {
 transform: scale(1.025);
}

.field-montage {
 position: relative;
 z-index: 2;
 padding: clamp(8rem, 16vh, 14rem) var(--scene-gutter);
 background: var(--ink);
 overflow: hidden;
}

.field-montage > *:not(.field-track) {
 width: min(100%, var(--content-width));
 margin-inline: auto;
}

.field-montage .scene-caption {
 margin-bottom: 2rem;
 color: var(--muted);
}

.field-montage h2 {
 max-width: 70rem;
 margin-top: 0;
 margin-bottom: clamp(4rem, 9vh, 8rem);
 font-size: clamp(3rem, 6.8vw, 7rem);
 font-weight: 500;
 line-height: 0.95;
 letter-spacing: -0.05em;
}

.field-track {
 display: flex;
 width: max-content;
 gap: clamp(2rem, 6vw, 7rem);
 padding-inline: 6vw;
 font-size: clamp(2.2rem, 5vw, 5rem);
 font-weight: 500;
 line-height: 1;
 white-space: nowrap;
}

.field-track span:not(:last-child)::after {
 margin-left: clamp(2rem, 6vw, 7rem);
 color: var(--muted);
 content: "·";
}

.contact-scene {
 position: relative;
 z-index: 2;
 display: flex;
 min-height: 100svh;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 padding: 7rem var(--scene-gutter);
 background: var(--paper);
 color: var(--ink);
 text-align: center;
}

.contact-scene h2 {
 max-width: 75rem;
 margin: 2rem auto 3rem;
 font-size: clamp(3.5rem, 8vw, 8rem);
 font-weight: 550;
 line-height: 0.9;
 letter-spacing: -0.055em;
 text-wrap: balance;
}

.contact-links {
 display: flex;
 flex-wrap: wrap;
 justify-content: center;
 gap: 1.5rem;
 margin-top: 3rem;
}

.site-footer {
 position: relative;
 z-index: 2;
 display: flex;
 align-items: end;
 justify-content: space-between;
 gap: 2rem;
 padding: 3rem var(--scene-gutter);
 border-top: 1px solid var(--line-dark);
 background: var(--ink);
}

.site-footer p {
 margin: 0.5rem 0 0;
 color: var(--muted);
}

.footer-name {
 font-size: 1.15rem;
 font-weight: 600;
}
```

- [ ] **Step 5: Implement explicit tablet and mobile composition**

Add these media rules. Keep project scenes sticky only at desktop widths:

```css
@media (max-width: 959px) {
 .nav-links {
  display: none;
 }

 .mobile-nav {
  position: relative;
  display: block;
  justify-self: center;
 }

 .mobile-nav summary {
  min-height: 2.75rem;
  padding: 0.8rem;
  cursor: pointer;
  list-style: none;
 }

 .mobile-nav summary::-webkit-details-marker {
  display: none;
 }

 .mobile-nav > div {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 50%;
  display: grid;
  min-width: 10rem;
  gap: 0.25rem;
  padding: 0.75rem;
  border: 1px solid var(--line-dark);
  background: var(--ink);
  transform: translateX(-50%);
 }

 .mobile-nav a {
  padding: 0.75rem;
 }

 .opening-visual {
  left: 30%;
 }

 .project-scene {
  grid-template-columns: minmax(15rem, 0.8fr) minmax(0, 1.2fr);
  gap: 2rem;
 }
}

@media (max-width: 767px) {
 html {
  scroll-padding-top: 4.25rem;
 }

 .site-nav {
  min-height: 4.25rem;
  grid-template-columns: 1fr auto auto;
  gap: 0.6rem;
 }

 .wordmark {
  font-size: 0.9rem;
 }

 .nav-hire {
  min-height: 2.5rem;
  padding-inline: 0.9rem;
  font-size: 0.9rem;
 }

 .opening-scene {
  min-height: 100svh;
  align-items: end;
  padding-top: 6.5rem;
  padding-bottom: 4.5rem;
 }

 .opening-copy h1 {
  width: 100%;
  font-size: clamp(2.25rem, 11vw, 4.7rem);
  line-height: 0.92;
 }

 .opening-visual {
  inset: 4rem -38% 22% 15%;
  opacity: 0.55;
 }

 .cube-stage {
  min-height: 26rem;
 }

 .hero-actions {
  position: relative;
  z-index: 3;
 }

 .scroll-prompt {
  display: none;
 }

 .identity-scene,
 .sequence-intro,
 .field-montage,
 .contact-scene {
  min-height: auto;
  padding-block: 7rem;
 }

 .identity-scene h2,
 .sequence-intro h2,
 .field-montage h2 {
  font-size: clamp(2.8rem, 14vw, 4.8rem);
 }

 .project-scene {
  position: relative;
  top: auto;
  min-height: auto;
  grid-template-columns: 1fr;
  gap: 3rem;
  padding-block: 6rem 3rem;
 }

 .project-scene-copy h3 {
  font-size: clamp(3rem, 15vw, 5rem);
 }

 .project-scene-media {
  aspect-ratio: 4 / 3;
 }

 .field-track {
  flex-wrap: wrap;
  width: 100%;
  gap: 1.25rem 2rem;
  padding-inline: 0;
  font-size: clamp(2rem, 10vw, 3.5rem);
  white-space: normal;
 }

 .field-track span:not(:last-child)::after {
  margin-left: 2rem;
 }

 .contact-scene h2 {
  font-size: clamp(3.25rem, 16vw, 5.5rem);
 }

 .site-footer {
  align-items: flex-start;
  flex-direction: column;
 }
}

@media (max-width: 420px) {
 .button {
  padding-inline: 1rem;
 }
}
```

- [ ] **Step 6: Add reduced-motion and no-animation guarantees**

End the stylesheet with:

```css
@media (prefers-reduced-motion: reduce) {
 html {
  scroll-behavior: auto;
 }

 *,
 *::before,
 *::after {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  scroll-behavior: auto !important;
  transition-duration: 0.01ms !important;
 }

 [data-opening-word],
 [data-opening-visual],
 [data-opening-actions],
 [data-identity-word],
 [data-project-scene],
 [data-project-media],
 [data-field-track] {
  opacity: 1 !important;
  transform: none !important;
 }

 .identity-scene [data-identity-word] {
  opacity: 1 !important;
 }

 .project-scene {
  position: relative;
  top: auto;
 }
}
```

- [ ] **Step 7: Run static checks and production compilation**

Run:

```bash
bunx vitest run
bun run lint
bunx tsc --noEmit
bun run build
```

Expected: all tests, lint, TypeScript, and the Next.js production build pass. CSS parser output must contain no invalid-property warnings.

- [ ] **Step 8: Commit the visual system**

```bash
git add app/globals.css
git commit -m "feat: style cinematic portfolio scenes"
```

---

### Task 3: Add fluid GSAP choreography without hijacking scrolling

**Files:**

- Replace: `components/portfolio-motion.tsx:1-55`

**Interfaces:**

- Consumes: Task 1 DOM hooks and Task 2 desktop/mobile scene geometry.
- Produces: a non-blocking opening timeline, one pinned identity scene, desktop project depth transitions, mobile project reveals, and a scroll-linked field montage.

- [ ] **Step 1: Confirm the static page works before adding motion**

Start the development server and open the page with JavaScript enabled but before editing `portfolio-motion.tsx`:

```bash
bun run dev
agent-browser open http://localhost:3000
agent-browser set viewport 1440 1000
agent-browser screenshot /tmp/cinematic-static.png
```

Expected: all scenes are visible in document order, four projects appear once, links work, and no content relies on GSAP for initial visibility.

- [ ] **Step 2: Replace the motion controller**

Replace `components/portfolio-motion.tsx` with:

```tsx
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
     )
     .from(
      "[data-opening-actions]",
      { opacity: 0, y: 18, duration: 0.5 },
      0.65,
     );

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
       end: "+=120%",
       pin: true,
       scrub: 1,
      },
     },
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

 return <div ref={scope}>{children}</div>;
}
```

The opening timeline ends before two seconds. It uses `from` animations so server-rendered content remains visible before hydration and without JavaScript.

- [ ] **Step 3: Check TypeScript and lint before browser testing**

Run:

```bash
bun run lint -- components/portfolio-motion.tsx
bunx tsc --noEmit
```

Expected: no errors. If TypeScript rejects `scene.children` as a GSAP target, replace it with `Array.from(scene.children)` without changing behavior.

- [ ] **Step 4: Verify desktop motion and release points**

Run with the development server active:

```bash
agent-browser open http://localhost:3000
agent-browser set viewport 1440 1000
agent-browser wait 2200
agent-browser eval '({overflow:document.documentElement.scrollWidth>window.innerWidth,projects:document.querySelectorAll("[data-project-scene]").length,heroLines:Math.round(document.querySelector("h1").getBoundingClientRect().height/parseFloat(getComputedStyle(document.querySelector("h1")).lineHeight))})'
agent-browser scroll down 900
agent-browser scroll down 1200
agent-browser screenshot /tmp/cinematic-desktop-scroll.png
agent-browser errors
agent-browser console
```

Expected: `overflow` is false, `projects` is 4, `heroLines` is at most 2, the identity scene pins and releases, project scenes cover one another, the contact scene is reachable, and errors/console contain no errors.

- [ ] **Step 5: Verify mobile and reduced-motion behavior**

Run:

```bash
agent-browser set viewport 320 812
agent-browser open http://localhost:3000
agent-browser wait 2200
agent-browser eval '({overflow:document.documentElement.scrollWidth>window.innerWidth,heroLines:Math.round(document.querySelector("h1").getBoundingClientRect().height/parseFloat(getComputedStyle(document.querySelector("h1")).lineHeight)),sticky:getComputedStyle(document.querySelector("[data-project-scene]")).position})'
agent-browser screenshot /tmp/cinematic-mobile.png
agent-browser set media dark reduced-motion
agent-browser open http://localhost:3000
agent-browser eval '({identityOpacity:getComputedStyle(document.querySelector("[data-identity-word]")).opacity,projectPosition:getComputedStyle(document.querySelector("[data-project-scene]")).position})'
agent-browser screenshot /tmp/cinematic-reduced-motion.png
agent-browser errors
```

Expected: mobile overflow is false, hero lines are at most 3, project position is `relative`; reduced motion reports identity opacity `1` and project position `relative`.

- [ ] **Step 6: Commit the motion choreography**

```bash
git add components/portfolio-motion.tsx
git commit -m "feat: choreograph cinematic scroll scenes"
```

---

### Task 4: Final accessibility, production, and regression verification

**Files:**

- Modify only if a verified defect is found: `app/page.tsx`
- Modify only if a verified defect is found: `app/globals.css`
- Modify only if a verified defect is found: `components/portfolio-motion.tsx`
- Modify only if a verified defect is found: `components/cube-unicorn.tsx`

**Interfaces:**

- Consumes: complete implementation from Tasks 1–3.
- Produces: validated production output with no blocking diagnostics, no accidental unrelated staging, and browser evidence for desktop, mobile, reduced motion, and keyboard access.

- [ ] **Step 1: Run proactive source diagnostics**

Run `lsp_diagnostics` on:

```text
app/page.tsx
app/page.test.tsx
components/portfolio-motion.tsx
components/cube-unicorn.tsx
lib/portfolio.ts
lib/portfolio.test.ts
vitest.config.ts
```

Expected: no TypeScript or ESLint errors.

- [ ] **Step 2: Run the complete verification baseline**

Run:

```bash
bunx vitest run
bun run lint
bunx tsc --noEmit
bun run build
```

Expected: all tests pass, no lint/type errors, and Next.js produces successful static output for `/` and `/_not-found`.

- [ ] **Step 3: Verify keyboard access and links**

With the dev server active:

```bash
agent-browser set viewport 1440 1000
agent-browser set media dark
agent-browser open http://localhost:3000
agent-browser press Tab
agent-browser screenshot /tmp/cinematic-focus.png
agent-browser snapshot -i -c
```

Expected: the skip link becomes visible first; subsequent Tab presses reach the wordmark, navigation, Hire Me, Selected Work, project links, social links, and Back to top in document order. Focus remains visibly outlined on dark and pastel scenes.

- [ ] **Step 4: Verify live and fallback cube paths**

Run:

```bash
agent-browser eval '({canvas:Boolean(document.querySelector("canvas")),fallback:Boolean(document.querySelector(".cube-fallback")),label:document.querySelector(".cube-stage")?.getAttribute("aria-label")})'
```

Expected on a WebGL-capable browser after loading: `canvas` is true and the label is `Interactive three-dimensional cube`. In reduced-motion mode, `fallback` is true.

- [ ] **Step 5: Run pi-lens session verification**

Run `lens_diagnostics` with `mode="all"`.

Expected: no blocking errors remain in edited files. Address only redesign-related findings; do not refactor unrelated code.

- [ ] **Step 6: Inspect the final diff and repository boundary**

Run:

```bash
git diff --check
git status --short
git log --oneline -5
```

Expected: no whitespace errors; implementation files are clean after commits; untracked local design/tool inputs remain unmodified and uncommitted.

- [ ] **Step 7: Commit any verification-driven fixes atomically**

Only if Steps 1–6 required a real code correction:

```bash
git add app/page.tsx app/globals.css components/portfolio-motion.tsx components/cube-unicorn.tsx app/page.test.tsx lib/portfolio.ts lib/portfolio.test.ts vitest.config.ts
git commit -m "fix: polish cinematic portfolio fallbacks"
```

Do not create an empty commit when no fix was needed.
