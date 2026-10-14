# Evidence categories

One section per evidence category. Give each investigator the section that matches its MCP, and the incident angle when the target looks defensive.

These sections name no products on purpose. Read the MCP's own tool schema, map its tools onto the recipe, and report what a tool cannot do as a gap.

Every category follows the same rules:

- **Discover before querying.** List the MCP's tools and read their schemas. If authentication fails, stop and report the gap.
- **Time-bound the query** to a window around the change you are explaining. Thirty days either side by default, wider only with a reason.
- **Search the anchor from the seed.** Symbol names, file paths, error strings, the PR URL, and the author's handle. Try several phrasings.
- **Fetch the whole thing.** The rationale sits in the replies, not the first message.
- **A null result is a finding.** Report the coverage you achieved, not the answer you hoped for.

## Source control history

See `code-archaeology.md`. The one category that is always available, through git and `gh`.

## Issue / ticket tracker

**What it holds.** Feature and bug issues, their comments, parent and sub-issue trees, project docs, labels, and status changes. This is where the product or business forcing function lives ("customer X needs this", "Q3 compliance work").

**How to search it.** Start with the ticket IDs the seed commits and PRs reference, and read the full issue. Then search the feature name, the symbols, and the business term. Walk from a sub-issue up to its parent, which carries the initiative. Read labels and milestones for the category of motivation.

**Evidence that lands.** An issue naming the business problem. A comment recording a decision and the alternative it rejected. A parent issue that reads like an initiative. A spec attached to the project.

**Pitfalls.** Scope drift, so read the whole history. Mechanical "Why" sections filled with boilerplate. Stale tickets describing a plan that changed. Duplicate chains that end at a canonical ticket. Restricted content, named as a gap.

**Return.** Ticket ID and title. The motivation quoted verbatim, not paraphrased. Labels, parent, project. Author and dates. The link.

## Long-form documents

**What it holds.** Product requirement docs, specs and RFCs, decision records, meeting notes, postmortems, runbooks, and strategy pages. A significant feature usually has a document written before the code.

**How to search it.** Keyword search the feature name, the key symbols, the author's handle, and any user-visible error text, bounded by when the code shipped. Read the full page, not the preview: rationale hides mid-document. Follow backlinks, child pages, and any meeting-notes or ticket databases the tool exposes.

**Evidence that lands.** A problem statement that matches what the code does. An alternatives-considered section. A postmortem naming the target as the fix. Meeting notes recording a decision and its reason near the PR date.

**Pitfalls.** Documents describe plans, so they drift from shipped code. Flag the divergence rather than resolving it. Boilerplate templates. The most relevant page may be linked from nowhere. Several drafts: prefer the finalized or most recently updated one. Restricted pages are a gap.

**Return.** Title and link. Authors and last-updated date. The motivation quoted verbatim with its section. Whether the doc is a draft or finalized.

## Real-time team chat

**What it holds.** The discussion that never reached a document: design debates, incident channels, answers from senior engineers, post-merge revisits. The most ephemeral source. Threads get deleted and search quality degrades.

**How to search it.** Bound by author and merge date first, the highest-yield query. Then the feature name, the symbols, the PR URL, and any error string the code guards against. Narrow to likely channel families (engineering, project, incident). Fetch the whole thread whenever a message looks relevant.

**Evidence that lands.** A thread that debates a tradeoff explicitly. An incident-channel message describing the bug the code prevents. A reviewer's question and an authoritative reply. A support or product message explaining the customer ask.

**Pitfalls.** Retention cliffs, so say where the record stops. Direct messages are usually unsearchable and will be missed. Casual jokes are not decisions. A message without its thread reads wrong. An unauthenticated tool is a gap, not a finding.

**Return.** Channel. Permalink or thread ID. Participants and the date range. Verbatim quotes with attribution. What discussion the thread belonged to.

## Infrastructure observability

**What it holds.** The production runtime record: metrics, alert conditions and their thresholds, curated dashboards, request traces, logs, formal incidents, and exploratory notebooks. The team's choice of instrument is itself evidence that someone worried about that number.

