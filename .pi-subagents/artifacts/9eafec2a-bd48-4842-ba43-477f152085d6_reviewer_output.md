## Review

### Strengths

- Typed, verified content is centralized in `lib/portfolio.ts:1-73`; project order and 14+5+3+2 bento spans match the approved contract at `lib/portfolio.ts:14-61`.
- The page follows the required AIDA sequence at `app/page.tsx:282-295`, with factual location and availability copy at `app/page.tsx:47` and `app/page.tsx:245-247`.
- Client behavior is isolated appropriately: the page remains a Server Component, while WebGL and GSAP live in focused client boundaries at `components/cube-unicorn.tsx:1-58` and `components/portfolio-motion.tsx:1-54`.
- WebGL detection, error fallback, lazy loading, and live reduced-motion changes are handled at `components/cube-unicorn.tsx:19-55`. GSAP avoids initialization under reduced motion at `components/portfolio-motion.tsx:13-16`, reinforced by CSS at `app/globals.css:824-840`.
- Metadata and approved Outfit/Geist Mono typography are configured at `app/layout.tsx:5-20`.
- External project links use `target="_blank"` with `rel="noreferrer"` at `app/page.tsx:79-89`.
- Contract tests cover project order, primary email conversion, and absence of testimonials at `lib/portfolio.test.ts:4-22`. Vitest, ESLint, and TypeScript checks pass.

## Issues

### Critical

- None.

### Important

1. **Site-wide landmarks are incorrectly scoped inside `<main>`.**  
   `app/page.tsx:284-295` places both `SiteNav` and `SiteFooter` inside the main landmark. Consequently, the header at `app/page.tsx:15-40` and footer at `app/page.tsx:259-279` are not exposed as top-level banner/contentinfo landmarks. This falls short of the explicit semantic-landmark baseline.

2. **Keyboard focus indicators can be clipped completely.**  
   The global focus outline is pushed four pixels outward at `app/globals.css:54-57`, while project cards and accordion items use `overflow: hidden` at `app/globals.css:324-336` and `app/globals.css:462-476`. Full-edge controls such as project media links (`app/page.tsx:107-121`) and accordion summaries (`app/page.tsx:171-186`) therefore lose the required visible focus treatment. Use an inset outline/ring for controls inside clipped containers.

### Minor

1. **Unused runtime dependency.**  
   `framer-motion` is declared at `package.json:13` but has no imports in the implementation. Removing it reduces dependency and lockfile surface.

2. **Public image retains device EXIF and is oversized.**  
   `public/projects/soldering-station.jpg` is 1.8 MB and exposes Samsung model, software, unique image ID, and capture-time metadata when accessed directly. GPS values are empty. Strip metadata and re-encode the asset; Next Image optimization does not prevent direct access to the public source.

## Recommendations

1. Render the site header before `<main>` and the footer after it, while keeping all three under `MotionRoot`.
2. Add inset focus styling—such as negative `outline-offset`—for media links and accordion summaries.
3. Strip the JPEG metadata and remove unused `framer-motion`.
4. Consider self-hosting the Unicorn SDK and its external blue-noise texture if third-party runtime availability must not affect the hero.

## Ready-to-merge verdict

**Not ready to merge.** The implementation is visually and functionally strong, but the two Important accessibility issues should be corrected first.