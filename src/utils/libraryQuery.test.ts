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
    expect(getLibraryResults({
      q: 'ruby equal-parts',
      styles: ['classic'],
      ingredientIds: ['gin'],
      tastes: ['bitter'],
      glasses: ['rocks'],
    }).map(({ id }) => id)).toEqual(['negroni'])
  })
})
