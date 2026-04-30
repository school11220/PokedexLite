# Pokedex Lite

A production-ready Pokédex assignment app built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and the public [PokéAPI](https://pokeapi.co/). The UI is a refactored React implementation of the provided Stitch dark-mode design: glass panels, red scanner accents, compact chips, responsive cards, mobile bottom navigation, and an accessible detail modal.

## Features

- Paginated Pokémon browsing with images and type badges
- Case-insensitive search by Pokémon name
- Single-select type filtering from PokéAPI
- Favorites persisted in `localStorage`
- Favorites-only view
- Accessible detail modal with keyboard and overlay close behavior
- Loading skeletons, retryable errors, and empty states
- Responsive layout for mobile, tablet, and desktop
- Dark-mode-first theme using Tailwind design tokens
- Typed API utilities with normalized internal data shapes
- In-memory session caching for Pokémon names, type lists, type memberships, and details

## Tech Stack (and Why)

- Next.js App Router: file-based routing, server/client component split, and optimized production builds.
- TypeScript: type safety across API data shapes, hooks, and components.
- Tailwind CSS: rapid, consistent styling for the glass UI and responsive layout.
- Framer Motion: smooth card/grid transitions and interactive micro-animations.
- Lucide React icons: lightweight, consistent icon set.
- Clerk: managed authentication with hosted UI for sign-in, sign-up, and profile.
- PokéAPI: public data source for Pokemon list, details, and types.

## Getting Started

Install dependencies:

```bash
npm install
```

Create `.env.local` with Clerk keys:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
CLERK_SECRET_KEY=your_key_here
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run start
```

Run TypeScript checks:

```bash
npm run type-check
```

Run lint:

```bash
npm run lint
```

## Project Structure

```text
app/
  layout.tsx
  page.tsx
  globals.css
components/
  layout/
  pokemon/
  states/
  ui/
hooks/
lib/
```

## Data Behavior

The app fetches list pages from PokéAPI with `limit` and `offset`. It does not fetch every Pokémon detail at once. Card/detail data is requested only for the Pokémon currently visible on the active page or selected in the detail modal.

Search, type filtering, and favorites use lightweight Pokémon name resources first, then paginate those results locally and fetch full detail data only for the visible cards. Favorites are stored under `pokedex-lite:favorites` in `localStorage`.

## Deployment Notes

Clerk requires `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` in the deployment environment. The app is ready to deploy to Vercel, Netlify, or any platform that supports Next.js.

## Challenges & Solutions

- Favorites persistence: implemented local storage sync and Clerk public metadata updates so favorites stay across sessions and accounts.
- Filter UX density: simplified the filters into a single-row layout with type dropdown, keeping the UI compact without losing functionality.
- Animated cards: used 3D transforms and Framer Motion while keeping the card content readable by hiding the back face and using a one-shot flip.
