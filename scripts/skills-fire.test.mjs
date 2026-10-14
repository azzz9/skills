import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

// The one thing worth guarding: a skill that can fire. A skill fires when pi finds a SKILL.md whose
// frontmatter carries a name and a description, and when `disable-model-invocation` is absent so the
// model can pick it from the catalog.
//
// The list below is the contract. When the catalog intentionally changes, update it here and see the
// delta.

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS = join(ROOT, "skills");

const DISCOVERABLE = [
	"authoring-a-skill",
	"bug-fix",
	"conventional-commit",
	"conversation-to-memory",
	"explain",
	"feature",
	"hillclimb",
	"how",
	"investigation",
	"multi-phase-plan",
	"opening-a-pr",
	"pause-safely",
	"perf-issue",
	"prototype",
	"refactoring",
	"runtime-forensics",
	"session-pickup",
	"trace-forensics",
	"unslop",
	"visual-parity",
	"why",
	"worktree-cleanup",
];

// Directories under skills/ that hold shared material rather than a skill of their own.
const CONTAINERS = [];

function frontmatter(dir) {
	const text = readFileSync(join(SKILLS, dir, "SKILL.md"), "utf8");
	assert.ok(text.startsWith("---\n"), `${dir}: missing opening frontmatter`);
	const close = text.indexOf("\n---\n", 4);
	assert.ok(close !== -1, `${dir}: missing closing frontmatter`);
	return text.slice(4, close);
}

function skills() {
	return readdirSync(SKILLS, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name)
		.filter((name) => existsSync(join(SKILLS, name, "SKILL.md")));
}

test("every skill can fire, and exactly the listed skills are fireable", () => {
	const fireable = [];
	for (const name of skills()) {
		const fm = frontmatter(name);
		const declared = fm.match(/^name:\s*(.+)$/m)?.[1]?.trim();
		const description = fm.match(/^description:\s*(.+)$/m)?.[1]?.trim();
		assert.ok(declared, `${name}: frontmatter has no name`);
		assert.equal(declared, name, `${name}: name does not match its directory`);
		assert.ok(description && description.length > 20, `${name}: frontmatter has no usable description`);
		if (!/^disable-model-invocation:\s*true\s*$/m.test(fm)) fireable.push(name);
	}
	assert.deepEqual(fireable.sort(), DISCOVERABLE);
});

test("no directory under skills/ is a half-made skill", () => {
	const strays = readdirSync(SKILLS, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name)
		.filter((name) => !CONTAINERS.includes(name))
		.filter((name) => !existsSync(join(SKILLS, name, "SKILL.md")));
	assert.deepEqual(strays, [], "a directory without SKILL.md never fires");
});
