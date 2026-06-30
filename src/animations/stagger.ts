import type { Variants } from 'framer-motion'

interface StaggerOptions {
  delayChildren?: number
  staggerChildren?: number
}

export function createStagger({
  delayChildren = 0.08,
  staggerChildren = 0.08,
}: StaggerOptions = {}): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  }
}
