import { useDeferredValue, useTransition } from 'react'
import { useLocation } from 'react-router-dom'
import { cocktails } from '../data'
import { useLibraryFilters } from '../hooks/useLibraryFilters'
import { PageTransition } from '../components/ui/PageTransition'
import { CocktailGridSkeleton } from '../components/ui/LoadingStates'
import {
  ActiveFilters,
  CocktailFilters,
  CocktailGrid,
  CocktailSearch,
  LibraryEmptyState,
  LibraryHero,
  MobileFilterSheet,
} from '../components/library'

export function LibraryPage() {
  const location = useLocation()
  const { query, results, searchValue, setSearch, toggleFilter, removeFilter, clearAll } = useLibraryFilters()
  const [isPending, startTransition] = useTransition()
  const visibleResults = useDeferredValue(results)
  const isFiltering = isPending || visibleResults !== results
  const from = `${location.pathname}${location.search}`
  const handleSearch = (value: string) => startTransition(() => setSearch(value))
  const handleToggle = (...args: Parameters<typeof toggleFilter>) => startTransition(() => toggleFilter(...args))
  const handleRemove = (...args: Parameters<typeof removeFilter>) => startTransition(() => removeFilter(...args))
  const handleClearAll = () => startTransition(clearAll)

  return (
    <PageTransition>
      <div className="library-page">
        <LibraryHero total={cocktails.length} />
        <div className="library-toolbar section-gutter">
          <CocktailSearch value={searchValue} onChange={handleSearch} />
          <MobileFilterSheet query={query} onToggle={handleToggle} onClearAll={handleClearAll} />
        </div>
        <div className="section-gutter">
          <ActiveFilters query={query} onRemove={handleRemove} onSearch={handleSearch} onClearAll={handleClearAll} />
          <div className="library-results-header">
            <p>{results.length} {results.length === 1 ? 'cocktail' : 'cocktails'}</p>
          </div>
          <div className="library-layout">
            <aside className="library-filter-rail" aria-label="Filter cocktails">
              <CocktailFilters query={query} onToggle={handleToggle} />
            </aside>
            <div className="library-results">
              {isFiltering ? <CocktailGridSkeleton /> : visibleResults.length > 0
                ? <CocktailGrid cocktails={visibleResults} from={from} />
                : <LibraryEmptyState onClearAll={handleClearAll} />}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
