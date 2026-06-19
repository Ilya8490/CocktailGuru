# Cocktail Guru Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a strongly typed, normalized local source of 25 cocktails, their canonical ingredients, and pure data utilities for later Library and Builder phases.

**Architecture:** Ingredient metadata lives once in a canonical registry. Cocktails reference ingredient IDs through metric-first recipe lines, while pure utility modules resolve, search, filter, and calculate ingredient coverage without React or application state.

**Tech Stack:** TypeScript strict mode, Vitest, existing Vite/React project

---

## File Map

- `src/types/ingredient.ts` — ingredient/category/allergen contracts
- `src/types/cocktail.ts` — cocktail/recipe/taste/measurement contracts
- `src/types/index.ts` — type barrel
- `src/data/ingredients.ts` — canonical ingredient registry
- `src/data/cocktails.ts` — 25 normalized cocktail records
- `src/data/index.ts` — data barrel
- `src/data/dataIntegrity.test.ts` — catalog invariant tests
- `src/utils/cocktails.ts` — lookups, resolution, search, filters, and coverage
- `src/utils/measurements.ts` — metric labels and ounce conversion
- `src/utils/cocktails.test.ts` — cocktail utility tests
- `src/utils/measurements.test.ts` — measurement tests
- `src/utils/index.ts` — utility barrel
- `README.md` — Phase 2 documentation

### Task 1: Define the data contracts

**Files:**
- Create: `src/types/ingredient.ts`
- Create: `src/types/cocktail.ts`
- Create: `src/types/index.ts`

- [ ] **Step 1: Create ingredient contracts**

Create `src/types/ingredient.ts`:

```ts
export type IngredientCategory =
  | 'spirit' | 'liqueur' | 'fortified-wine' | 'wine' | 'beer'
  | 'juice' | 'syrup' | 'bitters' | 'mixer' | 'fruit' | 'herb'
  | 'spice' | 'dairy' | 'garnish' | 'other'

export type Allergen = 'dairy' | 'egg' | 'nuts' | 'sulfites' | 'gluten'

export interface Ingredient {
  id: string
  name: string
  category: IngredientCategory
  color: string
  icon: string
  isAlcoholic: boolean
  allergens: Allergen[]
  aliases: string[]
  referenceUrl?: string
}
```

- [ ] **Step 2: Create cocktail contracts**

Create `src/types/cocktail.ts`:

```ts
export type CocktailOrigin = 'classic' | 'modern' | 'mocktail'
export type MeasurementUnit = 'ml' | 'g' | 'piece' | 'leaf' | 'dash' | 'barspoon' | 'top'
export type Glassware = 'coupe' | 'nick-and-nora' | 'martini' | 'rocks' | 'highball' | 'collins' | 'flute' | 'wine' | 'copper-mug'
export type PreparationMethod = 'build' | 'stir' | 'shake' | 'dry-shake' | 'blend' | 'churn' | 'swizzle'

export interface TasteProfile {
  sweet: number
  sour: number
  bitter: number
  strong: number
  fruity: number
  spicy: number
}

export interface RecipeIngredient {
  ingredientId: string
  quantity: number
  unit: MeasurementUnit
  preparation?: string
  displayNote?: string
}

export interface SourceReference { label: string; url: string }

export interface Cocktail {
  id: string
  slug: string
  name: string
  origin: CocktailOrigin
  description: string
  glass: Glassware
  method: PreparationMethod
  garnish: string
  instructions: string[]
  tags: string[]
  taste: TasteProfile
  ingredients: RecipeIngredient[]
  references?: SourceReference[]
}
```

- [ ] **Step 3: Export the public type surface**

Create `src/types/index.ts` with `export type * from './ingredient'` and `export type * from './cocktail'`.

- [ ] **Step 4: Verify strict type compilation**

Run: `npm run typecheck`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/types
git commit -m "feat: define cocktail data contracts"
```

### Task 2: Build the canonical ingredient registry test-first

**Files:**
- Create: `src/data/ingredients.test.ts`
- Create: `src/data/ingredients.ts`
- Create: `src/data/index.ts`

- [ ] **Step 1: Write the failing registry tests**

```ts
import { describe, expect, it } from 'vitest'
import { ingredients } from './ingredients'

