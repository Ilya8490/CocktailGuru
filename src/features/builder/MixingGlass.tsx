import type { DragEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { createStagger, reduceLargeMotion, revealVariants, transitions } from '../../animations'
import { ingredients } from '../../data'
import type { Ingredient, TasteAxis, TasteProfile } from '../../types'

interface MixingGlassProps {
  selectedIngredientIds: string[]
  onAdd: (ingredientId: string) => void
  onRemove: (ingredientId: string) => void
  onClear: () => void
  hasValidRecipe: boolean
}

const ingredientMap = new Map<string, Ingredient>(ingredients.map((ingredient) => [ingredient.id, ingredient]))
const tasteAxes: TasteAxis[] = ['sweet', 'sour', 'bitter', 'strong', 'fruity', 'spicy']
const emptyTaste: TasteProfile = { sweet: 0, sour: 0, bitter: 0, strong: 0, fruity: 0, spicy: 0 }
const categoryTaste: Partial<Record<Ingredient['category'], TasteProfile>> = {
  spirit: { sweet: 0, sour: 0, bitter: 0, strong: 5, fruity: 0, spicy: 1 },
  liqueur: { sweet: 4, sour: 0, bitter: 1, strong: 3, fruity: 2, spicy: 1 },
  'fortified-wine': { sweet: 2, sour: 1, bitter: 2, strong: 3, fruity: 1, spicy: 1 },
  juice: { sweet: 2, sour: 4, bitter: 0, strong: 0, fruity: 4, spicy: 0 },
  syrup: { sweet: 5, sour: 0, bitter: 0, strong: 0, fruity: 2, spicy: 1 },
  bitters: { sweet: 0, sour: 0, bitter: 5, strong: 2, fruity: 0, spicy: 3 },
  mixer: { sweet: 1, sour: 1, bitter: 1, strong: 0, fruity: 0, spicy: 1 },
  fruit: { sweet: 3, sour: 2, bitter: 0, strong: 0, fruity: 5, spicy: 0 },
  herb: { sweet: 0, sour: 0, bitter: 1, strong: 0, fruity: 1, spicy: 3 },
  spice: { sweet: 1, sour: 0, bitter: 1, strong: 0, fruity: 0, spicy: 5 },
  dairy: { sweet: 2, sour: 0, bitter: 0, strong: 0, fruity: 0, spicy: 0 },
  garnish: { sweet: 1, sour: 1, bitter: 1, strong: 0, fruity: 2, spicy: 1 },
  other: { sweet: 1, sour: 0, bitter: 0, strong: 0, fruity: 0, spicy: 0 },
}

function getTastePreview(selectedIngredients: Ingredient[]): TasteProfile {
  if (!selectedIngredients.length) return emptyTaste
  const totals = selectedIngredients.reduce<TasteProfile>((profile, ingredient) => {
    const taste = categoryTaste[ingredient.category] ?? emptyTaste
    tasteAxes.forEach((axis) => {
      profile[axis] += taste[axis]
    })
    return profile
  }, { ...emptyTaste })

  return tasteAxes.reduce<TasteProfile>((profile, axis) => {
    profile[axis] = Math.min(5, Math.round(totals[axis] / selectedIngredients.length))
    return profile
  }, { ...emptyTaste })
}

export function MixingGlass({ selectedIngredientIds, onAdd, onRemove, onClear, hasValidRecipe }: MixingGlassProps) {
  const reduceMotion = useReducedMotion()
  const selectedIngredients = selectedIngredientIds.flatMap((id) => {
    const ingredient = ingredientMap.get(id)
    return ingredient ? [ingredient] : []
  })
  const tastePreview = getTastePreview(selectedIngredients)
  const liquidLevel = selectedIngredients.length ? Math.min(72, 16 + selectedIngredients.length * 8) : 8

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
    <motion.section
      className={`mixing-glass${hasValidRecipe ? ' mixing-glass--valid' : ''}`}
      aria-label="Mixing glass"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      animate={reduceMotion ? undefined : hasValidRecipe ? { boxShadow: '0 0 0 1px rgba(214, 163, 84, 0.36), 0 1.8rem 5rem rgba(214, 163, 84, 0.14)' } : { boxShadow: '0 1.5rem 4rem rgba(0, 0, 0, 0.18)' }}
      transition={transitions.medium}
    >
      <div className="mixing-glass__vessel" aria-hidden="true">
        <motion.span
          className="mixing-glass__liquid"
          initial={false}
          animate={{ height: `${liquidLevel}%`, opacity: selectedIngredients.length ? 1 : 0.3 }}
          transition={reduceMotion ? { duration: 0.01 } : transitions.settle}
        />
      </div>
      <div className="mixing-glass__content">
        <p className="detail-kicker">In the glass</p>
        <h2>{selectedIngredients.length ? 'Your current pour' : 'Choose an ingredient to begin'}</h2>
        {selectedIngredients.length > 0 ? (
          <>
            <motion.ul variants={createStagger({ staggerChildren: 0.045 })} initial="hidden" animate="visible">
              <AnimatePresence initial={false}>
              {selectedIngredients.map((ingredient) => (
                <motion.li
                  key={ingredient.id}
                  variants={reduceMotion ? reduceLargeMotion : revealVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -8, transition: transitions.fast }}
                  layout
                >
                  <span>{ingredient.name}</span>
                  <button type="button" onClick={() => onRemove(ingredient.id)} aria-label={`Remove ${ingredient.name}`}>×</button>
                </motion.li>
              ))}
              </AnimatePresence>
            </motion.ul>
            <div className="mixing-glass__profile" aria-label="Animated taste profile">
              {tasteAxes.map((axis) => (
                <div key={axis}>
                  <span>{axis}</span>
                  <span className="mixing-glass__track">
                    <motion.span
                      initial={false}
                      animate={{ scaleX: tastePreview[axis] / 5 }}
                      transition={reduceMotion ? { duration: 0.01 } : transitions.slow}
                    />
                  </span>
                </div>
              ))}
            </div>
            <button className="mixing-glass__clear" type="button" onClick={onClear}>Clear mixing glass</button>
          </>
        ) : (
          <p>Tap a bottle from the shelf, or drag it into the glass on desktop.</p>
        )}
      </div>
    </motion.section>
  )
}
