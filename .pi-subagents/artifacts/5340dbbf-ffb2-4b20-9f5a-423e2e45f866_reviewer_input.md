# Task for reviewer

Review the combined Tasks 2 and 3 integration slice: first spec compliance, then code quality. This is a task-scoped gate before final validation.

Read both task briefs:
- /mnt/D/CODE/LINUX/CODE/web-apps/portfolio/irfu2/.superpowers/sdd/task-2-brief.md
- /mnt/D/CODE/LINUX/CODE/web-apps/portfolio/irfu2/.superpowers/sdd/task-3-brief.md
Read the implementer report:
- /mnt/D/CODE/LINUX/CODE/web-apps/portfolio/irfu2/.superpowers/sdd/task-2-3-report.md
Read the complete diff package once:
- /mnt/D/CODE/LINUX/CODE/web-apps/portfolio/irfu2/.superpowers/sdd/review-e44b7c8..da313c0.diff
Base: e44b7c8f8a626767f2d53332bd71bdda2663ec05
Head: da313c0

Binding constraints: `DESIGN.md` is the visual source of truth. Cube Unicorn is the first major visual below navigation and is part of the hero. Outfit Variable is primary typography and Geist Mono taxonomy. Hero H1 uses `max-w-6xl` and stays within 2 lines desktop/3 narrow mobile. AIDA page order is navigation, hero, interest, desire, hiring CTA/footer. Bento is exactly 12 columns × 2 rows with 14 + 5 + 3 + 2 = 24 cells and `grid-flow-dense`; SMD and DIY soldering remain adjacent. No precise user counts, fake testimonials, Instagram, or YouTube. Email is primary Hire Me; WhatsApp secondary. WebGL and reduced-motion fallbacks are required. The gpt-taste selection is Cinematic Center, Horizontal Accordions, hidden-only testimonial structure, Inline Typography Images, GSAP Image Scale/Fade Scroll, Card Stacking, Outfit. No meta-label UI, hero badges, raw hero stats, gradients on content blocks, or low-contrast buttons.

Treat the report as unverified. Review is read-only; do not mutate files, index, HEAD, or branch. Do not rerun broad suites unless a focused concrete doubt requires it. Cite file:line for every finding. Return exactly: Spec Compliance verdict including cannot-verify items, Strengths, Issues grouped Critical/Important/Minor, and Task quality Approved/Needs fixes.

## Acceptance Contract
Acceptance level: checked
Completion is not accepted from prose alone. End with a structured acceptance report.

Criteria:
- criterion-1: Return concrete findings with file paths and severity when applicable

Required evidence: changed-files, tests-added, commands-run, residual-risks, no-staged-files

Finish with a fenced JSON block tagged `acceptance-report` in this shape:
Use empty arrays when no items apply; array fields contain strings unless object entries are shown.
`criteriaSatisfied[].status` must be exactly one of: satisfied, not-satisfied, not-applicable.
`commandsRun[].result` must be exactly one of: passed, failed, not-run.
`manualNotes` and `notes` are optional strings; an empty string means no note and does not satisfy `manual-notes` evidence.
```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "specific proof"
    }
  ],
  "changedFiles": [
    "src/file.ts"
  ],
  "testsAddedOrUpdated": [
    "test/file.test.ts"
  ],
  "commandsRun": [
    {
      "command": "command",
      "result": "passed",
      "summary": "short result"
    }
  ],
  "validationOutput": [
    "validation output or concise summary"
  ],
  "residualRisks": [
    "none"
  ],
  "noStagedFiles": true,
  "diffSummary": "short description of the diff",
  "reviewFindings": [
    "blocker: file.ts:12 - issue found, or no blockers"
  ],
  "manualNotes": "anything else the parent should know"
}
```