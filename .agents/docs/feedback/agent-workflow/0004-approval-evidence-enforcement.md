# 0004: Structural Checks Are Not Approval Enforcement

Date: 2026-09-08. Package: `@next-mmo/agent-workflow-scrum`; repository pin and lock resolution: `8ebb2b220b624693a4b3c769c34aa873d2e79462`.

## Evidence and reproduction

Inspect installed `packages/agent-workflow-scrum/engine/workflow-check-core.mjs` under the dependency:

- Lines 188-199 require acceptance/recovery headings and non-empty evidence; completed-task evidence is rejected when it contains the word `pending`.
- Lines 283-285 require a non-pending proposal decision string, not authenticated reviewer identity or approval bound to a revision.
- Lines 217-225 accept a ceremony-mode override. A repository-local setting alone is not an organization policy boundary.

A read-only probe extracted the exact `validateProductSynchronization` function into a VM with mocked file reads. The strict-mode completed-task fixture contained an unchecked human-acceptance criterion, recovery heading, valid PRD linkage, and this ledger:

```text
Tests failed. Human acceptance not recorded.
```

Observed: zero synchronization errors. Negative control replacing the ledger with `pending`: one error, `completed product task evidence cannot remain pending`.

This isolates the synchronization validator; it is not a claim that a complete repository fixture passed every CLI check or that any protected merge was bypassed.

## Interpretation and response

Expected for an enterprise completion gate: required criteria map to successful evidence and authorized approval for the actual revision. Existing prose correctly reserves acceptance for humans. The implementation is a structural consistency check, not that gate; free-text evidence should not be trusted as an attestation.

Keep this command advisory to completion. Recommend protected CI/merge/release controls, reviewer identity and role, exact revision and artifact digest, result/time/environment, and explicit overrides with reasons. Policy changes need a separately protected approval path; agents must not approve their own changes.

Upstream acceptance scenarios: failed, stale, missing, or wrong-revision required evidence cannot satisfy completion; an agent-authored approval string is insufficient; changing local mode cannot disable organization-required checks. Preserve lightweight guided mode rather than forcing enterprise infrastructure on learners. No forge configuration was inspected or changed. Upstream status: not submitted.
