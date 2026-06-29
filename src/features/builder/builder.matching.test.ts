import { describe, expect, it } from 'vitest'
import { getBuilderMatches } from './builder.matching'

describe('builder matching', () => {
  it('returns no matches when no ingredients are selected', () => {
    expect(getBuilderMatches([])).toEqual([])
  })

  it('sorts exact matches before near matches', () => {
    const results = getBuilderMatches(['gin', 'campari', 'sweet-vermouth'])

    expect(results[0]).toMatchObject({
      cocktail: expect.objectContaining({ id: 'negroni' }),
      kind: 'exact',
      missingCount: 0,
      ratio: 1,
    })
    expect(results.slice(1).every((match) => match.kind === 'near' || match.kind === 'exact')).toBe(true)
  })

  it('ranks near matches by coverage and missing count', () => {
    const results = getBuilderMatches(['gin', 'lemon-juice', 'simple-syrup'])
    const firstIds = results.slice(0, 3).map(({ cocktail }) => cocktail.id)

    expect(firstIds).toContain('tom-collins')
    expect(results.every((match) => match.kind === 'exact' || match.ratio >= 0.5 || match.missingCount <= 3)).toBe(true)
  })

  it('exposes available and missing recipe lines', () => {
    const negroni = getBuilderMatches(['gin']).find(({ cocktail }) => cocktail.id === 'negroni')

    expect(negroni).toMatchObject({
      kind: 'near',
      available: [expect.objectContaining({ ingredientId: 'gin' })],
      missingCount: 2,
    })
    expect(negroni?.missing.map(({ ingredientId }) => ingredientId)).toEqual(['campari', 'sweet-vermouth'])
  })
})
