import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { useFavoritesStore } from '../../stores/favoritesStore'

interface FavoriteButtonProps {
  cocktailId: string
  className?: string
}

export function FavoriteButton({ cocktailId, className = '' }: FavoriteButtonProps) {
  const reduceMotion = useReducedMotion()
  const active = useFavoritesStore((state) => state.isFavorite(cocktailId))
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
  const [justAdded, setJustAdded] = useState(false)
  const label = active ? 'Remove from favorites' : 'Add to favorites'

  return (
    <motion.button
      type="button"
      className={`favorite-button ${active ? 'favorite-button--active' : ''} ${className}`.trim()}
      aria-label={label}
      aria-pressed={active}
      onClick={() => {
        if (!active) setJustAdded(true)
        toggleFavorite(cocktailId)
      }}
      whileHover={reduceMotion ? undefined : { scale: 1.05 }}
      whileTap={reduceMotion ? undefined : { scale: 0.95 }}
      animate={!reduceMotion && justAdded ? { scale: [1, 1.14, 1] } : undefined}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => setJustAdded(false)}
    >
      <span className="favorite-button__icon" aria-hidden="true">{active ? '♥' : '♡'}</span>
      <span className="favorite-button__label">{label}</span>
    </motion.button>
  )
}
