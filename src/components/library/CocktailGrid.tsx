import { motion } from 'framer-motion'
import { createStagger } from '../../animations'
import type { Cocktail } from '../../types'
import { CocktailCard } from './CocktailCard'

export function CocktailGrid({ cocktails, from }: { cocktails: Cocktail[]; from: string }) {
  return (
    <motion.section
      className="cocktail-grid"
      aria-label="Cocktail collection"
      variants={createStagger({ staggerChildren: 0.06, delayChildren: 0.06 })}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
    >
      {cocktails.map((cocktail, index) => (
        <CocktailCard cocktail={cocktail} from={from} index={index} key={cocktail.id} />
      ))}
    </motion.section>
  )
}
