import { Link, useLocation, useParams } from 'react-router-dom'
import { TasteProfile } from '../components/library'
import { PageTransition } from '../components/ui/PageTransition'
import { formatMetricQuantity, getCocktailBySlug, resolveRecipe } from '../utils'

export function CocktailDetailPage() {
  const { slug = '' } = useParams()
  const location = useLocation()
  const cocktail = getCocktailBySlug(slug)
  const state = location.state as { from?: unknown } | null
  const backTo = typeof state?.from === 'string' && state.from.startsWith('/library') ? state.from : '/library'

  if (!cocktail) {
    return (
      <PageTransition>
        <section className="cocktail-not-found">
          <p>404 · An empty measure</p>
          <h1>This pour is not in the collection.</h1>
          <p>The recipe may have moved, but the cabinet is still open.</p>
          <div><Link to="/library">Return to the Library</Link><Link to="/">Go home</Link></div>
        </section>
      </PageTransition>
    )
  }

  const recipe = resolveRecipe(cocktail)

  return (
    <PageTransition>
      <article className={`cocktail-detail cocktail-detail--${cocktail.origin}`}>
        <header className="cocktail-detail__hero">
          <div className="cocktail-detail__image" role="img" aria-label={`${cocktail.name} editorial presentation`} />
          <div className="cocktail-detail__intro">
            <Link className="cocktail-detail__back" to={backTo}>← Back to Library</Link>
            <p>{cocktail.origin} · {cocktail.glass.replaceAll('-', ' ')}</p>
            <h1>{cocktail.name}</h1>
            <p>{cocktail.description}</p>
          </div>
        </header>
        <div className="cocktail-detail__content section-gutter">
          <section className="cocktail-recipe" aria-labelledby="cocktail-recipe-title">
            <p className="detail-kicker">The measure</p>
            <h2 id="cocktail-recipe-title">Ingredients</h2>
            <ul>
              {recipe.map(({ ingredientId, ingredient, quantity, unit, preparation, displayNote }) => (
                <li key={ingredientId}>
                  <span>{ingredient.name}{displayNote ? ` · ${displayNote}` : ''}</span>
                  <span>{formatMetricQuantity(quantity, unit)}{preparation ? ` · ${preparation}` : ''}</span>
                </li>
              ))}
            </ul>
          </section>
          <TasteProfile taste={cocktail.taste} />
          <section className="cocktail-method" aria-labelledby="cocktail-method-title">
            <p className="detail-kicker">The ritual</p>
            <h2 id="cocktail-method-title">Method</h2>
            <dl>
              <div><dt>Preparation</dt><dd>{cocktail.method.replaceAll('-', ' ')}</dd></div>
              <div><dt>Glass</dt><dd>{cocktail.glass.replaceAll('-', ' ')}</dd></div>
              <div><dt>Garnish</dt><dd>{cocktail.garnish}</dd></div>
            </dl>
            <ol>{cocktail.instructions.map((step) => <li key={step}>{step}</li>)}</ol>
          </section>
          {cocktail.references?.length ? (
            <aside className="cocktail-references" aria-label="Recipe references">
              <p className="detail-kicker">References</p>
              {cocktail.references.map(({ label, url }) => <a href={url} key={url} rel="noreferrer" target="_blank">{label} ↗</a>)}
            </aside>
          ) : null}
        </div>
      </article>
    </PageTransition>
  )
}
