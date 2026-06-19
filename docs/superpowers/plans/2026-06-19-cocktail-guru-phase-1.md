# Cocktail Guru Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a portfolio-ready Graphic Art Deco landing experience on a tested Vite/React foundation with accessible routing, responsive navigation, motion, and graceful future-route placeholders.

**Architecture:** A browser router renders all pages inside one `AppLayout`, which owns the persistent Header, animated outlet, and Footer. The Home page composes four focused editorial sections; shared UI primitives hold repeated interaction styling, while route placeholders avoid prematurely introducing Phase 2 product state.

**Tech Stack:** React, TypeScript strict mode, Vite, Tailwind CSS, React Router, Framer Motion, Vitest, React Testing Library, ESLint

---

## File Map

- `package.json` — scripts and runtime/development dependencies
- `vite.config.ts` — Vite, Tailwind, and Vitest configuration
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` — strict TypeScript projects
- `eslint.config.js` — React and TypeScript lint rules
- `index.html` — application entry document and font connections
- `src/main.tsx` — React bootstrap
- `src/router.tsx` — route tree and route-specific placeholder configuration
- `src/test/setup.ts` — Testing Library matchers and cleanup
- `src/test/renderApp.tsx` — memory-router test helper
- `src/styles/globals.css` — Tailwind import, tokens, typography, focus, imagery, and reduced-motion styles
- `src/components/layout/AppLayout.tsx` — global page structure
- `src/components/layout/Header.tsx` — desktop/mobile navigation behavior
- `src/components/layout/Footer.tsx` — global closing navigation
- `src/components/ui/Button.tsx` — link and button visual variants
- `src/components/ui/SectionLabel.tsx` — reusable Art Deco section eyebrow
- `src/components/ui/PageTransition.tsx` — motion-safe page entrance
- `src/components/home/Hero.tsx` — full-viewport poster composition
- `src/components/home/CraftProcess.tsx` — three-step editorial explanation
- `src/components/home/FeaturedRitual.tsx` — image-led atmosphere section
- `src/components/home/FinalInvitation.tsx` — closing conversion section
- `src/pages/HomePage.tsx` — Home section composition
- `src/pages/ComingSoonPage.tsx` — Builder, Library, and Favorites placeholders
- `src/pages/NotFoundPage.tsx` — unknown-route recovery
- `src/assets/images/hero-cocktail.webp` — local hero photography
- `src/assets/images/ritual-cocktail.webp` — local supporting photography
- `src/router.test.tsx` — routing and recovery behavior
- `src/components/layout/Header.test.tsx` — navigation and menu behavior
- `src/pages/HomePage.test.tsx` — Home content and CTA behavior

### Task 1: Bootstrap the strict frontend toolchain

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `eslint.config.js`
- Create: `index.html`
- Create: `src/test/setup.ts`
- Create: `.gitignore`

- [ ] **Step 1: Initialize dependencies**

Run:

```bash
npm init -y
npm install react react-dom react-router-dom framer-motion
npm install -D typescript vite @vitejs/plugin-react @tailwindcss/vite tailwindcss vitest jsdom eslint @eslint/js typescript-eslint eslint-plugin-react-hooks eslint-plugin-react-refresh @types/react @types/react-dom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Expected: dependencies install and `package-lock.json` is created.

- [ ] **Step 2: Replace the generated package scripts**

Set `package.json` scripts to:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc -b --pretty false"
  }
}
```

Keep the dependency entries created by npm and set `"type": "module"` and `"private": true`.

- [ ] **Step 3: Configure Vite, Tailwind, and Vitest**

Create `vite.config.ts`:

```ts
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})
```

Create `src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(cleanup)
```

- [ ] **Step 4: Configure strict TypeScript**

Create `tsconfig.json`:

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

Create `tsconfig.app.json` with `strict`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `noUncheckedSideEffectImports`, `jsx: react-jsx`, and `types: ["vitest/globals"]`, including `src`. Create `tsconfig.node.json` with the same strictness for `vite.config.ts`.

- [ ] **Step 5: Add the entry document**

Create `index.html` with `<div id="root"></div>`, theme color `#131112`, descriptive title, and Google Font connections for Cormorant Garamond and Manrope. Use `<script type="module" src="/src/main.tsx"></script>` as the entry script; `src/main.tsx` is created with the router in Task 2.

