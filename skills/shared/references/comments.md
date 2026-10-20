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

Before commit, list every added comment line and the reason it cannot be expressed in code. Delete
every comment that fails. If a better name, a type, or a test can carry the meaning, do that instead.
A comment that survives must name the constraint or decision it preserves.

The orchestrator runs `../scripts/comment-guard.sh` on the diff to list candidates. The script is a
candidate list, not a verdict. The orchestrator decides, and `ship` records the decision.
