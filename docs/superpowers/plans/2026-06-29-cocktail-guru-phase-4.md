# Cocktail Guru Phase 4 Builder Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `/builder` route as a URL-driven interactive cocktail builder with tap-first ingredient selection, lightweight drag-and-drop enhancement, and deterministic exact/near matching.

**Architecture:** Builder code lives under `src/features/builder/`. Pure utilities parse and serialize selected ingredient IDs, matching utilities rank cocktails, and `useBuilderIngredients` adapts that pure logic to React Router. Components call shared add/remove/toggle actions so tap and drag behavior never diverge.

**Tech Stack:** React 19, TypeScript, React Router, Vite, Vitest, Testing Library, existing CSS. Do not add a drag-and-drop package or any global state library.

---

## File Structure

- Create: `src/features/builder/builder.utils.ts` — canonical query parsing, serialization, and add/remove/toggle helpers.
- Create: `src/features/builder/builder.utils.test.ts` — pure utility coverage for query parsing, invalid IDs, canonical ordering, and no-op selection behavior.
- Create: `src/features/builder/builder.matching.ts` — exact/near matching and result sorting.
- Create: `src/features/builder/builder.matching.test.ts` — exact-before-near and ranking coverage.
- Create: `src/features/builder/useBuilderIngredients.ts` — URL controller hook for selected ingredients.
- Create: `src/features/builder/BuilderHero.tsx` — route hero.
- Create: `src/features/builder/IngredientSearch.tsx` — ingredient search input.
- Create: `src/features/builder/IngredientToken.tsx` — tap and native-draggable ingredient button.
- Create: `src/features/builder/IngredientShelf.tsx` — featured shelf plus full-registry search results.
- Create: `src/features/builder/MixingGlass.tsx` — selected ingredient drop target and clear/remove controls.
- Create: `src/features/builder/BuilderResults.tsx` — empty, zero-match, exact, and near result composition.
- Create: `src/features/builder/BuilderMatchCard.tsx` — individual match card.
- Create: `src/features/builder/index.ts` — feature barrel.
- Create: `src/pages/BuilderPage.tsx` — thin route composition layer.
- Create: `src/pages/BuilderPage.test.tsx` — lean user interaction and URL-driven result tests.
- Modify: `src/router.tsx` — replace builder placeholder with `BuilderPage`.
- Modify: `src/styles/globals.css` — builder layout, shelf, glass, and result styles.
- Modify: `README.md` — Phase 4 summary and route table update.

---

### Task 1: Add Builder query and selection utilities

**Files:**
- Create: `src/features/builder/builder.utils.test.ts`
- Create: `src/features/builder/builder.utils.ts`

- [ ] **Step 1: Write failing utility tests**

Create `src/features/builder/builder.utils.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import {
  addIngredientId,
  parseBuilderQuery,
  removeIngredientId,
  sameIngredientSelection,
  serializeBuilderQuery,
  toggleIngredientId,
} from './builder.utils'

describe('builder query utilities', () => {
  it('parses canonical ingredient IDs and ignores invalid or duplicate values', () => {
    expect(parseBuilderQuery(new URLSearchParams('ingredients=campari,missing,gin,gin,lime-juice'))).toEqual([
      'gin',
      'campari',
      'lime-juice',
    ])
  })

  it('serializes selected ingredients in registry order', () => {
    expect(serializeBuilderQuery(['lime-juice', 'missing', 'gin', 'campari', 'gin']).toString()).toBe(
      'ingredients=gin%2Ccampari%2Clime-juice',
    )
  })

  it('returns an empty query for an empty or invalid selection', () => {
    expect(serializeBuilderQuery([]).toString()).toBe('')
    expect(serializeBuilderQuery(['missing']).toString()).toBe('')
    expect(parseBuilderQuery(new URLSearchParams('ingredients=missing,nope'))).toEqual([])
  })

  it('adds, removes, and toggles without duplicates', () => {
    expect(addIngredientId(['campari'], 'gin')).toEqual(['gin', 'campari'])
    expect(addIngredientId(['gin'], 'gin')).toEqual(['gin'])
    expect(removeIngredientId(['gin', 'campari'], 'gin')).toEqual(['campari'])
    expect(toggleIngredientId(['gin'], 'gin')).toEqual([])
    expect(toggleIngredientId(['gin'], 'campari')).toEqual(['gin', 'campari'])
  })

  it('detects equivalent selections after canonical ordering and invalid-value removal', () => {
    expect(sameIngredientSelection(['campari', 'gin'], ['gin', 'campari'])).toBe(true)
    expect(sameIngredientSelection(['campari', 'gin'], ['gin'])).toBe(false)
    expect(sameIngredientSelection(['missing'], [])).toBe(true)
  })
})
```

