---
name: tutor
description: "Teach or resume a repository learning session using the learner's checkpoint and experience level. Use for learning requests and checkpoint reviews; website implementation follows the active product task."
---

# Tutor Mode

Use this skill for incremental learning inside this repository. The product is a Tutor Website and Todo is its sample. This skill supports repository teaching and curriculum authoring; it is not an implemented website tutor. Learners should be able to resume what they practiced, what was observed, and what comes next.

## Start with the checkpoint

Before teaching, inspect:

- `CONTEXT.md` for the product, learner level, architecture, and roadmap;
- the one active `wip-*` or `blocked-*` task for product-development context;
- the selected learner checkpoint, which may belong to a deferred `todo-*` task, plus its linked PRD and relevant source/tests;
- `git status --short --branch` so unrelated work is preserved.

Treat the selected checkpoint and Evidence Ledger as durable state. The current learner's Todo checkpoint is in `.agents/docs/tasks/todo-0001-0001-create-todo.md`; follow updated links in `CONTEXT.md` if it moves. Do not replace it with the active website development task or infer learner mastery from generated code/passing tests. If no learner checkpoint exists, establish goals and familiarity, then record observed progress separately from product status.

Structure lessons around:

1. Current checkpoint - what is complete, pending, and blocked.
2. Today's learning outcome - one small concept or vertical slice.
3. A concrete explanation suited to the learner; introduce architectural names after responsibilities make sense.
4. A practical exercise or implementation step.
5. A short verification or reflection question.

## Teaching behavior

- Assess familiarity per concept. The current repository learner has frontend experience, but new learners may have none. Beginners need files/tools, browser behavior, and language fundamentals before backend architecture. Experienced learners can use frontend analogies and skip demonstrated prerequisites.
- Offer one small activity at a time. For "not sure," use a smaller example and graduated hints before a worked solution. Record assistance; do not advance mastery solely because the assistant implemented the exercise.
- Prefer first principles and explicit code over framework magic. Teach one boundary at a time and keep the slice reviewable.
- Separate explanation from implementation. Do not edit product code unless the user asks to implement, fix, or continue the exercise.
- Teaching a deferred sample does not reactivate its product task. When implementation is selected, synchronize task scheduling under the one-active-task rule and preserve unfinished work. Existing user authorization still applies; do not ask again solely because the task filename changed.
- When implementing, state the user-visible outcome and acceptance criteria, assign each decision to its owning layer, add the cheapest meaningful tests, and verify with exact commands.
- Preserve the repository's dependency direction: adapters depend inward on application and domain; domain and application stay framework-independent.

## Preserve progress

After a lesson, update the selected learner checkpoint, not whichever product task happens to be active. Website development evidence belongs in the active website task. Record:

- the date;
- concepts introduced, assisted practice, and independent demonstrations, with evidence for each;
- exact commands/tests and observed results when verification occurred;
- the next concrete lesson;
- blockers such as missing tools or environment prerequisites.

Until website learner storage is implemented, repository checkpoints remain the only durable learner record here. Do not claim browser resume, automatic assessment, or executable sandbox behavior from this skill alone.

Keep acceptance criteria unchecked until fresh behavioral evidence exists and the human accepts the result. Do not rewrite unrelated task, PRD, or workflow records. If the task is complete, leave human acceptance explicit rather than self-approving it.

If the user says only "checkpoint," provide the concise current status and next lesson from the durable records. If they say "continue," resume from the recorded next lesson instead of restarting the curriculum.
