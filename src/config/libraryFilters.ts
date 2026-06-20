import { cocktails, ingredients } from '../data'
import type { CocktailOrigin, Glassware, TasteAxis } from '../types'

interface FilterOption<T extends string> {
  value: T
  label: string
}

export const styleOptions: ReadonlyArray<FilterOption<CocktailOrigin>> = [
  { value: 'classic', label: 'Classics' },
  { value: 'modern', label: 'Modern' },
  { value: 'mocktail', label: 'Mocktails' },
]

export const tasteOptions: ReadonlyArray<FilterOption<TasteAxis>> = [
  { value: 'sweet', label: 'Sweet' },
  { value: 'sour', label: 'Sour' },
  { value: 'bitter', label: 'Bitter' },
  { value: 'strong', label: 'Strong' },
  { value: 'fruity', label: 'Fruity' },
  { value: 'spicy', label: 'Spicy' },
]

export const glassOptions: ReadonlyArray<FilterOption<Glassware>> = [
  { value: 'coupe', label: 'Coupe' },
  { value: 'nick-and-nora', label: 'Nick & Nora' },
  { value: 'martini', label: 'Martini' },
  { value: 'rocks', label: 'Rocks' },
  { value: 'highball', label: 'Highball' },
  { value: 'collins', label: 'Collins' },
  { value: 'flute', label: 'Flute' },
  { value: 'wine', label: 'Wine' },
  { value: 'copper-mug', label: 'Copper mug' },
]

const catalogIngredientIds = new Set(
  cocktails.flatMap(({ ingredients: recipe }) => recipe.map(({ ingredientId }) => ingredientId)),
)
const visibleJuiceIds = new Set(['cranberry-juice', 'orange-juice', 'apricot-nectar'])

export const ingredientOptions: ReadonlyArray<FilterOption<string>> = ingredients
  .filter(({ id, category }) => (category === 'spirit' && catalogIngredientIds.has(id)) || visibleJuiceIds.has(id))
  .map(({ id: value, name: label }) => ({ value, label }))

export const libraryFilterGroups = [
  { key: 'styles', label: 'Style', options: styleOptions },
  { key: 'ingredientIds', label: 'Ingredient', options: ingredientOptions },
  { key: 'tastes', label: 'Taste', options: tasteOptions },
  { key: 'glasses', label: 'Glass', options: glassOptions },
] as const
