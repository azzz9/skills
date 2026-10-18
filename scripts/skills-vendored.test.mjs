import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS = join(ROOT, "skills");

function frontmatter(dir) {
	const text = readFileSync(join(SKILLS, dir, "SKILL.md"), "utf8");
	const close = text.indexOf("\n---\n", 4);
	return text.slice(4, close);
}

test("a vendored skill keeps its upstream license beside it", () => {
	for (const entry of readdirSync(SKILLS, { withFileTypes: true })) {
		if (!entry.isDirectory() || !existsSync(join(SKILLS, entry.name, "SKILL.md"))) continue;
		if (!/^\s+upstream:/m.test(frontmatter(entry.name))) continue;
		assert.ok(
			existsSync(join(SKILLS, entry.name, "LICENSE")),
			`${entry.name}: vendored skill has no LICENSE`,
		);
	}
});
