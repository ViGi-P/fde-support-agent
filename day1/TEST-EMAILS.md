# Fictional test emails - all-category Slack routing

Send these to YOUR connected demo inbox using another email account. Use a fresh subject each time, keep `[KAAPI-DEMO]` in it, and leave the message unread for polling. The people and order references are fictional. Actual sender metadata reflects your test account.

## T01: refund

Subject: [KAAPI-DEMO] T01 Refund please

Hi, order KC1042 arrived with a torn bag. I'd like a refund.

Expected: refund; one Sheet row; one #support post marked HUMAN REVIEW NEEDED; no #product-insights post; draft acknowledges review without approving a refund.

## T03: product

Subject: [KAAPI-DEMO] T03 French press grind

Which grind should I use for a French press?

Expected: product; one Sheet row; one #product-insights post; no #support post. A product question is an insight, not necessarily feedback.

## T05: Hinglish delivery

Subject: [KAAPI-DEMO] T05 Order kab aayega

Bhai mera order KC1055 abhi tak nahi aaya, kab tak aayega?

Expected: delivery; one Sheet row; one #support post labelled delivery; no #product-insights post; draft does not invent an order status or delivery date.

## T07: other

Subject: [KAAPI-DEMO] T07 Interview request

Hello Team Kaapi, I run a student business magazine. Could I interview your founder about starting the company?

Expected: other; one Sheet row; one #support post labelled other; no #product-insights post; draft does not invent a confirmed interview or contact.

Check the newest execution and actual outputs. Repeat all four tests independently for each provider you plan to use. Keep only one provider workflow published per inbox to avoid processing the same email twice.
