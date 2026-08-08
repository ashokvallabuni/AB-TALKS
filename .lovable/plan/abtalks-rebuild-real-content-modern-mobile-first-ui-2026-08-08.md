# ABTalks Rebuild — Real Content, Modern Mobile-First UI

## Sources of truth

Two real sources, used verbatim — nothing invented:

**A. The homepage PDF (abtalks.in)** — hero, programs, how-it-works, testimonials, footer.
**B. The signed-in screenshots you just sent** — dashboard, challenge day page, jobs, hackathon dashboard.

### What the signed-in screenshots show (real hierarchy to preserve)

- **Header**: AB TALKS wordmark, enrollment/track selector, Jobs link, synergy flame counter, theme toggle, user pill with name + email.
- **Track selector — "Your enrollments"**: `AI · Artificial Intelligence · Day 0 / 60 · "60 Days of Code — Artificial In…"`, `CLAUDE · Claude AI Mastery · Day 0 / 60 · "60-Day Claude AI Mastery Ch…"`, `HACK · ViCODATHON · "48 hours Vibe-Coding Hackat…"`, each with a progress bar and a check on the active one.
- **/dashboard**: campus-ambassador bar ("Want to be a campus ambassador for your college?" + Learn More) → "Your 60-Day Journey", "0 days complete · Day 2 of 60" → 60-tile grid (10 per row) with per-tile tooltip "Day 45: Unlocks on 20 Sep 2026" → legend: On time, Rejected, Missed, Missed - catch up, Future → "Today's Task" (`AI challenge · IST day 2`, Easy, ~60 min, "Your First Python AI Script", Start Today's Challenge) → four stat cards: DAY 2 OF 60 (calendar progress IST from start date), CURRENT STREAK (Longest: 0), DAYS COMPLETED, REFERRALS (code N74HYJ) → "Recent activity / Last 7 submissions".
- **/challenge/:day** (`?challenge=<id>`): back link to Dashboard, "Today (IST): day 2", title, `Day 2 · AI`, **Context**, **Real-World Impact**, **What to do** bullets, **Submission** bullets, then "Submit your solution" — confirm checkbox, GitHub URL (Optional · +5 synergy), LinkedIn URL (Optional · +8 synergy), "Submit Day 2".
- **/jobs**: "Open roles from the ABTalks community and partners." Cards with title, company · location, posted date, and a type badge (Full-time / Internship).
- **/hackathon/dashboard**: "Welcome, <name>" + team badge, "TIME LEFT TO SUBMIT" countdown (days/hrs/min/sec) with the deadline line, then the sponsor/perk block.

Everything above is kept in the same order and with the same labels; only the visual layer, mobile behaviour, and performance change.

## What the homepage PDF contains

The capture is the **homepage of abtalks.in only**. It gives real, verbatim content for:

- Brand line: "AB TALKS — Build in public. Grow together."
- H1: "Code consistently. Post publicly. Get noticed." plus the sub-line about India's coding community for college students
- Four programs with their real descriptions:
  1. **60-Day Coding Challenge** — one real task every day across AI, Data Science, or Software Engineering; build a streak and a public portfolio
  2. **Vibe Code Hackathon** — build anything using AI in 48 hours; solo or a team of up to three
  3. **31Days AI Cohort** — build and deploy a production AI chatbot in 31 days; RAG, agents, MCP, recruiter visibility
  4. **Claude Challenge** — master Claude through focused prompt-engineering tasks and practical AI workflows
- CTA "Start the challenge", "100+ hiring partners"
- "How ABTalks works": 1. Learn Daily, 2. Build & Showcase, 3. Get Hired, with their real copy
- Community block: "Meet builders, get event alerts, and stay accountable." / "Join now"
- Testimonials section and four real testimonials (Vivek — IT leader, 20+ years; Lakshay; Rida Khan — AI Enthusiast; Devpal Singh Anand)
- Footer contact: team@abtalks.in

The PDF covers the public homepage only. Program names on the dashboard side use the enrollment names from the screenshots (Artificial Intelligence, Claude AI Mastery, ViCODATHON).

## What changes

### 1. Content alignment (nothing invented)
- Replace current track titles with the real program names from both sources; enrollments use the exact dropdown labels and subtitles.
- Homepage rebuilt to the real hierarchy: Hero → four program cards → hiring-partners strip → How ABTalks works → Community join → Testimonials → Footer with team@abtalks.in.
- Dashboard, challenge day page, jobs, and hackathon dashboard rebuilt to the exact module order listed above.
- Real testimonials replace placeholder quotes.
- Daily-task, dashboard, and jobs logic stays structurally unchanged.

### 2. Accounts and cloud sync (Lovable Cloud)
- Email/password and Google sign-in on a public `/auth` page.
- `profiles` (display name, avatar, referral code) auto-created on signup.
- `enrollments`, `task_submissions` (day, GitHub URL, LinkedIn URL, synergy earned), `saved_programs`.
- Row-level security so each user reads and writes only their own rows, with the required grants.
- Progress, streak, synergy points, and saved items move from browser storage to the account, with a one-time migration of existing local data on first sign-in.
- Dashboard, Profile, and task submission move under an authenticated area; Home and program pages stay public and crawlable.

### 3. Pages and navigation
- Routes matching the real site: `/`, `/dashboard`, `/challenge/$day`, `/jobs`, `/hackathon/dashboard`, `/profile` (new), `/auth`, plus the existing `/courses` listing.
- New **Profile** page: avatar and name, email, referral code, synergy total, current and longest streak, saved programs, sign out.
- Mobile bottom navigation with exactly four items: Home, Courses, Dashboard, Profile.
- Header reflects session state: signed out shows Sign in; signed in shows an account menu with sign out.

### 4. UI/UX
- Mobile-first pass on every page: safe-area padding, larger tap targets, no clipped headers, grid-based header rows.
- Clean modern cards with progress bars on programs and daily tasks.
- **Sticky video player** on the lesson/task view, pinning to the top on scroll like YouTube while the lesson list scrolls beneath.
- **Framer Motion** for page transitions, staggered card entrances, and progress-bar animation, respecting reduced-motion.

### 5. Performance and SEO
- Lazy-loaded images with explicit dimensions, CDN-hosted assets, route-level code splitting.
- Title "ABTalks – Learn Coding Online", optimized meta description, and unique title/description/OG per route.
- Structured H1/H2/H3 on every page, `sitemap.xml` covering all public routes, JSON-LD organization and program schema.

## Technical notes

- The published site currently returns "Internal server error". Fixing that is step one: missing asset modules (`abt-logo.png`, the four course images, `styles.css?url`) and strict-null issues are breaking the server render.

- Existing typecheck errors need clearing as part of this work: missing asset modules (`abt-logo.png`, the four course images, `styles.css?url`), and strict-null/optional issues in `user-store.ts`, `dashboard.tsx`, `index.tsx`, and `task.$dayId.tsx`.

- Stack stays React + TanStack Start (file-based routing) with Tailwind v4 — the project's fixed stack. Next.js is not available here; SSR, routing, and SEO outcomes are equivalent.
- Backend is Lovable Cloud (Postgres, auth, storage), covering the Firebase/Supabase requirement with no external account setup.
- Protected routes live under `_authenticated/`; public program pages keep SSR for SEO.
- `framer-motion` added as a dependency.

## Open item

The screenshots show day 1–2 content only. Send the full day-by-day task list per track (or more captures) and I will fill in the real briefs; until then only the days visible in the screenshots carry real copy and the rest stay locked as "Future".