# Enterprise AI + Agent Scrum Workflow Review

Date: 2026-09-08. Scope: this consumer repository and its installed workflow source, pinned/locked at `8ebb2b220b624693a4b3c769c34aa873d2e79462`. This is a local engineering review, not certification, a company-wide deployment audit, or an assessment of a newer upstream release.

## Assessment

The workflow is a useful repository-level coordination foundation: bounded context, scoped tasks/PRDs, explicit bases, evidence ledgers, human authority, optional-provider boundaries, and Git worktree isolation. It is not by itself an enforceable company control system. A reasonable next stage is a supervised pilot after correcting misleading diagnostics and establishing the company's required controls outside agent-editable prose.

Observed strengths: PRD sync remains advisory and does not mark requirements accepted; review output discloses unsupported files; remote-capable recall is explicit-only; strict mode adds recovery/context-budget checks. Preserve these rather than replacing the workflow wholesale.

## Prioritized feedback

Priorities below are recommendations, not approved backlog or policy changes.

| Priority | Company need | Evidence / next action |
| :--- | :--- | :--- |
| High before automated cleanup | Exact workspace ownership and containment | [0006](0006-worktree-ownership-cleanup.md): target path can escape `.worktrees`; do not enable unchecked cleanup |
| High before completion/merge automation | Human identity and revision-bound approval/evidence | [0004](0004-approval-evidence-enforcement.md): structural evidence check accepts failed-result prose; use independently enforced gates |
| High before security-gate use | Coverage-aware review outcomes | [0005](0005-review-coverage.md): Java/POM-only scan returns success with zero files inspected |
| High before management reliance | Trustworthy project reporting | [0003](0003-report-integrity.md): actual report shows zero PRDs and two active tasks; fix canonical parsing/discovery |
| Before confidential-data use | Approved provider and artifact-sharing policies | [0007](0007-enterprise-data-boundaries.md): opt-in query passes unchanged; no breach observed |
| Before broad installation | Clear artifact/version identity and local extension ownership | [0008](0008-distribution-identity.md), [0009](0009-project-owned-skills.md): root package identity mismatch and false vendoring warning |
| Next usability increment | Feature/outcome overview and change alignment | [0001](0001-project-direction-alignment.md), [0002](0002-human-project-overview.md): retain human-readable status, evidence, deferred scope, and next milestone |

## Company operating model to evaluate

Use the repository workflow for requirements, task contracts, evidence links, and bounded agent handoffs. Use independent platform controls for access, protected checks/reviews, secrets, production approvals, and audit retention. Agents may propose and execute authorized work, but cannot mint their own approval.

A multi-team pilot should exercise duplicate task claims, conflicting changes, stale bases, agent interruption/recovery, failed evidence, malicious retrieved instructions, and a human rejecting an increment. Success means these situations remain visible and recoverable, not simply that a happy-path check is green.

Additional discovery questions, not established package defects: who is accountable for each feature; how dependencies span repositories; where sprint/release scope is accepted; how overrides and emergency changes are recorded; what data may leave the company; and how agent cost, rework, lead time, and human review effort are measured. Avoid checkbox completion percentages and model/token usage as proxies for delivered value.

## Verification and limits

- Inspected installed report, consistency validator, worktree, static review, provider, archive, PRD-sync, doctor, and package metadata code, plus repository authority/task records.
- Generated the existing report to a fresh OS temporary directory; inspected JSON. No public export or browser usability test.
- Invoked static review on actual Java/POM paths: zero reviewed, two skipped, `ok: true`.
- Ran VM probes against extracted source with mocked file reads/subprocess dispatch: failed evidence accepted by the synchronization function; `pending` negative control rejected; synthetic query forwarded unchanged. These are narrow probes, not complete CLI integration tests.
- Calculated a worktree traversal target without creating/removing worktrees. Ran doctor and captured its local-skill warning.
- Documentation checks, `workflow:check -- --strict-budget` in the configured guided mode, and `git diff --check` passed after feedback capture. These validate document/workflow structure, not the proposed enterprise controls.
- Temporary diagnostic artifacts are local and disposable; durable observations and reproduction conditions are in the linked cases. No real credentials or remote-provider calls were used.

No product code, dependency, organization policy, CI configuration, or upstream issue was changed. Existing dirty work was preserved. Hosted branch protections, real authorization, signed artifacts, disaster recovery, model costs, and multi-agent runtime races remain unverified. This repository currently has no `.github` directory; remote organization controls were not inspected.

Feedback is stored locally using the project feedback skill. All upstream statuses remain **not submitted**. A proposal here is neither approval to implement an enterprise platform nor a claim that the Tutor Website is delivered.
