# Kaapi & Co. support agent: FDE webinar

One fictional coffee-brand support project. Revised schedule: Day 1 starts 3 November 2026; three consecutive sessions are planned through 5 November. Presenter handover is 2 November by 6 PM IST. Each session is approximately 150 minutes.

## Start here

1. Complete [attendee preparation](docs/ATTENDEE-SETUP.md).
2. Follow [Day 1 build checkpoints](day1/BUILD-GUIDE.md).
3. Use [sample emails](day1/TEST-EMAILS.md) to check your result.

Day 1 integration tests VERIFIED on 2 November: both Gemini and Claude processed the refund, product and Hinglish delivery cases. Download the credential-free exports from day1 and reconnect your own accounts. The Gemini export was also imported into a clean unpublished draft. Phone-send timing and a timed first-time import remain rehearsal checks. Automatic Gmail polling is at least one minute on the tested Cloud instance, so an automatic 30-second result is not guaranteed. Days 2 and 3 implementations are forthcoming.

## Learning journey

| Day | Build | Concepts |
|---|---|---|
| 1 | Email classification, reply drafts, a Sheet log and Slack alerts | Triggers, prompts, JSON, integrations, conditions |
| 2 | A policy-aware agent with order tools | RAG, chunks, embeddings, retrieval, Laya, tool calling |
| 3 | Operational checks and a local fallback | Evals, guardrails, human approval, cost, latency, offline inference |

## Files

- `kaapi-data/`: fictional tickets, orders, policies, FAQs and evaluation questions.
- `day1/`: Day 1 instructions, tested Gemini/Claude workflow exports and an illustrated one-page quickstart.
- `day2-rag/`, `day2-decision/`, `day2-agent/`: subsequent stages.
- `day3-ops/`: evaluations, guardrails and offline operation.
- `specs/`: tested live-build prompts, to be added.
- `recordings/`: mandatory backup videos, to be added after rehearsal.
- `docs/`: setup and troubleshooting.

Use your own n8n instance and API credentials. Do not put secrets into repository files, issues, screenshots or chat. All supplied customer records are fictional.

Windows and Mac attendees follow the same browser-based Day 1 build. Local Python and model setup is for later days.

## Teaching materials

- [Attendee readiness slides](Attendee-Readiness.pptx)
- [Day 1 teaching slides](Day-1-Live-Workshop.pptx)
- [WhatsApp setup message](WhatsApp-Attendee-Message.txt)

The presenter account, private runbook and saved credentials are not part of the participant kit.
