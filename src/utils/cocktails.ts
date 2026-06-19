import { cocktails,ingredients } from '../data'
import type { Cocktail,CocktailOrigin,Glassware,IngredientCategory,RecipeIngredient,Ingredient } from '../types'

const ingredientMap=new Map(ingredients.map(i=>[i.id,i]))
const cocktailIdMap=new Map(cocktails.map(c=>[c.id,c]))
const cocktailSlugMap=new Map(cocktails.map(c=>[c.slug,c]))
const normalize=(value:string)=>value.trim().toLocaleLowerCase().replace(/\s+/g,' ')

export const getIngredientById=(id:string)=>ingredientMap.get(id)
export const getCocktailById=(id:string)=>cocktailIdMap.get(id)
export const getCocktailBySlug=(slug:string)=>cocktailSlugMap.get(slug)
export type ResolvedRecipeIngredient=RecipeIngredient&{ingredient:Ingredient}
export const resolveRecipe=(cocktail:Cocktail):ResolvedRecipeIngredient[]=>cocktail.ingredients.flatMap(line=>{const ingredient=ingredientMap.get(line.ingredientId);return ingredient?[{...line,ingredient}]:[]})

export const searchCocktails=(query:string):Cocktail[]=>{
  const needle=normalize(query); if(!needle)return [...cocktails]
  return cocktails.filter(c=>{const ingredientText=resolveRecipe(c).flatMap(({ingredient,displayNote})=>[ingredient.name,...ingredient.aliases,displayNote??'']);return [c.name,c.description,...c.tags,...ingredientText].some(value=>normalize(value).includes(needle))})
}

export interface CocktailFilters { origin?:CocktailOrigin[]; tags?:string[]; ingredientCategories?:IngredientCategory[]; glass?:Glassware[]; alcoholic?:boolean }
export const filterCocktails=(filters:CocktailFilters):Cocktail[]=>cocktails.filter(c=>{
  if(filters.origin?.length&&!filters.origin.includes(c.origin))return false
  if(filters.glass?.length&&!filters.glass.includes(c.glass))return false
  if(filters.tags?.length&&!filters.tags.some(tag=>c.tags.includes(tag)))return false
  const resolved=resolveRecipe(c)
  if(filters.ingredientCategories?.length&&!resolved.some(({ingredient})=>filters.ingredientCategories!.includes(ingredient.category)))return false
  if(filters.alcoholic!==undefined&&resolved.some(({ingredient})=>ingredient.isAlcoholic)!==filters.alcoholic)return false
  return true
})

export const getIngredientCoverage=(cocktail:Cocktail,selectedIngredientIds:string[])=>{
  const selected=new Set(selectedIngredientIds)
  const available=cocktail.ingredients.filter(line=>selected.has(line.ingredientId))
  const missing=cocktail.ingredients.filter(line=>!selected.has(line.ingredientId))
  return {available,missing,ratio:cocktail.ingredients.length?available.length/cocktail.ingredients.length:0}
}
