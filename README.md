# Kaapi & Co. support agent: FDE webinar

One fictional coffee-brand support project. Revised schedule: Day 1 starts 3 November 2026; three consecutive sessions are planned through 5 November. Presenter handover is 2 November by 6 PM IST. Each session is approximately 150 minutes.

## Start here

1. Complete [attendee preparation](docs/ATTENDEE-SETUP.md).
2. Follow [Day 1 build checkpoints](day1/BUILD-GUIDE.md).
3. Use [sample emails](day1/TEST-EMAILS.md) to check your result.

This repository is being prepared. A workflow is ready for attendees only when it is explicitly marked VERIFIED. At present the data and written guides are prepared; the live workflow, screenshots and recordings still require validation.

## Learning journey

| Day | Build | Concepts |
|---|---|---|
| 1 | Email classification, reply drafts, a Sheet log and Slack alerts | Triggers, prompts, JSON, integrations, conditions |
| 2 | A policy-aware agent with order tools | RAG, chunks, embeddings, retrieval, Laya, tool calling |
| 3 | Operational checks and a local fallback | Evals, guardrails, human approval, cost, latency, offline inference |

## Files

- `kaapi-data/`: fictional tickets, orders, policies, FAQs and evaluation questions.
- `day1/`: Day 1 instructions; verified n8n exports will be added after testing.
- `day2-rag/`, `day2-decision/`, `day2-agent/`: subsequent stages.
- `day3-ops/`: evaluations, guardrails and offline operation.
- `specs/`: tested live-build prompts, to be added.
- `recordings/`: mandatory backup videos, to be added after rehearsal.
- `docs/`: setup and troubleshooting.

Use your own n8n instance and API credentials. Do not put secrets into repository files, issues, screenshots or chat. All supplied customer records are fictional.

Windows and Mac attendees follow the same browser-based Day 1 build. Local Python and model setup is for later days.
