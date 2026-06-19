# Cocktail Guru Phase 2 Data Layer Design

## Objective

Create a complete, strongly typed local data source for Cocktail Guru. Phase 2 defines canonical ingredient and cocktail models, supplies a curated 25-cocktail catalog, and exposes pure lookup and filtering utilities that later Library and Builder phases can consume without reshaping the data.

## Scope

### Included

- TypeScript ingredient, cocktail, recipe, measurement, glassware, method, and taste-profile types
- A normalized canonical ingredient registry
- Exactly 25 complete cocktail records
- A catalog split of 12 classics, 10 modern cocktails, and 3 mocktails
- Metric-first recipe quantities
- Six-axis taste profiles
- Pure lookup, resolution, search, filtering, coverage, and formatting utilities
- Source/reference metadata where useful
- Automated data-integrity and utility tests
- Public barrel exports for later phases

### Excluded

- Library UI, cards, search controls, and filters
- Builder UI and drag-and-drop
- Recommendation or cocktail-match scoring
- Zustand state and LocalStorage
- Favorites behavior
- External API loading or backend persistence
- Cocktail imagery beyond existing Phase 1 editorial assets

## Chosen Architecture

Use a normalized ingredient registry. Every ingredient has one canonical record, and each cocktail recipe line references that record through `ingredientId`. Recipe lines add only quantity, unit, and optional preparation or display notes.

This approach prevents duplicated ingredient metadata, gives Library filters stable categories, and gives the future Builder a reliable set of draggable ingredient identities. It is preferred over fully embedded ingredient objects, which invite drift, and hybrid snapshots, which add backend-oriented complexity before it is useful.

## File Boundaries

- `src/types/ingredient.ts` — ingredient identity, category, allergen, and metadata types
- `src/types/cocktail.ts` — cocktail, recipe line, taste profile, glassware, method, unit, and origin types
- `src/types/index.ts` — public type exports
- `src/data/ingredients.ts` — canonical ingredient registry
- `src/data/cocktails.ts` — curated 25-cocktail catalog
- `src/data/index.ts` — public data exports
- `src/utils/cocktails.ts` — cocktail lookup, search, filtering, coverage, and resolution
- `src/utils/measurements.ts` — metric quantity formatting and future-safe ounce conversion
- `src/utils/index.ts` — public utility exports
- `src/data/dataIntegrity.test.ts` — catalog invariants
- `src/utils/cocktails.test.ts` — utility behavior
- `src/utils/measurements.test.ts` — measurement behavior

Each file has one responsibility. Data files contain declarative records only; they do not perform lookup or validation at module load time.

## Ingredient Model

An `Ingredient` contains:

- `id`: stable kebab-case identifier
- `name`: canonical display name
- `category`: constrained ingredient category
- `color`: CSS-compatible representative color used by future Builder visuals
- `icon`: constrained icon key or stable string key for future presentation mapping
- `isAlcoholic`: boolean
- `allergens`: zero or more constrained allergen values
- `aliases`: alternative names used by search
- `referenceUrl`: optional editorial source/reference URL

Ingredient categories are:

- `spirit`
- `liqueur`
- `fortified-wine`
- `wine`
- `beer`
- `juice`
- `syrup`
- `bitters`
- `mixer`
- `fruit`
- `herb`
- `spice`
- `dairy`
- `garnish`
- `other`

The registry should contain roughly 50 canonical ingredients, but completeness and reference integrity matter more than an arbitrary ingredient count. Every recipe ingredient must exist in the registry.

## Cocktail Model

A `Cocktail` contains:

- `id`: stable kebab-case identifier
- `slug`: URL-safe unique slug
- `name`: display name
- `origin`: `classic | modern | mocktail`
- `description`: concise editorial description
- `glass`: constrained glassware value
- `method`: constrained preparation method
- `garnish`: concise garnish instruction
- `instructions`: ordered preparation steps
- `tags`: searchable/filterable descriptors
- `taste`: six-axis taste profile
- `ingredients`: normalized recipe lines
- `references`: optional labeled source/reference links for recipe or glassware provenance

A `RecipeIngredient` contains:

- `ingredientId`
- `quantity`: positive number
- `unit`
- `preparation`: optional instruction such as “freshly squeezed” or “torn gently”
- `displayNote`: optional brand or serving suggestion that does not change canonical identity

Supported measurement units are:

- `ml`
- `g`
- `piece`
- `leaf`
- `dash`
- `barspoon`
- `top`

Quantities are metric-first. Ounce values are not duplicated in records; display conversions derive from millilitres when needed.

Glassware and preparation methods are constrained unions. The initial glassware set includes coupe, Nick & Nora, Martini, rocks, highball, Collins, flute, wine glass, and copper mug. Methods include build, stir, shake, dry shake, blend, churn, and swizzle.

## Taste Profile

Every cocktail has six integer scores from 0 through 5:

- `sweet`
- `sour`
- `bitter`
- `strong`
- `fruity`
- `spicy`

