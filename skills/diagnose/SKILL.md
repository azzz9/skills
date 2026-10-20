---
name: diagnose
description: "不具合や性能異常の診断。failing repro、live profile、captured trace、heap snapshot から原因を特定する。原因が分かるまで read-only。"
---

# Diagnose

## 契約

- artifact first。failing repro、CPU profile、heap snapshot、trace のいずれか。推測で始めない。
- source mapping のない frame は診断ではない。file、symbol、line を引用する。
- 原因が分かるまで read-only。fix は `change` が持つ。
- fix は repro が before で失敗し after で通ることを示す。unit test は bug absence の証明ではない。
- 反証された仮説が動機づけた変更は revert する。
- fix は `design` の後に `change` に渡す。関数境界を越えるなら sketch も先に。
- `change` に渡すとき、commit 順は failing repro、fix。高価、統合寄り、不明なら skip。

## モード

選び方: 原因が分からないなら `live` か `artifact`。分かったら `change` に渡す。診断だけなら findings で止まる。

- **live** (deep): 動いている process を instrument する。CPU、heap、CDP。
- **artifact** (deep): 取得済みの trace を parse する。sqlite など query できる形にしてから読む。

## 停止

- 原因が分かったら `change` に渡す。診断だけなら findings で止まる。
