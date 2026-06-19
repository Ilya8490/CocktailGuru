import { describe, expect, it } from 'vitest'
import { ingredients } from './ingredients'

describe('ingredient registry', () => {
  it('contains unique canonical IDs', () => { const ids = ingredients.map(({ id }) => id); expect(new Set(ids).size).toBe(ids.length); expect(ids.length).toBeGreaterThanOrEqual(50) })
  it('contains normalized Basil Beauty ingredients', () => { expect(ingredients).toEqual(expect.arrayContaining([expect.objectContaining({ id: 'passion-fruit', isAlcoholic: false }), expect.objectContaining({ id: 'basil', category: 'herb' }), expect.objectContaining({ id: 'citron-vodka', isAlcoholic: true }), expect.objectContaining({ id: 'pineapple-juice', category: 'juice' }), expect.objectContaining({ id: 'lime-juice', category: 'juice' }), expect.objectContaining({ id: 'coconut-syrup', category: 'syrup' })])) })
  it('uses complete presentation metadata', () => { for (const ingredient of ingredients) { expect(ingredient.name).not.toBe(''); expect(ingredient.color).toMatch(/^#([0-9a-f]{6})$/i); expect(ingredient.icon).not.toBe(''); expect(ingredient.aliases).toBeInstanceOf(Array) } })
})
