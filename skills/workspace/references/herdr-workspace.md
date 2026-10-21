# Herdr workspace

Herdr is required. Check `HERDR_ENV=1` and use `herdr worktree create`. If you are already in a worktree, work there and do not create another.

## create

1. Run `git rev-parse --show-toplevel` for the repo root. Pick a slug of two to four lowercase words. The branch is `pi/<slug>`, and the same slug names the child agent, which must match `[a-z][a-z0-9_-]{0,31}` and be unique among live agents.
2. `herdr worktree create --cwd <repo root> --branch pi/<slug> --no-focus`
3. Read from the JSON:
   - `.result.root_pane.pane_id` is the shell the child goes into.
   - `.result.workspace.workspace_id` identifies the workspace to close later.
   - `.result.worktree.path` is the checkout the child works in.
4. `herdr agent start <slug> --kind pi --pane <pane>`
5. `herdr agent prompt <slug> "<brief>" --wait --timeout 120000`
6. For long work, use `herdr agent wait <slug> --timeout <ms>`.
7. Read the result with `herdr agent read <slug> --source recent-unwrapped --lines 120`.

The layout plugin creates tabs asynchronously. If `agent_pane_busy` appears, wait briefly and retry once.

## Brief

The child starts with zero context. The brief is everything it knows, so name the checkout path, the task, the done condition, and what to do with uncommitted work. Include the repository rules it should follow when they differ from the defaults.

## Collect

`--wait` returns at the first settled `idle`, `done`, or `blocked` state, not at the end of the turn.

`done` only means the agent settled, so confirm the work in the checkout with `git -C <path> log --oneline -1` and `git -C <path> status --short`.

`blocked` means the child is asking a question. Read the pane, then ask the user before answering. `agent prompt` is rejected with `agent_blocked` while a dialog is open, so reply with `herdr agent send-keys <slug> <key>` instead. A timeout does not prove the brief never landed, so inspect before resending.

## clean

`wt-clean pi/<slug> --repo <repo root>`

Close the checkout, workspace, and branch. If the branch is not merged, exit 1. Do not pass `--force`. Report the refusal and stop. To keep the branch ref, use `git worktree remove` and do not delete the branch.

For multiple worktrees, audit with `../scripts/worktree-audit.sh`, check uncommitted and in-use worktrees, then delete.
