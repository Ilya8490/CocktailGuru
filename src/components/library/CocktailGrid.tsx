import type { Cocktail } from '../../types'
import { CocktailCard } from './CocktailCard'

export function CocktailGrid({ cocktails, from }: { cocktails: Cocktail[]; from: string }) {
  return (
    <section className="cocktail-grid" aria-label="Cocktail collection">
      {cocktails.map((cocktail, index) => (
        <CocktailCard cocktail={cocktail} from={from} index={index} key={cocktail.id} />
      ))}
    </section>
  )
}
