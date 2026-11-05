# Deployment boundaries

This workshop produces a running portfolio project with production-oriented controls. It is not certified for unattended handling of real customer accounts or payments.

| Implemented in this project | Required before real customer operation |
| --- | --- |
| Public fictional-data chat; Bearer Auth for MCP | Authenticated chat, per-user identity, authorization and order-ownership verification |
| Fictional orders and versioned bundled knowledge | Approved customer-data source, access controls, retention policy and versioned persistent vector storage if semantic retrieval is needed |
| Masking of common email/phone patterns before model and business logs | Comprehensive PII handling, review of provider/n8n/proxy logs, retention and deletion controls |
| Raw successful/error execution storage disabled on core workflows | Verify the deployed instance's logging behavior, incident monitoring and redaction across every infrastructure layer |
| Deterministic refund amount/eligibility checks; human review pause | Restricted named approvers, responder identity capture and appropriate Slack app interactivity/signing setup |
| Signed one-time approval links in the selected Slack channel | Trusted staff-only channel; approval links must not be forwarded. The default demo does not bind approval to a named person |
| Sequential replay detection using request ID in Sheets | Atomic database unique constraint, transactional outbox, queue and concurrent replay tests |
| Sheet saved and Slack notified reported separately | A retry worker for failed Slack notifications, persistent delivery state, dead-letter queue and alerts |
| One ticket write outside the model loop, no automatic write retries | Idempotency across network ambiguity and end-to-end recovery tests |
| Serial fixed-set evaluation, answer/chunk inspection, LLM judge | Representative multilingual/adversarial data, independent human review and release gates |
| Recorded end-to-end latency in evaluation outputs | Provider token metering, spend caps, rate limits, load/concurrency testing and operational service objectives |
| Safe answer when model output/connection fails validation | An explicit staffed fallback channel and monitored availability |
| No refund transfer or customer email action | Separate authorized financial/email integration, verified recipients and auditable approvals if later added |

The request ID uses a non-cryptographic hash of session, masked message and UTC day. It identifies a replay within that demo scope; it is not an authentication token or proof of identity. Session changes create new IDs. Sheets read-then-append is not race-free. An already-recorded request does not automatically retry Slack.

The small knowledge corpus is bundled in the published MCP workflow. Retrieval uses keyword scoring; it does not claim vector similarity or require manually priming an in-memory store. The agent translates a query to English for the search tool. Keep the original Day 2 semantic RAG exercise as a comparison, not as a hidden production dependency.

No fabricated token counts, invoices, cost savings, throughput, accuracy improvement or availability guarantee are included. Native agent nodes may omit token metadata. In that case the report marks usage unavailable. Consult provider-reported execution data to record actual usage; calculated price estimates must be labelled and dated separately.

The workshop hosted chat has no login at the user's request. Anyone with its URL can trigger API/workflow usage. It must only expose fictional data. Close the demo after the workshop or add authentication, request limits and spend controls before wider sharing. A public URL is not an access-control mechanism.
