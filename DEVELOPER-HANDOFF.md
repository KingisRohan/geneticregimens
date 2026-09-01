# Genetic Regimens — Developer Handoff
Prepared 1 September 2026. This document is written for a developer who has not seen this project before. Plain-English explanations are included in parentheses the first time a technical term appears, because the client is not a coder and needs to be able to read this too.

A working build already exists (see "Current State" below). This document is both a spec to build from and a reference for whoever maintains it.

---

## 1. Project summary

**What it is:** A two-page marketing website for Genetic Regimens, a fitness and performance coaching brand run by Siddhesh Nagesh Ghatkar. It is a showcase site, not an e-commerce or booking site — its only job is to make a visitor trust the brand enough to send one WhatsApp message.

**What it is not:** No shopping cart, no login, no database, no backend server, no content management system (CMS). Every word on the site is written directly into the HTML files. There is nothing to "configure" — a developer opens a text editor, changes the text, saves, and the change is live.

**Single conversion action:** Every call-to-action (CTA — a button meant to make the visitor act) opens WhatsApp with a pre-filled message. There are no contact forms anywhere on this site, intentionally.

---

## 2. Tech stack

Deliberately minimal. No framework, no build step (a "build step" is a process that compiles or bundles code before it can run — this project has none), no package manager, no dependencies to install.

| Layer | Choice | Why |
|---|---|---|
| Markup | Plain HTML5, two files | Two pages, no routing needed |
| Styling | Plain CSS3, one shared file | No Sass/Tailwind/CSS-in-JS — keeps it editable by a non-specialist later |
| Behaviour | Plain JavaScript (no framework), one shared file | Mobile nav toggle, scroll animation, WhatsApp links, a basic visit counter |
| Fonts | Google Fonts CDN (Fraunces), system fonts otherwise (Georgia, Arial) | No font files to self-host |
| Hosting target | GitHub Pages (free static hosting) or any standard web host | No server-side code, so it runs anywhere that serves static files |
| Domain | Registered via Hostinger, DNS not yet pointed | See Section 7 |

**If you are asked to "modernize" this stack** (React, a static site generator, etc.) — check with the client first. The plain-HTML approach was a deliberate choice so the site never breaks from a dependency going stale, and so the client can hand-edit text directly without needing a developer for every typo.

---

## 3. File structure

```
genetic-regimens-site/
├── index.html              ← Homepage (all main sections)
├── consultations.html      ← Consultation page (Hinglish-directional copy)
├── styles.css              ← All styling for both pages, shared
├── script.js                ← All behaviour for both pages, shared
├── assets/
│   ├── logo-full-transparent.png   ← Full logo lockup, background removed
│   ├── mark-transparent.png        ← Icon-only mark (nav bar, favicon)
│   ├── siddhesh-panel.jpg          ← Real photo, event/speaking context
│   └── siddhesh-coaching.jpg       ← Real photo, coaching/studio context
├── BRIEF.md                 ← The locked content/product spec (source of truth for what the site must say and do)
└── DECISIONS.md             ← Every build decision made without asking, with reasoning
```

Both HTML files share the same `<head>`, navigation bar, and footer markup. If you add a third page later, copy those blocks from either existing file exactly, so the site stays consistent.

---

## 4. Design tokens (do not hardcode values — use these)

All values live as CSS custom properties (variables that can be reused and changed in one place) at the top of `styles.css`, inside `:root { }`. Never hardcode a hex colour or font name directly in a rule — always reference the variable, so a future palette change only requires editing one line.

```css
--paper: #F7F4EC;        /* primary background */
--paper-deep: #EFE9DC;   /* alternating section background */
--ink: #1A1817;          /* headlines, primary text */
--ink-soft: #4A4642;     /* body copy */
--ink-faint: #7A756D;    /* captions, secondary labels */
--rust: #A32B22;         /* accent — buttons, links, labels */
--rust-deep: #7C1F19;    /* hover/pressed states */
--line: #DCD3C1;         /* all hairline dividers */

--font-display: "Fraunces", Georgia, serif;   /* headlines only */
--font-body: Georgia, serif;                   /* paragraphs, quotes */
--font-label: Arial, Helvetica, sans-serif;    /* nav, buttons, eyebrows, stat labels */
```

A full visual reference (colour swatches, type specimens, logo usage rules) exists as a separate PDF — `Genetic-Regimens-Design-Brief.pdf` — hand that to whoever is doing visual/design work. This document is the technical companion to it.

---

## 5. Page-by-page content spec

### 5.1 — `index.html` (Homepage)

