# Day 2 — Give Kaapi knowledge, decisions and tools

**Current version: v4.0.2 — ticket input fix + Slack alerts.**

Build one support agent that answers from company documents, looks up an order, checks refund rules, saves a ticket in Google Sheets and alerts your Slack support team. Use **n8n Cloud in your browser** on Windows or Mac.

**The flow:** Customer chat → decision → retrieve knowledge → use tools → save ticket in Sheets → notify Slack.

## Already imported an older Day 2 version?

Replace **02 Ticket Helper** and your provider's **03 Agent** with the downloads below. Reconnect their credentials. Publish 02; select it in 03 create_ticket, then enable its four **Defined by agent** inputs. **01 RAG does not need replacing.** Existing imports do not update automatically.

## 1. Have these ready

- Your own active n8n Cloud account.
- A Gemini API credential with access/quota for the chat and embedding models. Claude users need Anthropic API access too; both routes use Gemini for embeddings.
- Your Day 1 Google Sheet and Google Sheets connection. Row 1 must contain four headers: `time`, `sender`, `category`, `draft_reply`.
- Your Slack connection and one channel such as **#support**. Reuse your Day 1 channel. The connected app/user must be able to post there.

No local model, terminal or separate vector database account is needed. Keep API keys in n8n credentials. Use fictional workshop data and your own API project.

## 2. Download the files

Choose **Gemini OR Claude**, and import each JSON into a separate blank workflow using **… → Import from File**.

