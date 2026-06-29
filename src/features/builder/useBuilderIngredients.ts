import { useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  addIngredientId,
  parseBuilderQuery,
  removeIngredientId,
  sameIngredientSelection,
  serializeBuilderQuery,
  toggleIngredientId,
} from './builder.utils'

export function useBuilderIngredients() {
  const location = useLocation()
  const navigate = useNavigate()

  const selectedIngredientIds = useMemo(
    () => parseBuilderQuery(new URLSearchParams(location.search)),
    [location.search],
  )

  const writeSelection = useCallback((nextIngredientIds: string[]) => {
    if (sameIngredientSelection(selectedIngredientIds, nextIngredientIds)) return

    const search = serializeBuilderQuery(nextIngredientIds).toString()
    void navigate({
      pathname: '/builder',
      search: search ? `?${search}` : '',
    })
  }, [navigate, selectedIngredientIds])

  return {
    selectedIngredientIds,
    addIngredient: (ingredientId: string) => writeSelection(addIngredientId(selectedIngredientIds, ingredientId)),
    removeIngredient: (ingredientId: string) => writeSelection(removeIngredientId(selectedIngredientIds, ingredientId)),
    toggleIngredient: (ingredientId: string) => writeSelection(toggleIngredientId(selectedIngredientIds, ingredientId)),
    clearIngredients: () => writeSelection([]),
  }
}
