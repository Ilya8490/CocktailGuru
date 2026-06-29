import { Link } from 'react-router-dom'
import { resolveRecipe } from '../../utils'
import type { BuilderMatch } from './builder.matching'

interface BuilderMatchCardProps {
  match: BuilderMatch
}

export function BuilderMatchCard({ match }: BuilderMatchCardProps) {
  const available = resolveRecipe({ ...match.cocktail, ingredients: match.available })
  const missing = resolveRecipe({ ...match.cocktail, ingredients: match.missing })

  return (
    <article className={`builder-match-card builder-match-card--${match.kind}`}>
      <p>{match.kind === 'exact' ? 'Exact match' : `${Math.round(match.ratio * 100)}% match`}</p>
      <h3>{match.cocktail.name}</h3>
      <p>{match.cocktail.description}</p>
      <dl>
        <div><dt>Available</dt><dd>{available.map(({ ingredient }) => ingredient.name).join(', ')}</dd></div>
        {missing.length > 0 && <div><dt>Missing</dt><dd>{missing.map(({ ingredient }) => ingredient.name).join(', ')}</dd></div>}
      </dl>
      <Link to={`/library/${match.cocktail.slug}`}>View recipe <span aria-hidden="true">↗</span></Link>
    </article>
  )
}
