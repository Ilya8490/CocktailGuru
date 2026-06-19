import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'

export function AppLayout() {
  const location = useLocation()

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content" key={location.pathname}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
