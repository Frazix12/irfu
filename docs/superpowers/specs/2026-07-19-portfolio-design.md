# Irfan Hossain Portfolio Design

**Status:** Approved for implementation  
**Date:** 2026-07-19

## Purpose

Create a visually distinctive portfolio that presents Irfan Hossain as a cross-disciplinary builder working across digital products and physical systems. The site must persuade employers, freelance clients, founders, and collaborators while keeping one clear conversion: Hire Irfan via email.

## Content Principles

- Lead with fields and outcomes, not language/tool proficiency.
- Use ultra-minimal copy and real project evidence.
- Do not invent testimonials, clients, awards, metrics, or scale claims.
- State availability as internships and freelance projects.
- Use Dhaka, Bangladesh as the public location.

## Page Structure

The page follows AIDA:

1. **Navigation** — minimal white nav, core links, one black Hire Me pill.
2. **Attention** — cinematic centered hero with a maximum 2–3-line headline and the Zepa Cube Unicorn as the focal object.
3. **Interest** — concise field statement, inline project imagery, and a mathematically gapless featured-project bento.
4. **Desire** — motion-led project storytelling with stacked cards and image scale/fade behavior.
5. **Action** — oversized high-contrast pastel hiring panel followed by a compact monochrome footer.

## Visual System

`DESIGN.md` is the source of truth.

- White canvas and black ink form the system core.
- Outfit Variable is the primary typeface; a mono face is reserved for captions and taxonomy.
- Display type is oversized, lightly weighted, tightly tracked, and kept wide enough to avoid narrow multi-line walls.
- All text CTAs are pills; icon controls are circular.
- Full-width pastel blocks provide narrative rhythm and visual depth.
- Only one dominant pastel block appears within a viewport; major blocks are separated by white canvas and large vertical spacing.
- Color blocks are flat: no decorative gradients or shadows.
- Avoid generic SaaS patterns, proficiency bars, skill-pill clouds, floating hero stamps, and raw hero statistics.

## Hero

- Architecture: Cinematic Center.
- Working headline: “I build digital products and physical systems.”
- H1 container: `max-w-6xl`.
- H1 scale: approximately `clamp(3.25rem, 7vw, 6.5rem)`.
- Desktop target: two lines; narrow mobile maximum: three lines.
- Primary CTA: Hire Me, opening email.
- Secondary action: Selected Work.
- Cube Unicorn occupies a wide supporting stage below or behind the text without reducing contrast or readability.
- No badges, tags, stats, or decorative stamps in the hero.

## Featured Projects

Desktop bento uses 12 columns × 2 rows = 24 cells with dense flow:

- BTEB Flow: 7 columns × 2 rows = 14 cells.
- AmarHisab: 5 columns × 1 row = 5 cells.
- SMD Rework Station: 3 columns × 1 row = 3 cells.
- DIY Soldering Station: 2 columns × 1 row = 2 cells.
- Total: 24 cells; no empty grid cells.

SMD Rework Station and DIY Soldering Station remain separate cards placed directly adjacent.

## Motion

Use GSAP with `@gsap/react` and ScrollTrigger only where motion strengthens hierarchy:

- Project media scales from approximately 0.8 to 1 as it enters.
- Exiting project media can fade toward 0.2 opacity.
- Featured project cards stack during scroll.
- Clickable media scales subtly on hover inside clipped containers.
- Motion must not create horizontal overflow.
- `prefers-reduced-motion` receives a stable static composition with no pinned or scrubbed behavior.

## Components

- Minimal split navigation.
- Cube Unicorn hero stage.
- Inline typography images using real project/hardware imagery.
- Gapless featured-project bento.
- Horizontal accordion for secondary project exploration.
- Hidden testimonial structure only; render nothing until genuine testimonials exist.
- Large pastel Hire Me panel.
- Monochrome footer with email, GitHub, LinkedIn, Facebook, and WhatsApp.

## Responsive Behavior

- Below tablet width, navigation collapses while preserving a visible Hire Me action.
- Hero type reduces to approximately 48px on narrow mobile and remains within three lines.
- Bento collapses without horizontal scrolling; hardware projects remain visually adjacent where width allows and stack consecutively otherwise.
- Pastel blocks become edge-to-edge below 768px and may drop their outer corner radius.
- Interactive controls maintain at least 44px touch targets.
- Cube scene loads lazily and must not block initial text interaction.

## Accessibility and Performance

- Semantic headings and landmarks.
- Visible keyboard focus on all interactive elements.
- Sufficient text/background contrast.
- Descriptive project image alt text; decorative imagery remains hidden from assistive technology.
- Reduced-motion support.
- Graceful static fallback if WebGL fails or is unavailable.
- Avoid unnecessary dependencies beyond the approved cube and GSAP integration requirements.

## Public Data

Authoritative identity, education, project, contact, and privacy context is maintained in the project root `AGENTS.md`. Implementation copy must remain consistent with it.

## Non-goals

- Blog or CMS.
- Admin dashboard.
- Public testimonials before real quotes are supplied.
- Exact user-growth claims.
- Instagram or YouTube links.
- Dark mode unless requested later.