Create `eslint.config.js`:

```js
import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
)
```

- [ ] **Step 6: Verify the installed toolchain**

Run: `npx tsc --version && npx vite --version && npx eslint --version && npx vitest --version`

Expected: all four tools print their installed versions and exit 0.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vite.config.ts tsconfig*.json eslint.config.js index.html src/test/setup.ts .gitignore
git commit -m "chore: bootstrap Cocktail Guru frontend"
```

### Task 2: Build the routed application shell test-first

**Files:**
- Create: `src/router.test.tsx`
- Create: `src/main.tsx`
- Create: `src/test/renderApp.tsx`
- Create: `src/router.tsx`
- Create: `src/components/layout/AppLayout.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/ui/PageTransition.tsx`
- Create: `src/pages/ComingSoonPage.tsx`
- Create: `src/pages/NotFoundPage.tsx`
- Create: `src/pages/HomePage.tsx`

- [ ] **Step 1: Write failing route tests**

Create `src/test/renderApp.tsx`:

```tsx
import { render } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { routes } from '../router'

export function renderApp(path = '/') {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  return { router, ...render(<RouterProvider router={router} />) }
}
```

Create `src/router.test.tsx`:

```tsx
import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp } from './test/renderApp'

describe('application routes', () => {
  it('renders the home route inside the application shell', () => {
    renderApp('/')
    expect(screen.getByRole('heading', { name: /craft your evening/i })).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it.each([
    ['/builder', 'The atelier is being prepared'],
    ['/library', 'The collection is being curated'],
    ['/favorites', 'Your private selection is coming'],
  ])('renders a purposeful placeholder at %s', (path, heading) => {
    renderApp(path)
    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /return home/i })).toHaveAttribute('href', '/')
  })

  it('renders recovery UI for an unknown route', () => {
    renderApp('/missing')
    expect(screen.getByRole('heading', { name: /lost after midnight/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /back to the bar/i })).toHaveAttribute('href', '/')
  })
})
```

- [ ] **Step 2: Run the tests and confirm RED**

Run: `npm test -- src/router.test.tsx`

Expected: FAIL because `routes` and the page/layout components do not exist.

- [ ] **Step 3: Implement the route tree and minimal pages**

Export a `RouteObject[]` named `routes` and a browser router named `router` from `src/router.tsx`:

```tsx
export const routes: RouteObject[] = [{
  element: <AppLayout />,
  children: [
    { index: true, element: <HomePage /> },
    { path: 'builder', element: <ComingSoonPage eyebrow="The next pour" title="The atelier is being prepared" /> },
    { path: 'library', element: <ComingSoonPage eyebrow="The collection" title="The collection is being curated" /> },
    { path: 'favorites', element: <ComingSoonPage eyebrow="Saved for later" title="Your private selection is coming" /> },
    { path: '*', element: <NotFoundPage /> },
  ],
}]
```

`AppLayout` renders `<Header />`, `<main id="main-content"><Outlet /></main>`, and `<Footer />`. `PageTransition` wraps page content in a Framer Motion element using `useReducedMotion()` and immediate static values when motion is reduced.

Create `src/main.tsx`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode><RouterProvider router={router} /></StrictMode>,
)
```

- [ ] **Step 4: Run the route tests and confirm GREEN**

Run: `npm test -- src/router.test.tsx`

Expected: all route cases pass.

- [ ] **Step 5: Commit**

```bash
git add src/main.tsx src/router.tsx src/router.test.tsx src/test/renderApp.tsx src/components/layout/AppLayout.tsx src/components/layout/Footer.tsx src/components/ui/PageTransition.tsx src/pages
git commit -m "feat: add routed application shell"
```

### Task 3: Implement accessible responsive navigation test-first

**Files:**
- Create: `src/components/layout/Header.test.tsx`
- Create: `src/components/layout/Header.tsx`

- [ ] **Step 1: Write failing Header tests**

