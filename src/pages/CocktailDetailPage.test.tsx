import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp } from '../test/renderApp'

describe('Cocktail detail route', () => {
  it('renders cocktail recovery for an invalid slug', () => {
    renderApp('/library/not-a-cocktail')

    expect(screen.getByRole('heading', { name: /this pour is not in the collection/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /return to the library/i })).toHaveAttribute('href', '/library')
  })
})
