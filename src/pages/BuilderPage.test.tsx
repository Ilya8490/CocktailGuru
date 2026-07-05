import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderApp } from '../test/renderApp'

describe('Builder page', () => {
  it('uses URL-selected ingredients to render matches', () => {
    renderApp('/builder?ingredients=gin,campari,sweet-vermouth')

    expect(screen.getByRole('heading', { name: /build from your bar/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /negroni/i })).toBeInTheDocument()
    expect(screen.getByText(/exact match/i)).toBeInTheDocument()
  })

  it('adds and removes ingredients through tap interaction', async () => {
    const user = userEvent.setup()
    const { router } = renderApp('/builder')

    await user.click(screen.getByRole('button', { name: /^add gin$/i }))
    await user.click(screen.getByRole('button', { name: /^add campari/i }))

    expect(router.state.location.pathname).toBe('/builder')
    expect(router.state.location.search).toBe('?ingredients=gin%2Ccampari')
    const glass = screen.getByRole('region', { name: /mixing glass/i })
    expect(within(glass).getByRole('button', { name: /^remove gin$/i })).toBeInTheDocument()

    await user.click(within(glass).getByRole('button', { name: /^remove gin$/i }))

    expect(router.state.location.search).toBe('?ingredients=campari')
  })

  it('clears selected ingredients back to the canonical Builder URL', async () => {
    const user = userEvent.setup()
    const { router } = renderApp('/builder?ingredients=gin,campari')

    await user.click(screen.getByRole('button', { name: /clear mixing glass/i }))

    expect(router.state.location.pathname).toBe('/builder')
    expect(router.state.location.search).toBe('')
    expect(screen.getAllByText(/choose an ingredient to begin/i).length).toBeGreaterThan(0)
  })

  it('shows an empty builder state with a clear next action', () => {
    renderApp('/builder')

    const results = screen.getByRole('region', { name: /builder suggestions/i })

    expect(within(results).getByRole('heading', { name: /choose an ingredient to begin/i })).toBeInTheDocument()
    expect(within(results).getByText(/select one bottle from the shelf/i)).toBeInTheDocument()
    expect(within(results).getByRole('link', { name: /browse the library/i })).toHaveAttribute('href', '/library')
  })

  it('searches the full ingredient registry', async () => {
    const user = userEvent.setup()
    renderApp('/builder')

    await user.type(screen.getByRole('searchbox', { name: /search ingredients/i }), 'citroen')

    const shelf = screen.getByRole('region', { name: /ingredient shelf/i })
    expect(within(shelf).getByRole('button', { name: /add citron vodka/i })).toBeInTheDocument()
  })

  it('supports keyboard-only ingredient selection and removal', async () => {
    const user = userEvent.setup()
    const { router } = renderApp('/builder')
    const gin = screen.getByRole('button', { name: /^add gin$/i })

    gin.focus()
    await user.keyboard('{Enter}')

    expect(router.state.location.search).toBe('?ingredients=gin')
    expect(gin).toHaveAttribute('aria-pressed', 'true')

    const glass = screen.getByRole('region', { name: /mixing glass/i })
    const removeGin = within(glass).getByRole('button', { name: /^remove gin$/i })
    removeGin.focus()
    await user.keyboard(' ')

    expect(router.state.location.search).toBe('')
  })
})