```tsx
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderApp } from '../../test/renderApp'

describe('Header', () => {
  it('marks the current route and navigates to the library', async () => {
    const user = userEvent.setup()
    renderApp('/')
    const home = screen.getByRole('link', { name: 'Home' })
    expect(home).toHaveAttribute('aria-current', 'page')
    await user.click(screen.getAllByRole('link', { name: 'Library' })[0])
    expect(screen.getByRole('heading', { name: /collection is being curated/i })).toBeInTheDocument()
  })

  it('opens and closes the mobile navigation after selection', async () => {
    const user = userEvent.setup()
    renderApp('/')
    const toggle = screen.getByRole('button', { name: /open menu/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await user.click(screen.getAllByRole('link', { name: 'Favorites' }).at(-1)!)
    expect(screen.getByRole('heading', { name: /private selection is coming/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute('aria-expanded', 'false')
  })
})
```

- [ ] **Step 2: Run the Header tests and confirm RED**

Run: `npm test -- src/components/layout/Header.test.tsx`

Expected: FAIL because the final Header behavior is missing.

- [ ] **Step 3: Implement Header state and semantic navigation**

Use `NavLink` for Home, Builder, Library, and Favorites. The menu button owns `aria-controls="mobile-navigation"`, `aria-expanded`, and a dynamic accessible name. Close the local `open` state from each mobile `NavLink` click. Keep desktop and mobile link sets in one `navigation` constant to prevent label/path drift.

- [ ] **Step 4: Run Header and route tests**

Run: `npm test -- src/components/layout/Header.test.tsx src/router.test.tsx`

Expected: PASS with no React warnings.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Header.tsx src/components/layout/Header.test.tsx
git commit -m "feat: add accessible responsive navigation"
```

### Task 4: Build the Home experience test-first

**Files:**
- Create: `src/pages/HomePage.test.tsx`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/SectionLabel.tsx`
- Create: `src/components/home/Hero.tsx`
- Create: `src/components/home/CraftProcess.tsx`
- Create: `src/components/home/FeaturedRitual.tsx`
- Create: `src/components/home/FinalInvitation.tsx`
- Modify: `src/pages/HomePage.tsx`

- [ ] **Step 1: Write failing Home tests**

```tsx
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderApp } from '../test/renderApp'

describe('HomePage', () => {
  it('presents the brand promise, process, ritual, and primary action', () => {
    renderApp('/')
    expect(screen.getByRole('heading', { name: /craft your evening/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /three gestures, one perfect pour/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /the midnight ritual/i })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /start mixing/i })).toHaveLength(2)
  })

  it('sends the primary action to the builder', async () => {
    const user = userEvent.setup()
    renderApp('/')
    await user.click(screen.getAllByRole('link', { name: /start mixing/i })[0])
    expect(screen.getByRole('heading', { name: /atelier is being prepared/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the Home tests and confirm RED**

Run: `npm test -- src/pages/HomePage.test.tsx`

Expected: FAIL because the four final sections and CTA set do not exist.

- [ ] **Step 3: Implement reusable primitives**

`Button` accepts `to`, `children`, and `variant: 'gold' | 'outline'`, renders a React Router `Link`, and shares one focus-visible treatment. `SectionLabel` accepts `children` and renders a short decorative rule marked `aria-hidden="true"` beside its uppercase text.

- [ ] **Step 4: Implement the four Home sections**

Use this fixed process content in `CraftProcess`:

```ts
const steps = [
  { number: '01', title: 'Choose ingredients', body: 'Begin with the bottles, produce, and curiosities already within reach.' },
  { number: '02', title: 'Discover the balance', body: 'Watch sweetness, strength, acidity, and bitterness settle into proportion.' },
  { number: '03', title: 'Meet your cocktail', body: 'Receive a considered recipe shaped around what you chose.' },
]
```

`Hero` uses the approved label “The art of the pour,” heading “Craft your evening,” one sentence of support copy, and a `Start Mixing` link. `FeaturedRitual` uses heading “The midnight ritual” with concise notes for smoke, cherry, orange, and oak. `FinalInvitation` uses the second `Start Mixing` link without repeating the hero headline.

- [ ] **Step 5: Run all Home and route tests**

Run: `npm test -- src/pages/HomePage.test.tsx src/router.test.tsx`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/home src/components/ui/Button.tsx src/components/ui/SectionLabel.tsx src/pages/HomePage.tsx src/pages/HomePage.test.tsx
git commit -m "feat: compose Cocktail Guru home experience"
```

