import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  FAVORITES_STORAGE_KEY,
  useFavoritesStore,
  type FavoriteItem,
} from './favoritesStore'

class MemoryStorage implements Storage {
  private readonly values = new Map<string, string>()

  get length() {
    return this.values.size
  }

  clear() {
    this.values.clear()
  }

  getItem(key: string) {
    return this.values.get(key) ?? null
  }

  key(index: number) {
    return Array.from(this.values.keys())[index] ?? null
  }

  removeItem(key: string) {
    this.values.delete(key)
  }

  setItem(key: string, value: string) {
    this.values.set(key, value)
  }
}

const resetStore = (favorites: FavoriteItem[] = []) => {
  useFavoritesStore.setState({
    favorites,
    favoriteIds: favorites.map(({ id }) => id),
  })
}

describe('favorites store', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: new MemoryStorage(),
    })
    window.localStorage.clear()
    resetStore()
    vi.useRealTimers()
  })

  it('adds a favorite with addedAt and persists only id metadata', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-07-03T18:30:00.000Z'))

    useFavoritesStore.getState().addFavorite('negroni')

    expect(useFavoritesStore.getState().favorites).toEqual([
      { id: 'negroni', addedAt: '2026-07-03T18:30:00.000Z' },
    ])
    expect(JSON.parse(window.localStorage.getItem(FAVORITES_STORAGE_KEY) ?? '')).toEqual([
      { id: 'negroni', addedAt: '2026-07-03T18:30:00.000Z' },
    ])
  })

  it('does not add duplicate favorites', () => {
    resetStore([{ id: 'martini', addedAt: '2026-07-03T18:30:00.000Z' }])

    useFavoritesStore.getState().addFavorite('martini')

    expect(useFavoritesStore.getState().favorites).toEqual([
      { id: 'martini', addedAt: '2026-07-03T18:30:00.000Z' },
    ])
  })

  it('removes and toggles favorites', () => {
    resetStore([
      { id: 'negroni', addedAt: '2026-07-03T18:30:00.000Z' },
      { id: 'martini', addedAt: '2026-07-03T19:00:00.000Z' },
    ])

    useFavoritesStore.getState().removeFavorite('negroni')
    expect(useFavoritesStore.getState().favoriteIds).toEqual(['martini'])

    useFavoritesStore.getState().toggleFavorite('martini')
    expect(useFavoritesStore.getState().favorites).toEqual([])

    useFavoritesStore.getState().toggleFavorite('daiquiri')
    expect(useFavoritesStore.getState().favoriteIds).toEqual(['daiquiri'])
  })

  it('clears favorites and reports favorite state', () => {
    resetStore([{ id: 'negroni', addedAt: '2026-07-03T18:30:00.000Z' }])

    expect(useFavoritesStore.getState().isFavorite('negroni')).toBe(true)
    expect(useFavoritesStore.getState().isFavorite('martini')).toBe(false)

    useFavoritesStore.getState().clearFavorites()

    expect(useFavoritesStore.getState().favorites).toEqual([])
    expect(window.localStorage.getItem(FAVORITES_STORAGE_KEY)).toBe('[]')
  })

  it('restores favorites safely from corrupted LocalStorage', () => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, '{bad json')

    useFavoritesStore.getState().hydrateFavorites()

    expect(useFavoritesStore.getState().favorites).toEqual([])
    expect(useFavoritesStore.getState().favoriteIds).toEqual([])
  })
})
