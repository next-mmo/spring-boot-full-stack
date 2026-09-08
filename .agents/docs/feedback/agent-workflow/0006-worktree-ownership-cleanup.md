# 0006: Worktree Isolation Needs Ownership and Safe Cleanup

Date: 2026-09-08. Package: `@next-mmo/agent-workflow-scrum`; repository pin and lock resolution: `8ebb2b220b624693a4b3c769c34aa873d2e79462`.

## Evidence

Installed `packages/agent-workflow-scrum/engine/worktree-core.mjs` provides useful Git worktree list/create/remove helpers. The list exposes path, branch, and HEAD; create/remove do not maintain task claims, agent ownership, or leases. `workflow-check-core.mjs:236` restricts active tasks in the inspected checkout, not across independent checkouts.

Cleanup deserves a separate safety guard: `worktree-core.mjs:83-91` only trims/checks a non-empty branch string, joins it beneath `.worktrees`, then passes the result to Git removal, optionally forced. It does not first verify path containment or expected worktree ownership. A pure path calculation with `../../enterprise-review-synthetic` resolves outside `.worktrees`. No Git removal or traversal attempt was executed. Git may reject nonexistent/unregistered targets; the concern is a target that actually is another registered worktree.

## Attribution and impact

The missing containment check is source-confirmed; actual deletion impact is untested. Cross-agent task claims are an enterprise enhancement, not proof that normal Git worktree isolation fails. Two agents can independently choose the same task, and a malformed cleanup target could address the wrong registered workspace.

## Response and upstream acceptance

Do not automate cleanup using unverified branch input. Resolve exact paths, validate branch names and containment (including junction/symlink resolution), match Git registration and expected ownership, reject the main checkout, and preserve dirty work unless explicitly authorized.

For parallel work, propose atomic task claims with owner/run/branch/base, bounded leases, explicit abandoned-work recovery, and integration checks against the latest base. Keep this optional for single-agent repositories.

Tests: traversal, sibling registered worktree, wrong owner, dirty checkout, and concurrent claims are rejected safely; valid nested branch names work; crashed agents can be recovered without deleting unfinished work. No worktrees created, moved, or removed. Upstream status: not submitted.
