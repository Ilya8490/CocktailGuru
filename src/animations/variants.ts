import type { Variants } from 'framer-motion'
import { transitions } from './transitions'

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: transitions.slow },
}

export const heroRevealVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: transitions.hero },
}

export const cardRevealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: transitions.slow },
}

export const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: transitions.medium },
  exit: { opacity: 0, scale: 0.96, transition: transitions.fast },
}

export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: transitions.settle },
  exit: { opacity: 0, scale: 0.98, y: 8, transition: transitions.fast },
}

export const reduceLargeMotion = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.medium },
} satisfies Variants
