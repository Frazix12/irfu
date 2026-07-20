## Direction 4 — **Circuit Pop Workshop**
“Circuit Pop Workshop” is a disciplined Bauhaus lab where digital products and physical systems share one bold, precisely arranged workbench.

### System

- **Palette:** sunflower `#FFDA2D`, cyan `#3AD8FF`, hot pink `#FF3D9A`, ink `#090909`, paper `#FFFDF5`.
- Use `#090909` text on every bright color; paper-white text only on black. No gradients, muted tints, shadows, or gray body copy.
- **Typeface:** Satoshi Variable; fallback `Arial, Helvetica, sans-serif`.
- **Canvas:** paper white; `1320px` max width; gutters `32px` desktop, `24px` tablet, `16px` mobile.
- **Geometry:** 3px black rules, `32px` feature-block radius, pill CTAs, circles and hard-edged Bauhaus markers. One dominant color block per viewport, separated by `120–160px` of paper-white space.

### Type Scale

| Role | Desktop | Mobile | Treatment |
|---|---:|---:|---|
| Hero | `clamp(64px, 8.5vw, 132px)` | `56px` | 900, `.88` line-height, `-.055em` |
| Statement | `clamp(64px, 7vw, 108px)` | `46px` | 900, `.92`, `-.045em` |
| Section title | `72px` | `42px` | 800, `.95`, `-.035em` |
| Project title | `56px` | `36px` | 800, `.98`, `-.03em` |
| Lead | `24px` | `20px` | 500, `1.35` |
| Body | `18px` | `17px` | 500, `1.5` |
| Label | `13px` | `12px` | 700, uppercase, `.12em` |

### Page Composition

1. **Navigation — 72px**
   - Left: `IRFAN HOSSAIN` wordmark.
   - Center: Work, About, Contact.
   - Right: black **Hire Me** pill linking to `mailto:frazixgaming22@gmail.com`.
   - Paper-white background, 3px bottom rule; sticky without blur.

2. **Cinematic Center Hero — 960–1080px**
   - The Cube Unicorn is the first major object below navigation: centered, approximately `760 × 760px`, with its upper edge slightly cropped by the hero.
   - Render the cube in sunflower, cyan, hot pink, black, and paper-white faces; preserve the live multicolor scene rather than applying a monochrome filter.
   - Headline overlaps the cube’s lower visual field without obscuring interaction:  
     **“I build digital products / and physical systems.”**
   - Maximum `1120px`, centered, two desktop lines and no more than three mobile lines.
   - Below: factual lead—“Full-stack developer working across software, embedded systems, and IoT from Dhaka, Bangladesh.”
   - Exactly two actions: black **Hire Me** and paper-white **Selected Work**, both with 3px black outlines.

3. **Infinite Capability Marquee — 76px**
   - Black strip with paper-white type and alternating sunflower/cyan/pink circular separators.
   - Content: `WEB PRODUCTS • APIS & SYSTEMS • MOBILE • IOT & ELECTRONICS`.
   - Duplicate only the animated track; mark the duplicate `aria-hidden`.

4. **Editorial Split Introduction**
   - `4/8` column split, `160px` vertical padding.
   - Left: small label and oversized sunflower circle.
   - Right: `56–72px` factual copy: “I take ideas from interface to infrastructure—and, when needed, all the way to the circuit.”
   - Supporting paragraph uses the verified About copy without seniority or scale claims.

5. **Selected Work**
   - Intro on paper white, followed by three poster-like blocks with `120px` gaps:
   - **BTEB Flow — sunflower, 1320 × 760px:** `7/5` split; title, education-product description, Live/Code links left; large interface image right in a 3px black frame. Add a small `01 / FLAGSHIP` label, no user metric.
   - **AmarHisab — cyan, 1320 × 620px:** `7/5` reversed split; dashboard image left, concise expense-and-grocery story right.
   - **Hardware Diptych — hot pink, 1320 × 720px:** two separately linked projects divided by a 3px black rule. SMD Rework Station receives `60%` width with live UI and PID/airflow story; DIY Soldering Station receives `40%` with the verified hardware photograph and Arduino Nano/ATmega8 description. Keep them adjacent but distinct.

6. **Inline Typography Image Statement**
   - Full-width paper-white poster:  
     **“FROM [BTEB UI] SCREEN  
     TO [SOLDERING HARDWARE] CIRCUIT.”**
   - Inline images are `1.6em × .72em`, object-fit cover, 3px black border, `999px` radius; align to the text baseline.
   - Follow with the four capability fields only—no technology cloud or proficiency bars.

7. **Hiring CTA / Footer**
   - Black full-width block, minimum `70vh`.
   - Centered paper-white headline: **“Have something worth building?”**
   - Sunflower **Hire Me** pill; secondary plain-text WhatsApp link.
   - Footer lists GitHub, LinkedIn, Facebook, email, and Dhaka, Bangladesh.
   - Keep `<section hidden data-section="testimonials" />` empty until genuine testimonials exist.

### Motion

- **Cube:** live Unicorn motion with restrained pointer response; never rotate the whole hero via scroll.
- **Image scale/fade:** project media animates from `scale(1.12)`, `opacity:.45` to `scale(1)`, `opacity:1`; ScrollTrigger `start:"top 85%"`, `end:"center 55%"`, `scrub:.7`.
- **Scrubbing text reveals:** server-render headline words in overflow-hidden spans; animate `yPercent:115 → 0` and `rotate:2deg → 0`, stagger `.035`, scrubbed across `top 82% → top 42%`.
- **Marquee:** CSS linear loop, `28s`; pause on hover/focus.
- No bouncing, elastic easing, floating badges, or decorative scroll hijacking.
- Reduced motion: static cube fallback, final image/text states, and a non-moving horizontally wrapped marquee.

### Mobile Collapse

- Below `768px`, collapse all splits to one column; blocks become edge-to-edge with `20px` corners and `32px` padding.
- Cube remains dominant at `min(135vw, 520px)`, centered and horizontally clipped without page overflow.
- Hero actions stack full width; hero minimum height `760px`.
- Project image appears before copy; hardware diptych stacks SMD directly above DIY within the same pink block.
- Inline images reduce to `84 × 48px`; statement remains three to four lines.
- Navigation retains wordmark and Hire Me; section links collapse into a simple native disclosure menu.