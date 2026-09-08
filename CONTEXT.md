# Project Context

## Product

A full-stack Todo application built with Java/Spring Boot, PostgreSQL, and a Vanilla JavaScript client. The Todo product is the active direction; the previously started tutor website is preserved as deferred work.

Product requirements: `.agents/docs/prd/0001-todo-core.md`. The deferred tutor direction remains documented in `.agents/docs/prd/0002-full-stack-tutor.md`. Detailed PRDs remain drafts and acceptance remains human-owned.

## Learner

The website serves beginners, people with some coding experience, and experienced developers. Assess prerequisites per concept; explain through concrete examples, small exercises, and graduated hints. Track demonstrated understanding separately from code completion.

The current repository learner is a senior frontend developer who prefers the assistant to implement code and explain it in small steps. Their checkpoint is preserved in the active Todo task; use optional conceptual questions rather than requiring coding exercises.

Examples:

- Spring REST controller ~= HTTP adapter / server-side boundary, not the business layer.
- Application use case ~= an application service orchestrating a feature, similar to a feature-level command handler.
- Port/interface ~= an inward-owned contract that adapters implement.
- Domain entity/value object ~= business state and invariants independent of transport/storage.
- Dependency injection ~= runtime composition of implementations behind contracts.
- Transaction boundary ~= atomic state-change boundary, not merely a database helper.

## Technical baseline

- Java 21
- Spring Boot 4.1.1
- Maven multi-module
- Clean Architecture
- MyBatis-Plus 3.5.17
- PostgreSQL as the first database
- MySQL as a later portability exercise
- Vanilla JavaScript frontend

## Current delivery state

- Active: `.agents/docs/tasks/wip-0001-0001-create-todo.md`, Create Todo vertical slice. Domain/application code, PostgreSQL/MyBatis persistence, Flyway schema, composition-root wiring, HTTP create, and frontend integration exist. Fresh verification belongs in the active task; human acceptance remains pending.
- Deferred, preserved: `.agents/docs/tasks/todo-0002-0002-tutor-website-foundation.md`, including the offline tutor UI, lesson content, and its evidence ledger. Do not extend it during Todo work.
- The preserved tutor provider/session work remains outside active product scope.
- Current runtime scope is the Todo backend and `frontend/`. The preserved `tutor-frontend/` and `learning/` paths are out of active product scope.

## Todo sample roadmap

Build vertical slices in this order:

1. Repository/workflow/bootstrap
2. Create Todo
3. List Todos
4. Complete and reopen Todo
5. Edit and delete Todo
6. Validation and error contracts
7. Filtering, pagination, and sorting
8. Transactions and concurrency
9. PostgreSQL/MySQL portability
10. Testing, observability, packaging, and production-readiness review
