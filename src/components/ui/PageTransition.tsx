import { motion, useReducedMotion } from 'framer-motion'
import type { PropsWithChildren } from 'react'
import { getPageTransition } from '../../animations'

export function PageTransition({ children }: PropsWithChildren) {
  const reducedMotion = useReducedMotion()
  const variants = getPageTransition(Boolean(reducedMotion))

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
      style={{ willChange: reducedMotion ? 'opacity' : 'opacity, transform, filter' }}
    >
      {children}
    </motion.div>
  )
}
