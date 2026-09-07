# Development

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

Do not copy the workflow package, plugins, or skills into this repository. The project-owned workflow state is `AGENTS.md`, `CONTEXT.md`, `.agents/config.json`, and `.agents/docs/`.

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
