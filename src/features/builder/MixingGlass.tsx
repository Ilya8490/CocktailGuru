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

function WhiskeyTumblerIllustration() {
  return (
    <svg className="mixing-glass__tumbler" viewBox="40 45 240 310" role="img" aria-label="Empty crystal rocks glass">
      <defs>
        <linearGradient id="tumbler-rim" x1="52" x2="268" y1="58" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#321f19" stopOpacity=".62" />
          <stop offset=".18" stopColor="#d6a354" stopOpacity=".45" />
          <stop offset=".5" stopColor="#f0c877" stopOpacity=".16" />
          <stop offset=".82" stopColor="#9a6230" stopOpacity=".42" />
          <stop offset="1" stopColor="#201414" stopOpacity=".68" />
        </linearGradient>
        <linearGradient id="tumbler-body" x1="46" x2="278" y1="98" y2="290" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f0c877" stopOpacity=".12" />
          <stop offset=".25" stopColor="#2a1916" stopOpacity=".1" />
          <stop offset=".55" stopColor="#d6a354" stopOpacity=".1" />
          <stop offset="1" stopColor="#160f0e" stopOpacity=".36" />
        </linearGradient>
        <linearGradient id="tumbler-edge-left" x1="75" x2="107" y1="75" y2="312" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d6a354" stopOpacity=".08" />
          <stop offset=".5" stopColor="#f0c877" stopOpacity=".28" />
          <stop offset="1" stopColor="#7a4524" stopOpacity=".5" />
        </linearGradient>
        <linearGradient id="tumbler-edge-right" x1="229" x2="260" y1="75" y2="312" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1d1210" stopOpacity=".48" />
          <stop offset=".45" stopColor="#d6a354" stopOpacity=".2" />
          <stop offset="1" stopColor="#f0c877" stopOpacity=".32" />
        </linearGradient>
        <linearGradient id="tumbler-base" x1="84" x2="236" y1="244" y2="322" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6d3b22" stopOpacity=".22" />
          <stop offset=".35" stopColor="#d6a354" stopOpacity=".32" />
          <stop offset=".68" stopColor="#2c1814" stopOpacity=".42" />
          <stop offset="1" stopColor="#e8b85f" stopOpacity=".22" />
        </linearGradient>
        <radialGradient id="tumbler-glow" cx="50%" cy="72%" r="52%">
          <stop offset="0" stopColor="#d6a354" stopOpacity=".2" />
          <stop offset=".7" stopColor="#5b1f2a" stopOpacity=".08" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <filter id="tumbler-soft-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <filter id="tumbler-blur" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation=".35" />
        </filter>
      </defs>

      <ellipse cx="160" cy="327" rx="105" ry="18" fill="#090605" opacity=".5" filter="url(#tumbler-soft-shadow)" />
      <ellipse cx="160" cy="317" rx="72" ry="12" fill="#d6a354" opacity=".12" filter="url(#tumbler-soft-shadow)" />
      <path d="M68 71c9 90 18 176 29 237 11 16 115 16 126 0 11-61 20-147 29-237Z" fill="url(#tumbler-glow)" />
      <path d="M68 71c9 90 18 176 29 237 11 16 115 16 126 0 11-61 20-147 29-237Z" fill="url(#tumbler-body)" stroke="#c89249" strokeOpacity=".22" strokeWidth="2" />
      <path d="M103 88c5 63 10 126 18 188 12 13 66 13 78 0 8-62 13-125 18-188Z" fill="#d6a354" opacity=".09" />
      <ellipse cx="160" cy="70" rx="94" ry="18" fill="none" stroke="url(#tumbler-rim)" strokeWidth="6" />
      <ellipse cx="160" cy="70" rx="79" ry="11" fill="none" stroke="#201412" strokeOpacity=".45" strokeWidth="2" />

      <path d="M82 83c5 66 12 139 20 205" stroke="url(#tumbler-edge-left)" strokeWidth="9" strokeLinecap="round" opacity=".8" filter="url(#tumbler-blur)" />
      <path d="M239 83c-5 66-12 139-20 205" stroke="url(#tumbler-edge-right)" strokeWidth="9" strokeLinecap="round" opacity=".78" filter="url(#tumbler-blur)" />
      <path d="M112 96c-2 47-3 92-3 136" stroke="#f0c877" strokeOpacity=".1" strokeWidth="2" strokeLinecap="round" />
      <path d="M208 96c2 47 3 92 3 136" stroke="#8d552b" strokeOpacity=".12" strokeWidth="2" strokeLinecap="round" />

      <path d="M98 244c9 16 23 29 42 39l-36 24c-4-15-8-36-11-58Z" fill="url(#tumbler-base)" stroke="#d6a354" strokeOpacity=".16" />
      <path d="M222 244c-9 16-23 29-42 39l36 24c4-15 8-36 11-58Z" fill="url(#tumbler-base)" stroke="#d6a354" strokeOpacity=".16" />
      <path d="M128 247h64l-32 42Z" fill="#d6a354" opacity=".15" stroke="#d6a354" strokeOpacity=".16" />
      <path d="M104 307c20 10 92 10 112 0" fill="none" stroke="#e1ad5a" strokeOpacity=".34" strokeWidth="5" strokeLinecap="round" />
      <path d="M104 287c26 11 86 11 112 0" fill="none" stroke="#1b100e" strokeOpacity=".4" strokeWidth="4" strokeLinecap="round" />
      <path d="M113 267l47 39 47-39M128 247l32 59 32-59M103 295l34-41M217 295l-34-41" fill="none" stroke="#edc66f" strokeOpacity=".18" strokeWidth="2" strokeLinecap="round" />
      <path d="M94 229c35 12 97 13 132 0" fill="none" stroke="#d6a354" strokeOpacity=".13" strokeWidth="3" strokeLinecap="round" />
      <path d="M114 305c25 5 67 5 92 0" fill="none" stroke="#f0c877" strokeOpacity=".18" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
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
      <div className="mixing-glass__content">
        <p className="detail-kicker">IN THE GLASS</p>
        <h2>{selectedIngredients.length ? 'Your current pour' : 'Choose an ingredient to begin'}</h2>
        <p className="mixing-glass__description">
          {selectedIngredients.length
            ? `${selectedIngredients.length} ${selectedIngredients.length === 1 ? 'ingredient is' : 'ingredients are'} staged for the next recipe match.`
            : 'Tap a bottle from the shelf, or drag it into the glass on desktop.'}
        </p>
        <div className="mixing-glass__stage">
          <WhiskeyTumblerIllustration />
        </div>
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
        ) : null}
      </div>
    </motion.section>
  )
}
