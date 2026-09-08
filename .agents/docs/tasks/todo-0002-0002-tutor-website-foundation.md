# Task 0002: Tutor Website Foundation and Pilot

> Status: todo
> Created: 2026-09-08
> Related PRD: `.agents/docs/prd/0002-full-stack-tutor.md`

## Change Contract

- Scheduling: deferred on 2026-09-08 when the human redirected the project to full-stack Todo work. Preserve the offline foundation, evidence, and resume point; this task is unfinished, not accepted, and not blocked by an environment failure.

- Human outcome: a learner opens a tutor website, configures a compatible provider, follows a pilot lesson/exercise, and resumes progress.
- Authorization: the human chose the website/provider direction, requested alignment, and then asked to continue the plan through a few implementation rounds. This increment implements the offline tutor foundation only. No deployment, key collection, paid requests, or live provider call is authorized by this increment.
- Scope: align product/learner instructions, preserve Todo requirements/checkpoint, reserve tutor/content paths, define verification gates, specify the website foundation/pilot, capture reusable workflow feedback, and implement the first offline learner vertical slice. The user clarified that feedback/reuse guidance is not a delivery skill.
- Next implementation scope: provider form/test, server session boundary, text Chat Completions adapter, and live-compatible backend path, per PRD-0002.
- Non-goals: changes to Todo behavior, accounts, saved credentials, hosted Java/database execution, public deployment, and a frontend framework migration.
- Owners: tutor modules own tutor behavior; Todo modules own sample behavior; `learning/` owns future curriculum; `.agents/docs/` owns workflow records.
- Risk: documentation drift and loss of unfinished work during transition; later credential handling, custom outbound URLs, untrusted content, and session isolation need boundary tests before release.
- Baseline: Todo domain/application code and six historical passing tests exist in a dirty working tree. Before this increment, tutor website code was absent; current CI workflows remain absent. Full runtime/provider acceptance remains pending.
- Verification: workflow scope/selection against verified current HEAD for this local working-tree review, consistency check, review, PRD reconciliation, link/path checks, skill validation, tutor state/content tests, focused Todo regression tests, and visible browser checks. Future provider/session gates live in `testing.md`; mock/offline behavior does not prove compatibility.
- Recovery: reverse only alignment edits and restore the prior active-task scheduling if requested; preserve product code and the Todo checkpoint. Do not reset the working tree or delete learner data.

## Acceptance Criteria

- [ ] Governing documents consistently identify the tutor website as the product and Todo as the sample, with learner/developer modes distinguished.
- [ ] Todo requirements, code, and learning evidence are preserved; one tutor task is active and Create Todo is deferred, incomplete, and resumable.
- [ ] Tutor and lesson paths are classified, applicable checks are documented, and alignment verification has recorded evidence.
- [ ] The pilot implements PRD-0002 onboarding, provider/text chat, two lessons, browser exercise, and guest progress flows.
- [ ] Provider/session/content boundaries and real browser behavior have fresh evidence; unsupported and deferred capabilities remain explicit.
- [ ] The human accepts the milestone after reviewing the evidence.

## Evidence Ledger

Documentation alignment and the feedback skill are implemented and verified. No pilot behavior or human acceptance is claimed. The mistakenly created delivery skill files were removed and replaced with `agent-workflow-feedback`; existing Todo code was preserved.

