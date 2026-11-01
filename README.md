# Cocktail Guru

Cocktail Guru is a premium React portfolio application for discovering, building, and saving cocktail recipes. It is designed as a dark luxury, Art Deco cocktail bar experience with editorial photography, cinematic motion, polished empty/error states, and a frontend architecture that stays approachable for review.

## Features

- Full-bleed Home experience with Burgundy Velvet art direction
- Searchable cocktail Library with shareable URL search and filters
- Data-driven cocktail detail pages with metric recipes, taste profiles, methods, garnish, and references
- Interactive Builder that matches selected ingredients to exact and near recipe suggestions
- Persistent Favorites powered by Zustand and safe LocalStorage storage
- Premium loading, empty, and error recovery states across key routes
- Responsive layouts for desktop, tablet, and mobile portfolio screenshots
- Accessible navigation, focus states, keyboard interactions, reduced-motion support, and semantic page structure

## Tech Stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4
- React Router
- Framer Motion
- Zustand
- Vitest and React Testing Library
- ESLint

## Visual Direction

The project uses the Burgundy Velvet palette: deep ink backgrounds, burgundy surfaces, wine accents, antique gold rules, ivory text, and muted secondary copy. The interface is intentionally cinematic, with large cocktail imagery, elegant serif headings, thin uppercase labels, glassy surfaces, restrained shimmer, and subtle Framer Motion transitions.

## Project Phases

- Phase 1: Foundation, routing, layout, Home page, visual system
- Phase 2: Normalized cocktail and ingredient data layer
- Phase 3: Library search, filters, grid, and cocktail detail pages
- Phase 4: Interactive ingredient Builder and matching logic
- Phase 5: Motion system, page transitions, hover states, and reduced-motion handling
- Phase 6: Persistent Favorites, sorting, favorite buttons, and storage recovery
- Phase 7: Responsive and accessibility hardening across all key routes
- Phase 8: Loading states, empty states, error states, screenshot guidance, deployment prep, and README polish

## Accessibility

- Skip link and semantic landmarks
- Keyboard-accessible navigation, filters, favorites, and Builder controls
- Escape key support and focus restoration for mobile menus and filter sheets
- Visible gold focus rings on interactive elements
- `aria-current`, `aria-expanded`, `aria-pressed`, live favorite counts, and screen-reader helper text where useful
- Reduced-motion fallbacks for animated surfaces
- Contrast-conscious dark theme with non-color-only favorite states

## Responsive Design

The app is tuned for common portfolio review sizes and narrow mobile layouts. Large display headings use safer `clamp()` sizing, grids collapse early, controls wrap before overflow, and decorative Art Deco elements stay inside section boundaries.

Recommended manual review routes:

- `/`
- `/library`
- `/builder`
- `/library/negroni`
- `/favorites`
- `/library/not-a-cocktail`

## Portfolio Screenshots

Do not commit screenshot files unless a portfolio export folder already exists. Suggested captures:

| Page | Viewport | Suggested name |
| --- | --- | --- |
| Home | 1440 x 1100 | `cocktail-guru-home-desktop.png` |
| Library | 1440 x 1100 | `cocktail-guru-library-desktop.png` |
| Builder | 1440 x 1100 | `cocktail-guru-builder-desktop.png` |
| Detail | 1440 x 1100 | `cocktail-guru-detail-desktop.png` |
| Favorites empty | 1440 x 1100 | `cocktail-guru-favorites-empty-desktop.png` |
| Home mobile | 390 x 844 | `cocktail-guru-home-mobile.png` |
| Builder mobile | 390 x 844 | `cocktail-guru-builder-mobile.png` |
| Library mobile | 390 x 844 | `cocktail-guru-library-mobile.png` |

## Local Setup

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build Commands

```bash
npm run dev
npm run build
npm run preview
npm run test
npm run lint
npm run typecheck
```

## Deployment

The app is a Vite single-page application and is ready for Vercel or Netlify.

### Vercel

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`
- SPA refresh routing is handled by `vercel.json`.

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- Install command: `npm install`
- SPA refresh routing is handled by `public/_redirects`, which Vite copies into `dist`.

After deployment, verify:

- Direct refresh works on `/builder`, `/library`, `/library/negroni`, and `/favorites`
- Images load from the built asset bundle
- No console errors appear during primary flows
- Favorites persist after reload

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home and brand experience |
| `/builder` | Ingredient-based cocktail builder |
| `/library` | Searchable and filterable cocktail collection |
| `/library/:slug` | Cocktail recipe detail |
| `/favorites` | Persistent saved collection |
| Unknown paths | Branded recovery page |

## Architecture Notes

Library and Builder state are URL-driven where shareability matters. Favorites use a small Zustand store with LocalStorage persistence and corrupted-storage recovery. The data layer stays local and typed, keeping the MVP frontend-only while still demonstrating production-style organization.

Recipe content and sourcing conventions are documented in the [Recipe Content Standard](./docs/recipe-content-standard.md).

## Future Improvements

- Backend persistence and user accounts
- AI-assisted recommendations
- Expanded recipe dataset and seasonal collections
- Ingredient inventory profiles
- Advanced screenshot/export workflow for case studies
- Optional analytics for feature usage and conversion paths
