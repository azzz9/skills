---
name: ship
description: "Commit and PR. Commit is automatic. Run reviewer before the PR and open it ready. No merge."
---

# Ship

## Contract

- Commit at the end of the task is automatic. Open the PR after the reviewer and ready.
- **Sequence Verifiable Units.** Use Conventional Commits. `type(scope): subject`. One intent per commit.
- **Prove It Works.** Before commit, confirm a test or real-surface evidence for the change.
- Before commit, apply the no-comment rule in APPEND to the diff; fix remaining comments.
- Before the PR, pass the base..head full diff to `reviewer`. One reviewer per review lane. The main pi checks the findings and the no-comment rule, fixes what remains, and opens the PR. Do not wait for human confirmation.
- PR title: Conventional Commits. Body: follow `/skill:pr`. Use the repo's PR template if it exists; otherwise use `pr`'s Summary, Evidence, and Merge Danger. Write the prose with `/skill:yomiyasu`.
- Open the PR ready, not as a draft.
- Stop after opening. Do not merge. Do not create a watcher. Read the status once.

## Modes

Choose: commit, then `pr`. If only the PR is requested, start from `pr`.

- **commit** (no subagent): inspect the diff, exclude unrelated changes, group one intent. Split if multiple intents.
- **pr** (`reviewer`): title, body, full-diff review, ready. Stack uses the parent branch as base.

## Stop

- If findings remain, do not commit or open the PR until they are fixed.
- After opening the PR, report the URL and stop.
