import { ingredients } from '../../data'

const ingredientOrder = ingredients.map(({ id }) => id)
const allowedIngredientIds = new Set(ingredientOrder)

export function orderIngredientIds(values: readonly string[]): string[] {
  const selected = new Set(values.filter((value) => allowedIngredientIds.has(value)))
  return ingredientOrder.filter((id) => selected.has(id))
}

export function parseBuilderQuery(params: URLSearchParams): string[] {
  return orderIngredientIds((params.get('ingredients') ?? '').split(',').filter(Boolean))
}

export function serializeBuilderQuery(ingredientIds: readonly string[]): URLSearchParams {
  const params = new URLSearchParams()
  const ordered = orderIngredientIds(ingredientIds)
  if (ordered.length) params.set('ingredients', ordered.join(','))
  return params
}

export function addIngredientId(current: readonly string[], ingredientId: string): string[] {
  return orderIngredientIds([...current, ingredientId])
}

export function removeIngredientId(current: readonly string[], ingredientId: string): string[] {
  return orderIngredientIds(current.filter((id) => id !== ingredientId))
}

export function toggleIngredientId(current: readonly string[], ingredientId: string): string[] {
  return current.includes(ingredientId)
    ? removeIngredientId(current, ingredientId)
    : addIngredientId(current, ingredientId)
}

export function sameIngredientSelection(a: readonly string[], b: readonly string[]): boolean {
  const orderedA = orderIngredientIds(a)
  const orderedB = orderIngredientIds(b)
  return orderedA.length === orderedB.length && orderedA.every((value, index) => value === orderedB[index])
}
