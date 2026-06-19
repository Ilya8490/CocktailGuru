# Cocktail Guru Phase 1 Design

## Objective

Build the first complete, portfolio-ready slice of Cocktail Guru: a Vite and React foundation, a reusable routed app shell, a coherent design system, and a polished Home page. Phase 1 must feel intentionally finished while leaving clean boundaries for the cocktail data, library, builder, and favorites work in later phases.

## Scope

### Included

- Vite project with React and strict TypeScript
- Tailwind CSS and global visual tokens
- React Router application shell
- Persistent Header and Footer
- Reusable Button, SectionLabel, and PageTransition primitives
- Home page with four editorial sections
- Designed placeholder pages for Builder, Library, and Favorites
- Branded not-found page
- Responsive navigation and layouts
- Framer Motion transitions with reduced-motion support
- Automated tests for Phase 1 behavior
- Lint, type-check, test, build, and browser verification

### Excluded

- Cocktail and ingredient datasets
- Search and filtering
- Builder state and drag-and-drop
- Zustand stores
- LocalStorage persistence
- Favorites behavior
- Authentication, backend, payments, admin tools, and external APIs

## Chosen Approach

Use an experience-first foundation. The Home page receives the strongest implementation and visual polish, while shared components and real routes establish the architecture required by later phases. Future routes render intentional placeholder pages instead of dead links, but their product behavior is not implemented early.

This approach was chosen over an architecture-first scaffold, which would reduce the immediate portfolio impact, and a data-seeded foundation, which would pull Phase 2 concerns into Phase 1.

## Visual Direction

The approved direction is **Graphic Art Deco**.

The experience combines the Burgundy Velvet palette from the project brief with symmetrical geometry, thin gold rules, poster-like typography, cinematic cocktail photography, and restrained glass effects. The Art Deco references should organize the composition rather than become ornamental clutter.

### Visual Thesis

A midnight cocktail poster brought to life: burgundy velvet, precise gold geometry, generous darkness, and a warm central glow.

### Design Tokens

- Background: `#131112`
- Surface: `#1E181A`
- Primary burgundy: `#5B1F2A`
- Wine accent: `#8B2E3E`
- Gold accent: `#D6A354`
- Primary text: `#F5F0EA`
- Secondary text: `#AAA39E`
- Heading face: one elegant serif family
- Interface face: one clean sans-serif family
- Corners: 16–24px only where a contained interactive surface needs them
- Borders: thin and low-contrast, with gold reserved for emphasis
- Shadows: soft atmospheric depth, never heavy UI elevation

### Imagery

Use a locally stored, optimized cocktail photograph as the dominant hero anchor. The composition must provide a calm tonal area for text and must not contain signage, logos, or embedded typography. A burgundy-black overlay maintains legibility. Images reserve their dimensions to avoid layout shift and provide useful alternative text unless they are purely decorative.

## Architecture

### Application Shell

The router defines these routes:

- `/` — Home
- `/builder` — Builder placeholder
- `/library` — Library placeholder
- `/favorites` — Favorites placeholder
- `*` — Not Found

`AppLayout` owns the persistent Header, animated route outlet, and Footer. It prevents each page from rebuilding global layout concerns and gives later phases one stable integration point.

### Component Boundaries

- `Header`: wordmark, desktop navigation, accessible mobile-menu control, and responsive navigation panel
- `Footer`: restrained brand close, primary route links, and project context
- `AppLayout`: global page structure and route outlet
- `Button`: consistent primary and secondary link/button styling with focus states
- `SectionLabel`: small uppercase gold label with decorative rule treatment
- `PageTransition`: route-level entrance/exit behavior and reduced-motion fallback
- `Hero`: first-viewport poster composition and primary CTA
- `CraftProcess`: three-step explanation using editorial numbering and dividers rather than cards
- `FeaturedRitual`: image-led product-depth section with restrained tasting language
- `FinalInvitation`: focused closing CTA
- `ComingSoonPage`: shared future-route treatment with route-specific title and copy
- `NotFoundPage`: branded recovery experience with a link back home

Each component has one presentational or behavioral responsibility and exposes simple props where reuse is real. Phase 1 avoids speculative abstractions for future builder and cocktail components.

## Home Page Content Plan

### 1. Hero

