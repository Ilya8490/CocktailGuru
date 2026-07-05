import { motion } from 'framer-motion'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CocktailGrid } from '../components/library'
import { Button } from '../components/ui/Button'
import { PageTransition } from '../components/ui/PageTransition'
import { revealVariants } from '../animations'
import { useFavorites, type FavoriteSort } from '../hooks/useFavorites'

const sortOptions: { label: string; value: FavoriteSort }[] = [
  { label: 'Newest first', value: 'newest' },
  { label: 'Oldest first', value: 'oldest' },
  { label: 'Alphabetical', value: 'alphabetical' },
]

export function FavoritesPage() {
  const location = useLocation()
  const [sort, setSort] = useState<FavoriteSort>('newest')
  const { cocktails, count } = useFavorites(sort)
  const from = `${location.pathname}${location.search}`

  return (
    <PageTransition>
      <div className="favorites-page">
        <section className="favorites-hero">
          <motion.p variants={revealVariants} initial="hidden" animate="visible">Private cabinet</motion.p>
          <motion.h1 variants={revealVariants} initial="hidden" animate="visible">Favorites</motion.h1>
          <motion.p variants={revealVariants} initial="hidden" animate="visible">
            Save the pours worth returning to, then arrange them for the evening ahead.
          </motion.p>
          <motion.div className="favorites-hero__count" variants={revealVariants} initial="hidden" animate="visible">
            <span aria-hidden="true">♥</span>
            <strong>{count}</strong>
            <span className="sr-only">{count} saved {count === 1 ? 'cocktail' : 'cocktails'}</span>
            <span aria-hidden="true">{count === 1 ? 'saved cocktail' : 'saved cocktails'}</span>
          </motion.div>
        </section>

        <section className="favorites-content section-gutter" aria-labelledby="favorites-heading">
          <div className="favorites-toolbar">
            <div>
              <p className="detail-kicker">Collected recipes</p>
              <h2 id="favorites-heading">Your private cocktail collection</h2>
            </div>
            {count > 0 && (
              <label className="favorites-sort">
                <span>Sort by</span>
                <select value={sort} onChange={(event) => setSort(event.target.value as FavoriteSort)}>
                  {sortOptions.map((option) => (
                    <option value={option.value} key={option.value}>{option.label}</option>
                  ))}
                </select>
              </label>
            )}
          </div>

          {count > 0
            ? <CocktailGrid cocktails={cocktails} from={from} />
            : (
              <motion.div
                className="favorites-empty-state"
                variants={revealVariants}
                initial="hidden"
                animate="visible"
              >
                <span aria-hidden="true">♡</span>
                <h2>Your private cocktail collection is waiting.</h2>
                <p>Save a recipe from the Library or Builder and it will stay here for your next ritual.</p>
                <Button to="/library">Explore Cocktails</Button>
              </motion.div>
            )}
        </section>
      </div>
    </PageTransition>
  )
}
