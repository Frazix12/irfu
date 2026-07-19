# Cinematic Portfolio Redesign

**Date:** 2026-07-20
**Status:** Approved

## Objective

Redesign the portfolio as a cinematic, scroll-led title sequence rather than a conventional collection of portfolio sections. The experience must remain fast to scan, accessible, mobile-safe, and focused on the primary conversion: **Hire Me**.

The visual direction is editorial science fiction: a near-black opening, oversized title typography, restrained film texture, an atmospheric Cube Unicorn, and project color entering gradually as the visitor scrolls.

## Audience and success criteria

The page serves recruiters, employers, freelance clients, founders, and collaborators without allowing one audience to dominate.

The redesign succeeds when:

- The first viewport feels like a movie opening while immediately communicating what Irfan builds.
- Hire Me and Selected Work remain visible and usable without waiting for an intro.
- Scrolling feels fluid and cinematic without delaying, locking, or hijacking normal input.
- Each featured project receives one memorable, readable scene.
- The relationship between software and physical systems becomes the central narrative.
- The page remains complete without JavaScript, WebGL, or motion.
- Desktop and mobile have intentionally composed experiences rather than a desktop layout merely collapsed into one column.

## Current-state diagnosis

The existing implementation has a strong content contract, verified project media, a working Cube Unicorn, and scoped GSAP integration. However, it still reads as an editorial portfolio rather than a continuous title sequence because:

- Motion is limited to project-image scaling and pinned stack cards.
- The same four projects appear in bento, accordion, and stacked-card forms.
- The hero places the cube after the headline instead of treating it as the opening visual subject.
- Section transitions do not create a continuous narrative or controlled change in pace.
- Color blocks are attractive but enter as separate components rather than story beats.

The redesign will reuse the reliable content, assets, links, WebGL fallback, fonts, and GSAP dependency while replacing the repetitive page composition.

## Selected approach

Use a **chaptered title sequence** with natural scrolling.

Rejected alternatives:

1. **One continuous camera move:** more immersive but technically heavier, harder to scan, and fragile on mobile.
2. **Cinematic shell around the current layout:** lower risk but insufficient for the requested full redesign.
3. **Scene-locked scrolling:** theatrical but frustrating for navigation and accessibility.

## Narrative architecture

### Opening frame

A 1–2 second, non-blocking title reveal introduces Irfan, the headline, and the Cube Unicorn. Navigation, Hire Me, and Selected Work are interactive immediately. The intro never delays access to the page and does not replay on every scroll.

The hero headline remains:

> I build digital products and physical systems.

The Cube Unicorn is the dominant visual subject. It can sit behind or intersect the typography, but it must not reduce text contrast or obstruct actions.

### Identity scene

The cube recedes while the hero statement resolves into a large kinetic composition. Scroll reveals the words in sequence to establish the screen-to-circuit theme. This is the primary pinned statement scene.

### Selected work sequence

Render the featured work once, as four full-width cinematic scenes:

1. **BTEB Flow** leads as the flagship founder/product story.
2. **AmarHisab** shifts into a tighter software-product rhythm.
3. **SMD Rework Station** transitions the narrative from screen to circuit.
4. **DIY Soldering Station** closes the project arc as the adjacent hardware story.

Each scene contains the real project screenshot, title, short factual summary, field, and existing live/repository links. Incoming scenes cover outgoing scenes through sticky layering. Project content must remain readable before motion is initialized.

### Field montage

A single restrained kinetic line connects web products, APIs, backend systems, mobile, IoT, microcontrollers, and electronics. This replaces skill cards, technology pills, and proficiency indicators.

At most one continuous marquee may appear on the page. If used, it belongs here and must stop under reduced motion.

### Final title card

The final scene removes most visual detail and presents:

- Available for internships and freelance projects.
- Hire Me as the primary action, opening email.
- GitHub, LinkedIn, Facebook, and WhatsApp as secondary links.
- Dhaka, Bangladesh.

### Footer

Keep the footer minimal: identity, location, essential navigation, and public social links. Do not add a multi-column link farm.

## Visual system

### Theme arc

The opening and identity scenes use a locked near-black theme with soft off-white typography. Project scenes introduce the existing project-associated pastel tones gradually, as deliberate changes in the film's lighting rather than unrelated page themes.

Use the established palette as source material:

- Lilac for BTEB Flow.
- Mint or cream for AmarHisab.
- Coral and navy for the hardware chapters.
- Charcoal-black and off-white for navigation, opening, identity, and final title card.

Do not use generic purple-blue glows, decorative gradients, glass cards, neon edges, or pure black as the main surface.

### Typography

Retain **Outfit** as the implementation typeface and Geist Mono only for restrained taxonomy or captions. Typography provides most of the visual impact.

- The hero stays within two lines on desktop and three lines at 320px.
- Project titles may cross the composition at display scale but cannot obscure essential screenshot content.
- Body copy remains short and readable, with a maximum line length near 65 characters.
- Avoid cheap meta-labels, fake timecodes, section numbers, and decorative technical jargon.

### Surfaces and imagery

Use the existing verified local project screenshots and Cube Unicorn scene. Project media appears in large, stable aspect-ratio frames that read as film stills rather than cards.

A fixed, pointer-events-none grain layer may add subtle texture. It must not animate continuously or trigger expensive repainting on scrolling containers.

