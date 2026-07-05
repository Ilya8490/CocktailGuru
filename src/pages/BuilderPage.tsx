import { useDeferredValue, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { createStagger, revealVariants } from '../animations'
import { PageTransition } from '../components/ui/PageTransition'
import { BuilderResultsSkeleton } from '../components/ui/LoadingStates'
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
  const deferredIngredientIds = useDeferredValue(selectedIngredientIds)
  const matches = useMemo(() => getBuilderMatches(deferredIngredientIds), [deferredIngredientIds])
  const isSuggesting = deferredIngredientIds !== selectedIngredientIds
  const hasValidRecipe = matches.some(({ kind }) => kind === 'exact')
  const keyboardHelpId = 'builder-keyboard-help'

  return (
    <PageTransition>
      <main className="builder-page">
        <BuilderHero selectedCount={selectedIngredientIds.length} />
        <motion.div
          className="builder-layout section-gutter"
          variants={createStagger({ staggerChildren: 0.08, delayChildren: 0.08 })}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="builder-panel" variants={revealVariants}>
            <p id={keyboardHelpId} className="sr-only">
              Use Tab to move through ingredients. Press Enter or Space to add or remove an ingredient. Selected ingredients can also be removed from the mixing glass.
            </p>
            <IngredientSearch value={search} onChange={setSearch} />
            <IngredientShelf search={search} selectedIngredientIds={selectedIngredientIds} onToggle={toggleIngredient} describedBy={keyboardHelpId} />
          </motion.div>
          <MixingGlass
            selectedIngredientIds={selectedIngredientIds}
            onAdd={addIngredient}
            onRemove={removeIngredient}
            onClear={clearIngredients}
            hasValidRecipe={hasValidRecipe}
          />
          {isSuggesting
            ? <BuilderResultsSkeleton />
            : <BuilderResults matches={matches} selectedCount={selectedIngredientIds.length} onClear={clearIngredients} />}
        </motion.div>
      </main>
    </PageTransition>
  )
}
