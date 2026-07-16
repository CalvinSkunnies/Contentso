# Contenso — Session Memory

## Product
Content planning OS for short-form video creators (IG Reels + TikTok). Pre-production workflow: trend discovery → ideas → AI hooks → scripts → calendar → pipeline → analytics.

## Brand
- **Name**: Contenso (content.so)
- **Tagline**: Plan. Script. Go Viral.
- **Repo**: https://github.com/CalvinSkunnies/Contentso
- **Deployment**: Vercel
- **Portfolio**: https://calvinskunnies.my.canva.site/
- **GitHub**: https://github.com/CalvinSkunnies

## Calendar (Drag & Drop)
- **Library**: @dnd-kit/core + @dnd-kit/sortable
- **Page**: `/dashboard/calendar`
- **Structure**: 7-column weekly grid (Sun-Sat)
- **Cards**: Draggable content items, color-coded (pink=IG Reels, teal=TikTok)
- **Status**: Idea → Scripted → Filmed → Editing → Scheduled → Posted
- **Features**: cross-day drag & drop, add dialog with platform/status picker, week navigation, today button, drag overlay with glow effect
- **Types**: `src/lib/calendar-types.ts` (ContentItem, Platform, ContentStatus)
- **Components**: `WeekView` (DndContext), `DayColumn` (droppable), `ContentCard` (sortable), `AddContentDialog`

## Architecture
- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS 3 + shadcn/ui primitives + glass-morphism design
- **Animations**: Framer Motion
- **Auth**: NextAuth v4 with Google OAuth
- **Testing**: Vitest + Testing Library (unit), Playwright (E2E)
- **CI**: GitHub Actions (lint → typecheck → test → e2e → build)
- **Deployment**: Vercel (vercel.json with `{ "framework": "nextjs" }`)

## Design System (CapCut-inspired)

| Token | Dark | Light |
|-------|------|-------|
| Background | `#0a0a0f` | `#fafafa` |
| Primary | `#00f0ff` (cyan) | `#0891b2` |
| Secondary | `#7c3aed` (purple) | `#7c3aed` |
| Card | `rgba(255,255,255,0.03)` | `rgba(255,255,255,0.8)` |
| Card border | `rgba(255,255,255,0.06)` | `rgba(0,0,0,0.08)` |

- Glass cards: `backdrop-blur-xl` + semi-transparent bg + border
- Background: dot-grid pattern + radial gradient glow
- Typography: Inter (UI), JetBrains Mono (data)
- Theme toggle: persistent via `next-themes`, default dark

## Features (all connected)
1. **Dashboard** - weekly snapshot, streak counter, quick actions
2. **Content Calendar** - drag & drop, color-coded (pink=IG, teal=TikTok)
3. **Ideas Board** - Pinterest-style moodboard for saving ideas
4. **Script Studio** - AI hooks + platform-optimized scripts + teleprompter
5. **Pipeline Board** - Kanban: Idea → Scripted → Filmed → Editing → Scheduled → Posted
6. **Trend Radar** - trending sounds/hooks/formats per niche
7. **Analytics** - virality prediction, engagement heat map, best time to post

## File Structure
```
src/
  app/
    layout.tsx              # Root: Inter + JetBrains Mono, Providers, Navbar, Footer
    globals.css             # Dark/light CSS variables, glass/grid/glow utilities
    page.tsx                # Landing page (Hero → Features → Q&A → Comparison → CTA)
    dashboard/page.tsx      # Protected dashboard (client-side auth check)
    auth/
      signin/page.tsx       # Google sign-in with official Google logo SVG
      error/page.tsx        # Auth error display
    api/auth/[...nextauth]/route.ts  # NextAuth handler
  components/
    ui/                     # shadcn primitives (button, card, badge)
    landing/                # Landing sections (hero, features, why-contenso, comparison, cta-section)
    navbar.tsx              # Glass nav with auth state + mobile menu + mode toggle
    footer.tsx              # "Built by Calvin Skunnies" + GitHub + Portfolio links
    providers.tsx           # SessionProvider + ThemeProvider
    mode-toggle.tsx         # Dark/bright toggle
  lib/
    auth.ts                 # NextAuth config (authOptions)
    utils.ts                # cn() helper
  __tests__/                # 47 unit/component tests
  middleware.ts             # Protects /dashboard/* routes
tests/e2e/                  # Playwright E2E tests
vitest.config.ts
playwright.config.ts
vercel.json
tailwind.config.ts
.github/workflows/ci.yml
```

## AI Terminal (Gemini)
- **Provider**: Google Gemini 2.0 Flash (free tier: 60 req/min)
- **SDK**: `@google/generative-ai`
- **Env var**: `GOOGLE_GEMINI_API_KEY` (get from https://aistudio.google.com/app/apikey)
- **Endpoint**: `POST /api/ai/chat` — chat with history support
- **Endpoint**: `POST /api/ai/analyze` — script scoring (hook, pacing, viral, clarity)
- **Page**: `/dashboard/ai` — terminal-style chat with quick actions
- **Features**: hook generator, script writer, idea brainstorm, content coach, script analyzer
- **Prompt templates**: `src/lib/prompts.ts` (5 system prompts)
- **UI**: terminal-style with message bubbles, quick-action buttons, score rings

## Auth Setup
- Google OAuth via NextAuth v4
- Route handler pattern: `const handler = NextAuth(authOptions); export { handler as GET, handler as POST }`
- Sign-in page at `/auth/signin` with Google logo SVG
- `middleware.ts` redirects unauthenticated users from `/dashboard/*` to `/auth/signin`
- Env vars: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`

## Testing
```
npm test          # Vitest (47 tests)
npm run test:e2e  # Playwright (8 E2E tests)
npm run ci        # Full pipeline
```

## Deployment
- Vercel auto-deploys from `main` branch
- Env vars must be set in Vercel project settings
- Google Cloud Console redirect URI must match Vercel domain exactly
