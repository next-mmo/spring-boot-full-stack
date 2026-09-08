# PRD-0002: Full-Stack Tutor Website

> Status: draft
> Created: 2026-09-08
> Updated: 2026-09-08
> Related Task: `.agents/docs/tasks/todo-0002-0002-tutor-website-foundation.md`

## Problem and outcome

The repository's teaching flow assumes an experienced developer and requires local tooling. The product will provide a website where beginners and experienced developers learn through guided Todo exercises, use a configurable OpenAI-compatible LLM, and resume their progress.

The human selected the website/provider direction and requested documentation/workflow alignment on 2026-09-08. An offline foundation now provides onboarding, authored lesson content, guided local practice, an isolated browser preview, and browser-local progress. Detailed requirements are a draft; this partial implementation does not imply accepted criteria, live provider compatibility, paid provider calls, or deployment.

## Pilot requirements

1. Learners choose experience, goal, language, and session length. Familiarity is assessed per concept; experienced learners can skip demonstrated prerequisites.
2. Learners can explore authored lesson content before connecting a model. Live tutoring requires a provider base URL, model ID, and key through a dedicated form with destination/usage disclosure and an explicit connection test.
3. The first provider contract covers text Chat Completions, optional streaming, and manual model entry. Compatibility is claimed only for tested endpoints/capabilities. Invalid key, unsupported model, timeout, rate limit, and cancellation produce actionable states without losing the exercise.
4. Tutor chat uses the selected lesson, recent conversation, learner preferences, and submitted exercise evidence. Guidance offers small explanations, graduated hints, examples, and feedback; it distinguishes assisted practice from independent understanding.
5. The pilot contains orientation and Todo title-validation lessons, plus at least one editable, isolated browser exercise with observable output. Java/database execution is deferred and must not be claimed by model review.
6. Guest progress, conversation, and exercise state resume in the same browser and support export/import/reset. Explain local-storage loss and lack of cross-device sync. Validate imports and never export credentials.
7. Learner sessions are isolated. Provider secrets stay outside prompts, logs, URLs, analytics, and persistent browser storage; server-held keys expire and are removed on disconnect. Custom destinations receive backend network restrictions. See [architecture](../architecture.md).
8. The UI supports keyboard use and narrow screens. Rendered model/lesson content and exercise previews must not gain the tutor application's privileges.
9. Completion records distinguish introduced concepts, assisted practice, learner demonstrations, and executed checks. Model assertions alone cannot mark executable tests passed or award independent mastery.

## Acceptance criteria

- [ ] A beginner follows onboarding and completes the pilot exercise with understandable guidance; a real novice evaluates usability.
- [ ] An experienced learner can skip demonstrated prerequisites and receive appropriate technical depth.
- [ ] A user-configured compatible provider completes a real text tutoring request; supported capabilities and authorized test evidence are recorded.
- [ ] Invalid credentials/model, rate limit, timeout, and cancellation leave recoverable UI and preserved exercise state.
- [ ] Provider credentials and learner sessions are isolated; expiry, disconnect, redaction, and destination restrictions pass boundary tests.
- [ ] Two versioned lessons and an isolated browser exercise produce observable learning activities and output.
- [ ] Same-browser resume, export/import, and scoped reset preserve expected progress and exclude credentials.
- [ ] Keyboard/narrow-screen flows work; untrusted content cannot access host state or execute server commands.
- [ ] Tutor evidence accurately distinguishes model feedback, learner performance, and executed checks.
- [ ] Existing Todo behavior is preserved; relevant builds/tests and workflow checks pass, and unimplemented/deferred capabilities remain explicit.

## Ownership and non-goals

Tutor website requirements are independent of [Todo Core](0001-todo-core.md). Keep sample code and current learning progress intact. Initial implementation uses the existing Java/Spring Boot/Vanilla JavaScript baseline and inward dependency rule.

The pilot excludes arbitrary server-side learner-code execution, Java/database sandboxes, accounts/cross-device synchronization, persistent saved API keys, provider-funded usage, all-provider compatibility, local-model connectors, and public deployment. These require later scoped increments.

## Planning and authority

The [technical plan](../plans/0001-full-stack-tutor.md) describes proposed design and sequencing. The active task owns implementation evidence. Human acceptance remains authoritative; a passing workflow check is not proof of teaching quality, interoperability, or product completion.
