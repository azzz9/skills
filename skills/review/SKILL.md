---
name: review
description: "diff のレビュー。コメントの削除、AI slop の除去、一般的なコードレビューに使う。findings には file:line、severity、evidence を付ける。依頼なしに application code を編集しない。"
---

# Review

## 契約

- findings only。依頼なしに application code を編集しない。
- 各 finding に file:line、severity、evidence を付ける。事実と推測を分ける。
- read-only のレビューなら findings で止まる。
- accepted finding の fix は範囲内。shape が要るなら `design` の sketch を1回。
- コメントの基準は `../shared/references/comments.md`。keep は「我々が変えられないもの」の証明があるときだけ。
- 委譲の形と agent の一覧は `../shared/references/delegation.md`。

## モード

選び方: `slop` は commit 前、`comments` は review 前、`code` は PR 前か大きい変更。`comments` と `code` は同時に使える。

- **comments**: コメントを削る。`../shared/references/comments.md` の基準に合わないものを finding にする。`subagent` で `comment-sicko` に渡し、findings を検収する。`MUST KILL` は symbol を名指しする。
- **slop**: 不要な comment、trusted path の defensive check、any cast、深い nesting、周囲と不整合な pattern を削る。
- **code**: 一般のコードレビュー。PR 前、大きい変更、またはユーザーが求めたときに使う。intent paragraph と diff を `subagent` で `reviewer` に渡す。review lane ごとに1人、別 lineage。`reviewer` は pi-subagents 由来で、なければ止まる。findings を検収する。

## 停止

- 修正が application code の shape を変えるなら、review を止めて `change` に渡す。
