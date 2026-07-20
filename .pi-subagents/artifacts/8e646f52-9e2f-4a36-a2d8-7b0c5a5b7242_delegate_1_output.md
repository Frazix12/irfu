# Direction 2 — Monsoon Chrome

**Monsoon Chrome is a quiet product-industrial portfolio where fog, machined metal, and restrained moss frame Irfan’s work from screen to circuit.**

## 1. System

### Palette

| Token | Value | Role |
|---|---:|---|
| Fog | `#E8EEEA` | Page canvas, image wells, inverse text |
| Graphite | `#141816` | Primary text, navigation, footer, dark plates |
| Bright moss | `#A8FF60` | Hire Me CTA, active states, sparse markers |
| Brushed silver | `#AAB4B0` | Structural plates, rules, inactive surfaces |
| Ink blue | `#3553A4` | Technical project emphasis and one story surface |

Use graphite/fog for roughly 80% of the page. Moss is a functional accent, never glow. No gradients, bloom, glassmorphism, neon, or cyberpunk motifs.

### Physical language

- `24px` outer plate radius, `14px` media-well radius, pill CTAs.
- `1px` graphite or fog outlines.
- Create depth with solid backing plates offset `8px`, `16px`, or `24px` on the Y-axis—not decorative shadows.
- Maximum one strongly colored surface per viewport.

## 2. Grid and rhythm

- Page maximum: `1440px`; primary content: `1280px`.
- Desktop gutters: `32px`; tablet: `24px`; mobile: `18px`.
- Navigation: `72px` desktop, `64px` mobile.
- Major section interval: `176px` desktop, `112px` mobile.
- Desktop project grid: 12 columns, `16px` gaps.
- All alignment should resolve to the central axis or the 12-column grid; avoid ornamental asymmetry.

## 3. Typography

Use **Outfit** throughout, with the existing restrained mono only for taxonomy.

| Role | Desktop | Mobile | Weight / spacing |
|---|---:|---:|---|
| Hero | `clamp(64px, 7.5vw, 108px)` | `48px` | 400, `0.92` line-height, `-0.035em` |
| Section display | `clamp(52px, 6vw, 86px)` | `42px` | 400, `0.98`, `-0.028em` |
| Project title | `40–64px` | `34–44px` | 500, `1.0`, `-0.02em` |
| Lead | `22px` | `19px` | 350, `1.4` |
| Body | `18px` | `17px` | 350, `1.45` |
| Mono label | `12px` | `11px` | 500, uppercase, `0.08em` |

Hero headline remains: **“I build digital products and physical systems.”** Target two lines on desktop and no more than three at `320px`.

## 4. Navigation and hero

- Fog navigation with a silver bottom rule.
- Left: Irfan Hossain. Center: Work / About / Contact. Right: moss **Hire Me** pill.
- Hero uses a centered cinematic column, `max-width: 1152px`, with `72–96px` top padding.
- Order: eyebrow → headline (`24px` gap) → two CTAs (`32px`) → Cube Unicorn (`32px`).
- Primary CTA: moss background, graphite text.
- Secondary CTA: graphite background, fog text.
- No hero badges, technology lists, stats, floating labels, or extra actions.

### Cube Unicorn

- Stage: `1040 × 440px` maximum; transparent/fog ground with no visible card boundary.
- Cube centered above an `820 × 190px` brushed-silver plinth, backed by a graphite plate offset `12px` downward.
- Treat the cube as a machined object: matte graphite and silver faces, one moss face, one ink-blue detail; high roughness, neutral lighting, zero emission or bloom.
- Idle movement: approximately `0.6rpm`; pointer response limited to `4deg`.
- Cube remains the first major visual immediately below the copy.
- Reduced-motion/WebGL fallback: static isometric cube using the same four materials.

## 5. Page composition

1. **Infinite capability marquee**  
   `58px` graphite strip immediately after the hero: Web products / APIs and systems / Mobile / IoT and electronics. Fog type, moss `6px` separators.

2. **Selected-work overview**  
   Preserve the exact 12 × 2 composition:
   - BTEB Flow — `7 × 2`, moss flagship plate.
   - AmarHisab — `5 × 1`, silver plate.
   - SMD Rework Station — `3 × 1`, ink-blue plate.
   - DIY Soldering Station — `2 × 1`, graphite plate.

   Place screenshots inside recessed fog wells. Copy stays outcome-led and uses only verified summaries, repository links, and available demos.

3. **Inline typography statement**  
   Full-width graphite plate: “I take ideas from screen [BTEB image] to circuit [soldering image] and build the systems between.” Inline images are `1.8em × .72em`, pill-shaped, and flush with the baseline.

4. **Horizontal project accordion**  
   `520px` desktop height. Inactive panels: `112px`; active panel receives remaining width. Use the same project order and palette. Active content contains field, title, verified summary, and project link—no invented outcomes.

5. **Pinned Z-Axis Cascade**  
   Four `min-height: 72svh` project plates. Copy occupies `42%`, imagery `58%`. Each card pins `20px` below the previous card, leaving a silver or graphite top edge visible to create a precise physical stack.

6. **Hiring close**  
   Moss plate, `min-height: 76svh`: availability line, “Have something worth building?”, short supporting copy, and email-based **Hire Me** CTA. Graphite footer follows with verified social links only. Render no testimonial section.

## 6. Motion

- Marquee: `26s linear infinite`; pause on hover or keyboard focus.
- Project imagery: scroll-scrub from `scale(.92), opacity(.35)` to `scale(1), opacity(1)`.
- Cascade cards: pin from `top: 96px + index × 20px` to stack end; `pinSpacing: false`.
- Plate entrances: `translateY(48px)`, `scale(.97)` to rest over `700ms`; `100ms` stagger.
- Accordion: `520ms cubic-bezier(.22,1,.36,1)`; user-controlled only.
- Avoid constant motion beyond the cube and marquee.
- Reduced motion disables scrubbing, pinning, cube rotation, and marquee translation; all content remains visible in document order.

## 7. Mobile collapse

- Below `960px`: center navigation becomes a native details menu; Hire Me remains visible.
- Below `768px`: full-bleed hero stage and major plates; remove outer radii at viewport edges.
- Cube stage becomes `100vw × 340px`; cube stays centered and never overlays copy.
- Bento becomes one column in project priority order.
- Horizontal accordion becomes four vertical disclosure rows with `136px` minimum summaries.
- Disable card pinning; cascade becomes a natural vertical list with `72px` gaps.
- Inline images reduce to `1.45em × .66em`.
- CTAs become equal-width, minimum `48px` high.
- Preserve three-line hero maximum, `44px` touch targets, visible `3px` focus rings, and no horizontal overflow.