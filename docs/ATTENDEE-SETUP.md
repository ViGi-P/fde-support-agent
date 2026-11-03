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

## Prepare Google Sheets and connections

Download the [Google Sheets starter CSV](https://github.com/becomefde/fde-support-agent/releases/latest/download/Kaapi-Support-Log.csv). Open a new blank Google spreadsheet, use **File > Import > Upload**, and import the CSV into the blank spreadsheet. Rename it `Kaapi Support Log`; Google Sheets saves automatically to Drive. Confirm these exact headers in row 1:

`time | sender | category | draft_reply`

After choosing the document and tab in n8n, set **Mapping Column Mode = Map Automatically** on node 5. The supplied Edit Fields node already outputs these four exact names. Empty manual Values to Send cause the error "At least one value has to be added under Values to Send".

In n8n Cloud, use the managed **Sign in with Google** connection for Gmail and Sheets. Follow the displayed authorization prompts yourself. This supported path does not require creating a custom Google OAuth client in Cloud Console.

## Prepare Slack channels

Create or choose `#support` and `#product-insights` in your own workspace. Make sure the n8n integration can post to both. After importing the latest JSON, select your Slack credential and channel on **both** Slack posting nodes. Product goes to product-insights; refund, delivery and other go to support.

## Prepare the Gemini API

1. Open https://aistudio.google.com/ using your own Google account.
2. Complete any account, region, age or terms requirements yourself.
3. Obtain a Gemini API key for your project and keep it private.
4. Add it directly to a Google Gemini credential in n8n.
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

- Day 2: keep your cloud API access available. Python 3.11 and an editor are planned for the knowledge and tool exercises; tested packages and Windows/Mac commands will be supplied with that implementation.
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
