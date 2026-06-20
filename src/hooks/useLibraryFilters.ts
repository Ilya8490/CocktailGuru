import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import type { LibraryFilterKey } from '../config/libraryFilters'
import {
  emptyLibraryQuery,
  getLibraryResults,
  parseLibraryQuery,
  serializeLibraryQuery,
} from '../utils/libraryQuery'
import type { LibraryQuery } from '../utils/libraryQuery'

type FilterValue<Key extends LibraryFilterKey> = LibraryQuery[Key][number]

type FilterSelection = {
  [Key in LibraryFilterKey]: [key: Key, value: FilterValue<Key>]
}[LibraryFilterKey]

const toggleValue = <Value extends string>(values: Value[], value: Value): Value[] =>
  values.includes(value) ? values.filter((item) => item !== value) : [...values, value]

const removeValue = <Value extends string>(values: Value[], value: Value): Value[] =>
  values.filter((item) => item !== value)

const withToggledFilter = (query: LibraryQuery, selection: FilterSelection): LibraryQuery => {
  switch (selection[0]) {
    case 'styles':
      return { ...query, styles: toggleValue(query.styles, selection[1]) }
    case 'ingredientIds':
      return { ...query, ingredientIds: toggleValue(query.ingredientIds, selection[1]) }
    case 'tastes':
      return { ...query, tastes: toggleValue(query.tastes, selection[1]) }
    case 'glasses':
      return { ...query, glasses: toggleValue(query.glasses, selection[1]) }
  }
}

const withoutFilter = (query: LibraryQuery, selection: FilterSelection): LibraryQuery => {
  switch (selection[0]) {
    case 'styles':
      return { ...query, styles: removeValue(query.styles, selection[1]) }
    case 'ingredientIds':
      return { ...query, ingredientIds: removeValue(query.ingredientIds, selection[1]) }
    case 'tastes':
      return { ...query, tastes: removeValue(query.tastes, selection[1]) }
    case 'glasses':
      return { ...query, glasses: removeValue(query.glasses, selection[1]) }
  }
}

export function useLibraryFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = useMemo(() => parseLibraryQuery(searchParams), [searchParams])
  const results = useMemo(() => getLibraryResults(query), [query])

  const setSearch = (q: string) => {
    setSearchParams(serializeLibraryQuery({ ...query, q }), { replace: true })
  }

  const toggleFilter = (...selection: FilterSelection) => {
    setSearchParams(serializeLibraryQuery(withToggledFilter(query, selection)), { replace: false })
  }

  const removeFilter = (...selection: FilterSelection) => {
    setSearchParams(serializeLibraryQuery(withoutFilter(query, selection)), { replace: false })
  }

  const clearAll = () => {
    setSearchParams(serializeLibraryQuery(emptyLibraryQuery()), { replace: false })
  }

  return { query, results, setSearch, toggleFilter, removeFilter, clearAll }
}