Do not add stock photos, invented product interfaces, fake testimonials, or fabricated metrics.

## Motion system

Motion communicates sequence, depth, focus, or state. Decorative movement without a narrative purpose is excluded.

### Opening motion

- Reveal title lines through overflow-hidden masks using vertical transforms and opacity.
- Resolve the cube from reduced scale and opacity.
- Keep actions available throughout the sequence.
- Complete within two seconds.

### Scroll motion

- Use native scrolling with GSAP ScrollTrigger scrub smoothing.
- Use one pinned identity scene for the main statement.
- Use sticky project layering for the selected-work sequence.
- Let incoming project color cover the previous near-black or pastel scene.
- Scale project media subtly as it enters and settles.
- Slow the visual pace before the final contact frame.

Do not add global wheel interception, delayed touch input, custom cursors, sound, fake film controls, aggressive glitch effects, or perpetual decorative loops.

Animate transform and opacity only. Pinning and scrub distances must be recalculated on resize through ScrollTrigger refresh behavior.

### Reduced motion

When `prefers-reduced-motion: reduce` is active:

- Skip the autoplay opening animation.
- Disable scrubbed reveals, pinning, parallax, marquee movement, and scale transitions.
- Render every scene as a normal static document flow.
- Preserve all content, links, visual hierarchy, and project imagery.

## Technical architecture

### Server-rendered structure

`app/page.tsx` remains a Server Component. It renders semantic navigation, main sections, project articles, contact content, and footer using the existing data in `lib/portfolio.ts`.

The page should expose small `data-*` hooks for enhancement rather than moving static content into a client component.

### Client motion controller

`components/portfolio-motion.tsx` remains the single client-side GSAP boundary. It will:

- Scope animations to its root.
- Register the opening, identity, and project-scene timelines.
- Use GSAP matchMedia for desktop, tablet, mobile, and reduced-motion behavior.
- Revert its context and media queries during cleanup.

No global state or new smooth-scroll dependency is required.

### Hero visual

`components/cube-unicorn.tsx` remains responsible for the Unicorn Studio scene, loading state, WebGL failure, and static reduced-motion fallback.

### Styling

`app/globals.css` owns cinematic tokens, layout, responsive scene composition, focus states, static fallbacks, and the grain layer. Existing unused bento, accordion, and duplicate stack styles should be deleted rather than retained for speculative reuse.

### Data flow

`lib/portfolio.ts` remains the authoritative source for project titles, factual summaries, fields, images, alt text, links, capabilities, availability text, and social links. The redesign changes presentation, not factual content.

## Responsive behavior

### Desktop

- Full opening composition with the live cube.
- Pinned identity statement.
- Sticky project scenes with controlled overlap.
- Large project typography and media.

### Tablet

- Preserve scene layering with shorter pin and scrub distances.
- Reduce title scale and overlap to protect project readability.

### Mobile

- Use a clean vertical film edit.
- Remove long scroll traps and most pinning.
- Keep transforms shallow and project screenshots fully readable.
- Keep hero actions visible in the initial viewport.
- Maintain a three-line maximum hero at 320px.
- Prevent horizontal overflow from off-screen animation states.

## Accessibility and failure handling

- Keep the skip-to-content link and semantic landmarks.
- Maintain visible keyboard focus on navigation, project links, summaries if any remain, and social actions.
- Ensure text and controls meet WCAG AA contrast on every scene color.
- Keep CTA labels on one line and touch targets at least 44px high.
- Provide meaningful project-image alt text from the existing content contract.
- Without JavaScript, render all scenes visible in document order.
- Without WebGL, render the existing static cube fallback.
- If the live cube fails after loading begins, replace it with the fallback without hiding the hero copy.

## Testing and verification

### Automated

- Update the existing Vitest content-contract tests only where section structure changes require it.
- Run `bunx vitest run`.
- Run `bun run lint`.
- Run `bunx tsc --noEmit`.
- Run `bun run build`.

### Browser verification

Verify at minimum:

- 1440 × 1000 desktop.
- 375 × 812 mobile.
- 320px mobile width for hero wrapping.
- Reduced-motion mode.
- Keyboard-only navigation.

Confirm:

- Opening is non-blocking and completes within two seconds.
- Desktop hero uses no more than two lines; 320px mobile uses no more than three.
- Hire Me and Selected Work are available immediately.
- All four project scenes appear once and link correctly.
- Sticky and pinned scenes release correctly.
- Resize does not leave stale pin spacers or incorrect scene positions.
- No horizontal overflow exists.
- No browser page errors or console errors occur.
- WebGL and static cube paths both render.
- Project images preserve aspect ratio and legibility.

## Scope exclusions

The redesign does not add:

- A full-screen blocking loader.
- Audio or video playback.
- A custom smooth-scroll library.
- Route transitions or additional pages.
- A CMS or contact form backend.
- Testimonials until genuine quotes are supplied.
- New personal claims, metrics, clients, or outcomes.
- New dependencies unless implementation proves an existing requirement cannot be met with the current stack.

## Implementation constraint

The repository currently contains pre-existing uncommitted changes in files that this redesign will touch. Implementation must inspect and preserve those changes rather than resetting or overwriting them. Only redesign-specific files may be staged in future commits.
