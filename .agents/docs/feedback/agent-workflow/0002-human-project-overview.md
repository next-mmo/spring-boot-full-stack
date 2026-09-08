# 0002: Humans Need a Feature Overview Beyond the PRD Index

Date: 2026-09-08

Package: `@next-mmo/agent-workflow-scrum`, pinned in this repository to `8ebb2b220b624693a4b3c769c34aa873d2e79462`.

## Observation and evidence

The human reported that the overall project features and status remained unclear and referenced `.agents/docs/prd/0000-prd-index.md`. Inspection shows two PRDs with `draft` status and short summaries. `CONTEXT.md` explains current delivery state, while detailed criteria and evidence live in separate PRDs/tasks. Reading the index alone does not reveal the status of individual learner-facing features.

Expected: a human can identify the product goal, feature scope, what works today, current work, deferred work, and next milestone from one entry point, with links to supporting evidence.

Observed: document approval state, task scheduling, implementation state, verification, and human acceptance require separate interpretation. An active foundation/pilot task can suggest feature implementation is underway even when only its documentation portion is complete.

## Attribution and impact

This is a human-facing reporting gap in the current repository and an upstream enhancement candidate. The follow-up enterprise review inspected the existing HTML/JSON `report` command: it supplies a Git/task/PRD/document dashboard, not a consolidated feature-to-verification-and-acceptance view. Its parsing defects are recorded separately in [0003](0003-report-integrity.md). The package does not lack reporting; agent handoffs and discoverability also need improvement.

Impact: humans cannot easily assess scope, prioritize work, or distinguish planning progress from usable features.

## Recommended response

Provide a concise human-facing project overview, linked prominently from the README, derived from the PRDs and task evidence. Include feature/outcome, implementation state, verification/acceptance state, next step, and source links. Show current and deferred milestones separately. Keep PRDs/tasks authoritative; avoid creating a competing requirements source or estimating completion percentages from checkbox counts.

Separate states explicitly: planned, in progress, implemented; verification pending/passed; human acceptance pending/accepted. Explain document states such as draft independently. Display when the overview was reconciled and flag missing evidence rather than assuming completion.

Current project example: the Tutor Website is planned; its governance alignment is implemented. Todo domain/application behavior has six passing tests, but full Create Todo is unfinished and deferred. A working tutor website is not yet available.

## Upstream proposal and verification

Extend the existing report with a human-oriented feature/milestone view, evidence links, and separate document, delivery, and acceptance states. Repair the parsing defects first; do not introduce a competing dashboard command or duplicate authoritative requirements.

Acceptance scenario: a reader unfamiliar with task filenames can identify what is usable now and what comes next. A draft PRD containing tested partial implementation must show both facts; a task with only documentation complete must not imply its website is usable. Missing or stale evidence must remain visible.

Verification: PRD index, CONTEXT.md, and installed `engine/report.mjs` inspected. On 2026-09-08 the existing report was generated into a temporary local directory and its JSON inspected; no browser usability test or new dashboard implementation was performed. Upstream status: not submitted.
