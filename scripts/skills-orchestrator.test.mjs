import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS = join(ROOT, "skills");
const AGENTS = join(ROOT, "agents");

test("the orchestrator rules and the comment guard are always on", () => {
	const append = readFileSync(join(ROOT, "APPEND_SYSTEM.md"), "utf8");
	assert.match(append, /^## Orchestrator$/m);
	assert.match(append, /comment/i);
});

test("the comment guard files exist", () => {
	assert.ok(existsSync(join(SKILLS, "shared", "references", "comments.md")));
	assert.ok(existsSync(join(SKILLS, "shared", "scripts", "comment-guard.sh")));
	const comments = readFileSync(join(SKILLS, "shared", "references", "comments.md"), "utf8");
	assert.match(comments, /Default is no comment/);
	assert.match(comments, /Before commit/);
});

test("ship owns the comment guard", () => {
	const ship = readFileSync(join(SKILLS, "ship", "SKILL.md"), "utf8");
	assert.match(ship, /comment-guard\.sh/);
	assert.match(ship, /comments\.md/);
});

test("the local agents are scout and worker, and they cannot spawn", () => {
	const names = readdirSync(AGENTS)
		.filter((name) => name.endsWith(".md"))
		.map((name) => name.slice(0, -3));
	assert.deepEqual(names.sort(), ["scout", "worker"]);
	for (const name of names) {
		const text = readFileSync(join(AGENTS, `${name}.md`), "utf8");
		assert.match(text, /Do not spawn subagents/);
		const tools = text.match(/^tools:\s*(.+)$/m)?.[1] ?? "";
		assert.ok(!tools.includes("subagent"), `${name}: exposes subagent`);
	}
});

test("every mode names an agent or subagent なし", () => {
	for (const name of ["ship", "workspace"]) {
		const text = readFileSync(join(SKILLS, name, "SKILL.md"), "utf8");
		const modes = text.split("## モード")[1]?.split("##")[0] ?? "";
		for (const line of modes.split("\n").filter((line) => /^- \*\*/.test(line))) {
			assert.match(line, /\((?:subagent なし|scout|worker)[^)]*\)/, `${name}: ${line}`);
		}
	}
});
