# Agent Workflow Scrum Task Board

Task filenames control lifecycle state:

| Prefix and location | State |
| :--- | :--- |
| `todo-*` in this directory | Ready |
| `wip-*` in this directory | Active |
| `blocked-*` in this directory | Blocked |
| `done-*` in `done/` | Verified increment |

Keep at most one `wip-*` or `blocked-*` task. A task exists in one lifecycle location only. Completion requires acceptance criteria, fresh evidence, and human acceptance; do not treat a passing test as self-approval.

When priorities change, return an unfinished task to `todo-*` and record its deferral reason, retained evidence, and resume point. This is scheduling, not completion or an environment blocker. Update inbound links and select one new active task; preserve the previous task's product and learner checkpoints.
