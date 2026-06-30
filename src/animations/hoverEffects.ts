import type { TargetAndTransition, VariantLabels } from 'framer-motion'
import { transitions } from './transitions'

export const buttonHover: TargetAndTransition = {
  y: -2,
  scale: 1.012,
  boxShadow: '0 1rem 2.4rem rgba(214, 163, 84, 0.18)',
  transition: transitions.fast,
}

export const buttonTap: TargetAndTransition = {
  y: 0,
  scale: 0.985,
  transition: transitions.fast,
}

export const cardHover: TargetAndTransition = {
  y: -6,
  rotateX: 1.2,
  rotateY: -1.2,
  transition: transitions.medium,
}

export const cardTap: TargetAndTransition = {
  y: -1,
  scale: 0.992,
  transition: transitions.fast,
}

export const ingredientHover: TargetAndTransition = {
  y: -2,
  scale: 1.01,
  transition: transitions.fast,
}

export const ingredientDrag: VariantLabels | TargetAndTransition = {
  scale: 1.04,
  boxShadow: '0 1.4rem 2.5rem rgba(0, 0, 0, 0.28)',
}
