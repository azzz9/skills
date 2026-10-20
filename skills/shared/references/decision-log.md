# Decision log

決定を1行ずつ残す TSV。列は `ts`、`phase`、`decision`、`why`、`evidence`、`result`。
`evidence` は pointer にする。prose を入れない。セルは1行に保つ。

## 始め方

`decision-log-template.tsv` をコピーする。行は `../scripts/log.sh <logfile> <phase> <decision> <why> <evidence> <result>` で足す。
log は tree の外に置く。reviewer が trail を信頼する必要があるときだけ commit する。
