import { useMemo, useState } from 'react'
import { PageTransition } from '../components/ui/PageTransition'
import {
  BuilderHero,
  BuilderResults,
  IngredientSearch,
  IngredientShelf,
  MixingGlass,
  getBuilderMatches,
  useBuilderIngredients,
} from '../features/builder'

export function BuilderPage() {
  const [search, setSearch] = useState('')
  const {
    selectedIngredientIds,
    addIngredient,
    removeIngredient,
    toggleIngredient,
    clearIngredients,
  } = useBuilderIngredients()
  const matches = useMemo(() => getBuilderMatches(selectedIngredientIds), [selectedIngredientIds])

  return (
    <PageTransition>
      <main className="builder-page">
        <BuilderHero selectedCount={selectedIngredientIds.length} />
        <div className="builder-layout section-gutter">
          <div className="builder-panel">
            <IngredientSearch value={search} onChange={setSearch} />
            <IngredientShelf search={search} selectedIngredientIds={selectedIngredientIds} onToggle={toggleIngredient} />
          </div>
          <MixingGlass
            selectedIngredientIds={selectedIngredientIds}
            onAdd={addIngredient}
            onRemove={removeIngredient}
            onClear={clearIngredients}
          />
          <BuilderResults matches={matches} selectedCount={selectedIngredientIds.length} onClear={clearIngredients} />
        </div>
      </main>
    </PageTransition>
  )
}
