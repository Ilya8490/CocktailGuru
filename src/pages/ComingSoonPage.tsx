import { Link } from 'react-router-dom'
import { PageTransition } from '../components/ui/PageTransition'

interface ComingSoonPageProps {
  eyebrow: string
  title: string
}

export function ComingSoonPage({ eyebrow, title }: ComingSoonPageProps) {
  return (
    <PageTransition>
      <section className="placeholder-page">
        <p>{eyebrow}</p>
        <h1>{title}</h1>
        <p>Every detail deserves the right measure. This room opens in the next phase.</p>
        <Link to="/">Return home</Link>
      </section>
    </PageTransition>
  )
}
