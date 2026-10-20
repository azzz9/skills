---
name: ship
description: "commit と PR。commit は自動でよく、PR はユーザーが求めたときだけ。review と ready で止まる。merge しない。"
---

# Ship

## 契約

- commit はタスクの終わりに自動でよい。PR はユーザーが求めたときだけ開く。
- **Sequence Verifiable Units.** commit は Conventional Commits。`type(scope): subject`。小さく、順序立てる。
- **Prove It Works.** PR の前に `review` の comments モードと code モードを PR の差分全体（base から head）に通す。code モードは review lane ごとに reviewer を1人。
- 委譲の形と agent の一覧は `../shared/references/delegation.md`。
- PR title と body は `writing` の doc モードに従う。body は briefing。40行を超えたら切る。
- PR は ready で開く。draft にしない。
- 開いたら終わり。merge しない。watcher を作らない。status は forge を1回読む。

## モード

選び方: commit してから `pr`。PR だけを頼まれたら `pr` から。

- **commit** (fast): 差分を確認し、関係ない変更を除外し、1つの意図にまとめる。複数の意図があるなら commit を分ける。
- **pr** (呼び出し元; reviewer と comment-sicko): title、body、review、ready。stack は parent branch を base にする。

## 停止

- PR を求められていなければ、commit の後で止まる。
- PR を開いたら、URL を報告して止まる。
