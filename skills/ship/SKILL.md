---
name: ship
description: "commit と PR。commit は自動でよい。reviewer を回して ready で PR を開く。merge しない。"
---

# Ship

## 契約

- commit はタスクの終わりに自動でよい。PR は reviewer の後に ready で開く。
- **Sequence Verifiable Units.** commit は Conventional Commits。`type(scope): subject`。1意図1commit。
- **Prove It Works.** commit の前に、変更に対応する test か実 surface の証拠を確認する。
- commit の前に APPEND の no-comment rule を diff に当て、残るコメントは修正してから commit する。
- PR の前に `reviewer` に base から head の full diff を渡す。review lane ごとに `reviewer` を1人。findings と no-comment rule は main pi が検収し、残るものは修正してから PR を開く。人間の承認は待たない。
- PR title は Conventional Commits。body は `/skill:pr` の手順に従う。repo に PR template があればその構造を使い、無ければ `pr` の Summary、Evidence、Merge Danger を使う。どちらも `/skill:yomiyasu` で書く。
- PR は ready で開く。draft にしない。
- 開いたら終わり。merge しない。watcher を作らない。status は forge を1回読む。

## モード

選び方: commit してから `pr`。PR だけを頼まれたら `pr` から。

- **commit** (subagent なし): 差分を確認し、関係ない変更を除外し、1つの意図にまとめる。複数の意図があるなら commit を分ける。
- **pr** (`reviewer`): title、body、full diff の検証、ready。stack は parent branch を base にする。

## 停止

- findings が残るなら、修正するまで commit も PR もしない。
- PR を開いたら、URL を報告して止まる。
