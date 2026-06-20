import { useLocation } from 'react-router-dom'
import { cocktails } from '../data'
import { useLibraryFilters } from '../hooks/useLibraryFilters'
import { PageTransition } from '../components/ui/PageTransition'
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
  const from = `${location.pathname}${location.search}`

  return (
    <PageTransition>
      <div className="library-page">
        <LibraryHero total={cocktails.length} />
        <div className="library-toolbar section-gutter">
          <CocktailSearch value={searchValue} onChange={setSearch} />
          <MobileFilterSheet query={query} onToggle={toggleFilter} onClearAll={clearAll} />
        </div>
        <div className="section-gutter">
          <ActiveFilters query={query} onRemove={removeFilter} onSearch={setSearch} onClearAll={clearAll} />
          <div className="library-results-header">
            <p>{results.length} {results.length === 1 ? 'cocktail' : 'cocktails'}</p>
          </div>
          <div className="library-layout">
            <aside className="library-filter-rail" aria-label="Filter cocktails">
              <CocktailFilters query={query} onToggle={toggleFilter} />
            </aside>
            <div className="library-results">
              {results.length > 0
                ? <CocktailGrid cocktails={results} from={from} />
                : <LibraryEmptyState onClearAll={clearAll} />}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
