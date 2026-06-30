import { motion, useReducedMotion } from 'framer-motion'
import { createStagger, heroRevealVariants, reduceLargeMotion } from '../../animations'
import { SectionLabel } from '../ui/SectionLabel'

export function LibraryHero({ total }: { total: number }) {
  const reduceMotion = useReducedMotion()
  const child = reduceMotion ? reduceLargeMotion : heroRevealVariants

  return (
    <motion.header
      className="library-hero"
      variants={createStagger({ staggerChildren: 0.11, delayChildren: 0.12 })}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={child}><SectionLabel>The collection</SectionLabel></motion.div>
      <motion.h1 variants={child}>Choose your <em>ritual</em></motion.h1>
      <motion.p variants={child}>{total} recipes, measured precisely and arranged for discovery.</motion.p>
    </motion.header>
  )
}
