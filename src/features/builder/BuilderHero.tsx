import { motion, useReducedMotion } from 'framer-motion'
import { SectionLabel } from '../../components/ui/SectionLabel'
import { createStagger, heroRevealVariants, reduceLargeMotion } from '../../animations'

interface BuilderHeroProps {
  selectedCount: number
}

export function BuilderHero({ selectedCount }: BuilderHeroProps) {
  const reduceMotion = useReducedMotion()
  const child = reduceMotion ? reduceLargeMotion : heroRevealVariants

  return (
    <motion.section
      className="builder-hero section-gutter"
      variants={createStagger({ staggerChildren: 0.11, delayChildren: 0.12 })}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={child}><SectionLabel>Builder</SectionLabel></motion.div>
      <motion.h1 variants={child}>Build from <em>your bar</em></motion.h1>
      <motion.p variants={child}>
        Choose what you have on hand. The glass will surface exact recipes first, then near matches worth finishing.
      </motion.p>
      <motion.p className="builder-hero__count" variants={child} animate={{ opacity: 1 }} key={selectedCount}>{selectedCount} selected</motion.p>
    </motion.section>
  )
}
