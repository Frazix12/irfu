# Cloth Cursor Refraction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the cursor as a compact cut-corner box while adding a velocity-reactive local cloth-refraction field beneath it.

**Architecture:** Extend the existing `CinematicCursor` client component with one isolated cloth-motion controller, one fixed masked lens, and inline SVG filter definitions. Keep pointer work outside React state, reuse GSAP `quickTo`, and make SVG displacement progressive enhancement over a CSS backdrop-filter fallback.

**Tech Stack:** Next.js 16, React 19, TypeScript, GSAP, CSS backdrop filters/masks, inline SVG filters, Vitest, Agent Browser.

## Global Constraints

- The resting cursor remains a small cut-corner box and never expands into a rectangle.
- Detached action labels appear only over interactive `a`, `button`, and `summary` elements.
- The local cloth field is approximately `10rem` (`160px`) wide.
- No new runtime dependency.
- No React state or render loop for pointer tracking.
- Disable the custom cursor and cloth lens for touch, coarse pointers, and reduced-motion preferences.
- Preserve visible keyboard focus and native semantic controls.
- Do not stage or commit `app/globals.css` from the current dirty tree without isolating its unrelated pre-existing hunks.

---

### Task 1: Keep the reticle compact and detach action labels

**Files:**

- Modify: `components/cinematic-cursor.tsx:26-42`
- Modify: `app/globals.css:105-328`
- Test: `components/cinematic-cursor.test.ts`
- Test: `app/navigation-style.test.ts`

**Interfaces:**

- Consumes: existing `data-cursor`, `data-cursor-icon`, and `data-cursor-mode` attributes.
- Produces: `updateCursorMode(root, label, icon, target)` where only native interactive targets activate `.is-action`; non-interactive contextual targets may activate `.is-text` without opening a label.

- [ ] **Step 1: Write failing component behavior assertions**

Add this test to `components/cinematic-cursor.test.ts`:

```ts
it("opens action labels only for interactive hover targets", () => {
 expect(cursorSource).toContain(
  'target?.matches("a, button, summary") ?? false',
 );
 expect(cursorSource).toContain('label.textContent = isInteractive');
});
```

- [ ] **Step 2: Write failing compact-reticle style assertions**

Add this test to `app/navigation-style.test.ts`:

```ts
it("keeps the reticle compact and detaches action labels", () => {
 const cursorStyles =
  styles.match(/\.cinematic-cursor\s*\{[\s\S]*?@media/)?.[0] ?? "";
 const ringRule = styles.match(/\.cursor-ring\s*\{([^}]*)\}/)?.[1] ?? "";
 const labelRule = styles.match(/\.cursor-label\s*\{([^}]*)\}/)?.[1] ?? "";

 expect(ringRule).toMatch(/width:\s*2\.35rem/);
 expect(ringRule).toMatch(/height:\s*2\.35rem/);
 expect(cursorStyles).not.toMatch(
  /\.cinematic-cursor\.is-(?:action|text) \.cursor-ring\s*\{[^}]*\b(?:width|height):/,
 );
 expect(labelRule).toMatch(/position:\s*absolute/);
 expect(labelRule).toMatch(/left:\s*calc\(100% \+ 0\.75rem\)/);
 expect(styles).toMatch(
  /\.cinematic-cursor\.is-action \.cursor-label\s*\{[^}]*opacity:\s*1/,
 );
 expect(styles).not.toMatch(
  /\.cinematic-cursor\.is-text \.cursor-label\s*\{[^}]*opacity:\s*1/,
 );
});
```

- [ ] **Step 3: Run the focused tests and verify RED**

Run:

```bash
bunx vitest run components/cinematic-cursor.test.ts app/navigation-style.test.ts
```

Expected: FAIL because interactive gating is absent, mode rules still set `6.25rem`/`8rem` dimensions, and the label is not absolutely positioned.

- [ ] **Step 4: Gate action mode to interactive elements**

Replace `updateCursorMode` in `components/cinematic-cursor.tsx` with:

```ts
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
```

- [ ] **Step 5: Replace expanding plate styles with a fixed reticle and detached label**

