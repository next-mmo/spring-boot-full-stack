# Testing and Evidence

## Test strategy

Use the cheapest layer that proves the behavior, then add boundary tests where framework or integration behavior matters.

| Layer | What to prove | Preferred test |
| :--- | :--- | :--- |
| `todo-domain` | Invariants and state transitions | Plain JUnit unit tests |
| `todo-application` | Use-case orchestration and port interactions | JUnit with fakes/stubs |
| `todo-adapter-persistence` | MyBatis mapping, SQL behavior, DB constraints | Integration test with real PostgreSQL where needed |
| `todo-adapter-web` | HTTP status, JSON contract, validation mapping | Spring MVC/application integration test |
| `todo-boot` | Wiring and startup | Small context/smoke test |
| `frontend` | Fetch/render/interaction behavior | Browser/manual checks first; add lightweight automated tests when behavior justifies them |

## Standard commands

Run backend tests:

```bash
mvn test
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
