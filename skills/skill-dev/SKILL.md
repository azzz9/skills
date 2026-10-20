---
name: skill-dev
description: "skill の作成、変更、評価。frontmatter と参照を検証し、behavior に効く変更は blind で eval する。"
disable-model-invocation: true
---

# Skill dev

## 契約

- skill を変える前に、何を変えるかと合格条件を1行で書く。
- frontmatter は name と description。name は directory と一致。参照ファイルは実在する。
- 変更が behavior に効くなら eval する。blind を守る。
- 1変更1仮説。結果が悪ければ revert。
- **Encode Lessons in Structure.** 本文は契約とモード表。手順は references に置く。本文が長くなったら統合を疑う。
- **Build the Lever.** 1回の修正で済むなら skill を増やさない。

## モード

選び方: 新規作成は `author`、その後に `evaluate`。評価だけなら `evaluate`。

- **author** (intent): skill を書く、または直す。voice は既存の skill に合わせる。
- **evaluate** (deep): candidate に eval、test、judge、score、arena の語を見せない。prompt は organic な依頼にする。self-report を grade しない。1人の judge が両方の出力を同じ尺度で採点する。

## 停止

- 変更が repo の規則と矛盾するなら、規則を直す提案を先に出す。
