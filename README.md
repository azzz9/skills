# skills

The rules, the skills, and the agents used on this machine, as a pi package.

## Where it comes from

Parts of it come from [`cursor/plugins` pstack](https://github.com/cursor/plugins/tree/main/pstack). The
skills and several workflow ideas began as theirs, and plenty of the wording is still theirs. Thank you.
`LICENSE` keeps their copyright notice beside the modification notice.

`skills/herdr` and `skills/hunk-review` are vendored from their upstream projects. Each keeps
the upstream `LICENSE` beside it and a `metadata.upstream` note in its frontmatter.

`skills/yomiyasu` is vendored from [`nanaism/yomiyasu`](https://github.com/nanaism/yomiyasu)
(MIT). It keeps the upstream `LICENSE` and `UNICODE-LICENSE.txt`; `VENDOR.md` records the commit and the
local changes.

`skills/imozuru` is vendored from [`MaryCache/imozuru`](https://github.com/MaryCache/imozuru)
(MIT). It keeps the upstream `LICENSE`; `VENDOR.md` records the commit and local changes. Its
scripts need Python 3.10+ and use only the standard library. Optional `pdftotext`, `yt-dlp`,
`tesseract`, and `ax` improve PDF, YouTube, OCR, and HTML handling.

`skills/pr` and `skills/retro` are vendored from [`mattpocock/skills`](https://github.com/mattpocock/skills)
(MIT). Each keeps the upstream `LICENSE`; `VENDOR.md` records the commit and local changes. `pr` uses
the repo's PR template when one exists; otherwise its own. The body is written with `/skill:yomiyasu`.
`ship` still owns the commit and PR gate. `retro` is hidden.

## Skills

Ten skills. Four are ours and six are vendored.

- `bro`, `explain`, `ship`, `workspace`
- `herdr`, `hunk-review`, `imozuru`, `pr`, `retro`, `yomiyasu`

`bro`, `retro`, and `yomiyasu` are hidden from the catalog and run through `/skill:<name>`. `bro` is
a plain-language restatement procedure; `explain` is a single procedure; `imozuru` is a research
procedure with a watch mode; `pr` is a vendored PR body template; `ship` and `workspace` have modes.
`workspace` owns worktrees; `ship` owns commit and PR and runs the reviewer. The comment
rule lives in `APPEND_SYSTEM.md`, under `## Comments`.

## Subagents

The main session does the work. The only subagent is `reviewer`, for the diff. The no-comment
rule lives in `APPEND_SYSTEM.md`. There is no orchestrator, scout, worker, or tier ladder. Each
subagent gets a scoped brief and returns findings. It does not read the caller's skill and does
not spawn. The main session checks the findings and makes the fix, without asking the human to
confirm them.

## Scope

Written for pi. Other harnesses are untested. The skills are plain `SKILL.md` files and the rules are
plain Markdown, so they may travel, but nothing here has been verified against another runner.

## Install

Two files load on every turn. [APPEND_SYSTEM.md](APPEND_SYSTEM.md) holds the delegation rules, the
gates, the review gates, the skill routing, and the reply rules. [AGENTS.md](AGENTS.md) holds the turn
gate, the language rule, and the git rules. Wire both into `~/.pi/agent/`, and add this repository as a
package row so pi finds the skills and the agents. Install `pi-subagents` for `reviewer` and
`subagent()`.

## License

MIT. `LICENSE` keeps the upstream notice and the modification notice.
