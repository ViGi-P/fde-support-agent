# Day 1: email to support draft

Status: WRITTEN GUIDE PREPARED; live workflow and screenshots NOT YET VERIFIED.

Goal: receive a fictional customer email, classify it, create a draft, log it in Sheets and alert Slack for refunds. This Day 1 exercise does not send customer replies or execute refunds.

## Checkpoint 0: accounts connected

Open n8n Cloud, your test Gmail inbox, `Kaapi Support Log`, and Slack. Connect Gmail, Sheets and the selected model provider through n8n credentials. Prepare Slack `#support` and its connection. Keep secrets out of exports.

## Checkpoint 1: capture an email

Add Gmail Trigger, Message Received. Limit the trigger to the workshop subject prefix `[KAAPI-DEMO]` so unrelated inbox mail is not processed. Send T01 from `TEST-EMAILS.md` and inspect the received sender, subject and body.

Expected: the trigger displays the test email. Check that the actual body is available, not merely an email ID or truncated snippet, before writing the model mapping.

## Checkpoint 2: get structured AI output

Add the provider's generation/chain node and paste `CLASSIFIER-PROMPT.md`. Map the received subject/body into the input. Require category and draft_reply in the output.

Expected: category is exactly `refund`, `delivery`, `product` or `other`; draft_reply is 2-3 friendly sentences, signed `Team Kaapi`. The implementation must parse and validate the JSON before downstream use.

## Checkpoint 3: append to Sheets

Append one row containing execution time, original sender, parsed category, and parsed draft_reply. Retain the original email fields if the model node replaces its input.

Expected: one visible row with four populated columns. A manual node rerun can add duplicate rows; avoid repeatedly executing the append step when diagnosing an earlier node.

## Checkpoint 4: alert Slack conditionally

If parsed category is `refund`, post the sender and draft reply to `#support`. Product and delivery requests should still be logged but should not create refund alerts.

The brief groups this as four teaching blocks, with IF + Slack in the fourth block. The real n8n canvas may need additional nodes/subnodes for the provider and condition. Keep the explanation simple and document the actual tested node count.

## Acceptance test

Send T01, T03 and T05 from a phone. For all three consecutive runs:

- The Sheet receives a row.
- T01 produces a Slack refund alert; T03 and T05 do not.
- Category and reply are sensible, including the Hinglish input.
- Measure email-to-row/alert time. The brief requires no more than 30 seconds.

Gmail Trigger is polling-based. Verify its configured interval and actual timing before claiming the 30-second criterion is passed. A manual fetch demonstrates processing but is not proof of automatic trigger latency.

## Export and homework

After validation, export a credential-free workflow JSON and add it beside this guide. A first-time n8n user should be able to import, connect their services and pass a test in under 20 minutes. Add screenshots from the tested build and record a 60-90 second backup as `recordings/07-day1-n8n.mp4`.

## Recovery checkpoints

- Gmail fails: check the connected account, subject filter and whether the sample was already processed.
- Model fails: check the matching provider credential, model availability, quota and JSON contract.
- Sheet fails: check selected document/tab, permissions and exact header mappings.
- Slack fails: check selected workspace/channel, authorized app access and refund condition.
- Live setup stalls: demonstrate the saved working checkpoint or backup recording; resume attendee setup after the teaching block.
