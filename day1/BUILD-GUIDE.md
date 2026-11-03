# Day 1 — import, connect, check, test

**Use v2.0.0. Import into a NEW blank workflow.** Old imported copies do not update automatically. Keep the old copy unpublished when enabling its replacement. Choose Gemini OR Claude for your inbox.

The outcome: a new customer email becomes one category and one reply draft, one Google Sheet row and one Slack handoff. Product questions, suggestions and feedback go to the product channel. Refund, delivery and other go to support. A human reviews every draft; no customer email is sent.

## Step 1 — create your Sheet

Download [Kaapi-Support-Log.csv](https://github.com/becomefde/fde-support-agent/releases/latest/download/Kaapi-Support-Log.csv). In a NEW blank Google spreadsheet choose **File → Import → Upload**. Import the CSV into that blank spreadsheet. Confirm A1:D1 is exactly:

| A | B | C | D |
|---|---|---|---|
| time | sender | category | draft_reply |

Keep the Sheet URL and the exact tab name shown at the bottom. The spreadsheet title and bottom tab name are different things. Google saves automatically. You can type those four headers yourself instead of importing the CSV.

## Step 2 — prepare Slack

In YOUR workspace create/open **#support** and **#product-insights**. Connect n8n to this same workspace. Add the connected n8n app to both channels: open the channel → channel details → Integrations → Add apps → n8n.cloud (the name shown by your connection). If your connection posts as a Slack user, that connected user must belong to both channels. Private channels also require an invitation. Workspace admins may need to approve app installation.

For each channel open channel details → About and copy the **Channel ID** (starts C, or G for some private channels). You may instead copy the full channel link. A name such as `#support` is not an ID. Names and IDs from the presenter's workspace will not work in your workspace.

## Step 3 — import ONE workflow

1. Download [Gemini JSON](https://github.com/becomefde/fde-support-agent/releases/latest/download/kaapi-day1-gemini.json) or [Claude JSON](https://github.com/becomefde/fde-support-agent/releases/latest/download/kaapi-day1-claude.json).
2. n8n → New workflow → top **More actions → Import → From file**. Choose the downloaded JSON. Skip optional AI-tool setup if offered.
3. Open each node below and select the named account. Create each account connection once, then reuse it. Existing credentials may be selected automatically: confirm they are YOUR intended accounts.

| Node(s) | Credential to select |
|---|---|
| 1. New [KAAPI-DEMO] Email | Your Gmail account |
| Google Gemini Model OR Anthropic Claude Model | Your corresponding API credential |
| Check Sheet headers AND 5. Log to Kaapi Support Log | The SAME Google Sheets account with edit access |
| Check product channel, Check support channel, 7a. Post #product-insights, 7b. Post #support | The SAME Slack account/workspace |

There are **8 credential selectors, using 4 account connections**. API keys belong only in n8n Credentials. Keep Gmail Simplify OFF. Do not edit the prepared Sheet destination expressions, mapping or Slack channel expressions.

## Step 4 — fill ONE Workshop Setup node

Open **Workshop Setup** and fill its four values:

| Field | Paste |
|---|---|
| sheet_url | Your Google spreadsheet URL |
| sheet_tab | Exact bottom tab name, for example Sheet1 or Kaapi-Support-Log |
| product_channel_id | Your product channel ID or full channel link |
| support_channel_id | Your support channel ID or full channel link |

Close the node. All downstream destinations come from these settings. **Do not choose a different document/tab inside node 5.** This avoids the picker action that previously cleared column mappings. The append node uses the supported legacy v3 automatic-data mode, without the newer Values to Send resource mapper. Keep its prepared version and settings for this workshop.

## Step 5 — Check setup BEFORE sending an email

Use the arrow beside **Execute workflow** → **From Check setup - click Execute workflow**. Choosing this menu entry starts the check.

Open **READY - setup checks passed**. Its output should say **READY — Sheet headers and both Slack channels verified**. This check reads the Sheet and channel information. It does not call the AI model, append a row or send a Slack message. It verifies read access, headers, channel visibility, membership and archive status. The first email below verifies write/post access and the API model.

If a check stops, fix the named setup field/account and run the check again. Do not ignore the error or change AI validation to continue on error.

## Step 6 — test a real NEW email

1. Open **1. New [KAAPI-DEMO] Email** → **Fetch Test Event / Test this trigger** (the label can vary). Send a NEW matching email from a second inbox while the trigger is listening. Leave it unread in the connected Gmail inbox.
2. Confirm the trigger returns at least one item, with sender, subject and plain text. If the trigger finds no item, the rest cannot run.
3. Close the node, choose **Execute workflow → From 1. New [KAAPI-DEMO] Email** to process the fetched email. If n8n waits for another email instead, send a fresh matching email while it listens.
4. Inspect **4. Keep Sender, Time & Result**, the actual Google Sheet and the actual destination Slack channel. One valid input email should produce one row and one Slack message.
5. Test the four cases in [TEST-EMAILS.md](TEST-EMAILS.md). Keep fixture/mock/pinned data out of your live workflow.
6. Once your first end-to-end test passes, publish this ONE provider workflow. New unread matching emails are polled once per minute. Leave the other provider and old copies unpublished.

| Test | Sheet | Slack |
|---|---|---|
| Torn bag, requests refund | One row, refund | Support, HUMAN REVIEW NEEDED |
| Burnt coffee feedback / grind question | One row, product | Product channel |
| Hinglish late-order query | One row, delivery | Support |
| Student magazine interview | One row, other | Support |

## If a check fails

| What you see | Do this |
|---|---|
| SETUP: sheet_url / sheet_tab | Fill Workshop Setup; use the bottom tab name, not the file title |
| Google access/header error | Select the intended Google credential on BOTH Sheet nodes. Give that Google account edit access. Check the exact four headers in row 1, starting A1 |
| SETUP: Slack cannot access… / channel_not_found | Use a Channel ID from the SAME workspace as ALL FOUR Slack credentials. Add the connected app/user to the channel. Public existence alone is insufficient |
| Invalid model / quota / billing | Choose an available model in your API project; check its quota/credits. A chat subscription is separate from API access |
| AI output format error | Gemini has a strict parser and format-repair fallback. A repair may use an extra request. Persistent invalid output must stop before logging/posting; inspect the AI response |
| Values to Send error | You are using an old copy or changed/upgraded the prepared append node. Import v2.0.0 into a NEW blank workflow and follow this guide |
| Successful in milliseconds | Check whether you ran setup-only or the Gmail trigger returned no email. READY checks are not an email-processing run |
| Duplicate rows/messages | Unpublish extra provider/old workflows. Repeated manual runs and retries can repeat side effects; this teaching workflow has no persistent deduplication |

## Instructor flow

Explain the business need → show the three-day outcome → connect four accounts → fill Workshop Setup → run setup checks → test one email → inspect category + draft → inspect Sheet → inspect the correct Slack channel → repeat refund/delivery/product → let attendees test → discuss failures and human review. Keep the implementation/check nodes collapsed while teaching the main business flow.

v2 replaces the earlier destination setup instructions and screenshots in the PDF/deck. Use this online guide for configuration. Models run through cloud APIs on every day of the workshop.
