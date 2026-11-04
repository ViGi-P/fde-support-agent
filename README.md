# FDE workshop | Start here

**One link. Workshop preparation, downloads and attendee steps.**

## Day 2 - start here

**[Open the complete Day 2 attendee guide and downloads](day2/README.md).** Follow three stages: **01 RAG -> 02 save-ticket helper -> 03 agent with tools**. Gemini and Claude versions are available. Use your existing n8n Cloud, Gemini API and Google Sheets connections. Both Windows and Mac use the browser; no Python, terminal or local model is required for this Day 2 build.

Learn **chunking, cloud embeddings, vector retrieval, answers with sources, structured decisions and tool calling**. The agent looks up a fictional order, applies refund rules and saves a real support ticket to your Sheet. Day 2 uses **Open chat in the n8n editor** for immediate testing. Publish the ticket helper before calling it; select Auto-Map LAST in its Sheets node, and enable the four model-defined inputs after selecting the helper in the agent.

[Download the Day 2 starter ZIP](https://github.com/becomefde/fde-support-agent/releases/download/v4.0.1/Kaapi-Day2-Starter.zip) · [Day 2 test cases](day2/TEST-CASES.md).

## Day 1 - email automation

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
| **Gemini workflow — recommended for attendees** | [Download kaapi-day1-gemini.json](https://github.com/becomefde/fde-support-agent/releases/latest/download/kaapi-day1-gemini.json) | Import into your own n8n workflow |
| **Claude workflow — optional** | [Download kaapi-day1-claude.json](https://github.com/becomefde/fde-support-agent/releases/latest/download/kaapi-day1-claude.json) | Use instead of Gemini if you have Anthropic API access |
| **Google Sheets starter** | [Download Kaapi-Support-Log.csv](https://github.com/becomefde/fde-support-agent/releases/latest/download/Kaapi-Support-Log.csv) | Import into a new Google Sheet using the steps below |
| **All starter files in one ZIP** | [Download Kaapi-Day1-Starter.zip](https://github.com/becomefde/fde-support-agent/releases/latest/download/Kaapi-Day1-Starter.zip) | Extract first, then choose one JSON and import the CSV |

**Current release: v3.0.0 — use destination dropdowns.** Re-import into a NEW blank workflow. Old copies do not update automatically.

## Create your Sheet

Download the [starter CSV](https://github.com/becomefde/fde-support-agent/releases/latest/download/Kaapi-Support-Log.csv). Open a NEW blank spreadsheet in the Google account you will connect to n8n. Choose **File → Import → Upload** and import it into that blank spreadsheet. Google saves automatically. Confirm four separate cells in row 1:

| A | B | C | D |
|---|---|---|---|
| time | sender | category | draft_reply |

Select this spreadsheet and its tab from node 5's lists. No URL or tab name needs to be typed. Use your own Sheet with edit access.

## Connect and select — v3.0.0

**Import ONE JSON into a NEW blank workflow.** No Workshop Setup node, copied Sheet URLs, channel IDs, typed tab names or separate setup-check run.

1. **Gmail trigger:** select your Gmail credential. Keep Simplify OFF.
2. **Google Gemini Model / Anthropic Claude Model:** select the matching API credential.
3. **5. Log to Kaapi Support Log:** select your Google Sheets credential. Choose **Document → From list → your spreadsheet**, then **Sheet → From list → its tab**. **After choosing the tab, set Data Mode → Auto-Map Input Data to Columns LAST.** n8n can reset this option when a destination changes; keep the prepared node version.
4. In your own Slack workspace, create/open **#support** and **#product-insights**. Allow the connected n8n app/user to post in both. If needed, open channel details → **Integrations → Add apps → n8n.cloud** (or the name of your connected app). Workspace admins may need to approve it.
5. **7a. Post #product-insights:** select your Slack credential, then **Channel → From list → product-insights**.
6. **7b. Post #support (All Other Categories):** select the SAME Slack credential, then **Channel → From list → support**.

**5 credential selectors use 4 account connections.** The dropdowns store IDs automatically. Connecting an account does not automatically create the Sheet/channels or grant permission to them.

[Full setup and troubleshooting guide](day1/BUILD-GUIDE.md).

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

Models use **cloud APIs throughout**. [Day 2 exercises and setup](day2/README.md) run in n8n Cloud with no local installation. Day 3 exercises will be added as that build is completed. The [detailed preparation guide](docs/ATTENDEE-SETUP.md) links to the current instructions.

## Extra references

- [Day 1 build guide](day1/BUILD-GUIDE.md) — detailed configuration and troubleshooting.
- [Four test emails](day1/TEST-EMAILS.md) — exact fictional inputs and expected destinations.
- [Classifier prompt](day1/CLASSIFIER-PROMPT.md) — the model's rules and JSON contract.
- [Claude/Gemini comparison guide](day1/PROVIDER-COMPARISON.md) — use the same inputs and rubric.
- [Day 1 presentation PDF](Day1-Presentation.pdf) — teaching visuals. Its earlier refund-only routing screenshots are superseded by the all-category instructions above.
- [Workshop data](kaapi-data/) — fictional tickets, orders, policies, FAQs and evaluation cases for later exercises.

**Webinar-account verification:** Claude v3 and Gemini v3 both processed the approved coffee-feedback fixture through their real provider APIs. Two populated Sheet rows and the corresponding product-channel Slack posts were verified. Saved configuration was checked for five credentials, correct destinations, automatic mapping and no pinned test data. For a fresh import, choose the Sheet/tab first and set Auto-Map LAST as shown above. Attendees still need their own account permissions and live email test.
