# Sprint 0 Setup Status

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
- Pinned Agent Workflow Scrum dependency in `package.json`

## Verification performed in preparation environment

```text
java: OpenJDK 21.0.11
node: v22.16.0
npm: 10.9.2
git: 2.47.3
```

Static validation performed:

- all `pom.xml` files parsed as valid XML
- `package.json` parsed as valid JSON
- inner-layer source stubs contain no Spring imports

## Checks still required on the developer machine

The preparation environment could not complete external package installation, so these checks remain intentionally unclaimed:

```bash
npm install
npm run workflow:init
npm run workflow:doctor
mvn clean verify
docker compose up -d postgres
mvn -pl todo-boot -am package
java -jar todo-boot/target/todo-boot-0.1.0-SNAPSHOT.jar
curl http://localhost:8080/api
```

After `npm install`, commit the generated `package-lock.json`. After `workflow:init`, inspect the generated workflow scaffold before committing it.

## Repository status

Sprint 0 scaffold is stored in `next-mmo/spring-boot-full-stack`. Runtime/build verification is still pending on a developer environment with Maven, Docker, and external package access.
