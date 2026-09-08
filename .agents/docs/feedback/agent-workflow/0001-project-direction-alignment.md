# 0001: Project Direction Changes Need Alignment Beyond a Green Check

Date: 2026-09-08

Package: `@next-mmo/agent-workflow-scrum`, pinned to Git revision `8ebb2b220b624693a4b3c769c34aa873d2e79462` in `package.json`. Recheck the installed revision before reproducing on another checkout.

## Situation and evidence

The project changed from a Todo teaching repository for a senior frontend developer to a Tutor Website for beginners and developers using configurable OpenAI-compatible providers. The agent first updated a draft plan while `AGENTS.md`, `CONTEXT.md`, the Todo PRD, active Create Todo task, and workflow path classification still described the old scope. The user then asked about risk and explicitly requested alignment.

Observed command: `rtk npm run workflow:check --` returned exit code 0 and `workflow consistency passed` during the pre-alignment review. The check did not flag the semantic disagreement between the website plan and the older governing documents. This observation was recorded in the conversation; no immutable pre-alignment output artifact was saved. Do not claim a reproduction against the now-aligned files.

Expected agent behavior: notice the direction change, inspect all affected owners, and include alignment in an authorized change without waiting for the user to enumerate each document. Expected tooling improvement is advisory drift detection, not autonomous rewriting or approval of requirements.

## Attribution and impact

The agent failed to proactively complete the alignment assessment. The observed CLI success establishes a coverage limitation in this scenario, not a proven violation of the package's documented contract. Package defect attribution remains unconfirmed.

Risks: wrong active scope, stale teaching assumptions, product paths omitted from verification classification, and loss of learner continuity if a new product task replaces the learning checkpoint.

## Reusable response

1. Distinguish an exploratory idea from an authorized change. Assess an idea; apply scoped alignment when requested or already authorized.
2. Map the new product, audience, and surface to existing PRDs. Preserve a still-valid sample PRD; create a separate product PRD where ownership differs.
3. Preserve unfinished work and evidence. For reprioritization, return the previous task to `todo-*` with deferral/resume notes and keep one active task. Do not mark it complete or invent an environment blocker.
4. Align context, instructions, architecture, path classification, checks, and inbound links. Distinguish reserved modules from implemented runtime behavior.
5. Preserve learner checkpoints separately from product task state. Use domain/application test evidence only for the behavior it proves.
6. Run consistency checks and inspect semantic alignment directly. Record limitations and any required runtime tests honestly.

## Local outcome and verification

PRD-0002 now owns the Tutor Website, while PRD-0001 retains the Todo sample. Create Todo is deferred with its checkpoint, and the Tutor Website foundation/pilot is active. Path classification covers reserved tutor and lesson paths. The revised testing guide distinguishes existing Maven checks from future website gates.

The six domain/application tests passed during alignment using Maven 3.9.16. Local workflow checks passed after alignment. Neither establishes a complete website, accepted milestone, independent learner mastery, or an upstream package fix. Final alignment evidence belongs in the then-active tutor task, now preserved at `.agents/docs/tasks/todo-0002-0002-tutor-website-foundation.md`.

## Proposed upstream improvement

Add an optional direction-change assessment to context/review: compare explicit product/audience/surface changes against governing documents and report affected owners, active task conflicts, and unclassified paths. Separate structural validity from semantic review coverage in the output.

Acceptance scenario: given a new website plan alongside a Todo-only active task and senior-developer instructions, report the drift and affected owners while preserving all files and acceptance states. Negative scenario: a normal Todo feature change with matching scope should not trigger a product-transition warning. Treat uncertain natural-language differences as review suggestions, not automatic failure or permission to rewrite.

Upstream status: not submitted. This is a local feedback record and proposal.
