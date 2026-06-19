# Cocktail Guru Phase 3 Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive, URL-driven cocktail Library and data-driven cocktail detail pages from the Phase 2 catalog.

**Architecture:** Keep the URL as the only source of Library state. Pure utilities parse, serialize, search, and filter; a small controller hook coordinates React Router history; focused presentational components consume typed props and one shared filter configuration. Both cards and detail pages resolve cocktails from the existing catalog.

**Tech Stack:** React 19, TypeScript, React Router 7, Tailwind CSS 4/global CSS, Framer Motion, Vitest, React Testing Library

---

## File map

### Create

- `src/config/libraryFilters.ts` — shared desktop/mobile filter groups and labels
- `src/utils/libraryQuery.ts` — canonical URL parsing, serialization, and Library-result composition
- `src/utils/libraryQuery.test.ts` — pure URL-contract tests
- `src/hooks/useLibraryFilters.ts` — React Router controller for replace-vs-push updates
- `src/components/library/CocktailSearch.tsx` — controlled instant-search input
- `src/components/library/CocktailFilters.tsx` — shared filter-group renderer
- `src/components/library/ActiveFilters.tsx` — removable active-filter chips
- `src/components/library/MobileFilterSheet.tsx` — responsive presentation using shared configuration
- `src/components/library/CocktailCard.tsx` — editorial catalog card and state-preserving detail link
- `src/components/library/CocktailGrid.tsx` — semantic result collection
- `src/components/library/LibraryEmptyState.tsx` — no-results recovery
- `src/components/library/LibraryHero.tsx` — compact collection introduction
- `src/components/library/TasteProfile.tsx` — shared six-axis detail presentation
- `src/components/library/index.ts` — Library component exports
- `src/pages/LibraryPage.tsx` — route composition
- `src/pages/LibraryPage.test.tsx` — preserved-return-state and clear-all tests
- `src/pages/CocktailDetailPage.tsx` — shared data-driven recipe template and invalid-slug recovery
- `src/pages/CocktailDetailPage.test.tsx` — invalid-slug route test

### Modify

- `src/types/cocktail.ts` — export `TasteAxis`
- `src/utils/cocktails.ts` — support canonical ingredient IDs and prominent tastes
- `src/utils/cocktails.test.ts` — protect filter composition semantics
- `src/utils/index.ts` — export Library query utilities
- `src/router.tsx` — replace the Library placeholder and add the slug route
- `src/router.test.tsx` — remove the obsolete Library placeholder case
- `src/styles/globals.css` — Library, cards, filter sheet, empty state, and detail presentation
- `README.md` — document Phase 3 behavior and routes

## Task 1: Extend pure cocktail filtering

**Files:**
- Modify: `src/types/cocktail.ts`
- Modify: `src/utils/cocktails.ts`
- Test: `src/utils/cocktails.test.ts`

- [ ] **Step 1: Write failing filter tests**

Add focused assertions to `src/utils/cocktails.test.ts`:

```ts
it('uses OR within a group and AND across filter groups', () => {
  const styles = filterCocktails({ origin: ['classic', 'mocktail'] })
  expect(styles).toHaveLength(15)

  const combined = filterCocktails({
    origin: ['classic', 'modern'],
    ingredientIds: ['gin', 'mezcal'],
    glass: ['rocks'],
  })
  expect(combined.map(({ id }) => id)).toEqual(
    expect.arrayContaining(['negroni', 'velvet-ember']),
  )
  expect(combined.every(({ glass }) => glass === 'rocks')).toBe(true)
})

it('filters by canonical ingredient and prominent taste', () => {
  expect(filterCocktails({ ingredientIds: ['citron-vodka'] }).map(({ id }) => id))
    .toEqual(['basil-beauty'])

  const bitterOrFruity = filterCocktails({ prominentTastes: ['bitter', 'fruity'] })
  expect(bitterOrFruity.map(({ id }) => id)).toEqual(
    expect.arrayContaining(['negroni', 'basil-beauty']),
  )
  expect(filterCocktails({
    ingredientIds: ['gin'],
    prominentTastes: ['bitter'],
  }).map(({ id }) => id)).toContain('negroni')
})
```

