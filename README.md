# skills

The rules, the skills, and the agents used on this machine, as a pi package.

## Where it comes from

Parts of it come from [`cursor/plugins` pstack](https://github.com/cursor/plugins/tree/main/pstack). The
skills, the principles, and several workflow skills began as theirs, and plenty of the wording is still
theirs. Thank you. `LICENSE` keeps their copyright notice beside the modification notice.

`skills/herdr` and `skills/hunk-review` are vendored from their upstream projects. Each keeps
the upstream `LICENSE` beside it and a `metadata.upstream` note in its frontmatter.

`skills/yomiyasu` is vendored from [`nanaism/yomiyasu`](https://github.com/nanaism/yomiyasu)
(MIT). It keeps the upstream `LICENSE` and `UNICODE-LICENSE.txt`; `VENDOR.md` records the commit and the
local changes.

## Skills

Fourteen skills. Most are contracts with modes; yomiyasu, herdr, and hunk-review are vendored.

- Understand, design, plan
- Change, diagnose, performance
- Review, writing, ship, workspace
- Skill dev, yomiyasu, herdr, hunk-review

`skill-dev` and `yomiyasu` are hidden from the catalog and run through `/skill:<name>`. `herdr` and `hunk-review` are vendored.
`writing` points at the `yomiyasu` skill for Japanese prose.

## Delegation

The pi session that reads a skill calls `subagent({ agent, task })`. The subagent gets a scoped brief, not the
caller's skill. The caller reviews the diff and verifies the result. `change` reviews its own diff; `ship`
reviews the full PR diff. Local agents are `deep`, `standard`, `intent`, `fast`, and `comment-sicko`;
`reviewer` comes from `pi-subagents`.

## Scope

Written for pi. Other harnesses are untested. The skills are plain `SKILL.md` files and the rules are
plain Markdown, so they may travel, but nothing here has been verified against another runner.

## Install

Two files load on every turn. [APPEND_SYSTEM.md](APPEND_SYSTEM.md) holds the gates, the principles, the
skill routing, and the reply rules. [AGENTS.md](AGENTS.md) holds the turn gate, the language rule, and the
git rules. Wire both into `~/.pi/agent/`, and add this repository as a package row so pi finds the skills
and the agents. Install `pi-subagents` for the `reviewer` agent used by `ship`.

## License

MIT. `LICENSE` keeps the upstream notice and the modification notice.
