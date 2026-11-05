# Show what you built

Present this as a deployed fictional-data support product. Your evidence is the working chat, its verified writes and review decisions, and the evaluation results from your own account.

## A three-minute walkthrough

| Show | Explain |
| --- | --- |
| Open your public Chat URL, including a mobile view. | The product runs outside the editor. Its branded interface, responsive layout and reduced-motion support ship with the workflow. |
| Ask an opened-bag policy question. | The model retrieves versioned evidence through an authenticated MCP connection and returns a source-grounded answer. |
| Request a ticket for KC1051; repeat the same message. | The workflow validates the response, saves once, and confirms the same ticket ID in chat, Sheets and Slack. |
| Request the damaged-order refund for KC1063 and respond in Slack. | Code enforces the INR 5000 threshold. Review runs in the background, and its outcome becomes a separate audit event. No payment integration exists. |
| Open your saved 15-case evaluation report. | Show actual answers, failures, reasons, retrieved evidence and measured latency. Explain one justified correction and its measured result. |

## Keep these artifacts

- Your live Chat URL, shared while the demo is intentionally available.
- Credential-free workflow exports and an architecture diagram.
- Your own baseline and final evaluation JSON, including failures.
- Screenshots showing a matching ticket ID and a review decision.
- A short screen recording of the complete path.
- A note about the project's limits and the next controls you would add.

Never upload API keys, credential exports, private MCP tokens or signed approval links. Do not claim a pass rate from someone else's report.

## Resume wording

> Built and deployed a branded cloud support assistant using n8n and Gemini, with authenticated MCP retrieval, structured response validation, contact masking, idempotent ticket logging, Slack human review and a paced 15-case evaluation suite.

Add a measured pass rate or latency only after your own report demonstrates it. Use **portfolio project with production-oriented controls**, and be ready to explain why authentication, order ownership, atomic database uniqueness, rate limits, monitoring and delivery retries are still needed before real customer operation.

## Explain the design decisions

**Why MCP?** One authenticated connection discovers three read tools. It demonstrates reusable tool access without giving the model a write or payment capability.

**Why keep writes outside the agent?** The application checks the response and refund evidence before calling the operations workflow. The model cannot declare that a ticket saved or that a refund was approved.

**Why separate review events?** A ticket and the later human decision are different facts. A background approval pause keeps the customer from waiting for a person.

**Why pace the evaluation?** One case uses the support model plus a judge. Serial execution alone can still exceed a free-tier request quota. The pause and judge retry make that limitation visible and manageable.

**Why hosted chat?** The branded interface is already embedded in the import. Attendees deploy a usable product without learning another hosting platform during the workshop.