- [ ] **Step 2: Run the test and confirm it fails**

Run:

```bash
npm test -- src/features/builder/builder.utils.test.ts
```

Expected: FAIL because `builder.utils.ts` does not exist.

- [ ] **Step 3: Implement utilities**

Create `src/features/builder/builder.utils.ts`:

```ts
import { ingredients } from '../../data'

const ingredientOrder = ingredients.map(({ id }) => id)
const allowedIngredientIds = new Set(ingredientOrder)

export function orderIngredientIds(values: readonly string[]): string[] {
  const selected = new Set(values.filter((value) => allowedIngredientIds.has(value)))
  return ingredientOrder.filter((id) => selected.has(id))
}

export function parseBuilderQuery(params: URLSearchParams): string[] {
  return orderIngredientIds((params.get('ingredients') ?? '').split(',').filter(Boolean))
}

export function serializeBuilderQuery(ingredientIds: readonly string[]): URLSearchParams {
  const params = new URLSearchParams()
  const ordered = orderIngredientIds(ingredientIds)
  if (ordered.length) params.set('ingredients', ordered.join(','))
  return params
}

export function addIngredientId(current: readonly string[], ingredientId: string): string[] {
  return orderIngredientIds([...current, ingredientId])
}

export function removeIngredientId(current: readonly string[], ingredientId: string): string[] {
  return orderIngredientIds(current.filter((id) => id !== ingredientId))
}

export function toggleIngredientId(current: readonly string[], ingredientId: string): string[] {
  return current.includes(ingredientId)
    ? removeIngredientId(current, ingredientId)
    : addIngredientId(current, ingredientId)
}

export function sameIngredientSelection(a: readonly string[], b: readonly string[]): boolean {
  const orderedA = orderIngredientIds(a)
  const orderedB = orderIngredientIds(b)
  return orderedA.length === orderedB.length && orderedA.every((value, index) => value === orderedB[index])
}
```

- [ ] **Step 4: Run utility tests**

Run:

```bash
npm test -- src/features/builder/builder.utils.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit utilities**

```bash
git add src/features/builder/builder.utils.ts src/features/builder/builder.utils.test.ts
git commit -m "feat: add builder ingredient query utilities"
```

---

### Task 2: Add cocktail matching utilities

**Files:**
- Create: `src/features/builder/builder.matching.test.ts`
- Create: `src/features/builder/builder.matching.ts`

- [ ] **Step 1: Write failing matching tests**

Create `src/features/builder/builder.matching.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { getBuilderMatches } from './builder.matching'

describe('builder matching', () => {
  it('returns no matches when no ingredients are selected', () => {
    expect(getBuilderMatches([])).toEqual([])
  })

  it('sorts exact matches before near matches', () => {
    const results = getBuilderMatches(['gin', 'campari', 'sweet-vermouth'])

    expect(results[0]).toMatchObject({
      cocktail: expect.objectContaining({ id: 'negroni' }),
      kind: 'exact',
      missingCount: 0,
      ratio: 1,
    })
    expect(results.slice(1).every((match) => match.kind === 'near' || match.kind === 'exact')).toBe(true)
  })

  it('ranks near matches by coverage and missing count', () => {
    const results = getBuilderMatches(['gin', 'lemon-juice', 'simple-syrup'])
    const firstIds = results.slice(0, 3).map(({ cocktail }) => cocktail.id)

    expect(firstIds).toContain('tom-collins')
    expect(results.every((match) => match.kind === 'exact' || match.ratio >= 0.5 || match.missingCount <= 3)).toBe(true)
  })

  it('exposes available and missing recipe lines', () => {
    const negroni = getBuilderMatches(['gin']).find(({ cocktail }) => cocktail.id === 'negroni')

    expect(negroni).toMatchObject({
      kind: 'near',
      available: [expect.objectContaining({ ingredientId: 'gin' })],
      missingCount: 2,
    })
    expect(negroni?.missing.map(({ ingredientId }) => ingredientId)).toEqual(['campari', 'sweet-vermouth'])
  })
})
```

- [ ] **Step 2: Run matching tests and confirm failure**

Run:

```bash
npm test -- src/features/builder/builder.matching.test.ts
```

Expected: FAIL because `builder.matching.ts` does not exist.

- [ ] **Step 3: Implement matching**

Create `src/features/builder/builder.matching.ts`:

```ts
import { cocktails } from '../../data'
import type { Cocktail, RecipeIngredient } from '../../types'
import { getIngredientCoverage } from '../../utils'
import { orderIngredientIds } from './builder.utils'

