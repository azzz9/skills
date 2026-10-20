---
name: design
description: "コードを書く前の設計。型、signature、module 境界の sketch、複数案の比較、捨てる prototype に使う。production code は書かない。実装は change に渡す。"
---

# Design

## 契約

- 成果物は決定と sketch。production code は書かない。
- 複数の shape が妥当なら、2から3案を並べ、同じ基準で比べる。
- prototype は捨てる。production framework、tests、abstractions を持ち込まない。
- 実装で sketch が否定されたら、sketch を捨てて redesign する。修正を積まない。
- 決定は実 surface で確かめる。visual なら screenshot、timing なら出力、API なら呼び出し。
- 委譲の形と agent の一覧は `../shared/references/delegation.md`。

## モード

選び方: 1つを主モードにする。`arena` は候補を並べるので、`sketch` を含むことがある。

- **sketch**: 型、signature、module 境界を `not implemented` で書く。
- **arena**: 呼び出し元の pi が `subagent` で `standard` を2から3個、別モデルで走らせる。base を選び、他案の良い部分を graft する。`deep` は read-only なので実装候補にしない。
- **prototype**: 使い捨ての artifact で決定を安く確かめる。visual は HTML/CSS/JS、behavior は最小 script。

## 停止

- 決定が出たら `change` に渡す。実装はしない。
- 決定に product の好みが要るなら、選択肢を出して operator に聞く。
