# Task for reviewer

Perform the final whole-implementation review of Irfan Hossain's new portfolio.

What was implemented: a Next.js 16 App Router portfolio with typed verified content, local project assets, a Zepa Cube Unicorn hero, Figma-inspired DESIGN.md visual system, responsive AIDA page, exact dense project bento, horizontal project accordion, inline project imagery, GSAP image scale/fade and card stacking, reduced-motion/WebGL fallbacks, metadata, accessibility baseline, and contract tests.

Requirements:
- /mnt/D/CODE/LINUX/CODE/web-apps/portfolio/irfu2/docs/superpowers/specs/2026-07-19-portfolio-design.md
- /mnt/D/CODE/LINUX/CODE/web-apps/portfolio/irfu2/docs/superpowers/plans/2026-07-19-portfolio-implementation.md
- /mnt/D/CODE/LINUX/CODE/web-apps/portfolio/irfu2/AGENTS.md
- /mnt/D/CODE/LINUX/CODE/web-apps/portfolio/irfu2/DESIGN.md

Git range base 506ef39591a93b00a0255b48fc96f9cada50c06a to head 869a852. Read the prepared full review package once: /mnt/D/CODE/LINUX/CODE/web-apps/portfolio/irfu2/.superpowers/sdd/review-506ef39..869a852.diff

Independent parent verification already observed: 3/3 Vitest pass; ESLint exit 0; `tsc --noEmit` exit 0; Next production build succeeds and statically renders `/`; desktop browser 1440×1000 has H1=2 lines/no overflow/live cube canvas/no page or console errors; mobile 375×812 reduced-motion has H1=3 lines/no overflow/no errors; local project images load after scrolling.

Review is read-only. Do not mutate working tree, index, HEAD, or branch. Review plan alignment, code quality, architecture, security/performance, accessibility, tests, and production readiness. Cite file:line. Return Strengths, Issues by Critical/Important/Minor, Recommendations, and Ready-to-merge verdict. Do not treat unrelated untracked DESIGN/tool artifacts as implementation defects.

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