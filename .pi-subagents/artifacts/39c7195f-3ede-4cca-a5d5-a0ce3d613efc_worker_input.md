# Task for worker

Implement Task 1 of Irfan Hossain's portfolio build in the current checkout. Read this first; it is the complete requirements with exact values to use verbatim: /mnt/D/CODE/LINUX/CODE/web-apps/portfolio/irfu2/.superpowers/sdd/task-1-brief.md

This task establishes dependencies, verified content data, tests, local project assets, and the Zepa Cube Unicorn scene for later UI tasks. Follow strict red-green TDD: create the test, run it and capture the expected failure, then implement the minimum data module and rerun. Download only the exact approved assets. Do not modify or stage unrelated untracked files (.agents, .pi-subagents, .superpowers content except your report, DEASIGN.html, DESIGN.md, skills-lock.json). Commit only Task 1 project changes with a Conventional Commit.

Write a full report to /mnt/D/CODE/LINUX/CODE/web-apps/portfolio/irfu2/.superpowers/sdd/task-1-report.md including files changed, RED command/output, GREEN command/output, asset verification, commit hash, self-review, and concerns. Return only: status (DONE/DONE_WITH_CONCERNS/NEEDS_CONTEXT/BLOCKED), commit hash, one-line test summary, and concerns.

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