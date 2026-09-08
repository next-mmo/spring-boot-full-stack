# Product Architecture

## System shape

The product is a full-stack Todo application. The current executable code includes the Todo scaffold/domain/application step and a preserved offline Vanilla JS tutor foundation. Tutor backend modules and live provider services below are deferred architecture, not active services.

Requirements are split between [Tutor Website](prd/0002-full-stack-tutor.md) and [Todo Core](prd/0001-todo-core.md). Both use inward dependencies and the existing Java/Spring Boot/Vanilla JavaScript baseline.

## Deferred tutor architecture

| Reserved path | Owner | Dependencies |
| :--- | :--- | :--- |
| `tutor-domain/` | Lesson/progress invariants | JDK only |
| `tutor-application/` | Tutoring, progress, and session use cases; provider/storage ports | Tutor domain |
| `tutor-adapter-web/` | Tutor HTTP contracts and session boundary | Tutor application/domain |
| `tutor-adapter-llm/` | OpenAI-compatible HTTP calls and capability mapping | Tutor application ports |
| `tutor-adapter-persistence/` | Any server state/secret-store adapters selected during implementation | Tutor application/domain |
| `tutor-boot/` | Tutor runtime composition/configuration | Tutor modules |
| `tutor-frontend/` | Onboarding, offline lessons/chat, provider settings, exercise UI, guest resume | Lesson JSON now; Tutor HTTP API later |
| `learning/` | Versioned lessons, prerequisites, glossary, examples | Content independent of a model provider |

Add Maven modules/build wiring only when their implementation begins. Preserve `frontend/` as the Todo sample UI. The current `tutor-frontend/` foundation loads versioned lesson JSON and stores only normalized guest progress in browser storage. Tutor code may use versioned Todo examples/fixtures for lessons; Todo production layers must not depend on tutor state or credentials.

The intended chat flow is browser -> tutor HTTP adapter -> tutoring use case -> provider port -> LLM adapter. The use case selects bounded lesson/conversation/exercise context. It does not have implicit access to repository files or the learner's computer.

### Tutor trust and data boundaries

- A dedicated HTTPS form submits a provider key to a session-scoped server secret store. The pilot does not persist keys across sessions or include them in prompts, logs, analytics, URLs, browser persistence, or exports. Specify and test session ownership, expiry, disconnect deletion, and request authorization during implementation.
- The provider adapter validates custom HTTPS destinations and resolved addresses, rejects private/loopback/link-local/metadata destinations, and rejects credential-forwarding redirects. A hosted server's localhost is not the learner's local model. Bound requests, context, concurrency, timeouts, and cancellation.
- The pilot stores non-secret guest progress in the browser with validated export/import/reset; disclose loss on browser-data clearing and lack of cross-device sync. Local progress is learner-controlled data, not a trusted credential or certification.
- Render model/lesson content safely and isolate runnable browser exercises from the tutor origin and secrets. No learner code or model reply can execute in the backend process or directly assert trusted test results.
- Java/database runners are deferred. Their later design requires isolated disposable workspaces, resource/network limits, and dedicated test data. Label model-only code review and any local practice accurately.
- Learner preferences/submissions go only to the selected provider with a clear data-flow disclosure. Treat secrets pasted into chat as unintended disclosure; never deliberately include stored provider credentials in model context.

## Implemented Todo architecture

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

## Current runtime entry points

- Backend process: `com.peopleinfo.todo.boot.TodoApplication` in `todo-boot`.
- HTTP API: Spring MVC controllers in `todo-adapter-web` under `/api`.
- Browser client: static Vanilla JS files in `frontend`.
- Local database: PostgreSQL from `compose.yaml`.
- Tutor offline pilot: static Vanilla JS files in `tutor-frontend`, served from the repository root so it can load `learning/` JSON.
- Tutor backend/provider runtime entry points do not exist yet; document actual commands when implemented.

## Data and failure boundaries

PostgreSQL is the first persistence target. MyBatis-Plus belongs only in the persistence adapter. Application use cases depend on repository ports owned inward, so a later MySQL exercise should mostly affect configuration/migrations/persistence details rather than domain policy.

`PostgresTodoRepository` maps domain Todos into `TodoRow` and inserts through `TodoMapper`. `TodoConfiguration` in `todo-boot` supplies the repository and create-use-case beans. A persistence-owned UUID type handler bridges Java UUIDs and PostgreSQL UUID columns. Flyway loads `db/migration/V1__create_todos.sql` from the persistence module. The earlier in-memory adapter remains a learning example and is not registered as a runtime bean.

HTTP validation and transport errors are translated at the web boundary. Business invariants live in domain/application code. Database errors are handled at the persistence/application boundary and must not leak driver-specific details into public API contracts.

## Verification ownership

- Domain behavior: plain unit tests in `todo-domain`.
- Use-case orchestration: application tests with fake/stub ports.
- SQL/MyBatis mapping: persistence integration tests against a real database where mapping behavior matters.
- HTTP contracts: controller/application integration tests.
- End-to-end behavior: run the Boot application and exercise the public API, then the Vanilla JS flow.

The installed `@next-mmo/agent-workflow-scrum` dependency owns the workflow CLI, templates, and reusable plugin skills. This repository owns `AGENTS.md`, `CONTEXT.md`, `.agents/config.json`, and `.agents/docs/`; do not vendor workflow source packages or plugins.

Humans and tracked requirements define intended behavior. Keep requirements in [PRDs](prd/), technical designs in [plans](plans/), execution evidence in [evidence](evidence/) and [tasks](tasks/), reusable fixes in [solutions](solutions/), and workflow rationale in [proposals](proposals/).