- [ ] **Step 2: Run the tests and confirm RED**

Run:

```bash
npm test -- src/utils/cocktails.test.ts
```

Expected: TypeScript/test failure because `ingredientIds` and `prominentTastes` do not exist.

- [ ] **Step 3: Add the minimal typed implementation**

In `src/types/cocktail.ts`, add:

```ts
export type TasteAxis = keyof TasteProfile
```

In `src/utils/cocktails.ts`, import `TasteAxis`, extend `CocktailFilters`, and add the two checks:

```ts
export interface CocktailFilters {
  origin?: CocktailOrigin[]
  tags?: string[]
  ingredientCategories?: IngredientCategory[]
  ingredientIds?: string[]
  prominentTastes?: TasteAxis[]
  glass?: Glassware[]
  alcoholic?: boolean
}

export const filterCocktails = (filters: CocktailFilters): Cocktail[] => cocktails.filter((cocktail) => {
  if (filters.origin?.length && !filters.origin.includes(cocktail.origin)) return false
  if (filters.glass?.length && !filters.glass.includes(cocktail.glass)) return false
  if (filters.tags?.length && !filters.tags.some((tag) => cocktail.tags.includes(tag))) return false
  if (filters.ingredientIds?.length
    && !cocktail.ingredients.some(({ ingredientId }) => filters.ingredientIds!.includes(ingredientId))) return false
  if (filters.prominentTastes?.length
    && !filters.prominentTastes.some((axis) => cocktail.taste[axis] >= 4)) return false

  const resolved = resolveRecipe(cocktail)
  if (filters.ingredientCategories?.length
    && !resolved.some(({ ingredient }) => filters.ingredientCategories!.includes(ingredient.category))) return false
  if (filters.alcoholic !== undefined
    && resolved.some(({ ingredient }) => ingredient.isAlcoholic) !== filters.alcoholic) return false
  return true
})
```

- [ ] **Step 4: Run the focused tests and confirm GREEN**

Run `npm test -- src/utils/cocktails.test.ts`.

Expected: all cocktail utility tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/types/cocktail.ts src/utils/cocktails.ts src/utils/cocktails.test.ts
git commit -m "feat: extend cocktail discovery filters"
```

## Task 2: Define shared filter configuration and canonical URL utilities

**Files:**
- Create: `src/config/libraryFilters.ts`
- Create: `src/utils/libraryQuery.ts`
- Create: `src/utils/libraryQuery.test.ts`
- Modify: `src/utils/index.ts`

- [ ] **Step 1: Write failing query-contract tests**

Create `src/utils/libraryQuery.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { parseLibraryQuery, serializeLibraryQuery } from './libraryQuery'

describe('library query contract', () => {
  it('parses valid values and ignores invalid values', () => {
    const query = parseLibraryQuery(new URLSearchParams(
      'q=  negroni  &style=classic,wrong&ingredient=gin,missing&taste=bitter,nope&glass=rocks,bucket',
    ))

    expect(query).toEqual({
      q: 'negroni',
      styles: ['classic'],
      ingredientIds: ['gin'],
      tastes: ['bitter'],
      glasses: ['rocks'],
    })
  })

  it('serializes canonical parameters in stable order', () => {
    const params = serializeLibraryQuery({
      q: 'negroni',
      styles: ['classic', 'classic'],
      ingredientIds: ['mezcal', 'gin'],
      tastes: ['fruity', 'bitter'],
      glasses: ['rocks'],
    })

    expect(params.toString()).toBe(
      'q=negroni&style=classic&ingredient=gin%2Cmezcal&taste=bitter%2Cfruity&glass=rocks',
    )
  })
})
```

- [ ] **Step 2: Run the tests and confirm RED**

Run `npm test -- src/utils/libraryQuery.test.ts`.

Expected: FAIL because `libraryQuery.ts` does not exist.

- [ ] **Step 3: Create the shared filter configuration**

Create `src/config/libraryFilters.ts` with typed values and visible labels:

```ts
import { ingredients } from '../data'
import type { CocktailOrigin, Glassware, TasteAxis } from '../types'

