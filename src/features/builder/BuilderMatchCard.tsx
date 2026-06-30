import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { cardHover, cardRevealVariants, cardTap, reduceLargeMotion, transitions } from '../../animations'
import { resolveRecipe } from '../../utils'
import type { BuilderMatch } from './builder.matching'

interface BuilderMatchCardProps {
  match: BuilderMatch
}

const MotionLink = motion.create(Link)

export function BuilderMatchCard({ match }: BuilderMatchCardProps) {
  const reduceMotion = useReducedMotion()
  const available = resolveRecipe({ ...match.cocktail, ingredients: match.available })
  const missing = resolveRecipe({ ...match.cocktail, ingredients: match.missing })

  return (
    <motion.article
      className={`builder-match-card builder-match-card--${match.kind}`}
      variants={reduceMotion ? reduceLargeMotion : cardRevealVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.98, filter: 'blur(4px)', transition: transitions.fast }}
      whileHover={reduceMotion ? undefined : cardHover}
      whileTap={reduceMotion ? undefined : cardTap}
      layout
    >
      <p>{match.kind === 'exact' ? 'Exact match' : `${Math.round(match.ratio * 100)}% match`}</p>
      <h3>{match.cocktail.name}</h3>
      <p>{match.cocktail.description}</p>
      <dl>
        <div><dt>Available</dt><dd>{available.map(({ ingredient }) => ingredient.name).join(', ')}</dd></div>
        {missing.length > 0 && <div><dt>Missing</dt><dd>{missing.map(({ ingredient }) => ingredient.name).join(', ')}</dd></div>}
      </dl>
      <MotionLink to={`/library/${match.cocktail.slug}`} whileHover={{ x: 2 }} whileTap={{ scale: 0.99 }}>View recipe <span aria-hidden="true">↗</span></MotionLink>
    </motion.article>
  )
}
