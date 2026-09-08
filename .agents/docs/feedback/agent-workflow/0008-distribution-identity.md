# 0008: Consumer Installation Has Conflicting Package Identities

Date: 2026-09-08. Package requested: `@next-mmo/agent-workflow-scrum`; repository pin and lock resolution: `8ebb2b220b624693a4b3c769c34aa873d2e79462`.

## Evidence and reproduction

Inspect `package.json:13`, `package-lock.json:14-22`, and the installed package manifests:

- The consumer requests the named workflow dependency from a pinned Git repository revision.
- The lock entry and `node_modules/@next-mmo/agent-workflow-scrum/package.json` identify the installed repository root as `counter-app`, version `1.0.0`.
- The nested `packages/agent-workflow-scrum/package.json` identifies the actual workflow package as `@next-mmo/agent-workflow-scrum`, version `0.1.0`.
- The installed binary points into that nested package and currently works.

Expected for company inventory: dependency name, installed artifact identity, engine version, and source revision are unambiguous.

## Attribution and response

This is a source-root Git-install packaging mismatch in this consumer, not a demonstrated vulnerability, tampering, or registry-publication defect. Pinning the immutable commit is a useful existing safeguard, but does not resolve misleading package metadata or verify plugin/CLI parity.

Before enterprise rollout, prefer an approved correctly packaged artifact, retain the lockfile, and record artifact digest, source revision, engine/plugin versions, license, and update/rollback process. Do not automatically replace the dependency or assume a matching registry release exists.

Upstream acceptance: a clean consumer install from the documented distribution identifies the expected package/version, runs its binary and template checks, and reports engine/plugin compatibility. Test the packed artifact outside the source workspace so source-only assumptions are caught. Clean-room installation, provenance signatures, registry availability, and plugin revision parity were not verified. Upstream status: not submitted.
