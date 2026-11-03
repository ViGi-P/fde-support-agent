# Day 1 v3 — Connect and select

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

## Test a new email

1. Open **1. New [KAAPI-DEMO] Email** and choose **Fetch Test Event / Test this trigger** (label varies). Send a NEW email from a second inbox with **[KAAPI-DEMO]** in the subject while it listens. Leave it unread.
2. Confirm Gmail returns an item with sender, subject and plain text.
3. Close the node and execute the workflow using the fetched event. If it listens for another email, send a fresh matching email while it waits.
4. Inspect node 4's category/draft, the actual Google Sheet and actual Slack message. Test [all four fictional emails](TEST-EMAILS.md).
5. Publish only ONE provider workflow per inbox. Unpublish the old copy before enabling a replacement. Remove any pinned/mock data from your live workflow.

| Category | Expected result |
|---|---|
| product — feedback, questions or suggestions | One Sheet row; product Slack channel |
| refund | One row; support, HUMAN REVIEW NEEDED |
| delivery | One row; support, labelled delivery |
| other | One row; support, labelled other |

The workflow drafts replies for human review. It does not send customer emails or approve refunds. Repeated runs/retries or multiple published copies can create duplicates; persistent deduplication is not included in this teaching workflow.

## Connection help

- **Sheet absent from list:** check which Google account is connected. Create/import the Sheet in that account, or grant it edit access. Refresh/reopen the picker after access changes.
- **Tab absent:** choose the spreadsheet FIRST, then its tab from the Sheet dropdown.
- **Google permission/authentication error:** read the original error in node 5's OUTPUT. Check edit access or reconnect the intended Google account if authorization expired. Changing AI settings will not repair Google access.
- **Slack channel absent / channel_not_found / not_in_channel:** use the same workspace as your Slack credential, select the channel from list, and add the connected app/user to it. Both posting nodes need a selected channel.
- **Values to Send:** an old or modified append node is in use. Import v3 into a NEW blank workflow; keep its prepared append-node version and automatic Data Mode.
- **SETUP: sheet_url / Google Sheets could not be read:** these messages come from the previous v2 verification layer. v3 has no Workshop Setup or custom Google error wrapper.
- **Successful in milliseconds / no email item:** the Gmail trigger supplied no input. Send a NEW matching unread email while testing, or publish and allow the next one-minute poll.
- **Model/429/billing error:** check API model availability and quota/credits. A chat subscription is separate from API access.

Use this guide for v3 configuration; older PDF screenshots may show previous setup. The instructor flow is business need → connect → select from lists → test product email → inspect draft, Sheet and Slack → repeat refund/delivery → attendee practice → human-review discussion.
