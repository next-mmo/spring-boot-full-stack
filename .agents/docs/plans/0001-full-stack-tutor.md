# Full-Stack Tutor Website with Todo as the Sample

> Status: draft
> Created: 2026-09-08

Scope: Deferred Tutor Website design and staged implementation plan. The offline website foundation is implemented; live provider/backend behavior remains unimplemented. The plan is retained for possible future reactivation and is not the current delivery scope.

## Outcome and confirmed scope

A person with no programming experience can start with familiar Todo behavior, learn the necessary concepts, and gradually build and explain a working full-stack application. Experienced developers can skip demonstrated prerequisites and study architecture, testing, and trade-offs more deeply.

Confirmed direction: a tutor website where learners configure an OpenAI-compatible LLM provider. This supersedes the earlier repository-chat-only scope following the user's revised direction on 2026-09-08. Todo remains the sample application. Beginner means someone learning to program, not only someone learning to operate the finished app.

Proposed delivery: a browser-first experience that learners can use without installing the repository. Build and verify locally first; deployment and hosting selection are later implementation decisions. Retain reusable lesson content and the existing repository tutor as an authoring/maintenance aid.

## Website experience

1. Welcome: choose experience, goal, preferred language, and session length. Permit exploration of sample lessons before connecting a model.
2. Connect AI: choose a provider preset or custom endpoint, enter an API key and model ID, then explicitly test the connection. Explain that a model request may incur provider charges and show the destination before sending credentials.
3. Learn: display the lesson/exercise alongside tutor chat, with a Todo preview or code/output view where applicable. On small screens, use accessible tabs instead of three cramped columns.
4. Practice: expose actions such as Explain Simply, Hint, Review My Work, and Show an Example; let the learner edit and inspect outcomes.
5. Resume: restore the lesson, conversation, exercise, and progress. Offer export and reset with clear data scope.

A beginner should not need to understand API terminology to follow the connection walkthrough, but obtaining a provider account/key remains a prerequisite for live AI in the bring-your-own-key version. An operator-funded demo could be considered later; it is not part of this initial plan.

## Provider connection and architecture

