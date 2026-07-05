export function RouteLoadingFallback() {
  return (
    <main className="route-loading" aria-busy="true" aria-live="polite">
      <div className="luxury-loader" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <p>Preparing the bar</p>
    </main>
  )
}

export function CocktailGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <section className="cocktail-grid skeleton-grid" aria-busy="true" aria-label="Loading cocktails">
      {Array.from({ length: count }, (_, index) => (
        <article className="cocktail-card skeleton-card" key={index}>
          <div className="cocktail-card__media skeleton-shimmer" />
          <div className="cocktail-card__body">
            <span className="skeleton-line skeleton-line--kicker" />
            <span className="skeleton-line skeleton-line--title" />
            <span className="skeleton-line" />
            <span className="skeleton-line skeleton-line--short" />
          </div>
        </article>
      ))}
    </section>
  )
}

export function BuilderResultsSkeleton() {
  return (
    <section className="builder-results builder-results--loading" aria-busy="true" aria-label="Loading builder suggestions">
      <span className="skeleton-line skeleton-line--kicker" />
      <span className="skeleton-line skeleton-line--title" />
      <div className="builder-match-card skeleton-card">
        <span className="skeleton-line skeleton-line--short" />
        <span className="skeleton-line skeleton-line--title" />
        <span className="skeleton-line" />
      </div>
    </section>
  )
}

export function DetailSkeleton() {
  return (
    <article className="cocktail-detail detail-skeleton" aria-busy="true" aria-label="Loading cocktail detail">
      <header className="cocktail-detail__hero">
        <div className="cocktail-detail__image skeleton-shimmer" />
        <div className="cocktail-detail__intro">
          <span className="skeleton-line skeleton-line--kicker" />
          <span className="skeleton-line skeleton-line--display" />
          <span className="skeleton-line" />
          <span className="skeleton-line skeleton-line--short" />
        </div>
      </header>
    </article>
  )
}
