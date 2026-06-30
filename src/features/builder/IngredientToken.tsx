import type { CSSProperties, DragEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ingredientDrag, ingredientHover } from '../../animations'
import type { Ingredient } from '../../types'

interface IngredientTokenProps {
  ingredient: Ingredient
  selected: boolean
  onToggle: (ingredientId: string) => void
}

export function IngredientToken({ ingredient, selected, onToggle }: IngredientTokenProps) {
  const reduceMotion = useReducedMotion()
  const action = selected ? 'Remove' : 'Add'

  function handleDragStart(event: DragEvent<HTMLButtonElement>) {
    event.dataTransfer.setData('text/plain', ingredient.id)
    event.dataTransfer.effectAllowed = 'copy'
  }

  return (
    <motion.button
      type="button"
      className={`ingredient-token${selected ? ' ingredient-token--selected' : ''}`}
      style={{ '--ingredient-color': ingredient.color } as CSSProperties}
      draggable
      onDragStartCapture={handleDragStart}
      onClick={() => onToggle(ingredient.id)}
      aria-pressed={selected}
      aria-label={`${action} ${ingredient.name}`}
      whileHover={reduceMotion ? undefined : ingredientHover}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      whileDrag={reduceMotion ? undefined : ingredientDrag}
      layout
    >
      <span aria-hidden="true">{ingredient.icon}</span>
      {ingredient.name}
    </motion.button>
  )
}