export type BuilderMatchKind = 'exact' | 'near'

export interface BuilderMatch {
  cocktail: Cocktail
  kind: BuilderMatchKind
  available: RecipeIngredient[]
  missing: RecipeIngredient[]
  ratio: number
  missingCount: number
}

const isMeaningfulNearMatch = (ratio: number, missingCount: number) => ratio >= 0.5 || missingCount <= 3

export function getBuilderMatches(selectedIngredientIds: readonly string[]): BuilderMatch[] {
  const selected = orderIngredientIds(selectedIngredientIds)
  if (!selected.length) return []

  return cocktails
    .map((cocktail): BuilderMatch | null => {
      const coverage = getIngredientCoverage(cocktail, selected)
      if (!coverage.available.length) return null

      const missingCount = coverage.missing.length
      const kind: BuilderMatchKind = missingCount === 0 ? 'exact' : 'near'

      if (kind === 'near' && !isMeaningfulNearMatch(coverage.ratio, missingCount)) return null

      return {
        cocktail,
        kind,
        available: coverage.available,
        missing: coverage.missing,
        ratio: coverage.ratio,
        missingCount,
      }
    })
    .filter((match): match is BuilderMatch => match !== null)
    .sort((a, b) => {
      if (a.kind !== b.kind) return a.kind === 'exact' ? -1 : 1
      if (b.ratio !== a.ratio) return b.ratio - a.ratio
      if (a.missingCount !== b.missingCount) return a.missingCount - b.missingCount
      return a.cocktail.name.localeCompare(b.cocktail.name)
    })
}
```

- [ ] **Step 4: Run matching tests**

Run:

```bash
npm test -- src/features/builder/builder.matching.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit matching**

```bash
git add src/features/builder/builder.matching.ts src/features/builder/builder.matching.test.ts
git commit -m "feat: add builder cocktail matching"
```

---

### Task 3: Add the URL controller hook

**Files:**
- Create: `src/features/builder/useBuilderIngredients.ts`

- [ ] **Step 1: Implement the hook**

Create `src/features/builder/useBuilderIngredients.ts`:

```ts
import { useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  addIngredientId,
  parseBuilderQuery,
  removeIngredientId,
  sameIngredientSelection,
  serializeBuilderQuery,
  toggleIngredientId,
} from './builder.utils'

export function useBuilderIngredients() {
  const location = useLocation()
  const navigate = useNavigate()

  const selectedIngredientIds = useMemo(
    () => parseBuilderQuery(new URLSearchParams(location.search)),
    [location.search],
  )

  const writeSelection = useCallback((nextIngredientIds: string[]) => {
    if (sameIngredientSelection(selectedIngredientIds, nextIngredientIds)) return

    const search = serializeBuilderQuery(nextIngredientIds).toString()
    navigate({
      pathname: '/builder',
      search: search ? `?${search}` : '',
    })
  }, [navigate, selectedIngredientIds])

  return {
    selectedIngredientIds,
    addIngredient: (ingredientId: string) => writeSelection(addIngredientId(selectedIngredientIds, ingredientId)),
    removeIngredient: (ingredientId: string) => writeSelection(removeIngredientId(selectedIngredientIds, ingredientId)),
    toggleIngredient: (ingredientId: string) => writeSelection(toggleIngredientId(selectedIngredientIds, ingredientId)),
    clearIngredients: () => writeSelection([]),
  }
}
```

- [ ] **Step 2: Run typecheck for hook integration**

Run:

```bash
npm run typecheck
```

Expected: PASS.

- [ ] **Step 3: Commit hook**

```bash
git add src/features/builder/useBuilderIngredients.ts
git commit -m "feat: add builder URL controller"
```

---

### Task 4: Add Builder page tests

**Files:**
- Create: `src/pages/BuilderPage.test.tsx`

- [ ] **Step 1: Write failing route interaction tests**

Create `src/pages/BuilderPage.test.tsx`:

