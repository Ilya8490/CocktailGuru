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

export type LibraryFilterAction = (key: LibraryFilterKey, value: string) => void

const normalizeSearchValue = (value: string) => value.replace(/\s+/g, ' ').trimStart()

const toggleValue = <Value extends string>(values: Value[], value: Value): Value[] =>
  values.includes(value) ? values.filter((item) => item !== value) : [...values, value]

const removeValue = <Value extends string>(values: Value[], value: Value): Value[] =>
  values.filter((item) => item !== value)

const withToggledFilter = (query: LibraryQuery, key: LibraryFilterKey, value: string): LibraryQuery => {
  switch (key) {
    case 'styles':
      return { ...query, styles: toggleValue(query.styles, value as FilterValue<'styles'>) }
    case 'ingredientIds':
      return { ...query, ingredientIds: toggleValue(query.ingredientIds, value) }
    case 'tastes':
      return { ...query, tastes: toggleValue(query.tastes, value as FilterValue<'tastes'>) }
    case 'glasses':
      return { ...query, glasses: toggleValue(query.glasses, value as FilterValue<'glasses'>) }
  }
}

const withoutFilter = (query: LibraryQuery, key: LibraryFilterKey, value: string): LibraryQuery => {
  switch (key) {
    case 'styles':
      return { ...query, styles: removeValue(query.styles, value as FilterValue<'styles'>) }
    case 'ingredientIds':
      return { ...query, ingredientIds: removeValue(query.ingredientIds, value) }
    case 'tastes':
      return { ...query, tastes: removeValue(query.tastes, value as FilterValue<'tastes'>) }
    case 'glasses':
      return { ...query, glasses: removeValue(query.glasses, value as FilterValue<'glasses'>) }
  }
}

export function useLibraryFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = useMemo(() => parseLibraryQuery(searchParams), [searchParams])
  const results = useMemo(() => getLibraryResults(query), [query])
  const searchValue = normalizeSearchValue(searchParams.get('q') ?? '')

  const setSearch = (q: string) => {
    const params = serializeLibraryQuery({ ...query, q })
    const nextSearchValue = normalizeSearchValue(q)

    if (nextSearchValue) params.set('q', nextSearchValue)

    setSearchParams(params, { replace: true })
  }

  const toggleFilter: LibraryFilterAction = (key, value) => {
    setSearchParams(serializeLibraryQuery(withToggledFilter(query, key, value)), { replace: false })
  }

  const removeFilter: LibraryFilterAction = (key, value) => {
    setSearchParams(serializeLibraryQuery(withoutFilter(query, key, value)), { replace: false })
  }

  const clearAll = () => {
    setSearchParams(serializeLibraryQuery(emptyLibraryQuery()), { replace: false })
  }

  return { query, results, searchValue, setSearch, toggleFilter, removeFilter, clearAll }
}
