# Read the guardrails

These readable source copies explain the code embedded in the workflow JSON files. n8n runs the code stored in each imported node; changing these files alone does not update a deployed workflow.

| File | Purpose |
| --- | --- |
| `input-guard.js` | Mask contact details, reject selected off-topic/override patterns and set the internal evaluation flag. |
| `search-knowledge.js` | Retrieve versioned policy/FAQ chunks from the bundled fictional knowledge corpus. |
| `operations-input.js` | Validate the ticket envelope and enforce the refund review threshold independently of the model. |
| `validate-answer.js` | Validate the response, supplied order and refund evidence before allowing a ticket write. |
| `eval-score.js` | Save actual answers, judge reasons, source evidence and validation diagnostics. |

Run `node ../test-day3.cjs` if you want to verify graph references, JavaScript syntax and the deterministic controls locally. Attendees do not need Node or a terminal to import and deploy the project.
