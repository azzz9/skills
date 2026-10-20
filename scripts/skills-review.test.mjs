import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS = join(ROOT, "skills");
const AGENTS = join(ROOT, "agents");

test("the always-on rules use review-only subagents", () => {
	const append = readFileSync(join(ROOT, "APPEND_SYSTEM.md"), "utf8");
	assert.ok(!/^## Orchestrator$/m.test(append), "APPEND still has the orchestrator section");
	assert.match(append, /^## Delegation$/m);
	assert.match(append, /comment-sicko/);
	assert.match(append, /reviewer/);
});

test("the only local subagent is comment-sicko", () => {
	const names = readdirSync(AGENTS)
		.filter((name) => name.endsWith(".md"))
		.map((name) => name.slice(0, -3));
	assert.deepEqual(names.sort(), ["comment-sicko"]);
	const text = readFileSync(join(AGENTS, "comment-sicko.md"), "utf8");
	assert.match(text, /^inheritSkills:\s*false$/m);
	const tools = text.match(/^tools:\s*(.+)$/m)?.[1] ?? "";
	assert.ok(!tools.includes("subagent"), "comment-sicko: exposes subagent");
});

test("the no-comment rule is in APPEND", () => {
	const append = readFileSync(join(ROOT, "APPEND_SYSTEM.md"), "utf8");
	assert.match(append, /^## Comments$/m);
	assert.match(append, /Write no comments/);
});

test("ship uses reviewer and comment-sicko", () => {
	const ship = readFileSync(join(SKILLS, "ship", "SKILL.md"), "utf8");
	assert.match(ship, /reviewer/);
	assert.match(ship, /comment-sicko/);
});

test("imozuru does not delegate search to a subagent", () => {
	const text = readFileSync(join(SKILLS, "imozuru", "SKILL.md"), "utf8");
	assert.doesNotMatch(text, /検索役のサブエージェント/);
	assert.match(text, /サブエージェントは使わない（reviewer と comment-sicko だけ）/);
});

test("every mode names an agent or subagent なし", () => {
	for (const name of ["ship", "workspace"]) {
		const text = readFileSync(join(SKILLS, name, "SKILL.md"), "utf8");
		const modes = text.split("## モード")[1]?.split("##")[0] ?? "";
		for (const line of modes.split("\n").filter((line) => /^- \*\*/.test(line))) {
			assert.match(line, /\((?:[^)]*)(?:subagent なし|reviewer|comment-sicko)[^)]*\)/, `${name}: ${line}`);
		}
	}
});
