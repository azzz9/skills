# imozuru vendor record

- Upstream: https://github.com/MaryCache/imozuru
- Commit: 69b2e1b82c3571af366a7913375714aa5069c652
- Date: 2026-10-20
- License: MIT. See `LICENSE`.
- Vendored under: `skills/imozuru/`

## Local changes

- The frontmatter adds `license`, `metadata.upstream`, `metadata.version`, and `metadata.note` for pi.
- Slash commands are `/skill:imozuru`, not `/imozuru`, to match the pi skill command.
- The `examples/demo/` directory is kept inside the skill, so the `SKILL.md` reference drops the
  upstream repository prefix.
- `scripts/report.py` and `scripts/watch.py` are executable so the documented direct invocation works.
- The upstream search-subagent paragraph and its search-report assumptions are adapted to the review-only subagent policy: the caller performs the search role itself; only `reviewer` is used as a subagent.
- Omitted: `.claude-plugin/`, `assets/`, upstream tests, and the repository READMEs.
