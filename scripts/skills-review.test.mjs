import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS = join(ROOT, "skills");
const AGENTS = join(ROOT, "agents");

test("the always-on rules use the reviewer", () => {
	const append = readFileSync(join(ROOT, "APPEND_SYSTEM.md"), "utf8");
	assert.ok(!/^## Orchestrator$/m.test(append), "APPEND still has the orchestrator section");
	assert.match(append, /^## Delegation$/m);
	assert.match(append, /reviewer/);
	assert.match(append, /does\s+not\s+ask the human to confirm/);
	assert.doesNotMatch(append, /comment-sicko/);
});

test("there is no local subagent; reviewer is builtin", () => {
	const local = existsSync(AGENTS)
		? readdirSync(AGENTS).filter((name) => name.endsWith(".md"))
		: [];
	assert.deepEqual(local, []);
	const append = readFileSync(join(ROOT, "APPEND_SYSTEM.md"), "utf8");
	assert.match(append, /reviewer/);
	assert.doesNotMatch(append, /comment-sicko/);
});

test("the no-comment rule is in APPEND", () => {
	const append = readFileSync(join(ROOT, "APPEND_SYSTEM.md"), "utf8");
	assert.match(append, /^## Comments$/m);
	assert.match(append, /Write no comments/);
});

test("ship uses reviewer only", () => {
	const ship = readFileSync(join(SKILLS, "ship", "SKILL.md"), "utf8");
	assert.match(ship, /reviewer/);
	assert.match(ship, /Do not wait for human confirmation/);
	assert.doesNotMatch(ship, /only when (asked|requested)/i);
	assert.doesNotMatch(ship, /wait for (a )?(request|instruction)/i);
	assert.doesNotMatch(ship, /comment-sicko/);
});

test("imozuru does not delegate search to a subagent", () => {
	const text = readFileSync(join(SKILLS, "imozuru", "SKILL.md"), "utf8");
	assert.doesNotMatch(text, /検索役のサブエージェント/);
	assert.match(text, /サブエージェントは使わない（reviewer だけ）/);
});

test("every mode names an agent or subagent なし", () => {
	for (const name of ["ship", "workspace"]) {
		const text = readFileSync(join(SKILLS, name, "SKILL.md"), "utf8");
		const modes = text.split("## モード")[1]?.split("##")[0] ?? "";
		for (const line of modes.split("\n").filter((line) => /^- \*\*/.test(line))) {
			assert.match(line, /\((?:[^)]*)(?:no subagent|reviewer)[^)]*\)/, `${name}: ${line}`);
		}
	}
});
