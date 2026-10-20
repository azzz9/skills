---
name: workspace
description: "作業用 worktree と Herdr workspace の作成、終了。編集作業の隔離、独立タスクの dispatch、worktree の掃除に使う。1タスク1 worktree。すでに worktree の中なら新しい worktree を作らない。"
---

# Workspace

## 契約

- 編集を伴う作業は linked worktree で始める。大本の repo では編集しない。Herdr が前提。`HERDR_ENV=1` を確認し、`herdr worktree create --cwd <repo root> --branch pi/<slug>` を使う。外なら止まる。read-only はそのまま。
- worktree は大きいタスク専用ではない。編集を伴う作業を大本の repo から隔離するためのもの。
- すでに worktree の中にいるなら、そこで作業する。新しい worktree を作らない。`create` は大本の repo からだけ行う。`git worktree list` の最初の checkout が大本で、自分のパスが違えば worktree の中。
- **Separate Before Serializing Shared State.** 1タスク1 worktree。同時 writer を同じ cwd に置かない。
- **Make Operations Idempotent.** create と clean は再実行しても壊れない。
- dispatch は `subagent()` ではない。別の pi セッションで、child が checkout を持つ。dispatch する側は編集しない。独立したタスクだけを dispatch し、現在の worktree の子 worktree を作らない。
- 掃除は irreversible。`git worktree list` のパスだけを使う。`wip:N` と使用中は pause。clean、merged、not-in-use は進む。
- branch ref は残す。`wt-clean` で1ブランチを完全に閉じるときだけ、merge の証明があるときに branch も消す。
- `create` では `--force` を渡さない。`clean` は未コミットを確認した後だけ `--force` を使う。
- Herdr の workspace と pane を閉じる。

## モード

選び方: 1回に1つ。`create` と `clean` は別の操作。

- **create** (subagent なし; Herdr + child pi): 大本の repo から worktree を作り、独立したタスクを child に渡す。手順は `references/herdr-workspace.md`。いま worktree の中なら、そこで作業する。
- **clean** (subagent なし; Herdr): 1ブランチを完全に閉じるなら `wt-clean pi/<slug> --repo <repo root>`。branch ref を残すなら `git worktree remove` を使い、branch を消さない。複数は `scripts/worktree-audit.sh` で候補を出し、未コミットと使用中を確認してから削除する。

## 停止

- 未コミットの変更、pinned の chat、使用中の worktree は消さない。ユーザーに確認する。