```tsx
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderApp } from '../test/renderApp'

describe('Builder page', () => {
  it('uses URL-selected ingredients to render matches', () => {
    renderApp('/builder?ingredients=gin,campari,sweet-vermouth')

    expect(screen.getByRole('heading', { name: /build from your bar/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /negroni/i })).toBeInTheDocument()
    expect(screen.getByText(/exact match/i)).toBeInTheDocument()
  })

  it('adds and removes ingredients through tap interaction', async () => {
    const user = userEvent.setup()
    const { router } = renderApp('/builder')

    await user.click(screen.getByRole('button', { name: /^add gin/i }))
    await user.click(screen.getByRole('button', { name: /^add campari/i }))

    expect(router.state.location.pathname).toBe('/builder')
    expect(router.state.location.search).toBe('?ingredients=gin%2Ccampari')
    expect(screen.getByRole('button', { name: /remove gin/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /remove gin/i }))

    expect(router.state.location.search).toBe('?ingredients=campari')
  })

  it('clears selected ingredients back to the canonical Builder URL', async () => {
    const user = userEvent.setup()
    const { router } = renderApp('/builder?ingredients=gin,campari')

    await user.click(screen.getByRole('button', { name: /clear mixing glass/i }))

    expect(router.state.location.pathname).toBe('/builder')
    expect(router.state.location.search).toBe('')
    expect(screen.getByText(/choose an ingredient to begin/i)).toBeInTheDocument()
  })

  it('searches the full ingredient registry', async () => {
    const user = userEvent.setup()
    renderApp('/builder')

    await user.type(screen.getByRole('searchbox', { name: /search ingredients/i }), 'citroen')

    const shelf = screen.getByRole('region', { name: /ingredient shelf/i })
    expect(within(shelf).getByRole('button', { name: /add citron vodka/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run route tests and confirm failure**

Run:

```bash
npm test -- src/pages/BuilderPage.test.tsx
```

Expected: FAIL because `/builder` still renders `ComingSoonPage`.

- [ ] **Step 3: Commit failing tests only if project convention allows**

Do not commit failing tests. Keep them staged only after implementation passes in Task 5.

---

### Task 5: Implement Builder route and components

**Files:**
- Create: `src/features/builder/BuilderHero.tsx`
- Create: `src/features/builder/IngredientSearch.tsx`
- Create: `src/features/builder/IngredientToken.tsx`
- Create: `src/features/builder/IngredientShelf.tsx`
- Create: `src/features/builder/MixingGlass.tsx`
- Create: `src/features/builder/BuilderMatchCard.tsx`
- Create: `src/features/builder/BuilderResults.tsx`
- Create: `src/features/builder/index.ts`
- Create: `src/pages/BuilderPage.tsx`
- Modify: `src/router.tsx`

- [ ] **Step 1: Create feature barrel**

Create `src/features/builder/index.ts`:

```ts
export { BuilderHero } from './BuilderHero'
export { BuilderResults } from './BuilderResults'
export { IngredientSearch } from './IngredientSearch'
export { IngredientShelf } from './IngredientShelf'
export { MixingGlass } from './MixingGlass'
export { getBuilderMatches } from './builder.matching'
export { useBuilderIngredients } from './useBuilderIngredients'
export type { BuilderMatch } from './builder.matching'
```

- [ ] **Step 2: Add hero and search components**

Create `src/features/builder/BuilderHero.tsx`:

```tsx
import { SectionLabel } from '../../components/ui/SectionLabel'

interface BuilderHeroProps {
  selectedCount: number
}

export function BuilderHero({ selectedCount }: BuilderHeroProps) {
  return (
    <section className="builder-hero section-gutter">
      <SectionLabel>Builder</SectionLabel>
      <h1>Build from <em>your bar</em></h1>
      <p>
        Choose what you have on hand. The glass will surface exact recipes first, then near matches worth finishing.
      </p>
      <p className="builder-hero__count">{selectedCount} selected</p>
    </section>
  )
}
```

Create `src/features/builder/IngredientSearch.tsx`:

```tsx
interface IngredientSearchProps {
  value: string
  onChange: (value: string) => void
}

export function IngredientSearch({ value, onChange }: IngredientSearchProps) {
  return (
    <label className="ingredient-search">
      <span>Search ingredients</span>
      <input
        aria-label="Search ingredients"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Try gin, citrus, basil..."
      />
    </label>
  )
}
```

- [ ] **Step 3: Add token, shelf, glass, and results components**

Create `src/features/builder/IngredientToken.tsx`:

```tsx
import type { CSSProperties, DragEvent } from 'react'
import type { Ingredient } from '../../types'

interface IngredientTokenProps {
  ingredient: Ingredient
  selected: boolean
  onToggle: (ingredientId: string) => void
}

