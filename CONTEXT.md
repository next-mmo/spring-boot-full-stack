# Project Context

## Product

A Todo application used to learn real full-stack development with Spring Boot and Vanilla JavaScript.

## Learner

The learner is already a senior front-end developer. Explanations should connect backend concepts to familiar front-end concepts without oversimplifying them.

Examples:

- Spring REST controller ~= HTTP adapter / server-side boundary, not the business layer.
- Application use case ~= an application service orchestrating a feature, similar to a feature-level command handler.
- Port/interface ~= an inward-owned contract that adapters implement.
- Domain entity/value object ~= business state and invariants independent of transport/storage.
- Dependency injection ~= runtime composition of implementations behind contracts.
- Transaction boundary ~= atomic state-change boundary, not merely a database helper.

## Technical baseline

- Java 21
- Spring Boot 4.1.1
- Maven multi-module
- Clean Architecture
- MyBatis-Plus 3.5.17
- PostgreSQL as the first database
- MySQL as a later portability exercise
- Vanilla JavaScript frontend

## Learning strategy

Build vertical slices in this order:

1. Repository/workflow/bootstrap
2. Create Todo
3. List Todos
4. Complete and reopen Todo
5. Edit and delete Todo
6. Validation and error contracts
7. Filtering, pagination, and sorting
8. Transactions and concurrency
9. PostgreSQL/MySQL portability
10. Testing, observability, packaging, and production-readiness review
