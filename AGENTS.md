# Agent Instructions

## Purpose

This repository is a teaching project for a senior front-end developer learning production-oriented Spring Boot full-stack development.

## Architecture rules

- `todo-domain` is plain Java. It must not depend on Spring, MyBatis, JDBC, HTTP, JSON, or database concepts.
- `todo-application` owns use cases and ports. It may depend on `todo-domain`, but not on adapters or Spring.
- `todo-adapter-persistence` implements output ports using MyBatis-Plus and database-specific concerns.
- `todo-adapter-web` implements HTTP input adapters and maps HTTP DTOs to application inputs/outputs.
- `todo-boot` is the composition root. Spring configuration and runtime wiring belong here or in adapter configuration.
- `frontend` is Vanilla JavaScript. Do not introduce a JS framework unless the human explicitly changes the learning goal.
- Dependencies point inward: adapters -> application -> domain.

## Teaching rules

For every product slice:

1. State the user-visible outcome and acceptance criteria.
2. Explain which layer owns each decision and why.
3. Implement the smallest reviewable vertical slice.
4. Add meaningful tests at the cheapest layer that proves the behavior.
5. Verify build/runtime behavior with exact commands and record evidence.
6. Explain trade-offs in language useful to a senior front-end engineer.

Prefer explicit code over magic. Do not hide important backend concepts behind generators until the learner has implemented the concept manually at least once.

## Workflow

After Agent Workflow Scrum is installed and initialized, follow `AGENT-QUICKSTART.md`, `CONTEXT.md`, `.agents/config.json`, and the one active task. Human acceptance remains authoritative.
