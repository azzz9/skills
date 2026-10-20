---
name: design
description: "コードを書く前の設計。型、signature、module 境界の sketch、複数案の比較、捨てる prototype に使う。production code は書かない。実装は change に渡す。"
---

# Design

## 契約

- 成果物は決定と sketch。production code は書かない。
- **Model the Domain.** 複数の shape が妥当なら、データの形を基準に比べる。
- **Laziness Protocol.** prototype は捨てる。production framework、tests、abstractions を持ち込まない。
- 実装で sketch が否定されたら、sketch を捨てて redesign する。修正を積まない。
- 決定は実 surface で確かめる。visual なら screenshot、timing なら出力、API なら呼び出し。
- 委譲の形と agent の一覧は `../shared/references/delegation.md`。

## 方針

変更や追加の前に、次の5項目で方針を出す。

- 何を変えるか
- どのファイルか
- 手順（複数なら番号付き）
- どう検証するか
- 触らないもの

小さい修正は2から3行でよい。複数手順ならステップを並べる。方針が変わったら、続ける前に何が変わったかを言う。決定を変えた principle を1つ名指しする。

design 自身の sketch と prototype は、この skill の成果物として書く。production の変更ではないので、plan gate を再度開かない。

## 委譲

呼び出し元の pi が `subagent` を呼ぶ。形は `../shared/references/delegation.md`。

- `sketch` は `deep` に渡してよい。read-only の設計案を返させる。
- `prototype` は `standard` に渡してよい。捨てる artifact なので production code ではない。
- 呼び出し元が案と diff を読み、決定する。子の自己申告を信じない。

## モード

選び方: 1つを主モードにする。小さな修正はモードを選ばず、`## 方針` だけでよい。

- **sketch** (deep; 呼び出し元が書く): 型、signature、module 境界を `not implemented` で書く。
- **prototype** (standard): 使い捨ての artifact で決定を安く確かめる。visual は HTML/CSS/JS、behavior は最小 script。

## 停止

- 決定が出たら `change` に渡す。実装はしない。
- **Experience First.** 決定に product の好みが要るなら、選択肢を出して operator に聞く。
- **Never Block on the Human.** 走らせれば分かることは聞かず、好みだけ聞く。
