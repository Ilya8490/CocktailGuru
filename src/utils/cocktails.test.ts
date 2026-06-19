import { describe,expect,it } from 'vitest'
import { filterCocktails,getCocktailById,getCocktailBySlug,getIngredientById,getIngredientCoverage,resolveRecipe,searchCocktails } from './cocktails'

describe('cocktail utilities',()=>{
  it('looks up known and unknown records',()=>{expect(getIngredientById('gin')?.name).toBe('Gin');expect(getIngredientById('missing')).toBeUndefined();expect(getCocktailBySlug('basil-beauty')?.name).toBe('Basil Beauty');expect(getCocktailById('missing')).toBeUndefined()})
  it('resolves recipe lines',()=>{const resolved=resolveRecipe(getCocktailById('basil-beauty')!);expect(resolved).toHaveLength(6);expect(resolved[0]?.ingredient.name).toBe('Passion Fruit')})
  it('searches names, aliases and ingredients case-insensitively',()=>{expect(searchCocktails('CITROEN').map(c=>c.id)).toContain('basil-beauty');expect(searchCocktails('ruby equal-parts').map(c=>c.id)).toContain('negroni');expect(searchCocktails('')).toHaveLength(25)})
  it('composes filters and returns safe empty results',()=>{expect(filterCocktails({origin:['mocktail']})).toHaveLength(3);expect(filterCocktails({glass:['martini'],alcoholic:true}).map(c=>c.id)).toContain('basil-beauty');expect(filterCocktails({tags:['does-not-exist']})).toEqual([]);expect(filterCocktails({})).toHaveLength(25)})
  it('reports deduplicated ingredient coverage',()=>{const coverage=getIngredientCoverage(getCocktailById('negroni')!,['gin','campari','gin']);expect(coverage.available).toHaveLength(2);expect(coverage.missing).toHaveLength(1);expect(coverage.ratio).toBeCloseTo(2/3)})
})
