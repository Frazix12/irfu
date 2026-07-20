## Concept — **Signal Bench**

A daylight electronics workbench translated into a polished portfolio: solder-mask panels, calibration marks, tactile controls, and precise technical labels. Playful through interaction—not cartoons, stickers, or novelty typography.

### Mood

**Inventive · tactile · engineered · calm · credible**

Think premium laboratory equipment rather than cyberpunk UI: opaque surfaces, crisp edges, restrained color, subtle depth, and visible construction logic.

### Palette

- **Bench Mist** — `#DDE4DC` — primary background
- **Solder Green** — `#1F5A49` — panels and strong accents
- **Deep Current** — `#17343A` — primary text
- **Instrument Blue** — `#315EA8` — links and digital-project accents
- **Signal Yellow** — `#E5C84B` — CTA and tiny status details
- **Copper Pad** — `#A86243` — hardware-project accents
- **Panel Cream** — `#F3F1E8` — card surfaces
- **Trace Line** — `#AAB8AC` — borders, grids, dividers

No gradients, neon glow, glass panels, pure black, or pure white. Yellow occupies under 8% of the page.

### Typography

- **Headings:** Instrument Sans, 600–700; compact, confident, slightly tight tracking.
- **Body:** Instrument Sans, 400–500.
- **Technical labels:** IBM Plex Mono, uppercase, 11–12px, generous tracking.
- Large type stays sentence-case; monospace appears only for metadata, coordinates, technologies, and status labels.

### Hero Layout

A split but interlocked composition:

- **Left 42%:** minimal identity block aligned to a faint calibration grid.
- **Right 58%:** uninterrupted WebGL stage for the Zepa Cube Unicorn.
- A thin PCB-like trace travels from the name toward the cube, visually connecting software and hardware.
- Small top line: `DHAKA / STUDENT + FREELANCE`
- Main copy:
  - `Irfan Hossain`
  - `Full-stack developer building products and physical systems.`
- Primary CTA: **Hire Me ↗**, a solid Signal Yellow tactile button linked directly to email.
- One quiet secondary text link: `Selected work ↓`

On mobile, the cube appears first at roughly 42vh, with copy immediately below—never reduced to a decorative thumbnail.

### Cube Treatment

Treat the Zepa Cube Unicorn as a **live bench prototype**, not a glowing centerpiece:

- Transparent WebGL canvas integrated directly into the Bench Mist background.
- Position the cube above an elliptical, soft-edged contact shadow so it feels physically present.
- Surround it with only three restrained mono annotations: `WEB`, `EMBEDDED`, `MOBILE`.
- Add fine coordinate ticks at two stage edges, like an oscilloscope or cutting mat.
- Preserve the scene’s native material; avoid hue filters, bloom, glass frames, and exaggerated lighting.
- Pointer movement adjusts perspective by only 3–4°. Idle rotation is slow and pauses during scrolling.
- Reduced-motion mode shows a composed still frame.

### Project Cards

Use an asymmetric **module-board layout**, not a gallery.

- **BTEB Flow:** large two-column card, Instrument Blue edge marker.
- **AmarHisab:** large two-column card, Solder Green edge marker.
- **SMD Rework Station** and **DIY Soldering Station:** separate, equal cards placed directly adjacent—visually related but never merged.
- Hardware cards use Copper Pad details; digital products use Instrument Blue.
- Each card contains only:
  - project name
  - one short outcome line
  - role/year in monospace
  - one strong image or interface frame
- Card corners: 10–12px, with solid Panel Cream surfaces, 1px Trace Line borders, and small exposed “mounting point” circles.
- On hover, a single trace line draws toward the title and the image rises 3px. No glow or glass effects.

### Interaction & Motion

- CTA depresses by 2px like a physical instrument button.
- Tiny status LED beside availability shifts from muted green to Signal Yellow on CTA hover.
- Project filters resemble compact segmented hardware switches: `ALL / WEB / MOBILE / HARDWARE`.
- Scroll reveals use 180–280ms linear-to-ease-out movement; no elastic or bouncy animation.
- Cube movement remains slower than interface motion, giving it visual weight.
- Focus states use a clear 2px Instrument Blue outline.

### Why It Fits Irfan

**Signal Bench** makes Irfan’s broad skill set feel coherent: web products, APIs, mobile, IoT, and electronics all become outputs from the same builder’s workbench. The tactile lab language communicates experimentation and curiosity, while disciplined typography, muted colors, and restrained motion keep the portfolio premium, professional, and suitable for both freelance clients and employers.