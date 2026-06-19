# Cocktail Guru Phase 3 Library Design

## Objective

Replace the `/library` placeholder with a polished, responsive cocktail-browsing experience powered by the Phase 2 catalog. Users can search and filter all 25 cocktails, open a data-driven detail page, and return to the exact Library view they came from.

Phase 3 should feel like an editorial cocktail collection rather than a dashboard. It extends the existing Graphic Art Deco visual language while keeping state management and testing deliberately lean.

## Scope

### Included

- Responsive Library page at `/library`
- Instant normalized search
- URL-synchronized style, ingredient, prominent-taste, and glassware filters
- Active-filter chips, result count, clear-all action, and branded empty state
- Responsive editorial cocktail-card grid
- Shared desktop and mobile filter configuration
- Cocktail detail pages at `/library/:slug`
- Complete recipe, taste, method, garnish, instruction, and reference content
- Safe return navigation to the previous filtered Library URL
- Dedicated cocktail-not-found state for invalid slugs
- Focused utility and integration tests for new logic

### Excluded

- Geographic cocktail origins
- Favorites and LocalStorage
- Builder integration or recommendation scoring
- Zustand or another global state store
- Pagination, infinite scrolling, or remote data fetching
- Sorting controls
- Twenty-five unique cocktail photographs
- Elaborate motion or animated taste-profile graphics
- Exhaustive UI, keyboard, reduced-motion, or duplicated desktop/mobile tests

## Chosen Architecture

Use a URL-driven Library controller hook. `useLibraryFilters` parses, validates, and updates query parameters. Presentational components receive typed values and callbacks and do not reimplement URL logic.

This is preferred over placing all logic in `LibraryPage`, which would make the route component dense, and over a synchronized Context or global store, which would create two sources of truth. The URL is the only source of Library state.

The Phase 2 catalog remains the only source of cocktail content. Both cards and detail pages resolve records from `src/data/cocktails.ts`; no cocktail receives a hardcoded page component.

## Routes

- `/library` renders the searchable and filterable catalog.
- `/library/:slug` resolves one cocktail through `getCocktailBySlug` and renders the shared detail template.
- An unknown cocktail slug renders a dedicated cocktail-not-found experience inside the normal application shell.
- Other unknown application paths continue to use the existing branded not-found page.

## Component Boundaries

### Library route

- `LibraryPage` composes the route and passes controller state to children.
- `LibraryHero` frames the collection and total catalog size.
- `CocktailSearch` provides the accessible instant-search field.
- `CocktailFilters` renders controls from the shared typed filter configuration.
- `ActiveFilters` renders removable chips and the clear-all action.
- `CocktailGrid` renders the responsive results.
- `CocktailCard` presents image treatment, style, name, description, prominent tastes, glassware, and the detail link.
- `LibraryEmptyState` explains that no cocktails match and provides a clear-all action.
- `MobileFilterSheet` presents the same filter configuration in a compact modal sheet. It does not duplicate filtering rules or option lists.

### Detail route

- `CocktailDetailPage` resolves the route slug and composes a single data-driven template.
- The page includes an editorial hero, metadata, six-axis taste profile, resolved metric ingredient list, preparation method, garnish, ordered instructions, optional references, and return navigation.
- Missing optional references or display notes omit those elements without leaving empty sections.

Components remain focused: route components coordinate data, controller hooks coordinate URL state, pure utilities implement catalog logic, and presentational components render typed props.

## URL Contract

The Library uses these canonical query parameters in this stable order:

1. `q` — normalized search text
2. `style` — `classic`, `modern`, or `mocktail`
3. `ingredient` — canonical ingredient IDs
4. `taste` — one or more taste axes
5. `glass` — canonical glassware values

Example:

```text
/library?q=negroni&style=classic&ingredient=gin&taste=bitter&glass=rocks
```

Multiple values use comma-separated canonical IDs, such as `ingredient=gin,mezcal`. Serialization removes empty, duplicate, unknown, and default values. Values are emitted in deterministic order so equivalent filter selections produce the same URL.

The existing `Cocktail.origin` property still means the catalog classification `classic | modern | mocktail`. The public URL calls this concept `style`, leaving `origin` available for possible geographic data later.

## Search and Filter Semantics

- Search is case-insensitive and normalized across cocktail name, description, tags, ingredient names, and ingredient aliases.
- Multiple values inside one filter group use OR semantics.
- Different filter groups use AND semantics.
- An ingredient match means that the recipe contains the selected canonical ingredient ID.
- A taste axis is prominent when its Phase 2 score is 4 or 5.
- Empty search and filters return all 25 cocktails.
- Results update synchronously because the complete catalog is local and small.
- Invalid URL values are ignored during parsing and removed on the next intentional filter update.

Phase 2 pure utilities will be extended with ingredient-ID and taste-axis filtering while keeping existing behavior backward-compatible.