export const styleOptions: ReadonlyArray<{ value: CocktailOrigin; label: string }> = [
  { value: 'classic', label: 'Classics' },
  { value: 'modern', label: 'Modern' },
  { value: 'mocktail', label: 'Mocktails' },
]

export const tasteOptions: ReadonlyArray<{ value: TasteAxis; label: string }> = [
  { value: 'sweet', label: 'Sweet' },
  { value: 'sour', label: 'Sour' },
  { value: 'bitter', label: 'Bitter' },
  { value: 'strong', label: 'Strong' },
  { value: 'fruity', label: 'Fruity' },
  { value: 'spicy', label: 'Spicy' },
]

export const glassOptions: ReadonlyArray<{ value: Glassware; label: string }> = [
  { value: 'coupe', label: 'Coupe' },
  { value: 'nick-and-nora', label: 'Nick & Nora' },
  { value: 'martini', label: 'Martini' },
  { value: 'rocks', label: 'Rocks' },
  { value: 'highball', label: 'Highball' },
  { value: 'collins', label: 'Collins' },
  { value: 'flute', label: 'Flute' },
  { value: 'wine', label: 'Wine' },
  { value: 'copper-mug', label: 'Copper mug' },
]

const visibleIngredientIds = new Set([
  'bourbon', 'gin', 'tequila-blanco', 'white-rum', 'rye-whiskey', 'vodka',
  'mezcal', 'cognac', 'scotch', 'dark-rum', 'citron-vodka',
  'cranberry-juice', 'orange-juice', 'apricot-nectar',
])

export const ingredientOptions = ingredients
  .filter(({ id }) => visibleIngredientIds.has(id))
  .map(({ id: value, name: label }) => ({ value, label }))

export const libraryFilterGroups = [
  { key: 'styles', label: 'Style', options: styleOptions },
  { key: 'ingredientIds', label: 'Ingredient', options: ingredientOptions },
  { key: 'tastes', label: 'Taste', options: tasteOptions },
  { key: 'glasses', label: 'Glass', options: glassOptions },
] as const
```

- [ ] **Step 4: Implement parsing, serialization, and result composition**

Create `src/utils/libraryQuery.ts`:

```ts
import { glassOptions, styleOptions, tasteOptions } from '../config/libraryFilters'
import { ingredients } from '../data'
import type { Cocktail, CocktailOrigin, Glassware, TasteAxis } from '../types'
import { filterCocktails, searchCocktails } from './cocktails'

export interface LibraryQuery {
  q: string
  styles: CocktailOrigin[]
  ingredientIds: string[]
  tastes: TasteAxis[]
  glasses: Glassware[]
}

const styles: CocktailOrigin[] = styleOptions.map(({ value }) => value)
const tastes: TasteAxis[] = tasteOptions.map(({ value }) => value)
const glasses: Glassware[] = glassOptions.map(({ value }) => value)
const ingredientIds = ingredients.map(({ id }) => id)

const parseList = <T extends string>(value: string | null, allowed: readonly T[]): T[] => {
  const allowedSet = new Set<string>(allowed)
  return [...new Set((value ?? '').split(',').filter((item): item is T => allowedSet.has(item)))]
}

const orderBy = <T extends string>(values: T[], order: readonly T[]) =>
  [...new Set(values)].filter((value) => order.includes(value)).sort((a, b) => order.indexOf(a) - order.indexOf(b))

export const emptyLibraryQuery = (): LibraryQuery => ({
  q: '', styles: [], ingredientIds: [], tastes: [], glasses: [],
})

