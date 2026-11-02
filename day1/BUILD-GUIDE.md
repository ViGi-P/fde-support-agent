# Day 1 - start here

Build a fictional Kaapi support workflow in your own n8n Cloud account. Windows and Mac use the same browser steps.

## Get the files
1. Download `kaapi-day1-gemini.json` from this folder (open file, then Download raw file).
2. Open a new blank workflow in n8n. Use the workflow name menu **More actions > Import > From file** and choose the JSON file. If the optional AI-tool connector dialog appears, choose **Skip**; it is not required for this build. Do not import over a workflow you want to keep.
3. The export deliberately has no credentials, presenter Sheet ID, Slack channel ID or execution data. Keep it unpublished until your setup and tests pass.

## Connect your accounts
1. Double-click **1. New [KAAPI-DEMO] Email**. Select your Gmail credential. Filter: `subject:"[KAAPI-DEMO]"`, unread messages. Full payload is required (Simplify off). Polling: once per minute.
2. Open **Google Gemini Model**. Connect your own Gemini API credential. The prepared model is `models/gemini-3.5-flash-lite`; verify access in your account. If unavailable, choose an accessible text model and repeat all tests. Temperature 0.2.
3. Create a Google Sheet. In row 1 enter exactly: `time`, `sender`, `category`, `draft_reply`. In **5. Log to Kaapi Support Log**, select your Google credential, document and tab. Operation: Append Row. Keep the four mappings supplied by the template.
4. In Slack create or choose a test channel such as #support. In **7. Alert #support (Refund Draft)** select your Slack credential and the channel you can post to. Re-select the channel from your own workspace if the imported name does not resolve.
5. Keep the provided prompt, output parser and validation nodes. Do not rename nodes without updating expressions that refer to their names.

## Test in order
Use the exact fictional inputs in TEST-EMAILS.md. Send them to the Gmail inbox selected on your trigger, with [KAAPI-DEMO] in the subject. Keep the messages unread for polling.

| Test | Category | Sheet | Slack |
|---|---|---|---|
| T01 torn bag + refund request | refund | one new row | refund review alert |
| T03 French press grind | product | one new row | no refund alert |
| T05 Hinglish late order | delivery | one new row | no refund alert |

Use **Fetch Test Event** on the trigger to inspect a real email during a manual demonstration; **Execute workflow** runs the complete test. Published polling and manual tests have different timings. Avoid repeatedly running the same message unless you expect duplicate rows/alerts. This teaching workflow has no persistent deduplication.

After the three tests pass, publish your workflow. Inspect **Executions** for success and check the actual Sheet and Slack outputs. Never show or share your API key.

## What is already tested
On 2 November 2026, both presenter variants processed T01/T03/T05 successfully. The shared log had six rows: two refund, two product and two delivery. Slack received two refund alerts, one per provider. Successful full workflow execution durations were about 4.6-5.9 seconds in these tests; those are not isolated model latencies.

The presenter's n8n Cloud rejected sub-minute polling. A one-minute interval works. Thus email-to-alert can exceed 30 seconds; the brief's automatic 30-second target is not a passed guarantee. A phone-send rehearsal and a timed first-time import by another person remain human checks.

## Claude option
Import `kaapi-day1-claude.json` into a separate workflow. Connect an Anthropic API credential instead of a Gemini credential, then repeat the Google/Slack setup. The tested presenter model is Claude Opus 5.5. API billing and access are separate from a Claude chat subscription. Compare both outputs on the same input and rubric; do not assume either always wins.

## Teaching map
Four business blocks: trigger, AI + JSON, log, condition + alert. The supplied implementation has 11 nodes including the model, parser, field-capture and validation helpers. It is not a strict four-node canvas. It drafts replies for review; it does not send customer replies or approve refunds.

For setup help see ../docs/ATTENDEE-SETUP.md. Day 2 and Day 3 executable implementations are separate forthcoming milestones, not completed Day 1 features.
