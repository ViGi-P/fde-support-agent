# Claude and Gemini: the same support task

Use Claude for the presenter demonstration, then Gemini for the attendee build. Both versions must pass the same functional checks. Do not assume which model will produce the better answer before reviewing the test outputs.

## Keep the comparison consistent

- Use the same email text, classifier instructions and supplied business context.
- Require exactly the same JSON fields: category and draft_reply.
- Use the same Sheet headers and refund-to-Slack condition.
- Record the exact provider/model ID and the settings used for each test.
- Record actual output and measured runtime; use provider-reported token usage where available.
- Use separate credentials. A Claude key does not work in a Gemini node.
- Test each variant's parser and downstream field mappings; switching the node alone is not proof that the alternative works.

## Demonstration sequence

1. Show T01 with Claude: refund category, a friendly draft, Sheet row, Slack alert.
2. Show T01 with Gemini: the same business outcome through the attendee path.
3. Show T03 and T05 to check product routing and Hinglish delivery handling.
4. Discuss observed correctness, tone, JSON validity and elapsed time.
5. Build the Gemini version together and provide the Claude export as an optional variant.

Suggested wording: "These are the outputs from the two named models on the same customer request. We will build the Gemini version together; the Claude version uses the same workflow concepts with a different model credential."

## Results (not yet measured)

| Ticket | Expected route | Claude model / output / time | Gemini model / output / time |
|---|---|---|---|
| T01 | refund | Pending | Pending |
| T03 | product | Pending | Pending |
| T05 | delivery | Pending | Pending |

Free-tier API access has quotas and model availability constraints. It is not a universal quality label. Keep all demonstration data fictional. Presenter API access is separate from participant API access.