export function parseLibraryQuery(params: URLSearchParams): LibraryQuery {
  return {
    q: (params.get('q') ?? '').trim().replace(/\s+/g, ' '),
    styles: parseList(params.get('style'), styles),
    ingredientIds: parseList(params.get('ingredient'), ingredientIds),
    tastes: parseList(params.get('taste'), tastes),
    glasses: parseList(params.get('glass'), glasses),
  }
}

export function serializeLibraryQuery(query: LibraryQuery): URLSearchParams {
  const params = new URLSearchParams()
  const q = query.q.trim().replace(/\s+/g, ' ')
  if (q) params.set('q', q)
  const orderedStyles = orderBy(query.styles, styles)
  const orderedIngredients = orderBy(query.ingredientIds, ingredientIds)
  const orderedTastes = orderBy(query.tastes, tastes)
  const orderedGlasses = orderBy(query.glasses, glasses)
  if (orderedStyles.length) params.set('style', orderedStyles.join(','))
  if (orderedIngredients.length) params.set('ingredient', orderedIngredients.join(','))
  if (orderedTastes.length) params.set('taste', orderedTastes.join(','))
  if (orderedGlasses.length) params.set('glass', orderedGlasses.join(','))
  return params
}

export function getLibraryResults(query: LibraryQuery): Cocktail[] {
  const searchedIds = new Set(searchCocktails(query.q).map(({ id }) => id))
  return filterCocktails({
    origin: query.styles,
    ingredientIds: query.ingredientIds,
    prominentTastes: query.tastes,
    glass: query.glasses,
  }).filter(({ id }) => searchedIds.has(id))
}
```

Export the new module from `src/utils/index.ts`:

```ts
export * from './libraryQuery'
```

- [ ] **Step 5: Run tests and confirm GREEN**

Run `npm test -- src/utils/libraryQuery.test.ts src/utils/cocktails.test.ts`.

Expected: both files pass.

- [ ] **Step 6: Commit**

```bash
git add src/config/libraryFilters.ts src/utils/libraryQuery.ts src/utils/libraryQuery.test.ts src/utils/index.ts
git commit -m "feat: add canonical library query model"
```

## Task 3: Add the URL controller hook

**Files:**
- Create: `src/hooks/useLibraryFilters.ts`

- [ ] **Step 1: Implement one URL-backed controller**

Create `src/hooks/useLibraryFilters.ts`:

```ts
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { CocktailOrigin, Glassware, TasteAxis } from '../types'
import type { LibraryQuery } from '../utils'
import { emptyLibraryQuery, getLibraryResults, parseLibraryQuery, serializeLibraryQuery } from '../utils'

type FilterKey = 'styles' | 'ingredientIds' | 'tastes' | 'glasses'

const toggle = <T extends string>(values: T[], value: T): T[] =>
  values.includes(value) ? values.filter((item) => item !== value) : [...values, value]

const remove = <T extends string>(values: T[], value: T): T[] =>
  values.filter((item) => item !== value)

export function useLibraryFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = useMemo(() => parseLibraryQuery(searchParams), [searchParams])
  const results = useMemo(() => getLibraryResults(query), [query])

  const write = (next: LibraryQuery, replace = false) =>
    setSearchParams(serializeLibraryQuery(next), { replace })

  const setSearch = (q: string) => write({ ...query, q }, true)

  const toggleFilter = (key: FilterKey, value: string) => {
    if (key === 'styles') write({ ...query, styles: toggle(query.styles, value as CocktailOrigin) })
    if (key === 'ingredientIds') write({ ...query, ingredientIds: toggle(query.ingredientIds, value) })
    if (key === 'tastes') write({ ...query, tastes: toggle(query.tastes, value as TasteAxis) })
    if (key === 'glasses') write({ ...query, glasses: toggle(query.glasses, value as Glassware) })
  }

  const removeFilter = (key: FilterKey, value: string) => {
    if (key === 'styles') write({ ...query, styles: remove(query.styles, value as CocktailOrigin) })
    if (key === 'ingredientIds') write({ ...query, ingredientIds: remove(query.ingredientIds, value) })
    if (key === 'tastes') write({ ...query, tastes: remove(query.tastes, value as TasteAxis) })
    if (key === 'glasses') write({ ...query, glasses: remove(query.glasses, value as Glassware) })
  }

  const clearAll = () => write(emptyLibraryQuery())

  return { query, results, setSearch, toggleFilter, removeFilter, clearAll }
}
```

- [ ] **Step 2: Type-check the controller**

Run `npm run typecheck`.

Expected: PASS with no `any` types or computed-property widening.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useLibraryFilters.ts
git commit -m "feat: add URL-backed library controller"
```

