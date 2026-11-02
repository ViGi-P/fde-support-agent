# Kaapi & Co. support agent - FDE workshop

Build one fictional coffee-brand support agent across three sessions, 3-5 November 2026, 8 PM IST. Each session is about 150 minutes. Model calls use cloud APIs throughout.

## Start here

1. Complete [attendee preparation](docs/ATTENDEE-SETUP.md).
2. Open the revised [Day 1 presentation PDF](Day1-Presentation.pdf).
3. Follow the [Day 1 build guide](day1/BUILD-GUIDE.md).
4. Download the [Gemini workflow](day1/kaapi-day1-gemini.json), import it once and select your own credentials.
5. Use the [three sample emails](day1/TEST-EMAILS.md) to check the result.

The revised PDF is the current teaching version and replaces the earlier PowerPoint files. Slides 4-7 explain the three-day journey and prerequisites. The instructor demonstrates Claude; attendees follow Gemini. The optional provider comparison comes after the main build.

## Learning journey

| Day | Build | Concepts |
|---|---|---|
| 1 | Email classification, reply drafts, a Sheet log and refund alerts | Triggers, prompts, JSON, integrations and conditions |
| 2 | Company knowledge and order tools | RAG, chunks, API embeddings, retrieval and tool calling |
| 3 | Tests and cloud operating checks | Evals, guardrails, human approval, cost and latency |

## What has been tested

On 2 November both presenter variants processed the refund, product and Hinglish delivery cases. The Gemini export was also imported into a clean unpublished draft. Phone-send timing and a timed first-time import remain rehearsal checks. The tested Cloud instance polls Gmail at least once per minute, so automatic email-to-result time can exceed 30 seconds. A short successful run with no trigger output has not processed an email.

Days 2 and 3 implementations are the next delivery milestones. The repository does not claim they are complete.

## Files

- `kaapi-data/`: fictional tickets, orders, policies, FAQs and evaluation cases.
- `day1/`: workflow exports, prompt, test emails and build instructions.
- `docs/`: account preparation and troubleshooting.
- [WhatsApp setup message](WhatsApp-Attendee-Message.txt): a draft the organizer can share.

Use your own accounts and credentials. The public exports have no saved credentials, presenter Sheet IDs or execution data. The private presenter PDF and account login are not part of this repository.