The initial compatibility target is text Chat Completions: configurable API base URL, model ID, bearer key, messages, and optionally streaming. The official API defines these request/response fields; third-party compatibility must be tested rather than inferred from a provider label. Support manual model entry even if model listing is unavailable. Use non-streaming mode when a provider does not support streaming, and keep tools, images, and structured-output features optional and outside the first milestone. Sources: [Chat Completions](https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create), [authentication](https://developers.openai.com/api/reference/overview#authentication).

Proposed request path: browser -> tutor HTTP API -> tutoring application service -> LLM provider port -> OpenAI-compatible HTTP adapter. The application service supplies the approved lesson, learner preferences, recent conversation, and relevant exercise evidence; it bounds context length and does not assume access to this repository or a learner's filesystem.

- Keep provider credentials out of chat, prompts, analytics, logs, URLs, and persistent browser storage. A dedicated HTTPS form submits a key to a server-side session; clear the input afterward. The service necessarily handles the key and this must be explained to the learner.
- Initially retain credentials only in a session-scoped secret store with expiry and deletion on disconnect. Persisting keys across sessions requires explicit opt-in and encrypted storage; defer it.
- Route model calls through the backend. For custom URLs, enforce HTTPS and block private, loopback, link-local, metadata, and other non-public destinations, including DNS resolution and redirects. Do not forward keys to a different origin. A hosted server cannot treat its localhost as the learner's local model; local-model support needs a separately designed self-hosted or local-connector mode.
- Apply request size/time limits, concurrency limits, cancellation, and clear authentication/rate-limit/unsupported-model errors. Do not automatically repeat a partially completed generation or silently change providers.
- Sanitize model output before rendering. Model replies and submitted code cannot directly change trusted completion records or execute server commands.

Keep the existing Java/Spring Boot/Vanilla JS baseline for planning; no frontend framework change is implied. Add tutor-owned modules/packages and a distinct tutor UI directory during implementation. Reuse architectural conventions, while leaving Todo modules responsible for the sample product. Final module names and build wiring belong in the implementation design.

## Exercise execution

The first milestone includes authored lessons, live tutor chat, editable browser exercises in a sandboxed preview, and progress. Isolate preview content from provider settings and the main app origin; constrain network access and terminate runaway execution.

Full Java/Maven/PostgreSQL execution is a separate phase. Use isolated disposable learner workspaces, resource/time limits, restricted network access, and dedicated test data. Never execute arbitrary learner code in the tutor backend process or the shared repository. Before that runner exists, label backend exercises as explanation/code review or local practice; an LLM review must not be displayed as a passed executable test. A beginner-complete full-stack course requires this later execution phase or an explicit guided local setup path.

## Baseline assessment before alignment

- The initial instructions explicitly targeted a senior frontend developer and the roadmap began with Maven modules/architecture. Alignment broadens the learner contract; reusable beginner lessons remain to be implemented.
- The tutor already defines small lessons, layer ownership, exercises, reflection, and durable checkpoints. These are useful foundations.
- Todo domain and application implementations exist. The active task records four passing domain tests and two passing application tests. These results are historical evidence; this planning review did not rerun tests.
- The browser contains a Sprint 0 placeholder. The complete Create Todo HTTP/database/browser flow remains unfinished.
- There is no beginner onboarding, prerequisite assessment, reusable lesson catalog, graduated hint system, or separate learner record.
- Task evidence tracks implementation better than understanding. The conversation frequently advances after assistant implementation without observing a learner explanation or independent change.
- The Todo evidence ledger records domain/application progress and unchecked end-to-end criteria. Create Todo is the one active task; Tutor Website foundation/pilot is deferred in `todo-0002-0002-tutor-website-foundation.md`.

## Teaching design

### Entry and adaptation

Ask about the learner's goal, experience, preferred explanation language, available session time, and working environment. Offer a short practical placement exercise with an option to skip it. Treat experience as a starting hypothesis; record skill by concept rather than assigning a permanent beginner/expert label.

| Entry path | Starting experience | First learning activity |
| :--- | :--- | :--- |
| Beginner | No programming assumed | Observe a Todo interaction, explain input/output, locate and edit a small piece of text |
| Some coding experience | Basic variables/functions | Trace a click through browser code and a request/response example |
| Experienced developer | Existing development workflow | Trace application/domain/adapter ownership and test the boundary |

Support explicit learning preferences: guided practice, pair programming, and demonstration. In guided practice, reveal hints before the solution. Honor an explicit request to implement; record assistant help rather than treating generated code as independent learner work.

### Lesson loop

1. State one observable outcome using familiar language.
2. Check only the prerequisites needed for that outcome.
3. Explain one concept with an example; define a new technical term when it first appears.
4. Ask the learner to predict a result or make a small change.
5. Observe the result and provide feedback. If stuck, offer a clue, then a partial example, then a worked solution.
6. Ask for a short explanation or a similar change to check transfer.
7. Save observed progress and the next concrete activity.

When a learner says "not sure," use a concrete comparison and guided reasoning. Avoid immediately assigning a larger implementation task. Tool/setup failures become a separate recovery activity and do not count against concept understanding.

Example: for blank titles, a beginner predicts what should happen when spaces are submitted, then changes a tiny validation rule. An experienced developer discusses why the invariant belongs in the domain and proves that invalid input never reaches the repository.

### Curriculum

Use a shared lesson catalog with prerequisites and optional depth:

1. Orientation: files, editor, terminal, running versus editing, and expected output.
2. Browser foundations: HTML, CSS, JavaScript values/functions/events; a visible Todo interaction.
3. Web foundations: browser/server roles, requests, responses, JSON, and where state lives.
4. Java essentials: types, methods, classes, exceptions, interfaces, and tests through small Todo examples.
5. Create Todo end to end: domain rule, use case, repository port, HTTP mapping, persistence, and UI feedback.
6. Todo lifecycle: list, complete/reopen, edit/delete, validation, and error states.
7. Reliability and delivery: transactions, concurrency, configuration, logging, packaging, CI, and deployment concepts.

Introduce Clean Architecture names after their responsibilities are tangible for beginners. Keep the existing inward dependency rule and stack. Advanced learners can use the current roadmap and skip prerequisites they demonstrate.

## Content and state ownership

Keep the tutor independent of the sample's production layers. Tutor lessons and progress should not become fields or logic inside `todo-domain` or `todo-application`.

Proposed additions, to be created during implementation:

- `learning/teaching.md`: canonical lesson pacing, adaptation, feedback, and hint rules shared by the website tutor and repository authoring skill.
- `learning/curriculum.json`: stable lesson IDs, prerequisite IDs, sample project, and optional depth.
- `learning/lessons/`: small lessons with outcome, prerequisites, starting state, explanation, exercise, expected behavior, hints, solution, and transfer question.
- `learning/glossary.md`: plain-language definitions linked from lessons.
- Website learner state: profile, lesson/version, conversation, submissions, assistance, and progress. For the pilot, use an isolated guest session and browser-local non-secret progress with export/import; explain that clearing browser data can remove progress. Authenticated cross-device persistence is a subsequent phase. API keys are excluded from browser persistence and exports.

Each progress entry records lesson ID/version, concept, assistance received, learner explanation or change, test evidence if applicable, last activity, and next exercise. Use states such as introduced, practiced with help, demonstrated independently, and needs review. A passing test alone cannot award independent understanding.

Keep development evidence and human acceptance in workflow tasks; website learner progress belongs to individual learning sessions. A learner may master a concept while the end-to-end product is incomplete, and the product may pass while the learner still needs practice.

Preserve this learner's current domain/application checkpoint. Offer beginners a separate exercise location or isolated checkout with a declared starting state. Never rewind the user's current working tree to manufacture a lesson baseline. Treat reference solutions as available teaching material, not evidence of learner mastery.

## Implementation sequence

1. **Website specification and foundation:** define tutor requirements separately from Todo requirements; create the learner journey and responsive screen design, lesson/state formats, and application/adapter ownership. Preserve the current checkpoint and uncommitted work. Sequence implementation tasks explicitly while keeping one active task.
2. **Working website pilot:** implement onboarding, provider configuration/test, live chat, two authored lessons, one isolated browser exercise, and guest progress/resume/export. Validate the real provider path with an explicitly configured test key; mock results alone cannot prove interoperability.
3. **Backend practice and Todo milestone:** build isolated Java/database execution or deliver a clearly scoped guided local setup path, then complete Create Todo through HTTP, database, and frontend lessons. Verify behavior using actual test/runtime evidence.
4. **Broader learning product:** add remaining curriculum, authenticated cross-device progress if needed, optional encrypted saved credentials, and public-hosting readiness checks. Deployment remains a separate action.

The first implementation increment is phases 1 and 2: a learner can open the website, connect a provider, complete a pilot exercise with tutoring, and resume progress. This is a working learning pilot, not yet the complete executable full-stack curriculum.

## Verification and acceptance

- Provider scenario: a configured OpenAI-compatible endpoint accepts a real text request and returns a rendered response; tested providers and optional capabilities are recorded explicitly. Test invalid key, unavailable model, rate limiting, timeout, cancellation, and non-streaming support.
- Credential scenario: keys are absent from logs, prompts, persistent browser storage, exports, and other sessions. Expiry/disconnect removes server-held credentials. Custom URL tests reject private destinations and cross-origin redirects.
- Browser scenario: onboarding, lesson, chat, exercise, and resume work through visible UI, including keyboard and narrow-screen use. Exercise/model content cannot access credentials or the host app context.

- Beginner scenario: a learner with no assumed terminal/API knowledge can follow orientation, make the pilot change, and explain its visible effect. Validate with a real novice; agent role-play is preliminary evidence only.
- Developer scenario: an experienced learner demonstrates prerequisites and reaches the domain/application boundary without repeating elementary lessons.
- Stuck scenario: "not sure" produces a smaller example and graduated help; progress records the assistance honestly.
- Demonstration scenario: an explicit implementation request is fulfilled, and generated code is not recorded as learner mastery.
- Resume scenario: reopening the tutor restores the exact next exercise and preserves both learner and product state.
- Failure scenario: a missing tool or failing build produces targeted recovery guidance without awarding completion.
- Content checks: lesson IDs are unique, prerequisites resolve without cycles, referenced files exist, starting states are reproducible, and exercise checks match the stated behavior.
- Regression checks: domain/application tests still pass after instructional changes; the full Todo acceptance criteria require separate runtime evidence.

The draft does not establish product acceptance. The authorized alignment updates scheduling and repository tutor guidance while preserving Todo product code and learner evidence. Canonical requirements are [PRD-0002](../prd/0002-full-stack-tutor.md); implemented verification belongs in the active task.
