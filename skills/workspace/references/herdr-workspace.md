# Herdr workspace

Herdr is required. Check `HERDR_ENV=1` and use `herdr worktree create`. If you are already in a worktree, work there and do not create another.

## create

1. `herdr worktree create --cwd <repo root> --branch pi/<slug> --no-focus`
   The slug is two to four lowercase words. It serves as the branch and child agent name.
2. Read from the JSON:
   - `.result.root_pane.pane_id`
   - `.result.workspace.workspace_id`
   - `.result.worktree.path`
3. `herdr agent start <slug> --kind pi --pane <pane>`
4. `herdr agent prompt <slug> "<brief>" --wait --timeout 120000`
5. For long work, use `herdr agent wait <slug> --timeout <ms>`.
6. Read the result with `herdr agent read <slug> --source recent-unwrapped --lines 120`.

The layout plugin creates tabs asynchronously. If `agent_pane_busy` appears, wait briefly and retry once.

## clean

`wt-clean pi/<slug> --repo <repo root>`

Close the checkout, workspace, and branch. If the branch is not merged, exit 1. Do not pass `--force`. To keep the branch ref, use `git worktree remove` and do not delete the branch.

For multiple worktrees, audit with `../scripts/worktree-audit.sh`, check uncommitted and in-use worktrees, then delete.