These values support future taste-profile visualization and filtering. Phase 2 does not turn them into a recommendation score.

## Catalog

### Classics — 12

1. Old Fashioned
2. Negroni
3. Margarita
4. Daiquiri
5. Manhattan
6. Dry Martini
7. Whiskey Sour
8. Mojito
9. Tom Collins
10. French 75
11. Espresso Martini
12. Paloma

### Modern — 10

1. Burgundy Hour
2. Velvet Ember
3. Gilded Fig
4. Midnight Orchard
5. Saffron Smoke
6. Rosewood Sour
7. Black Cherry Highball
8. Spiced Pear Collins
9. Cacao Nocturne
10. Basil Beauty

### Mocktails — 3

1. Crimson Garden
2. Citrus No. 5
3. Smoked Apricot Fizz

## Basil Beauty Requirement

Basil Beauty is a modern cocktail served in a Martini glass with these exact recipe lines:

- 1 whole fresh passion fruit
- 3 fresh basil leaves
- 60 ml citron vodka, with Ketel One Citroen Vodka retained as a display suggestion
- 60 ml pineapple juice
- 7.5 ml freshly squeezed lime juice
- 15 ml coconut sugar syrup

The ingredient registry uses generic canonical identities rather than brand-specific IDs. The supplied Difford's Guide links are preserved through ingredient `referenceUrl` fields and Basil Beauty's labeled `references` collection, including the Martini-glass reference.

## Utility Functions

### Lookup and resolution

- `getIngredientById(id)` returns an ingredient or `undefined`.
- `getCocktailById(id)` returns a cocktail or `undefined`.
- `getCocktailBySlug(slug)` returns a cocktail or `undefined`.
- `resolveRecipe(cocktail)` returns recipe lines paired with canonical ingredient records; unresolved IDs are omitted defensively, while integrity tests prevent them from shipping.

### Search and filtering

- `searchCocktails(query)` performs case-insensitive normalized matching across name, description, tags, ingredient names, and ingredient aliases.
- `filterCocktails(filters)` accepts optional origin, tags, ingredient categories, glassware, and alcoholic/non-alcoholic constraints.
- Empty filters return the full catalog; impossible filters return an empty array.

### Ingredient coverage

- `getIngredientCoverage(cocktail, selectedIngredientIds)` reports available recipe lines, missing recipe lines, and an exact completion ratio.
- Coverage does not score taste compatibility or select a winning cocktail; recommendation logic remains Phase 4 work.

### Measurements

- `formatMetricQuantity(quantity, unit)` formats fractional metric values without unnecessary trailing zeroes.
- `millilitresToOunces(ml)` supports later imperial display from the canonical metric value.
- Units such as leaf, dash, piece, and barspoon use readable singular/plural labels.

All utilities are pure and do not mutate imported data.

## Error and Empty Behavior

- Unknown IDs and slugs return `undefined`.
- Search and filter operations return empty arrays for no matches.
- Empty search text returns the complete catalog.
- Coverage ignores duplicate selected IDs and does not mutate caller input.
- Invalid cross-references, duplicate IDs, invalid units, and out-of-range taste values are development-time test failures rather than runtime recovery cases.

## Testing Strategy

Use Vitest and write tests before implementation.

### Data-integrity tests

- Exactly 25 cocktails exist.
- Origin counts are exactly 12 classic, 10 modern, and 3 mocktail.
- Cocktail IDs and slugs are unique.
- Ingredient IDs are unique.
- Every recipe ingredient ID resolves.
- Every quantity is positive and uses an allowed unit.
- Every taste value is an integer from 0 through 5.
- Mocktails reference no alcoholic ingredients.
- Every cocktail has non-empty instructions, tags, garnish, glass, and method.
- Basil Beauty exactly matches the approved Martini-glass recipe.

### Utility tests

- Ingredient and cocktail lookups handle known and unknown keys.
- Recipe resolution returns canonical ingredient metadata.
- Search is case-insensitive and checks aliases and ingredients.
- Origin, tag, category, glass, and alcohol filters compose correctly.
- Impossible filters return an empty array.
- Coverage reports available and missing recipe lines, deduplicates selected IDs, and calculates the correct ratio.
- Metric formatting handles whole and fractional values.
- Millilitre conversion produces a stable rounded ounce value.

The existing Phase 1 tests must remain green.

## Success Criteria

- Later phases can import all types, data, and utilities through stable barrel exports.
- The registry contains every ingredient used by all 25 recipes.
- The catalog has the approved 12/10/3 composition and includes the exact Basil Beauty recipe.
- Data is normalized, strongly typed, deterministic, and independent of React.
- Search and filter utilities are sufficient for Phase 3 without containing Phase 3 UI concerns.
- Ingredient coverage is sufficient for Phase 4 inputs without implementing Phase 4 recommendation scoring.
- Type-check, lint, existing tests, new integrity tests, and production build all pass.