describe('ingredient registry', () => {
  it('contains unique canonical IDs', () => {
    const ids = ingredients.map(({ id }) => id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(ids.length).toBeGreaterThanOrEqual(50)
  })

  it('contains normalized Basil Beauty ingredients', () => {
    expect(ingredients).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: 'passion-fruit', isAlcoholic: false }),
      expect.objectContaining({ id: 'basil', category: 'herb' }),
      expect.objectContaining({ id: 'citron-vodka', isAlcoholic: true }),
      expect.objectContaining({ id: 'pineapple-juice', category: 'juice' }),
      expect.objectContaining({ id: 'lime-juice', category: 'juice' }),
      expect.objectContaining({ id: 'coconut-syrup', category: 'syrup' }),
    ]))
  })

  it('uses complete presentation metadata', () => {
    for (const ingredient of ingredients) {
      expect(ingredient.name).not.toBe('')
      expect(ingredient.color).toMatch(/^#([0-9a-f]{6})$/i)
      expect(ingredient.icon).not.toBe('')
      expect(ingredient.aliases).toBeInstanceOf(Array)
    }
  })
})
```

- [ ] **Step 2: Run the registry tests and confirm RED**

Run: `npm test -- src/data/ingredients.test.ts`

Expected: FAIL because the registry does not exist.

- [ ] **Step 3: Implement the ingredient registry**

Create at least 50 `Ingredient` records covering every recipe need. Required groups:

- Spirits: bourbon, rye whiskey, Scotch whisky, gin, vodka, citron vodka, white rum, dark rum, tequila blanco, mezcal, cognac.
- Liqueurs/fortified wine/wine: Campari, sweet vermouth, dry vermouth, triple sec, coffee liqueur, maraschino liqueur, amaretto, elderflower liqueur, crème de cacao, sparkling wine.
- Juices/mixers: lemon, lime, grapefruit, pineapple, orange, cranberry, soda water, tonic, ginger beer, cola, espresso.
- Syrups/bitters: simple, agave, honey, coconut, fig, pear, saffron, grenadine, Angostura, orange bitters, aromatic smoke syrup.
- Produce/garnish: passion fruit, basil, mint, cherry, orange peel, lemon peel, lime wheel, grapefruit wedge, cucumber, blackberry, pear, apricot, rosemary, cacao nibs, salt, egg white.

Use the reference URLs from the approved spec for passion fruit and coconut syrup. Use generic canonical names; brand suggestions belong on recipe lines.

- [ ] **Step 4: Run the tests and confirm GREEN**

Run: `npm test -- src/data/ingredients.test.ts`

Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/data/ingredients.ts src/data/ingredients.test.ts src/data/index.ts
git commit -m "feat: add canonical ingredient registry"
```

### Task 3: Add the 25-cocktail catalog test-first

**Files:**
- Create: `src/data/dataIntegrity.test.ts`
- Create: `src/data/cocktails.ts`
- Modify: `src/data/index.ts`

- [ ] **Step 1: Write failing catalog integrity tests**

