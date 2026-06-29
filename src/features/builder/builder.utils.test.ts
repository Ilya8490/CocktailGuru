import { describe, expect, it } from 'vitest'
import {
  addIngredientId,
  parseBuilderQuery,
  removeIngredientId,
  sameIngredientSelection,
  serializeBuilderQuery,
  toggleIngredientId,
} from './builder.utils'

describe('builder query utilities', () => {
  it('parses canonical ingredient IDs and ignores invalid or duplicate values', () => {
    expect(parseBuilderQuery(new URLSearchParams('ingredients=campari,missing,gin,gin,lime-juice'))).toEqual([
      'gin',
      'campari',
      'lime-juice',
    ])
  })

  it('serializes selected ingredients in registry order', () => {
    expect(serializeBuilderQuery(['lime-juice', 'missing', 'gin', 'campari', 'gin']).toString()).toBe(
      'ingredients=gin%2Ccampari%2Clime-juice',
    )
  })

  it('returns an empty query for an empty or invalid selection', () => {
    expect(serializeBuilderQuery([]).toString()).toBe('')
    expect(serializeBuilderQuery(['missing']).toString()).toBe('')
    expect(parseBuilderQuery(new URLSearchParams('ingredients=missing,nope'))).toEqual([])
  })

  it('adds, removes, and toggles without duplicates', () => {
    expect(addIngredientId(['campari'], 'gin')).toEqual(['gin', 'campari'])
    expect(addIngredientId(['gin'], 'gin')).toEqual(['gin'])
    expect(removeIngredientId(['gin', 'campari'], 'gin')).toEqual(['campari'])
    expect(toggleIngredientId(['gin'], 'gin')).toEqual([])
    expect(toggleIngredientId(['gin'], 'campari')).toEqual(['gin', 'campari'])
  })

  it('detects equivalent selections after canonical ordering and invalid-value removal', () => {
    expect(sameIngredientSelection(['campari', 'gin'], ['gin', 'campari'])).toBe(true)
    expect(sameIngredientSelection(['campari', 'gin'], ['gin'])).toBe(false)
    expect(sameIngredientSelection(['missing'], [])).toBe(true)
  })
})