## Task 4: Build shared search and filter controls

**Files:**
- Create: `src/components/library/CocktailSearch.tsx`
- Create: `src/components/library/CocktailFilters.tsx`
- Create: `src/components/library/ActiveFilters.tsx`
- Create: `src/components/library/MobileFilterSheet.tsx`
- Create: `src/components/library/LibraryEmptyState.tsx`

- [ ] **Step 1: Build the controlled search and shared filter renderer**

`CocktailSearch` receives `value` and `onChange`; it does not own query state:

```tsx
export function CocktailSearch({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="library-search">
      <span>Search the collection</span>
      <input
        type="search"
        value={value}
        placeholder="Negroni, gin, bitter…"
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}
```

`CocktailFilters` iterates `libraryFilterGroups` and receives `LibraryQuery` plus `onToggle`. Use checkbox inputs so the same component works in the desktop rail and mobile sheet. Every group renders a `<fieldset>` and `<legend>`.

- [ ] **Step 2: Build active chips and the empty state**

`ActiveFilters` converts active values to visible labels by looking them up in the same shared configuration. It calls `onRemove(key, value)` and renders a single `Clear all` button when anything is active.

Create `LibraryEmptyState`:

```tsx
export function LibraryEmptyState({ onClear }: { onClear: () => void }) {
  return (
    <section className="library-empty" aria-labelledby="library-empty-title">
      <p>Nothing in this measure</p>
      <h2 id="library-empty-title">No cocktails match this selection.</h2>
      <button type="button" onClick={onClear}>Clear all filters</button>
    </section>
  )
}
```

- [ ] **Step 3: Build the mobile presentation without duplicating logic**

`MobileFilterSheet` owns only `open` state, renders `CocktailFilters` inside a modal surface, closes on Escape, and restores focus to its trigger. Pass the same `query` and `onToggle` used by the desktop instance. Do not copy option arrays into this file.

- [ ] **Step 4: Run static checks**

Run `npm run typecheck && npm run lint`.

Expected: both pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/library/CocktailSearch.tsx src/components/library/CocktailFilters.tsx src/components/library/ActiveFilters.tsx src/components/library/MobileFilterSheet.tsx src/components/library/LibraryEmptyState.tsx
git commit -m "feat: add shared library controls"
```

## Task 5: Build the Library page and editorial card grid

**Files:**
- Create: `src/components/library/LibraryHero.tsx`
- Create: `src/components/library/CocktailCard.tsx`
- Create: `src/components/library/CocktailGrid.tsx`
- Create: `src/components/library/index.ts`
- Create: `src/pages/LibraryPage.tsx`
- Create: `src/pages/LibraryPage.test.tsx`
- Modify: `src/router.tsx`
- Modify: `src/router.test.tsx`

- [ ] **Step 1: Write the two focused failing Library tests**

Create `src/pages/LibraryPage.test.tsx`:

```tsx
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderApp } from '../test/renderApp'

