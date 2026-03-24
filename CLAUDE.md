# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev       # Development server with Turbopack
pnpm build     # Production build
pnpm start     # Production server
pnpm lint      # ESLint (eslint-config-next / core-web-vitals)

# Database seeding (run once after setting up env vars)
# GET /api/seed — creates tables and inserts placeholder data
```

No test commands are currently configured.

## Architecture

This is a Next.js 16 App Router project using React Server Components and direct PostgreSQL queries (no ORM) against a Neon serverless database.

### Directory conventions

- `src/_lib/` — server-only utilities: `data.ts` (all DB queries), `definitions.ts` (TypeScript types), `utils.ts`, `placeholder-data.ts`
- `src/_ui/` — reusable components, organized by feature (`dashboard/`, `invoices/`, `customers/`)
- `src/app/dashboard/` — protected route group; nested routes for invoices and customers
- `src/app/seed/route.ts` — one-off GET endpoint that creates tables and seeds the database

The `@/*` path alias resolves to `src/*` (configured in `tsconfig.json`), so imports use `@/_lib/` and `@/_ui/`.

### Data fetching

All database queries live in `src/_lib/data.ts` as async functions using the `postgres` SQL client with parameterized queries. Pages call these functions directly (they are Server Components). There is no API layer for reads — data flows from DB → server component → rendered HTML.

### Client vs. server components

Interactive UI (search, pagination) uses `'use client'` with `useRouter`/`useSearchParams` to manipulate URL search params. Data-fetching components are `async` server components. Loading states use `<Suspense>` with skeleton components from `src/_ui/skeletons.tsx`.

### Auth

`next-auth` v5 (beta) is installed but **not yet configured**. The login form has no server action, routes are unprotected, and there is no middleware. This is the primary incomplete feature.

### Environment variables

Required in `.env.local`:

```
POSTGRES_URL          # Neon pooled connection string
AUTH_SECRET           # next-auth secret (generate with: npx auth secret)
AUTH_URL              # http://localhost:3000/api/auth
```
