# 0003: Report Integrity and Canonical Record Discovery

Date: 2026-09-08. Package: `@next-mmo/agent-workflow-scrum`; repository pin and lock resolution: `8ebb2b220b624693a4b3c769c34aa873d2e79462`.

## Observation and reproduction

Run `rtk npm exec -- agent-workflow report --output <new-temporary-directory>` against this repository, then inspect `report.json`. The review invoked the installed `engine/report.mjs` directly with the same output option. It returned:

```json
{"activeTasks":2,"completedTasks":0,"prds":0,"documents":21}
```

Both tasks had status `active`. Expected: two indexed PRDs, one `wip` task, and one deferred `todo` task, preserving their declared statuses.

Source under `node_modules/@next-mmo/agent-workflow-scrum/packages/agent-workflow-scrum/`:

- `engine/report.mjs:123`: task status accepts bold field labels only; our plain `> Status:` headers fall back to `active`.
- `engine/report.mjs:388`: collects `todo`, `wip`, and `blocked` together and counts them all as active.
- `engine/report.mjs:415`: PRD rows must start with bold four-digit IDs; our linked `PRD-0001` IDs are silently omitted.
- `engine/report.mjs:545`: discovers proposal entries in legacy `suggestions/`, not canonical `proposals/`; the proposals README alone is included elsewhere.
- Task collection reads `tasks/done/` but not `tasks/archived/`. `engine/archive-core.mjs` moves older completed records there; `prd-sync-core.mjs` does recurse through task subdirectories.

## Attribution and impact

The parser mismatch is reproduced, not merely a missing dashboard feature. Archive/proposal omissions are source-confirmed; this repository has no populated archived/proposal fixtures to demonstrate their effect. A report can misstate scope, apparent work in progress, and historical delivery. A generation timestamp is present, but does not prove evidence freshness.

## Response and upstream acceptance

Until fixed, reconcile report counts against canonical files. Share one normalized parser/discovery layer across report, check, and PRD sync. Separate backlog, active, blocked, completed, and archived totals; warn on unreadable metadata instead of silently dropping it.

Regression scenarios: linked and bold PRD IDs; plain and bold status labels; one todo plus one wip; malformed rows; a canonical proposal; an archived completed task. The same fixtures must produce consistent identities across commands. No dependency patch or browser usability claim. Upstream status: not submitted.
