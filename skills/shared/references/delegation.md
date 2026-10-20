# Delegation

`subagent({ agent, task })` は pi-subagents の tool。呼ぶのは、skill を読んでいる pi セッションのモデル。skill は tool を実行できない。

skill を読むのは、subagent を呼ぶ側の pi セッション。subagent にはタスクの brief だけを渡す。subagent に呼び出し元の skill を読ませない。subagent は更に spawn しない。

## agent

| agent | 向く仕事 | 編集 | 注意 |
|---|---|---|---|
| `deep` | 設計、診断、判定 | 不可 | read-only。実装候補にしない |
| `standard` | 定型の実装、複数ファイル | 可 | 既定の実装役 |
| `intent` | 曖昧な依頼の整理と実装 | 可 | scope が決まっていないとき |
| `fast` | 調査、機械的な編集 | 可 | 形が決まっているとき |
| `comment-sicko` | コメント削除のレビュー | 不可 | review の comments モード |
| `reviewer` | PR レビュー（`review` の code モード） | 不可 | pi-subagents 由来。なければ止まる |

## brief に書くこと

- 対象のファイルと範囲
- 成功条件
- 触ってはいけないもの
- 報告の形
- 未コミットの扱い

## 呼び出し元がやること

1. skill を読む。
2. `subagent({ agent: "standard", task: "..." })` を呼ぶ。モデルを分けるときは `model` を渡す。
3. diff を読む。
4. 実 surface で verify する。子の自己申告を信じない。

## 注意

- `workspace` の dispatch は `subagent()` ではない。別の pi セッション。
- 子は `subagent` tool を持たない。spawn できない。
- `reviewer` は `agents/` にいない。pi-subagents から来る。
