import { describe, expect, it } from 'vitest'
import { cocktails } from './cocktails'
import { ingredients } from './ingredients'

describe('cocktail catalog integrity', () => {
  it('contains the approved catalog split', () => { expect(cocktails).toHaveLength(25); expect(cocktails.filter(c=>c.origin==='classic')).toHaveLength(12); expect(cocktails.filter(c=>c.origin==='modern')).toHaveLength(10); expect(cocktails.filter(c=>c.origin==='mocktail')).toHaveLength(3) })
  it('uses unique IDs and valid references', () => { expect(new Set(cocktails.map(c=>c.id)).size).toBe(25); expect(new Set(cocktails.map(c=>c.slug)).size).toBe(25); const ids=new Set(ingredients.map(i=>i.id)); for(const c of cocktails){ expect(c.ingredients.every(i=>ids.has(i.ingredientId))).toBe(true); expect(c.ingredients.every(i=>i.quantity>0)).toBe(true); expect(c.instructions.length).toBeGreaterThan(1); expect(c.tags.length).toBeGreaterThan(0) } })
  it('keeps taste values on the integer 0–5 scale', () => { for(const c of cocktails) for(const value of Object.values(c.taste)){ expect(Number.isInteger(value)).toBe(true); expect(value).toBeGreaterThanOrEqual(0); expect(value).toBeLessThanOrEqual(5) } })
  it('keeps mocktails alcohol-free', () => { const alcoholic=new Set(ingredients.filter(i=>i.isAlcoholic).map(i=>i.id)); for(const c of cocktails.filter(c=>c.origin==='mocktail')) expect(c.ingredients.some(i=>alcoholic.has(i.ingredientId))).toBe(false) })
  it('stores the exact approved Basil Beauty recipe', () => { const c=cocktails.find(c=>c.id==='basil-beauty'); expect(c).toMatchObject({origin:'modern',glass:'martini'}); expect(c?.ingredients).toEqual([{ingredientId:'passion-fruit',quantity:1,unit:'piece',preparation:'fresh'},{ingredientId:'basil',quantity:3,unit:'leaf',preparation:'fresh'},{ingredientId:'citron-vodka',quantity:60,unit:'ml',displayNote:'Ketel One Citroen Vodka'},{ingredientId:'pineapple-juice',quantity:60,unit:'ml'},{ingredientId:'lime-juice',quantity:7.5,unit:'ml',preparation:'freshly squeezed'},{ingredientId:'coconut-syrup',quantity:15,unit:'ml'}]) })
})
