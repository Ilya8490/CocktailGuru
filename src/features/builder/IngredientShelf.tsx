import { ingredients } from '../../data'
import type { Ingredient, IngredientCategory } from '../../types'
import { IngredientToken } from './IngredientToken'

const featuredCategories: IngredientCategory[] = [
  'spirit',
  'liqueur',
  'fortified-wine',
  'juice',
  'syrup',
  'bitters',
  'herb',
  'fruit',
  'mixer',
]

const normalize = (value: string) => value.trim().toLocaleLowerCase()

interface IngredientShelfProps {
  search: string
  selectedIngredientIds: string[]
  onToggle: (ingredientId: string) => void
}

function matchesSearch(ingredient: Ingredient, search: string) {
  const needle = normalize(search)
  if (!needle) return true
  return [ingredient.name, ...ingredient.aliases].some((value) => normalize(value).includes(needle))
}

export function IngredientShelf({ search, selectedIngredientIds, onToggle }: IngredientShelfProps) {
  const visibleIngredients = ingredients.filter((ingredient) => {
    if (search) return matchesSearch(ingredient, search)
    return featuredCategories.includes(ingredient.category)
  })

  return (
    <section className="ingredient-shelf" aria-label="Ingredient shelf">
      <div className="ingredient-shelf__grid">
        {visibleIngredients.map((ingredient) => (
          <IngredientToken
            key={ingredient.id}
            ingredient={ingredient}
            selected={selectedIngredientIds.includes(ingredient.id)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </section>
  )
}