export function IngredientToken({ ingredient, selected, onToggle }: IngredientTokenProps) {
  const action = selected ? 'Remove' : 'Add'

  function handleDragStart(event: DragEvent<HTMLButtonElement>) {
    event.dataTransfer.setData('text/plain', ingredient.id)
    event.dataTransfer.effectAllowed = 'copy'
  }

  return (
    <button
      type="button"
      className={`ingredient-token${selected ? ' ingredient-token--selected' : ''}`}
      style={{ '--ingredient-color': ingredient.color } as CSSProperties}
      draggable
      onDragStart={handleDragStart}
      onClick={() => onToggle(ingredient.id)}
      aria-pressed={selected}
      aria-label={`${action} ${ingredient.name}`}
    >
      <span aria-hidden="true">{ingredient.icon}</span>
      {ingredient.name}
    </button>
  )
}
```

Create `src/features/builder/IngredientShelf.tsx`:

```tsx
import { ingredients } from '../../data'
import type { Ingredient, IngredientCategory } from '../../types'
import { IngredientToken } from './IngredientToken'

const featuredCategories: IngredientCategory[] = [
  'spirit',
  'liqueur',
  'fortified-wine',
  'juice',
  'syrup',
  'bitters',
  'herb',
  'fruit',
  'mixer',
]

const normalize = (value: string) => value.trim().toLocaleLowerCase()

interface IngredientShelfProps {
  search: string
  selectedIngredientIds: string[]
  onToggle: (ingredientId: string) => void
}

function matchesSearch(ingredient: Ingredient, search: string) {
  const needle = normalize(search)
  if (!needle) return true
  return [ingredient.name, ...ingredient.aliases].some((value) => normalize(value).includes(needle))
}

