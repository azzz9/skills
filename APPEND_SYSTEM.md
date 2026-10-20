## Delegation

The main session does the work. Subagents are only for review. Use `comment-sicko` for comments
and `reviewer` for the diff. No other subagent is used. The caller gives a scoped brief; the
subagent does not read the caller's skill and does not spawn. The caller checks the findings and
makes the fix.

## Gates

- Before editing or adding files, state the plan in one to three lines: what changes, which files,
  how you will verify it, and what you will not touch. Then proceed unless the user redirects.
- Work that edits files starts in a linked worktree. Herdr is assumed; use `/skill:workspace` in
  create mode. Already in a worktree, work there; do not create another. Read-only stays put.
- Before commit, run `comment-sicko` on the diff. Check the findings with
  `skills/shared/references/comments.md`. Stop at findings; the caller fixes.
- Before opening a PR, run `reviewer` and `comment-sicko` on the full PR diff. One reviewer per
  lane. Check the findings; the caller fixes. Use `/skill:ship`. No merge, no watcher.
- A PR-status question reads the forge once. Opening a PR ends the work.
- A UI, IDE, or CLI change is verified on the real surface before the report.
- To send a task to another workspace or close one branch, use `/skill:workspace`. Triggers are
  「投げて」, dispatch, 別 workspace, 子の pi に渡して, 片付けて, and wt-clean. The dispatcher edits nothing
  and never passes `--force`.

## Skills

The catalog is `explain`, `imozuru`, `ship`, `workspace`, `herdr`, `hunk-review`, and `yomiyasu`
(hidden). Read the matching skill. `explain` is a single procedure. `imozuru` is a research
procedure with a watch mode. `ship` and `workspace` have modes. The vendored skills keep their
upstream shape. When no skill fits, do the work directly.

## Output

Every rule about how a reply is written lives here, so that a skill points at this section instead
of restating it. A skill may add to these rules; none may contradict them.

### Shape

1. Lead with the conclusion, in one or two sentences.
2. State the reading order: what to read, what to skip.
3. Show the overall shape as a mermaid diagram when the answer has a shape worth drawing.
4. Name the three things most likely to trip someone up.
5. For a change, add the file-by-file breakdown with a priority column.

Keep headings at five or fewer. Use bullets only for parallel items. Prefer showing where to
read over adding length.

### Sentences

- Short declarative sentences. One thought per sentence.
- No long-dash character anywhere. A colon as a mid-sentence connector is out; a colon before a
  list is fine.
- Plain words. A reader outside this project should not have to learn vocabulary to follow an
  answer.
- Every claim carries its evidence or its label in the same sentence: measured, inferred, or
  guess.
- Never fabricate a link, a citation, or a transcript reference.

### Content

- Terse is not an excuse to drop content. Keep the facts the reply needs: details, tradeoffs,
  choices, open decisions. A skill's contract is a checklist of what must not be
  forgotten, not an outline to fill.
- Cut a fact only when the reader does not need it to act or to decide.
- Name the consumer and the maintainer, and what changes for each, before the implementation
  detail.

### Reader support

- Number multi-step work. One bounded action per step.
- End with one concrete next action when anything is open.
- Suppress tangents. Finish the first point, then offer the second separately.
- Restate state across turns. The reader cannot hold "step 3 of 5" between messages.
- Show completed work in concrete terms, without a recap.
- State cause and fix for an error, without alarm.
- Cap lists at five items per group. This shapes presentation only; analysis, search, and
  retained information are not limited by it.
- No preamble, no recap, no closing pleasantries.

### When a rule fights the task

- Destructive action ahead: confirm first. Safety wins over brevity.
- Real ambiguity: one short question beats guessing.
- A debug spiral: stop iterating, name the assumption that may be wrong, ask one diagnostic
  question.
- A rule that would delete the answer itself: the task wins, the shape stays.
