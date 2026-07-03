import { create } from 'zustand'

export const FAVORITES_STORAGE_KEY = 'cocktail-guru-favorites'

export interface FavoriteItem {
  id: string
  addedAt: string
}

interface FavoritesState {
  favorites: FavoriteItem[]
  favoriteIds: string[]
  addFavorite: (id: string) => void
  removeFavorite: (id: string) => void
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  clearFavorites: () => void
  hydrateFavorites: () => void
}

const canUseLocalStorage = () => {
  try {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
  } catch {
    return false
  }
}

const isFavoriteItem = (value: unknown): value is FavoriteItem => {
  if (!value || typeof value !== 'object') return false

  const item = value as Record<string, unknown>
  return typeof item.id === 'string' && item.id.length > 0 && typeof item.addedAt === 'string'
}

const normalizeFavorites = (favorites: FavoriteItem[]) => {
  const seen = new Set<string>()

  return favorites.filter((favorite) => {
    if (seen.has(favorite.id)) return false
    seen.add(favorite.id)
    return true
  })
}

const readFavorites = (): FavoriteItem[] => {
  if (!canUseLocalStorage()) return []

  try {
    const stored = window.localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (!stored) return []

    const parsed: unknown = JSON.parse(stored)
    if (!Array.isArray(parsed)) return []

    return normalizeFavorites(parsed.filter(isFavoriteItem))
  } catch {
    return []
  }
}

const writeFavorites = (favorites: FavoriteItem[]) => {
  if (!canUseLocalStorage()) return

  try {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
  } catch {
    // Storage may be unavailable in restricted browser contexts.
  }
}

const createState = (favorites: FavoriteItem[]) => ({
  favorites,
  favoriteIds: favorites.map(({ id }) => id),
})

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  ...createState(readFavorites()),
  addFavorite: (id) => {
    const current = get().favorites
    if (current.some((favorite) => favorite.id === id)) return

    const favorites = [...current, { id, addedAt: new Date().toISOString() }]
    writeFavorites(favorites)
    set(createState(favorites))
  },
  removeFavorite: (id) => {
    const favorites = get().favorites.filter((favorite) => favorite.id !== id)
    writeFavorites(favorites)
    set(createState(favorites))
  },
  toggleFavorite: (id) => {
    if (get().isFavorite(id)) {
      get().removeFavorite(id)
      return
    }

    get().addFavorite(id)
  },
  isFavorite: (id) => get().favorites.some((favorite) => favorite.id === id),
  clearFavorites: () => {
    writeFavorites([])
    set(createState([]))
  },
  hydrateFavorites: () => {
    set(createState(readFavorites()))
  },
}))
