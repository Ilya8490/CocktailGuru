import { useMemo } from 'react'
import { cocktails } from '../data'
import { useFavoritesStore } from '../stores/favoritesStore'
import type { Cocktail } from '../types'

export type FavoriteSort = 'newest' | 'oldest' | 'alphabetical'

export interface ResolvedFavorite {
  cocktail: Cocktail
  addedAt: string
}

const cocktailById = new Map(cocktails.map((cocktail) => [cocktail.id, cocktail]))

export function useFavorites(sort: FavoriteSort = 'newest') {
  const favorites = useFavoritesStore((state) => state.favorites)

  const resolvedFavorites = useMemo(() => {
    const resolved = favorites.reduce<ResolvedFavorite[]>((items, favorite) => {
      const cocktail = cocktailById.get(favorite.id)
      if (!cocktail) return items

      items.push({ cocktail, addedAt: favorite.addedAt })
      return items
    }, [])

    return [...resolved].sort((first, second) => {
      if (sort === 'alphabetical') {
        return first.cocktail.name.localeCompare(second.cocktail.name)
      }

      const firstTime = new Date(first.addedAt).getTime()
      const secondTime = new Date(second.addedAt).getTime()

      return sort === 'oldest' ? firstTime - secondTime : secondTime - firstTime
    })
  }, [favorites, sort])

  return {
    favorites: resolvedFavorites,
    cocktails: resolvedFavorites.map(({ cocktail }) => cocktail),
    count: resolvedFavorites.length,
  }
}
