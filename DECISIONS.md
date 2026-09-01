# DECISIONS.md — Genetic Regimens site build
Built: 31 August 2026, in the same session as BRIEF.md. Review this whole list once, in one sitting.

- **Typography**: paired Fraunces (display headlines) with Georgia (body) and Arial (labels/nav/eyebrows) — because the Editorial Minimal direction needed one distinctive, characterful display face while honouring the Georgia/Arial system already established for the brand. Reverse by swapping the Google Fonts `<link>` and `--font-display` in styles.css.

- **Signature element**: added a thin rust-red "helix spine" — a line echoing the DNA-runner logo mark — that draws itself in down the left edge of the page as you scroll. This is the one bold, memorable risk in an otherwise bare-ornament design, matching "subtle but visible" motion from Gate 3. Reverse by deleting `.helix-spine` from the HTML and its related block in script.js. It's hidden automatically on screens under 900px so it never competes with mobile content.

- **Safety fix — scroll reveal**: originally built sections to fade in only once scrolled into view, using JavaScript. Caught in testing: if the animation logic was ever slow or interrupted, whole sections could stay invisible. Rebuilt so **every section is fully visible by default**, and only fades in as a bonus once JavaScript confirms it's working. This directly protects the "site does not break on refresh" requirement. No action needed — this is the correct, permanent behaviour.

- **Analytics**: wired a lightweight on-device visit counter (no external service, nothing sent anywhere) as a placeholder, since no Google Analytics or Plausible account exists yet. Before real launch, replace the block marked in script.js with a real GA4 or Plausible snippet so visits are actually trackable centrally, not just per-device.

- **Sticky mobile CTA**: added a WhatsApp button pinned to the bottom of the screen on mobile only, per Gate 5's "pinned on mobile" instruction. Reverse by deleting `.sticky-cta` from each HTML file and its CSS block.

- **Testimonials — Kalpesh, Anish, Salil**: written as full quotes based on the category each was described as ("fat loss," "performance counselling," "aesthetic bodybuilding"), since exact wording didn't exist. **These are drafted, not final.** Send each person their line on WhatsApp and get a plain yes before this section is truly locked. Do not treat as launch-ready copy until then.

- **Logo files**: the source PNGs (`logo-full.png`, `mark.png`) had solid white backgrounds, which would show as a visible box against the paper-toned site background. Processed both into transparent versions (`logo-full-transparent.png`, `mark-transparent.png`) and used those throughout. Reverse by pointing the `<img>` tags back at the original files if the transparent versions ever look wrong.

- **Photography**: used the two real photos from the project folder (event/panel shot, coaching/studio shot). Did not generate additional Kling AI images yet, even though pre-approved — the two real photos carried the Siddhesh section on their own. If more variety is wanted later (e.g. a wider "in action" gallery), that's a clean next step, not a gap in tonight's build.

- **Structure reference**: acquisition.com's actual homepage (fetched directly, not guessed) uses a sticky top banner, a big single-question headline with one CTA, a card-style grid of offers, a founder-story block with photos and stats, and one more CTA before a minimal legal footer. Borrowed the shape of that — hero, then a scannable offer grid, then founder credibility with real numbers, then a final CTA — adapted to Genetic Regimens' own content, not copied wording or visuals.

- **Two-page structure**: built `index.html` and `consultations.html` sharing one `styles.css` and one `script.js`, per Gate 5. Both pages carry identical nav/footer markup for consistency — when a new page is added later as `/links`, copy the `<head>`, nav, and footer blocks from either file exactly.

- **WhatsApp CTA mechanism**: every CTA is a `wa.me` link with a pre-filled message, not a contact form — matches Gate 6's "enquiries land directly on WhatsApp." To change the pre-filled message, edit the `?text=` part of the link (it's URL-encoded — spaces are `%20`, and so on).

## Amendment — 1 September 2026
Added Siddhesh's additional background (PLR, Psychic Surgery, Emotional Quotient Mapping, Healing Modalities, Darshan Shastra) as a new paragraph directly under his core bio in the "Who You're Working With" section of index.html, immediately after the degree/diploma line. Stated plainly, no separate heading, no special visual treatment — consistent with "state it, don't sell it" from BRIEF.md's amendment.
