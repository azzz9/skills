# skills

The rules, the skills, and the playbooks an agent works from on this machine, as a pi package.

## Where it comes from

Parts of it come from [`cursor/plugins` pstack](https://github.com/cursor/plugins/tree/main/pstack). The
playbooks, the principles, and several workflow skills began as theirs, and plenty of the wording is still
theirs. Thank you. `LICENSE` keeps their copyright notice beside the modification notice.

`skills/herdr`, `skills/hunk-review`, and `skills/imozuru` are vendored from their upstream projects. Each
keeps the upstream `LICENSE` beside it and a `metadata.upstream` note in its frontmatter. imozuru
brings Python 3.10+ scripts; the optional extractors those scripts use are listed in its `SKILL.md`.

## Scope

Written for pi. Other harnesses are untested. The skills are plain `SKILL.md` files and the rules are
plain Markdown, so they may travel, but nothing here has been verified against another runner.

## Install

Two files load on every turn. [APPEND_SYSTEM.md](APPEND_SYSTEM.md) holds the gates, the principles, the
playbook relay, and the reply rules. [AGENTS.md](AGENTS.md) holds the turn gate, the language rule, and the
git rules. Wire both into `~/.pi/agent/`, and add this repository as a package row so pi finds the skills,
the agents, and `/clone-pane`.

## Clone a session into a pane

`/clone-pane` copies the current session into an adjacent Herdr pane, so a side question never enters the
main transcript. The clone runs `pi --fork <session file>` in the new pane. Pass `down` for a vertical
split. It needs `HERDR_ENV=1` and a saved session.

## Know when another session changed the worktree

`external-changes.ts` lists files changed outside this session at the start of each run. It compares
`git status` mtimes against the state after this session's last edit. A clone's edits are marked before
the model reads the files.

## License

MIT. `LICENSE` keeps the upstream notice and the modification notice.