In `app/globals.css`, keep `.cursor-ring` at `2.35rem × 2.35rem`, remove width/height/grid expansion from `.is-action` and `.is-text`, and use these mode/label rules:

```css
.cursor-label {
 position: absolute;
 top: 50%;
 left: calc(100% + 0.75rem);
 width: max-content;
 color: #fff;
 font-size: 0.46rem;
 letter-spacing: 0.16em;
 opacity: 0;
 transform: translate(0.5rem, -50%);
 white-space: nowrap;
 transition:
  opacity 220ms ease,
  transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
}

.cinematic-cursor.is-action .cursor-ring::before {
 background: #fff;
 clip-path: polygon(30% 0, 100% 0, 100% 70%, 70% 100%, 0 100%, 0 30%);
}

.cinematic-cursor.is-action .cursor-icon {
 color: #000;
}

.cinematic-cursor.is-text .cursor-ring::before {
 background: rgb(255 255 255 / 8%);
 clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
}

.cinematic-cursor.is-action .cursor-label {
 opacity: 1;
 transform: translate(0, -50%);
}

.cinematic-cursor.is-action .cursor-dot {
 opacity: 0;
}

.cinematic-cursor.is-action .cursor-trail {
 opacity: 0.05;
}
```

Also simplify `.cursor-ring` to centered content without expanding columns:

```css
.cursor-ring {
 z-index: 2;
 display: grid;
 width: 2.35rem;
 height: 2.35rem;
 place-items: center;
 isolation: isolate;
 scale: 1;
 transition: scale 260ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

- [ ] **Step 6: Run the focused tests and verify GREEN**

Run:

```bash
bunx vitest run components/cinematic-cursor.test.ts app/navigation-style.test.ts
```

Expected: both files PASS.

- [ ] **Step 7: Inspect the task diff without staging unrelated work**

Run:

```bash
git diff -- components/cinematic-cursor.tsx components/cinematic-cursor.test.ts app/globals.css app/navigation-style.test.ts
```

Expected: only compact-reticle behavior plus the previously present uncommitted cursor work. Do not commit the shared dirty CSS file from this task.

---

### Task 2: Add the velocity-reactive cloth lens

**Files:**

- Modify: `components/cinematic-cursor.tsx:9-146`
- Modify: `app/globals.css:105-328`
- Test: `components/cinematic-cursor.test.ts`
- Test: `app/navigation-style.test.ts`

**Interfaces:**

- Produces: `createClothMotion(element: HTMLElement)` returning `{ move(event: PointerEvent): void; kill(): void }`.
- Produces DOM hooks: `.cursor-cloth`, `.cursor-filter-defs`, and SVG filter `#cursor-cloth-distortion`.
- Consumes: existing pointer events and the `activateCursor` lifecycle.

- [ ] **Step 1: Write failing cloth lifecycle assertions**

Add this test to `components/cinematic-cursor.test.ts`:

```ts
it("mounts and cleans up a velocity-reactive cloth lens", () => {
 expect(cursorSource).toContain("function createClothMotion");
 expect(cursorSource).toContain('className="cursor-cloth"');
 expect(cursorSource).toContain("<feTurbulence");
 expect(cursorSource).toContain("<feDisplacementMap");
 expect(cursorSource).toContain('gsap.quickTo(element, "scaleX"');
 expect(cursorSource).toContain("settle.restart(true)");
 expect(cursorSource).toContain("settle.kill()");
});
```

Extend the existing cleanup test with:

```ts
expect(cursorSource).toContain("clothMotion.kill()");
```

- [ ] **Step 2: Write failing cloth surface assertions**

Add this test to `app/navigation-style.test.ts`:

```ts
it("renders a masked local cloth-refraction field", () => {
 const clothRule = styles.match(/\.cursor-cloth\s*\{([^}]*)\}/)?.[1] ?? "";

 expect(clothRule).toMatch(/width:\s*10rem/);
 expect(clothRule).toMatch(/height:\s*10rem/);
 expect(clothRule).toMatch(/backdrop-filter:/);
 expect(clothRule).toMatch(/mask-image:\s*radial-gradient/);
 expect(clothRule).toMatch(/will-change:\s*transform/);
 expect(styles).toMatch(
  /\.cinematic-cursor\.is-action \.cursor-cloth\s*\{[^}]*opacity:/,
 );
});
```

