# Cloth Cursor Refraction Design

## Intent

Replace the cursor's expanded rectangular plates with a compact cinematic reticle and a local cloth-like refraction field. The pointer should feel as though it pulls the page surface beneath it without reducing readability or breaking navigation.

## Interaction

- The resting cursor remains a small cut-corner box with a centered symbol.
- The box never expands into a rectangular container.
- Labels appear as detached floating text only while hovering interactive elements such as links, buttons, and summaries.
- Headings and project media may change the centered symbol, but do not open an action label unless they are interactive.
- A roughly 160px organic refraction field follows the cursor across the page.
- Cursor velocity stretches and rotates the field like fabric under tension; the field settles smoothly when movement stops.
- Interactive hover slightly increases the field's pull and definition.

## Architecture

Keep the implementation inside `components/cinematic-cursor.tsx` and `app/globals.css`.

`CinematicCursor` will render:

1. The existing compact reticle, icon, label, and dash trails.
2. A fixed cloth-lens element that follows the pointer with delayed GSAP motion.
3. Hidden SVG filter definitions containing turbulence and displacement primitives.

Pointer movement updates the reticle position, cloth-lens position, and velocity-derived stretch. Existing `data-cursor`, `data-cursor-icon`, and `data-cursor-mode` attributes continue to define contextual symbols and labels. No React state or render loop is introduced.

## Rendering Strategy

The lens uses an organic radial mask, subtle backdrop blur, contrast, and saturation to create a local refractive surface. SVG displacement is progressive enhancement where URL-backed backdrop filters are supported. The masked backdrop treatment remains the visual fallback, so unsupported browsers still receive a fluid lens rather than a broken effect.

The effect stays below the reticle and does not intercept pointer events. Existing content is not cloned, rasterized, or moved into WebGL.

## Motion and Performance

- Reuse GSAP already installed in the project.
- Use `quickTo` for pointer tracking and velocity deformation.
- Reuse one delayed settle animation rather than creating an unbounded tween per pointer event.
- Animate transforms and opacity; avoid layout reads during pointer movement.
- Keep the filter field local and modest in size to limit paint cost.

## Accessibility and Fallbacks

- Keep the native cursor and disable the lens on touch, coarse pointers, and reduced-motion preferences.
- Preserve keyboard focus styles and semantic links/buttons.
- The cursor remains `aria-hidden` and pointer-transparent.
- Contextual labels are decorative; controls retain their visible text and accessible names.

## Verification

Automated checks will cover:

- The reticle remains compact in resting, text, and action modes.
- Action labels are restricted to interactive hover targets.
- The cloth lens and SVG filter definitions are mounted.
- Fine-pointer and reduced-motion gating remains intact.
- Pointer listeners and GSAP animations clean up correctly.

Browser checks will verify desktop refraction, velocity stretch, hover labels, no overflow, mobile fallback, reduced-motion fallback, and absence of page or console errors.
