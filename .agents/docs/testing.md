# Testing and Evidence

## Test strategy

Executable suites cover Todo and the offline tutor foundation; the tutor backend/provider pilot is still unimplemented. Maven commands prove only registered reactor modules, not full website acceptance.

Use the cheapest layer that proves the behavior, then add boundary tests where framework or integration behavior matters.

| Layer | What to prove | Preferred test |
| :--- | :--- | :--- |
| `todo-domain` | Invariants and state transitions | Plain JUnit unit tests |
| `todo-application` | Use-case orchestration and port interactions | JUnit with fakes/stubs |
| `todo-adapter-persistence` | MyBatis mapping, SQL behavior, DB constraints | Integration test with real PostgreSQL where needed |
| `todo-adapter-web` | HTTP status, JSON contract, validation mapping | Spring MVC/application integration test |
| `todo-boot` | Wiring and startup | Small context/smoke test |
| `frontend` / `tutor-frontend` | Fetch/render/interaction behavior | Browser/manual checks first; tutor progress/content rules also use `npm run tutor:test` |

## Standard commands

Run backend tests:

```bash
mvn test
```

`rtk mvn -pl todo-boot -am test` runs upstream tests and PostgreSQL integration tests using real Boot/Flyway/MyBatis wiring. Docker is required; unavailability fails the suite. Testcontainers assigns a port and removes its disposable PostgreSQL 17 instance afterward. Coverage: context-restart durability, invalid input, duplicate IDs, and SQL constraints. HTTP/browser behavior remains unverified.

Run the tutor's deterministic progress/content tests:

```bash
npm run tutor:test
```

Run the full Maven verification lifecycle:

```bash
mvn clean verify
```

Build without rerunning tests when a separate test step has already passed:

```bash
mvn -DskipTests package
```

For the real API entry path:

```bash
docker compose up -d postgres
mvn -pl todo-boot -am package
java -jar todo-boot/target/todo-boot-0.1.0-SNAPSHOT.jar
curl http://localhost:8080/api
```

## Behavior expectations

### Required tutor gates when implemented

| Surface | Required evidence |
| :--- | :--- |
| Tutor domain/application | Lesson transitions, assistance/progress distinctions, context bounds, and use-case failures with deterministic tests |
| Provider adapter | Protocol fixtures plus an explicitly authorized live-provider smoke test; auth/model/rate-limit/timeout/cancel/non-streaming cases; record tested providers/capabilities |
| Session/credential boundary | Cross-session denial, expiry/disconnect deletion, log/export redaction, and custom-destination/DNS/redirect rejection |
| Website and preview | Real onboarding/chat/exercise/resume/export/import/reset flows, keyboard/narrow screens, unsafe rendering and preview isolation |
| Curriculum | Unique IDs, valid prerequisites/no cycles, links, reproducible exercise starting states, and executable expected outcomes where supported |
| Teaching quality | Beginner and developer scenarios, graduated hints, honest evidence labeling, and real novice feedback |

The offline tutor foundation has a deterministic state/content test command. Register browser, lesson-validation, and live-provider commands when those boundaries land. Until then these gates are pending, not skipped passes. Do not create success-only placeholders. Mock provider tests do not prove live compatibility, and model feedback does not prove Java/database execution.

### Todo sample behavior

For each Todo slice, cover the happy path plus relevant negative behavior. Typical cases include invalid titles, missing resources, persistence failures, stale updates, transaction rollback, and unsupported state transitions. Do not test framework annotations merely for existing; test observable behavior they are responsible for.

Persistence-specific behavior should be tested at the persistence boundary rather than mocked away. Domain rules should remain testable without Spring or a database.

## Workflow verification

Use an explicit verified Git base for outgoing scope:

```bash
npm exec -- agent-workflow scope --base <verified-ref>
npm exec -- agent-workflow verify --base <verified-ref>
npm exec -- agent-workflow check
npm exec -- agent-workflow review --base <verified-ref>
npm exec -- agent-workflow prdsync --dry-run
```

Run the product commands selected by `verify`. Record the exact command, result, environment, and any skipped checks in the active task or `evidence/`. A green build does not prove acceptance criteria unless the evidence actually exercises them, and automated checks do not replace human acceptance.

No current `.github/` workflow is installed. The documented Sprint 0 Actions run was a one-time bootstrap that removed itself; ongoing CI must be added and verified in a future implementation task.