| Claim | Evidence | Result |
| :--- | :--- | :--- |
| Baseline product state | Deferred Create Todo task and existing source/tests | Domain/application implemented; end-to-end sample pending |
| Local review base | `rtk git rev-parse --verify HEAD` | `42e283b4460d61ab26e58ba33bee46a851122d4f`; used only for local working-tree scope, not a claimed PR base |
| Alignment checks | `rtk npm run workflow:check -- --strict-budget --base 42e283b4460d61ab26e58ba33bee46a851122d4f`; `rtk npm exec -- agent-workflow docs`; `rtk git diff --check` | Passed; budgets and document checks pass |
| Scope and review | `rtk npm exec -- agent-workflow scope --base 42e283b4460d61ab26e58ba33bee46a851122d4f`; same base with `verify` and `review`; `rtk npm exec -- agent-workflow prdsync --dry-run` | Completed; review found no blocking patterns but skipped Java/POM content, so it is not semantic code acceptance; PRDs remain unchecked |
| Skill validation | `rtk proxy python C:/Users/MT-Staff/.codex/skills/.system/skill-creator/scripts/quick_validate.py .agents/skills/agent-workflow-feedback`; same validator for `.agents/skills/tutor` | Both valid; structural validation does not prove future agent behavior |
| Task routing | Task inventory and search for old active-task/delivery-skill references | Tutor task deferred; Create Todo is active; current task inventory is aligned |
| Regression/build | `rtk proxy C:/Users/MT-Staff/.local/apache-maven-3.9.16/bin/mvn.cmd -B -ntp verify` | All six reactor projects succeeded; six tests passed; includes packaging, with no API/database/browser runtime verification |
| Reusable workflow feedback | [Direction-change case](../feedback/agent-workflow/0001-project-direction-alignment.md) and AGENTS.md skill routing | Local capture/reuse implemented; upstream proposal not submitted |
| Enterprise workflow review | [2026-09-08 review and linked cases](../feedback/agent-workflow/enterprise-review-2026-09-08.md); report/doctor runs, static-review and mocked-validator/provider probes | Seven additional local cases; earlier overview case updated; bugs and proposals distinguished; no dependency changes or upstream submission |
| Offline tutor foundation | `learning/curriculum.json`, two versioned lesson JSON files, `tutor-frontend/`, and `tutor-frontend/state.test.mjs` | Implemented onboarding, two lessons, guided local practice, scripted tutor, browser-local state, and isolated preview; live provider/backend remains pending |
| Deterministic tutor checks | `rtk npm run tutor:test`; `rtk proxy node --check tutor-frontend/app.js`; `rtk proxy node --check tutor-frontend/state.js`; `rtk git diff --check` | Eight tests passed; syntax and diff checks passed |
| Visible tutor flow | Local `python -m http.server 4173` plus Playwright CLI against `/tutor-frontend/` | Onboarding, both lessons, hint, invalid/valid title exercise, reload resume, hostile HTML escaping, 375px snapshot, and zero console errors observed; no provider request occurred |
| Vite development workflow | `rtk npm install --save-dev vite`; `rtk npm run build`; `rtk npm run tutor:test`; visible browser check at `http://localhost:5173/tutor-frontend/` | Vite build passed, all 8 tutor tests passed, first lesson loaded, and zero console errors observed |
| Status reconciliation | README, CONTEXT, architecture, development, plan, PRD, and PRD index updated | Offline foundation is now reported as implemented; backend/provider and full acceptance remain explicit |
| Final regression and workflow gates | `rtk proxy C:/Users/MT-Staff/.local/apache-maven-3.9.16/bin/mvn.cmd -B -ntp test`; `rtk npm run workflow:check -- --strict-budget`; `rtk npm exec -- agent-workflow docs`; `rtk npm exec -- agent-workflow prdsync --dry-run` | Six Maven tests passed; workflow/docs passed; PRD dry-run found all criteria unverified and changed no files |
| Website pilot behavior | No website implementation yet | Pending |

## Learning and Handoff

This is a product-development task, not evidence of any learner's mastery. The current repository learner resumes from [Create Todo](wip-0001-0001-create-todo.md), checkpoint dated 2026-09-08. Its next lesson is HTTP request/response DTO mapping. Teaching or reviewing that checkpoint does not automatically reactivate its implementation task.

Resume point if explicitly reactivated: design and implement the provider/session contracts and backend adapter, including safe custom destination handling and explicit live smoke authorization. Keep all acceptance criteria unchecked until boundary evidence and human acceptance support them.
