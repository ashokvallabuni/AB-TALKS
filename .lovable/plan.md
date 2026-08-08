# ABTalks Rebuild — Real Content, Modern Mobile-First UI

## What the uploaded PDF actually contains

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

It contains **no** course detail pages, no lesson lists, and no dashboard screens. So the PDF is the source of truth for the homepage and the program names and descriptions; the existing in-app structures (daily task detail, dashboard, jobs) are preserved, renamed only where the PDF gives the real name.

## What changes

### 1. Content alignment (nothing invented)
- Replace current track titles with the four real program names and their exact descriptions.
- Homepage rebuilt to the real hierarchy: Hero → four program cards → hiring-partners strip → How ABTalks works → Community join → Testimonials → Footer with team@abtalks.in.
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
- Routes: `/`, `/courses`, `/courses/$slug`, `/task/$dayId`, `/dashboard`, `/profile` (new), `/jobs`, `/auth`.
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

- Existing typecheck errors need clearing as part of this work: missing asset modules (`abt-logo.png`, the four course images, `styles.css?url`), and strict-null/optional issues in `user-store.ts`, `dashboard.tsx`, `index.tsx`, and `task.$dayId.tsx`.

- Stack stays React + TanStack Start (file-based routing) with Tailwind v4 — the project's fixed stack. Next.js is not available here; SSR, routing, and SEO outcomes are equivalent.
- Backend is Lovable Cloud (Postgres, auth, storage), covering the Firebase/Supabase requirement with no external account setup.
- Protected routes live under `_authenticated/`; public program pages keep SSR for SEO.
- `framer-motion` added as a dependency.

## Open item

If you have the real per-program module and lesson breakdown, send it and I will wire the exact lesson lists in. Until then, program detail pages use the four real programs and the existing day/task structure, without inventing lesson titles.