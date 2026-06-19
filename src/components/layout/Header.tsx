import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="site-header">
      <Link className="wordmark" to="/" aria-label="Cocktail Guru home">Cocktail Guru</Link>
    </header>
  )
}