export function IngredientShelf({ search, selectedIngredientIds, onToggle }: IngredientShelfProps) {
  const visibleIngredients = ingredients.filter((ingredient) => {
    if (search) return matchesSearch(ingredient, search)
    return featuredCategories.includes(ingredient.category)
  })

  return (
    <section className="ingredient-shelf" aria-label="Ingredient shelf">
      <div className="ingredient-shelf__grid">
        {visibleIngredients.map((ingredient) => (
          <IngredientToken
            key={ingredient.id}
            ingredient={ingredient}
            selected={selectedIngredientIds.includes(ingredient.id)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </section>
  )
}
```

Create `src/features/builder/MixingGlass.tsx`:

```tsx
import type { DragEvent } from 'react'
import { ingredients } from '../../data'
import type { Ingredient } from '../../types'

interface MixingGlassProps {
  selectedIngredientIds: string[]
  onAdd: (ingredientId: string) => void
  onRemove: (ingredientId: string) => void
  onClear: () => void
}

const ingredientMap = new Map<string, Ingredient>(ingredients.map((ingredient) => [ingredient.id, ingredient]))

export function MixingGlass({ selectedIngredientIds, onAdd, onRemove, onClear }: MixingGlassProps) {
  const selectedIngredients = selectedIngredientIds.flatMap((id) => {
    const ingredient = ingredientMap.get(id)
    return ingredient ? [ingredient] : []
  })

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    const ingredientId = event.dataTransfer.getData('text/plain')
    if (ingredientId) onAdd(ingredientId)
  }

  return (
    <section className="mixing-glass" aria-label="Mixing glass" onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className="mixing-glass__vessel" aria-hidden="true" />
      <div className="mixing-glass__content">
        <p className="detail-kicker">In the glass</p>
        <h2>{selectedIngredients.length ? 'Your current pour' : 'Choose an ingredient to begin'}</h2>
        {selectedIngredients.length > 0 ? (
          <>
            <ul>
              {selectedIngredients.map((ingredient) => (
                <li key={ingredient.id}>
                  <span>{ingredient.name}</span>
                  <button type="button" onClick={() => onRemove(ingredient.id)} aria-label={`Remove ${ingredient.name}`}>×</button>
                </li>
              ))}
            </ul>
            <button className="mixing-glass__clear" type="button" onClick={onClear}>Clear mixing glass</button>
          </>
        ) : (
          <p>Tap a bottle from the shelf, or drag it into the glass on desktop.</p>
        )}
      </div>
    </section>
  )
}
```

Create `src/features/builder/BuilderMatchCard.tsx` and `src/features/builder/BuilderResults.tsx`:

```tsx
import { Link } from 'react-router-dom'
import type { BuilderMatch } from './builder.matching'
import { resolveRecipe } from '../../utils'

interface BuilderMatchCardProps {
  match: BuilderMatch
}

export function BuilderMatchCard({ match }: BuilderMatchCardProps) {
  const available = resolveRecipe({ ...match.cocktail, ingredients: match.available })
  const missing = resolveRecipe({ ...match.cocktail, ingredients: match.missing })

  return (
    <article className={`builder-match-card builder-match-card--${match.kind}`}>
      <p>{match.kind === 'exact' ? 'Exact match' : `${Math.round(match.ratio * 100)}% match`}</p>
      <h3>{match.cocktail.name}</h3>
      <p>{match.cocktail.description}</p>
      <dl>
        <div><dt>Available</dt><dd>{available.map(({ ingredient }) => ingredient.name).join(', ')}</dd></div>
        {missing.length > 0 && <div><dt>Missing</dt><dd>{missing.map(({ ingredient }) => ingredient.name).join(', ')}</dd></div>}
      </dl>
      <Link to={`/library/${match.cocktail.slug}`}>View recipe <span aria-hidden="true">↗</span></Link>
    </article>
  )
}
```

```tsx
import type { BuilderMatch } from './builder.matching'
import { BuilderMatchCard } from './BuilderMatchCard'

interface BuilderResultsProps {
  matches: BuilderMatch[]
  selectedCount: number
  onClear: () => void
}

export function BuilderResults({ matches, selectedCount, onClear }: BuilderResultsProps) {
  if (selectedCount === 0) {
    return (
      <section className="builder-results builder-results--empty">
        <h2>Choose an ingredient to begin</h2>
        <p>The Guru will compare your bar against all 25 recipes.</p>
      </section>
    )
  }

  if (!matches.length) {
    return (
      <section className="builder-results builder-results--empty">
        <h2>No close pour yet</h2>
        <p>Add another ingredient or clear the glass to start fresh.</p>
        <button type="button" onClick={onClear}>Clear mixing glass</button>
      </section>
    )
  }

  const exact = matches.filter(({ kind }) => kind === 'exact')
  const near = matches.filter(({ kind }) => kind === 'near')

  return (
    <section className="builder-results" aria-label="Builder matches">
      {exact.length > 0 && <h2>Exact matches</h2>}
      {exact.map((match) => <BuilderMatchCard key={match.cocktail.id} match={match} />)}
      {near.length > 0 && <h2>Almost there</h2>}
      {near.map((match) => <BuilderMatchCard key={match.cocktail.id} match={match} />)}
    </section>
  )
}
```

- [ ] **Step 4: Add the page and route**

Create `src/pages/BuilderPage.tsx`:

```tsx
import { useMemo, useState } from 'react'
import { PageTransition } from '../components/ui/PageTransition'
import {
  BuilderHero,
  BuilderResults,
  IngredientSearch,
  IngredientShelf,
  MixingGlass,
  getBuilderMatches,
  useBuilderIngredients,
} from '../features/builder'

export function BuilderPage() {
  const [search, setSearch] = useState('')
  const {
    selectedIngredientIds,
    addIngredient,
    removeIngredient,
    toggleIngredient,
    clearIngredients,
  } = useBuilderIngredients()
  const matches = useMemo(() => getBuilderMatches(selectedIngredientIds), [selectedIngredientIds])

  return (
    <PageTransition>
      <main className="builder-page">
        <BuilderHero selectedCount={selectedIngredientIds.length} />
        <div className="builder-layout section-gutter">
          <div className="builder-panel">
            <IngredientSearch value={search} onChange={setSearch} />
            <IngredientShelf search={search} selectedIngredientIds={selectedIngredientIds} onToggle={toggleIngredient} />
          </div>
          <MixingGlass
            selectedIngredientIds={selectedIngredientIds}
            onAdd={addIngredient}
            onRemove={removeIngredient}
            onClear={clearIngredients}
          />
          <BuilderResults matches={matches} selectedCount={selectedIngredientIds.length} onClear={clearIngredients} />
        </div>
      </main>
    </PageTransition>
  )
}
```

Modify `src/router.tsx`:

```tsx
import { BuilderPage } from './pages/BuilderPage'
```

Replace the builder child route with:

```tsx
{ path: 'builder', element: <BuilderPage /> },
```

- [ ] **Step 5: Run page tests**

Run:

```bash
npm test -- src/pages/BuilderPage.test.tsx
```

Expected: PASS.

- [ ] **Step 6: Commit Builder route**

```bash
git add src/features/builder src/pages/BuilderPage.tsx src/pages/BuilderPage.test.tsx src/router.tsx
git commit -m "feat: build URL-driven cocktail builder"
```

---

### Task 6: Style the Builder experience

**Files:**
- Modify: `src/styles/globals.css`

- [ ] **Step 1: Add builder CSS**

Append these rules immediately before the existing `.library-page` rule in `src/styles/globals.css`:

```css
.builder-page { min-height:100vh; padding-bottom:clamp(6rem,10vw,10rem); background:radial-gradient(circle at 15% 8%,rgba(91,31,42,.34),transparent 30%),var(--ink); }
.builder-hero { min-height:32rem; padding-top:10rem; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; border-bottom:1px solid rgba(214,163,84,.16); }
.builder-hero h1 { max-width:70rem; margin:1rem 0 0; font-family:"Cormorant Garamond",serif; font-size:clamp(4.4rem,9vw,8rem); font-weight:400; letter-spacing:-.055em; line-height:.84; }
.builder-hero h1 em { color:var(--gold); font-weight:400; }
.builder-hero > p:not(.section-label) { max-width:36rem; color:rgba(245,240,234,.72); line-height:1.8; }
.builder-hero__count { color:var(--gold) !important; font-size:.6rem; letter-spacing:.18em; text-transform:uppercase; }
.builder-layout { margin-top:clamp(2rem,5vw,4rem); display:grid; grid-template-columns:minmax(16rem,.85fr) minmax(18rem,1fr) minmax(18rem,1fr); gap:clamp(1.2rem,3vw,3rem); align-items:start; }
.builder-panel,.mixing-glass,.builder-results { border:1px solid rgba(214,163,84,.16); background:rgba(30,24,26,.72); box-shadow:0 1.5rem 4rem rgba(0,0,0,.18); backdrop-filter:blur(18px); }
.builder-panel { padding:1.2rem; }
.ingredient-search span { display:block; margin-bottom:.6rem; color:var(--gold); font-size:.58rem; font-weight:600; letter-spacing:.18em; text-transform:uppercase; }
.ingredient-search input { width:100%; min-height:3.3rem; padding:0 1rem; border:1px solid rgba(214,163,84,.36); background:rgba(19,17,18,.72); color:var(--ivory); font:inherit; }
.ingredient-shelf { margin-top:1rem; max-height:38rem; overflow:auto; }
.ingredient-shelf__grid { display:grid; gap:.55rem; }
.ingredient-token { width:100%; min-height:2.9rem; padding:.55rem .75rem; display:flex; align-items:center; gap:.65rem; border:1px solid rgba(214,163,84,.16); background:rgba(19,17,18,.48); color:var(--ivory); cursor:pointer; text-align:left; transition:border-color .2s ease, transform .2s ease, background .2s ease; }
.ingredient-token:hover { transform:translateY(-1px); border-color:var(--ingredient-color,var(--gold)); }
.ingredient-token--selected { border-color:var(--gold); background:rgba(214,163,84,.14); }
.ingredient-token span { width:1.6rem; height:1.6rem; display:grid; place-items:center; border-radius:50%; background:var(--ingredient-color,var(--gold)); color:var(--ink); font-size:.62rem; text-transform:uppercase; }
.mixing-glass { min-height:33rem; padding:1.4rem; position:relative; overflow:hidden; }
.mixing-glass__vessel { position:absolute; inset:auto 14% 1.2rem; height:65%; border:1px solid rgba(214,163,84,.28); border-top:0; border-radius:0 0 45% 45%; background:linear-gradient(180deg,rgba(214,163,84,.08),rgba(91,31,42,.18)); pointer-events:none; }
.mixing-glass__content { position:relative; z-index:1; }
.mixing-glass h2,.builder-results h2 { margin:.6rem 0 1rem; font-family:"Cormorant Garamond",serif; font-size:clamp(2.2rem,4vw,3.4rem); font-weight:400; line-height:.95; }
.mixing-glass ul { margin:1.5rem 0; padding:0; display:grid; gap:.6rem; list-style:none; }
.mixing-glass li { padding:.7rem .85rem; display:flex; align-items:center; justify-content:space-between; gap:1rem; background:rgba(19,17,18,.62); border:1px solid rgba(214,163,84,.16); }
.mixing-glass li button,.mixing-glass__clear,.builder-results--empty button { border:0; background:transparent; color:var(--gold); cursor:pointer; }
.mixing-glass__clear,.builder-results--empty button { padding:.75rem 0; font-size:.6rem; letter-spacing:.15em; text-transform:uppercase; }
.builder-results { padding:1.2rem; display:grid; gap:1rem; }
.builder-results--empty { min-height:18rem; place-content:center; text-align:center; }
.builder-match-card { padding:1.1rem; border:1px solid rgba(214,163,84,.16); background:rgba(19,17,18,.44); }
.builder-match-card--exact { border-color:rgba(214,163,84,.55); }
.builder-match-card > p:first-child { margin:0; color:var(--gold); font-size:.56rem; letter-spacing:.15em; text-transform:uppercase; }
.builder-match-card h3 { margin:.45rem 0 0; font-family:"Cormorant Garamond",serif; font-size:2rem; font-weight:500; }
.builder-match-card > p:not(:first-child),.builder-match-card dd { color:var(--muted); font-size:.75rem; line-height:1.65; }
.builder-match-card dl { margin:1rem 0; display:grid; gap:.65rem; }
.builder-match-card dt { color:var(--gold); font-size:.55rem; letter-spacing:.13em; text-transform:uppercase; }
.builder-match-card dd { margin:.25rem 0 0; }
.builder-match-card a { display:flex; justify-content:space-between; padding-top:.8rem; border-top:1px solid rgba(214,163,84,.14); font-size:.6rem; letter-spacing:.14em; text-transform:uppercase; }
```

Add responsive rules inside the existing `@media (max-width: 960px)` block:

```css
.builder-layout { grid-template-columns:1fr; }
.ingredient-shelf { max-height:none; }
.mixing-glass { min-height:25rem; }
```

Add mobile rules inside the existing `@media (max-width: 640px)` block:

```css
.builder-hero { min-height:30rem; padding-top:8rem; }
.builder-hero h1 { font-size:clamp(4rem,18vw,6rem); }
.builder-layout { margin-top:1.5rem; }
```

- [ ] **Step 2: Run browser-relevant tests**

Run:

```bash
npm test -- src/pages/BuilderPage.test.tsx
npm run typecheck
```

Expected: PASS.

- [ ] **Step 3: Commit styles**

```bash
git add src/styles/globals.css
git commit -m "style: polish cocktail builder"
```

---

### Task 7: Update documentation and run the full gate

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Update README**

Add after the Phase 3 section:

```md
## Phase 4 Builder

- Interactive `/builder` route powered by URL-selected ingredient IDs
- Tap-first ingredient selection with native drag-and-drop enhancement
- Featured bar shelf plus full ingredient search
- Mixing-glass selected state with clear and remove actions
- Exact recipe matches first, followed by ranked near matches
- No global state library or LocalStorage persistence
```

Update the route table row:

```md
| `/builder` | URL-driven interactive cocktail builder |
```

- [ ] **Step 2: Run focused tests**

Run:

```bash
npm test -- src/features/builder/builder.utils.test.ts src/features/builder/builder.matching.test.ts src/pages/BuilderPage.test.tsx
```

Expected: PASS.

- [ ] **Step 3: Run full quality gate**

Run:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Expected: all commands PASS.

- [ ] **Step 4: Browser smoke test**

Run the dev server:

```bash
npm run dev
```

In the browser, verify:

- `/builder` loads without Vite overlay or console errors.
- Tapping Gin and Campari updates the URL to canonical `?ingredients=gin%2Ccampari`.
- Refreshing that URL keeps the selected ingredients and visible matches.
- Tapping remove and clear updates the URL without stale state.
- Dragging an ingredient token into the glass adds it.
- `/library/:slug` links from match cards open detail pages.
- Mobile viewport keeps tap selection usable.

- [ ] **Step 5: Commit docs**

```bash
git add README.md
git commit -m "docs: summarize Cocktail Guru phase 4"
```

---

## Self-Review Checklist

- Spec coverage: URL state, canonical ordering, no-op navigation avoidance, feature folder, no heavy DnD library, no new global state library, 50%/missing-3 near threshold, tap-first interaction, native drag enhancement, and lean tests are all covered.
- Placeholder scan: no placeholder phrases or vague implementation steps remain.
- Type consistency: selected ingredient IDs are `string[]`; matching returns `BuilderMatch`; components call `addIngredient`, `removeIngredient`, `toggleIngredient`, and `clearIngredients`.

## Execution Handoff

Plan complete. Recommended execution for this project: inline execution in the existing isolated Phase workflow, batching small tasks and using concise checkpoints. If the user explicitly asks for subagents, use `superpowers:subagent-driven-development`; otherwise use `superpowers:executing-plans` inline.
