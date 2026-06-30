import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { badgeVariants, cardHover, cardRevealVariants, cardTap, createStagger, reduceLargeMotion } from '../../animations'
import type { Cocktail, TasteAxis } from '../../types'

const tasteAxes: TasteAxis[] = ['sweet', 'sour', 'bitter', 'strong', 'fruity', 'spicy']
const MotionLink = motion.create(Link)

interface CocktailCardProps {
  cocktail: Cocktail
  from: string
  index: number
}

export function CocktailCard({ cocktail, from, index }: CocktailCardProps) {
  const reduceMotion = useReducedMotion()
  const prominentTastes = tasteAxes.filter((axis) => cocktail.taste[axis] >= 4).slice(0, 2)
  const mediaVariant = index % 2 === 0 ? 'hero' : 'ritual'

  return (
    <motion.article
      className={`cocktail-card cocktail-card--${cocktail.origin}`}
      variants={reduceMotion ? reduceLargeMotion : cardRevealVariants}
      whileHover={reduceMotion ? undefined : cardHover}
      whileTap={reduceMotion ? undefined : cardTap}
      style={{ transformPerspective: 900 }}
    >
      <motion.div
        className={`cocktail-card__media cocktail-card__media--${mediaVariant}`}
        role="img"
        aria-label={`${cocktail.name} editorial presentation`}
        whileHover={reduceMotion ? undefined : { scale: 1.035 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span variants={badgeVariants}>{String(index + 1).padStart(2, '0')}</motion.span>
      </motion.div>
      <div className="cocktail-card__body">
        <p className="cocktail-card__meta">{cocktail.origin} · {cocktail.glass.replaceAll('-', ' ')}</p>
        <motion.h2 layout="position">{cocktail.name}</motion.h2>
        <p>{cocktail.description}</p>
        <motion.ul
          className="cocktail-card__tastes"
          aria-label="Prominent tastes"
          variants={createStagger({ staggerChildren: 0.04, delayChildren: 0.03 })}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {prominentTastes.map((taste) => <motion.li variants={badgeVariants} key={taste}>{taste}</motion.li>)}
        </motion.ul>
        <MotionLink to={`/library/${cocktail.slug}`} state={{ from }} aria-label={`View ${cocktail.name}`} whileHover={{ x: 2 }} whileTap={{ scale: 0.99 }}>
          View recipe <span aria-hidden="true">↗</span>
        </MotionLink>
      </div>
    </motion.article>
  )
}
