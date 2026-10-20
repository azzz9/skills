---
name: plan
description: "複数 phase または複数 PR の plan。1つの変更が大きいとき、どの skill も合わないときに使う。plan が成果物で、実装はしない。"
---

# Plan

## 契約

- plan が成果物。実装しない。
- 1 PR は1変更。各 PR に unit、live、perf の証拠を付ける。3つが揃うまで verified と言わない。live は必須。
- perf は trunk と head の両方で測る。異なる scenario の比を主張しない。
- interaction を変える PR は、screenshot と video で operator のレビューを受ける。
- 実行は operator の明示的な go から。go の前に owner を spawn しない。go の後、owner は `subagent` で `standard` か `intent` を呼ぶ。
- 委譲の形と agent の一覧は `../shared/references/delegation.md`。
- 1から2ファイルで明白なら plan を書かない。そう言って止める。
- 検証は実 surface で。unit test だけでは足りない。

## モード

選び方: 1つだけ選ぶ。`multi-phase` は複数PR、`novel` は既存の skill が合わないとき。

- **multi-phase**: phase と PR に分ける。各 phase に done の predicate と証拠を置く。
- **novel**: 既存の skill が合わないとき、作業そのものを設計する。phase、risk、decision log を先に決める。log は `../shared/references/decision-log.md` に従う。

## 停止

- plan を渡したら止まる。実行は次の依頼から。
