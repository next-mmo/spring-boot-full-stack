# Task 0001: Create Todo Vertical Slice

> Status: wip
> Created: 2026-09-07
> Related PRD: `.agents/docs/prd/0001-todo-core.md`

## Change Contract

- Scheduling: active on 2026-09-08 after the human redirected the project to full-stack Todo work. This task is unfinished, not accepted, and not blocked by an environment failure. Preserve the existing code, tests, and learning checkpoint while completing the vertical slice.

- Human outcome: a user can create one Todo through the Vanilla JavaScript UI/API and have it persisted in PostgreSQL.
- Authorization: this is the first product slice in the approved learning roadmap; product acceptance remains human-owned.
- Scope: Todo domain model/invariants, create use case and repository port, REST create endpoint/DTO mapping, MyBatis-Plus persistence adapter, database schema/migration, minimal frontend create flow, focused tests and runtime evidence.
- Non-goals: listing all Todos, complete/reopen, edit/delete, pagination/filtering, authentication, production deployment, or MySQL support in this slice.
- Risk: local database writes and schema changes. Keep persistence isolated to the adapter, use local/test data, and do not delete existing data as part of verification.
- Baseline: Sprint 0 scaffold and Agent Workflow Scrum are installed. Workflow `doctor` passed; full Maven/runtime verification is still pending and must be established before implementation claims rely on the baseline.
- Verification: `mvn clean verify`; focused domain/application tests; persistence integration evidence; real `POST /api/todos` valid/invalid requests against PostgreSQL; minimal browser create flow; workflow scope/verify/check/review against an explicitly verified base.

## Acceptance Criteria

- [ ] A valid non-empty title sent to `POST /api/todos` returns a created Todo with a stable identifier and `completed=false`.
- [ ] The created Todo is persisted in PostgreSQL and remains present after application restart.
- [ ] A blank/whitespace-only title is rejected and does not create a database row.
- [ ] `todo-domain` and `todo-application` contain no Spring MVC, MyBatis-Plus, JDBC, JSON transport, or database-specific dependencies.
- [ ] The persistence adapter implements an inward-owned repository port rather than being called directly by the web adapter.
- [ ] The Vanilla JavaScript client can submit a Todo through the public API and reflect the successful result without a JS framework.
- [ ] Automated tests and runtime evidence cover both the valid create path and invalid-title path.
- [ ] Exact verification commands/results, skipped checks, risks, and recovery notes are recorded before handoff.

## Evidence Ledger

Partial unit-test evidence is recorded below. End-to-end Create Todo evidence remains pending; no criteria are accepted. This task is the active implementation task.

| Claim | Evidence | Result |
| :--- | :--- | :--- |
| Sprint 0 workflow scaffold | GitHub Actions bootstrap run `34106975572`; `agent-workflow doctor` step | Passed |
| Maven toolchain | Apache Maven 3.9.16 installed under `C:\\Users\\MT-Staff\\.local\\apache-maven-3.9.16`, SHA-512 verified, user `MAVEN_HOME`/`PATH` updated | Passed |
| Product Maven/runtime baseline | `mvn -version` and `mvn -pl todo-domain test` | Maven version passed; full product baseline remains pending |
| Domain production classes compile | `rtk javac -d C:\\Users\\MT-Staff\\AppData\\Local\\Temp\\todo-domain-compile ...Todo.java ...InvalidTodoTitleException.java` | Passed |
| Domain unit tests | `mvn -pl todo-domain test` | Passed: 4 tests, 0 failures |
| Application create orchestration | `mvn -pl todo-application -am test` | Passed: domain 4 tests and application 2 tests, 0 failures |
| Workflow consistency | `npm run workflow:check --` | Passed |
| Create Todo behavior | Domain/application, PostgreSQL adapter, HTTP endpoint, and frontend implemented | Pending consolidated evidence and human acceptance |

## Learning Checkpoint — 2026-09-07

- Backend request flow: browser → web controller → application use case → domain → repository port → persistence adapter → PostgreSQL.
- The domain owns the invariant that a Todo title cannot be blank.
- The controller receives HTTP input and calls the application use case; the domain does not depend on the controller.
- Next session: inspect the scaffold and begin the domain model from first principles. No product code or acceptance evidence has been added yet.
- Environment note: Maven is not currently available on `PATH`, so the baseline build remains pending.

## Learning Checkpoint — 2026-09-08

