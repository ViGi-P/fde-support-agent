# Kaapi support

**[Download the starter ZIP](https://github.com/becomefde/fde-support-agent/releases/download/v5.1.0/Kaapi-Day3-Starter.zip).** It contains the two workflows below. No optional imports or separate frontend hosting.

| File | Purpose |
| --- | --- |
| `01-Kaapi-Support.json` | Branded chat, input masking, grounded answers, response validation and ticket requests. |
| `02-Kaapi-Backend.json` | MCP tools, Google Sheets ticket log, Slack human review and the manual 15-case evaluation. |

## Set up

1. Import **both JSON files** into separate n8n workflows.
2. In **02 Backend**, select your Google Sheets credential and the same Sheet/tab in its three Sheets nodes. Keep Auto-Map. Select your Slack credential and support channel in both Slack nodes. On **MCP SERVER**, select one private Bearer Auth credential. For evals, choose your 01 Support in **Run 01 support** and Gemini on the Judge. Publish 02, then copy the MCP **Production URL**.
3. In **01 Support**, select Gemini. Paste the copied MCP URL and select the **same Bearer credential**. In **Save ticket**, choose 02 Backend. Publish and open **LIVE CHAT → Chat URL**. The styling and animations are included.

Create a new Sheet tab and paste this tab-separated header into A1:

```text
time	request_id	ticket_id	event	status	category	order_id	summary	draft_reply	detail	latency_ms	tokens_in	tokens_out
```

Use your own credentials and destinations. Keep successful/failed production execution saving off. Backend manual execution saving can remain on to retain fictional evaluation reports.

## Check it

- Ask `Can I return an opened bag of coffee?` Expect the arrival-damage condition, 48 hours, photo and source. No ticket.
- Ask `Where is my order KC1051? Please raise a support ticket.` Match the ID in chat, Sheet and Slack. Repeat the exact message in the same session; expect the same ticket and no duplicate append or notice.
- Ask `I want a refund for order KC1063. It arrived damaged. Please raise a ticket.` Respond in Slack and check the later decision event. This records a review; it transfers no money.
- In **02 Backend**, execute **RUN EVALUATION**. The 15 fixed cases run with writes disabled and a 20-second pause between cases. Avoid using chat during the run; allow about 10 minutes. Open **Evaluation report → JSON** to inspect actual answers and reasons.

This is a public fictional-data demo. Anyone with the chat link can consume API/workflow credits. Real customer use additionally needs identity and order-ownership checks, request limits, monitoring and atomic database idempotency.
