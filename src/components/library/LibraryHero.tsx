import { SectionLabel } from '../ui/SectionLabel'

export function LibraryHero({ total }: { total: number }) {
  return (
    <header className="library-hero">
      <SectionLabel>The collection</SectionLabel>
      <h1>Choose your <em>ritual</em></h1>
      <p>{total} recipes, measured precisely and arranged for discovery.</p>
    </header>
  )
}
