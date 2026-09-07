# Spring Boot Full-Stack Todo

A hands-on learning project for a **senior front-end developer** moving into full-stack Java development with real production-oriented structure.

## Stack

- Java 21
- Spring Boot 4.1.1
- Maven multi-module
- Clean Architecture
- MyBatis-Plus 3.5.17
- PostgreSQL first; MySQL later as a portability exercise
- Vanilla JavaScript
- Agent Workflow Scrum

## Architecture

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

The frontend is intentionally minimal in Sprint 0. API integration starts in the **Create Todo** vertical slice.

## What we build next

The first product slice is **Create Todo**:

```text
POST /api/todos
    -> REST request DTO
    -> CreateTodo use case
    -> Todo domain model
    -> TodoRepository port
    -> MyBatis-Plus persistence adapter
    -> PostgreSQL
```

We will implement it one layer at a time and test the behavior, not just the annotations.

See [`docs/learning-roadmap.md`](docs/learning-roadmap.md).
