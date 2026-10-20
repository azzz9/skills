---
name: understand
description: "コードや設計を理解する。仕組み、設計理由、初心者向けの説明、選択肢の判断に使う。読み取り専用で、主張には file:line か artifact を付ける。コード変更には使わない。"
---

# Understand

## 契約

- 読み取り専用。コードを変更しない。
- 主張には file:line、commit、issue、または実行結果を付ける。観測と推論を分ける。
- **Never Block on the Human.** 問いに答える。対象が曖昧なら解釈を1行で述べて進む。
- 決定を求められたら、選択肢、tradeoff、推奨を出す。前提が違えば指摘する。
- evidence source が複数あるなら並列に問い合わせる。source control、issue tracker、docs、chat、observability、error tracking、analytics。

## モード

選び方: 1つを主モードにする。必要なら `mechanism` と `rationale` を順に使う。

- **mechanism** (deep): どう動くか。runtime flow、component、data shape を辿る。
- **rationale** (deep): なぜこうなったか。commit、issue、設計文書、障害履歴を読む。
- **beginner** (intent): 用語、背景、仕組み、手順、現状の順で説明する。
- **decision** (deep): 選択肢を比較し、tradeoff table と推奨を出す。

## 停止

- コード変更が必要なら、この skill を終えて `change` に渡す。
- 証拠がない主張は「推測」と明記する。
