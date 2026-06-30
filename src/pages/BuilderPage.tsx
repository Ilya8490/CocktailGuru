import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { createStagger, revealVariants } from '../animations'
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
  const hasValidRecipe = matches.some(({ kind }) => kind === 'exact')

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
            <IngredientSearch value={search} onChange={setSearch} />
            <IngredientShelf search={search} selectedIngredientIds={selectedIngredientIds} onToggle={toggleIngredient} />
          </motion.div>
          <MixingGlass
            selectedIngredientIds={selectedIngredientIds}
            onAdd={addIngredient}
            onRemove={removeIngredient}
            onClear={clearIngredients}
            hasValidRecipe={hasValidRecipe}
          />
          <BuilderResults matches={matches} selectedCount={selectedIngredientIds.length} onClear={clearIngredients} />
        </motion.div>
      </main>
    </PageTransition>
  )
}
