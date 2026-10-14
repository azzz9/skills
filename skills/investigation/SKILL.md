---
name: investigation
description: "Investigation. Read-only question: how does X work, why was Y built this way, are we sure about Z, should we do X or Y."
---

### Investigation

**You own the answer. Plan, route, write.**

Investigation requests are read-only. They produce a cited explanation or a recommendation, not a code change.

1. Route through the **how** skill. For motivation questions, also route through the **why** skill.
2. Throughput checkpoint stays one line: `throughput checkpoint: n/a, read-only investigation`.
3. Produce the `how`-shaped output, or a recommendation with a tradeoffs table if the request is a decision between alternatives. The five sections are a checklist, not an outline: drop what does not apply, and lead with the answer, the reading order, and one small diagram.
4. Apply the **unslop** skill to the reply.

No PR and no `architect` unless the investigation precedes a code change. If it does, hand back to the user and re-route to Bug fix or Feature.

**Reply:** the investigation output. For "are we sure?" answers, include your real judgment with reasons. Push back if the premise is wrong (see the decisions rule in the ruleset).