| Section | Purpose | Notes for dev |
|---|---|---|
| Nav | Logo mark + wordmark left, anchor links centre, WhatsApp button right | Sticky (stays visible on scroll). Collapses to a hamburger menu under 760px width. |
| Hero | One-line positioning + WhatsApp CTA | `<h1>` must stay under ~16 characters per line at desktop width, or it wraps awkwardly — check after any copy edit |
| The Problem | Four short blocks addressing visitor doubt | Deliberately not a bulleted list — written as short prose paragraphs, per brand voice rules (no bullet-point filler) |
| Siddhesh (id="about") | Founder credibility | Real photo, 3 stats (9+ years / 350+ transformations / 2019 founded), degree+diploma mentioned lightly, **plus his PLR / Psychic Surgery / Emotional Quotient Mapping / Healing Modalities / Darshan Shastra background** — see Section 6 below, this is new as of 1 Sept 2026 |
| What We Do | 3-column offer grid: Programming / Nutrition / Coaching | Grid collapses to single column under 760px |
| Transformations (id="transformations") | 3 testimonials: Kalpesh, Anish, Salil | **These are drafted, not final** — flagged in DECISIONS.md, need real sign-off from each person before this is truly done |
| Consultation teaser | Links to consultations.html | |
| Final CTA | Repeats WhatsApp CTA | |
| Footer | "Genetic Regimens — Est. 2019" + "Mumbai, India" | |
| Sticky mobile CTA | Fixed WhatsApp button at bottom of screen | Only visible under 760px width, so it never fights the desktop layout |

### 5.2 — `consultations.html`

Hinglish-directional (a mix of Hindi and English, written in Roman script) per the brand's language requirement for this specific page only — the homepage stays majorly English. Structure: hero → 3-step process (numbered, because it's a real sequence — "message → conversation → plan") → final CTA. Same nav/footer as the homepage.

---

## 6. Amendment — Siddhesh's additional background (added 1 Sept 2026)

Beyond strength & conditioning and nutrition, Siddhesh Nagesh Ghatkar has experience in:

- **PLR** (Past Life Regression)
- **Psychic Surgery**
- **Emotional Quotient Mapping**
- **Healing Modalities**
- **Darshan Shastra**

This has already been added to `index.html`, as a short paragraph directly under his degree/diploma line in the Siddhesh section. It is stated plainly, in the same tone as the rest of his bio — not called out with a special heading, badge, or separate section, per the brand rule against over-emphasizing credentials. If this content is ever restructured, keep that tone: state it, don't sell it.

---

## 7. Deployment

**Current state:** not yet deployed. Domain is registered with Hostinger and renewed; no DNS records point anywhere yet; no GitHub repository has been pushed to yet.

**Recommended path (free, matches the "maintained via GitHub" requirement in BRIEF.md):**

1. Push this folder to a GitHub repository (public, so GitHub Pages can serve it for free).
2. In the repo's Settings → Pages, set the source to the `main` branch, root folder.
3. GitHub will issue a `*.github.io` URL. Test the site there first.
4. In Hostinger's DNS settings, point the domain at GitHub Pages using a CNAME record (ask if the domain is `www.geneticregimens.com` or apex `geneticregimens.com` — the DNS record type differs slightly between the two, and GitHub's own Pages documentation covers both cases exactly).
5. Add a `CNAME` file (no file extension) containing just the domain name, in the repo root, so GitHub Pages remembers the custom domain across deploys.

**Do not** change where the live domain points, or delete any existing repository, without explicit confirmation first — this is the one class of decision in this project that is not a "decide and log" situation.

---

## 8. Things that must never break (acceptance criteria)

These come directly from the locked brief and are non-negotiable:

- **The site must never show blank/invisible content**, even if JavaScript is slow or fails. (This was an actual bug caught during the first build — see DECISIONS.md — sections were originally hidden until a scroll animation fired. Fixed so everything is visible by default and animation is a bonus only. Do not reintroduce a pattern where content's default state is hidden.)
- **Every image must render symmetrical and undistorted** — never stretched to fill a box. Check `object-fit` and `aspect-ratio` values in CSS if you change any image markup.
- **Mobile is the primary target, not an afterthought.** Test every change at 390px width before checking desktop.
- **No placeholder or "Lorem ipsum" text**, ever, in a committed change. If real copy doesn't exist yet for something new, write a real draft and flag it in DECISIONS.md as needing sign-off — same pattern already used for the testimonials.
- **No popups, no autoplay sound, no stock photography.** Real photos only, or Kling AI-generated images matching the established palette (pre-approved for this project).

---

## 9. Open items / known gaps

- WhatsApp number is live in all CTA links: `+91 87794 18325`. Confirm this is still correct before any relaunch.
- Analytics is currently a placeholder (a simple on-device counter, not a real analytics service). Replace with Google Analytics or Plausible before treating traffic numbers as real — see the marked block in `script.js`.
- Testimonial copy (Kalpesh, Anish, Salil) needs a yes from each named person before being treated as final, permanent copy.
- Two more product pages (Nutrition Expertise, Home Training) are planned for later, added as `/links` off the main site — not yet named or scoped, do not build placeholder pages for these speculatively.

---

## 10. Decision-making while building

Repository ownership and push access are managed separately — do not assume you have push access unless it has been explicitly granted to you. For anything not covered in this document or in `BRIEF.md`, the correct move is to make the most brand-consistent decision, build it, and log it in `DECISIONS.md` rather than stopping work to ask. The one exception is anything irreversible or that costs money — buying something, changing DNS or where the live domain points, deleting a repository — which always needs direct confirmation first, from whoever is running the project, before you act.
