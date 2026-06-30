import type { Transition } from 'framer-motion'

export const durations = {
  fast: 0.18,
  medium: 0.3,
  slow: 0.5,
  hero: 0.8,
} as const

export const easings = {
  luxury: [0.22, 1, 0.36, 1],
  precise: [0.16, 1, 0.3, 1],
  soft: [0.25, 0.46, 0.45, 0.94],
} as const

export const transitions = {
  fast: { duration: durations.fast, ease: easings.luxury },
  medium: { duration: durations.medium, ease: easings.luxury },
  slow: { duration: durations.slow, ease: easings.luxury },
  hero: { duration: durations.hero, ease: easings.luxury },
  spring: { type: 'spring', stiffness: 260, damping: 30, mass: 0.8 },
  settle: { type: 'spring', stiffness: 170, damping: 22, mass: 0.9 },
} satisfies Record<string, Transition>
