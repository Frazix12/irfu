# Direction 5 — Nocturne Copper

**Nocturne Copper is a midnight workshop portfolio where digital products and precision hardware emerge from restrained copper light.**

**Deterministic lock — seed 356:** Editorial Split hero · Satoshi · Z-Axis Cascade · Infinite Marquee · Horizontal Accordions · hidden testimonials · Card Stacking · Scrubbing Text Reveals.

## Visual System

- **Canvas:** `#0D0D0B`
- **Primary text:** `#EFE5D3`
- **Copper/action accent:** `#B46D45`
- **Secondary surfaces:** `#4B5B4A`
- **Signal/focus accent:** `#D84A3A`
- Hairlines: `rgba(239,229,211,.12)`; subdued text: `rgba(239,229,211,.68)`.
- One broad copper radial glow may sit behind the cube at ≤16% opacity. No purple, cyan, multicolor neon, glossy gradients, or generic gray shadows.
- Fixed 2–3% monochrome grain overlay; photography receives restrained warmth and contrast. Product screenshots remain color-accurate.

## Typography

Use self-hosted **Satoshi Variable** throughout; taxonomy uses uppercase Satoshi Medium rather than introducing another family.

| Role | Desktop | Mobile |
|---|---:|---:|
| Hero | 112/0.90, 500, `-0.055em` | 52/0.94, 500, `-0.045em` |
| Section display | 76/0.96, 500 | 42/1.00 |
| Project title | 48/1.00, 500 | 32/1.05 |
| Lead | 24/1.35, 400 | 20/1.4 |
| Body | 17/1.55, 400 | 16/1.55 |
| Taxonomy | 11/1, 600, `0.18em` | 10/1 |

Hero copy: **“I build digital products and physical systems.”** Keep it two lines at ≥1024px and no more than three at 320px.

## Layout and Flow

- Maximum canvas: `1440px`; desktop gutters `48px`, tablet `32px`, mobile `16px`.
- Major chapters: `176px` vertical padding desktop, `112px` tablet, `88px` mobile.
- AIDA: detached navigation → hero → capability marquee/project accordion → text reveal/card cascade → hiring CTA/footer.
- Navigation: floating `max-width:1344px`, `60px` high, `24px` from top; near-black shell, bone hairline, copper active marker. Links: Work, About, Contact; **Hire Me** remains the sole filled nav action.

## Editorial Split Hero

- `min-height: 100dvh`; 12-column grid with **7 columns text / 5 columns cube**, `72px` gap.
- Left: factual eyebrow **“Full-Stack Developer · Dhaka, Bangladesh”**, H1, then exactly two actions: **Hire Me** and **Selected Work**.
- Primary CTA: bone fill/near-black text. Secondary: transparent with bone hairline and bone text. Both 52px high, fully rounded.
- Preserve at least `10vw` of apparent negative space around the cube; no badges, stats, skill chips, or decorative stamps.

### Cube Unicorn

- First major visual below navigation; transparent `560×560px` scene on desktop.
- Obsidian faces use `#0D0D0B`; bevels and selected facets use metallic `#B46D45`; tiny bone highlights only at edge reflections.
- Material target: copper metallic `0.9`, roughness `0.32`; obsidian metallic `0.55`, roughness `0.48`.
- Warm key light at roughly 3000K from upper-left, weak sage bounce below, no colored rim lighting.
- Slow inertial rotation with maximum pointer response of `4deg`; reduced-motion and WebGL failure show a static copper/obsidian render.
- Seat the scene inside a machined double bezel: 1px bone/12 outer ring, 6px inset, 32px outer radius, 26px inner radius.

## Interest: Marquee and Accordion

- **Infinite marquee:** 56px strip repeating real capabilities: **Web products · APIs and systems · Mobile · IoT and electronics**. Bone text with copper separators; constant-speed 28-second loop.
- **Horizontal accordion:** `1320×680px`, four vertical panels. Default active distribution is `70/10/10/10`; BTEB Flow opens first.
- Order: **BTEB Flow → AmarHisab → SMD Rework Station → DIY Soldering Station**, keeping both hardware projects separate and adjacent.
- Each open panel reveals the verified image, field, existing summary, repository, and live-product link where available. Never add audience counts, client claims, or fabricated outcomes.

## Desire: Text Reveal and Z-Axis Cascade

Scrub the statement word-by-word:

> **I take ideas from screen to circuit and build the systems between.**

Words progress from `opacity:.12; translateY:12px` to full opacity and zero translation over one viewport of scroll; `scrub:0.8`.

Project stories then form a four-card Z-axis cascade:

1. **BTEB Flow** — flagship, 64% product media / 36% copy; copper accent.
2. **AmarHisab** — 58% interface / 42% copy; bone accent.
3. **SMD Rework Station** — wide control-interface composition; signal-red detail used sparingly.
4. **DIY Soldering Station** — close hardware crop / copy split; dark-sage accent.

Cards are `min-height:72vh`, sticky at `top:120px`, with `28px` stacking intervals. As a new card arrives, the previous card resolves to `scale:.955`, `translateY:-24px`, `opacity:.5`. Use the verified project assets only; additional macro workshop photography must depict Irfan’s actual hardware, never stock equipment presented as his work.

Every project uses a machined double bezel: 6px outer tray, bone/12 ring, 34px outer radius, 28px inner radius, subtle inset bone highlight. No generic drop shadows.

## Action and Footer

- Full-width bone hiring panel with near-black text:
  - **“Available for internships and freelance projects.”**
  - **“Have something worth building?”**
  - **“Let’s make the product, system, or prototype real.”**
  - Primary **Hire Me** email CTA.
- Footer returns to near-black with Email, GitHub, LinkedIn, Facebook, and WhatsApp; no Instagram or YouTube.
- Testimonial data structure remains empty and returns no rendered section or spacing until genuine quotes exist.

## Motion, Interaction, and Mobile

- Image hover: `scale(1.03)` over `900ms` using `cubic-bezier(.32,.72,0,1)`.
- Buttons press to `scale(.98)`; nested arrow island shifts `translate(3px,-1px)`.
- Focus: visible `3px #D84A3A` outline with `4px` offset; minimum touch target `44px`.
- Below `768px`: single-column hero, cube first at `min(88vw,360px)`, copy below, full-width stacked CTAs.
- Accordion becomes four native stacked disclosures; first remains open.
- Remove card rotation, sticky positioning, negative overlap, and pinning; cards become a normal vertical stack with `24px` gaps.
- Hero `52px`, section headings `42px`; no horizontal overflow.
- `prefers-reduced-motion`: static marquee, fully visible reveal text, static cube, and ordinary project stack.