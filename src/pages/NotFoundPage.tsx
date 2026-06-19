import { Link } from 'react-router-dom'
import { PageTransition } from '../components/ui/PageTransition'

export function NotFoundPage() {
  return (
    <PageTransition>
      <section className="placeholder-page">
        <p>404 · Wrong turn</p>
        <h1>Lost after midnight</h1>
        <p>The glass is empty, but the bar is still open.</p>
        <Link to="/">Back to the bar</Link>
      </section>
    </PageTransition>
  )
}
