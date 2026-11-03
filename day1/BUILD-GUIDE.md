# Day 1 - start here

Build a fictional Kaapi support workflow in your own n8n Cloud account. Windows and Mac use the same browser steps.

## Routing update - 3 November 2026

**Every valid category now goes to Slack.** Product goes to `#product-insights`; refund, delivery and other go to `#support`. Each email follows only one Slack branch per execution. Earlier PDF screenshots of the refund-only condition show the previous routing. Use the JSON files and instructions on this page for the updated routing.

Product means questions, suggestions or complaints about coffee/equipment. It is not automatically feedback; the product-insights channel collects all of these.

## Get the files

1. Download [Gemini JSON](https://github.com/becomefde/fde-support-agent/releases/download/v1.1.0/kaapi-day1-gemini.json) or [Claude JSON](https://github.com/becomefde/fde-support-agent/releases/download/v1.1.0/kaapi-day1-claude.json). Save as `.json`, not a webpage.
2. Open a **new blank workflow** in n8n. Use **More actions > Import > From file** and choose the JSON. If the optional AI-tool connector dialog appears, choose **Skip**.
3. If you imported an earlier version, this GitHub update does not update your n8n copy automatically. Import the new file into a separate workflow and select your own credentials again. Keep the old copy paused so both copies do not process the same email.
4. Exports have no credentials, presenter Sheet ID or execution data. Keep the new copy unpublished until setup is complete. Use fictional data only.

## Connect your accounts

1. **1. New [KAAPI-DEMO] Email:** select your Gmail credential. Keep the unread filter, `subject:"[KAAPI-DEMO]"`, Simplify off and one-minute polling.
2. **Google Gemini Model** or **Anthropic Claude Model:** select the matching provider credential. The prepared models are `models/gemini-3.5-flash-lite` and `claude-opus-5-5`; use an accessible model if the displayed model is unavailable, then retest. API access is separate from a chat subscription.
3. Download [Kaapi-Support-Log.csv](https://github.com/becomefde/fde-support-agent/releases/download/v1.1.0/Kaapi-Support-Log.csv). In a new blank Google spreadsheet use **File > Import > Upload** to import it, then rename the spreadsheet **Kaapi Support Log**. Google Sheets saves automatically. Row 1 must be exactly: `time`, `sender`, `category`, `draft_reply`. In **5. Log to Kaapi Support Log**, select your Google credential, document and tab. Keep Append Row and the supplied four mappings.
4. Create or choose **two channels in your own Slack workspace**: `#support` and `#product-insights`. Ensure the connected n8n app/user can post to both; invite the app if your workspace requires it.
5. Open **7a. Post #product-insights**: select your Slack credential and your product-insights channel. Open **7b. Post #support (All Other Categories)**: select the same Slack credential and your support channel. Imported names must resolve in your workspace; select another channel if you use different names.
6. Keep the prompt, parser and validation nodes. Do not rename nodes without updating expressions that reference their names.

## Understand the condition

After the Sheet append, **6. Is it Product?** compares the validated category with `product`.

- **True** -> product Slack node.
- **False** -> support Slack node, covering refund, delivery and other.
- Invalid categories or empty drafts stop before logging or Slack. A failed Sheet append also prevents downstream Slack posting.

Both Slack messages include category, sender, received time, subject, original message (up to the captured 4,000 characters) and the draft reply. Refund messages are marked **HUMAN REVIEW NEEDED**. No reply is sent to the customer, and no refund is approved.

## Test all four categories

Send the fictional inputs in [TEST-EMAILS.md](TEST-EMAILS.md) to **your connected inbox** from another account. Use fresh subjects beginning `[KAAPI-DEMO]`; leave them unread.

| Test | Category | Sheet | Exactly one Slack destination |
|---|---|---|---|
| T01 torn bag + refund request | refund | one new row | #support, HUMAN REVIEW NEEDED |
| T03 French press grind | product | one new row | #product-insights |
| T05 Hinglish late order | delivery | one new row | #support, delivery label |
| T07 interview request | other | one new row | #support, other label |

Publish only after configuring both Slack nodes, then allow the next one-minute poll. **Clicking Execute without an email can finish in milliseconds with "No trigger output"; this has not tested the AI, Sheet or Slack.** Inspect the newest execution, its processed item, the new Sheet row and the correct Slack channel. For manual testing, first fetch an email from the Gmail trigger using its displayed test control, then run the downstream workflow.

Exactly one Slack branch means one post per valid email **within one successful execution**. This teaching workflow has no persistent deduplication: repeated manual runs, retries after partial failures, or two published provider copies can produce duplicates. Use one published provider copy per inbox.

## Verification scope

The original refund-only versions passed T01/T03/T05 against both providers on 2 November. That result does not certify the new routing. The revised exports are checked for all four routing outcomes, valid expressions, matching connections and absence of saved credentials. Verify your own Gmail, model, Sheet and both Slack connections with the four live test emails before class.

## Teaching map

Four business blocks: email trigger; AI + JSON; Sheet log; category condition + Slack handoff. The implementation has 12 nodes including model, parser, field-capture and validation helpers. Day 2 and Day 3 implementations are separate forthcoming milestones.