- [ ] **Step 3: Run the focused tests and verify RED**

Run:

```bash
bunx vitest run components/cinematic-cursor.test.ts app/navigation-style.test.ts
```

Expected: FAIL because the cloth controller, lens, SVG primitives, and CSS are absent.

- [ ] **Step 4: Add an isolated cloth-motion controller**

Add below `createMover` in `components/cinematic-cursor.tsx`:

```ts
function createClothMotion(element: HTMLElement) {
 const moveTo = createMover(element, 0.28);
 const stretch = gsap.quickTo(element, "scaleX", {
  duration: 0.42,
  ease: "power3.out",
 });
 const compress = gsap.quickTo(element, "scaleY", {
  duration: 0.42,
  ease: "power3.out",
 });
 const turn = gsap.quickTo(element, "rotation", {
  duration: 0.34,
  ease: "power3.out",
 });
 const settle = gsap
  .delayedCall(0.08, () => {
   stretch(1);
   compress(1);
  })
  .pause();
 let previous: { x: number; y: number } | undefined;

 return {
  move(event: PointerEvent) {
   moveTo(event.clientX, event.clientY);
   if (previous) {
    const deltaX = event.clientX - previous.x;
    const deltaY = event.clientY - previous.y;
    const tension = Math.min(Math.hypot(deltaX, deltaY) / 60, 0.42);
    stretch(1 + tension);
    compress(1 - tension * 0.35);
    turn((Math.atan2(deltaY, deltaX) * 180) / Math.PI);
    settle.restart(true);
   }
   previous = { x: event.clientX, y: event.clientY };
  },
  kill() {
   settle.kill();
   gsap.killTweensOf(element);
  },
 };
}
```

- [ ] **Step 5: Connect cloth motion to the existing cursor lifecycle**

Inside `activateCursor`, query and validate the cloth element:

```ts
const cloth = root.querySelector<HTMLElement>(".cursor-cloth");
if (!ring || !dot || !label || !icon || !cloth) return;
```

After creating the standard movers, initialize the cloth controller:

```ts
const clothMotion = createClothMotion(cloth);
gsap.set([...nodes, cloth], {
 x: -100,
 xPercent: -50,
 y: -100,
 yPercent: -50,
});
```

Inside the mouse-only move callback, before target-mode updates:

```ts
clothMotion.move(event);
```

Inside cleanup, before killing node tweens:

```ts
clothMotion.kill();
```

- [ ] **Step 6: Render the lens and progressive SVG displacement filter**

Add before `.cursor-ring` in the `CinematicCursor` JSX:

```tsx
<span className="cursor-cloth" />
<svg className="cursor-filter-defs" aria-hidden="true">
 <filter
  id="cursor-cloth-distortion"
  x="-30%"
  y="-30%"
  width="160%"
  height="160%"
 >
  <feTurbulence
   type="fractalNoise"
   baseFrequency="0.012 0.025"
   numOctaves="2"
   seed="11"
   result="cloth-noise"
  />
  <feDisplacementMap
   in="SourceGraphic"
   in2="cloth-noise"
   scale="18"
   xChannelSelector="R"
   yChannelSelector="B"
  />
 </filter>
</svg>
```

- [ ] **Step 7: Add the local refractive surface and isolate blend modes**

Remove `mix-blend-mode: difference` from `.cinematic-cursor`. Add it to `.cursor-ring`, `.cursor-dot`, and `.cursor-trail`, then add:

```css
.cursor-filter-defs {
 position: absolute;
 width: 0;
 height: 0;
 overflow: hidden;
}

.cursor-cloth {
 position: fixed;
 top: 0;
 left: 0;
 z-index: 1;
 width: 10rem;
 height: 10rem;
 background: rgb(255 255 255 / 1%);
 border-radius: 42% 58% 54% 46% / 48% 44% 56% 52%;
 -webkit-backdrop-filter: blur(0.9px) saturate(1.12) contrast(1.04);
 backdrop-filter: blur(0.9px) saturate(1.12) contrast(1.04);
 backdrop-filter: url("#cursor-cloth-distortion") blur(0.9px)
  saturate(1.12) contrast(1.04);
 mask-image: radial-gradient(
  ellipse at center,
  #000 0 34%,
  rgb(0 0 0 / 82%) 48%,
  transparent 72%
 );
 opacity: 0.68;
 will-change: transform;
 transition: opacity 360ms ease;
}

.cursor-ring,
.cursor-dot,
.cursor-trail {
 mix-blend-mode: difference;
}

.cinematic-cursor.is-action .cursor-cloth {
 opacity: 0.9;
}
```

