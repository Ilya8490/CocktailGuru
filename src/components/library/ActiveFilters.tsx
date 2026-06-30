import { AnimatePresence, motion } from 'framer-motion'
import { badgeVariants, buttonTap, createStagger } from '../../animations'
import { libraryFilterGroups } from '../../config/libraryFilters'
import type { LibraryFilterKey } from '../../config/libraryFilters'
import type { LibraryFilterAction } from '../../hooks/useLibraryFilters'
import { getIngredientById } from '../../utils/cocktails'
import type { LibraryQuery } from '../../utils/libraryQuery'

interface ActiveFiltersProps {
  query: LibraryQuery
  onRemove: LibraryFilterAction
  onSearch: (value: string) => void
  onClearAll: () => void
}

interface ActiveFilter {
  key: LibraryFilterKey
  value: string
  label: string
}

const getSelectedValues = (query: LibraryQuery, key: LibraryFilterKey): readonly string[] => query[key]

const getFilterLabel = (key: LibraryFilterKey, value: string) => {
  const group = libraryFilterGroups.find((candidate) => candidate.key === key)
  const configuredLabel = group?.options.find((option) => option.value === value)?.label

  if (configuredLabel) return configuredLabel
  if (key === 'ingredientIds') return getIngredientById(value)?.name ?? value
  return value
}

const getActiveFilters = (query: LibraryQuery): ActiveFilter[] =>
  libraryFilterGroups.flatMap((group) =>
    getSelectedValues(query, group.key).map((value) => ({
      key: group.key,
      value,
      label: getFilterLabel(group.key, value),
    })),
  )

export function ActiveFilters({ query, onRemove, onSearch, onClearAll }: ActiveFiltersProps) {
  const activeFilters = getActiveFilters(query)
  const hasSearch = Boolean(query.q)

  if (!hasSearch && activeFilters.length === 0) return null

  return (
    <motion.section className="active-filters" aria-label="Active filters" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div className="active-filters__list" variants={createStagger({ staggerChildren: 0.04 })} initial="hidden" animate="visible">
        <AnimatePresence initial={false}>
        {hasSearch && (
          <motion.button className="active-filters__chip" type="button" onClick={() => onSearch('')} variants={badgeVariants} exit="exit" whileTap={buttonTap} layout>
            <span className="active-filters__chip-category">Search</span>
            <span className="active-filters__chip-label">{query.q}</span>
            <span className="active-filters__chip-remove" aria-hidden="true">
              ×
            </span>
            <span className="visually-hidden">Remove search filter</span>
          </motion.button>
        )}
        {activeFilters.map((filter) => (
          <motion.button
            className="active-filters__chip"
            key={`${filter.key}-${filter.value}`}
            type="button"
            onClick={() => onRemove(filter.key, filter.value)}
            variants={badgeVariants}
            exit="exit"
            whileTap={buttonTap}
            layout
          >
            <span className="active-filters__chip-label">{filter.label}</span>
            <span className="active-filters__chip-remove" aria-hidden="true">
              ×
            </span>
            <span className="visually-hidden">Remove {filter.label} filter</span>
          </motion.button>
        ))}
        </AnimatePresence>
      </motion.div>
      <button className="active-filters__clear" type="button" onClick={onClearAll}>
        Clear all
      </button>
    </motion.section>
  )
}
