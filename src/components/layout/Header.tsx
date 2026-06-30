import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { createStagger, revealVariants, transitions } from '../../animations'

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Builder', to: '/builder' },
  { label: 'Library', to: '/library' },
  { label: 'Favorites', to: '/favorites' },
]

function NavigationLinks({ onNavigate }: { onNavigate?: () => void }) {
  return navigation.map(({ label, to }) => (
    <NavLink
      key={to}
      to={to}
      end={to === '/'}
      onClick={onNavigate}
      className={({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link')}
    >
      {({ isActive }) => (
        <>
          <span>{label}</span>
          {isActive && <motion.span className="nav-link__active-line" layoutId="nav-active-line" transition={transitions.medium} />}
        </>
      )}
    </NavLink>
  ))
}

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" to="/" aria-label="Cocktail Guru home">Cocktail Guru</Link>
        <nav className="desktop-navigation" aria-label="Primary navigation">
          <NavigationLinks />
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-controls="mobile-navigation"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((current) => !current)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-navigation"
            aria-label="Mobile navigation"
            variants={createStagger({ staggerChildren: 0.05 })}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto', transition: transitions.medium }}
            exit={{ opacity: 0, height: 0, transition: transitions.fast }}
          >
            <motion.div variants={revealVariants}>
              <NavigationLinks onNavigate={() => setOpen(false)} />
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
