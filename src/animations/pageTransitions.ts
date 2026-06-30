import type { Variants } from 'framer-motion'
import { transitions } from './transitions'

export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 18, filter: 'blur(10px)' },
  enter: { opacity: 1, y: 0, filter: 'blur(0px)', transition: transitions.slow },
  exit: { opacity: 0, y: -10, filter: 'blur(8px)', transition: transitions.medium },
}

export const reducedMotionVariants = {
  fadeOnly: {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: transitions.medium },
    exit: { opacity: 0, transition: transitions.fast },
  } satisfies Variants,
} as const

export function getPageTransition(reducedMotion: boolean): Variants {
  return reducedMotion ? reducedMotionVariants.fadeOnly : pageTransitionVariants
}
