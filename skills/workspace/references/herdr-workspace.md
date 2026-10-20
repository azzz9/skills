# Herdr workspace

Herdr が前提。`HERDR_ENV=1` を確認し、`herdr worktree create` を使う。すでに worktree の中なら、そこで作業し、新しい worktree を作らない。

## create

1. `herdr worktree create --cwd <repo root> --branch pi/<slug> --no-focus`
   slug は2から4語の小文字。branch と child agent の名前を兼ねる。
2. JSON から読む。
   - `.result.root_pane.pane_id`
   - `.result.workspace.workspace_id`
   - `.result.worktree.path`
3. `herdr agent start <slug> --kind pi --pane <pane>`
4. `herdr agent prompt <slug> "<brief>" --wait --timeout 120000`
5. 長い作業は `herdr agent wait <slug> --timeout <ms>`。
6. `herdr agent read <slug> --source recent-unwrapped --lines 120` で結果を見る。

layout plugin が tabs を非同期に作る。`agent_pane_busy` が出たら少し待って1回だけ retry する。

## clean

`wt-clean pi/<slug> --repo <repo root>`

checkout、workspace、branch を閉じる。merge されていなければ exit 1。`--force` を渡さない。

複数の worktree は `scripts/worktree-audit.sh` で監査し、未コミットと使用中を確認してから消す。
