import { BuilderMatchCard } from './BuilderMatchCard'
import type { BuilderMatch } from './builder.matching'

interface BuilderResultsProps {
  matches: BuilderMatch[]
  selectedCount: number
  onClear: () => void
}

export function BuilderResults({ matches, selectedCount, onClear }: BuilderResultsProps) {
  if (selectedCount === 0) {
    return (
      <section className="builder-results builder-results--empty">
        <h2>Choose an ingredient to begin</h2>
        <p>The Guru will compare your bar against all 25 recipes.</p>
      </section>
    )
  }

  if (!matches.length) {
    return (
      <section className="builder-results builder-results--empty">
        <h2>No close pour yet</h2>
        <p>Add another ingredient or clear the glass to start fresh.</p>
        <button type="button" onClick={onClear}>Clear mixing glass</button>
      </section>
    )
  }

  const exact = matches.filter(({ kind }) => kind === 'exact')
  const near = matches.filter(({ kind }) => kind === 'near')

  return (
    <section className="builder-results" aria-label="Builder matches">
      {exact.length > 0 && <h2>Ready to pour</h2>}
      {exact.map((match) => <BuilderMatchCard key={match.cocktail.id} match={match} />)}
      {near.length > 0 && <h2>Almost there</h2>}
      {near.map((match) => <BuilderMatchCard key={match.cocktail.id} match={match} />)}
    </section>
  )
}
