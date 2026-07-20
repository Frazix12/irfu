## Direction 01 — **Signal / Circuit: an Atomic Swiss portfolio where oversized type, engineered color, and an off-axis cube connect digital products to physical systems.**

### 1. System

- **Canvas:** `#FFFFFF`
- **Ink:** `#000000`
- **Vermilion:** `#FF4B36`
- **Cobalt:** `#2949FF`
- **Acid yellow:** `#F4EF4E`
- No gradients, shadows, muted gray, glass effects, or generic floating cards.
- Geometry uses square corners, 2px black rules, flush color fields, deliberate cropping, and typographic overlap.
- **Desktop grid:** 12 columns, `32px` gutters, `24px` column gaps, maximum width `1536px`.
- **Tablet:** `24px` gutters, `16px` gaps.
- **Mobile:** 4 columns, `16px` gutters, `8px` gaps.
- Major sections use `120–160px` desktop and `72–96px` mobile vertical spacing.

### 2. Typography

Use locally hosted **Cabinet Grotesk Variable**; fallback: `Arial, Helvetica, sans-serif`. Use Geist Mono only for uppercase taxonomy.

| Role | Desktop | Mobile | Treatment |
|---|---:|---:|---|
| Hero | `clamp(72px, 9.4vw, 152px)` | `clamp(48px, 15vw, 72px)` | 800, `0.84` line-height, `-0.055em` |
| Section display | `clamp(64px, 7vw, 112px)` | `44–64px` | 800, `0.88`, `-0.045em` |
| Project title | `40–72px` | `34–48px` | 700, `0.92` |
| Lead copy | `24px` | `20px` | 500, `1.25` |
| Body | `18px` | `17px` | 500, `1.45` |
| Mono label | `12px` | `11px` | 600, uppercase, `0.12em` |

Headlines may collide with imagery and neighboring color fields, but body copy never overlaps.

### 3. Navigation

- Height: `72px` desktop, `64px` mobile.
- White background with a `2px` black bottom rule.
- Wordmark occupies columns `1–3`; Work/About/Contact occupy `7–9`; black **Hire Me** pill occupies `11–12`.
- Buttons remain the only rounded elements: `999px`, minimum `44px` height.
- Mobile retains wordmark and Hire Me; navigation becomes a full-width black menu opened by a `44px` square control.

### 4. Artistic Asymmetry Hero

- Height: `calc(100svh - 72px)`, minimum `720px`, maximum `980px`; `overflow: hidden`.
- Add an acid-yellow plane from `left: 58%`, `top: 7%`, width `46%`, height `79%`.
- H1 spans columns `1–10`, begins `14%` down the hero, and remains above the cube:
  **“I build digital products and physical systems.”**
- Force three editorial lines on desktop:  
  `I build digital` / `products and` / `physical systems.`
- Let “products” enter the yellow plane by approximately `10vw`.
- Eyebrow at columns `1–4`: **Full-Stack Developer · Dhaka, Bangladesh**.
- Actions sit bottom-left: black **Hire Me** linking to email and outlined **Selected Work**.
- Add a cobalt `2-column × 72px` location bar at the lower-right with white mono text; it is informational, not a badge.

#### Cube Unicorn

- First major visual immediately below navigation.
- Stage: `58vw × 76svh`, positioned `left: 51vw`, `top: -2svh`.
- Transform: `rotate(7deg) scale(1.14)` with origin at `62% 42%`.
- Hero clipping removes roughly the cube’s top `6%`, right `14%`, and bottom `8%`.
- Cube crosses the acid-yellow plane and H1 bounding area; H1 stays readable through z-index and solid black glyphs.
- No frame, halo, shadow, or decorative particles.
- Reduced motion/WebGL fallback keeps identical crop and geometry using the existing static cube treatment.
- Mobile: stage `92vw × 52svh`, `left: 24vw`, `top: 27%`, `rotate(9deg) scale(1.12)`; crop the right `22%`.

### 5. Infinite Capability Marquee

- Directly follows the hero; black, `96px` high desktop and `72px` mobile.
- Cabinet Grotesk `42px/700`; white capabilities separated by acid-yellow `24px` squares:
  **Web products / APIs and systems / Mobile / IoT and electronics**.
