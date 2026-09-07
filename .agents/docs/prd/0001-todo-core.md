# PRD-0001: Todo Core

> Status: draft
> Created: 2026-09-07
> Updated: 2026-09-07
> Related Task: `.agents/docs/tasks/todo-0001-0001-create-todo.md`

## Problem Statement

The project needs a small but real Todo product surface that can teach backend boundaries end to end: business rules, application use cases, HTTP contracts, persistence adapters, database behavior, and a Vanilla JavaScript client.

The learning goal is not maximum CRUD speed. Each feature should make ownership and dependency direction visible while still producing a runnable user-facing application.

## Product Requirements

1. A user can create a Todo with a non-empty title and receive the created resource with a stable identifier and completion state.
2. Todos persist in the configured relational database and remain available across application restarts.
3. A user can list persisted Todos.
4. A user can complete and reopen a Todo through an explicit state-change contract.
5. A user can edit a Todo title and delete a Todo.
6. Invalid input and missing resources produce stable API errors that the frontend can handle without parsing framework/database exceptions.
7. List queries can later support filtering, pagination, and sorting without moving persistence concerns into the domain layer.
8. Business invariants remain independent of Spring MVC, MyBatis-Plus, JDBC, JSON transport models, and database-specific APIs.
9. PostgreSQL is the first supported database; MySQL portability is a later exercise and should not require rewriting domain policy.
10. The Vanilla JavaScript frontend consumes the public HTTP API rather than importing backend implementation concepts.

## Acceptance Criteria

### Create Todo slice

- [ ] `POST /api/todos` accepts a valid non-empty title and returns the created Todo.
- [ ] The created Todo is persisted in PostgreSQL with a stable identifier and initial incomplete state.
- [ ] Blank/invalid titles are rejected without creating a database row.
- [ ] Domain/application layers remain framework- and database-independent.
- [ ] The Vanilla JavaScript client can submit a new Todo through the API and reflect the successful result.
- [ ] Automated and runtime evidence covers the normal path and invalid-title path.

### Later slices

- [ ] Persisted Todos can be listed after refresh/restart.
- [ ] Todos can be completed and reopened.
- [ ] Todos can be edited and deleted.
- [ ] API validation/not-found errors use a stable frontend-friendly contract.
- [ ] Filtering, pagination, and sorting are supported through explicit query contracts.
- [ ] The persistence adapter can be exercised against PostgreSQL and later MySQL without changing domain policy.

## Non-Goals

- Authentication or multi-user ownership in the initial learning project.
- Hosted production deployment during the core Todo slices.
- Replacing Vanilla JavaScript with a frontend framework.
- Hiding architectural concepts behind code generators before the learner implements each boundary explicitly.

## Authority

This PRD is a draft until the human accepts its requirements. Passing tests or implementation progress do not approve unchecked criteria.
