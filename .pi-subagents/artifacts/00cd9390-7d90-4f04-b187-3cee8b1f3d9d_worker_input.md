# Task for worker

Apply two review fixes to the current portfolio implementation at commit da313c0:
1. In app/page.tsx, add the explicit Tailwind `max-w-6xl` class to the hero H1. Keep the existing hero copy/layout otherwise unchanged.
2. In app/globals.css, remove the black border from the white secondary CTA/pill to match DESIGN.md. Preserve white background, black text, pill radius, focus visibility, and hit area.

Read the full prior implementation report for context: /mnt/D/CODE/LINUX/CODE/web-apps/portfolio/irfu2/.superpowers/sdd/task-2-3-report.md. Do not edit anything outside app/page.tsx and app/globals.css except appending your fix evidence to that report. Run Vitest, ESLint, TypeScript, and production build. Commit only the two source fixes with a Conventional Commit. Do not stage unrelated untracked files.

Append exact changes, commands/results, commit hash, self-review, and concerns to /mnt/D/CODE/LINUX/CODE/web-apps/portfolio/irfu2/.superpowers/sdd/task-2-3-report.md. Return status, commit hash, one-line verification summary, concerns.

## Acceptance Contract
Acceptance level: reviewed
Completion is not accepted from prose alone. End with a structured acceptance report.

Criteria:
- criterion-1: Implement the requested change without widening scope
- criterion-2: Return evidence sufficient for an independent acceptance review

Required evidence: changed-files, tests-added, commands-run, validation-output, residual-risks, no-staged-files

Review gate: optional by reviewer.

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
    },
    {
      "id": "criterion-2",
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