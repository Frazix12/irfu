# Indexed Studio Navbar Design

## Goal

Make the portfolio navigation feel intentional and editorial without competing with the cinematic hero.

## Direction

Use an integrated dark studio rail rather than a floating card or light island. Keep the existing monochrome palette, Outfit/Geist Mono typography, 72px maximum desktop height, pill Hire Me action, and thin structural lines.

## Desktop

- Replace the plain name with a compact `IH` monogram plus a two-line name/role lockup.
- Label navigation items `01 Work`, `02 About`, and `03 Contact`.
- Separate the center links with hairlines and invert each link to paper-on-ink on hover/focus.
- Keep Hire Me as the sole high-contrast pill CTA.
- Keep the header visually attached to the hero with a restrained translucent ink surface and subtle backdrop blur; no shadow or gradient.

## Mobile

- Keep the monogram and short name lockup visible.
- Keep Hire Me visible.
- Use the existing native `details` disclosure for Menu; style its panel as a full-width dark editorial list with numbered links and 44px minimum targets.

## Interaction and Accessibility

- Preserve semantic `header`, `nav`, links, and native `details`/`summary` behavior.
- Preserve visible focus outlines.
- Animate only color, background, opacity, and small transforms.
- Honor reduced motion through the existing global fallback.

## Assets and Scope

No generated image is needed. The navbar’s visual problem is hierarchy and structure, and an image would add weight without improving navigation. Do not add dependencies, client state, active-section tracking, or custom SVG artwork.

## Verification

- Add/update source contracts for the indexed labels and lockup.
- Run Vitest, ESLint, TypeScript, and desktop/mobile browser QA.
- Confirm a single desktop line, no horizontal overflow, and readable focus/hover states.
