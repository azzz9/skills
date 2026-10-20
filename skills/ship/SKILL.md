---
name: ship
description: "commit と PR。commit は自動でよい。PR は求められたときだけ。comment guard と full diff の検証で止まる。merge しない。"
---

# Ship

## 契約

- commit はタスクの終わりに自動でよい。PR は求められたときだけ開く。
- **Sequence Verifiable Units.** commit は Conventional Commits。`type(scope): subject`。1意図1commit。
- **Prove It Works.** commit の前に、変更に対応する test か実 surface の証拠を確認する。
- commit の前に comment guard を通す。`../shared/scripts/comment-guard.sh` で追加コメントの候補を出し、`../shared/references/comments.md` の基準で1行ずつ判定する。コードで表せない理由を言えないものは消す。
- PR の前に、base から head の full diff を明示的な基準で検証する。scope、test、実 surface、comment guard、無関係な変更。委譲するなら read-only の `scout` に基準を渡し、findings を検収する。
- PR title は Conventional Commits。body は what、why、verification、open risks。40行以内。日本語の body は `/skill:yomiyasu`。
- PR は ready で開く。draft にしない。
- 開いたら終わり。merge しない。watcher を作らない。status は forge を1回読む。

## モード

選び方: commit してから `pr`。PR だけを頼まれたら `pr` から。

- **commit** (subagent なし): 差分を確認し、関係ない変更を除外し、1つの意図にまとめる。複数の意図があるなら commit を分ける。
- **pr** (subagent なし; 必要なら read-only の `scout`): title、body、full diff の検証、ready。stack は parent branch を base にする。

## 停止

- PR を求められていなければ、commit の後で止まる。
- PR を開いたら、URL を報告して止まる。
