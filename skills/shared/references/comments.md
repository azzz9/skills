# Comments

コメントは、コードで表せない理由だけを書く。コードを読めば分かることを書かない。

## 書いてよいもの

- legal header
- 外部依存、platform、vendor、protocol の非自明な挙動で、コードでは表せないもの
- `prettier-ignore`
- public API の contract を定義する doc comment
- issue か RFC への link で、コードでは表せない制約を説明するもの

## 書かないもの

- narration、banner
- commented-out code
- workaround の説教、長い justification
- `IMPORTANT`、`do not remove`、`too risky`、`fine for now` のような、コードで証明されていない主張

## レビュー

review の comments モードは、この基準に合わないコメントを finding として返す。comment-sicko は自分の prompt の例外リストを使う。呼び出し元はこのファイルで findings を検収する。
