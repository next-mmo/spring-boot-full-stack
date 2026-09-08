# 0007: Explicit Provider Opt-in Is Not a Company Data Policy

Date: 2026-09-08. Package: `@next-mmo/agent-workflow-scrum`; repository pin and lock resolution: `8ebb2b220b624693a4b3c769c34aa873d2e79462`.

## Observation and reproduction

The provider guidance correctly makes remote-capable OpenViking explicit-only, labels recall advisory, and supports timeouts and diagnostic redaction. Default local context in this review did not call it.

Installed `packages/agent-workflow-scrum/engine/context/providers/openviking.mjs:35-52` passes the original scope string to `ov find`. Redaction occurs on returned content/errors, not before dispatch. A VM probe used the exact adapter with mocked `runCli`, passing `investigate token=SYNTHETIC_REVIEW_CANARY`; the captured argument retained the synthetic value. No subprocess, real credential, or network request was used.

Separately, `engine/report.mjs` reads selected Markdown content into a static HTML artifact and writes it locally. HTML escaping prevents markup interpretation but is not confidentiality redaction. The generated report is not automatically published.

## Attribution and impact

Raw query forwarding matches the documented opt-in contract; it is not an observed privacy breach. Company requirements may be stricter than per-command opt-in. Sensitive query text could reach a configured server or local process diagnostics, and a report could expose internal content if later shared broadly.

## Response and upstream acceptance

Propose an organization-controlled provider/endpoint allowlist, data classification and pre-dispatch deny/redact policy, minimal credential scopes, and explicit retention/sharing rules for reports and recall. Secret-pattern redaction alone cannot identify all confidential information. Keep untrusted retrieved instructions separate from action authorization.

Tests: default mode makes no remote call; a disallowed provider or classified query is blocked before dispatch; safe queries reach an approved target; synthetic sensitive values do not appear in diagnostics or shareable exports. Test prompt-injection content without granting actions. Network enforcement and actual provider retention remain unassessed. Upstream status: not submitted.
