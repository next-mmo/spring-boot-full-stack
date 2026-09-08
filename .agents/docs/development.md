# Development

These commands operate the full-stack Todo product and repository workflow. The tutor website foundation is preserved but deferred; do not add provider, lesson, or tutor UI work unless the human explicitly reactivates it.

## Prerequisites

- Git
- JDK 21
- Maven 3.9+
- Node.js `^20.19.0 || >=22.12.0`
- Docker Desktop / Docker Engine

Check the local toolchain:

```bash
java -version
mvn -version
node --version
npm --version
docker --version
```

## Workflow tooling

The workflow CLI is a pinned dev dependency. Install exactly what `package-lock.json` records:

```bash
npm ci
npm exec -- agent-workflow doctor
npm exec -- agent-workflow skills --json
```

For non-trivial work, generate bounded context before editing:

```bash
npm exec -- agent-workflow context -- "<task description>"
```

Do not copy the installed workflow package, plugins, or their skills into this repository. Project-owned workflow state includes `AGENTS.md`, `CONTEXT.md`, `.agents/config.json`, `.agents/docs/`, and explicitly authored `.agents/skills/`. The `tutor` skill supports learning; `agent-workflow-feedback` captures and reuses package feedback in [local cases](feedback/agent-workflow/index.md). Neither is a vendored workflow skill.

## Maven reactor

Build all backend modules:

```bash
mvn clean verify
```

Useful focused commands:

```bash
mvn test
mvn -DskipTests package
mvn -pl todo-boot -am package
```

The parent reactor is `pom.xml`. Module dependency direction is documented in [architecture.md](architecture.md).

## PostgreSQL

Start the local database:

```bash
docker compose up -d postgres
docker compose ps
```

Stop it without deleting data:

```bash
docker compose stop postgres
```

Remove the local database volume only when data destruction is intentional:

```bash
docker compose down -v
```

## Backend runtime

Startup runs the persistence module's Flyway migrations before database use. `V1__create_todos.sql` creates `todos` in a fresh schema; Flyway records the applied version. Existing unmanaged schemas require deliberate migration planning. Startup does not enable automatic baselining or erase existing tables.

Build and run the composition-root JAR:

```bash
mvn -pl todo-boot -am package
java -jar todo-boot/target/todo-boot-0.1.0-SNAPSHOT.jar
```

Smoke check:

```bash
curl http://localhost:8080/api
```

## Vanilla JavaScript frontend

Serve the static client in another terminal:

```bash
cd frontend
python3 -m http.server 5173
```

Open `http://localhost:5173`.

## Deferred tutor foundation

Start the Vite development server from the repository root so the tutor can load its versioned lesson content:

```bash
npm run dev
```

Open `http://localhost:5173/tutor-frontend/`. Run the deterministic state/content checks with `npm run tutor:test`. This path does not connect to an LLM, store provider keys, or prove backend/provider acceptance.

## Before handoff

Verify the exact Git base rather than guessing it, then use the workflow selector and consistency checks:

```bash
npm exec -- agent-workflow scope --base <verified-ref>
npm exec -- agent-workflow verify --base <verified-ref>
npm exec -- agent-workflow check
npm exec -- agent-workflow review --base <verified-ref>
npm exec -- agent-workflow prdsync --dry-run
```

Run every product check selected by `verify` and record exact results in the active task/evidence. Passing automation is evidence, not human acceptance.
