---
name: dispatch
description: "Dispatching a task into its own Herdr workspace, or closing one afterwards. Use when the user says 投げて, dispatch, 別 workspace, 子の pi に渡して, 片付けて, or wt-clean, or asks for one task that should run in its own checkout while this session stays put. Closes one branch by removing the checkout, workspace, and branch. Not for subagent() calls, not for editing here, and not for pruning many worktrees; worktree-cleanup owns that."
---

# Dispatch

Send one task to a child pi in its own Herdr workspace, then get out of the way. This session stays where it is and edits nothing, so the child owns the checkout.

This is not `subagent()`. Dispatch owns a Herdr workspace and a named pane, and closes both with `wt-clean`. Reach for `subagent()` when the child needs no checkout and no sidebar entry.

Steps 2 to 5 send a task. A request to close one branch starts at Step 6.

## Step 1. Confirm the ground

```bash
test "${HERDR_ENV:-}" = 1
git rev-parse --show-toplevel
```

Outside Herdr, stop and say so. Pick a slug of two to four lowercase words from the task. The branch is `pi/<slug>`, and the same slug is the child's agent name, which must match `[a-z][a-z0-9_-]{0,31}` and be unique among live agents.

## Step 2. Create the worktree and read the IDs

```bash
herdr worktree create --cwd <repo root> --branch pi/<slug> --no-focus
```

Read three values from the JSON response:

- `.result.root_pane.pane_id` is the shell the child goes into.
- `.result.workspace.workspace_id` identifies the workspace to close later.
- `.result.worktree.path` is the checkout the child works in.

The layout plugin fills tabs asynchronously. The response describes one tab and one root pane; the agents, diff, and scratch tabs appear after the workspace event. The agents tab is deliberately an empty shell, so the root pane is free.

## Step 3. Start the child

```bash
herdr agent start <slug> --kind pi --pane <root pane id>
```

The pane must sit at an interactive shell prompt. Success means Herdr detected pi in that pane and considers it ready.

The first attempt can return `agent_pane_busy` while the layout plugin is still creating tabs. Wait a moment and retry once. The prompt returns once the layout settles.

## Step 4. Send one self-contained brief

```bash
herdr agent prompt <slug> "<brief>" --wait --timeout 120000
```

The child starts with zero context. The brief is everything it knows, so name the checkout path, the task, the done condition, and what to do with uncommitted work. Include the repository rules it should follow when they differ from the defaults.

`--wait` returns at the first settled `idle`, `done`, or `blocked` state, not at the end of the turn. For work longer than one turn, follow with `herdr agent wait <slug> --timeout <ms>`.

## Step 5. Report and collect

```bash
herdr agent list
herdr agent read <slug> --source recent-unwrapped --lines 120
```

`blocked` means the child is asking a question. Read the pane, then ask the user before answering. `agent prompt` is rejected with `agent_blocked` while a dialog is open, so reply with `herdr agent send-keys <slug> <key>` instead. A timeout does not prove the brief never landed, so inspect before resending.

Check the work, not the claim. A `done` state only means the agent settled, so confirm the result in the checkout with `git -C <path> log --oneline -1` and `git -C <path> status --short`.

## Step 6. Close one branch

```bash
wt-clean pi/<slug> --repo <repo root>
```

Run this after the child finishes, or when the user asks to close one branch on its own. `wt-clean` removes the checkout, closes the workspace, and deletes the branch. It refuses with exit 1 unless another local branch contains the tip or a merged pull request does. Report the refusal and stop. Never add `--force` yourself; that discards uncommitted work and skips the merge proof.

For pruning several worktrees, use the `worktree-cleanup` skill instead.

## Trip-ups

- Editing in this session breaks the role. Run the task in a child, or hand the whole thing back to the user.
- `wt-clean` must run inside the Herdr pane. From a detached shell it refuses when a workspace may still hold the checkout.
- Parallel children need distinct slugs. Reusing one collides on both the branch and the agent name.
