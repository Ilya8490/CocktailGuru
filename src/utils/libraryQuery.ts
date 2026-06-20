import { glassOptions, styleOptions, tasteOptions } from '../config/libraryFilters'
import { ingredients } from '../data'
import type { Cocktail, CocktailOrigin, Glassware, TasteAxis } from '../types'
import { filterCocktails, searchCocktails } from './cocktails'

export interface LibraryQuery {
  q: string
  styles: CocktailOrigin[]
  ingredientIds: string[]
  tastes: TasteAxis[]
  glasses: Glassware[]
}

const styles = styleOptions.map(({ value }) => value)
const ingredientIds = ingredients.map(({ id }) => id)
const tastes = tasteOptions.map(({ value }) => value)
const glasses = glassOptions.map(({ value }) => value)

const normalizeQuery = (value: string) => value.trim().replace(/\s+/g, ' ')

const parseList = <T extends string>(value: string | null, allowed: readonly T[]): T[] => {
  const allowedValues = new Set<string>(allowed)
  return [...new Set((value ?? '').split(',').filter((item): item is T => allowedValues.has(item)))]
}

const orderBy = <T extends string>(values: readonly string[], order: readonly T[]): T[] => {
  const selectedValues = new Set(values)
  return order.filter((value) => selectedValues.has(value))
}

export const emptyLibraryQuery = (): LibraryQuery => ({
  q: '',
  styles: [],
  ingredientIds: [],
  tastes: [],
  glasses: [],
})

export function parseLibraryQuery(params: URLSearchParams): LibraryQuery {
  return {
    q: normalizeQuery(params.get('q') ?? ''),
    styles: parseList(params.get('style'), styles),
    ingredientIds: parseList(params.get('ingredient'), ingredientIds),
    tastes: parseList(params.get('taste'), tastes),
    glasses: parseList(params.get('glass'), glasses),
  }
}

export function serializeLibraryQuery(query: LibraryQuery): URLSearchParams {
  const params = new URLSearchParams()
  const q = normalizeQuery(query.q)
  const orderedStyles = orderBy(query.styles, styles)
  const orderedIngredients = orderBy(query.ingredientIds, ingredientIds)
  const orderedTastes = orderBy(query.tastes, tastes)
  const orderedGlasses = orderBy(query.glasses, glasses)

  if (q) params.set('q', q)
  if (orderedStyles.length) params.set('style', orderedStyles.join(','))
  if (orderedIngredients.length) params.set('ingredient', orderedIngredients.join(','))
  if (orderedTastes.length) params.set('taste', orderedTastes.join(','))
  if (orderedGlasses.length) params.set('glass', orderedGlasses.join(','))

  return params
}

export function getLibraryResults(query: LibraryQuery): Cocktail[] {
  const searchedIds = new Set(searchCocktails(query.q).map(({ id }) => id))
  return filterCocktails({
    origin: query.styles,
    ingredientIds: query.ingredientIds,
    prominentTastes: query.tastes,
    glass: query.glasses,
  }).filter(({ id }) => searchedIds.has(id))
}
