# Full-Stack Todo Application

A full-stack Todo application using Java/Spring Boot, PostgreSQL, Clean Architecture, and a Vanilla JavaScript client. The previously started tutor UI is preserved as deferred work and is not part of the active product scope.

## Current status

The active Create Todo slice now connects the domain model and application use case to PostgreSQL, `POST /api/todos`, and the Vanilla JavaScript form. The tutor's offline foundation is preserved with its evidence ledger, but live provider connection, server sessions, and tutor backend work are deferred. Human acceptance of the Todo slice remains pending.

- [Todo requirements](.agents/docs/prd/0001-todo-core.md)
- [Active Create Todo task and learning checkpoint](.agents/docs/tasks/wip-0001-0001-create-todo.md)
- [Deferred tutor requirements and plan](.agents/docs/prd/0002-full-stack-tutor.md)

The setup below runs the Todo application. The preserved tutor foundation is a separate static site and does not prove end-to-end Todo behavior. See [development](.agents/docs/development.md) and [verification](.agents/docs/testing.md) for current commands.

## Stack

- Java 21
- Spring Boot 4.1.1
- Maven multi-module
- Clean Architecture
- MyBatis-Plus 3.5.17
- PostgreSQL first; MySQL later as a portability exercise
- Vanilla JavaScript
- Agent Workflow Scrum

## Existing Todo sample structure

```text
spring-boot-full-stack/
├── todo-domain/                    # Domain rules; plain Java
├── todo-application/               # Use cases + ports
├── todo-adapter-persistence/       # MyBatis-Plus output adapter
├── todo-adapter-web/               # REST input adapter
├── todo-boot/                      # Spring Boot composition root
├── frontend/                       # Vanilla JS client
└── docs/                           # Learning notes / roadmap
```

Dependency direction:

```text
adapter-web ---------> application ---------> domain
adapter-persistence -> application ---------> domain
boot ----------------> adapters + application + domain
```

The important rule is not the folder names. It is that **business policy never depends on delivery or persistence frameworks**.

## Prerequisites

- Git
- JDK 21
- Maven 3.9+
- Node.js 22.12+ for the Scrum workflow CLI
- Docker Desktop / Docker Engine

Check:

```bash
java -version
mvn -version
node --version
npm --version
docker --version
```

## Sprint 0 setup

### 1. Install the workflow CLI

The workflow dependency is pinned in `package.json`.

```bash
npm install
npm run workflow:init
npm run workflow:doctor
npm run workflow:skills
```

`workflow:init` adds the workflow scaffold while preserving project-owned files. Commit `package-lock.json` after a successful install.

### 2. Verify the Maven reactor

```bash
mvn clean verify
```

### 3. Start PostgreSQL

```bash
docker compose up -d postgres
docker compose ps
```

Local development defaults:

- database: `todo`
- username: `todo`
- password: `todo`
- port: `5432`

These credentials are local-development-only defaults and can be overridden with environment variables.

### 4. Run the API

```bash
mvn -pl todo-boot -am package
java -jar todo-boot/target/todo-boot-0.1.0-SNAPSHOT.jar
```

Check the setup endpoint:

```bash
curl http://localhost:8080/api
```

Expected shape:

```json
{"name":"todo-api","status":"ready"}
```

### 5. Run the Vanilla JS frontend

In another terminal:

```bash
cd frontend
python3 -m http.server 5173
```

Open `http://localhost:5173`.

The frontend is intentionally minimal in Sprint 0. The Create Todo slice submits JSON to `POST /api/todos`, displays the saved title and identifier, and displays the stable API error message for invalid titles.

### Run the tutor foundation

From the repository root, start the Vite development server so its lesson JSON can be loaded:

```bash
npm run dev
```

Open `http://localhost:5173/tutor-frontend/`. This mode is intentionally offline: it stores only learner progress in browser storage and does not accept or send provider credentials.

## Next milestones

The active product milestone is the Create Todo vertical slice: HTTP request/response mapping, persistence, and the minimal browser create flow. Listing, state changes, editing, deletion, filtering, portability, and production-readiness follow in later Todo slices.

The sample's unfinished **Create Todo** slice remains:

```text
POST /api/todos
    -> REST request DTO
    -> CreateTodo use case
    -> Todo domain model
    -> TodoRepository port
    -> MyBatis-Plus persistence adapter
    -> PostgreSQL
```

Resume sample implementation from its preserved task checkpoint. Keep sample requirements separate from tutor requirements.

See [`docs/learning-roadmap.md`](docs/learning-roadmap.md).
