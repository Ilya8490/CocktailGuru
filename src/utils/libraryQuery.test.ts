import { describe, expect, it } from 'vitest'
import { getLibraryResults, parseLibraryQuery, serializeLibraryQuery } from './libraryQuery'

describe('library query contract', () => {
  it('parses valid values, normalizes query whitespace, and ignores invalid values', () => {
    const query = parseLibraryQuery(new URLSearchParams(
      'q=++ruby+++equal-parts++&style=classic,wrong,classic&ingredient=gin,missing,gin&taste=bitter,nope,bitter&glass=rocks,bucket,rocks',
    ))

    expect(query).toEqual({
      q: 'ruby equal-parts',
      styles: ['classic'],
      ingredientIds: ['gin'],
      tastes: ['bitter'],
      glasses: ['rocks'],
    })
  })

  it('accepts canonical ingredients that are not exposed in the visible filter list', () => {
    expect(parseLibraryQuery(new URLSearchParams('ingredient=campari')).ingredientIds).toEqual(['campari'])
  })

  it('serializes valid values in canonical parameter and catalog order', () => {
    const params = serializeLibraryQuery({
      q: '  ruby   equal-parts  ',
      styles: ['wrong', 'modern', 'classic', 'modern'] as never,
      ingredientIds: ['missing', 'mezcal', 'gin', 'mezcal'],
      tastes: ['wrong', 'fruity', 'bitter', 'fruity'] as never,
      glasses: ['bucket', 'rocks', 'coupe', 'rocks'] as never,
    })

    expect(params.toString()).toBe(
      'q=ruby+equal-parts&style=classic%2Cmodern&ingredient=gin%2Cmezcal&taste=bitter%2Cfruity&glass=coupe%2Crocks',
    )
  })

  it('intersects text search with every selected filter group', () => {
    const resultIds = (query: Parameters<typeof getLibraryResults>[0]) =>
      getLibraryResults(query).map(({ id }) => id)
    const baseQuery = {
      q: 'juice',
      styles: [],
      ingredientIds: [],
      tastes: [],
      glasses: [],
    }

    expect(resultIds(baseQuery)).toHaveLength(17)
    expect(resultIds({ ...baseQuery, tastes: ['fruity'] })).toHaveLength(10)
    expect(resultIds({ ...baseQuery, tastes: ['fruity'], styles: ['modern'] })).toHaveLength(6)
    expect(resultIds({
      ...baseQuery,
      styles: ['modern'],
      ingredientIds: ['gin'],
      tastes: ['fruity'],
    })).toHaveLength(3)
    expect(resultIds({
      ...baseQuery,
      styles: ['modern'],
      ingredientIds: ['gin'],
      tastes: ['fruity'],
      glasses: ['coupe'],
    })).toEqual(['rosewood-sour'])
  })
})
