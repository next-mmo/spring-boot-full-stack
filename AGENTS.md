# Agent Instructions

## Purpose

- Product: a full-stack Todo application using Java/Spring Boot, PostgreSQL, and a Vanilla JavaScript client.
- The tutor website direction is deferred. Preserve its existing files and evidence, but do not expand tutor UI, provider, or lesson scope unless the human explicitly reactivates it.
- Read `CONTEXT.md`, the PRD index, and the one active task for current scope.

## Architecture rules

- `todo-domain` is plain Java. It must not depend on Spring, MyBatis, JDBC, HTTP, JSON, or database concepts.
- `todo-application` owns use cases and ports. It may depend on `todo-domain`, but not on adapters or Spring.
- `todo-adapter-persistence` implements output ports using MyBatis-Plus and database-specific concerns.
- `todo-adapter-web` implements HTTP input adapters and maps HTTP DTOs to application inputs/outputs.
- `todo-boot` is the composition root. Spring configuration and runtime wiring belong here or in adapter configuration.
- `frontend` is Vanilla JavaScript. Do not introduce a JS framework unless the human explicitly changes the learning goal.
- Dependencies point inward: adapters -> application -> domain.
- Deferred tutor paths: `tutor-*` modules, `tutor-frontend`, and `learning/`. Keep their credentials, sessions, progress, and content out of Todo modules.

## Development and teaching modes

- Todo development follows the active Todo task. Do not treat the preserved tutor checkpoint or UI as active product scope.
- Assess learner familiarity rather than assuming a senior developer. Define unfamiliar terms and offer smaller examples when the learner is unsure.
- Keep assisted practice, independent understanding, executable evidence, and human product acceptance distinct.

For every product slice:

1. State the user-visible outcome and acceptance criteria.
2. Explain which layer owns each decision and why.
3. Implement the smallest reviewable vertical slice.
4. Add meaningful tests at the cheapest layer that proves the behavior.
5. Verify build/runtime behavior with exact commands and record evidence.
6. Explain trade-offs at the learner's demonstrated level when teaching.

Prefer explicit code over magic while teaching.

## Workflow

- Follow `AGENT-QUICKSTART.md`, `CONTEXT.md`, `.agents/config.json`, the active task, and `.agents/docs/testing.md`. Human acceptance remains authoritative.
- Use Maven for backend builds and npm for workflow tooling. Prefix shell commands with `rtk`.
- On direction changes, workflow gaps, or user corrections, proactively use `.agents/skills/agent-workflow-feedback/SKILL.md`; consult saved cases and capture new evidence without waiting for a reminder. Align authorized changes while preserving unfinished work.
