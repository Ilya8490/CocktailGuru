import { Link } from 'react-router-dom'
import type { Cocktail, TasteAxis } from '../../types'

const tasteAxes: TasteAxis[] = ['sweet', 'sour', 'bitter', 'strong', 'fruity', 'spicy']

interface CocktailCardProps {
  cocktail: Cocktail
  from: string
  index: number
}

export function CocktailCard({ cocktail, from, index }: CocktailCardProps) {
  const prominentTastes = tasteAxes.filter((axis) => cocktail.taste[axis] >= 4).slice(0, 2)
  const mediaVariant = index % 2 === 0 ? 'hero' : 'ritual'

  return (
    <article className={`cocktail-card cocktail-card--${cocktail.origin}`}>
      <div className={`cocktail-card__media cocktail-card__media--${mediaVariant}`} role="img" aria-label={`${cocktail.name} editorial presentation`}>
        <span>{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="cocktail-card__body">
        <p className="cocktail-card__meta">{cocktail.origin} · {cocktail.glass.replaceAll('-', ' ')}</p>
        <h2>{cocktail.name}</h2>
        <p>{cocktail.description}</p>
        <ul className="cocktail-card__tastes" aria-label="Prominent tastes">
          {prominentTastes.map((taste) => <li key={taste}>{taste}</li>)}
        </ul>
        <Link to={`/library/${cocktail.slug}`} state={{ from }} aria-label={`View ${cocktail.name}`}>
          View recipe <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  )
}
