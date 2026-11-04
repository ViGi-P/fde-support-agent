# Day 2 - Give Kaapi knowledge and tools

Today you will build an agent that answers from company documents, looks up an order, checks refund rules and saves a support ticket. **Use n8n Cloud in your browser on Windows or Mac.** No Python, terminal, local model or separate vector database account is needed for these exercises.

**Follow this order: 01 RAG -> 02 ticket-saving helper -> 03 agent with tools.** Keep each in a separate workflow. Your Day 1 workflow can stay as it is. Day 2 uses n8n's editor chat for immediate testing; it does not wait for an email.

## 1. Have these ready

- Your own active n8n Cloud instance.
- Your Gemini API credential from Day 1. It is used for **embeddings as well as generation**. Your project needs access/quota for the configured chat model and `gemini-embedding-001`.
- Your Google Sheets credential and Day 1 log, with `time`, `sender`, `category`, `draft_reply` in four separate cells in row 1.
- Optional: Anthropic API access/credits for the Claude versions. **The Claude versions also use Gemini for embeddings**, so keep the Gemini connection.

Use fictional workshop questions and orders. API keys belong in n8n credentials. Each participant uses their own key/project; provider quotas and charges apply. If a model is unavailable, select an available model in the appropriate node; use the same embedding model for loading and querying, and reload the knowledge after changing it.

## 2. Download your files

These links download attachments. Import the `.json` files into **new, separate blank workflows** with the workflow menu **... -> Import from File**. Extract the ZIP before importing. Importing does not connect your accounts automatically; check the selected credentials.

