import { screen } from '@testing-library/react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ErrorBoundary } from './ErrorBoundary'

function BrokenPage(): never {
  throw new Error('technical detail that should stay hidden')
}

describe('ErrorBoundary', () => {
  it('shows polished recovery actions without raw technical detail', async () => {
    const user = userEvent.setup()
    const router = createMemoryRouter([
      {
        path: '/',
        element: <BrokenPage />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: '/library',
        element: <h1>Library recovered</h1>,
      },
    ])

    render(<RouterProvider router={router} />)

    expect(screen.getByRole('heading', { name: /the bar needs a quick reset/i })).toBeInTheDocument()
    expect(screen.queryByText(/technical detail/i)).not.toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: /go back to library/i }))

    expect(screen.getByRole('heading', { name: /library recovered/i })).toBeInTheDocument()
  })
})
