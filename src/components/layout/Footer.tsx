import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="site-footer">
      <p className="footer-wordmark">Cocktail Guru</p>
      <nav aria-label="Footer navigation">
        <Link to="/library">Library</Link>
        <Link to="/builder">Builder</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>
      <p>Made for curious palates.</p>
    </footer>
  )
}