### Task 5: Apply the Graphic Art Deco design system and motion

**Files:**
- Create: `src/styles/globals.css`
- Create: `src/assets/images/hero-cocktail.webp`
- Create: `src/assets/images/ritual-cocktail.webp`
- Modify: `src/components/home/Hero.tsx`
- Modify: `src/components/home/FeaturedRitual.tsx`
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/ui/PageTransition.tsx`

- [ ] **Step 1: Generate and inspect the image assets**

Use the image generation workflow to create two local, realistic editorial photographs: a vertical amber cocktail in a cut-crystal coupe against a burgundy-black luxury bar, and a close horizontal still life with a dark stirred cocktail, orange peel, cherry, and warm Art Deco light. Require no people, signage, logos, embedded text, UI, or collage framing. Save optimized WebP assets at the exact paths above.

- [ ] **Step 2: Add global tokens and base behavior**

Create `src/styles/globals.css` beginning with:

```css
@import "tailwindcss";

:root {
  color-scheme: dark;
  --ink: #131112;
  --surface: #1e181a;
  --burgundy: #5b1f2a;
  --wine: #8b2e3e;
  --gold: #d6a354;
  --ivory: #f5f0ea;
  --muted: #aaa39e;
  font-family: "Manrope", sans-serif;
  background: var(--ink);
  color: var(--ivory);
}

html { background: var(--ink); scroll-behavior: smooth; }
body { margin: 0; min-width: 320px; min-height: 100vh; overflow-x: hidden; }
*, *::before, *::after { box-sizing: border-box; }
button, a { -webkit-tap-highlight-color: transparent; }
:focus-visible { outline: 2px solid var(--gold); outline-offset: 4px; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
}
```

Add focused component classes for full-bleed hero geometry, shared gutters, serif display type, gold labels/rules, responsive process dividers, image aspect-ratio containers, mobile navigation, and the final CTA. Keep routine layout cardless and use `clamp()` for display sizes and section spacing.

- [ ] **Step 3: Add intentional Framer Motion behavior**

In `Hero`, use one parent stagger and child fade/translate variants. In `FeaturedRitual`, use `useScroll` and `useTransform` for a small image translate range. In `PageTransition`, use a short opacity/vertical entrance. Every component uses `useReducedMotion()` to switch transforms and delays off.

- [ ] **Step 4: Verify no behavior regressions**

Run: `npm test`

Expected: all tests pass without warnings.

- [ ] **Step 5: Commit**

```bash
git add src/styles src/assets src/components
git commit -m "feat: apply Graphic Art Deco art direction"
```

### Task 6: Verify production quality and document the project

**Files:**
- Create: `README.md`
- Modify: `.gitignore`
- Modify: any Phase 1 file only when verification exposes a concrete defect

- [ ] **Step 1: Run automated quality gates**

Run:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Expected: all commands exit 0; the test suite is green and `dist/` is produced.

- [ ] **Step 2: Start the development server**

Run: `npm run dev -- --host 127.0.0.1`

Expected: Vite reports a reachable localhost URL.

- [ ] **Step 3: Perform browser verification**

Check `/`, `/builder`, `/library`, `/favorites`, and an unknown path. At 1440×900 and 390×844 verify: no horizontal overflow; header and hero fit coherently; mobile menu opens, is keyboard reachable, and closes after selection; both Home CTAs reach Builder; focus rings are visible; images have stable dimensions; reduced-motion mode removes staged transforms; and the console contains no application errors or warnings.

- [ ] **Step 4: Write the project README**

Document the Phase 1 feature set, exact stack, local setup (`npm install`, `npm run dev`), quality commands, route list, architecture summary, accessibility decisions, and the boundary between completed Phase 1 and future phases. Rename or remove the misspelled source brief only if the user requests it; do not silently delete `READMI.MD`.

- [ ] **Step 5: Re-run the complete gate after browser fixes**

Run: `npm run typecheck && npm run lint && npm test && npm run build`

Expected: exit 0 with no warnings introduced by final fixes.

- [ ] **Step 6: Commit**

```bash
git add README.md .gitignore src package.json package-lock.json
git commit -m "docs: complete Cocktail Guru phase 1"
```
