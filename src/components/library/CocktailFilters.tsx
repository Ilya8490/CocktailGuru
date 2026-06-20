import { useId } from 'react'

import { libraryFilterGroups } from '../../config/libraryFilters'
import type { LibraryFilterKey } from '../../config/libraryFilters'
import type { LibraryFilterAction } from '../../hooks/useLibraryFilters'
import type { LibraryQuery } from '../../utils/libraryQuery'

interface CocktailFiltersProps {
  query: LibraryQuery
  onToggle: LibraryFilterAction
  className?: string
  idPrefix?: string
}

const getSelectedValues = (query: LibraryQuery, key: LibraryFilterKey): readonly string[] => query[key]

export function CocktailFilters({
  query,
  onToggle,
  className = '',
  idPrefix,
}: CocktailFiltersProps) {
  const generatedId = useId()
  const resolvedIdPrefix = idPrefix ?? `library-filter-${generatedId.replace(/:/g, '')}`

  return (
    <div className={['cocktail-filters', className].filter(Boolean).join(' ')}>
      {libraryFilterGroups.map((group) => {
        const selectedValues = getSelectedValues(query, group.key)

        return (
          <fieldset className="cocktail-filters__group" key={group.key}>
            <legend className="cocktail-filters__legend">{group.label}</legend>
            <div className="cocktail-filters__options">
              {group.options.map((option) => {
                const optionId = `${resolvedIdPrefix}-${group.key}-${option.value}`

                return (
                  <label className="cocktail-filters__option" htmlFor={optionId} key={option.value}>
                    <input
                      checked={selectedValues.includes(option.value)}
                      className="cocktail-filters__checkbox"
                      id={optionId}
                      type="checkbox"
                      onChange={() => onToggle(group.key, option.value)}
                    />
                    <span className="cocktail-filters__option-label">{option.label}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        )
      })}
    </div>
  )
}
