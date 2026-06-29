import type { DragEvent } from 'react'
import { ingredients } from '../../data'
import type { Ingredient } from '../../types'

interface MixingGlassProps {
  selectedIngredientIds: string[]
  onAdd: (ingredientId: string) => void
  onRemove: (ingredientId: string) => void
  onClear: () => void
}

const ingredientMap = new Map<string, Ingredient>(ingredients.map((ingredient) => [ingredient.id, ingredient]))

export function MixingGlass({ selectedIngredientIds, onAdd, onRemove, onClear }: MixingGlassProps) {
  const selectedIngredients = selectedIngredientIds.flatMap((id) => {
    const ingredient = ingredientMap.get(id)
    return ingredient ? [ingredient] : []
  })

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    const ingredientId = event.dataTransfer.getData('text/plain')
    if (ingredientId) onAdd(ingredientId)
  }

  return (
    <section className="mixing-glass" aria-label="Mixing glass" onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className="mixing-glass__vessel" aria-hidden="true" />
      <div className="mixing-glass__content">
        <p className="detail-kicker">In the glass</p>
        <h2>{selectedIngredients.length ? 'Your current pour' : 'Choose an ingredient to begin'}</h2>
        {selectedIngredients.length > 0 ? (
          <>
            <ul>
              {selectedIngredients.map((ingredient) => (
                <li key={ingredient.id}>
                  <span>{ingredient.name}</span>
                  <button type="button" onClick={() => onRemove(ingredient.id)} aria-label={`Remove ${ingredient.name}`}>×</button>
                </li>
              ))}
            </ul>
            <button className="mixing-glass__clear" type="button" onClick={onClear}>Clear mixing glass</button>
          </>
        ) : (
          <p>Tap a bottle from the shelf, or drag it into the glass on desktop.</p>
        )}
      </div>
    </section>
  )
}
