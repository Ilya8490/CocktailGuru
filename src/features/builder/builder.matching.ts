import { cocktails } from '../../data'
import type { Cocktail, RecipeIngredient } from '../../types'
import { getIngredientCoverage } from '../../utils'
import { orderIngredientIds } from './builder.utils'

export type BuilderMatchKind = 'exact' | 'near'

export interface BuilderMatch {
  cocktail: Cocktail
  kind: BuilderMatchKind
  available: RecipeIngredient[]
  missing: RecipeIngredient[]
  ratio: number
  missingCount: number
}

const isMeaningfulNearMatch = (ratio: number, missingCount: number) => ratio >= 0.5 || missingCount <= 3

export function getBuilderMatches(selectedIngredientIds: readonly string[]): BuilderMatch[] {
  const selected = orderIngredientIds(selectedIngredientIds)
  if (!selected.length) return []

  return cocktails
    .map((cocktail): BuilderMatch | null => {
      const coverage = getIngredientCoverage(cocktail, selected)
      if (!coverage.available.length) return null

      const missingCount = coverage.missing.length
      const kind: BuilderMatchKind = missingCount === 0 ? 'exact' : 'near'

      if (kind === 'near' && !isMeaningfulNearMatch(coverage.ratio, missingCount)) return null

      return {
        cocktail,
        kind,
        available: coverage.available,
        missing: coverage.missing,
        ratio: coverage.ratio,
        missingCount,
      }
    })
    .filter((match): match is BuilderMatch => match !== null)
    .sort((a, b) => {
      if (a.kind !== b.kind) return a.kind === 'exact' ? -1 : 1
      if (b.ratio !== a.ratio) return b.ratio - a.ratio
      if (a.missingCount !== b.missingCount) return a.missingCount - b.missingCount
      return a.cocktail.name.localeCompare(b.cocktail.name)
    })
}
