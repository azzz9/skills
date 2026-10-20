# pr vendor record

- Upstream: https://github.com/mattpocock/skills/tree/main/skills/engineering/pr
- Commit: 5beb35b040e3de97e54fa9e386d7e42d15c295c2
- Date: 2026-10-19
- License: MIT. See `LICENSE`.
- Vendored under: `skills/pr/`

## Local changes

- Frontmatter adds `license`, `metadata.upstream`, `metadata.version`, and `metadata.note` for pi.
- The `GLOSSARY.md` reference is adapted to use the target repo's glossary when it exists.
- The PR body structure uses the target repo's PR template when present; otherwise the upstream
  template. The prose uses `/skill:yomiyasu`.
- `CREDITS.md` is kept for the upstream attribution.
- Omitted: `agents/openai.yaml` (plugin interface, not a pi-subagents agent).