```ts
import { describe, expect, it } from 'vitest'
import { cocktails } from './cocktails'
import { ingredients } from './ingredients'

describe('cocktail catalog integrity', () => {
  it('contains the approved catalog split', () => {
    expect(cocktails).toHaveLength(25)
    expect(cocktails.filter(({ origin }) => origin === 'classic')).toHaveLength(12)
    expect(cocktails.filter(({ origin }) => origin === 'modern')).toHaveLength(10)
    expect(cocktails.filter(({ origin }) => origin === 'mocktail')).toHaveLength(3)
  })

  it('uses unique IDs and slugs with valid ingredient references', () => {
    expect(new Set(cocktails.map(({ id }) => id)).size).toBe(25)
    expect(new Set(cocktails.map(({ slug }) => slug)).size).toBe(25)
    const ingredientIds = new Set(ingredients.map(({ id }) => id))
    for (const cocktail of cocktails) {
      expect(cocktail.ingredients.every(({ ingredientId }) => ingredientIds.has(ingredientId))).toBe(true)
      expect(cocktail.ingredients.every(({ quantity }) => quantity > 0)).toBe(true)
    }
  })

  it('keeps all taste values on the integer 0–5 scale', () => {
    for (const cocktail of cocktails) {
      for (const value of Object.values(cocktail.taste)) {
        expect(Number.isInteger(value)).toBe(true)
        expect(value).toBeGreaterThanOrEqual(0)
        expect(value).toBeLessThanOrEqual(5)
      }
    }
  })

  it('keeps mocktails alcohol-free', () => {
    const alcoholic = new Set(ingredients.filter(({ isAlcoholic }) => isAlcoholic).map(({ id }) => id))
    for (const cocktail of cocktails.filter(({ origin }) => origin === 'mocktail')) {
      expect(cocktail.ingredients.some(({ ingredientId }) => alcoholic.has(ingredientId))).toBe(false)
    }
  })

  it('stores the exact approved Basil Beauty recipe', () => {
    const basilBeauty = cocktails.find(({ id }) => id === 'basil-beauty')
    expect(basilBeauty).toMatchObject({ origin: 'modern', glass: 'martini' })
    expect(basilBeauty?.ingredients).toEqual([
      { ingredientId: 'passion-fruit', quantity: 1, unit: 'piece', preparation: 'fresh' },
      { ingredientId: 'basil', quantity: 3, unit: 'leaf', preparation: 'fresh' },
      { ingredientId: 'citron-vodka', quantity: 60, unit: 'ml', displayNote: 'Ketel One Citroen Vodka' },
      { ingredientId: 'pineapple-juice', quantity: 60, unit: 'ml' },
      { ingredientId: 'lime-juice', quantity: 7.5, unit: 'ml', preparation: 'freshly squeezed' },
      { ingredientId: 'coconut-syrup', quantity: 15, unit: 'ml' },
    ])
  })
})
```

- [ ] **Step 2: Run the integrity tests and confirm RED**

Run: `npm test -- src/data/dataIntegrity.test.ts`

Expected: FAIL because the cocktail catalog does not exist.

- [ ] **Step 3: Implement the 12 classics**

Add complete, metric recipes for Old Fashioned, Negroni, Margarita, Daiquiri, Manhattan, Dry Martini, Whiskey Sour, Mojito, Tom Collins, French 75, Espresso Martini, and Paloma. Every record includes description, garnish, at least two instructions, tags, and all six taste values.

- [ ] **Step 4: Implement the 10 modern cocktails**

Add Burgundy Hour, Velvet Ember, Gilded Fig, Midnight Orchard, Saffron Smoke, Rosewood Sour, Black Cherry Highball, Spiced Pear Collins, Cacao Nocturne, and the exact Basil Beauty record from the failing test. Modern signatures must reuse registry ingredients and remain plausible, balanced metric recipes.

- [ ] **Step 5: Implement the 3 mocktails**

Add Crimson Garden, Citrus No. 5, and Smoked Apricot Fizz using only non-alcoholic registry ingredients.

- [ ] **Step 6: Run data tests and confirm GREEN**

Run: `npm test -- src/data/ingredients.test.ts src/data/dataIntegrity.test.ts`

Expected: 8 tests pass.

- [ ] **Step 7: Commit**

```bash
git add src/data
git commit -m "feat: add curated cocktail catalog"
```

### Task 4: Add cocktail utilities test-first

**Files:**
- Create: `src/utils/cocktails.test.ts`
- Create: `src/utils/cocktails.ts`
- Create: `src/utils/index.ts`

- [ ] **Step 1: Write failing utility tests**

Test these concrete behaviors:

```ts
expect(getIngredientById('gin')?.name).toBe('Gin')
expect(getIngredientById('missing')).toBeUndefined()
expect(getCocktailBySlug('basil-beauty')?.name).toBe('Basil Beauty')
expect(searchCocktails('citroen')).toEqual(expect.arrayContaining([expect.objectContaining({ id: 'basil-beauty' })]))
expect(filterCocktails({ origin: ['mocktail'] })).toHaveLength(3)
expect(filterCocktails({ glass: ['martini'], alcoholic: true })).toEqual(expect.arrayContaining([expect.objectContaining({ id: 'basil-beauty' })]))
expect(filterCocktails({ tags: ['does-not-exist'] })).toEqual([])

const coverage = getIngredientCoverage(getCocktailById('negroni')!, ['gin', 'campari', 'gin'])
expect(coverage.available).toHaveLength(2)
expect(coverage.missing).toHaveLength(1)
expect(coverage.ratio).toBeCloseTo(2 / 3)
```

