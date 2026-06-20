import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderApp } from '../../test/renderApp'

describe('Header', () => {
  it('marks the current route and navigates to the library', async () => {
    const user = userEvent.setup()
    renderApp('/')
    const home = screen.getByRole('link', { name: 'Home' })
    expect(home).toHaveAttribute('aria-current', 'page')
    await user.click(screen.getAllByRole('link', { name: 'Library' })[0])
    expect(screen.getByRole('heading', { name: /choose your ritual/i })).toBeInTheDocument()
  })

  it('opens and closes the mobile navigation after selection', async () => {
    const user = userEvent.setup()
    renderApp('/')
    const toggle = screen.getByRole('button', { name: /open menu/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    const mobileNavigation = screen.getByRole('navigation', { name: 'Mobile navigation' })
    await user.click(within(mobileNavigation).getByRole('link', { name: 'Favorites' }))
    expect(screen.getByRole('heading', { name: /private selection is coming/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute('aria-expanded', 'false')
  })
})
