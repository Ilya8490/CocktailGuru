# Cocktail Guru

Cocktail Guru is a premium frontend portfolio experience for discovering and building cocktails. Phase 1 establishes the application architecture and introduces the visual world through an original, responsive Graphic Art Deco landing page.

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

The cocktail dataset, library filters, drag-and-drop builder, Zustand stores, and LocalStorage favorites begin in later phases.

## Stack

- React 19 and strict TypeScript
- Vite 8
- Tailwind CSS 4
- React Router
- Framer Motion
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

| Route | Phase 1 behavior |
| --- | --- |
| `/` | Complete landing experience |
| `/builder` | Builder preview placeholder |
| `/library` | Library preview placeholder |
| `/favorites` | Favorites preview placeholder |
| Any unknown path | Branded 404 recovery |

## Architecture

`src/router.tsx` defines the application surface. `AppLayout` owns the persistent Header, routed content, and Footer. Home-page sections remain focused and composable under `src/components/home`, while reusable interaction primitives live under `src/components/ui`.

Only the mobile menu uses local component state in Phase 1. Zustand and LocalStorage are intentionally absent until product state exists.

## Accessibility

- Semantic landmarks and ordered heading hierarchy
- Keyboard-visible focus treatment and skip link
- Active-route semantics through `NavLink`
- Mobile-menu expanded state and accessible naming
- Descriptive image roles and stable image containers
- WCAG AA-oriented color contrast
- Static fallbacks for `prefers-reduced-motion`

## Art direction

The interface uses original, locally stored cocktail photography generated for this project. The visual system combines deep burgundy surfaces, antique-gold rules, large Cormorant Garamond typography, generous negative space, and restrained motion. Art Deco geometry structures the page without turning it into ornament for ornament’s sake.
