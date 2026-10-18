# skills

The rules, the skills, and the playbooks an agent works from on this machine, as a pi package.

## Where it comes from

Parts of it come from [`cursor/plugins` pstack](https://github.com/cursor/plugins/tree/main/pstack). The
playbooks, the principles, and several workflow skills began as theirs, and plenty of the wording is still
theirs. Thank you. `LICENSE` keeps their copyright notice beside the modification notice.

`skills/herdr` and `skills/hunk-review` are vendored from their upstream projects. Each keeps
the upstream `LICENSE` beside it and a `metadata.upstream` note in its frontmatter.

## Scope

Written for pi. Other harnesses are untested. The skills are plain `SKILL.md` files and the rules are
plain Markdown, so they may travel, but nothing here has been verified against another runner.

## Install

Two files load on every turn. [APPEND_SYSTEM.md](APPEND_SYSTEM.md) holds the gates, the principles, the
playbook relay, and the reply rules. [AGENTS.md](AGENTS.md) holds the turn gate, the language rule, and the
git rules. Wire both into `~/.pi/agent/`, and add this repository as a package row so pi finds the skills
and the agents.

## License

MIT. `LICENSE` keeps the upstream notice and the modification notice.
