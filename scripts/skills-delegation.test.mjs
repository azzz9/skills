import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS = join(ROOT, "skills");
const AGENTS = join(ROOT, "agents");

test("the delegation reference exists", () => {
	assert.ok(existsSync(join(SKILLS, "shared", "references", "delegation.md")));
});

test("the tier agents forbid nested subagents", () => {
	for (const name of ["deep", "fast", "intent", "standard"]) {
		const text = readFileSync(join(AGENTS, `${name}.md`), "utf8");
		assert.match(text, /Do not spawn subagents/);
	}
});

test("no local agent exposes the subagent tool", () => {
	for (const name of ["deep", "fast", "intent", "standard", "comment-sicko"]) {
		const text = readFileSync(join(AGENTS, `${name}.md`), "utf8");
		const tools = text.match(/^tools:\s*(.+)$/m)?.[1] ?? "";
		assert.ok(!tools.includes("subagent"), `${name}: exposes subagent`);
	}
});
