# FDE workshop | Start here

**One link. All the Day 1 preparation and downloads.**

Build a support workflow for **Kaapi & Co.**, a fictional coffee brand. An email arrives, AI classifies it and drafts a reply, Google Sheets records it, and Slack shows the right team what needs attention.

**3-5 November 2026 · 8 PM IST · about 2.5 hours each day**

> **Attendee path: Gemini. Presenter demonstration: Claude.** Download ONE matching workflow. You do not need both API providers to follow Day 1. Use your own accounts and credentials.

**Email → AI + JSON → Google Sheets → category-based Slack handoff**

## 1. Get your accounts ready

Use a laptop, reliable internet and a modern browser. **Windows and Mac follow the same Day 1 steps.** No terminal, Python installation or model downloads are needed for Day 1.

| What | Open this link | Be ready with |
|---|---|---|
| n8n Cloud | [Start n8n Cloud](https://n8n.io/) | Your own active instance or eligible **14-day trial**, with the workflow editor open |
| Gmail | [Open Gmail](https://mail.google.com/) | An inbox you can connect to your own n8n workflow |
| Google Sheets | [Open Google Sheets](https://sheets.google.com/) | Permission to create and edit your own Sheet |
| Gemini API — attendee route | [Get/manage a Gemini API key](https://aistudio.google.com/api-keys) | Your own project key and an available model; keep the key private |
| Slack | [Create/open a Slack workspace](https://slack.com/get-started) | Permission to connect n8n and post to **#support** and **#product-insights** |
| Claude API — optional alternative | [Get/manage a Claude API key](https://platform.claude.com/settings/keys) | Anthropic API access/credits if choosing the Claude JSON |

**n8n signup:** open n8n, choose the free Cloud trial, register with your own email, verify it and finish onboarding. Check the trial expiry shown in your account. The [standard Cloud trial is 14 days](https://docs.n8n.io/deploy/use-n8n-cloud/start-your-free-trial/); provider API access is separate from this trial.

**Gemini key:** sign in to Google AI Studio, open API keys, create or select your own project/key and copy it directly into the **Google Gemini credential in n8n**. Follow any account/terms requirements yourself. Choose a model available to your project's free tier; quotas and eligibility apply. [Official key instructions](https://ai.google.dev/gemini-api/docs/api-key) · [Pricing and free-tier availability](https://ai.google.dev/gemini-api/docs/pricing) · [Quotas](https://ai.google.dev/gemini-api/docs/rate-limits).

**Claude alternative:** create a key in the Claude Console and add it to the **Anthropic credential in n8n**. A Claude chat subscription does not supply an API key or API credit. [Official key instructions](https://platform.claude.com/docs/en/get-api-key).

Never paste keys or passwords into Slack, GitHub, Sheets or a help screenshot. Use fictional workshop data when testing.

## 2. Download the files

Click a link below to download the file attachment. Your browser may ask where to save it. Use the downloaded `.json` in n8n and the `.csv` in Google Sheets. If you choose the ZIP, extract it first.

| File | Direct download | What to do with it |
|---|---|---|
| **Gemini workflow — recommended for attendees** | [Download kaapi-day1-gemini.json](https://github.com/becomefde/fde-support-agent/releases/download/v1.1.0/kaapi-day1-gemini.json) | Import into your own n8n workflow |
| **Claude workflow — optional** | [Download kaapi-day1-claude.json](https://github.com/becomefde/fde-support-agent/releases/download/v1.1.0/kaapi-day1-claude.json) | Use instead of Gemini if you have Anthropic API access |
| **Google Sheets starter** | [Download Kaapi-Support-Log.csv](https://github.com/becomefde/fde-support-agent/releases/download/v1.1.0/Kaapi-Support-Log.csv) | Import into a new Google Sheet using the steps below |
| **All starter files in one ZIP** | [Download Kaapi-Day1-Starter.zip](https://github.com/becomefde/fde-support-agent/releases/download/v1.1.0/Kaapi-Day1-Starter.zip) | Extract first, then choose one JSON and import the CSV |

**Latest JSON update: 3 November — every valid category now appears in Slack.** Product goes to `#product-insights`; refund, delivery and other go to `#support`. Configure both Slack posting nodes. Older imported workflows do not update automatically.

## 3. Turn the CSV into your Google Sheet

1. Download **Kaapi-Support-Log.csv** above. It contains only the required headers; an empty log is intentional.
2. Open a **new blank Google spreadsheet** from [Google Sheets](https://sheets.google.com/).
3. Choose **File → Import → Upload**, browse for the downloaded CSV and select it.
4. Import into this new blank spreadsheet. If choosing **Replace spreadsheet**, use it only on the blank spreadsheet you just created. Keep automatic separator detection and click **Import data**.
5. Rename the spreadsheet **Kaapi Support Log**. Confirm row 1 has four separate columns:

   | A | B | C | D |
   |---|---|---|---|
   | time | sender | category | draft_reply |

6. Google Sheets saves automatically to your Drive. **You do not need to press Save.** Keep the spreadsheet link and note the tab name displayed at the bottom.
7. In n8n's **5. Log to Kaapi Support Log** node, select your Google credential, this spreadsheet and its actual tab. Keep **Append Row** and the four supplied mappings. Importing the CSV alone does not connect it to n8n.

If the CSV import is unavailable, type those exact four headers into row 1 of a blank Sheet; the result is the same. The fictional `orders.csv` and `tickets.csv` are future exercises, **not** this Day 1 output log.

## 4. Import and connect your workflow

1. In your own n8n Cloud instance, create a **new blank workflow**.
2. Open **More actions → Import → From file** and choose ONE JSON. If the optional AI-tool connector dialog appears, choose **Skip**.
3. On **1. New [KAAPI-DEMO] Email**, select your Gmail credential. Keep **Simplify off**, the unread filter and `[KAAPI-DEMO]` subject filter. Polling is once per minute.
4. On **Google Gemini Model** or **Anthropic Claude Model**, select the matching API credential. If the prepared model is unavailable in your project, choose an accessible text model and retest.
5. Connect **5. Log to Kaapi Support Log** to the Sheet created above.
6. Create or choose **#support** and **#product-insights** in your own Slack workspace. Ensure the n8n integration can post to both; invite it if your workspace requires that.
7. On **7a. Post #product-insights**, select your Slack credential and product channel. On **7b. Post #support (All Other Categories)**, select your Slack credential and support channel. **Both nodes need a credential and valid channel.**
8. Save your configured workflow. Keep only **one provider workflow published per inbox**; pause any old imported copy before enabling a replacement.

The JSON exports intentionally contain no saved credentials, presenter Sheet ID or execution data. Importing a new version does not update an existing n8n workflow. [Full build instructions and checkpoints](day1/BUILD-GUIDE.md).

## 5. Check that it works

Use a second email account to send the [four ready-to-copy fictional emails](day1/TEST-EMAILS.md) to **your own connected Gmail inbox**. Use fresh subjects starting `[KAAPI-DEMO]` and leave the messages unread. After configuring the workflow, publish it and allow the next minute's poll.

| Email | Expected category | Google Sheets | Slack destination |
|---|---|---|---|
| Torn bag, asks for a refund | refund | One new row | **#support**, marked HUMAN REVIEW NEEDED |
| French press grind question | product | One new row | **#product-insights** |
| Hinglish late-order query | delivery | One new row | **#support**, labelled delivery |
| Student magazine interview request | other | One new row | **#support**, labelled other |

Product includes questions, suggestions and complaints about the coffee/equipment; it is not automatically feedback. Slack displays the sender, category, original message and AI draft. **The workflow drafts replies for human review. It does not send customer replies or approve refunds.**

**"Successful" in milliseconds?** Open the execution and inspect the Gmail trigger. **"No trigger output" means no email was supplied.** Send a fresh matching email, leave it unread, allow the next poll and check the newest execution plus the actual Sheet and Slack outputs.

One successful execution follows one Slack branch per valid email. Repeated manual runs, partial-failure retries or two active provider copies can create duplicates; this teaching workflow has no persistent deduplication. Invalid AI output stops before logging/Slack, and a failed Sheet append prevents its downstream Slack post.

## 6. What you will build across three days

| Day | Outcome | Concepts you will practise |
|---|---|---|
| **Day 1 — connect the workflow** | Email classification, safe reply drafts, a Sheet log and category-based Slack routing | Triggers, prompts, structured JSON, validation, credentials, field mapping and conditions |
| **Day 2 — add business context** | Use company knowledge and order tools | RAG, chunks, API embeddings, retrieval and tool calling |
| **Day 3 — test and operate it** | Check quality, human approval and cloud operating behaviour | Evals, guardrails, cost, latency and failure handling |

Models use **cloud APIs throughout**. Days 2 and 3 executable exercises and tested setup commands will be added here as those builds are completed. You do not need to install Python before Day 1; Day 2's planned Python/editor setup is described in [the detailed preparation guide](docs/ATTENDEE-SETUP.md).

## Extra references

- [Day 1 build guide](day1/BUILD-GUIDE.md) — detailed configuration and troubleshooting.
- [Four test emails](day1/TEST-EMAILS.md) — exact fictional inputs and expected destinations.
- [Classifier prompt](day1/CLASSIFIER-PROMPT.md) — the model's rules and JSON contract.
- [Claude/Gemini comparison guide](day1/PROVIDER-COMPARISON.md) — use the same inputs and rubric.
- [Day 1 presentation PDF](Day1-Presentation.pdf) — teaching visuals. Its earlier refund-only routing screenshots are superseded by the all-category instructions above.
- [Workshop data](kaapi-data/) — fictional tickets, orders, policies, FAQs and evaluation cases for later exercises.

**Verification:** the original refund-only versions passed three live cases with both providers on 2 November. The updated JSONs pass local connection, four-category route, expression and credential-removal checks; the updated routes still need live verification in each learner's own connected accounts. Model availability and free-tier quota vary by project.
