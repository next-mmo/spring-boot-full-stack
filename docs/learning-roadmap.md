# Learning Roadmap

This is the Todo product roadmap. The Tutor Website is deferred; its [foundation/pilot task](../.agents/docs/tasks/todo-0002-0002-tutor-website-foundation.md) and evidence are preserved. The active [Create Todo task](../.agents/docs/tasks/wip-0001-0001-create-todo.md) contains the learner checkpoint and current implementation evidence.

The current learner is an experienced frontend developer who prefers assistant implemented code with explanations. Lessons introduce requests/responses, Java boundaries, persistence, and tests in small vertical slices. The preserved tutor plan and lesson catalog are outside active Todo product scope.

## Sprint 0 — Bootstrap

Outcome: a runnable multi-module project with visible architecture boundaries and reproducible workflow tooling.

Topics:

- Maven reactor and module dependencies
- Spring Boot composition root
- Clean Architecture dependency rule
- local PostgreSQL with Docker Compose
- Scrum task/evidence workflow

## Sprint 1 — Create Todo

Outcome: user can create one Todo through HTTP and persist it.

Topics:

- domain entity and invariants
- input port/use case
- output repository port
- REST DTO mapping
- MyBatis-Plus entity/mapper/adapter
- schema migration
- validation and tests

## Sprint 2 — List Todos

Outcome: user can refresh the page and see persisted Todos.

Topics:

- query use case
- mapping persistence rows to domain models
- response DTO design
- Vanilla JS fetch/render/state boundaries

## Sprint 3 — Complete / Reopen

Outcome: user can change Todo completion state.

Topics:

- state transitions
- PUT vs PATCH
- optimistic concurrency introduction
- command-side tests

## Sprint 4 — Edit / Delete

Outcome: complete basic Todo lifecycle.

Topics:

- resource identity
- not-found behavior
- delete semantics
- UI editing flows

## Sprint 5 — Error Contracts

Outcome: API errors are stable and frontend-friendly.

Topics:

- validation
- exception mapping
- Problem Details / error response design
- frontend error states

## Sprint 6 — Query Features

Outcome: filtering, pagination, and sorting.

Topics:

- MyBatis-Plus wrappers
- query objects
- pagination contracts
- URL/search params in Vanilla JS

## Sprint 7 — Transactions and Concurrency

Outcome: understand atomic changes and lost-update risks.

Topics:

- transaction boundaries
- optimistic locking
- retries/conflicts
- idempotency

## Sprint 8 — PostgreSQL / MySQL Portability

Outcome: run the same application against both databases.

Topics:

- SQL portability
- dialect differences
- migrations
- configuration profiles

## Sprint 9 — Production Readiness

Outcome: review the project like a production service.

Topics:

- test pyramid
- integration tests
- logging and observability
- configuration/secrets
- packaging
- CI
- architecture review
