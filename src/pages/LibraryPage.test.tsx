import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderApp } from '../test/renderApp'

describe('Library page', () => {
  it('preserves the filtered Library URL in cocktail link state', async () => {
    const user = userEvent.setup()
    const { router } = renderApp('/library?q=negroni&taste=bitter')

    await user.click(screen.getByRole('link', { name: /view negroni/i }))

    expect(router.state.location.pathname).toBe('/library/negroni')
    expect(router.state.location.state).toEqual({ from: '/library?q=negroni&taste=bitter' })
  })

  it('clears an empty result back to the canonical Library URL', async () => {
    const user = userEvent.setup()
    const { router } = renderApp('/library?q=definitely-no-cocktail')

    await user.click(screen.getByRole('button', { name: /clear all filters/i }))

    expect(router.state.location.pathname).toBe('/library')
    expect(router.state.location.search).toBe('')
    expect(screen.getAllByRole('article')).toHaveLength(25)
  })
})
