# Direction 03 — **Field Notes from Screen to Circuit**
*A tactile editorial portfolio presenting Irfan as a cross-disciplinary builder through an earth-toned, asymmetrical print narrative.*

## Visual System

| Token | Value | Use |
|---|---:|---|
| Parchment | `#F2E8D9` | Primary canvas |
| Black-brown | `#201A17` | Text, rules, dark sections |
| Oxblood | `#741F33` | Primary CTA, project emphasis |
| Muted olive | `#7E8660` | Secondary project fields |
| Pale peach | `#F1B7A2` | Warm editorial panels |

- **Typeface:** Satoshi Variable; fallback `Arial, sans-serif`.
- **Texture:** fixed paper grain at `3%` opacity using a tiny monochrome noise tile; `mix-blend-mode:multiply`; never obscure text.
- **Geometry:** square corners, 1px rules, flat color fields; no gradients, shadows, glass, or SaaS cards.
- **Desktop grid:** 12 columns, `32px` gutters, `48px` page margins, `1440px` maximum width.
- **Spacing:** section padding `clamp(96px, 12vw, 184px)`.

## Typography

```text
Display: clamp(4rem, 8.4vw, 8rem) / 0.88 / -0.055em / 600
H2:      clamp(3rem, 6vw, 6rem) / 0.92 / -0.045em / 600
H3:      clamp(2rem, 3.2vw, 3.75rem) / 0.98 / -0.035em / 600
Lead:    clamp(1.25rem, 1.8vw, 1.75rem) / 1.35 / -0.015em / 450
Body:    17px / 1.55 / 400
Label:   12px / 1 / 0.14em / 600 / uppercase
```

## Page Composition

### 1. Navigation
`88px` tall; wordmark left, section links centered, oxblood **Hire Me ↗** right. A black-brown bottom rule establishes the magazine masthead.

### 2. Editorial Split Hero
- Minimum height: `calc(100svh - 88px)`.
- **Left:** columns `1–7`, vertically centered.
- **Right:** columns `8–12`, full-height pale-peach image field.
- Eyebrow: `IRFAN HOSSAIN / DHAKA, BANGLADESH`.
- Headline: **“I build digital products and physical systems.”**
- Supporting copy: “Full-Stack Developer working across web products, backend systems, mobile, IoT, and electronics.”
- Actions: oxblood **Hire Me** and underlined **Selected Work ↓**.
- Availability appears as a restrained footer note: “Available for internships and freelance projects.”

**Cube treatment:** Cube Unicorn occupies `82%` of the right field, cropped slightly beyond its top and right edges like a photographed sculpture. Place it over parchment with a subtle `12%` black-brown multiply contact ellipse; preserve WebGL interaction but remove ornamental framing. Reduced motion receives a high-resolution static render in the identical crop.

### 3. Infinite Field Marquee
Black-brown strip, `112px` high, parchment type:

**WEB PRODUCTS — APIs — BACKEND SYSTEMS — MOBILE — IoT — ELECTRONICS —**

Duplicate once for a seamless CSS loop; `32s linear infinite`; pause on hover/focus and disable translation under reduced motion.

### 4. Pinned Editorial Statement
Two-column parchment spread:
- Left `4/12`: sticky taxonomy and short factual About copy.
- Right `8/12`: oversized three-line statement revealed by scrubbed line masks:
  **“From interface / to infrastructure / to circuit.”**
- Pin for approximately `160vh`; each line transitions from olive at `28%` opacity to black-brown.

### 5. Featured Project Composition
Treat projects as full-width magazine stories, not cards:

1. **BTEB Flow — oxblood field**  
   `7/12` image, `5/12` text; flagship story.  
   “Learning resources, routines, booklists, course content, and an Android app for Bangladesh’s technical-education students.”

2. **AmarHisab — pale peach field**  
   `5/12` text, `7/12` oversized interface crop.  
   “A focused expense tracker with integrated grocery-list management.”

3. **SMD Rework Station + DIY Soldering Station — muted olive spread**  
   Adjacent `7/12 + 5/12` stories, separated by a black-brown rule. Keep them distinct.  
   Highlight PID heater control, PWM fan control, calibration, desktop/live web UI, and Arduino-based soldering control without adding performance claims.

Each story includes only index, title, one-sentence outcome, field label, **View project**, and **Source**.

### 6. Horizontal Project Accordion
Four full-width rows, `96px` closed and `clamp(380px, 58vh, 620px)` open. Titles sit left, category and year-style project index right; opening reveals copy and imagery in an asymmetric `4/8` split. Use native `<details>` semantics, black-brown rules, and one accent background per row.

### 7. Scroll-Pinned Project Sequence
Pin the section for four viewport lengths. Each project spread stacks over the previous one with:
- image scale `1.08 → 1`;
- opacity `0.25 → 1`;
- next panel translating `18vh → 0`;
- scrub value `1`;
- no perspective or floating-card shadows.

Reduced motion removes pinning and renders the spreads in normal document flow.

### 8. Hiring Close and Footer
Full oxblood field with parchment type:

**“Have something worth building?”**  
**Hire Me ↗** opens `mailto:frazixgaming22@gmail.com`.

Footer returns to black-brown with email, GitHub, LinkedIn, Facebook, WhatsApp, and “Dhaka, Bangladesh.”

## Mobile Collapse

- Breakpoint: `<768px`; single column with `20px` gutters.
- Navigation becomes wordmark + persistent **Hire Me**; section links move to the footer.
- Hero stacks copy above a `72vw` square cube field; headline remains at most three lines.
- Remove sticky/pinned behavior and all horizontal overflow.
- Project media follows titles; paired hardware stories become consecutive panels.
- Accordions open vertically to intrinsic height.
- Marquee slows to `42s`; reduced motion shows one static, wrapping taxonomy line.
- Touch targets remain at least `44px`; focus outlines use a `3px` parchment/oxblood contrast ring.
- Hidden testimonial structure remains empty and `hidden`; render nothing until genuine quotes exist.