- Reviewed the Sprint 0 scaffold, module boundaries, Create Todo change contract, and current evidence ledger.
- Implemented the first domain step: immutable `Todo`, `InvalidTodoTitleException`, title normalization with `strip()`, blank-title rejection, stable UUID retention, and `completed=false` initial state.
- Added focused `TodoTest` coverage for valid creation, normalization, invalid titles, and null identifiers.
- `javac` compilation of domain production classes passed; focused Maven test execution passed with 4 tests and 0 failures after Maven was installed.
- Implemented the application step: `CreateTodoCommand`, `CreateTodoUseCase`, and inward-owned `TodoRepository` port; the use case generates the UUID, creates the domain Todo, and saves through the port.
- Added fake-repository application tests; `mvn -pl todo-application -am test` passed with 6 tests and 0 failures.
- Product code now exists in the domain and application steps; no Create Todo acceptance criterion has fresh end-to-end evidence, so all criteria remain unchecked.
- Resumed the next lesson: the web adapter owns HTTP request/response mapping and delegates to the application use case; it must not call the repository directly.
- Next concrete exercise: implement the POST request DTO, response DTO, and controller wiring for `POST /api/todos`.
- Domain policy recommendation: trim a title at creation, reject it if the trimmed value is empty, and store the trimmed value; cover this normalization in a domain test.
- Environment note: Maven is installed at the user level; open a new terminal for the updated `PATH` to be inherited. The current Codex shell uses the explicit Maven path when needed.

## Handoff

Resume from the 2026-09-08 checkpoint. This file is the one active implementation task. Do not mark criteria complete from code inspection alone; use fresh evidence and human acceptance.

## Recovery

For this slice, recovery is to revert only the Create Todo code/schema changes while preserving the Sprint 0 scaffold and workflow configuration. Database cleanup must be explicit and limited to local/test data; do not use destructive volume removal as an implicit rollback.

## Learning Checkpoint — 2026-09-08 (web adapter lesson resumed)

- Reviewed the existing web adapter scaffold: `ApiMetaController` proves Spring MVC is wired, while no Create Todo endpoint exists yet.
- Reintroduced the next concept: the web adapter translates HTTP request/response shapes and delegates to `CreateTodoUseCase`; it must not call `TodoRepository` directly or place title rules in the controller.
- Assisted practice is pending: design the request DTO, response DTO, and `POST /api/todos` controller method before implementation.
- No new product code or acceptance evidence was added in this lesson step.
- Next concrete lesson step: implement the DTO/controller boundary, then add a focused web-adapter test for valid JSON and delegation.

## Learning Checkpoint — 2026-09-08 (assisted web boundary)

- The learner requested the next step without submitting an independent DTO/controller design.
- Assisted model boundary reviewed: request/response records belong to the web adapter, `CreateTodoCommand` belongs to application, and the controller delegates to `CreateTodoUseCase` while returning `201 Created`.
- Mastery is not inferred from the model answer; independent implementation remains unverified.
- Next lesson: composition-root wiring—how `todo-boot` provides a `CreateTodoUseCase` bean backed by a repository implementation.

## Learning Checkpoint — 2026-09-08 (composition root introduced)

- Reviewed the current `TodoApplication` composition root and confirmed component scanning covers `com.peopleinfo.todo`, but `CreateTodoUseCase` is not yet a Spring bean and the persistence adapter has no implementation.
- Current concept: `todo-boot` owns runtime assembly; it may construct the application use case with a persistence adapter, while the application and domain remain unaware of Spring.
- Context7 documentation was consulted for current Spring Boot constructor-injection guidance; single-constructor beans do not require `@Autowired`.
- No independent demonstration or product implementation was completed in this step.
- Next concrete lesson: compare `@Service`/`@Repository` discovery with explicit `@Bean` composition, then choose the smallest wiring approach for this multi-module architecture.

## Learning Checkpoint — 2026-09-08 (composition-root understanding)

- Independent demonstration: the learner identified `todo-boot` as the startup/configuration location and the correct place for runtime wiring.
- Clarification supplied: this is the composition root; it assembles infrastructure-dependent implementations while `todo-application` remains framework-independent.
- The `@Bean` versus stereotype-annotation choice is not yet independently demonstrated in code.
- Next concrete lesson: implement the persistence adapter behind the application-owned `TodoRepository` port, starting with the adapter contract rather than SQL details.

## Learning Checkpoint — 2026-09-08 (adapter implementation)

- Assisted implementation completed: added `InMemoryTodoRepository` in `todo-adapter-persistence`, implementing the inward-owned `TodoRepository` port with UUID-based storage and lookup.
- Added adapter tests for save/find behavior and null rejection.
- Fixed the module's missing test-scoped `junit-jupiter` dependency.
- Verification: `rtk proxy C:/Users/MT-Staff/.local/apache-maven-3.9.16/bin/mvn.cmd -B -ntp -pl todo-adapter-persistence -am test` passed; domain 4, application 2, persistence 2 tests passed.
- This is assisted implementation evidence, not independent learner mastery. PostgreSQL/MyBatis persistence remains pending.
- Next concrete lesson: replace the temporary in-memory adapter with a MyBatis mapper/entity and PostgreSQL schema while preserving the same application port.