Also verify `resolveRecipe` pairs every Basil Beauty line with the canonical ingredient and that empty search/filter inputs return the full catalog.

- [ ] **Step 2: Run tests and confirm RED**

Run: `npm test -- src/utils/cocktails.test.ts`

Expected: FAIL because the utility module does not exist.

- [ ] **Step 3: Implement lookup and recipe resolution**

Build module-private ID/slug maps from imported readonly arrays. Return `undefined` for unknown keys. `resolveRecipe` returns `{ ...line, ingredient }` entries and defensively omits unresolved IDs.

- [ ] **Step 4: Implement normalized search and composable filters**

Normalize with `trim().toLocaleLowerCase()` and collapse whitespace. Search name, description, tags, ingredient names, and aliases. Define `CocktailFilters` with optional arrays for origin, tags, ingredient categories, and glass, plus optional `alcoholic`. Treat each provided filter family as AND and entries within one family as OR.

- [ ] **Step 5: Implement ingredient coverage**

Deduplicate selected ingredient IDs with `Set`, partition recipe lines into `available` and `missing`, and return ratio `available.length / total`, using `0` only for an empty recipe.

- [ ] **Step 6: Run utility and full tests**

Run: `npm test -- src/utils/cocktails.test.ts && npm test`

Expected: utility tests and the complete suite pass.

- [ ] **Step 7: Commit**

```bash
git add src/utils src/data/index.ts
git commit -m "feat: add cocktail data utilities"
```

### Task 5: Add measurement utilities test-first

**Files:**
- Create: `src/utils/measurements.test.ts`
- Create: `src/utils/measurements.ts`
- Modify: `src/utils/index.ts`

- [ ] **Step 1: Write failing measurement tests**

```ts
expect(formatMetricQuantity(60, 'ml')).toBe('60 ml')
expect(formatMetricQuantity(7.5, 'ml')).toBe('7.5 ml')
expect(formatMetricQuantity(1, 'piece')).toBe('1 piece')
expect(formatMetricQuantity(3, 'leaf')).toBe('3 leaves')
expect(formatMetricQuantity(2, 'dash')).toBe('2 dashes')
expect(millilitresToOunces(30)).toBe(1.01)
```

- [ ] **Step 2: Run tests and confirm RED**

Run: `npm test -- src/utils/measurements.test.ts`

Expected: FAIL because the functions do not exist.

- [ ] **Step 3: Implement formatting and conversion**

Use `Number.isInteger` to avoid trailing zeroes, a singular/plural label map for countable units, and `Math.round((ml / 29.5735) * 100) / 100` for ounce conversion.

- [ ] **Step 4: Run tests and confirm GREEN**

Run: `npm test -- src/utils/measurements.test.ts`

Expected: all measurement tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/utils
git commit -m "feat: add metric measurement utilities"
```

### Task 6: Document and verify Phase 2

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Update documentation**

Add Phase 2 completion notes: normalized ingredient registry, 25 recipes with 12/10/3 split, six-axis taste profiles, metric-first measurements, public import paths, and the boundary that Library UI and recommendation scoring remain future work.

- [ ] **Step 2: Run the complete quality gate**

Run:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Expected: all commands exit 0; all Phase 1 and Phase 2 tests pass; production build succeeds.

- [ ] **Step 3: Audit public exports**

Verify a consumer can import `ingredients`, `cocktails`, lookup/search/filter/coverage functions, measurement helpers, and all public types through the three barrel files without importing implementation modules directly.

- [ ] **Step 4: Commit**

```bash
git add README.md src/types/index.ts src/data/index.ts src/utils/index.ts
git commit -m "docs: complete Cocktail Guru phase 2"
```
