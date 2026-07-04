# Cocktail Guru

Cocktail Guru is a premium frontend portfolio experience for discovering, building, and saving cocktails. The application now includes the full editorial discovery flow, ingredient-based builder, persistent Favorites system, and a responsive Dark Luxury / Art Deco interface.

## Phase 1

- Full-bleed, image-led Home experience
- Graphic Art Deco design system with the Burgundy Velvet palette
- Responsive Header, mobile navigation, and Footer
- Working routes for Home, Builder, Library, and Favorites
- Designed placeholders for later product phases
- Branded not-found recovery page
- Framer Motion entrances and scroll depth
- Reduced-motion and keyboard-accessible behavior
- Automated routing, navigation, and Home-page tests

The later phases extend this foundation with a normalized cocktail dataset, Library filters, the interactive Builder, motion polish, persistent Favorites, and global responsive hardening.

## Phase 2 data layer

- 63 normalized ingredients with stable IDs, categories, aliases, colors, and alcohol metadata
- 25 complete metric-first recipes: 12 classics, 10 modern signatures, and 3 mocktails
- Six-axis taste profiles covering sweet, sour, bitter, strong, fruity, and spicy
- Pure lookup, recipe-resolution, search, filtering, ingredient-coverage, and measurement utilities
- Exact Basil Beauty recipe with reference metadata

Import types from `src/types`, catalog data from `src/data`, and public helpers from `src/utils`. Phase 2 remains independent of React state; Library controls and recommendation scoring belong to later phases.

## Phase 3 Library

- Responsive editorial grid for all 25 cocktails
- Instant search and shareable URL filters for `style`, `ingredient`, `taste`, and `glass`
- One shared filter configuration across desktop and mobile controls
- Data-driven cocktail pages at `/library/:slug`
- Complete metric recipes, taste profiles, methods, garnish, instructions, and references
- Safe return navigation to the previous filtered Library view
- Branded empty and invalid-cocktail recovery states

Library state lives entirely in the URL. Search typing replaces the current history entry, while intentional filter changes create navigable history entries.

## Phase 4 Builder

- Interactive `/builder` route powered by URL-selected ingredient IDs
- Tap-first ingredient selection with native drag-and-drop enhancement
- Featured bar shelf plus full ingredient search
- Mixing-glass selected state with clear and remove actions
- Exact recipe matches first, followed by ranked near matches
- No global state library or LocalStorage persistence

## Phase 5 Motion polish

- Reusable Framer Motion system with shared durations, easing, transitions, variants, stagger helpers, page transitions, hover/tap presets, and focused tests
- Smooth route enter and exit transitions through `AnimatePresence`
- Scroll reveals across Home, Library, cocktail detail, and Builder surfaces
- Premium button, navigation, badge, chip, card, modal, and sheet interactions
- Animated cocktail cards with entrance, hover lift, image zoom, shimmer, title/accent behavior, and tap compression
- Builder motion polish for ingredient affordances, animated glass liquid, valid recipe glow, result reveals, and live taste bars
- Reduced-motion support for animated surfaces and performance-friendly CSS transforms

## Phase 6 Favorites

- Persistent Favorites system powered by a dedicated Zustand store
- Safe LocalStorage persistence using the `cocktail-guru-favorites` key
- Storage shape limited to ordered `{ id, addedAt }` metadata instead of full cocktail objects
- Duplicate prevention, add/remove/toggle actions, clear action, and corrupted-storage recovery
- `useFavorites` hook resolves saved IDs against the cocktail dataset and filters missing recipes safely
- Reusable accessible `FavoriteButton` on Library cards, cocktail detail pages, and Builder result cards
- Complete `/favorites` page with premium hero, saved count, sorting, responsive cocktail grid, and polished empty state
- Sorting support for newest first, oldest first, and alphabetical order
- Navigation badge updates instantly as favorites change
- Favorites page removal uses Framer Motion layout/exit animation for clean grid reflow
- Store and page tests cover persistence behavior, duplicate prevention, corrupted LocalStorage handling, sorting, and removal

## Responsive hardening

- Global typography rhythm adjusted so large display headings do not overlap on mobile
- Safer `clamp()` font sizes, line-height, and section spacing across Home, Library, Builder, Favorites, and detail pages
- Grid and flex layouts refactored with stable `minmax(0, ...)`, earlier tablet breakpoints, wrapping controls, and phone-specific rules
- Decorative Art Deco elements kept inside section boundaries at narrow widths
- Browser-verified at 1440, 1024, 768, 430, and 390px with no horizontal overflow across key routes

## Stack

- React 19 and strict TypeScript
- Vite 8
- Tailwind CSS 4
- React Router
- Framer Motion
- Zustand
- Vitest and React Testing Library
- ESLint

## Run locally

```bash
npm install
npm run dev
```

Open the localhost URL printed by Vite.

## Quality commands

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Routes

| Route | Behavior |
| --- | --- |
| `/` | Complete landing experience |
| `/builder` | URL-driven interactive cocktail builder |
| `/library` | Searchable and filterable cocktail collection |
| `/library/:slug` | Data-driven cocktail recipe and taste profile |
| `/favorites` | Persistent saved cocktail collection with sorting and empty state |
| Any unknown path | Branded 404 recovery |

## Architecture

`src/router.tsx` defines the application surface. `AppLayout` owns the persistent Header, routed content, and Footer. Home-page sections remain focused and composable under `src/components/home`, while reusable interaction primitives live under `src/components/ui`.

Library and Builder state remain URL-driven where shareability matters. Persistent user data lives in the Favorites Zustand store under `src/stores`, while `src/hooks/useFavorites.ts` resolves saved IDs into renderable cocktail objects.

## Accessibility

- Semantic landmarks and ordered heading hierarchy
- Keyboard-visible focus treatment and skip link
- Active-route semantics through `NavLink`
- Mobile-menu expanded state and accessible naming
- Accessible favorite buttons with semantic pressed state and non-color-only heart states
- Screen-reader friendly favorite counts and live navigation badge updates
- Descriptive image roles and stable image containers
- WCAG AA-oriented color contrast
- Static fallbacks for `prefers-reduced-motion`

## Art direction

The interface uses original, locally stored cocktail photography generated for this project. The visual system combines deep burgundy surfaces, antique-gold rules, large Cormorant Garamond typography, generous negative space, and restrained motion. Art Deco geometry structures the page without turning it into ornament for ornament’s sake.
