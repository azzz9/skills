# yomiyasu vendor record

- Upstream: https://github.com/nanaism/yomiyasu
- Commit: 8be3ef6e0e668f14cae30c3da6b0c20b95b2179f
- Version: 2.1.0
- License: MIT. See `LICENSE` and `UNICODE-LICENSE.txt`.
- Vendored under: `skills/yomiyasu/`

## Local changes

- The upstream `SKILL.md` is the base. The frontmatter is adapted for pi: `name`, `description`, `license`, `metadata.upstream`, `metadata.version`, and `disable-model-invocation: true`.
- The standalone `/yomiyasu` invocation paragraph is removed. The `writing` skill owns the Japanese trigger; this skill is also available as `/skill:yomiyasu`.
- A note records that scripts and references are relative to this directory.
- Scripts and references are unchanged.
- Omitted: `assets/`, `.codex-plugin/`, and `scripts/yomiyasu_hook.py`.
