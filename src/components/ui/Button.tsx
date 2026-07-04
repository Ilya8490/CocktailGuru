import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { buttonHover, buttonTap } from '../../animations'

interface ButtonProps {
  children: ReactNode
  to: string
  variant?: 'gold' | 'outline'
}

const MotionLink = motion.create(Link)

export function Button({ children, to, variant = 'gold' }: ButtonProps) {
  const reduceMotion = useReducedMotion()

  return (
    <MotionLink className={`button button--${variant}`} to={to} whileHover={reduceMotion ? undefined : buttonHover} whileTap={reduceMotion ? undefined : buttonTap}>
      {children}<span aria-hidden="true">↗</span>
    </MotionLink>
  )
}