Keep `.cursor-ring` at a higher `z-index` than `.cursor-cloth`.

- [ ] **Step 8: Run focused tests and verify GREEN**

Run:

```bash
bunx vitest run components/cinematic-cursor.test.ts app/navigation-style.test.ts
```

Expected: both files PASS.

- [ ] **Step 9: Run proactive diagnostics**

Run LSP diagnostics for:

```text
components/cinematic-cursor.tsx
components/cinematic-cursor.test.ts
app/navigation-style.test.ts
```

Expected: no TypeScript errors. Run `lens_diagnostics mode=all` for the same files plus `app/globals.css`; expected: no blocking findings.

- [ ] **Step 10: Inspect the task diff without staging unrelated work**

Run:

```bash
git diff -- components/cinematic-cursor.tsx components/cinematic-cursor.test.ts app/globals.css app/navigation-style.test.ts
```

Expected: compact reticle and cloth-lens changes. Do not commit the shared dirty CSS file unless its unrelated hunks have first been isolated.

---

### Task 3: Browser QA and full verification

**Files:**

- Verify: `components/cinematic-cursor.tsx`
- Verify: `app/globals.css`
- Verify: `app/page.tsx`

**Interfaces:**

- Consumes: completed compact reticle and cloth lens.
- Produces: browser evidence and a passing project verification baseline.

- [ ] **Step 1: Start the development server**

Run:

```bash
bun run dev --hostname 0.0.0.0 --port 3000
```

Open `http://localhost:3000` in Agent Browser. Do not use `127.0.0.1` because Next.js development resources were previously blocked from that origin.

- [ ] **Step 2: Verify desktop cursor behavior at 1440×1000**

Check all of the following:

```text
- Resting reticle remains approximately 37.6px × 37.6px.
- Heading hover changes the symbol but does not show a detached action label.
- Link/button hover shows its detached label without changing reticle dimensions.
- Cloth lens follows behind the precise pointer.
- Fast movement stretches and rotates the lens.
- Stopping movement returns lens scaleX and scaleY toward 1.
- No horizontal overflow.
```

Use browser evaluation to inspect `.cursor-ring`, `.cursor-label`, `.cursor-cloth`, and their computed dimensions, opacity, and transforms.

- [ ] **Step 3: Verify progressive filter and fallback behavior**

Inspect computed `.cursor-cloth` styles. Accept either:

```text
backdrop-filter contains url("#cursor-cloth-distortion") plus blur/saturate/contrast
```

or the supported fallback:

```text
backdrop-filter contains blur/saturate/contrast without the URL filter
```

The lens must remain visible and fluid in either case.

- [ ] **Step 4: Verify mobile and reduced-motion fallback at 375×812**

Confirm:

```text
- Native cursor remains enabled.
- `.cinematic-cursor` is not rendered visibly.
- Cloth lens does not appear.
- Scrolling and controls remain usable.
- No horizontal overflow.
```

- [ ] **Step 5: Check browser errors**

Clear browser console and page-error buffers, reload, then inspect both buffers.

Expected: no page errors and no new console errors attributable to the cursor.

- [ ] **Step 6: Stop the development server and run full verification**

Run:

```bash
bunx vitest run
bun run lint
bunx tsc --noEmit
bun run build
```

Expected:

```text
- All Vitest files pass.
- ESLint reports zero errors; pre-existing warnings outside the cursor scope may remain.
- TypeScript reports zero errors.
- Next.js production build completes successfully.
```

- [ ] **Step 7: Run final session diagnostics**

Run `lens_diagnostics mode=all` for every edited cursor file.

Expected: no blocking errors or actionable warnings remain in the edited files.
