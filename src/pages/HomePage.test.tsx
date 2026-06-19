import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderApp } from '../test/renderApp'

describe('HomePage', () => {
  it('presents the brand promise, process, ritual, and primary action', () => {
    renderApp('/')
    expect(screen.getByRole('heading', { name: /craft your evening/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /three gestures, one perfect pour/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /the midnight ritual/i })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /start mixing/i })).toHaveLength(2)
  })

  it('sends the primary action to the builder', async () => {
    const user = userEvent.setup()
    renderApp('/')
    await user.click(screen.getAllByRole('link', { name: /start mixing/i })[0])
    expect(screen.getByRole('heading', { name: /atelier is being prepared/i })).toBeInTheDocument()
  })
})