| Import order | Gemini | Claude alternative |
|---|---|---|
| 01 — Learn from company knowledge | [Download RAG](https://github.com/becomefde/fde-support-agent/releases/download/v4.0.2/kaapi-day2-01-rag-gemini.json) | [Download RAG](https://github.com/becomefde/fde-support-agent/releases/download/v4.0.2/kaapi-day2-01-rag-claude.json) |
| 02 — Save ticket and notify Slack | [Download shared Ticket Helper](https://github.com/becomefde/fde-support-agent/releases/download/v4.0.2/kaapi-day2-02-ticket-tool.json) | Same helper |
| 03 — Make decisions and use tools | [Download Agent](https://github.com/becomefde/fde-support-agent/releases/download/v4.0.2/kaapi-day2-03-agent-gemini.json) | [Download Agent](https://github.com/becomefde/fde-support-agent/releases/download/v4.0.2/kaapi-day2-03-agent-claude.json) |

**[Download the complete Day 2 ZIP](https://github.com/becomefde/fde-support-agent/releases/download/v4.0.2/Kaapi-Day2-Starter.zip)** · [Day 1 Sheet starter CSV](https://github.com/becomefde/fde-support-agent/releases/download/v4.0.2/Kaapi-Support-Log.csv)

Extract the ZIP before importing JSON. If you missed Day 1, create a blank Google Sheet, then use **File → Import → Upload** to import the CSV. Check the four headers are separate cells in row 1.

## 3. Exercise 01 — Answer using company knowledge

1. Open **01 RAG**. Select Gemini in **Embeddings**, and your chosen provider in **Reply Model**.
2. Save. Click **Execute workflow** to run the upper **LOAD KNOWLEDGE** branch. Wait for **C. Knowledge ready**.
3. Click **Open chat**. Ask: **Can I return an opened bag of coffee?**
4. Check the answer mentions arrival damage, reporting within **48 hours**, a **photo**, and the source `policies.md#Returns`.
5. Open **Retrieve top 3 chunks** to see the text retrieved from the company knowledge.

The sample policies and FAQ are already embedded in node A. No document upload is required. They are chunked, embedded and retrieved; the answering prompt does not contain a fixed policy answer.

**If retrieval is empty, run LOAD KNOWLEDGE again.** The in-memory store is temporary. Use the same embedding model for loading and querying; reload after changing it. Loading 01 does not load 03.

## 4. Exercise 02 — Connect Sheets and Slack

The helper has one clear main path:

**Validate ticket → Save Sheet row → Notify Slack → Confirm result**

1. Open **02 Save Support Ticket**.
2. In **Append ticket to your Day 1 Sheet**, select your Google Sheets credential, **Document → From list**, then **Sheet → From list**. Choose your own Sheet and tab.
3. **LAST: set Data Mode → Auto-Map Input Data to Columns.** Selecting a document/tab can reset the mapping. No Sheet URL needs to be pasted.
4. In **Notify support in Slack**, select your Slack credential and **Channel → From list → #support** (or your own channel). No channel ID needs to be copied.
5. Save. Click **Execute workflow from TEST HELPER - fictional sample**. This deliberate test writes one labelled `[SETUP TEST]` Sheet row and posts one Slack alert.
6. Open **Confirm Sheet and Slack**. Check `ticket_saved: true`, `slack_notified: true` and the same `KAAPI-…` ticket ID in the actual Sheet and Slack.
7. Click **Publish**, confirm the version and check the helper says **Published**.

The Sheet remains the ticket register. Its existing four columns are preserved; `draft_reply` contains the ticket ID, priority, open/review status, summary, order reference and draft. Slack receives the ticket ID, priority, category, order, summary and draft so a human can act. No customer email or refund is sent.

## 5. Exercise 03 — Let the agent use tools

1. Open **03 Agent**. Select your reply-model credential and Gemini embedding credential.
2. Open **create_ticket → Workflow → From list** and select your published **02 Save Support Ticket**.
3. **After selecting the workflow**, click the sparkle beside **summary**, **priority**, **category** and **draft_reply**. All four must say **Defined by agent**. Selecting a different helper can reset these mappings.
4. Save. Click **Execute workflow** to load this workflow's knowledge. Wait for **C. Knowledge ready**.
5. Click **Open chat** and run the tests below. Include the order ID in each order-related message; each message is independent.

| Paste into Open chat | Expected result |
|---|---|
| Which grind should I use for a French press? | Coarse grind, FAQ source, no unnecessary support ticket. |
| Bhai mera order KC1051 abhi tak nahi aaya, kab tak aayega? | Delivery route; order is shipped; no invented arrival date; normal ticket in Sheets and Slack. |
| Third time asking. KC1063 was wrong AND late. Refund me now or I'm posting on Twitter. | Refund route; high frustration; order lookup and eligibility check; HIGH ticket in Sheets and Slack; human approval required for INR 8,999. |

Open **7. Reply sources and tool trace** to inspect the decision, retrieved evidence and tool calls. A green agent node alone is not proof of a saved ticket; check the helper result and actual destinations.

### The three tools

- **get_order:** exact order-ID lookup in the fictional orders fixture.
- **check_refund_eligibility:** code checks dated evidence, damage/photo conditions and the INR 5,000 approval threshold. The model cannot override it.
- **create_ticket:** validates four ticket fields, writes Sheets, then notifies Slack. It reports those two outcomes separately.

Unopened items: within **7 days**. Arrival damage: within **48 hours**, with a **photo**. Amounts **above INR 5,000** need human approval. No tool approves or issues a refund. Evidence comes from [explicit fictional fixtures](refund-evidence.json), not from order dates or model guesses.

## 6. If something fails

| What you see | What to do |
|---|---|
| Missing summary/draft/priority/category | In 03 create_ticket select the correct published helper, then enable ALL FOUR Defined by agent fields. v4.0.2 also accepts supplied JSON nested under input, query or ticket. It does not invent missing data. |
| Sheet Fields to Send error | Choose document and tab first; then set Auto-Map LAST. Check the four exact headers. |
| Sheet permission error | Inspect the original Google Sheets error. Check the selected Google account and edit access. Slack is not called before the Sheet save succeeds. |
| Slack channel_not_found / not_in_channel | Select the channel FROM LIST using the correct workspace credential. Ensure the connected user/app is a member and can post; invite the app if necessary. |
| ticket_saved:true, slack_notified:false | The row is saved but notification failed or is unconfirmed. The helper reports the saved ticket ID and does not claim the team was notified. Fix Slack. Do not repeat the agent request just to notify, because a full new request creates another ticket. |
| No knowledge / empty retrieval | Execute LOAD KNOWLEDGE in the workflow you are using, then reopen chat. Reload after a restart. |
| Helper is inactive / cannot execute | Save AND Publish 02, then select it in create_ticket. |
| Model/embedding 404 or permission error | Select an available model for your API project. Loading and querying must use the same embedding model. |
| 429 / quota exceeded | Pause and check provider quota/billing. Avoid repeatedly rerunning write requests. |

**Retries:** only the Slack node retries its own failed send (up to three attempts). Those attempts do not repeat the Sheet append. A full new agent/helper run can create another ticket; persistent request deduplication is outside this workshop. If a Slack timeout leaves delivery uncertain, check the channel before sending again.

**Outcome fields:** `ticket_saved` confirms the Sheet write; `slack_notified` confirms the Slack response; `ok:true` means both. The final reply must use the returned ticket ID and must not claim an escalation before notification is confirmed.

## 7. What you learn

**Chunking → embeddings → retrieval → grounded answers → structured decisions → tool calling → deterministic rules → saved tickets → team notifications.**

The triage model is your selected cloud LLM. The frustration score is an estimated 1–5 rubric. This is not a Laya implementation or benchmark. There is no local-model installation.

The Simple Vector Store is temporary and intended here for fictional teaching data. Order lookup has no customer identity verification. Keep editor chat private; a public chat deployment is not needed. Day 3 adds evaluation and operational checks.

Reference: [n8n workflow-tool inputs](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolworkflow/) · [n8n Slack node](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.slack/)
