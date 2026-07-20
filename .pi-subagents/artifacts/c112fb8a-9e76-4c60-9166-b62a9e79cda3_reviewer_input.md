# Task for reviewer

Review Task 0 as a task-scoped spec and quality gate. Read these three files first:
- Brief: /mnt/D/CODE/LINUX/CODE/web-apps/portfolio/irfu2/.superpowers/sdd/task-0-brief.md
- Implementer report: /mnt/D/CODE/LINUX/CODE/web-apps/portfolio/irfu2/.superpowers/sdd/task-0-report.md
- Diff package: /mnt/D/CODE/LINUX/CODE/web-apps/portfolio/irfu2/.superpowers/sdd/review-f2bc9b6..71585e1.diff

Base f2bc9b6, head 71585e1.

Binding constraints:
- Checkpoint the six currently modified tracked files before redesign work; the user explicitly approved this baseline commit.
- Do not stage or modify unrelated untracked inputs: `.agents/`, `.pi-subagents/`, `.superpowers/`, `DEASIGN.html`, `DESIGN.md`, or `skills-lock.json`.
- This task only verifies and commits the existing baseline; it must not redesign anything.

Review is read-only. Do not mutate files, index, HEAD, or branch. Do not rerun tests already evidenced unless a concrete diff concern requires one focused check. Return both Spec Compliance and Task Quality verdicts with evidence and severity-ranked findings.

## Acceptance Contract
Acceptance level: reviewed
Completion is not accepted from prose alone. End with a structured acceptance report.

Criteria:
- criterion-1: Implement the requested change without widening scope
- criterion-2: Return evidence sufficient for an independent acceptance review

Required evidence: changed-files, tests-added, commands-run, validation-output, residual-risks, no-staged-files

Review gate: required by reviewer.

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