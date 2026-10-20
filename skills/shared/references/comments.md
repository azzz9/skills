# Comments

Default is no comment. A comment is a cost paid on every read.

## Allowed

- legal or license header
- external dependency, platform, vendor, or protocol behavior that code cannot express
- `prettier-ignore`
- public API contract doc comment
- issue or RFC link that explains a constraint code cannot express

## Forbidden

- narration, banner
- commented-out code
- workaround sermon, long justification
- `IMPORTANT`, `do not remove`, `too risky`, `fine for now` without proof
- a comment that restates the next line, the signature, or the type

## Guard

Before commit, `ship` passes the diff to `comment-sicko`. Check the findings with this file.
`comment-sicko` uses its own prompt's exception list. If a better name, a type, or a test can carry
the meaning, do that instead. A comment that survives must name the constraint or decision it
preserves.
