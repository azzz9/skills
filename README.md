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

## Skills

Seven skills. Three are ours and four are vendored.

- `explain`, `ship`, `workspace`
- `herdr`, `hunk-review`, `imozuru`, `yomiyasu`

`yomiyasu` is hidden from the catalog and runs through `/skill:yomiyasu`. `explain` is a single
procedure; `imozuru` is a research procedure with a watch mode; `ship` and `workspace` have modes.
`workspace` owns worktrees; `ship` owns commit and PR. The comment guard lives in
`skills/shared/references/comments.md`.

## Orchestration

The main pi session is the orchestrator. It keeps the goal, does the main work, and dispatches only
bounded, independent subtasks to `scout` (read-only) or `worker` (edit). Each subagent gets a
self-contained brief and returns distilled findings. It does not read the caller's skill and does
not spawn. The orchestrator synthesizes and verifies on the real surface.

There is no tier ladder, no `reviewer`, and no `comment-sicko`. The comment guard is a pre-commit
check in `ship`, backed by `skills/shared/scripts/comment-guard.sh`.

## Scope

Written for pi. Other harnesses are untested. The skills are plain `SKILL.md` files and the rules are
plain Markdown, so they may travel, but nothing here has been verified against another runner.

## Install

Two files load on every turn. [APPEND_SYSTEM.md](APPEND_SYSTEM.md) holds the orchestrator rules, the
gates, the comment guard, the skill routing, and the reply rules. [AGENTS.md](AGENTS.md) holds the turn
gate, the language rule, and the git rules. Wire both into `~/.pi/agent/`, and add this repository as a
package row so pi finds the skills and the agents. Install `pi-subagents` for `subagent()`.

## License

MIT. `LICENSE` keeps the upstream notice and the modification notice.
