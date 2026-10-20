---
name: writing
description: "文章を書く、直す、残す。docs、PR、commit、memo に使う。日本語の文章では yomiyasu skill を参照する。reader-first で、AI tell を切る。返答そのものは Output の規則に従う。"
---

# Writing

## 契約

- reader-first。疲れたエンジニアが一読で理解する。
- 短い文。1文1考。長い dash を使わない。mid-sentence colon を使わない。
- 抽象語を避け、codebase の実 symbol を使う。
- AI tell を切る。ルール番号は stable id として扱う。
- 意味を保つ。tone を合わせる。

## 日本語

- 日本語の docs、PR、commit、memo を書く、または直すときは、`../yomiyasu/SKILL.md` を先に読む。
- `<スキル配置ディレクトリ>` は `../yomiyasu/` を指す。
- 推敲の検査は `../yomiyasu/scripts/yomiyasu_check.py` と `yomiyasu_lint.py` を使う。
- yomiyasu の出力フォーマットは、ユーザーが推敲の形式を求めたときだけ使う。通常の返答は Output に従う。
- 委譲するなら、brief に `../yomiyasu/SKILL.md` を読むよう書く。

## モード

選び方: 1つを主モードにする。`doc` は新規、`edit` は既存、`memo` はログから。

- **doc** (intent): Diátaxis のどれか1つ。how-to、explanation、reference、tutorial を混ぜない。
- **edit** (intent; mechanical は fast): 既存の文章を直す。意味と事実を変えない。
- **memo** (intent): 会話ログから決定と再利用できる lesson を残す。transcript を写さない。

## 停止

- 返答の形は `APPEND_SYSTEM.md` の Output に従う。この skill は docs、PR、commit、memo に適用する。
