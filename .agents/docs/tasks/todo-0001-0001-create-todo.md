# Task 0001: Create Todo Vertical Slice

> Status: todo
> Created: 2026-09-07
> Related PRD: `.agents/docs/prd/0001-todo-core.md`

## Change Contract

- Human outcome: a user can create one Todo through the Vanilla JavaScript UI/API and have it persisted in PostgreSQL.
- Authorization: this is the first product slice in the approved learning roadmap; product acceptance remains human-owned.
- Scope: Todo domain model/invariants, create use case and repository port, REST create endpoint/DTO mapping, MyBatis-Plus persistence adapter, database schema/migration, minimal frontend create flow, focused tests and runtime evidence.
- Non-goals: listing all Todos, complete/reopen, edit/delete, pagination/filtering, authentication, production deployment, or MySQL support in this slice.
- Risk: local database writes and schema changes. Keep persistence isolated to the adapter, use local/test data, and do not delete existing data as part of verification.
- Baseline: Sprint 0 scaffold and Agent Workflow Scrum are installed. Workflow `doctor` passed; full Maven/runtime verification is still pending and must be established before implementation claims rely on the baseline.
- Verification: `mvn clean verify`; focused domain/application tests; persistence integration evidence; real `POST /api/todos` valid/invalid requests against PostgreSQL; minimal browser create flow; workflow scope/verify/check/review against an explicitly verified base.

## Acceptance Criteria

- [ ] A valid non-empty title sent to `POST /api/todos` returns a created Todo with a stable identifier and `completed=false`.
- [ ] The created Todo is persisted in PostgreSQL and remains present after application restart.
- [ ] A blank/whitespace-only title is rejected and does not create a database row.
- [ ] `todo-domain` and `todo-application` contain no Spring MVC, MyBatis-Plus, JDBC, JSON transport, or database-specific dependencies.
- [ ] The persistence adapter implements an inward-owned repository port rather than being called directly by the web adapter.
- [ ] The Vanilla JavaScript client can submit a Todo through the public API and reflect the successful result without a JS framework.
- [ ] Automated tests and runtime evidence cover both the valid create path and invalid-title path.
- [ ] Exact verification commands/results, skipped checks, risks, and recovery notes are recorded before handoff.

## Evidence Ledger

No acceptance evidence has been recorded yet. This task is Ready, not Active, and no criteria are accepted.

| Claim | Evidence | Result |
| :--- | :--- | :--- |
| Sprint 0 workflow scaffold | GitHub Actions bootstrap run `34106975572`; `agent-workflow doctor` step | Passed |
| Product Maven/runtime baseline | Not yet executed as acceptance evidence | Pending |
| Create Todo behavior | Not implemented | Pending |

## Handoff

Move this file from `todo-*` to `wip-*` only when implementation begins. Keep exactly one active `wip-*` or `blocked-*` task. Do not mark criteria complete from code inspection alone; use fresh evidence and human acceptance.

## Recovery

For this slice, recovery is to revert only the Create Todo code/schema changes while preserving the Sprint 0 scaffold and workflow configuration. Database cleanup must be explicit and limited to local/test data; do not use destructive volume removal as an implicit rollback.
