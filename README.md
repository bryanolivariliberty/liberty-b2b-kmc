# Liberty B2B — Know My Customer (KMC)

A high-fidelity, fully interactive prototype of **Know My Customer** — a future AI-powered B2B Sales Enablement
Agent concept for Liberty Business. Built for a live executive demo, not for production use.

KMC's narrative: it synthesizes Liberty account intelligence, external company/industry research, the Liberty
product catalog, and the B2B sales playbook into one meeting-ready package — account profile, opportunity map,
meeting strategy, talking points, copy-paste customer-journey templates, an executive brief, and a client-facing
presentation. For companies with no Liberty account record, a separate greenfield path profiles the prospect from
(simulated) open-web sources instead.

This is a **self-contained simulation**. There are no real Salesforce/AWS/QuickSight/Liberty integrations, no
backend, no database, and no paid APIs — every account and metric is clearly-labeled demo data living in
`/data`.

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Three preconfigured demo accounts are available from the
home screen: **Banco Popular** (Financial Services), **MCS** (Healthcare & Insurance), and **GFR Media**
(Media & Communications).

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # ESLint
```

No environment variables or secrets are required to run, build, or deploy this project.

## Demo flow

Home → select an account → Agent Processing (animated synthesis) → Account Intelligence → Business Context →
Opportunity Map → Meeting Strategy → Talking Points → Customer Journey → Executive Meeting Brief →
**Present to Customer** (a full-bleed, client-safe presentation with its own transition and slide navigation).

A first-run **onboarding walkthrough** explains the seven-section order and why it is sequenced that way; it is
re-openable from the workspace header. A **preparation meter** ("4 of 7 reviewed") in the sidebar and header
tracks how much prep is left.

**Customer Journey** gives each account six stages — Engage, Discover, Propose, Validate, Close, Expand — with
copy-paste-ready assets at every stage (outreach email, call agenda, follow-up, CRM note, proposal framing). The
journey methodology is authored once in `data/journeys.ts` and resolved per account by `lib/journey.ts`, so every
asset a rep copies is already specific to that customer.

**Greenfield prospects:** searching a company with no Liberty account offers open-web research instead of a dead
end. The prospect profile is deliberately shaped differently from the known-account workspace — hypotheses rather
than ranked opportunities, a named source and confidence level on every claim, and an explicit list of what could
not be established. `lib/greenfield.ts` simulates the research; no search API is called.

A persistent **Ask KMC** assistant (deterministic, no external LLM call) is available throughout the workspace.
The header switches between **Rep View**, **Leadership** (an executive adoption dashboard, filterable by rep,
period, and vertical), and **Roadmap** (an executive view of delivery phases, the three critical-path
dependencies, and a traceable log of review feedback and what was done about it).

## Architecture

The account/product/playbook content is fully separated from the UI so the prototype can be re-pointed at real
data later without touching components:

```
types/        TypeScript interfaces for every entity (Account, ProductOpportunity, MeetingStrategy, ...)
data/         All demo content — accounts, business context, the 5 product-opportunity slots per account,
              the sales playbook, journey templates, brief narratives, leadership activity, the roadmap,
              greenfield archetypes, Ask KMC responses
lib/          Business logic — data-access boundary, brief generation, journey resolution, greenfield
              profiling, leadership filtering, presentation sanitization, Ask KMC lookup, sessionStorage
              helpers, formatting
context/      React providers — account identity, demo progress, onboarding, Ask KMC state, the Present-mode
              transition
components/   UI, organized by screen, plus shared/, motion/, and ui/ (shadcn) primitives
app/          Next.js App Router routes
```

Each account exposes five generic, config-driven product slots (`productSlot1`–`productSlot5`) using one
reusable schema (`ProductOpportunity`) — real Liberty product names can be swapped in later purely by editing
`data/products.ts`, with no UI changes required.

Leadership metrics are stored at rep-week grain in `data/leadership.ts` rather than as pre-baked headline
numbers, so the dashboard's rep / period / vertical filters genuinely recompute every metric in
`lib/leadership-filters.ts` instead of swapping between canned summaries. Row values come from a fixed-seed
generator, so the same figures render on the server and the client and across reloads.

`lib/presentation.ts` is a strict allowlist transform: Presentation Mode's `PresentationContent` type has no
field for internal-only data (fit score, priority, relevance signals, account health, revenue gap, objection
handling, etc.), so leaking those into the client-facing view is a compile error, not just a review concern.

## Tech stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · Lucide icons · Recharts · Framer Motion
(`motion`) · Geist (self-hosted, zero network dependency).

## Deploying

This is a standard Next.js app with no required configuration — it deploys to Vercel (or any Next.js host)
with zero environment variables.
