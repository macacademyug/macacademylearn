# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Mac Academy App

**Purpose**: Mobile-responsive educational app for FlipaClip animation courses.

### Architecture

- **Expo React Native** app at `artifacts/mac-academy/`
- **Authentication**: Clerk (email/password + Google OAuth)
- **Progress tracking**: AsyncStorage via `context/ProgressContext.tsx`
- **Course data**: `data/courses.ts` (Beginner free, Intermediate + Advanced paid)
- **Payment**: Flutterwave external link (configurable per-course in `data/courses.ts`)

### Screens

- `app/index.tsx` — Auth redirect (→ sign-in or home)
- `app/(auth)/sign-in.tsx` — Sign in (email + Google)
- `app/(auth)/sign-up.tsx` — Sign up (email + Google)
- `app/(tabs)/index.tsx` — Course dashboard (home)
- `app/(tabs)/profile.tsx` — User profile + progress stats
- `app/course/[id].tsx` — Course detail + lesson list
- `app/lesson/[id].tsx` — Video lesson + Mark as Complete

### Key Files

- `data/courses.ts` — All course + lesson data. Update `videoUrl` fields with real YouTube/Vimeo links.
- `data/courses.ts` — Update `flutterwaveLink` per course for payment.
- `constants/colors.ts` — Dark theme with orange (#FF6B1A) accents.

### Environment Variables

- `CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` — auto-provisioned by Clerk setup
