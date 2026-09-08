# 0009: Doctor Misclassifies Project-owned Skills as Vendored

Date: 2026-09-08. Package: `@next-mmo/agent-workflow-scrum`; repository pin and lock resolution: `8ebb2b220b624693a4b3c769c34aa873d2e79462`.

## Observation and reproduction

Run `rtk npm exec -- agent-workflow doctor --json` in this repository. Observed: `ok: true`, zero errors, and the warning `.agents/skills is vendored; package/plugin mode does not require it`.

This folder contains project-owned `tutor` and `agent-workflow-feedback` skills. They implement human-requested teaching and feedback behavior, not copies of the external workflow package. Installed `packages/agent-workflow-scrum/src/doctor.mjs:14` lists the entire `.agents/skills` directory as a vendored path; its later loop checks existence rather than ownership/content.

The report also marks local canonical workflow/prose skill paths missing even though this consumer uses externally installed skills. That is a source-repository assumption, not proof of an absent usable plugin.

## Attribution and impact

Reproduced diagnostic overreach. The check remains successful, but a human or cleanup agent might incorrectly remove useful local extensions or copy external skills into the repository to silence contradictory diagnostics.

## Response and upstream acceptance

Keep legitimate project-owned skills. Diagnose known copied workflow-owned paths or ownership manifests specifically; distinguish project, package, and plugin sources. Report external skills as externally managed/unknown when appropriate instead of requiring local copies.

Tests: these two project skills cause no vendoring warning; a genuinely copied external engine/skill still warns; mixed ownership is diagnosed per path; missing optional local copies do not imply a broken installation. No doctor implementation or skill behavior changed in this review. Upstream status: not submitted.
