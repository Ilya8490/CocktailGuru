import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp } from './test/renderApp'

describe('application routes', () => {
  it('renders the home route inside the application shell', () => {
    renderApp('/')
    expect(screen.getByRole('heading', { name: /craft your evening/i })).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders the Builder route', () => {
    renderApp('/builder')
    expect(screen.getByRole('heading', { name: /build from your bar/i })).toBeInTheDocument()
    expect(screen.getByRole('searchbox', { name: /search ingredients/i })).toBeInTheDocument()
  })

  it('renders the Favorites route', () => {
    renderApp('/favorites')
    expect(screen.getByRole('heading', { name: 'Favorites' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /your private cocktail collection is waiting/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /explore cocktails/i })).toHaveAttribute('href', '/library')
  })

  it('renders recovery UI for an unknown route', () => {
    renderApp('/missing')
    expect(screen.getByRole('heading', { name: /lost after midnight/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /back to the bar/i })).toHaveAttribute('href', '/')
  })
})
