# Sprint 0 Setup Status

Historical bootstrap record. Current product scope and active work are in [CONTEXT.md](../CONTEXT.md); the Tutor Website foundation is active, and Todo implementation is deferred. Environment/version observations below describe their original session, not current verification.

## Prepared

- Maven parent reactor with five backend modules
- Clean Architecture dependency direction documented
- Java 21 baseline
- Spring Boot 4.1.1 baseline
- MyBatis-Plus 3.5.17 Boot 4 starter in persistence adapter
- PostgreSQL Docker Compose configuration
- Spring Boot composition root and `/api` setup endpoint
- Vanilla JavaScript frontend scaffold
- Project-specific `AGENTS.md` and `CONTEXT.md`
- Agent Workflow Scrum dependency pinned to `8ebb2b220b624693a4b3c769c34aa873d2e79462`
- `package-lock.json` generated from the pinned dependency
- Official Agent Workflow Scrum scaffold initialized with `agent-workflow init --existing`
- Project-specific `.agents/config.json` configured for Maven modules + Vanilla JS
- Workflow mode configured as `guided`
- `.agentignore` added for dependency/build output, local env files, and workspace noise

## Workflow installation verification

GitHub Actions bootstrap run `34106975572` completed successfully on 2026-09-07.

Successful steps included:

```text
Install pinned workflow CLI
Initialize official workflow scaffold
Configure workflow for Maven multi-module project
Run workflow doctor
Discover installed skills
Commit generated consumer scaffold
```

The one-time bootstrap workflow removed itself after the generated files were committed.

Generated project-owned workflow state includes:

```text
AGENT-QUICKSTART.md
.agents/config.json
.agents/docs/AGENTS.md
.agents/docs/agent-workflow.md
.agents/docs/architecture.md
.agents/docs/development.md
.agents/docs/testing.md
.agents/docs/defensive-patterns.md
.agents/docs/evidence/
.agents/docs/plans/
.agents/docs/prd/
.agents/docs/proposals/
.agents/docs/solutions/
.agents/docs/tasks/
```

The architecture, development, and testing documents were then grounded in this Todo project's real Maven/Spring Boot structure instead of leaving generated placeholders.

## Initial preparation environment

The original scaffold preparation environment reported:

```text
java: OpenJDK 21.0.11
node: v22.16.0
npm: 10.9.2
git: 2.47.3
```

Static validation performed during scaffold preparation:

- all `pom.xml` files parsed as valid XML
- `package.json` parsed as valid JSON
- inner-layer source stubs contain no Spring imports

## Product checks still required

Workflow installation is verified, but the product build/runtime has not yet been claimed as passing. Run these before Sprint 0 is accepted:

```bash
mvn clean verify
docker compose up -d postgres
mvn -pl todo-boot -am package
java -jar todo-boot/target/todo-boot-0.1.0-SNAPSHOT.jar
curl http://localhost:8080/api
```

Record exact results as evidence. A successful workflow `doctor` proves workflow scaffold/configuration health; it does not prove the Java application builds or runs.

## Repository status

Sprint 0 and Agent Workflow Scrum are stored in `next-mmo/spring-boot-full-stack`. Create Todo was selected after bootstrap; consult the [deferred sample task](../.agents/docs/tasks/todo-0001-0001-create-todo.md) for subsequent domain/application evidence and the resume point. This record does not establish current CI or runtime acceptance.