| Order | Attendee Gemini route | Claude alternative |
|---|---|---|
| 01 - knowledge and sources | [Download RAG - Gemini](https://github.com/becomefde/fde-support-agent/releases/download/v4.0.0/kaapi-day2-01-rag-gemini.json) | [Download RAG - Claude](https://github.com/becomefde/fde-support-agent/releases/download/v4.0.0/kaapi-day2-01-rag-claude.json) |
| 02 - shared ticket helper | [Download ticket tool](https://github.com/becomefde/fde-support-agent/releases/download/v4.0.0/kaapi-day2-02-ticket-tool.json) | Use the same helper |
| 03 - decisions and tools | [Download agent - Gemini](https://github.com/becomefde/fde-support-agent/releases/download/v4.0.0/kaapi-day2-03-agent-gemini.json) | [Download agent - Claude](https://github.com/becomefde/fde-support-agent/releases/download/v4.0.0/kaapi-day2-03-agent-claude.json) |

[Download all Day 2 files in one ZIP](https://github.com/becomefde/fde-support-agent/releases/download/v4.0.0/Kaapi-Day2-Starter.zip) · [Sheet starter, only if you missed Day 1](https://github.com/becomefde/fde-support-agent/releases/download/v4.0.0/Kaapi-Support-Log.csv)

Choose one provider's RAG and agent files, plus the shared helper. Gemini attendees need three workflow imports in total. You can rename them, but use names you can recognise in the workflow list.

## 3. Exercise 01 - answer from company knowledge

1. Import **01 RAG - Gemini** into a new blank workflow.
2. Open **Embeddings - select Gemini credential**. Select your Day 1 Gemini credential. Keep the prepared embedding model if your project supports it.
3. Open **Reply Model - Gemini**. Select the same Gemini credential and a supported chat model.
4. Save the workflow with **Ctrl+S / Command+S**.
5. Close any node panel. Click **Execute workflow**. This runs the upper **LOAD KNOWLEDGE** branch. Wait for **C. Knowledge ready** to turn green.
6. Click **Open chat** at the bottom of the editor. Type: **Can I return an opened bag of coffee?** Press Enter.
7. The answer should include the arrival-damage exception, reporting within **48 hours**, and a **photo**, citing `policies.md#Returns`.
8. Open **2. Retrieve top 3 chunks** to see what was found. Open **3. Show retrieved context** to inspect the exact source text supplied to the model.

The upper branch contains the fictional policies/FAQs, converts sections to embeddings and stores them. The lower branch embeds the question, retrieves three relevant chunks and asks the model to answer from that evidence. No policy answer is hard-coded into the answering prompt.

**Checkpoint:** a correct answer with a relevant source. Try **How long does a refund take?** and **Which grind should I use for a French press?**

The documents are embedded in node A, so no upload is required. To experiment, edit one sample policy there, reload knowledge, then repeat the question. In-memory storage is temporary: **after an n8n restart or empty retrieval, execute LOAD KNOWLEDGE again**. Each imported workflow has its own automatic memory key. Loading knowledge in 01 does not load it for 03.

## 4. Exercise 02 - configure the real ticket-writing tool

1. Import **02 Save Support Ticket** into another new blank workflow.
2. Open **Append ticket to your Day 1 Sheet**.
3. Select your **Google Sheets credential**.
4. Choose **Document -> From list -> your own Day 1 spreadsheet**.
5. Choose **Sheet -> From list -> the tab containing your four headers**. Your spreadsheet need not be named Kaapi Support Log.
6. **LAST, set Data Mode -> Auto-Map Input Data to Columns.** Choosing a document/tab can reset this option. Do this after both selections.
7. Close the panel, **save**, then click **Publish** and confirm the version. The helper must show **Published** before the agent can call it. You do not need to manually execute its trigger.

If you missed Day 1, create a blank Google Sheet and import the supplied CSV using **File -> Import -> Upload**. Confirm the four headers first.

**What it does:** accepts summary, priority, category and draft; validates them; writes a real row; returns a ticket ID only after the append succeeds. It uses the same four columns as Day 1. The `draft_reply` cell contains a ticket ID, priority, summary and the draft. `sender` is deliberately the fictional `day2-demo@example.com`.

## 5. Exercise 03 - decisions, retrieval and tools

1. Import **03 Agent with Tools - Gemini** into a third new blank workflow.
2. Select your Gemini credential in **Reply Model - Gemini** and **Embeddings - select Gemini credential**. The reply model serves triage, format repair and the agent.
3. Open **create_ticket**. Under **Workflow -> From list**, choose your saved **02 Save Support Ticket** helper.
4. **After choosing the workflow**, n8n refreshes and clears its input mappings. Click the sparkle button **Let the model define this parameter** beside **summary**, **priority**, **category** and **draft_reply**. **All four must say Defined by agent.** You do not have to type expressions.
5. Close the panel and save.
6. Click **Execute workflow** and wait for this workflow's **C. Knowledge ready** to turn green.
7. Click **Open chat** and run the three tests below. Each message is independent; include the order ID in each order-related question.

| Copy this message into chat | What to verify |
|---|---|
| Which grind should I use for a French press? | Product route; coarse grind with a FAQ source; no unnecessary order lookup or ticket |
| Bhai mera order KC1051 abhi tak nahi aaya, kab tak aayega? | Delivery route; `get_order` returns shipped; no invented arrival date; ticket saved in your Sheet |
| Third time asking. KC1063 was wrong AND late. Refund me now or I'm posting on Twitter. | Refund route; high frustration; order lookup; eligibility check; HIGH ticket; human approval because the order is INR 8,999 |

**Checkpoint:** inspect the actual Sheet. A saved ticket has a `KAAPI-...` ID and a populated draft. A green agent node alone is not proof of a saved row. In **7. Reply sources and tool trace**, inspect `decision`, `retrieved_chunks` and `tool_trace`. The n8n execution also shows each tool's inputs and outputs.

The three tools are:

- **get_order:** exact order-ID lookup in the embedded fictional `orders.csv` fixture. Unknown IDs return not found.
- **check_refund_eligibility:** code applies the return window, damage/photo evidence and approval threshold. The model cannot change the rule by requesting a different amount or inventing dates.
- **create_ticket:** calls the helper and writes to the selected Sheet. It does not issue money, send a customer email or post to Slack.

**Policy thresholds:** unopened within 7 days; arrival damage within 48 hours with a photo; refunds above INR 5,000 need human approval. A value of exactly INR 5,000 does not trigger that threshold. All refunds remain drafts for human review in this workshop.

The added [refund evidence fixture](refund-evidence.json) explicitly supplies fictional delivery/report dates and damage/photo facts for selected orders. These facts do not come from `order_date` or the model. Tests use those fixed report dates, so the same case works on different workshop dates. Unlisted orders have unknown evidence and must request more information.

## 6. Extra tests and troubleshooting

[Copy-paste test cases and expected outcomes](TEST-CASES.md).

| Symptom | Action |
|---|---|
| Chat does nothing / no question was supplied | Use **Open chat** inside this workflow's editor; type a message and press Enter. The Execute button alone loads knowledge. |
| Empty retrieval / knowledge missing | Close chat, run the upper LOAD KNOWLEDGE branch, then open chat again in the same workflow. Recheck embedding credential/model. |
| Model or embedding 404/permission error | Select a model your API project supports. Generation and embeddings have separate model settings. Keep the embedding model identical for insert and retrieval, then reload. |
| 429 / resource exhausted | Pause requests and check your own provider quota/billing. Do not keep rerunning a write request. Different projects may have different limits. |
| create_ticket says no workflow / invalid inputs | Save and publish the helper first, select it in create_ticket, then click the four sparkle buttons after selection. All four inputs must say **Defined by agent**. |
| Workflow is not active and cannot be executed | Open **02 Save Support Ticket**, click **Publish**, confirm, then rerun the agent question. Saving alone is insufficient for the callable helper on this Cloud version. |
| Sheet has no values / Fields to Send error | In the helper, choose your document and tab first, then set **Auto-Map Input Data to Columns LAST**. Confirm exact headers. |
| Sheet permission error | Check the original Sheets node OUTPUT, the connected Google account and edit access. AI settings do not repair Google permissions. |
| No ticket for a brewing FAQ | Expected. The agent creates tickets for actionable support cases, not every knowledge question. |
| Reply is visible but ticket was not saved | Inspect the create_ticket sub-execution and Sheets error. A failed write must not be described as successful. |
| Repeating a test adds another row | Expected: no persistent deduplication is implemented. Each new tool invocation can add a row. |
| Chat doesn't remember an earlier order | Each message is independent; repeat the order ID. Conversation memory is outside this exercise. |
| Unknown/custom node message | Use the current n8n Cloud editor and the supplied files. Do not install an unrelated community node. Share the exact unsupported node name/version for help. |

## 7. What you learned and what comes next

**Chunking -> cloud embeddings -> vector retrieval -> grounded answers -> structured decisions -> tool calling -> deterministic business rules -> saved actions.**

This core implementation uses the selected cloud LLM for the triage decision. It is **not a Laya implementation or performance benchmark**. No Laya key or local model installation is required. The frustration score is an estimated 1-5 rubric, not a calibrated probability.

The Simple Vector Store is for this fictional teaching exercise. It is temporary, accessible to users of the same n8n instance and unsuitable as a production customer-data store. Order lookup is a demo fixture without identity verification. Day 3 will add evaluation and operational checks. [n8n storage limitations](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/).

The RAG and agent exercises can run in the editor without publishing a public chat. **Publish the Sheet helper** so it can be called by the agent. It has a sub-workflow trigger, not a public chat. Every API call and Sheet write uses your own connections.
