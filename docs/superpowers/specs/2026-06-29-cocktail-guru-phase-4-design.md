# Cocktail Guru Phase 4 Builder Design

## Objective

Replace the `/builder` placeholder with Cocktail Guru’s signature interactive builder. Users can choose ingredients from a premium bar-shelf interface, add them to a mixing glass by tapping or dragging, share the selected set through the URL, and see exact or near cocktail matches from the Phase 2 catalog.

Phase 4 focuses on useful matching, clear state, and responsive interaction. It does not try to finish the richer animation polish reserved for Phase 5.

## Scope

### Included

- Real `/builder` route
- URL-driven selected ingredient IDs using `?ingredients=gin,campari`
- Ingredient shelf with featured categories and full-registry search
- Tap-first add/remove/toggle interaction
- Drag-and-drop enhancement for pointer devices
- Mixing-glass selected-ingredient area
- Exact matches first, followed by ranked “almost there” suggestions
- Match cards showing coverage, available ingredients, missing ingredients, and detail links
- Empty and zero-match states
- Clear-all action
- Lean tests for query parsing, invalid IDs, matching rank, and user interaction

### Excluded

- Zustand or LocalStorage state
- Quantity editing
- Custom user recipes
- Persisted favorites
- Complex drag physics or theatrical pour animations
- AI recommendations
- Backend or remote data
- Exhaustive accessibility, keyboard, reduced-motion, or duplicated responsive tests

## Chosen Architecture

Use a Lean URL Builder architecture. The URL is the only source of selected-builder state. A route-level hook parses canonical ingredient IDs from `location.search`, exposes shared `add`, `remove`, `toggle`, and `clear` actions, and writes canonical URLs through React Router navigation.

Pure utilities handle parsing, serialization, selection updates, and cocktail matching. Components only render typed props and call shared actions. This keeps drag-and-drop and tap behavior consistent because both paths call the same add/remove/toggle functions.

This approach is preferred over Zustand because Phase 4 state is small, shareable, and route-specific. LocalStorage belongs to Phase 6 favorites. A heavier animated-builder architecture is deferred to Phase 5.

## URL Contract

The Builder uses one canonical query parameter:

```text
/builder?ingredients=gin,campari,sweet-vermouth
```

Rules:

- Values are canonical ingredient IDs.
- Unknown, duplicate, and empty values are ignored.
- Serialization emits IDs in ingredient-registry order for deterministic URLs.
- Empty selection serializes to `/builder`.
- Adding or removing ingredients uses history push because each selection change is intentional.

## Component Boundaries

- `BuilderPage` composes the route, controller hook, search state, shelf, glass, and results.
- `useBuilderIngredients` owns URL parsing and navigation actions.
- `BuilderHero` frames the page and selected count.
- `IngredientShelf` renders featured groups plus filtered full-registry results.
- `IngredientSearch` filters ingredients by name and alias.
- `IngredientToken` is the shared tap and draggable ingredient control.
- `MixingGlass` renders selected ingredients, remove controls, drop target behavior, and clear-all.
- `BuilderResults` renders exact and near matches.
- `BuilderMatchCard` renders coverage, missing ingredients, and a link to `/library/:slug`.
- `BuilderEmptyState` invites users to add their first ingredient.

The existing cocktail detail pages remain the recipe destination. Builder results link to those pages instead of duplicating full recipes.

## Ingredient Browsing

The first visible shelf is curated and premium: spirits, liqueurs/fortified bases, juices, syrups, bitters, herbs, fruits, and mixers. Search accesses the full 63-ingredient registry, including garnishes and secondary recipe items.

Selected ingredients remain visible in the mixing glass even if the shelf search changes. Ingredients already selected are visually marked and can be tapped again to remove.

## Interaction Model

Tap is the baseline interaction on every device. Drag-and-drop is an enhancement for pointer devices:

- Tap an unselected ingredient to add it.
- Tap a selected ingredient or its selected-chip remove button to remove it.
- Drag an ingredient token into the mixing glass to add it.
- Dragging never becomes the only way to complete an action.
- Dropping an already-selected ingredient is a no-op.

The drag implementation should stay simple and browser-native where practical. Phase 5 can add richer motion after the behavior is stable.

## Matching Semantics

Matching uses the Phase 2 catalog and normalized recipe ingredient IDs.

- Exact match: every recipe ingredient exists in the selected set.
- Near match: at least one recipe ingredient exists in the selected set, but some are missing.
- Zero selected ingredients: show the empty state, not ranked results.
- Results sort exact matches first, then by coverage ratio descending, then by fewer missing ingredients, then by cocktail name.
- A match card exposes available and missing ingredient names through resolved recipe metadata.
- Coverage is calculated as `available recipe lines / total recipe lines`.

This makes the builder useful early: two ingredients can still reveal “almost there” suggestions while full recipe coverage floats exact matches to the top.

## Visual Direction

The Builder should feel like a dark luxury cocktail atelier:

- Left/top shelf of luminous ingredient tokens
- Central or prominent mixing-glass panel
- Right/bottom result cards depending on viewport
- Burgundy velvet surfaces, antique-gold rules, glassmorphism, and ingredient-derived accents
- Clear selected-state styling without dashboard heaviness

Desktop can use a three-zone layout. Mobile should stack hero, search, shelf, glass, and results in a practical order with sticky selected-count affordance only if it remains lightweight.

## Error and Empty Behavior

- Invalid ingredient IDs in the URL are ignored.
- A URL with only invalid IDs behaves like `/builder`.
- No selection renders an invitation to add ingredients.
- A selection with no overlapping recipes renders a branded zero-match state with clear-all.
- Missing ingredient metadata remains protected by existing data integrity tests.

## Testing Strategy

Keep Phase 4 tests lean and logic-heavy:

- Builder query parsing and canonical serialization
- Invalid ingredient IDs are ignored
- Selection add/remove/toggle utilities deduplicate and preserve canonical ordering
- Exact matches sort before near matches
- Near matches rank by coverage and missing count
- User can add and remove ingredients through tap interaction
- URL-selected ingredients drive visible results

Do not add exhaustive desktop/mobile, keyboard, reduced-motion, or drag-event tests unless implementation reveals a specific regression risk. Browser verification should cover the real drag-and-drop enhancement manually.

The quality gate remains:

- Existing tests pass
- New focused Phase 4 tests pass
- TypeScript type-check passes
- ESLint passes
- Production build passes
- Browser smoke test confirms `/builder`, tap selection, URL state, results, clear-all, and desktop drag enhancement work

## Success Criteria

- `/builder` is a real, polished route rather than a placeholder.
- Selected ingredients are shareable and refresh-safe through the URL.
- Tap interaction works everywhere, and drag-and-drop enhances desktop use.
- Exact and near matches are deterministic, understandable, and data-driven from the Phase 2 catalog.
- Components stay focused and reuse shared actions.
- No global store or LocalStorage is introduced in Phase 4.
- The experience feels like Cocktail Guru’s signature feature while leaving advanced motion for Phase 5.
