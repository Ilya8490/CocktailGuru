import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { createStagger, reduceLargeMotion, revealVariants } from '../../animations'
import { BuilderMatchCard } from './BuilderMatchCard'
import type { BuilderMatch } from './builder.matching'

interface BuilderResultsProps {
  matches: BuilderMatch[]
  selectedCount: number
  onClear: () => void
}

export function BuilderResults({ matches, selectedCount, onClear }: BuilderResultsProps) {
  const reduceMotion = useReducedMotion()

  if (selectedCount === 0) {
    return (
      <motion.section className="builder-results builder-results--empty" variants={reduceMotion ? reduceLargeMotion : revealVariants} initial="hidden" animate="visible">
        <h2>Choose an ingredient to begin</h2>
        <p>The Guru will compare your bar against all 25 recipes.</p>
      </motion.section>
    )
  }

  if (!matches.length) {
    return (
      <motion.section className="builder-results builder-results--empty" variants={reduceMotion ? reduceLargeMotion : revealVariants} initial="hidden" animate="visible">
        <h2>No close pour yet</h2>
        <p>Add another ingredient or clear the glass to start fresh.</p>
        <button type="button" onClick={onClear}>Clear mixing glass</button>
      </motion.section>
    )
  }

  const exact = matches.filter(({ kind }) => kind === 'exact')
  const near = matches.filter(({ kind }) => kind === 'near')

  return (
    <motion.section
      className="builder-results"
      aria-label="Builder matches"
      variants={createStagger({ staggerChildren: 0.07 })}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="popLayout">
        {exact.length > 0 && <motion.h2 variants={reduceMotion ? reduceLargeMotion : revealVariants} key="exact-title">Ready to pour</motion.h2>}
        {exact.map((match) => <BuilderMatchCard key={match.cocktail.id} match={match} />)}
        {near.length > 0 && <motion.h2 variants={reduceMotion ? reduceLargeMotion : revealVariants} key="near-title">Almost there</motion.h2>}
        {near.map((match) => <BuilderMatchCard key={match.cocktail.id} match={match} />)}
      </AnimatePresence>
    </motion.section>
  )
}
