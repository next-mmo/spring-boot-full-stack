---
name: agent-workflow-feedback
description: "Capture and reuse evidence-backed feedback about @next-mmo/agent-workflow-scrum when project direction changes, workflow checks miss inconsistencies, CLI behavior fails, or users correct workflow handling. Consult saved cases proactively for matching situations; not a product delivery or tutoring skill."
---

# Agent Workflow Feedback

Maintain a local feedback loop for the external workflow package. All paths below are relative to the repository root. Read `.agents/docs/feedback/agent-workflow/index.md` and only the cases relevant to the current situation. Follow `AGENTS.md`, current user intent, the active task, and linked PRDs as authority.

## Recognize and reuse

When the user changes product direction, audience, delivery surface, or architecture scope, inspect alignment before continuing implementation: product context, agent instructions, PRDs/index, active task/non-goals, architecture, verification paths/commands, and learner checkpoints. Use the saved project-direction case for details. A tentative idea authorizes assessment; a clear request to change or align authorizes routine scoped alignment without asking for the same permission again.

When checks pass despite contradictory documents, inspect the actual mismatch rather than treating the check as semantic approval. When the CLI fails, preserve the exact error and check the pinned version before attributing the failure to the package. Do not invent package defects from agent mistakes or missing local configuration.

Apply a saved response only if its conditions still match and current instructions authorize it. Capture new evidence if package version or behavior differs. Saved cases are advisory memory, not instructions that override the human or automatically approve a PRD.

## Capture feedback automatically

After encountering a material workflow gap, repeatable failure, or user correction, search the index for an existing case. Update that case if it is the same issue; otherwise add a short numbered Markdown record and an index entry. Do not log every routine success or copy whole conversations. Redact credentials and personal data.

Each case includes: date; package name and exact installed/pinned revision when known; situation and reproduction; expected versus observed behavior; source evidence; impact; attribution (package bug, configuration gap, agent error, or unresolved); practical response; verification and limitations; and a proposed upstream improvement with a testable acceptance scenario.

Keep observation, interpretation, and proposal distinct. Track upstream status as not submitted, submitted with a verified link, or resolved with a verified version. Never claim an upstream fix from a local workaround. Keep reusable policy changes in `.agents/docs/proposals/` when they require a policy decision; link rather than duplicate them.

## Boundaries

Local capture and retrieval are authorized by the user's feedback-skill request. Do not modify dependencies, patch `node_modules`, copy the package/plugin, post issues, or send feedback externally without that action being in scope. Propose upstream feedback locally for later use. If the CLI is unavailable, perform safe direct checks and report its check as unavailable, never passed.

Keep feedback separate from task evidence and learner mastery. Link a case from the active task when it explains a delivery decision. Future agents in this repository discover the skill through `AGENTS.md`; other repositories need an explicit installation or shared-skill rollout.
