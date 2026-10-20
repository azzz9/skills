---
name: performance
description: "性能の改善。一度きりの遅さの修正と、指標を継続的に上げる loop に使う。baseline を測り、1変更1測定で keep or revert する。"
---

# Performance

## 契約

- baseline を先に測る。harness の感度を確認し、freeze する。
- 1変更、1測定。keep or revert。未測定の変更を積まない。
- code inspection で win を主張しない。
- 反証されたら revert。simplification が数値を保つなら keep。
- regression gate を green に保つ。
- 数値には unit と workload を付ける。異なる workload の比を主張しない。

## モード

選び方: 1つだけ選ぶ。一度きりなら `one-off`、継続的な改善なら `loop`。

- **one-off**: 1つの遅さを trace から特定し、fix する。
- **loop**: 1つの metric を target まで上げる。hypothesis、change、before、after、verdict を `../shared/references/decision-log.md` に残す。

## 停止

- 数値が noise を超えない、または gate が赤なら revert して止まる。
