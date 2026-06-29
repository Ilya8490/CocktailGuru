import type { CSSProperties, DragEvent } from 'react'
import type { Ingredient } from '../../types'

interface IngredientTokenProps {
  ingredient: Ingredient
  selected: boolean
  onToggle: (ingredientId: string) => void
}

export function IngredientToken({ ingredient, selected, onToggle }: IngredientTokenProps) {
  const action = selected ? 'Remove' : 'Add'

  function handleDragStart(event: DragEvent<HTMLButtonElement>) {
    event.dataTransfer.setData('text/plain', ingredient.id)
    event.dataTransfer.effectAllowed = 'copy'
  }

  return (
    <button
      type="button"
      className={`ingredient-token${selected ? ' ingredient-token--selected' : ''}`}
      style={{ '--ingredient-color': ingredient.color } as CSSProperties}
      draggable
      onDragStart={handleDragStart}
      onClick={() => onToggle(ingredient.id)}
      aria-pressed={selected}
      aria-label={`${action} ${ingredient.name}`}
    >
      <span aria-hidden="true">{ingredient.icon}</span>
      {ingredient.name}
    </button>
  )
}
