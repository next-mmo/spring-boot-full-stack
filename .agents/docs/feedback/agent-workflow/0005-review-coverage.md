# 0005: Zero Review Coverage Can Still Return Success

Date: 2026-09-08. Package: `@next-mmo/agent-workflow-scrum`; repository pin and lock resolution: `8ebb2b220b624693a4b3c769c34aa873d2e79462`.

## Observation and reproduction

Call the installed `engine/review-core.mjs` export `runStaticReview` with these explicit files:

```javascript
{files: [
  'todo-domain/src/main/java/com/peopleinfo/todo/domain/Todo.java',
  'todo-domain/pom.xml'
]}
```

Observed on 2026-09-08: `ok: true`, `reviewType: static-pattern-scan`, `filesReviewed: 0`, and both files skipped as unsupported/ignored; zero issues.

Follow-up repository review after the offline tutor increment inspected 41 files, reported `NO BLOCKING PATTERN MATCHES`, and skipped 10 files, including the changed Java and POM files. This confirms the disclosure is present in the normal report, but an integration that consumes only the successful status still needs a coverage policy.

The PostgreSQL lesson reproduced this limitation with `rtk npm exec -- agent-workflow review --base 42e283b4460d61ab26e58ba33bee46a851122d4f`: 45 files inspected, 22 skipped, zero blocking matches. New repository, mapper, UUID handler, configuration, integration-test Java files, and POM changes were skipped. Response: direct semantic review plus real PostgreSQL tests; the scan result is not backend review coverage. No dependency changes or upstream submission were made for this case.

Source: `node_modules/@next-mmo/agent-workflow-scrum/packages/agent-workflow-scrum/engine/review-core.mjs:43` excludes Java/XML; line 146 derives success from absence of high-severity pattern matches. `review.mjs` only fails its exit status when `ok` is false. The text formatter already says `NO SUPPORTED FILES INSPECTED` and lists skips; preserve that good disclosure.

## Attribution and impact

This is a reproduced machine-consumer coverage hazard, not evidence that the scanner promises a complete security audit. An integration reading only `ok` or exit code could approve an entirely unreviewed backend. Maven tests/build also do not substitute for security or semantic review.

## Response and upstream acceptance

Require coverage-aware consumers. Add an explicit `inconclusive` result and configurable required-language/required-path coverage, with hooks for language-appropriate tools. Keep advisory scans available.

Tests: Java/POM-only input is visibly inconclusive; mixed supported/unsupported files show both denominators; ignored/generated files are distinguished from unsupported required product files; a deliberate supported high-severity fixture still fails. No secret or unsafe fixture was inserted into product code. Upstream status: not submitted.