- Duplicate track once, translate `0 → -50%`, `28s linear infinite`.
- Pause on hover/focus; duplicated content is `aria-hidden`.
- Reduced motion shows one wrapping static row.

### 6. Asymmetrical Project Bento

A hard-edged `12-column × 2-row` composition with `2px` black dividers and no gaps or card styling. Desktop rows are `minmax(420px, 38vw)`.

- **BTEB Flow:** `7 × 2` cells, cobalt surface, white type. Image fills lower `62%`; oversized title overlaps its top edge. Copy: learning resources and practical tools for Bangladesh’s technical education students.
- **AmarHisab:** `5 × 1`, acid yellow, black type. Image cropped to the right `58%`; copy occupies the left `42%`.
- **SMD Rework Station:** `3 × 1`, vermilion, black type. Use the control interface as a full-bleed lower-half image; retain PID heat control, airflow calibration, desktop tools, and live web UI copy.
- **DIY Soldering Station:** `2 × 1`, black, white type. Use the verified hardware photograph with a square crop and acid-yellow taxonomy label.

Media links cover only imagery; repository/live-product links remain explicit and keyboard focusable. Use a visible `3px` inset focus outline.

### 7. Scrubbing Field Statement

White section, minimum `110vh`, with the statement occupying columns `1–11`:

**“I take ideas from screen to circuit and build the systems between.”**

- Three manually authored lines preserve semantic text without a text-splitting dependency.
- Each line reveals with `clip-path: inset(0 100% 0 0) → inset(0)` over `70vh`.
- ScrollTrigger: `start: top 78%`, `end: bottom 38%`, `scrub: 0.65`.
- Insert the verified BTEB Flow image after “screen” and soldering-station image after “circuit”; each image is `1.5em × 0.72em`, square-cornered, and baseline-aligned.
- Supporting copy uses only the verified About statement.

### 8. Horizontal Project Accordions

- Height: `680px`; four edge-to-edge vertical panels.
- Active panel width `67%`; each closed panel `11%`.
- Color order: cobalt, acid yellow, vermilion, black.
- Closed panels show vertical mono field label plus project index; active panel shows title, verified summary, image, repository, and live link where available.
- Use native `<details>` semantics; hover may preview, but click/keyboard controls the persistent state.
- Width transition: `500ms cubic-bezier(.22,1,.36,1)`.
- No testimonial content follows unless genuine testimonials are supplied; retain only the empty conditional structure.

### 9. Card Stacking Stories

- Four full-width editorial sheets, not cards: `min-height: 78vh`, square corners, alternating palette surfaces.
- Sticky offset: `96px`.
- Each subsequent sheet overlaps the previous by `14vh`.
- GSAP scrub: previous sheet scales `1 → 0.965` and translates `0 → -24px`; no opacity fade or shadow.
- Each sheet uses a `5/7` copy-to-media split, alternating sides.
- Scroll allocation: approximately `120vh` per project.
- Reduced motion removes sticky transforms and renders a normal vertical sequence.

### 10. Hiring Close and Footer

- Closing block is black, minimum `80vh`, with white `clamp(72px, 9vw, 144px)` type:
  **“Have something worth building?”**
- Acid-yellow line: **Available for internships and freelance projects.**
- Vermilion Hire Me pill links to `mailto:frazixgaming22@gmail.com`; WhatsApp remains secondary.
- Footer returns to white with black rules and only Email, GitHub, LinkedIn, Facebook, and WhatsApp.

### Mobile Collapse

- Hero becomes `min-height: 780px`; headline stays within three lines where width permits and cube moves behind/below its right edge.
- Bento becomes one column in priority order; minimum project height `440px`, with BTEB Flow `620px`.
- Horizontal accordions become stacked vertical `<details>` rows; active content opens below the summary without horizontal scrolling.
- Project-stack sheets lose sticky positioning and overlap.
- Inline images shrink to `1.15em × 0.65em`.
- All touch targets remain at least `44px`; motion is fully removed under `prefers-reduced-motion`.