**How to search it.** Identify the owning service and its dependencies first. Read dashboards and monitors before metrics: a watched threshold is often the reason a value is clamped in code. Then correlate a metric's trajectory, a log pattern, or a trace with the change window. Keep log search time-bounded, service-scoped, and aggregated, since an unbounded search returns thousands of matches.

**Evidence that lands.** A monitor whose query and threshold match the constraint the code enforces. A dashboard authored by the change's author, with widgets matching what the code guards. A metric that spikes before the change and settles after. An incident record naming the same symbols or error strings.

**Pitfalls.** Correlation is not causation; other changes land in the same window. Charts are made by a human and carry that framing. Telemetry gets renamed, deleted, or expires, and a missing window is a gap, not a null. An instrument existing shows concern, not cause.

**Return.** Type, title, and identifier or link. Owner and dates. The condition, query, or quote that bears on the question, verbatim where possible. How strongly it connects to the target.

## Error / exception tracking

**What it holds.** Grouped errors with counts, first and last seen, affected releases, individual events with stack traces, and sometimes root-cause notes. For defensive or corrective code this often holds the direct motivation. Its unique value is temporal correlation: an error that appeared before the change and stopped after it.

**How to search it.** Search issues by the exception class the target handles, the target's symbols, the error strings it checks, and its file path. Then check first seen, last seen, affected releases, and the frequency trajectory. Pull one full event and ask whether the stack trace passes through the target. Check which release landed near the change.

**Evidence that lands.** An issue whose first and last seen bracket the change. A stack trace that lands on the target. A comment from the change's author describing the fix. A commit or PR that cites the issue.

**Pitfalls.** Grouping drift: a refactor re-registers the same error under a new ID, so check for a new issue right after one ends. Release correlation is noisy, since a release carries many commits. An error can also stop because something upstream changed. A manually marked resolved issue is not evidence of a fix. Sampling makes low counts meaningless. Machine-generated root-cause summaries are guesses.

**Return.** Issue ID and title. First and last seen. Event count. Affected releases. One representative stack-trace excerpt, verbatim. The correlation with the ship date.

## Product analytics warehouse

**What it holds.** The product and data view: behavior events, usage and billing events, experiment exposure and outcome tables, and the warehouse's own system tables (query history, cost, access). It answers what users did, which experiment ran, and where a threshold constant came from.

**How to search it.** Probe the schema before trusting any table name, since names differ per installation. Prefer typed, deduplicated models over raw event tables, and read the model's column conventions instead of describing it. Time-bound every query; unconstrained scans time out. Match the question to a pattern: an event's daily count across the change window, the property distribution in the days before the change when a threshold constant needs explaining, exposure counts by variant for a flag, or the expensive queries in the history table when the change is a performance rewrite.

**Evidence that lands.** A step function from zero to steady volume within a day or two of the change. A percentile that matches a constant in the code. An exposure row naming a flag key and a decision date. An error-classifying count that drops after the change.

**Pitfalls.** Instrumented is not caused. A step function may be new instrumentation rather than new behavior, so check for an instrumentation change in the same window. Schema drift hides old properties in raw columns. Models refresh on a schedule, so recent events may live only in a raw table. Experiment and billing tables differ per installation; never report from a table whose existence you did not confirm. Retention or a model's creation date can leave the window empty, which is a gap.

**Return.** Type, the fully-qualified table name, and the exact query. The window queried. A compact numeric summary, not raw rows. The correlation with the ship date. Strength: direct, circumstantial, or weak.

## Incident history (cross-cutting)

Add this angle whenever the target looks defensive: null checks, retries, timeouts, rate limits, feature flags, egress guards, out-of-memory handlers. Incidents motivate defensive code, so hunt incident history in every source you have.

- Tickets labelled incident, severity, postmortem action item, or reliability.
- Chat channels for incidents and severities, around the dates the code was added.
- Observability incidents with timelines, plus the dashboards and monitors created as action items.
- Error-tracking issues whose first-seen window aligns with the change.
- Analytics events that classify an error condition. A spike during an incident window and a drop after the fix is circumstantial support.
- Git: commits that read "fix for incident", "add defensive check", or a revert followed by a re-apply.

When a link turns up, fetch the full postmortem and read its action items. They usually point straight at code changes. Corroboration across several sources is the strongest form of this evidence. Skip the angle for code that does not look defensive.
