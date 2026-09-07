# Product Architecture

## System shape

This is a learning Todo application built as a Maven multi-module Spring Boot system with Clean Architecture boundaries and a separate Vanilla JavaScript client.

```text
frontend
   |
   | HTTP / JSON
   v
todo-adapter-web
   |
   v
todo-application
   |
   v
todo-domain


todo-adapter-persistence
   |
   +--> todo-application ports
   |
   +--> MyBatis-Plus --> PostgreSQL


todo-boot = Spring Boot composition root
```

## Module ownership

| Module | Owns | May depend on |
| :--- | :--- | :--- |
| `todo-domain` | Business entities, value objects, invariants, domain behavior | JDK only |
| `todo-application` | Use cases, commands/queries, input/output ports | `todo-domain` |
| `todo-adapter-web` | REST controllers, HTTP request/response DTOs, transport mapping | `todo-application`, `todo-domain` |
| `todo-adapter-persistence` | MyBatis-Plus entities/mappers, repository adapters, database mapping | `todo-application`, `todo-domain` |
| `todo-boot` | Spring Boot startup, dependency composition, runtime configuration | All backend modules |
| `frontend` | Browser UI, fetch calls, rendering, interaction state | HTTP API only |

Dependencies point inward. Domain and application code must not import Spring MVC, MyBatis-Plus, JDBC, JSON transport types, or database-specific APIs.

## Runtime entry points

- Backend process: `com.peopleinfo.todo.boot.TodoApplication` in `todo-boot`.
- HTTP API: Spring MVC controllers in `todo-adapter-web` under `/api`.
- Browser client: static Vanilla JS files in `frontend`.
- Local database: PostgreSQL from `compose.yaml`.

## Data and failure boundaries

PostgreSQL is the first persistence target. MyBatis-Plus belongs only in the persistence adapter. Application use cases depend on repository ports owned inward, so a later MySQL exercise should mostly affect configuration/migrations/persistence details rather than domain policy.

HTTP validation and transport errors are translated at the web boundary. Business invariants live in domain/application code. Database errors are handled at the persistence/application boundary and must not leak driver-specific details into public API contracts.

## Verification ownership

- Domain behavior: plain unit tests in `todo-domain`.
- Use-case orchestration: application tests with fake/stub ports.
- SQL/MyBatis mapping: persistence integration tests against a real database where mapping behavior matters.
- HTTP contracts: controller/application integration tests.
- End-to-end behavior: run the Boot application and exercise the public API, then the Vanilla JS flow.

The installed `@next-mmo/agent-workflow-scrum` dependency owns the workflow CLI, templates, and reusable plugin skills. This repository owns `AGENTS.md`, `CONTEXT.md`, `.agents/config.json`, and `.agents/docs/`; do not vendor workflow source packages or plugins.

Humans and tracked requirements define intended behavior. Keep requirements in [PRDs](prd/), technical designs in [plans](plans/), execution evidence in [evidence](evidence/) and [tasks](tasks/), reusable fixes in [solutions](solutions/), and workflow rationale in [proposals](proposals/).