The opening viewport behaves like an Art Deco poster. It contains the Cocktail Guru wordmark, a short uppercase label, a two- or three-line serif headline, one concise promise, and one dominant `Start Mixing` CTA linking to `/builder`. Symmetrical gold geometry frames the visual plane. The header overlays the hero so the first viewport remains a single composition.

### 2. Craft Process

Three horizontally arranged editorial steps explain the future product flow:

1. Choose ingredients
2. Discover the balance
3. Receive a recommendation

The layout uses large numerals, typography, whitespace, and dividers instead of a dashboard-style card grid. It stacks cleanly on narrow screens.

### 3. Featured Ritual

An oversized image and concise tasting notes deepen the cocktail-bar atmosphere and preview the kind of knowledge the full application will provide. This is not presented as real dynamic cocktail data; it is fixed editorial Home-page content for Phase 1.

### 4. Final Invitation

A quiet, high-contrast closing section repeats the primary action without repeating the hero copy. It links to `/builder` and leads naturally into the Footer.

## Interaction and Motion

Motion creates hierarchy and presence without becoming decorative noise.

- Hero elements enter in a short staggered sequence.
- Gold lines and the dominant image use subtle scroll-linked movement or depth.
- Buttons and navigation transitions communicate hover, focus, and open/closed state.
- Route changes use a restrained opacity and vertical transition.
- Animations remain smooth on mobile and do not block interaction.
- `prefers-reduced-motion` removes transforms and sequencing while preserving every content and navigation state.

## Responsive and Accessibility Behavior

- The desktop poster composition simplifies on mobile without losing brand, headline, or CTA hierarchy.
- Decorative geometry may be reduced or hidden when it competes with content.
- The mobile navigation uses a semantic button with an accessible name and expanded state.
- Opening the menu exposes real links in a logical focus order; selecting a link closes it.
- All interactive elements have visible keyboard focus styles and usable touch targets.
- Text and controls meet WCAG AA contrast against their immediate background.
- Landmarks, heading order, link names, and image alternative text are meaningful.
- Navigation and page content remain usable without animation.

## State and Data Flow

Phase 1 requires only local component state for the mobile navigation. The Header owns whether that menu is open and closes it after navigation.

No Zustand store or LocalStorage integration is introduced because Phase 1 has no durable product state. The router is the source of truth for the active page. Home-page editorial content remains static and colocated with its focused sections until the data phase provides a reason to extract product entities.

## Error and Empty Behavior

- Unknown paths render `NotFoundPage` with a clear Home recovery link.
- Builder, Library, and Favorites routes render intentional `ComingSoonPage` content and a return path rather than blank screens.
- Image containers provide the burgundy surface color and preserve their dimensions, so a failed image does not compromise layout or text contrast.
- The app must not emit runtime warnings, route errors, missing-key warnings, or accessibility warnings during standard navigation.

## Testing Strategy

Use Vitest, React Testing Library, `@testing-library/user-event`, and `@testing-library/jest-dom`.

Automated behavior tests cover:

- Home renders its primary heading and `Start Mixing` link.
- The primary CTA navigates to `/builder`.
- Header navigation reaches Library and Favorites.
- Active navigation state reflects the current route.
- The mobile menu exposes the correct expanded state, reveals links, and closes after selection.
- Placeholder routes provide a clear return action.
- An unknown route renders the branded not-found recovery action.
- Important controls and links have accessible names.

Tests are written before the corresponding production behavior. Presentational details that are better judged visually are verified through browser review rather than brittle CSS assertions.

## Verification Contract

Phase 1 is complete only when all of the following succeed:

- Strict TypeScript type-check
- ESLint
- Full Vitest suite
- Vite production build
- Browser verification of the Home page and every route
- Desktop and mobile viewport checks
- Keyboard navigation and visible focus checks
- Reduced-motion behavior check
- Browser console check with no application errors or warnings

## Success Criteria

- The first viewport unmistakably communicates Cocktail Guru and its primary action.
- The approved Graphic Art Deco direction is visible without overwhelming the product hierarchy.
- The Home page feels portfolio-ready, not like a scaffold.
- Every visible navigation link has a working destination.
- The layout is coherent and usable from mobile through wide desktop sizes.
- Shared components and route boundaries can accept later phases without structural rework.
- No MVP features outside Phase 1 are implemented prematurely.
