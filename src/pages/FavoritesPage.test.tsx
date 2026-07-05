import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { useFavoritesStore } from '../stores/favoritesStore'
import { renderApp } from '../test/renderApp'

const setFavorites = () => {
  useFavoritesStore.setState({
    favorites: [
      { id: 'margarita', addedAt: '2026-07-03T18:00:00.000Z' },
      { id: 'old-fashioned', addedAt: '2026-07-03T20:00:00.000Z' },
    ],
    favoriteIds: ['margarita', 'old-fashioned'],
  })
}

describe('Favorites page', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favorites: [], favoriteIds: [] })
  })

  it('shows an empty state with a Library CTA', () => {
    renderApp('/favorites')

    expect(screen.getByRole('heading', { name: /your private cocktail collection is waiting/i })).toBeInTheDocument()
    expect(screen.getByText(/save a recipe from the library or builder/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /explore cocktails/i })).toHaveAttribute('href', '/library')
  })

  it('sorts favorites and removes them from the page', async () => {
    const user = userEvent.setup()
    setFavorites()
    renderApp('/favorites')

    let cards = screen.getAllByRole('article')
    expect(within(cards[0]).getByRole('heading', { name: 'Old Fashioned' })).toBeInTheDocument()
    expect(within(cards[1]).getByRole('heading', { name: 'Margarita' })).toBeInTheDocument()

    await user.selectOptions(screen.getByLabelText(/sort by/i), 'alphabetical')
    cards = screen.getAllByRole('article')
    expect(within(cards[0]).getByRole('heading', { name: 'Margarita' })).toBeInTheDocument()
    expect(within(cards[1]).getByRole('heading', { name: 'Old Fashioned' })).toBeInTheDocument()

    await user.click(within(cards[0]).getByRole('button', { name: /remove from favorites/i }))

    await waitFor(() => {
      expect(useFavoritesStore.getState().favoriteIds).toEqual(['old-fashioned'])
    })
  })
})
