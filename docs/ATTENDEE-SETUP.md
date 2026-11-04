> **Current Day 1 setup: v3.0.0.** Use [the connect-and-select guide](../day1/BUILD-GUIDE.md). No Workshop Setup or copied IDs/URLs.

> **Day 2 is available:** [open the Day 2 guide and downloads](../day2/README.md). RAG, structured decisions and tools run in n8n Cloud on Windows/Mac. Reuse your Gemini API and Google Sheets connections; no Python or local model is required. Claude generation is optional and still uses Gemini embeddings.

# Before the FDE webinar

Complete these checks before the live build. Use a laptop; Windows and Mac use the same Day 1 browser instructions.

## Day 1 accounts

| Service | What you need | Ready when |
|---|---|---|
| Google | A Google account with Gmail and Sheets | You can open Gmail and create a Sheet |
| n8n Cloud | Your own eligible 14-day trial or existing active instance | You can open the workflow editor |
| Google AI Studio | Access to the Gemini API and a key for your own project | A small test request succeeds with a free-tier-supported model |
| Slack | A workspace where you can authorize the n8n integration and use support and product-insights channels | You can connect Slack from your own n8n instance |
| GitHub | A browser to download the public workshop files once published | You can obtain the files; a GitHub account is only needed to fork or contribute |

The organizer's demonstration login and keys are for the presenter. Attendees use their own credentials. If your employer restricts app connections, prepare an account/workspace you are authorized to use before the event.

## Start the n8n trial

1. Visit https://n8n.io/ and choose the free-trial signup.
2. Use your own email, complete verification and any onboarding yourself.
3. Open your Cloud instance and confirm you can create a workflow.
4. Check your displayed trial expiry and execution allowance.
5. Keep the instance URL available for the session.

Current n8n documentation describes a 14-day trial with 1,000 executions. This is a time-limited trial, not a permanent free Cloud plan; eligibility and current signup conditions apply. Start shortly before the workshop so the three sessions fall inside your trial. Export your workflow before the trial ends.

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

## Prepare the Gemini API

1. Open https://aistudio.google.com/ using your own Google account.
2. Complete any account, region, age or terms requirements yourself.
3. Obtain a Gemini API key for your project and keep it private.
4. Add it directly to a Google Gemini credential in n8n. In the current Gemini template, that model is connected to both classification and parser format repair. Keep both model wires; format repair may use an extra API request, counted against provider quota.
5. Choose a model currently available to that project's free tier and run one short request before class.

A Gemini website/chat subscription is different from API access. Free API access has model and project quotas; do not assume every model is free or available. A 429 error means you should check quota and retry later, rather than repeatedly executing the workflow.

Use the fictional workshop emails only. Google's free-tier pricing page states that content may be used to improve its products.

## Other providers

The presenter also demonstrates Claude. A Gemini key cannot authenticate an Anthropic model node. Use the matching provider node and credential; keep the same output contract:

```json
{"category":"refund","draft_reply":"Two or three friendly sentences, signed Team Kaapi."}
```

The provider variants must each pass the workshop tests before being described as verified. Provider billing and API access are separate from n8n's trial.

## Before Days 2 and 3

- Day 2: follow [the browser-based exercises](../day2/README.md). Import 01 RAG, 02 ticket helper and 03 agent as separate workflows. Keep your Gemini key/project quota and Day 1 Google Sheet ready. Publish the ticket helper, set its Sheets Auto-Map LAST and enable its four model-defined inputs after selecting it in the agent. No new vector database account is required.
- Day 3: keep the same cloud API access and workshop files. The session covers evaluations, guardrails, human approval, cost and latency.
- No model downloads are part of the workshop prerequisites. Models are accessed through provider APIs.

## If you get stuck before class

Record the step, error text and your operating system. Never include an API key or password in a help request. The instructor will provide checkpoints so account setup does not hold up the whole live build.

## Official references (checked 2 November 2026)

- https://docs.n8n.io/deploy/use-n8n-cloud/start-your-free-trial
- https://docs.n8n.io/integrations/builtin/credentials/google/oauth-single-service
- https://docs.n8n.io/integrations/builtin/credentials/googleai
- https://ai.google.dev/gemini-api/docs/pricing
- https://ai.google.dev/gemini-api/docs/rate-limits