describe('Library page', () => {
  it('preserves the filtered Library URL in cocktail link state', async () => {
    const user = userEvent.setup()
    const { router } = renderApp('/library?q=negroni&taste=bitter')
    await user.click(screen.getByRole('link', { name: /view negroni/i }))
    expect(router.state.location.pathname).toBe('/library/negroni')
    expect(router.state.location.state).toEqual({ from: '/library?q=negroni&taste=bitter' })
  })

  it('clears the empty result state back to the canonical Library URL', async () => {
    const user = userEvent.setup()
    const { router } = renderApp('/library?q=definitely-no-cocktail')
    await user.click(screen.getByRole('button', { name: /clear all filters/i }))
    expect(router.state.location.pathname).toBe('/library')
    expect(router.state.location.search).toBe('')
    expect(screen.getAllByRole('article')).toHaveLength(25)
  })
})
```

Remove `/library` from the placeholder table in `src/router.test.tsx`.

- [ ] **Step 2: Run the tests and confirm RED**

Run `npm test -- src/pages/LibraryPage.test.tsx src/router.test.tsx`.

Expected: FAIL because the Library still renders `ComingSoonPage`.

- [ ] **Step 3: Implement the card and grid**

`CocktailCard` receives one `Cocktail` and `from`. Its link must be:

```tsx
<Link
  to={`/library/${cocktail.slug}`}
  state={{ from }}
  aria-label={`View ${cocktail.name}`}
>
  View recipe <span aria-hidden="true">↗</span>
</Link>
```

Derive the image variant and accent deterministically from the cocktail index/ID; use the existing `hero-cocktail.jpg` and `ritual-cocktail.jpg` assets rather than new remote images. `CocktailGrid` renders a semantic list or a section containing one `<article>` per cocktail.

- [ ] **Step 4: Compose `LibraryPage`**

Use `useLocation` and `useLibraryFilters`. Compute `from` as `${location.pathname}${location.search}`. Render the hero, search, desktop rail, mobile sheet, active chips, result count, and either the grid or `LibraryEmptyState`.

Update `src/router.tsx`:

```tsx
import { LibraryPage } from './pages/LibraryPage'

// inside AppLayout children
{ path: 'library', element: <LibraryPage /> },
```

- [ ] **Step 5: Run focused tests and confirm GREEN**

Run `npm test -- src/pages/LibraryPage.test.tsx src/router.test.tsx`.

Expected: all focused Library and route tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/components/library src/pages/LibraryPage.tsx src/pages/LibraryPage.test.tsx src/router.tsx src/router.test.tsx
git commit -m "feat: build searchable cocktail library"
```

## Task 6: Add the data-driven detail route and invalid-slug recovery

**Files:**
- Create: `src/components/library/TasteProfile.tsx`
- Create: `src/pages/CocktailDetailPage.tsx`
- Create: `src/pages/CocktailDetailPage.test.tsx`
- Modify: `src/components/library/index.ts`
- Modify: `src/router.tsx`

- [ ] **Step 1: Write the failing invalid-slug test**

Create `src/pages/CocktailDetailPage.test.tsx`:

```tsx
import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp } from '../test/renderApp'

describe('Cocktail detail route', () => {
  it('renders cocktail recovery for an invalid slug', () => {
    renderApp('/library/not-a-cocktail')
    expect(screen.getByRole('heading', { name: /this pour is not in the collection/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /return to the library/i })).toHaveAttribute('href', '/library')
  })
})
```

- [ ] **Step 2: Run the test and confirm RED**

Run `npm test -- src/pages/CocktailDetailPage.test.tsx`.

Expected: FAIL because no slug route exists.

- [ ] **Step 3: Implement one shared detail template**

In `CocktailDetailPage`, read `slug` with `useParams`, resolve it using `getCocktailBySlug`, and resolve ingredients using `resolveRecipe`. Validate the return target exactly as approved:

```ts
const location = useLocation()
const state = location.state as { from?: unknown } | null
const backTo = typeof state?.from === 'string' && state.from.startsWith('/library')
  ? state.from
  : '/library'
```

For a valid cocktail, render from the record only: name, description, origin/style, glass, method, garnish, all six taste values, formatted metric ingredients, ordered instructions, and optional references. Do not add slug-specific branches.

For an invalid cocktail, render the dedicated recovery heading and links to `/library` and `/`.