## Navigation and History

Typing in search updates query parameters with `replace: true`, preventing one browser-history entry per keystroke.

Applying, removing, or clearing filters is an intentional navigation and uses a history push. Every card detail link passes the current `pathname + search` through `location.state.from`.

The detail page uses `location.state.from` for “Back to Library” only when it is a string beginning with `/library`. Otherwise it falls back to `/library`. This prevents unrelated or unsafe return targets while preserving a user's filtered view during normal navigation.

## Shared Filter Configuration

Desktop and mobile controls consume one typed filter configuration that defines:

- Parameter key
- Visible label
- Allowed values
- Visible option labels
- Serialization order

The `ingredient` parameter accepts any canonical ingredient ID from the registry. To keep the visible filter lean, the initial UI surfaces the catalog's alcoholic base spirits plus the three primary mocktail bases: cranberry juice, orange juice, and apricot nectar. Valid deep links using another canonical ingredient still filter correctly and receive a labeled active chip. This broader contract supports future mocktail discovery without a URL rename.

Filter configuration defines available controls; pure utilities define matching behavior. The mobile sheet only changes presentation.

## Visual Direction

The Library extends the established Burgundy Velvet and Graphic Art Deco system:

- Compact cinematic Library hero
- Generous spacing and editorial typography
- Thin gold rules, burgundy overlays, and restrained glass surfaces
- Sticky desktop filter rail
- Two- or three-column desktop grid based on available width
- Single-column mobile cards with wide image crops
- Always-visible mobile search
- Mobile filter sheet with active filters remaining visible as wrapping chips

The two existing local editorial photographs are reused with alternating crops, cocktail-specific burgundy and gold overlays, ingredient-derived accent colors, and varied Art Deco framing. Stable visual variants derive from cocktail data so all 25 cards and detail pages feel differentiated without adding 25 image assets.

Cards prioritize style, name, description, prominent taste labels, and glassware. Detail pages use a shared editorial layout rather than generic stacked dashboard cards.

Motion remains restrained: existing page transitions, a small card-hover lift, the filter-sheet entrance, and subtle result changes. Elaborate taste-profile and micro-interaction motion remains Phase 5 work.

## Responsive and Accessible Behavior

- Semantic search, filter, result, article, and navigation structures are used.
- All controls have accessible names and visible focus treatment.
- The mobile filter sheet closes with Escape, returns focus to its trigger, and prevents interaction with obscured content while open.
- Cocktail-card links have descriptive accessible text.
- The result count updates in visible text without aggressive live announcements.
- Existing reduced-motion styles remain effective for Phase 3 transitions.

These behaviors are implementation requirements, but Phase 3 does not add exhaustive accessibility or duplicate responsive test coverage unless a test is needed to protect new logic.

## Error and Empty Behavior

- No search or filter matches render a branded empty state with a single clear-all action.
- Clear all returns to the canonical `/library` URL.
- Invalid filter values do not crash or produce impossible component state.
- Invalid cocktail slugs render the dedicated cocktail-not-found view with links to the Library and Home.
- Missing optional cocktail metadata omits the corresponding UI section.
- Broken ingredient references remain development-time integrity-test failures from Phase 2.

## Testing Strategy

Prefer pure utility tests over broad React integration tests. Add only the coverage needed to protect Phase 3 logic:

- Query parsing and canonical serialization
- OR semantics within one filter group and AND semantics across groups
- Canonical ingredient-ID filtering
- Prominent-taste filtering using the 4-or-5 threshold
- Invalid slug rendering the cocktail-not-found experience
- Cocktail-card links preserving the filtered Library URL in navigation state
- Empty-state clear-all behavior

Do not add exhaustive keyboard, reduced-motion, desktop/mobile duplication, or every-component rendering tests unless implementation reveals a specific regression risk.

The complete quality gate remains:

- Existing Phase 1 and Phase 2 tests pass
- New focused Phase 3 tests pass
- TypeScript type-check passes
- ESLint passes
- Production build passes

## Success Criteria

- All 25 cocktails can be discovered through a responsive Library grid.
- Search and filters are shareable, refresh-safe, deterministic, and represented only in the URL.
- URL parameters use the approved `q`, `style`, `ingredient`, `taste`, and `glass` contract.
- Search typing replaces history entries; intentional filter actions push history entries.
- Desktop and mobile controls share one typed configuration and one filtering implementation.
- Every valid cocktail slug renders complete content from the single Phase 2 data source.
- Invalid slugs render a useful not-found recovery state.
- Returning from a detail page restores the saved filtered Library URL when it is safe.
- The visual result feels consistent with the existing premium Graphic Art Deco experience without requiring unique photography for every cocktail.
- The implementation remains frontend-only, local, lean, and free of unnecessary global state.