## Learning Checkpoint — 2026-09-08 (PostgreSQL adapter)

- Learning preference: the human said “I dont code just learn”; the assistant implements and explains small steps. Understanding can be discussed without requiring code submissions.
- Assistant implementation: `PostgresTodoRepository`, `TodoRow`, `TodoMapper`, UUID type handling, the V1 Flyway migration, and `TodoConfiguration`. Domain/application sources remain unchanged; the in-memory adapter remains available as an unregistered learning example.
- Outcome for this increment: the existing create use case can save to PostgreSQL through production startup wiring. Acceptance evidence targets stable identifiers, normalized titles, incomplete state, survival across application-context restart, blank-input rejection, and duplicate-key protection.
- Schema ownership: the persistence adapter owns SQL; `todo-boot` owns runtime selection and Flyway dependencies. The tests own disposable database resources and never connect to the Compose database.
- Verification: `rtk proxy C:/Users/MT-Staff/.local/apache-maven-3.9.16/bin/mvn.cmd -B -ntp verify` passed all six reactor modules and packaged the Boot JAR. Twelve tests passed: domain 4, application 2, in-memory adapter 2, and real PostgreSQL integration 4. Restart evidence closes/reopens Boot application contexts against the same database; it is not an HTTP or separate-JVM restart test.
- Regression: `rtk npm run tutor:test` passed all 8 existing tests. The full Maven `verify` command covers the selected test/package gates without redundant rebuilds.
- Scope/selection used verified local HEAD `42e283b4460d61ab26e58ba33bee46a851122d4f`, not a claimed PR base. Initial workflow/docs checks caught the new testing paragraph exceeding its budget; the paragraph was shortened before rechecking.
- Final checks passed: `rtk npm run workflow:check -- --strict-budget --base 42e283b4460d61ab26e58ba33bee46a851122d4f`, `rtk npm exec -- agent-workflow docs`, and staged/unstaged `git diff --check`. `agent-workflow review --base` with that base reported no blocking patterns but skipped Java/POM files; direct review checked mapping, inserts, bean selection, migration behavior, and test cleanup. See [review coverage](../feedback/agent-workflow/0005-review-coverage.md). `rtk npm exec -- agent-workflow prdsync --dry-run` left criteria unchecked and changed no files.
- Cleanup evidence: `rtk docker ps -a --filter label=org.testcontainers=true --format "{{.ID}} {{.Image}} {{.Status}}"` returned no containers after the tests. Only disposable test data was removed by Testcontainers; no Compose database/volume was modified.
- Next lesson: implement `POST /api/todos` request/response mapping and error handling so the browser can call this persisted use case. The previous web and configuration examples were explanations; the HTTP endpoint still needs implementation.

## Learning Checkpoint — 2026-09-08 (Create Todo vertical slice)

- Assistant implementation completed the HTTP and browser boundary: request/response records, `CreateTodoController`, stable `ApiError`, exception mapping, CORS for the local frontend, and a Vanilla JS create form.
- Verification: `rtk proxy node --check frontend/app.js` passed; web MVC tests passed 2/2; full `rtk proxy C:/Users/MT-Staff/.local/apache-maven-3.9.16/bin/mvn.cmd -B -ntp test` passed 14/14 Java tests; `rtk npm run tutor:test` passed 8/8 preserved tutor tests.
- Runtime evidence: Compose PostgreSQL was healthy; the Boot JAR started on port 8080 and Flyway applied V1. `POST /api/todos` with `  runtime test  ` returned a UUID, `runtime test`, and `completed:false`; whitespace input returned HTTP 400 with `INVALID_TODO_TITLE` and no row was created by the integration test.
- Browser evidence: Playwright opened `http://localhost:5173`, submitted `  browser todo  `, and observed “Todo saved.” with normalized title and UUID. Whitespace submission displayed the API message. The valid flow had no console errors; the invalid flow logged the expected HTTP 400 resource failure.
- Workflow evidence: strict workflow check, documentation check, static review, PRD dry-run, and diff checks completed. Static review reported no blocking patterns but skipped Java/POM files; direct review and boundary tests covered those files. PRD criteria remain unchecked because human acceptance is required.
- Next lesson: review the complete request path and decide whether to accept this Create Todo slice before moving to List Todos.

## Learning Checkpoint — 2026-09-08 (List Todos lesson started)

- The learner requested the next lesson after the Create Todo implementation.
- Introduced the next product concept: listing is a read path with its own application query/use case, repository query port, persistence mapping, response DTO, and frontend rendering state.
- Create Todo acceptance remains human-owned and unchecked. List Todos is outside the current Create Todo task contract, so no List Todos product code was added in this lesson step.
- Next concrete lesson: design the read-side contract and create a separate bounded List Todos task only when the human directs the roadmap to that slice.