`TasteProfile` iterates a typed `TasteAxis[]` and uses each 0–5 value for the visible score and CSS bar width.

- [ ] **Step 4: Add the detail route**

Update `src/router.tsx`:

```tsx
import { CocktailDetailPage } from './pages/CocktailDetailPage'

// after the Library route
{ path: 'library/:slug', element: <CocktailDetailPage /> },
```

- [ ] **Step 5: Run focused and existing route tests**

Run `npm test -- src/pages/CocktailDetailPage.test.tsx src/pages/LibraryPage.test.tsx src/router.test.tsx`.

Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add src/components/library/TasteProfile.tsx src/components/library/index.ts src/pages/CocktailDetailPage.tsx src/pages/CocktailDetailPage.test.tsx src/router.tsx
git commit -m "feat: add cocktail detail experience"
```

## Task 7: Apply the responsive visual system and complete verification

**Files:**
- Modify: `src/styles/globals.css`
- Modify: `README.md`

- [ ] **Step 1: Add Phase 3 styles**

Extend `src/styles/globals.css` with a scoped `.library-*` and `.cocktail-detail-*` system:

- Add top padding that clears the absolute Header.
- Build the compact radial-gradient Library hero.
- Use a desktop `minmax(14rem, 18rem) minmax(0, 1fr)` content grid.
- Make the desktop filter rail sticky beneath the Header.
- Render cards in `repeat(auto-fit, minmax(min(100%, 18rem), 1fr))`.
- Give card media a stable `aspect-ratio`, local background image, overlay, and ingredient-derived CSS custom property.
- Add gold focus/hover treatment without heavy shadows.
- Hide desktop filters and expose the mobile filter trigger below the desktop breakpoint.
- Render the mobile sheet as a fixed inset layer with a dark backdrop and scrollable panel.
- Use a two-column editorial detail layout on desktop and one column on mobile.
- Render taste bars with a gold fill driven by a CSS percentage custom property.
- Preserve the existing `prefers-reduced-motion` rule.

Do not restyle unrelated Home components.

- [ ] **Step 2: Update documentation**

Add a concise Phase 3 section to `README.md` documenting:

- `/library` search and URL filters
- `/library/:slug` detail routes
- `q`, `style`, `ingredient`, `taste`, and `glass` parameters
- Shared desktop/mobile filter configuration
- Data-driven detail pages and safe return navigation

Update the route table so Library no longer says placeholder.

- [ ] **Step 3: Run the complete automated gate**

Run:

```bash
npm run typecheck && npm run lint && npm test && npm run build
```

Expected: zero type or lint errors, all prior and new tests pass, and Vite produces `dist/` successfully.

- [ ] **Step 4: Run visual route verification**

Start the application with `npm run dev`. Use the browser-verification workflow to inspect:

- `/library`
- `/library?q=negroni&style=classic&taste=bitter`
- `/library/basil-beauty`
- `/library/not-a-cocktail`
- A mobile viewport with the filter sheet open

Confirm no console errors, clipped controls, horizontal overflow, missing content, or broken return navigation. Correct only issues within Phase 3 scope, then rerun the full automated gate if code changes.

- [ ] **Step 5: Commit**

```bash
git add src/styles/globals.css README.md
git commit -m "docs: complete Cocktail Guru phase 3"
```

## Final acceptance checklist

- [ ] `/library` displays all 25 cocktails with no filters.
- [ ] Search and filters round-trip through canonical query parameters.
- [ ] Search typing replaces browser history; filter actions push history.
- [ ] OR-within-group and AND-across-group semantics are tested.
- [ ] Ingredient and prominent-taste filters are tested.
- [ ] Desktop and mobile controls read one shared configuration.
- [ ] Card navigation preserves the exact filtered Library URL in state.
- [ ] Valid slugs render one data-driven detail template.
- [ ] Invalid slugs render dedicated recovery UI.
- [ ] Empty results clear back to `/library`.
- [ ] The final typecheck, lint, test, build, and browser verification gates pass.
