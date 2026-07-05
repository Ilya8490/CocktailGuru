import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { PageTransition } from './PageTransition'

export function ErrorBoundary() {
  const error = useRouteError()
  const isMissingRoute = isRouteErrorResponse(error) && error.status === 404

  return (
    <PageTransition>
      <section className="error-state">
        <p>{isMissingRoute ? '404 · Last call' : 'Service note'}</p>
        <h1>{isMissingRoute ? 'This page is off the menu.' : 'The bar needs a quick reset.'}</h1>
        <p>
          {isMissingRoute
            ? 'The requested pour is not available, but the collection is ready.'
            : 'Something unexpected interrupted the experience. Choose a calm path back into the app.'}
        </p>
        <div className="state-actions">
          <Link to="/library">Go back to Library</Link>
          <Link to="/">Return home</Link>
        </div>
      </section>
    </PageTransition>
  )
}
